"use client";

import { useEffect } from "react";

/**
 * Phone loop for the customer-stories strip.
 *
 * On phones the track scrolls natively (design-home.css: transform none,
 * overflow-x auto, snap) over two identical card sets shipped in the
 * source. This bridge starts the strip on the middle set and wraps
 * scrollLeft between the sets once a scroll settles — identical content,
 * so the jump is invisible and the strip never hits an end. Settle-based
 * wrapping matters on iOS, which ignores scrollLeft writes mid-momentum.
 *
 * The arrows (whose runtime storyIdx only drives the desktop transform)
 * are repointed to one-card scrolls, animated by hand with snapping
 * suspended: iOS also ignores programmatic smooth scrolls on
 * mandatory-snap containers. Track and arrows are found by the static
 * data-cs-* attributes in the source — style-attribute selectors proved
 * unreliable across engines. Desktop never enters any of these paths.
 */

const GAP = 20; /* the track's inline flex gap */
const SET = 3; /* stories per set */

export function StoriesLoopBridge() {
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    let track: HTMLElement | null = null;
    let settle: number | undefined;
    let poll: number | undefined;
    let animating = false;
    let placed = false;

    const findTrack = () =>
      document.querySelector<HTMLElement>("[data-cs-track]");

    const step = () => {
      const first = track?.children[0] as HTMLElement | undefined;
      const w = first ? first.getBoundingClientRect().width : 0;
      return w ? w + GAP : 0;
    };

    /* jumps are exact one-set multiples over identical content */
    const wrapNow = () => {
      if (!track || !mq.matches || animating) return;
      const st = step();
      if (!st) return;
      const set = st * SET;
      if (track.scrollLeft < st * 0.6) track.scrollLeft += set;
      else if (track.scrollLeft > st * 4.4) track.scrollLeft -= set;
    };

    /* iOS drops scrollLeft writes during momentum — correct on settle */
    const onScroll = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(wrapNow, 90);
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

    /* attach to the track once the design runtime has rendered it, and
       park the strip on the middle set */
    const engage = () => {
      const el = findTrack();
      if (!el) return false;
      if (el !== track) {
        track?.removeEventListener("scroll", onScroll);
        track = el;
        track.addEventListener("scroll", onScroll, { passive: true });
        placed = false;
      }
      if (!placed && mq.matches) {
        const st = step();
        if (st) {
          track.scrollLeft = st * SET;
          placed = true;
        }
      }
      return placed || !mq.matches;
    };

    if (!engage()) {
      let tries = 0;
      poll = window.setInterval(() => {
        if (engage() || ++tries > 120) window.clearInterval(poll);
      }, 250);
    }

    const onClickCapture = (e: MouseEvent) => {
      if (!mq.matches) return;
      const t = e.target as Element | null;
      const prev = t?.closest?.("[data-cs-prev]");
      const next = prev ? null : t?.closest?.("[data-cs-next]");
      if (!prev && !next) return;
      e.preventDefault();
      e.stopPropagation(); /* the runtime's storyIdx stays parked */
      engage(); /* lazy re-find, in case the poll expired early */
      if (!track) return;
      animateBy((prev ? -1 : 1) * step());
    };
    document.addEventListener("click", onClickCapture, true);

    const onChange = () => {
      placed = false;
      engage();
    };
    mq.addEventListener("change", onChange);

    return () => {
      document.removeEventListener("click", onClickCapture, true);
      mq.removeEventListener("change", onChange);
      track?.removeEventListener("scroll", onScroll);
      window.clearInterval(poll);
      window.clearTimeout(settle);
    };
  }, []);

  return null;
}
