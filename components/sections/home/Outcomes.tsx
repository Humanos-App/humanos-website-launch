"use client";

import { useState, type ReactNode } from "react";
import { EXTERNAL_LINKS } from "@/lib/external-links";

type Step = {
  text: ReactNode;
  modifier?: "auth" | "rej" | "meta";
};

type Panel = {
  key: string;
  num: string;
  tabLabel: string;
  /** Customer logo shown above the outcome headline. Falls back to none when missing. */
  brandLogo?: { src: string; alt: string };
  outcome: ReactNode;
  steps: Step[];
  code: ReactNode;
  /** Destination for the "Read case study" CTA. */
  caseStudyHref: string;
  /** When true, the "Read case study" CTA is rendered as a disabled
   *  "Coming soon" pill — the case study page isn't published yet. */
  comingSoon?: boolean;
  visual: {
    status: string;
    sourceLabel: string;
    sourceValue: string;
    destCaption: string;
    dests: string[];
  };
};

const PANELS: Panel[] = [
  {
    key: "treasury",
    num: "01",
    tabLabel: "Treasury & settlement",
    brandLogo: { src: "/assets/logos/numo.png", alt: "Numo" },
    outcome: (
      <>
        <span className="oc__brand">Numo</span>{" "}
        <span className="oc__muted">
          agents settled treasury payments in real time,
        </span>{" "}
        nothing executed outside approved limits
        <span className="oc__muted">.</span>
      </>
    ),
    steps: [
      {
        text: (
          <>
            Every transaction calls <code className="oc__inline">verify()</code>{" "}
            before execution.
          </>
        ),
      },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--ok">Within limits</span>{" "}
            executes instantly.
          </>
        ),
        modifier: "auth",
      },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--no">Out of limits</span>{" "}
            approval is requested.
          </>
        ),
        modifier: "rej",
      },
      { text: "Every decision produces a signed execution receipt." },
    ],
    code: (
      <>
        <span className="oc__code-kw">await</span> humanos.
        <span className="oc__code-fn">verify</span>(
        <span className="oc__code-arg">
          {"{ amount, counterparty, mandate }"}
        </span>
        )
      </>
    ),
    caseStudyHref: "/case-studies/numo",
    visual: {
      status: "Treasury settlement",
      sourceLabel: "Wire",
      sourceValue: "€4.8M",
      destCaption: "Settled within authorized mandate",
      dests: ["Counterparty", "Ledger", "Reconciliation"],
    },
  },
  {
    key: "b2b",
    num: "02",
    tabLabel: "B2B agentic payments",
    brandLogo: { src: "/assets/logos/ralio.png", alt: "Ralio" },
    outcome: (
      <>
        <span className="oc__brand">Ralio</span>{" "}
        <span className="oc__muted">
          agents bought from external merchants,
        </span>{" "}
        every transaction backed by a verifiable mandate
        <span className="oc__muted">.</span>
      </>
    ),
    steps: [
      { text: "Finance lead issues a mandate (scope, vendors, ceiling)." },
      { text: "Agent prepares the purchase across B2B marketplaces." },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--ok">Within mandate</span>{" "}
            merchant settles instantly.
          </>
        ),
        modifier: "auth",
      },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--no">Out of mandate</span>{" "}
            step-up approval is collected at the boundary.
          </>
        ),
        modifier: "rej",
      },
    ],
    code: (
      <>
        <span className="oc__code-kw">await</span> humanos.
        <span className="oc__code-fn">verify</span>(
        <span className="oc__code-arg">{"{ vendor, amount, mandate }"}</span>)
      </>
    ),
    caseStudyHref: "/case-studies/ralio",
    visual: {
      status: "B2B procurement",
      sourceLabel: "Agent",
      sourceValue: "purchase()",
      destCaption: "Merchant verifies the mandate directly",
      dests: ["Marketplace", "Vendor", "Procurement ledger"],
    },
  },
  {
    key: "settlement",
    num: "03",
    tabLabel: "Agentic commerce settlement",
    brandLogo: { src: "/assets/logos/paymove.png", alt: "Paymove" },
    outcome: (
      <>
        <span className="oc__brand">Paymove</span>{" "}
        <span className="oc__muted">
          settled agent payments on the Visa rail,
        </span>{" "}
        every spend verifiably authorized before it moved
        <span className="oc__muted">.</span>
      </>
    ),
    steps: [
      { text: "User signs a mandate (max amount, allowed IBANs, expiry)." },
      {
        text: (
          <>
            Agent prepares a spend; Paymove calls{" "}
            <code className="oc__inline">verify()</code> in the settlement path.
          </>
        ),
      },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--ok">Within mandate</span>{" "}
            settles on the Visa rail instantly.
          </>
        ),
        modifier: "auth",
      },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--no">Out of scope</span> fresh
            approval is collected, then it settles.
          </>
        ),
        modifier: "rej",
      },
    ],
    code: (
      <>
        <span className="oc__code-kw">await</span> humanos.
        <span className="oc__code-fn">verify</span>(
        <span className="oc__code-arg">
          {"{ amount, counterparty, mandate }"}
        </span>
        )
      </>
    ),
    caseStudyHref: "/case-studies/paymove",
    visual: {
      status: "Agentic settlement · Visa rail",
      sourceLabel: "Agent wallet",
      sourceValue: "pay()",
      destCaption: "Every spend authorized before it settles",
      dests: ["Visa rail", "Counterparty", "On-chain receipt"],
    },
  },
  {
    key: "multi",
    num: "04",
    tabLabel: "Approvals reused everywhere",
    brandLogo: { src: "/assets/logos/lusiadas.png.webp", alt: "Lusíadas" },
    outcome: (
      <>
        <span className="oc__brand">Lusíadas</span>{" "}
        <span className="oc__muted">
          acted on patient consent across systems,
        </span>{" "}
        one approval, enforced everywhere
        <span className="oc__muted">.</span>
      </>
    ),
    steps: [
      { text: "Approval is collected once (consent, signature, KYC)." },
      { text: "Systems query Humanos before acting." },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--ok">If approval exists</span>{" "}
            action proceeds.
          </>
        ),
        modifier: "auth",
      },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--no">If not</span> approval is
            collected in real time.
          </>
        ),
        modifier: "rej",
      },
    ],
    code: (
      <>
        humanos.<span className="oc__code-fn">verify</span>(
        <span className="oc__code-arg">
          {'{ subject, scope: "billing.read" }'}
        </span>
        )
      </>
    ),
    caseStudyHref: "/case-studies/lusiadas",
    visual: {
      status: "Cross-system consent",
      sourceLabel: "Consent",
      sourceValue: "signed once",
      destCaption: "One approval, enforced everywhere",
      dests: ["Imaging", "Billing", "EHR"],
    },
  },
  {
    key: "platforms",
    num: "05",
    tabLabel: "Multi-agent platforms",
    brandLogo: { src: "/assets/logos/data_whisper.webp", alt: "DataWhisper" },
    outcome: (
      <>
        <span className="oc__brand">DataWhisper</span>{" "}
        <span className="oc__muted">uses Humanos to govern agent actions,</span>{" "}
        every step authorized and written to a clean audit trail
        <span className="oc__muted">.</span>
      </>
    ),
    steps: [
      { text: "A human principal signs a scoped mandate." },
      {
        text: (
          <>
            Agents call <code className="oc__inline">verify()</code> before any
            high-risk action.
          </>
        ),
      },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--ok">Authorized</span> action
            proceeds and a signed receipt is recorded.
          </>
        ),
        modifier: "auth",
      },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--no">Out of scope</span> step-up
            is collected from the human principal.
          </>
        ),
        modifier: "rej",
      },
    ],
    code: (
      <>
        <span className="oc__code-kw">await</span> humanos.
        <span className="oc__code-fn">verify</span>(
        <span className="oc__code-arg">
          {"{ subject, action, scope, mandate }"}
        </span>
        )
      </>
    ),
    caseStudyHref: "/case-studies/datawhisper",
    visual: {
      status: "Multi-agent governance",
      sourceLabel: "AI agent",
      sourceValue: "action()",
      destCaption: "Every action authorized · clean audit trail",
      dests: ["Audit log", "Auditor", "Regulator"],
    },
  },
  {
    key: "erp",
    num: "06",
    tabLabel: "ERP agent automations",
    outcome: (
      <>
        <span className="oc__brand">Extraflow</span>{" "}
        <span className="oc__muted">
          agents executed operations across ERP systems,
        </span>{" "}
        every entry authorized before commit
        <span className="oc__muted">.</span>
      </>
    ),
    steps: [
      {
        text: "System prepares the entry (invoice, PO, journal, payment).",
      },
      { text: "Humanos verifies authority before the ERP commits." },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--ok">Authorized</span> entry
            posts to the ledger.
          </>
        ),
        modifier: "auth",
      },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--no">Missing</span> approval is
            requested, then the entry resumes.
          </>
        ),
        modifier: "rej",
      },
    ],
    code: (
      <>
        <span className="oc__code-kw">if</span> (
        <span className="oc__code-fn">verify</span>(entry).
        <span className="oc__code-arg">authorized</span>) erp.
        <span className="oc__code-fn">commit</span>(entry)
      </>
    ),
    caseStudyHref: "/case-studies",
    comingSoon: true,
    visual: {
      status: "ERP execution",
      sourceLabel: "AI agent",
      sourceValue: "Invoice #2841",
      destCaption: "Cross-system entries authorized before commit",
      dests: ["Procurement", "Accounting", "Payments"],
    },
  },
];

