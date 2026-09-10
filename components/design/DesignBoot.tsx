"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __dcBoot?: () => void;
  }
}

/** Watchdog cadence. Cheap (one scoped querySelector per tick). */
const TICK_EVERY = 150;

/**
 * Make sure the design on this route actually renders — and stays rendered.
 *
 * support.js renders a page's <x-dc> template once, on document load. A route
 * change is not a document load, and next/script will not re-execute a src it
 * has already loaded — so without this, navigating to a design page left it
 * unrendered until a manual reload, showing only the navbar and footer.
 *
 * It runs for as long as the route is mounted, not until the first success:
 * navigating to the URL you are already on (the logo while on the homepage,
 * Pricing while on /pricing) makes Next restore the fragment's raw <x-dc>
 * into the DOM, and a boot that considered itself done never looked again —
 * the page stayed blank forever. The watchdog sees the reversion on its next
 * tick and boots again. Each attempt is guarded: a boot can throw when it
 * races React committing the fragment, and the next tick simply retries.
 *
 * The check is scoped to this route's own container. Looking at the document
 * as a whole is wrong: immediately after a navigation the previous page's
 * rendered host can still be attached, which reads as "already rendered" and
 * skips the boot the new page needs.
 *
 * It also owns scroll restoration on full loads. The fragment disables the
 * browser's own (history.scrollRestoration = "manual", shipped by sync-v2)
 * because the native restore fires while the page is a 100vh placeholder and
 * clamps to "the end" of it — the jump-to-bottom-on-reload bug. Instead the
 * scroll position is saved per path continuously, and put back only once the
 * design has real height.
 */
export function DesignBoot({ slug }: { slug: string }) {
  // Save the scroll position per path, so a reload can put it back after the
  // design renders. rAF-throttled; sessionStorage so it dies with the tab.
  useEffect(() => {
    const key = `design-scroll:${window.location.pathname}`;
    // Time-based throttle, not requestAnimationFrame: rAF is suspended in
    // hidden/background tabs, which would silently stop the saving.
    let last = 0;
    let trailing = 0;
    const save = () => {
      try {
        sessionStorage.setItem(key, String(window.scrollY));
      } catch {}
    };
    const onScroll = () => {
      const now = Date.now();
      window.clearTimeout(trailing);
      if (now - last > 120) {
        last = now;
        save();
      } else {
        trailing = window.setTimeout(save, 150);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(trailing);
    };
  }, []);

  useEffect(() => {
    const rendered = () => {
      const host = document.querySelector(`[data-design="${slug}"]`);
      // support.js swaps the raw template for a host element; either marker
      // means this fragment has been through the runtime.
      return !!host?.querySelector("[data-sc-name], .sc-host");
    };

    // Restore scroll once, after the first render of a full document load
    // that came from a reload or history traversal. Client-side navigations
    // are Next's business and start at the top as usual.
    let restore: number | null = null;
    try {
      const nav = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming | undefined;
      if (nav && (nav.type === "reload" || nav.type === "back_forward")) {
        const saved = sessionStorage.getItem(
          `design-scroll:${window.location.pathname}`
        );
        if (saved !== null) restore = Number(saved) || 0;
        // Only the initial document load restores; a later remount of this
        // route in the same document must not re-apply it.
        if (performance.now() > 5000) restore = null;
      }
    } catch {}

    let wasRendered = rendered();
    if (wasRendered && restore !== null) {
      window.scrollTo(0, restore);
      restore = null;
    }

    const id = window.setInterval(() => {
      if (rendered()) {
        if (!wasRendered && restore !== null) {
          window.scrollTo(0, restore);
          restore = null;
        }
        wasRendered = true;
        return;
      }
      wasRendered = false;
      // Only once support.js is present. Before that, it will boot itself.
      if (typeof window.__dcBoot === "function") {
        try {
          window.__dcBoot();
        } catch {
          // Races React committing the fragment; the next tick retries.
        }
      }
    }, TICK_EVERY);

    return () => window.clearInterval(id);
  }, [slug]);

  return null;
}
