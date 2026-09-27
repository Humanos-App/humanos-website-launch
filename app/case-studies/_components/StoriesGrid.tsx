"use client";

import { type ReactNode, useState } from "react";
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
  status: "Integrated" | "In review" | "Testing";
  /** Mono-style domain label, e.g. "Agentic finance · Treasury". */
  domain: string;
  /** Title with optional <em> highlight via JSX. */
  title: ReactNode;
  desc: string;
  /** Optional — no longer rendered on the cards, kept for back-compat
   *  with existing story data. */
  stats?: Array<{ num: string; lab: string }>;
  /** Story link — pass "#" for placeholders. */
  href: string;
  /** CTA copy on the bottom-left link. */
  cta: string;
  /** Dotted illustration shown on the dark right pane — the same art as
   *  the story's card in the homepage carousel (public/assets/stories). */
  image: string;
};

export function StoriesGrid({
  filters,
  stories,
}: {
  filters: Filter[];
  stories: Story[];
}) {
  const [active, setActive] = useState<string>("all");

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

      <div className="featured" id="featured">
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
                      s.status !== "Integrated" ? " fcard__status--review" : ""
                    }`}
                  >
                    {s.status}
                  </span>
                  <span className="fcard__domain">{s.domain}</span>
                </div>
                <h3 className="fcard__title">{s.title}</h3>
                <p className="fcard__desc">{s.desc}</p>
                <span className="fcard__link">
                  {s.cta} <span className="arrow">→</span>
                </span>
              </div>

              <div className="fcard__visual">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="fcard__art"
                  src={s.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
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
