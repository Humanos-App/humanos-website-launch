"use client";

import { useState, type ReactNode } from "react";

type Step = {
  text: ReactNode;
  modifier?: "auth" | "rej" | "meta";
};

type Panel = {
  key: string;
  num: string;
  tabLabel: string;
  outcome: ReactNode;
  steps: Step[];
  code: ReactNode;
  /** Destination for the "Read case study" CTA. */
  caseStudyHref: string;
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
    key: "agents",
    num: "01",
    tabLabel: "Agents executing actions",
    outcome: (
      <>
        <span className="oc__brand">Bloodflow</span>
        <span className="oc__muted">
          agents accessed patient data and took action
        </span>{" "}
        only when backed by verified consent
        <span className="oc__muted">.</span>
      </>
    ),
    steps: [
      { text: "AI prepares the action." },
      { text: "Humanos verifies if it's within approved scope." },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--ok">Authorized</span> action
            executes.
          </>
        ),
        modifier: "auth",
      },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--no">Out of scope</span> approval
            is requested, then resumes.
          </>
        ),
        modifier: "rej",
      },
    ],
    code: (
      <>
        <span className="oc__code-kw">const</span> result ={" "}
        <span className="oc__code-kw">await</span> humanos.
        <span className="oc__code-fn">verify</span>(
        <span className="oc__code-arg">{"{ subject, action, scope }"}</span>)
      </>
    ),
    caseStudyHref: "/case-studies",
    visual: {
      status: "Healthcare agent",
      sourceLabel: "AI agent",
      sourceValue: "fetch_record",
      destCaption: "Action runs only when consent is verified",
      dests: ["Read EHR", "Write order", "Notify clinician"],
    },
  },
  {
    key: "capital",
    num: "02",
    tabLabel: "Treasury & settlement",
    outcome: (
      <>
        <span className="oc__brand">Numo</span>
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
            Every transaction calls{" "}
            <code className="oc__inline">verify()</code> before execution.
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
    key: "agentic",
    num: "03",
    tabLabel: "Agentic payments",
    outcome: (
      <>
        <span className="oc__muted">
          Autonomous agents transacted on behalf of users,
        </span>{" "}
        every payment backed by an explicit, verifiable mandate
        <span className="oc__muted">.</span>
      </>
    ),
    steps: [
      { text: "User issues a mandate (scope, limits, expiry)." },
      { text: "Agent prepares a payment via the protocol." },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--ok">Within mandate</span>{" "}
            payment executes.
          </>
        ),
        modifier: "auth",
      },
      {
        text: (
          <>
            <span className="oc__pill oc__pill--no">Out of mandate</span> user
            is asked to extend it.
          </>
        ),
        modifier: "rej",
      },
    ],
    code: (
      <>
        <span className="oc__code-kw">await</span> humanos.
        <span className="oc__code-fn">verify</span>(
        <span className="oc__code-arg">{"{ agent, mandate, payment }"}</span>)
      </>
    ),
    caseStudyHref: "/case-studies/ralio",
    visual: {
      status: "Agentic payment",
      sourceLabel: "Agent",
      sourceValue: "charge()",
      destCaption: "Payment executes within user mandate",
      dests: ["Merchant", "Subscription", "Marketplace"],
    },
  },
  {
    key: "cross",
    num: "04",
    tabLabel: "Approval reused everywhere",
    outcome: (
      <>
        <span className="oc__brand">Lusíadas</span>
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
    caseStudyHref: "/case-studies",
    visual: {
      status: "Cross-system consent",
      sourceLabel: "Consent",
      sourceValue: "signed once",
      destCaption: "One approval, enforced everywhere",
      dests: ["Imaging", "Billing", "EHR"],
    },
  },
  {
    key: "audit",
    num: "05",
    tabLabel: "Receipts on demand",
    outcome: (
      <>
        <span className="oc__brand">Joaquim Chaves</span>
        <span className="oc__muted">
          made decisions with full traceability,
        </span>{" "}
        every action provable on demand<span className="oc__muted">.</span>
      </>
    ),
    steps: [
      { text: "Each decision produces a signed record." },
      {
        text: (
          <>
            Includes:{" "}
            <span className="oc__chips">
              <span className="oc__chip">who approved</span>
              <span className="oc__chip">what action</span>
              <span className="oc__chip">full payload</span>
              <span className="oc__chip">timestamp</span>
            </span>
          </>
        ),
        modifier: "meta",
      },
      { text: "Execution receipts can be verified independently." },
    ],
    code: (
      <>
        proof.<span className="oc__code-fn">verify</span>(
        <span className="oc__code-arg">publicKey</span>){" "}
        <span className="oc__code-comment">{"// returns true"}</span>
      </>
    ),
    caseStudyHref: "/case-studies",
    visual: {
      status: "Receipts on demand",
      sourceLabel: "Action",
      sourceValue: "execution receipt",
      destCaption: "Independently verifiable, no callback to Humanos",
      dests: ["Auditor", "Regulator", "Counterparty"],
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
              className={`oc__tab${active === p.key ? " is-active" : ""}`}
              role="tab"
              aria-selected={active === p.key}
              onClick={() => setActive(p.key)}
            >
              <span className="oc__tab-num">{p.num}</span>
              <span className="oc__tab-label">{p.tabLabel}</span>
            </button>
          ))}
        </div>

        <div className="oc__panels">
          {PANELS.map((p) => (
            <article
              key={p.key}
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
                        <span className="oc__step-num">
                          0{i + 1}
                        </span>
                        <span className="oc__step-text">{s.text}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="oc__code">{p.code}</div>
                </div>

                <div className="oc__ctas">
                  <a
                    className="oc__cta oc__cta--primary"
                    href={p.caseStudyHref}
                  >
                    Read case study <span className="oc__arr">→</span>
                  </a>
                  <a className="oc__cta oc__cta--ghost" href="#">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
