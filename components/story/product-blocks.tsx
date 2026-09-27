import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { TalkWithUs } from "@/components/dialogs/TalkWithUs";
import { EXTERNAL_LINKS } from "@/lib/external-links";

/**
 * Product blocks for the Solutions pages, on top of the story layout
 * (app/styles/customer-story.css). Pure HTML/CSS: small UI cards that show
 * a result in plain language rather than code, plus the six animated
 * controls adapted from the previous homepage's "Network & trust" cards.
 */

const cx = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

/* ---------- calls to action ---------- */

/** The Solutions pages' pair: the API docs, and a call via the site's
 *  Talk to us dialog. */
export function StoryCtas() {
  return (
    <div className="story-ctas">
      <a
        className="story-cta"
        href={EXTERNAL_LINKS.docs}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read the API docs <span className="arrow">→</span>
      </a>
      <TalkWithUs>
        <button type="button" className="story-cta story-cta--ghost">
          Book a call
        </button>
      </TalkWithUs>
    </div>
  );
}

/** Hand-off to the next page in the Measure → Control → Intelligence story. */
export function BridgeCard({
  href,
  eyebrow = "Next",
  title,
  text,
}: {
  href: string;
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
}) {
  return (
    <Link href={href} className="story-bridge">
      <span className="story-bridge__eyebrow">{eyebrow}</span>
      <span className="story-bridge__title">
        {title} <span className="arrow" aria-hidden="true">→</span>
      </span>
      {text && <span className="story-bridge__text">{text}</span>}
    </Link>
  );
}

/** Closing statement with the page's calls to action. */
export function FinalCta({ title }: { title: ReactNode }) {
  return (
    <div className="story-final">
      <p className="story-final__title">{title}</p>
      <StoryCtas />
    </div>
  );
}

/* ---------- lists ---------- */

