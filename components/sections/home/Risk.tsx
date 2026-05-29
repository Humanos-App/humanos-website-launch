"use client";

import { useEffect, useRef } from "react";

const ROTATING_MESSAGES = [
  "Compliance blocks rollout.",
  "Legal team cannot defend the decision.",
  "Unauthorized transaction is disputed.",
  "Financial liability becomes unclear.",
  "Enterprise customer loses trust.",
];

export function Risk() {
  const rotateRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = rotateRef.current;
    if (!el) return;
    const span = el.querySelector<HTMLElement>("[data-rotate-text]");
    if (!span) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let i = 0;
    const interval = setInterval(() => {
      el.classList.add("is-leaving");
      setTimeout(
        () => {
          i = (i + 1) % ROTATING_MESSAGES.length;
          span.textContent = ROTATING_MESSAGES[i];
          el.classList.remove("is-leaving");
          el.classList.add("is-entering", "is-fresh");
          requestAnimationFrame(() => {
            requestAnimationFrame(() =>
              el.classList.remove("is-entering"),
            );
          });
          setTimeout(() => el.classList.remove("is-fresh"), 60);
        },
        reduced ? 200 : 380,
      );
    }, 3400);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="risk" data-screen-label="02 Risk">
      <div className="wrap">
        <div className="risk__layout">
          <div className="risk__head">
            <div className="risk__eyebrow">The execution gap</div>
            <h2 className="risk__title">
              Every AI action must be <span className="em">verifiable</span>{" "}
              before execution and <span className="em">defensible</span>{" "}
              afterwards.
            </h2>
            <p className="risk__sub">
              Authorization still lives across emails, chats, PDFs, and
              disconnected workflows.{" "}
              <span className="em">AI systems execute anyway.</span>
            </p>
            <p className="risk__sub" style={{ marginTop: 16 }}>
              Without verifiable authorization, every automated action becomes a{" "}
              <span className="em">liability</span>.
            </p>
          </div>

          <ol className="risk__chain">
            <li className="risk__link">
              <span className="risk__num">01</span>
              <span className="risk__line">AI agent executes action.</span>
            </li>
            <li className="risk__link risk__link--bad">
              <span className="risk__num">02</span>
              <span className="risk__line">
                <span className="bad">No verifiable authorization exists.</span>
              </span>
            </li>
            <li className="risk__link risk__link--bad risk__link--rotate">
              <span className="risk__num">03</span>
              <span
                ref={rotateRef}
                className="risk__line risk__line--rotate"
                aria-live="polite"
              >
                <span className="bad" data-rotate-text>
                  {ROTATING_MESSAGES[0]}
                </span>
              </span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