function CheckSvg() {
  return (
    <svg
      className="check"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 5l2 2 4-4" />
    </svg>
  );
}

export function Outcomes() {
  const [active, setActive] = useState(PANELS[0].key);

  return (
    <section className="oc" id="outcomes" data-screen-label="03 Outcomes">
      <div className="oc__grid-bg" aria-hidden="true" />
      <div className="wrap oc__wrap">
        <div className="oc__head">
          <div className="oc__eyebrow" style={{ color: "var(--hm-chalk-0)" }}>
            <span className="oc__eyebrow-dot" />
            <span
              className="oc__eyebrow-label"
              style={{ color: "var(--hm-chalk-0)" }}
            >
              Real customers already verifying before execution
            </span>
          </div>
        </div>

        <div className="oc__tabs" role="tablist" aria-label="Use cases">
          {PANELS.map((p) => (
            <button
              key={p.key}
              type="button"
              id={`oc-tab-${p.key}`}
              className={`oc__tab${active === p.key ? " is-active" : ""}`}
              role="tab"
              aria-selected={active === p.key}
              aria-controls={`oc-panel-${p.key}`}
              onClick={() => setActive(p.key)}
            >
              <span className="oc__tab-num">{p.num}</span>
              <span className="oc__tab-label">{p.tabLabel}</span>
            </button>
          ))}
        </div>

        <div className="oc__panels">
          {PANELS.map((p) => (
            <div
              key={p.key}
              id={`oc-panel-${p.key}`}
              role="tabpanel"
              aria-labelledby={`oc-tab-${p.key}`}
              className={`oc__panel${active === p.key ? " is-active" : ""}`}
              aria-hidden={active !== p.key}
            >
              <div className="oc__left">
                <h3 className="oc__outcome">{p.outcome}</h3>

                <div className="oc__how">
                  <div className="oc__how-label">How it works</div>
                  <ol className="oc__steps">
                    {p.steps.map((s, i) => (
                      <li
                        key={i}
                        className={`oc__step${s.modifier ? ` oc__step--${s.modifier}` : ""}`}
                      >
                        <span className="oc__step-num">0{i + 1}</span>
                        <span className="oc__step-text">{s.text}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="oc__code">{p.code}</div>
                </div>

                <div className="oc__ctas">
                  {p.comingSoon ? (
                    <span
                      className="oc__cta oc__cta--primary"
                      aria-disabled="true"
                      style={{
                        opacity: 0.5,
                        cursor: "not-allowed",
                        pointerEvents: "none",
                      }}
                    >
                      Coming soon
                    </span>
                  ) : (
                    <a
                      className="oc__cta oc__cta--primary"
                      href={p.caseStudyHref}
                    >
                      Read case study <span className="oc__arr">→</span>
                    </a>
                  )}
                  <a
                    className="oc__cta oc__cta--ghost"
                    href={EXTERNAL_LINKS.app}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get API key <span className="oc__arr">→</span>
                  </a>
                </div>
              </div>

              <div className="oc__right">
                <div className="oc__visual">
                  <div className="cs-flow" aria-hidden="true">
                    <div className="cs-flow__status">
                      <span className="dot" />
                      {p.visual.status}
                    </div>

                    <div className="cs-flow__row">
                      <div className="cs-flow__source">
                        <div className="cs-flow__source-card">
                          <span className="label">{p.visual.sourceLabel}</span>
                          {p.visual.sourceValue}
                        </div>
                      </div>

                      <div className="cs-flow__verify">
                        <span className="cs-flow__verify-label">Humanos</span>
                        verify()
                      </div>

                      <div className="cs-flow__dest-group">
                        <div className="cs-flow__dest-caption">
                          {p.visual.destCaption}
                        </div>
                        <div className="cs-flow__dests">
                          {p.visual.dests.map((d) => (
                            <div key={d} className="cs-flow__dest is-lit">
                              <CheckSvg />
                              {d}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="cs-flow__particle" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
