"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __dcBoot?: () => void;
  }
}

/** How long to keep trying before giving up, and how often. */
const ATTEMPT_EVERY = 120;
const GIVE_UP_AFTER = 6000;

/**
 * Make sure the design on this route actually renders.
 *
 * support.js renders a page's <x-dc> template once, on document load. A route
 * change is not a document load, and next/script will not re-execute a src it
 * has already loaded — so without this, navigating to a design page left it
 * unrendered until a manual reload, showing only the navbar and footer.
 *
 * It polls rather than firing once, because there are two different races and
 * a single attempt loses both:
 *
 *  - Navigating before support.js has finished loading: __dcBoot does not
 *    exist yet, and support.js's own boot on load may already have run against
 *    the page we just left. Nothing would ever render the new one.
 *  - Booting before React has committed the incoming fragment, which renders
 *    nothing and does not retry.
 *
 * The check is scoped to this route's own container. Looking at the document
 * as a whole is wrong: immediately after a navigation the previous page's
 * rendered host can still be attached, which reads as "already rendered" and
 * skips the boot the new page needs.
 */
export function DesignBoot({ slug }: { slug: string }) {
  useEffect(() => {
    const rendered = () => {
      const host = document.querySelector(`[data-design="${slug}"]`);
      // support.js swaps the raw template for a host element; either marker
      // means this fragment has been through the runtime.
      return !!host?.querySelector("[data-sc-name], .sc-host");
    };

    if (rendered()) return;

    let elapsed = 0;
    const id = window.setInterval(() => {
      elapsed += ATTEMPT_EVERY;
      if (rendered() || elapsed >= GIVE_UP_AFTER) {
        window.clearInterval(id);
        return;
      }
      // Only once support.js is present. Before that, it will boot itself.
      if (typeof window.__dcBoot === "function") window.__dcBoot();
    }, ATTEMPT_EVERY);

    return () => window.clearInterval(id);
  }, [slug]);

  return null;
}
