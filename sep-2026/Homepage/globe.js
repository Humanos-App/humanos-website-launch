/**
 * Dot globe — the hero's Risk Network visual.
 *
 * Ported from the standalone insurer demo film (Downloads/diagram.html), where
 * the globe travelled between two homes on a fixed 900px canvas carried by a
 * transform. Here it has one home, so it sizes itself to whatever box it is
 * given and drops the film's choreography entirely.
 *
 * Points are spread over a sphere by the golden angle, spun about a tilted
 * axis and projected flat. Canvas rather than three.js so the page stays
 * dependency-free.
 *
 *   window.HumanosGlobe.mount(canvas) -> { destroy() }
 *
 * The page is React-rendered by support.js, so mounting is driven by a ref
 * callback and every handle owns its observers and its frame loop.
 */
(function () {
  "use strict";

  var GOLDEN = Math.PI * (3 - Math.sqrt(5));
  var TILT = 0.34;

  /* Steady-state population is life divided by interval, so these read as
     roughly six lit points and two or three arcs at any moment. */
  var HOT_EVERY = [450, 950]; /* ms between new points */
  var ARC_EVERY = [700, 1500]; /* ms between new arcs */
  var HOT_LIFE = [3200, 5200]; /* how long a point stays lit */
  var ARC_LIFE = [2000, 3400];
  var MAX_HOT = 16;
  var MAX_ARC = 5;
  var RED_SHARE = 0.22; /* mirrors the diagram's block rate */
  var ARC_SAMPLES = 34;

  var INK = "#101014";
  var INDIGO = "#4b49ca";
  var RED = "#dc2626";

  /* Seeded rather than Math.random so every load draws the same pattern. */
  function makeRng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* fade in over the first fifth, hold, fade out over the last third */
  function envelope(k) {
    return k < 0.2 ? k / 0.2 : k > 0.67 ? (1 - k) / 0.33 : 1;
  }

  /* Shortest path across the sphere, staying on the surface: slerp keeps
     every sample at radius one, so the link takes the globe's own curvature
     and never lifts off the soil. */
  function slerp(a, b, t, out) {
    var d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    d = Math.max(-1, Math.min(1, d));
    var om = Math.acos(d);
    if (om < 1e-4) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      return;
    }
    var so = Math.sin(om);
    var s1 = Math.sin((1 - t) * om) / so;
    var s2 = Math.sin(t * om) / so;
    out[0] = a[0] * s1 + b[0] * s2;
    out[1] = a[1] * s1 + b[1] * s2;
    out[2] = a[2] * s1 + b[2] * s2;
  }

  function mount(canvas, opts) {
    if (!canvas || !canvas.getContext) return null;
    opts = opts || {};

    var ctx = canvas.getContext("2d");
    if (!ctx) return null;

    /* Dot count scales with area so a small hero panel is not paying for
       3,400 points it renders at sub-pixel density. */
    var dots = opts.dots || 0;
    var rng = makeRng(0x91b0e);
    var cloud = [];
    var proj = null;

    function buildCloud(n) {
      cloud = new Array(n);
      for (var i = 0; i < n; i++) {
        var y = 1 - (i / (n - 1)) * 2;
        var r = Math.sqrt(Math.max(0, 1 - y * y));
        var a = i * GOLDEN;
        cloud[i] = [Math.cos(a) * r, y, Math.sin(a) * r];
      }
      proj = new Float32Array(n * 3);
    }

    var hot = []; /* { i, red, age, life } */
    var arcs = []; /* { a, b, red, age, life } — a and b are hot entries */
    var hotIn = 0;
    var arcIn = 0;
    var spin = 0;
    var cssSize = 0;
    var dpr = 1;
    var raf = null;
    var prev = 0;
    var visible = true;
    var destroyed = false;
    var _s = [0, 0, 0];

    var reduceQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    var reduced = !!(reduceQuery && reduceQuery.matches);

    function span(pair) {
      return pair[0] + rng() * (pair[1] - pair[0]);
    }

    function spawnHot() {
      if (hot.length >= MAX_HOT) return;
      hot.push({
        i: Math.floor(rng() * cloud.length),
        red: rng() < RED_SHARE,
        age: 0,
        life: span(HOT_LIFE),
      });
    }

    function spawnArc() {
      if (arcs.length >= MAX_ARC || hot.length < 2) return;

      /* Only points with life left to give. Pairing off the whole set meant
         most arcs were capped down to nothing by an end already on its way
         out, and were thrown away. */
      var pool = hot.filter(function (h) {
        return h.life - h.age > 1400;
      });
      if (pool.length < 2) return;

      var a = pool[Math.floor(rng() * pool.length)];
      var b = pool[Math.floor(rng() * pool.length)];
      if (a === b) b = pool[(pool.indexOf(a) + 1) % pool.length];
      if (a === b) return;

      /* Hold the points themselves, not their positions. A link must never
         outlive either end, or it is left reaching for a dot that is no
         longer lit, so its life is capped by whichever end goes first. */
      var life = Math.min(span(ARC_LIFE), a.life - a.age, b.life - b.age);
      arcs.push({ a: a, b: b, red: a.red && b.red, age: 0, life: life });
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var size = Math.min(rect.width, rect.height);
      if (!size) return false;

      dpr = Math.min(2, window.devicePixelRatio || 1);
      cssSize = size;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);

      /* The film drew a flat 3,400 dots and displayed them at ~475px, so the
         density to match is roughly one dot per 80px² of face. Clamped at that
         3,400 ceiling: past it the dots crowd into a solid disc and cost more
         than they show. */
      var want =
        opts.dots || Math.max(900, Math.min(3400, Math.round((size * size) / 80)));
      if (want !== dots) {
        dots = want;
        buildCloud(dots);
      }
      return true;
    }

    function draw(dt) {
      if (!cssSize) return;
      spin += dt * 0.00017;

      if (!reduced) {
        hotIn -= dt;
        if (hotIn <= 0) {
          spawnHot();
          hotIn = span(HOT_EVERY);
        }
        arcIn -= dt;
        if (arcIn <= 0) {
          spawnArc();
          arcIn = span(ARC_EVERY);
        }
      }

      for (var i = hot.length - 1; i >= 0; i--) {
        hot[i].age += dt;
        if (hot[i].age >= hot[i].life) hot.splice(i, 1);
      }
      /* after the points, so an end that died this frame is already gone */
      for (var j = arcs.length - 1; j >= 0; j--) {
        var arc = arcs[j];
        arc.age += dt;
        if (
          arc.age >= arc.life ||
          hot.indexOf(arc.a) === -1 ||
          hot.indexOf(arc.b) === -1
        ) {
          arcs.splice(j, 1);
        }
      }

      var cx = cssSize / 2;
      var cy = cssSize / 2;
      var R = cssSize / 2 - 6;
      var cs = Math.cos(spin);
      var sn = Math.sin(spin);
      var ct = Math.cos(TILT);
      var st = Math.sin(TILT);
      var n = cloud.length;

      for (var p = 0; p < n; p++) {
        var pt = cloud[p];
        var x = pt[0] * cs + pt[2] * sn;
        var zr = pt[2] * cs - pt[0] * sn;
        proj[p * 3] = x;
        proj[p * 3 + 1] = pt[1] * ct - zr * st;
        proj[p * 3 + 2] = zr * ct + pt[1] * st; /* depth, -1 back .. 1 front */
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssSize, cssSize);

      /* base cloud */
      ctx.fillStyle = INK;
      for (var q = 0; q < n; q++) {
        var z = proj[q * 3 + 2];
        ctx.globalAlpha = 0.2 + 0.55 * ((z + 1) / 2);
        ctx.fillRect(cx + proj[q * 3] * R, cy - proj[q * 3 + 1] * R, 1.3, 1.3);
      }

      /* arcs, beneath the lit points */
      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";
      ctx.setLineDash([1.6, 3.4]);
      for (var m = 0; m < arcs.length; m++) {
        var ar = arcs[m];
        /* never brighter than the dimmer of the two points it joins, so the
           link fades out with them rather than hanging on alone */
        var alpha =
          envelope(ar.age / ar.life) *
          Math.min(
            envelope(ar.a.age / ar.a.life),
            envelope(ar.b.age / ar.b.life)
          );
        if (alpha <= 0) continue;
        var pa = cloud[ar.a.i];
        var pb = cloud[ar.b.i];

        /* Lying on the surface, an arc can run round the far side mid-path,
           so it is clipped sample by sample at the limb and the pen lifts
           over the hidden stretch. Depth still drives one alpha for the whole
           stroke: a dash pattern cannot survive per-segment strokes. */
        ctx.beginPath();
        var drawing = false;
        var maxZ = -1;
        for (var k = 0; k <= ARC_SAMPLES; k++) {
          slerp(pa, pb, k / ARC_SAMPLES, _s);
          var ax = _s[0] * cs + _s[2] * sn;
          var azr = _s[2] * cs - _s[0] * sn;
          var ay = _s[1] * ct - azr * st;
          var az = azr * ct + _s[1] * st;
          if (az <= 0.02) {
            drawing = false;
            continue;
          } /* behind the limb */
          if (az > maxZ) maxZ = az;
          var px = cx + ax * R;
          var py = cy - ay * R;
          if (drawing) ctx.lineTo(px, py);
          else {
            ctx.moveTo(px, py);
            drawing = true;
          }
        }
        if (maxZ < 0) continue; /* wholly hidden */

        ctx.globalAlpha = alpha * (0.3 + 0.55 * maxZ);
        ctx.strokeStyle = ar.red ? RED : INDIGO;
        ctx.stroke();
      }
      ctx.setLineDash([]);

      /* lit points on top */
      for (var h = 0; h < hot.length; h++) {
        var pnt = hot[h];
        var hz = proj[pnt.i * 3 + 2];
        var ha = envelope(pnt.age / pnt.life) * (0.3 + 0.7 * ((hz + 1) / 2));
        if (ha <= 0) continue;
        var hx = cx + proj[pnt.i * 3] * R;
        var hy = cy - proj[pnt.i * 3 + 1] * R;
        ctx.fillStyle = pnt.red ? RED : INDIGO;

        ctx.globalAlpha = ha * 0.18; /* halo */
        ctx.beginPath();
        ctx.arc(hx, hy, 5.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = ha;
        ctx.beginPath();
        ctx.arc(hx, hy, 2.1, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    }

    function frame(now) {
      if (destroyed) return;
      raf = window.requestAnimationFrame(frame);
      var dt = Math.min(64, now - prev);
      prev = now;
      draw(dt);
    }

    function start() {
      if (destroyed || raf !== null) return;
      prev = window.performance ? performance.now() : Date.now();
      raf = window.requestAnimationFrame(frame);
    }

    function stop() {
      if (raf !== null) {
        window.cancelAnimationFrame(raf);
        raf = null;
      }
    }

    /* Reduced motion still gets the sphere, drawn once and left still. */
    function renderStatic() {
      if (resize()) draw(0);
    }

    var ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(function () {
        if (destroyed) return;
        if (resize() && (reduced || raf === null)) draw(0);
      });
      ro.observe(canvas);
    }

    /* A hero animation that keeps running while scrolled away is pure cost. */
    var io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        function (entries) {
          var e = entries[entries.length - 1];
          if (!e || destroyed) return;
          visible = e.isIntersecting;
          if (visible && !reduced) start();
          else stop();
        },
        { threshold: 0 }
      );
      io.observe(canvas);
    }

    function onReduceChange(e) {
      reduced = e.matches;
      if (reduced) {
        stop();
        renderStatic();
      } else if (visible) {
        start();
      }
    }
    if (reduceQuery) {
      if (reduceQuery.addEventListener) {
        reduceQuery.addEventListener("change", onReduceChange);
      } else if (reduceQuery.addListener) {
        reduceQuery.addListener(onReduceChange);
      }
    }

    /* Paint one frame synchronously, so the sphere is on screen immediately:
       before the IntersectionObserver's first callback, and even where rAF
       never runs (a hidden or backgrounded document suspends it). */
    if (resize()) draw(0);
    if (!reduced && !io) start(); /* no IntersectionObserver: just run */

    return {
      destroy: function () {
        destroyed = true;
        stop();
        if (ro) ro.disconnect();
        if (io) io.disconnect();
        if (reduceQuery) {
          if (reduceQuery.removeEventListener) {
            reduceQuery.removeEventListener("change", onReduceChange);
          } else if (reduceQuery.removeListener) {
            reduceQuery.removeListener(onReduceChange);
          }
        }
        hot.length = 0;
        arcs.length = 0;
      },
    };
  }

  window.HumanosGlobe = { mount: mount };
})();
