"use client";

import { useEffect, useRef } from "react";

/**
 * The events page's own dot globe. Same sphere as the design system's
 * hero globe (public/designs/_shared/globe.js) — golden-angle cloud,
 * tilted axis, depth-cued alpha — but a different life: no arcs, and
 * instead of a network that accumulates node by node, a fixed set of
 * lit points is there from the first frame. When a point's hold runs
 * out it crossfades to a fresh spot on the sphere — one fades out as
 * its successor fades in, so the count never changes.
 *
 * Self-contained on purpose: the shared globe.js is design-sync output
 * (overwritten by `npm run sync:v2`) and also drives the homepage hero,
 * so this page carries its own copy of the ~100 lines it needs.
 */

const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const TILT = 0.34;
const SPIN_RATE = 0.00017; /* rad per ms */

const POINTS = 30; /* constant — one fades in exactly as one fades out */
const FADE = 700; /* ms for one end of a crossfade */
const HOLD = [3500, 8000] as const; /* ms a point stays before moving */
const RED_SHARE = 0.22;

const INK = "#101014";
const INDIGO = "#4b49ca";
const RED = "#dc2626";

/* Seeded rather than Math.random so every load draws the same pattern. */
function makeRng(seed: number) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* A lit point occupies one slot forever; what changes is which cloud dot
   it sits on. `from` only matters mid-crossfade (t < 1). */
type Slot = {
  i: number; /* cloud index the point lives on (fading in while t < 1) */
  from: number; /* cloud index it is leaving, -1 once settled */
  t: number; /* crossfade progress, 0..1 */
  hold: number; /* ms left before the next move */
  red: boolean;
};