/** Large numbered question → answer rows. */
export function QuestionList({
  items,
}: {
  items: Array<{ q: ReactNode; a: ReactNode }>;
}) {
  return (
    <ol className="story-qa">
      {items.map((it, i) => (
        <li key={i}>
          <span className="story-qa__n">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p className="story-qa__q">{it.q}</p>
            <p className="story-qa__a">{it.a}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Findings that push the risk score up. */
export function Findings({
  label = "Raises risk",
  items,
}: {
  label?: string;
  items: ReactNode[];
}) {
  return (
    <ul className="story-findings">
      {items.map((it, i) => (
        <li key={i}>
          <span className="story-findings__dot" aria-hidden="true" />
          <span className="story-findings__text">{it}</span>
          <span className="story-findings__tag">{label}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- UI cards ---------- */

/** A 0–100 risk card: agent, live marker, score, trend, latest events.
 *  Higher is riskier; rising events read red, falling ones indigo. */
export function LiveRiskCard({
  agent,
  org,
  score,
  trend,
  events,
}: {
  agent: string;
  org?: string;
  score: number;
  /** Recent scores, oldest first (0–100). */
  trend: number[];
  events: Array<{ time: string; label: string; risk: number; up?: boolean }>;
}) {
  const W = 100;
  const H = 40;
  const step = W / Math.max(trend.length - 1, 1);
  const pts = trend.map((v, i) => [i * step, H - (v / 100) * H] as const);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const head = pts[pts.length - 1];
  return (
    <figure className="story-live" aria-label={`${agent} live risk score ${score} of 100`}>
      <div className="story-live__head">
        <div>
          <p className="story-live__agent">{agent}</p>
          {org && <p className="story-live__org">{org}</p>}
          <p className="story-live__status">
            <span className="story-live__pulse" aria-hidden="true" />
            Live agent risk score
          </p>
        </div>
        <p className="story-live__score">
          {score}
          <span> / 100</span>
        </p>
      </div>
      <svg className="story-live__chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
        {[0, 0.25, 0.5, 0.75, 1].map((g) => (
          <line key={g} x1="0" x2={W} y1={g * H} y2={g * H} className="story-live__grid" />
        ))}
        <path d={d} className="story-live__line" />
        {/* a zero-length round-capped stroke stays a circle under the
            chart's non-uniform scaling, unlike an SVG <circle> */}
        {head && (
          <path
            d={`M${head[0].toFixed(1)} ${head[1].toFixed(1)}l0 0`}
            className="story-live__head-dot"
          />
        )}
      </svg>
      <p className="story-live__label">Latest runtime events</p>
      <ul className="story-live__events">
        {events.map((e, i) => (
          <li key={i}>
            <span className="story-live__time">{e.time}</span>
            <span className="story-live__event">{e.label}</span>
            <span className={cx("story-live__risk", e.up && "is-up")}>Risk {e.risk}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

type RowTone = "blocked" | "allowed" | "pending";

/** A single action's outcome, row by row. */
export function DecisionCard({
  caption = "Decision",
  rows,
}: {
  caption?: string;
  rows: Array<{ label: string; value: ReactNode; tone?: RowTone }>;
}) {
  return (
    <figure className="story-decision">
      <figcaption>{caption}</figcaption>
      <dl>
        {rows.map((r) => (
          <div key={r.label}>
            <dt>{r.label}</dt>
            <dd>{r.tone ? <span className={`story-badge is-${r.tone}`}>{r.value}</span> : r.value}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}

/** What is true about an agent right now, as a checklist. */
export function SnapshotCard({
  agent,
  score,
  checks,
  note,
}: {
  agent: string;
  score: number;
  checks: string[];
  note?: ReactNode;
}) {
  return (
    <figure className="story-snapshot" aria-label={`Trust snapshot for ${agent}`}>
      <div className="story-snapshot__head">
        <span className="story-snapshot__agent">{agent}</span>
        <span className="story-snapshot__score">
          Risk <strong>{score}</strong> / 100
        </span>
      </div>
      <ul>
        {checks.map((c) => (
          <li key={c}>
            <span className="story-snapshot__ok" aria-hidden="true">✓</span>
            {c}
          </li>
        ))}
      </ul>
      {note && <p className="story-snapshot__note">{note}</p>}
    </figure>
  );
}

/* ---------- the six controls ---------- */

type GuardVisual = "identity" | "human" | "policy" | "check" | "approval" | "record";

function GuardVis({ kind }: { kind: GuardVisual }) {
  switch (kind) {
    case "identity":
      return (
        <div className="gv-id">
          {[0, 1, 2].map((i) => (
            <span key={i} className="gv-id__row">
              <span className="gv-id__pip" />
              <span className="gv-id__line" />
              <span className="gv-id__mark">✓</span>
            </span>
          ))}
        </div>
      );
    case "human":
      return (
        <div className="gv-chips">
          {["OTP", "Passkey", "KYC"].map((c) => (
            <span key={c} className="gv-chips__chip">{c}</span>
          ))}
        </div>
      );
    case "policy":
      return (
        <div className="gv-policy">
          {[62, 38, 80, 50].map((w, i) => (
            <span key={i} className="gv-policy__row" style={{ "--w": `${w}%` } as CSSProperties}>
              <span className="gv-policy__tag" />
              <span className="gv-policy__track">
                <span className="gv-policy__fill" />
              </span>
            </span>
          ))}
        </div>
      );
    case "check":
      return (
        <div className="gv-flow">
          <span className="gv-flow__box">agent</span>
          <span className="gv-flow__conn gv-flow__conn--a" />
          <span className="gv-flow__box gv-flow__box--gate">check</span>
          <span className="gv-flow__conn gv-flow__conn--b" />
          <span className="gv-flow__box">action</span>
        </div>
      );
    case "approval":
      return (
        <div className="gv-flow gv-flow--approval">
          <span className="gv-flow__box gv-approval__agent">
            agent<span className="gv-approval__ok">✓</span>
          </span>
          <span className="gv-flow__conn gv-approval__conn" />
          <span className="gv-flow__box gv-approval__person">person</span>
        </div>
      );
    case "record":
      return (
        <div className="gv-log">
          {["", "", "is-blocked", "is-ok", ""].map((tone, i) => (
            <span key={i} className="gv-log__item">
              {i > 0 && <span className="gv-log__link" />}
              <span className={cx("gv-log__block", tone)} />
            </span>
          ))}
        </div>
      );
  }
}

/** Six controls as one system: eyebrow, looping visual, title, one-liner. */
export function GuardrailGrid({
  items,
}: {
  items: Array<{ eyebrow: string; title: ReactNode; text: ReactNode; visual: GuardVisual }>;
}) {
  return (
    <ol className="story-guards">
      {items.map((it, i) => (
        <li key={i} className="story-guard">
          <span className="story-guard__eyebrow">
            {it.eyebrow} <span className="num">· {String(i + 1).padStart(2, "0")}</span>
          </span>
          <span className="story-guard__vis" aria-hidden="true">
            <GuardVis kind={it.visual} />
          </span>
          <h3 className="story-guard__title">{it.title}</h3>
          <p className="story-guard__text">{it.text}</p>
        </li>
      ))}
    </ol>
  );
}
