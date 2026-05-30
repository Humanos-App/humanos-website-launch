"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";

export type Filter = {
  key: string;
  label: string;
};

export type Story = {
  /** Filter category — matches one of the Filter.key values. */
  cat: string;
  /** Customer name shown in the card top. */
  name: string;
  status: "Integrated" | "In review";
  /** Mono-style domain label, e.g. "Agentic finance · Treasury". */
  domain: string;
  /** Title with optional <em> highlight via JSX. */
  title: ReactNode;
  desc: string;
  stats: Array<{ num: string; lab: string }>;
  /** Story link — pass "#" for placeholders. */
  href: string;
  /** CTA copy on the bottom-left link. */
  cta: string;
  /** Verify-panel content shown on the dark right pane. */
  verify: {
    chip: string;
    code: ReactNode;
    /** Three "subject resolved", "mandate matched", … lines. */
    checks: string[];
    /** Verdict line — accept JSX so the "● authorized" prefix can be highlighted. */
    verdict: ReactNode;
  };
};

export function StoriesGrid({
  filters,
  stories,
}: {
  filters: Filter[];
  stories: Story[];
}) {
  const [active, setActive] = useState<string>("all");
  const rootRef = useRef<HTMLDivElement>(null);

  /* Verify-panel animation loop. Each card's dark pane cycles through
     its checks in order, lights the verdict, marks the chip resolved,
     then resets — but only while the panel is on screen. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const panels = Array.from(
      root.querySelectorAll<HTMLElement>(".fcard__visual[data-anim]"),
    );

    const stoppers: Array<() => void> = [];
    panels.forEach((p) => {
      const checks = Array.from(p.querySelectorAll<HTMLElement>("[data-step]"));
      const verdict = p.querySelector<HTMLElement>("[data-verdict]");
      const state = p.querySelector<HTMLElement>(".fcard__chip .state");
      let timers: number[] = [];
      const clearT = () => {
        timers.forEach((t) => window.clearTimeout(t));
        timers = [];
      };
      const cycle = () => {
        clearT();
        p.classList.remove("is-resolved");
        if (state) state.textContent = "verifying…";
        checks.forEach((c) => c.classList.remove("is-on"));
        verdict?.classList.remove("is-on");
        checks.forEach((c, i) => {
          timers.push(
            window.setTimeout(() => c.classList.add("is-on"), 600 + i * 520),
          );
        });
        const after = 600 + checks.length * 520 + 380;
        timers.push(
          window.setTimeout(() => {
            verdict?.classList.add("is-on");
            p.classList.add("is-resolved");
            if (state) state.textContent = "resolved";
          }, after),
        );
      };

      let loop: number | null = null;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              if (loop === null) {
                cycle();
                loop = window.setInterval(cycle, 5400);
              }
            } else if (loop !== null) {
              window.clearInterval(loop);
              loop = null;
              clearT();
            }
          });
        },
        { threshold: 0.3 },
      );
      io.observe(p);
      stoppers.push(() => {
        io.disconnect();
        if (loop !== null) window.clearInterval(loop);
        clearT();
      });
    });

    return () => {
      stoppers.forEach((s) => s());
    };
  }, []);

  return (
    <>
      <div className="filters" id="filters">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`filter${active === f.key ? " is-active" : ""}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="featured" id="featured" ref={rootRef}>
        {stories.map((s, i) => {
          const visible = active === "all" || s.cat === active;
          const cardClass = `fcard${visible ? "" : " is-hidden"}`;
          const body = (
            <>
              <div className="fcard__body">
                <div className="fcard__top">
                  <span className="fcard__name">{s.name}</span>
                  <span
                    className={`fcard__status${
                      s.status === "In review" ? " fcard__status--review" : ""
                    }`}
                  >
                    {s.status}
                  </span>
                  <span className="fcard__domain">{s.domain}</span>
                </div>
                <h3 className="fcard__title">{s.title}</h3>
                <p className="fcard__desc">{s.desc}</p>
                <div className="fcard__stats">
                  {s.stats.map((st, j) => (
                    <div key={j} className="fcard__stat">
                      <div className="fcard__stat-num">{st.num}</div>
                      <div className="fcard__stat-lab">{st.lab}</div>
                    </div>
                  ))}
                </div>
                <span className="fcard__link">
                  {s.cta} <span className="arrow">→</span>
                </span>
              </div>

              <div className="fcard__visual" data-anim>
                <span className="fcard__chip">
                  <span className="pip" />
                  {s.verify.chip} <span className="state">verifying…</span>
                </span>
                <div className="code-mini">
                  <pre>{s.verify.code}</pre>
                </div>
                <ul className="va__checks">
                  {s.verify.checks.map((c, j) => (
                    <li key={j} className="va__check" data-step>
                      <span className="ic" />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="fcard__verdict va__verdict" data-verdict>
                  {s.verify.verdict}
                </div>
              </div>
            </>
          );

          if (s.href === "#" || s.href === "") {
            return (
              <div key={`${s.name}-${i}`} className={cardClass}>
                {body}
              </div>
            );
          }
          return (
            <Link key={`${s.name}-${i}`} href={s.href} className={cardClass}>
              {body}
            </Link>
          );
        })}
      </div>
    </>
  );
}