function mountGlobe(canvas: HTMLCanvasElement): (() => void) | null {
  const maybeCtx = canvas.getContext("2d");
  if (!maybeCtx) return null;
  const ctx = maybeCtx; /* non-null from here on, incl. nested functions */

  const rng = makeRng(0x91b0e);
  let cloud: Array<[number, number, number]> = [];
  let proj = new Float32Array(0);
  let dots = 0;
  let spin = 0;
  let cssSize = 0;
  let dpr = 1;
  let raf: number | null = null;
  let prev = 0;
  let visible = true;
  let destroyed = false;

  const reduceQuery =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
  let reduced = !!(reduceQuery && reduceQuery.matches);

  const span = (pair: readonly [number, number]) =>
    pair[0] + rng() * (pair[1] - pair[0]);

  function buildCloud(n: number) {
    cloud = new Array(n);
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const a = i * GOLDEN;
      cloud[i] = [Math.cos(a) * r, y, Math.sin(a) * r];
    }
    proj = new Float32Array(n * 3);
  }

  const slots: Slot[] = [];

  /* Two points on the same dot draw as one brighter dot, so try a few
     times for a free one — checking both ends of any live crossfade. */
  function freeDot(): number {
    let i = 0;
    for (let attempt = 0; attempt < 8; attempt++) {
      i = Math.floor(rng() * cloud.length);
      const taken = slots.some((s) => s.i === i || s.from === i);
      if (!taken) break;
    }
    return i;
  }

  /* All points exist from frame one — holds are staggered across the full
     range so the churn starts distributed instead of in one wave. */
  function seedSlots() {
    slots.length = 0;
    for (let k = 0; k < POINTS; k++) {
      slots.push({
        i: freeDot(),
        from: -1,
        t: 1,
        hold: (k / POINTS) * HOLD[1] + rng() * (HOLD[1] / POINTS),
        red: rng() < RED_SHARE,
      });
    }
  }

  function resize(): boolean {
    const rect = canvas.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height);
    if (!size) return false;

    dpr = Math.min(2, window.devicePixelRatio || 1);
    cssSize = size;
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);

    /* one dot per ~80px² of face, same density as the hero globe */
    const want = Math.max(900, Math.min(3400, Math.round((size * size) / 80)));
    if (want !== dots) {
      dots = want;
      buildCloud(dots);
      if (slots.length === 0) seedSlots();
      /* a smaller cloud can strand indices past its end — rehome those */
      for (const s of slots) {
        if (s.i >= dots) s.i = freeDot();
        if (s.from >= dots) s.from = -1;
      }
    }
    return true;
  }

  function draw(dt: number) {
    if (!cssSize) return;
    spin += dt * SPIN_RATE;

    if (!reduced) {
      for (const s of slots) {
        if (s.t < 1) {
          s.t = Math.min(1, s.t + dt / FADE);
          if (s.t >= 1) {
            s.from = -1;
            s.hold = span(HOLD);
          }
        } else {
          s.hold -= dt;
          if (s.hold <= 0) {
            s.from = s.i;
            s.i = freeDot();
            s.t = 0;
          }
        }
      }
    }

    const cx = cssSize / 2;
    const cy = cssSize / 2;
    const R = cssSize / 2 - 6;
    const cs = Math.cos(spin);
    const sn = Math.sin(spin);
    const ct = Math.cos(TILT);
    const st = Math.sin(TILT);
    const n = cloud.length;

    for (let p = 0; p < n; p++) {
      const pt = cloud[p];
      const x = pt[0] * cs + pt[2] * sn;
      const zr = pt[2] * cs - pt[0] * sn;
      proj[p * 3] = x;
      proj[p * 3 + 1] = pt[1] * ct - zr * st;
      proj[p * 3 + 2] = zr * ct + pt[1] * st; /* depth, -1 back .. 1 front */
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssSize, cssSize);

    /* base cloud */
    ctx.fillStyle = INK;
    for (let q = 0; q < n; q++) {
      const z = proj[q * 3 + 2];
      ctx.globalAlpha = 0.2 + 0.55 * ((z + 1) / 2);
      ctx.fillRect(cx + proj[q * 3] * R, cy - proj[q * 3 + 1] * R, 1.3, 1.3);
    }

    /* lit points — during a crossfade a slot draws both of its ends, the
       old one at (1 - t) and the new one at t, so alpha is conserved */
    for (const s of slots) {
      litPoint(s.i, s.t, s.red);
      if (s.from >= 0 && s.t < 1) litPoint(s.from, 1 - s.t, s.red);
    }

    ctx.globalAlpha = 1;

    function litPoint(index: number, fade: number, red: boolean) {
      if (fade <= 0) return;
      const z = proj[index * 3 + 2];
      const a = fade * (0.3 + 0.7 * ((z + 1) / 2));
      if (a <= 0) return;
      const x = cx + proj[index * 3] * R;
      const y = cy - proj[index * 3 + 1] * R;
      ctx.fillStyle = red ? RED : INDIGO;

      ctx.globalAlpha = a * 0.18; /* halo */
      ctx.beginPath();
      ctx.arc(x, y, 5.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(x, y, 2.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function frame(now: number) {
    if (destroyed) return;
    raf = window.requestAnimationFrame(frame);
    const dt = Math.min(64, now - prev);
    prev = now;
    draw(dt);
  }

  function start() {
    if (destroyed || raf !== null) return;
    prev = performance.now();
    raf = window.requestAnimationFrame(frame);
  }

  function stop() {
    if (raf !== null) {
      window.cancelAnimationFrame(raf);
      raf = null;
    }
  }

  let ro: ResizeObserver | null = null;
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(() => {
      if (destroyed) return;
      if (resize() && (reduced || raf === null)) draw(0);
    });
    ro.observe(canvas);
  }

  /* An animation that keeps running while scrolled away is pure cost. */
  let io: IntersectionObserver | null = null;
  if (typeof IntersectionObserver !== "undefined") {
    io = new IntersectionObserver(
      (entries) => {
        const e = entries[entries.length - 1];
        if (!e || destroyed) return;
        visible = e.isIntersecting;
        if (visible && !reduced) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);
  }

  /* Reduced motion still gets the sphere with all its points, held still. */
  function onReduceChange(e: MediaQueryListEvent) {
    reduced = e.matches;
    if (reduced) {
      stop();
      if (resize()) draw(0);
    } else if (visible) {
      start();
    }
  }
  reduceQuery?.addEventListener("change", onReduceChange);

  /* Paint one frame synchronously so the sphere — points included — is on
     screen immediately, even where rAF never runs. */
  if (resize()) draw(0);
  if (!reduced && !io) start();

  return () => {
    destroyed = true;
    stop();
    ro?.disconnect();
    io?.disconnect();
    reduceQuery?.removeEventListener("change", onReduceChange);
    slots.length = 0;
  };
}

export function EventsGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const destroy = mountGlobe(canvas);
    return () => destroy?.();
  }, []);

  return (
    <div className="events__globe" aria-hidden="true">
      <canvas ref={canvasRef} className="events__globe-canvas" />
    </div>
  );
}
