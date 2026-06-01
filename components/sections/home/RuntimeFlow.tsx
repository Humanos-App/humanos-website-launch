"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Homepage hero visual — three stacked cards telling one narrative:
 *
 *   1. APPROVAL ↔ MANDATE  (flip card)
 *      Front: a chat-style human message from "Elena Ruiz".
 *      Back:  the structured, machine-verifiable mandate that approval
 *             gets transformed into. Flips every 4s.
 *
 *   2. AGENT EXECUTION  (live stream)
 *      The treasury agent attempts random payments; the frontend
 *      approves anything ≤ €10,000 / day and rejects the rest, based
 *      on Card 1's mandate. New attempts arrive on a 1.8s tick.
 *
 *   3. EXECUTION RECEIPTS  (audit trail)
 *      Each approved attempt from Card 2 produces a portable proof
 *      anyone can verify (Auditor / Regulator / Counterparty). Frames
 *      the "trustless" / "no callback to Humanos" property.
 *
 * Animations are gated by an IntersectionObserver so they don't burn
 * CPU when the hero is scrolled off-screen, and respect
 * prefers-reduced-motion.
 */

type Attempt = {
  id: number;
  time: string;
  amount: number;
  vendor: string;
  approved: boolean;
  proofId: string;
};

/* Allowed vendors come from the mandate on Card 1; the rest of the
   pool gets pulled in so the random picker generates a healthy mix of
   approvals and rejections. */
const ALLOWED_VENDORS = ["AWS", "Stripe", "Vercel", "Anthropic"] as const;
const BLOCKED_VENDORS = ["GCP", "Cloudflare", "OpenAI", "Azure"] as const;
const VENDORS = [...ALLOWED_VENDORS, ...BLOCKED_VENDORS] as const;

const ALLOWED_SET = new Set<string>(ALLOWED_VENDORS);
const DAILY_LIMIT = 10000;

/** Static seed so SSR + CSR initial paint match; live updates take
 *  over once the page hydrates and is in view. */
const INITIAL_ATTEMPTS: Attempt[] = [
  {
    id: 1,
    time: "14:22:48Z",
    amount: 4200,
    vendor: "AWS",
    approved: true,
    proofId: "prf_2FA91",
  },
  {
    id: 2,
    time: "14:22:31Z",
    amount: 6800,
    vendor: "Stripe",
    approved: true,
    proofId: "prf_4B22A",
  },
  {
    id: 3,
    time: "14:22:12Z",
    amount: 2400,
    vendor: "GCP",
    approved: false,
    proofId: "prf_C18FE",
  },
];

function nowISO(): string {
  return new Date().toISOString().slice(11, 19) + "Z";
}

function pad5(n: number): string {
  return n.toString(16).toUpperCase().padStart(5, "0").slice(-5);
}

function makeAttempt(id: number): Attempt {
  /* Vendors are picked uniformly across the full pool (allowed +
     blocked), so the verdict mix tracks the size of each pool. Amount
     is rounded to the nearest €100 to keep the row tidy; the verdict
     itself is purely vendor-based — anything not in ALLOWED_VENDORS
     gets blocked. */
  const vendor = VENDORS[Math.floor(Math.random() * VENDORS.length)];
  const raw = 800 + Math.random() * (DAILY_LIMIT - 800);
  const amount = Math.round(raw / 100) * 100;
  return {
    id,
    time: nowISO(),
    amount,
    vendor,
    approved: ALLOWED_SET.has(vendor),
    proofId: `prf_${pad5(Math.floor(Math.random() * 0xfffff))}`,
  };
}

/* ============================================================ Card 1 */

