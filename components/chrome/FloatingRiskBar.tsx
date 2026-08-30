"use client";

import { useEffect, useState } from "react";
import { EXTERNAL_LINKS } from "@/lib/external-links";

/**
 * The site-wide floating call to action, replacing the old developer bar.
 *
 * The homepage design carries its own richer version of this pill — it copies
 * a setup prompt and switches between coding tools — so this one steps aside
 * wherever that exists rather than stacking two bars in the same corner.
 *
 * That check watches the DOM rather than running once: the designs render
 * asynchronously (support.js boots after hydration, and again on every client
 * navigation), so a pill that will exist is often not there yet at the moment
 * a route's effect first runs. Observing settles it either way without racing.
 *
 * It also follows the page tone. scroll-stage publishes data-page-tone on
 * <html> as the background crosses between light and dark sections, and the
 * bar inverts with it so it never sits dark-on-dark.
 */
export function FloatingRiskBar() {
  const [hasOwnPill, setHasOwnPill] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const read = () => {
      setHasOwnPill(!!document.querySelector("[data-pill]"));
      setDark(root.getAttribute("data-page-tone") === "dark");
    };
    read();

    // Catches the design mounting or unmounting its own pill across
    // navigations, and the page tone flipping as the background crosses.
    const mo = new MutationObserver(read);
    mo.observe(document.body, { childList: true, subtree: true });
    mo.observe(root, { attributes: true, attributeFilter: ["data-page-tone"] });
    return () => mo.disconnect();
  }, []);

  if (hasOwnPill) return null;

  return (
    <a
      className={`riskbar${dark ? " riskbar--on-dark" : ""}`}
      href={EXTERNAL_LINKS.app}
      target="_blank"
      rel="noopener noreferrer"
    >
      Click to know your AI agent&rsquo;s Risk Score in seconds
      <span className="riskbar__arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}
