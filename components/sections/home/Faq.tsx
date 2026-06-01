"use client";

import { useState } from "react";
import {
  FAQ_FILTERS,
  FAQ_ITEMS,
  type FaqCategory,
} from "./Faq.data";

export function Faq() {
  const [active, setActive] = useState<"all" | FaqCategory>("all");

  return (
    <section className="why" data-screen-label="04 Why Humanos">
      <div className="why__wrap">
        <div className="why__head">
          <div className="why__eyebrow">FAQ</div>
          <h2 className="why__title">
            Authorization, as infrastructure you call, not a feature you build.
          </h2>
        </div>

        <div className="filters why__filters">
          {FAQ_FILTERS.map((f) => (
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

        <ul className="why__list">
          {FAQ_ITEMS.map((item) => {
            const visible = active === "all" || item.cat === active;
            return (
              <li
                key={item.q}
                className={visible ? "" : "is-hidden"}
              >
                <details className="why__item">
                  <summary className="why__q">
                    <span className="why__q-text">{item.q}</span>
                    <span className="why__q-icon" aria-hidden="true" />
                  </summary>
                  <p className="why__a">{item.a}</p>
                </details>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