function ApprovalMandateCard({ inView }: { inView: boolean }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    const id = window.setInterval(() => setFlipped((f) => !f), 4000);
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <div className={`hf-card hf-flip${flipped ? " is-flipped" : ""}`}>
      <div className="hf-flip__inner">
        {/* Front: raw human approval */}
        <div className="hf-flip__face hf-flip__face--front">
          <div className="hf-card__head">
            <span>Human approval</span>
            <span className="hf-card__head-r">SIGNED</span>
          </div>
          <div className="hf-approval">
            <div className="hf-approval__avatar">ER</div>
            <div className="hf-approval__body">
              <div className="hf-approval__meta">
                <span className="hf-approval__name">Elena Ruiz</span>
                <span className="hf-approval__time">14:22</span>
              </div>
              <div className="hf-approval__msg">
                Authorize treasury transfers up to{" "}
                <strong>€10,000 / day</strong> to{" "}
                <strong>AWS, Stripe, Vercel and Anthropic</strong> until June 1.
              </div>
            </div>
          </div>
        </div>

        {/* Back: structured, machine-verifiable mandate.
            Reuses the .pshift__mandate visual from the "Authorization
            layer" section so the two surfaces read as the same artefact. */}
        <div className="hf-flip__face hf-flip__face--back">
          <article className="pshift__mandate">
            <header className="pshift__mandate-head">
              <span className="pshift__mandate-kind">
                <span className="dot" />
                Mandate
              </span>
              <span className="pshift__mandate-id">0xA13F…E2C9</span>
            </header>
            <div className="pshift__mandate-rows">
              <span className="pshift__mandate-k">Subject</span>
              <span className="pshift__mandate-v">treasury@acme</span>
              <span className="pshift__mandate-k">Constraint</span>
              <span className="pshift__mandate-v">≤ €10,000 / day</span>
              <span className="pshift__mandate-k">Vendors</span>
              <span className="pshift__mandate-v">
                AWS · Stripe · Vercel · Anthropic
              </span>
              <span className="pshift__mandate-k">Expires</span>
              <span className="pshift__mandate-v">2026-06-01T00:00Z</span>
            </div>
            <footer className="pshift__mandate-foot">
              <span className="ok">Verified by Humanos</span>
              <span>VC · v2.0</span>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ Card 2 */

function ExecutionStreamCard({ attempts }: { attempts: Attempt[] }) {
  return (
    <div className="hf-card hf-exec">
      <div className="hf-card__head">
        <span>Agent execution · live</span>
        <span className="hf-card__head-r">verify()</span>
      </div>
      <ul className="hf-exec__list">
        {attempts.map((a, i) => (
          <li
            key={a.id}
            className={`hf-exec__row hf-exec__row--${
              a.approved ? "ok" : "no"
            }${i === 0 ? " is-new" : ""}`}
          >
            <span className="hf-exec__amount">
              €{a.amount.toLocaleString()}
            </span>
            <span className="hf-exec__vendor">→ {a.vendor}</span>
            <span className="hf-exec__verdict">
              {a.approved ? "● authorized" : "● rejected"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================ Card 3 */

function AuditTrailCard({ receipts }: { receipts: Attempt[] }) {
  return (
    <div className="hf-card hf-audit">
      <div className="hf-card__head">
        <span>Execution receipts</span>
        <span className="hf-card__head-r">Auditable</span>
      </div>
      <ul className="hf-audit__list">
        {receipts.map((r) => (
          <li key={r.id} className="hf-audit__row">
            <div className="hf-audit__row-meta">
              <span className="hf-audit__row-time">{r.time}</span>
              <span className="hf-audit__row-amount">
                €{r.amount.toLocaleString()} → {r.vendor}
              </span>
            </div>
            <span className="hf-audit__proof">{r.proofId}</span>
          </li>
        ))}
      </ul>
      <div className="hf-audit__verifiers">
        <span className="hf-audit__verifier">Auditor</span>
        <span className="hf-audit__verifier">Regulator</span>
        <span className="hf-audit__verifier">Counterparty</span>
        <span className="hf-audit__verifier-note">→ verify(proof)</span>
      </div>
    </div>
  );
}

/* ============================================================ Root */

export function RuntimeFlow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>(INITIAL_ATTEMPTS);
  const counterRef = useRef<number>(INITIAL_ATTEMPTS.length + 1);

  /* Run the live execution stream whenever the panel is in view. */
  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      const attempt = makeAttempt(counterRef.current++);
      setAttempts((prev) => [attempt, ...prev].slice(0, 8));
    }, 1800);
    return () => window.clearInterval(id);
  }, [inView]);

  /* Pause/resume when the hero scrolls in or out of view. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.2 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  /* Card 2 shows the most recent 2 attempts (approved + rejected).
     Card 3 shows the 2 most recent APPROVED ones as portable proofs. */
  const recent = attempts.slice(0, 2);
  const receipts = attempts.filter((a) => a.approved).slice(0, 2);

  return (
    <div ref={rootRef} className="hf" aria-hidden="true">
      <ApprovalMandateCard inView={inView} />
      <ExecutionStreamCard attempts={recent} />
      <AuditTrailCard receipts={receipts} />
    </div>
  );
}
