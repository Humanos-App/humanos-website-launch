"use client";

import { useEffect } from "react";

/**
 * Lets design fragments open the site's Talk with us dialog.
 *
 * The dialog is a Radix component in Next's React; the designs are static
 * markup rendered by their own runtime and can't mount it. Any element in a
 * fragment carrying data-talk-to-us gets its click turned into the dialog
 * (via the navbar's own trigger). The markup keeps a real href (Calendly) so
 * the standalone design exports — which have no chrome — still work.
 */
export function TalkToUsBridge() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest?.(
        "[data-talk-to-us]"
      );
      if (!target) return;
      const trigger =
        document.querySelector<HTMLElement>(".nav__cta--talk");
      if (!trigger) return; // no chrome — let the href happen
      e.preventDefault();
      trigger.click();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
