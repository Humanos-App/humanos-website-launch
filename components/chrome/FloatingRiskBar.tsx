"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * The site-wide floating pill — the same rich pill the homepage design
 * carries (text, spark, tool logos, click-to-copy setup prompt), ported to
 * the chrome so every page shows the identical object.
 *
 * The homepage design still renders its own copy ([data-pill]), so this one
 * steps aside wherever that exists rather than stacking two pills in the
 * same corner. That check watches the DOM rather than running once: the
 * designs render asynchronously (support.js boots after hydration, and again
 * on every client navigation), so a pill that will exist is often not there
 * yet at the moment a route's effect first runs.
 *
 * It also follows the page tone. scroll-stage publishes data-page-tone on
 * <html> as the background crosses between light and dark sections, and the
 * pill inverts with it so it never sits dark-on-dark.
 */

const EZ = "cubic-bezier(0.2,0,0,1)";

const PROMPT =
  "Install the Humanos SDK in this project and configure the Humanos Risk Score for its AI agents. Identify agent actions that create economic exposure and instrument them so Humanos can continuously risk-score their activity. Preserve existing agent behavior and controls, follow the official Humanos integration documentation, and verify that risk events are successfully reaching Humanos.";

const TOOLS = [
  { key: "Claude", name: "Claude Code", src: "/designs/_shared/logos/claude-symbol.webp" },
  { key: "Cursor", name: "Cursor", src: "/designs/_shared/logos/cursor.png" },
  { key: "Codex", name: "Codex", src: "/designs/_shared/logos/codex.png" },
  { key: "Windsurf", name: "Windsurf", src: "/designs/_shared/logos/windsurf.webp" },
];

export function FloatingRiskBar() {
  const [hasOwnPill, setHasOwnPill] = useState(true);
  const [dark, setDark] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tip, setTip] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [narrow, setNarrow] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);

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

    const onResize = () => setNarrow(window.innerWidth < 720);
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      mo.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(copyTimer.current);
    };
  }, []);

  if (hasOwnPill) return null;

  // The pill sits on the light page by default, so it paints dark; on a dark
  // section it inverts to white. Non-Claude marks are dark artwork and need
  // inverting only while the pill itself is dark.
  const pillDark = dark;

  const copy = () => {
    try {
      if (navigator.clipboard) navigator.clipboard.writeText(PROMPT);
      else {
        const ta = document.createElement("textarea");
        ta.value = PROMPT;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
    } catch {}
    setCopied(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 1700);
  };

  const wrap: CSSProperties = {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    pointerEvents: "none",
    zIndex: 60,
  };
  const tipStyle: CSSProperties = {
    position: "relative",
    padding: "6px 12px",
    borderRadius: 999,
    background: "var(--hm-verification)",
    boxShadow: "0 8px 20px -14px rgba(75,73,202,0.5)",
    fontSize: 11,
    color: "#FFFFFF",
    whiteSpace: "nowrap",
    opacity: tip ? 1 : 0,
    transform: tip ? "translateY(0)" : "translateY(4px)",
    transition: `opacity 120ms ${EZ}, transform 120ms ${EZ}`,
  };
  const pillStyle: CSSProperties = {
    pointerEvents: "auto",
    display: "flex",
    alignItems: "center",
    gap: 14,
    height: 44,
    padding: "0 10px 0 18px",
    borderRadius: 999,
    cursor: "pointer",
    background: pillDark ? "#FFFFFF" : "var(--hm-authority)",
    boxShadow:
      "0 2px 4px rgba(17,17,17,0.10), 0 18px 40px -16px rgba(75,73,202,0.45)",
    transition: `background 180ms ${EZ}`,
  };
  const textStyle: CSSProperties = {
    fontSize: 15,
    fontWeight: 400,
    whiteSpace: "nowrap",
    color: pillDark ? "var(--hm-authority)" : "#F4F3EF",
    transition: `color 180ms ${EZ}`,
  };

  // Deliberately NOT tagged [data-pill] — that marker means "a design ships
  // its own pill", and this component hides itself on it.
  return (
    <div style={wrap}>
      <div style={tipStyle}>
        Click to copy a setup prompt for your AI coding tool
        <span
          style={{
            position: "absolute",
            bottom: -5,
            left: "50%",
            marginLeft: -5,
            width: 10,
            height: 10,
            background: "var(--hm-verification)",
            transform: "rotate(45deg)",
          }}
        />
      </div>
      <div
        style={pillStyle}
        onClick={copy}
        onMouseOver={() => setTip(true)}
        onMouseOut={() => setTip(false)}
      >
        <span style={textStyle}>
          {copied
            ? "Setup prompt copied ✓"
            : "Click to know your agent’s Risk Score in seconds"}
        </span>
        <span
          style={{ fontSize: 11, color: "rgba(75,73,202,0.45)", lineHeight: 1, flex: "0 0 auto" }}
        >
          ✦
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          {TOOLS.map((t) => {
            const hov = hover === t.key;
            const hidden = narrow && t.key === "Windsurf";
            return (
              <div
                key={t.key}
                onClick={(e) => {
                  e.stopPropagation();
                  copy();
                }}
                onMouseOver={() => setHover(t.key)}
                onMouseOut={() => setHover((h) => (h === t.key ? null : h))}
                style={{
                  position: "relative",
                  flex: "0 0 auto",
                  width: 22,
                  height: 22,
                  display: hidden ? "none" : "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 10px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "5px 9px",
                    borderRadius: 999,
                    background: "var(--hm-authority)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 9.5,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    whiteSpace: "nowrap",
                    opacity: hov ? 1 : 0,
                    transition: `opacity 120ms ${EZ}`,
                    pointerEvents: "none",
                  }}
                >
                  {t.name}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.src}
                  alt={t.name}
                  style={{
                    width: 22,
                    height: 22,
                    display: "block",
                    opacity: hov ? 1 : 0.7,
                    filter: !pillDark && t.key !== "Claude" ? "invert(1)" : "none",
                    transition: `opacity 140ms ${EZ}`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
