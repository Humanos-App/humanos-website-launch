"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// --- Reveal: show on mount; IntersectionObserver upgrades later if available ---
export function useReveal(threshold = 0.18) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    let done = false;
    let io: IntersectionObserver | undefined;
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && !done) {
              done = true;
              setSeen(true);
              io?.disconnect();
            }
          });
        },
        { threshold, rootMargin: "0px 0px -10% 0px" },
      );
      io.observe(ref.current);
    } catch (_) {}
    const t = setTimeout(() => {
      if (!done) {
        done = true;
        setSeen(true);
        if (io) io.disconnect();
      }
    }, 350);
    return () => {
      clearTimeout(t);
      if (io) io.disconnect();
    };
  }, [seen, threshold]);
  return [ref, seen] as const;
}

export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: any;
}) {
  // Just render children visible — reveal animations skipped in this environment.
  return <Tag className={className}>{children}</Tag>;
}

// --- Animation tick (rAF-driven progress 0..1 repeating) ---
export function useTick(durationMs = 4000, paused = false) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (paused) return;
    let raf: number;
    const start = performance.now();
    const loop = (now: number) => {
      const elapsed = (now - start) % durationMs;
      setT(elapsed / durationMs);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, paused]);
  return t;
}

// --- In-view: activates on mount; observer toggles later if available ---
export function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    let activated = false;
    let io: IntersectionObserver | undefined;
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            setInView(e.isIntersecting);
            if (e.isIntersecting) activated = true;
          });
        },
        { threshold },
      );
      io.observe(ref.current);
    } catch (_) {}
    const t = setTimeout(() => {
      if (!activated) setInView(true);
    }, 350);
    return () => {
      clearTimeout(t);
      if (io) io.disconnect();
    };
  }, [threshold]);
  return [ref, inView] as const;
}

// --- Common arrow icon ---
export const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CheckGlyph = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path
      d="M2.5 6.5L5 9l4.5-5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CrossGlyph = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path
      d="M3 3l6 6M9 3l-6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// --- Three-bar Humanos mark (inline SVG, current color) ---
export const HumanosMark = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="6" width="3" height="12" fill="currentColor" />
    <rect x="10.5" y="3" width="3" height="18" fill="currentColor" />
    <rect x="17" y="9" width="3" height="9" fill="currentColor" />
  </svg>
);

// --- Result pill ---
export function ResultPill({
  kind,
  label,
}: {
  kind: string;
  label: ReactNode;
}) {
  return (
    <span className={`result-pill is-${kind}`}>
      <span className="mark"></span>
      <span>{label}</span>
    </span>
  );
}

// --- Mono caret marker ---
export const Caret = () => (
  <span style={{ color: "var(--c-execute)" }}>›</span>
);

// --- Corner brackets for SVG diagram framing ---
export function CornerBrackets({
  x,
  y,
  w,
  h,
  color,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
}) {
  const len = 14;
  return (
    <g stroke={color} strokeWidth="1.5" fill="none">
      <path d={`M ${x} ${y + len} L ${x} ${y} L ${x + len} ${y}`} />
      <path
        d={`M ${x + w - len} ${y} L ${x + w} ${y} L ${x + w} ${y + len}`}
      />
      <path
        d={`M ${x} ${y + h - len} L ${x} ${y + h} L ${x + len} ${y + h}`}
      />
      <path
        d={`M ${x + w - len} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y + h - len}`}
      />
    </g>
  );
}

// --- Section outcome block: educates on "why this matters" + optional API docs link ---
export function SectionOutcome({
  outcomes = [],
  docs,
  label = "What this unlocks",
}: {
  outcomes?: ReactNode[];
  docs?: { href: string; label: string };
  label?: string;
}) {
  return (
    <Reveal>
      <div className="section-outcome">
        <div className="section-outcome-body">
          <div className="section-outcome-label">{label}</div>
          <ul className="section-outcome-list">
            {outcomes.map((o, i) => (
              <li key={i} className="section-outcome-item">
                <span
                  className="section-outcome-item-mark"
                  aria-hidden="true"
                >
                  <CheckGlyph size={11} />
                </span>
                <span className="section-outcome-item-text">{o}</span>
              </li>
            ))}
          </ul>
        </div>
        {docs && (
          <a
            className="section-outcome-docs"
            href={docs.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="section-outcome-docs-meta">
              <span className="mono section-outcome-docs-kicker">API DOCS</span>
              <span className="section-outcome-docs-label">{docs.label}</span>
            </span>
            <span className="section-outcome-docs-arrow">
              <ArrowRight />
            </span>
          </a>
        )}
      </div>
    </Reveal>
  );
}
