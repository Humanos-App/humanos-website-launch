"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Homepage hero visual — two stacked elements:
 *
 *   1. A flip card on top that toggles every 8s between two views of the
 *      same authorization:
 *        - "Human approval"   — Maria Costa signs a casual chat-style note.
 *        - "Mandate"          — the same authorization as a machine-
 *                               verifiable mandate.json document.
 *
 *   2. A dark "flowcard" underneath — the exact diagram from the Trust
 *      page hero (.flowcard / .flow / .node / .wire / .spark), with
 *      the four nodes sequenced for the homepage narrative:
 *        Agent wants to act → humanos.verify() (indigo) →
 *        Execution (green) → Proof.
 *
 * Animations are gated by an IntersectionObserver so they stop when the
 * hero scrolls out of view, and respect prefers-reduced-motion.
 */

export function RuntimeFlow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const [isMandate, setIsMandate] = useState(false);

  /* Stamps render as a placeholder until after mount so the SSR
     and first client paint agree (avoids a hydration mismatch on
     time-of-day). The approval is "now"; the mandate is one minute
     later — the mandate is issued just after Maria signs. */
  const [stamps, setStamps] = useState<{
    approval: string;
    mandate: string;
  } | null>(null);

  useEffect(() => {
    const fmt = (d: Date) =>
      `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    const now = new Date();
    const later = new Date(now.getTime() + 60_000);
    setStamps({ approval: fmt(now), mandate: fmt(later) });
  }, []);

  /* ----- flowcard cascade -----
     The cascade is gated on isMandate, NOT on IO. While the approval
     card is showing, the four nodes stay dim — the diagram looks
     "locked," ready to fire. As soon as the mandate flips in, the
     trust-page cascade plays (and re-loops every 4.2s for as long as
     the mandate is visible). When the approval flips back in, the
     effect cleanup resets every node to its un-lit state. */
  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return;
    const items = Array.from(flow.querySelectorAll<HTMLElement>("[data-i]"));
    const lit = items.filter((n) => n.classList.contains("node"));

    /* Reset and bail out while the approval is showing. */
    if (!isMandate) {
      lit.forEach((n) => n.classList.remove("is-lit"));
      return;
    }

    /* Respect reduced-motion: keep all nodes lit (no animation). */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lit.forEach((n) => n.classList.add("is-lit"));
      return;
    }

    let timers: number[] = [];
    const clear = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
    };

    /* One-shot cascade, slow. Initial 600ms lead-in so the flip's
       0.55s transition completes before the first node lights; then
       one node per second. Nodes stay lit for the rest of the
       mandate window — no looping. */
    lit.forEach((n) => n.classList.remove("is-lit"));
    lit.forEach((n, i) => {
      timers.push(
        window.setTimeout(() => n.classList.add("is-lit"), 600 + i * 1000),
      );
    });

    return () => {
      clear();
      lit.forEach((n) => n.classList.remove("is-lit"));
    };
  }, [isMandate]);

  /* ----- flip card toggle (loop: 2s approval / 8s mandate) -----
     Chained setTimeout so the duration matches the face that just
     became visible. State is tracked in a plain local variable
     (`current`) — calling setIsMandate as a simple value setter
     avoids React 18 strict-mode double-invocation of state updaters,
     which would otherwise queue duplicate timeouts and stall the loop. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timeoutId: number | null = null;
    let current = false; // local mirror of isMandate — starts on approval

    const tick = () => {
      current = !current;
      setIsMandate(current);
      timeoutId = window.setTimeout(tick, current ? 8_000 : 2_000);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        if (visible && timeoutId === null) {
          /* Approval is the initial state — first flip to mandate
             happens after 2 seconds. */
          timeoutId = window.setTimeout(tick, 2_000);
        } else if (!visible && timeoutId !== null) {
          window.clearTimeout(timeoutId);
          timeoutId = null;
        }
      },
      { threshold: 0.2 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`rtflow${isMandate ? " is-mandate" : ""}`}
      aria-hidden="true"
    >
      {/* Flip card — Human approval ↔ Mandate */}
      <div className={`rtflip${isMandate ? " is-mandate" : ""}`}>
        <div className="rtflip__inner">
          {/* Face 1 — Human approval (beige chat note) */}
          <article className="rtflip__face rtflip__face--approval">
            <header className="rtflip__head">
              <span className="rtflip__avatar">MC</span>
              <span className="rtflip__name">Maria Costa</span>
            </header>
            <p className="rtflip__msg">
              Book my Milan trip, spend up to <strong>€1,200</strong>, maximum{" "}
              <strong>€250 / night</strong> in hotels, valid until Friday.
            </p>
            <footer className="rtflip__foot">
              <span className="rtflip__signed">✓ SIGNED</span>
              <span className="rtflip__stamp">{stamps?.approval ?? "—"}</span>
            </footer>
          </article>

          {/* Face 2 — Mandate (dark JSON document) */}
          <article className="rtflip__face rtflip__face--mandate">
            <header className="rtflip__bar">
              <span className="rtflip__bar-dot rtflip__bar-dot--red" />
              <span className="rtflip__bar-dot rtflip__bar-dot--amber" />
              <span className="rtflip__bar-dot rtflip__bar-dot--green" />
              <span className="rtflip__bar-name">mandate.json</span>
              <span className="rtflip__bar-stamp">
                {stamps?.mandate ?? "—"}
              </span>
            </header>
            <pre className="rtflip__code">
              <span className="rtj__brace">{"{"}</span>
              {"\n  "}
              <span className="rtj__k">&quot;action&quot;</span>
              <span className="rtj__c">: </span>
              <span className="rtj__s">&quot;book_travel&quot;</span>
              <span className="rtj__c">,</span>
              {"\n  "}
              <span className="rtj__k">&quot;budget&quot;</span>
              <span className="rtj__c">: </span>
              <span className="rtj__n">1200</span>
              <span className="rtj__c">,</span>
              {"\n  "}
              <span className="rtj__k">&quot;hotel_max&quot;</span>
              <span className="rtj__c">: </span>
              <span className="rtj__n">250</span>
              <span className="rtj__c">,</span>
              {"\n  "}
              <span className="rtj__k">&quot;expires&quot;</span>
              <span className="rtj__c">: </span>
              <span className="rtj__s">&quot;Fri&quot;</span>
              <span className="rtj__c">,</span>
              {"\n  "}
              <span className="rtj__k">&quot;approved_by&quot;</span>
              <span className="rtj__c">: </span>
              <span className="rtj__s">&quot;Maria Costa&quot;</span>
              <span className="rtj__c">,</span>
              {"\n  "}
              <span className="rtj__k">&quot;verified&quot;</span>
              <span className="rtj__c">: </span>
              <span className="rtj__pill">true</span>
              {"\n"}
              <span className="rtj__brace">{"}"}</span>
            </pre>
          </article>
        </div>
      </div>

      {/* Flow diagram — copied design from /trust hero (.flowcard) */}
      <div className="flowcard">
        <div className="flowcard__head">
          <span className="pip" />
          Runtime authorization lifecycle
        </div>
        <div className="flow" ref={flowRef}>
          <div className="node" data-i>
            <span className="pip" />
            Agent wants to act
          </div>
          <div className="wire" data-i>
            <span className="spark" />
          </div>
          <div className="node node--accent" data-i>
            humanos.verify()
          </div>
          <div className="wire" data-i>
            <span className="spark" />
          </div>
          <div className="node node--ok" data-i>
            <span className="pip" />
            Execution
          </div>
          <div className="wire" data-i>
            <span className="spark" />
          </div>
          <div className="node" data-i>
            <span className="pip" />
            Proof
          </div>
        </div>
      </div>
    </div>
  );
}
