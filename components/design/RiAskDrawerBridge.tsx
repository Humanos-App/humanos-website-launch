"use client";

import { useEffect, useState } from "react";

/**
 * On phones, the Risk Intelligence "Ask" answer card is a bottom drawer.
 *
 * design-home.css keeps the card off-canvas at ≤720px until
 * <html data-ri-drawer="open">. Tapping an option row opens it — the
 * design runtime already swaps the card's content on that same tap —
 * and the X this component renders closes it. The X lives out here
 * (fixed, over the drawer's top-right corner) because the design's
 * React owns the card's subtree, so a foreign button can't sit inside.
 */

const OPEN_ATTR = "data-ri-drawer";
const ROW_SELECTOR =
  '[data-stage="risk-intelligence"] [style*="flex: 1 1 320px"] > div';

export function RiAskDrawerBridge() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const onClick = (e: MouseEvent) => {
      if (!mq.matches) return;
      const target = e.target as Element | null;
      if (target?.closest?.(ROW_SELECTOR)) setOpen(true);
    };
    // A drawer that survives leaving phone width would strand the page.
    const onChange = () => {
      if (!mq.matches) setOpen(false);
    };
    document.addEventListener("click", onClick);
    mq.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("click", onClick);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (open) root.setAttribute(OPEN_ATTR, "open");
    else root.removeAttribute(OPEN_ATTR);
    return () => root.removeAttribute(OPEN_ATTR);
  }, [open]);

  if (!open) return null;
  return (
    <button
      type="button"
      className="ri-drawer-close"
      aria-label="Close"
      onClick={() => setOpen(false)}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path
          d="M3 3l8 8M11 3l-8 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
