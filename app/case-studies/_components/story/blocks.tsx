import { Fragment, type CSSProperties, type ReactNode } from "react";
import { TalkWithUs } from "@/components/dialogs/TalkWithUs";

/**
 * Content blocks for customer stories (app/styles/customer-story.css).
 * Section spacing is handled by the stylesheet, so blocks carry no
 * margins of their own — drop them into a StorySection body in order.
 */

type Tone = "default" | "strong" | "muted" | "negative" | "positive";

const cx = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");
const toneClass = (t?: Tone) => (t && t !== "default" ? `is-${t}` : undefined);

/* ---------- text ---------- */

/** A stack of body paragraphs. Children are <p> (or <ul>) elements. */
export function Prose({ children }: { children: ReactNode }) {
  return <div className="story-prose">{children}</div>;
}

/** Accent-coloured span, for the emphasised tail of a statement. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="story-accent">{children}</span>;
}

/** A standout line. sm ≈ 20px, md ≈ 24px, lg ≈ 34px (multi-line closers). */
export function Statement({
  children,
  size = "md",
}: {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  return <p className={`story-statement story-statement--${size}`}>{children}</p>;
}

/** A statement set between two hairlines. */
export function PullStatement({ children }: { children: ReactNode }) {
  return <p className="story-pull">{children}</p>;
}

/** "From … → to …" contrast pair. */
export function FromTo({ from, to }: { from: ReactNode; to: ReactNode }) {
  return (
    <div className="story-fromto">
      <p className="story-fromto__from">{from}</p>
      <p className="story-fromto__to">
        <span className="story-accent" aria-hidden="true">
          →{" "}
        </span>
        {to}
      </p>
    </div>
  );
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return <p className="story-disclaimer">{children}</p>;
}

/* ---------- boxes ---------- */

/** Bordered box with a small uppercase heading. */
export function Callout({
  heading,
  headingStyle = "label",
  variant = "surface",
  label,
  children,
}: {
  heading: ReactNode;
  /** label: sans, muted · mono: monospace, muted · accent: monospace, indigo */
  headingStyle?: "label" | "mono" | "accent";
  /** surface: filled card · outline: hairline only */
  variant?: "surface" | "outline";
  /** Accessible name for the aside; defaults to the heading text. */
  label?: string;
  children: ReactNode;
}) {
  return (
    <aside
      className={cx("story-callout", variant === "outline" && "story-callout--outline")}
      aria-label={label ?? (typeof heading === "string" ? heading : undefined)}
    >
      <h3
        className={cx(
          "story-callout__heading",
          headingStyle !== "label" && "story-callout__heading--mono",
          headingStyle === "accent" && "story-callout__heading--accent",
        )}
      >
        {heading}
      </h3>
      <div className="story-callout__body">{children}</div>
    </aside>
  );
}

/** Numbered list in a responsive two-column grid (01, 02, …). */
export function NumberedList({ items }: { items: ReactNode[] }) {
  return (
    <ol className="story-numbered">
      {items.map((item, i) => (
        <li key={i}>
          <span className="story-numbered__n">{String(i + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

/** Label → value rows. `ruled` for section-level lists with uppercase
 *  labels, `inset` for sentence-case rows inside a Callout. */
export function KeyValueList({
  items,
  variant = "ruled",
  labelWidth = 140,
}: {
  items: Array<{
    label: ReactNode;
    value: ReactNode;
    labelTone?: "accent" | "muted" | "strong";
    valueTone?: "default" | "strong";
  }>;
  variant?: "ruled" | "inset";
  labelWidth?: number;
}) {
  return (
    <dl
      className={`story-kv story-kv--${variant}`}
      style={{ "--kv-label": `${labelWidth}px` } as CSSProperties}
    >
      {items.map((it, i) => (
        <div key={i} className="story-kv__row">
          <dt className={it.labelTone && it.labelTone !== "accent" ? `is-${it.labelTone}` : undefined}>
            {it.label}
          </dt>
          <dd className={it.valueTone === "strong" ? "is-strong" : undefined}>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Responsive grid of bordered cards; `highlight` marks the Humanos one. */
export function CardGrid({
  items,
  min = 240,
}: {
  items: Array<{
    label: ReactNode;
    title?: ReactNode;
    text?: ReactNode;
    tags?: string[];
    highlight?: boolean;
  }>;
  /** Minimum card width before the grid wraps. */
  min?: number;
}) {
  return (
    <dl className="story-cards" style={{ "--cards-min": `${min}px` } as CSSProperties}>
      {items.map((it, i) => (
        <div key={i} className={cx("story-card", it.highlight && "is-hl")}>
          <dt className="story-card__label">{it.label}</dt>
          {it.title && <dd className="story-card__title">{it.title}</dd>}
          {it.text && <dd className="story-card__text">{it.text}</dd>}
          {it.tags && it.tags.length > 0 && (
            <dd className="story-card__tags">
              {it.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}

/** Ruled grid of short label/value facts. */
export function FactGrid({
  items,
}: {
  items: Array<{ label: ReactNode; value: ReactNode }>;
}) {
  return (
    <dl className="story-facts">
      {items.map((it, i) => (
        <div key={i}>
          <dt>{it.label}</dt>
          <dd>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Numbered steps in a filled card, with a mono caption. */
export function StepsCard({
  caption,
  steps,
}: {
  caption: ReactNode;
  steps: Array<{ title: ReactNode; text: ReactNode }>;
}) {
  return (
    <figure className="story-steps">
      <figcaption>{caption}</figcaption>
      <ol>
        {steps.map((s, i) => (
          <li key={i}>
            <span className="story-steps__n">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** Big figure beside a title and a short description. */
export function StatBox({
  figure,
  title,
  text,
}: {
  figure: ReactNode;
  title: ReactNode;
  text: ReactNode;
}) {
  return (
    <aside className="story-stat">
      <p className="story-stat__figure">{figure}</p>
      <div className="story-stat__body">
        <p className="story-stat__title">{title}</p>
        <p className="story-stat__text">{text}</p>
      </div>
    </aside>
  );
}

/* ---------- flows ---------- */

type FlowStep = { label: ReactNode; desc: ReactNode; highlight?: boolean };

/** Vertical stack of boxes joined by short indigo connectors. */
export function FlowStack({ label, steps }: { label: string; steps: FlowStep[] }) {
  return (
    <figure className="story-flowstack">
      <ol aria-label={label}>
        {steps.map((s, i) => (
          <li key={i} className={s.highlight ? "is-hl" : undefined}>
            <span className="story-flowstack__label">{s.label}</span>
            <span className="story-flowstack__desc">{s.desc}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** Horizontal row of boxes with → between them; stacks with ↓ on phones. */
export function FlowRow({ label, steps }: { label: string; steps: FlowStep[] }) {
  return (
    <figure className="story-flowrow">
      <ol aria-label={label}>
        {steps.map((s, i) => (
          <li key={i} className={s.highlight ? "is-hl" : undefined}>
            <span className="story-flowrow__label">{s.label}</span>
            <span className="story-flowrow__desc">{s.desc}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** Inline mono sequence "A → B → C", last item in indigo. */
export function Chain({ items }: { items: string[] }) {
  return (
    <p className="story-chain">
      {items.map((it, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span className="story-chain__arrow" aria-hidden="true">
              →
            </span>
          )}
          <span className="story-chain__item">{it}</span>
        </Fragment>
      ))}
    </p>
  );
}

/** Stage strip over an indigo "one integration" caption bar. */
export function LifecycleStrip({
  label,
  stages,
  caption,
}: {
  label: string;
  stages: string[];
  caption: ReactNode;
}) {
  return (
    <figure className="story-lifecycle">
      <ol aria-label={label}>
        {stages.map((s, i) => (
          <li key={s}>
            <span>{s}</span>
            {i < stages.length - 1 && (
              <span className="story-lifecycle__arrow" aria-hidden="true">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption>
        <img src="/assets/logo-mark-white.svg" alt="" />
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

/* ---------- comparison ---------- */

type Cell = ReactNode | { content: ReactNode; tone?: Tone };

const isToned = (c: Cell): c is { content: ReactNode; tone?: Tone } =>
  typeof c === "object" && c !== null && "content" in (c as object);

/** Bordered comparison table. `highlight` is the index of the column to
 *  mark as the Humanos side; `rowHeaders` renders the first cell of each
 *  row as a row header. */
export function CompareTable({
  caption,
  columns,
  rows,
  highlight,
  rowHeaders = false,
  monoHead = false,
}: {
  caption: ReactNode;
  columns: ReactNode[];
  rows: Cell[][];
  highlight?: number;
  rowHeaders?: boolean;
  monoHead?: boolean;
}) {
  return (
    <div className="story-table-wrap">
      <table className={cx("story-table", monoHead && "story-table--mono-head")}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} scope="col" className={i === highlight ? "is-hl" : undefined}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, i) => {
                const content = isToned(cell) ? cell.content : cell;
                const cls = isToned(cell) ? toneClass(cell.tone) : undefined;
                return rowHeaders && i === 0 ? (
                  <th key={i} scope="row" className={cls}>
                    {content}
                  </th>
                ) : (
                  <td key={i} className={cls}>
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** ✔ APPROVE / ✖ DENY style state chips. */
export function Chips({
  items,
}: {
  items: Array<{ label: string; tone: "approve" | "deny" | "neutral" }>;
}) {
  return (
    <span className="story-chips">
      {items.map((it) => (
        <span key={it.label} className={cx("story-chip", it.tone !== "neutral" && `story-chip--${it.tone}`)}>
          {it.label}
        </span>
      ))}
    </span>
  );
}

/* ---------- closing ---------- */

/** Closing summary card, ending in the "Talk to Humanos" call to action
 *  (the site's book-a-call / send-a-message dialog). */
export function SummaryBox({
  children,
  cta = "Talk to Humanos",
}: {
  children: ReactNode;
  cta?: string;
}) {
  return (
    <aside className="story-summary" aria-label="Summary">
      {children}
      <div className="story-summary__cta">
        <TalkWithUs>
          <button type="button" className="story-cta">
            {cta} <span className="arrow">→</span>
          </button>
        </TalkWithUs>
      </div>
    </aside>
  );
}
