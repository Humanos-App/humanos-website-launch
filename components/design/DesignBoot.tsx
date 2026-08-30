"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __dcBoot?: () => void;
  }
}

/**
 * Boot the design runtime after a client-side navigation.
 *
 * support.js renders the page's <x-dc> template once, on document load. A
 * route change is not a document load, and next/script will not re-execute a
 * src it has already loaded — so navigating between design pages left the new
 * page unrendered until a manual reload, showing only the navbar and footer.
 *
 * Calling __dcBoot re-runs that render against whatever is in the DOM now.
 *
 * This self-guards against booting twice on a first load: support.js is
 * afterInteractive, so on the initial render of a page it has not defined
 * __dcBoot yet and this does nothing, leaving support.js to boot itself. By
 * the time a navigation happens it is defined, which is exactly when the
 * design needs booting by hand.
 */
export function DesignBoot({ slug }: { slug: string }) {
  useEffect(() => {
    if (typeof window.__dcBoot !== "function") return;
    // Let React commit the new fragment before the runtime walks it.
    const id = window.requestAnimationFrame(() => window.__dcBoot?.());
    return () => window.cancelAnimationFrame(id);
  }, [slug]);

  return null;
}
