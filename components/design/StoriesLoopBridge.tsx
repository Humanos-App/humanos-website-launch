"use client";

import { useEffect } from "react";

/**
 * Phone loop for the customer-stories strip.
 *
 * On phones the track scrolls natively (design-home.css: transform none,
 * overflow-x auto, centered snap) over two identical card sets shipped
 * in the source. This bridge starts the strip on the middle set and
 * wraps scrollLeft between the sets — identical content, so the jump is
 * invisible and the strip never hits an end. The arrows (whose runtime
 * storyIdx only drives the desktop transform) are repointed to one-card
 * scrolls, animated by hand with snapping suspended: iOS ignores
 * programmatic smooth scrolls on mandatory-snap containers, which is
 * why scrollBy({behavior:'smooth'}) silently did nothing there.
 * Desktop never enters any of these paths.
 */

const GAP = 20; /* the track's inline flex gap */
const SET = 3; /* stories per set */
const TRACK = '[data-stage="customer-stories"] div[style*="--card"]';
const ARROW = '[data-stage="customer-stories"] div[style*="width: 36px"]';

export function StoriesLoopBridge() {
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    let track: HTMLElement | null = null;
    let raf = 0;
    let poll: number | undefined;
    let animating = false;

    const step = () => {
      const first = track?.children[0] as HTMLElement | undefined;
      const w = first ? first.getBoundingClientRect().width : 0;
      return w ? w + GAP : 0;
    };

    /* keep scrollLeft inside the middle window; jumps are exact one-set
       multiples over identical content, so they are invisible */
    const wrapNow = () => {
      if (!track || !mq.matches || animating) return;
      const st = step();
      if (!st) return;
      const set = st * SET;
      if (track.scrollLeft < st * 0.6) track.scrollLeft += set;
      else if (track.scrollLeft > st * 4.4) track.scrollLeft -= set;
    };
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          wrapNow();
        });
    };

    /* hand-rolled scroll animation, snap off while it runs */
    const animateBy = (delta: number) => {
      if (!track || animating) return;
      const el = track;
      const start = el.scrollLeft;
      const t0 = performance.now();
      const D = 320;
      animating = true;
      el.style.scrollSnapType = "none";
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / D);
        el.scrollLeft = start + delta * (1 - Math.pow(1 - k, 3));
        if (k < 1) requestAnimationFrame(tick);
        else {
          el.style.scrollSnapType = "";
          animating = false;
          wrapNow();
        }
      };
      requestAnimationFrame(tick);
    };

    const init = () => {
      const el = document.querySelector<HTMLElement>(TRACK);
      if (!el) return false;
      track = el;
      track.addEventListener("scroll", onScroll, { passive: true });
      if (mq.matches) {
        const st = step();
        if (st) track.scrollLeft = st * SET; /* middle set, first card */
      }
      return true;
    };

    /* the design runtime boots asynchronously; try until the track exists */
    if (!init()) {
      let tries = 0;
      poll = window.setInterval(() => {
        if (init() || ++tries > 40) window.clearInterval(poll);
      }, 250);
    }

    const onClickCapture = (e: MouseEvent) => {
      if (!mq.matches || !track) return;
      const arrow = (e.target as Element | null)?.closest?.(ARROW);
      if (!arrow) return;
      e.preventDefault();
      e.stopPropagation(); /* the runtime's storyIdx stays parked at 0 */
      const dir = (arrow.textContent || "").includes("←") ? -1 : 1;
      animateBy(dir * step());
    };
    document.addEventListener("click", onClickCapture, true);

    const onChange = () => {
      if (mq.matches && track) {
        const st = step();
        if (st) track.scrollLeft = st * SET;
      }
    };
    mq.addEventListener("change", onChange);

    return () => {
      document.removeEventListener("click", onClickCapture, true);
      mq.removeEventListener("change", onChange);
      track?.removeEventListener("scroll", onScroll);
      if (poll) window.clearInterval(poll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
