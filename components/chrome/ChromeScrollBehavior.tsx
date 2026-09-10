"use client";

import { useEffect } from "react";

/**
 * Mobile-only hide-on-scroll for the sticky site chrome (banner + navbar).
 *
 * Desktop keeps the chrome pinned permanently. On mobile (the same 880px
 * breakpoint where the navbar collapses to the burger), scrolling down slides
 * the chrome away to give the content the full viewport, and any upward
 * scroll — or being at the top of the page — brings it straight back.
 *
 * Renders nothing; it only toggles a class on .site-chrome. The chrome stays
 * position:sticky, so hiding via transform never shifts the page below it.
 * While the mobile drawer is open the body scroll is locked (see Navbar), so
 * no scroll events fire and the chrome cannot slide away mid-menu.
 */
export function ChromeScrollBehavior() {
  useEffect(() => {
    const el = document.querySelector(".site-chrome");
    if (!el) return;

    const mq = window.matchMedia("(max-width: 880px)");
    let lastY = window.scrollY;

    const show = () => el.classList.remove("site-chrome--hidden");
    const hide = () => el.classList.add("site-chrome--hidden");

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (!mq.matches || y < 8) {
        show();
        return;
      }
      // Small threshold so sub-pixel jitter (iOS momentum) doesn't flap it,
      // and no hiding until the chrome would actually be in the way.
      if (dy > 4 && y > 120) hide();
      else if (dy < -4) show();
    };

    const onBreakpoint = () => {
      lastY = window.scrollY;
      if (!mq.matches) show();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onBreakpoint);
      show();
    };
  }, []);

  return null;
}
