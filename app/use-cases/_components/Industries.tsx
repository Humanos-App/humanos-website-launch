"use client";

import { useState } from "react";

type Industry = {
  key: string;
  tab: string;
  title: string;
  desc: string;
  outcome: string;
  subject: string;
  result: string;
};

const INDUSTRIES: Industry[] = [
  {
    key: "healthcare",
    tab: "Healthcare",
    title: "Care that moves at consent speed.",
    desc: "Agents verify patient consent before accessing records — no manual checks, no stalled workflows.",
    outcome: "Consent verified before any record is touched.",
    subject: "Patient consent",
    result: "Record access",
  },
  {
    key: "financial",
    tab: "Financial Services",
    title: "Capital moves only on mandate.",
    desc: "Treasury systems verify allocation mandates before moving capital.",
    outcome: "Every allocation authorized before it settles.",
    subject: "Allocation mandate",
    result: "Capital moves",
  },
  {
    key: "insurance",
    tab: "Insurance",
    title: "Claims that clear themselves.",
    desc: "Claims systems verify customer authorization before execution.",
    outcome: "Customer authorization checked before payout.",
    subject: "Customer authorization",
    result: "Claim executes",
  },
  {
    key: "erp",
    tab: "ERP Automation",
    title: "Operations that post themselves.",
    desc: "Agents verify operational approvals before posting transactions.",
    outcome: "Every entry authorized before commit.",
    subject: "Operational approval",
    result: "Transaction posts",
  },
  {
    key: "commerce",
    tab: "Commerce",
    title: "Commerce agents can be trusted to transact.",
    desc: "Merchants verify whether AI agents are authorized to purchase.",
    outcome: "Merchants accept only agents they can verify.",
    subject: "Agent mandate",
    result: "Purchase settles",
  },
  {
    key: "government",
    tab: "Government",
    title: "Authorize once, reuse everywhere.",
    desc: "Citizens authorize actions once and reuse authorization across services.",
    outcome: "One authorization across every public service.",
    subject: "Citizen authorization",
    result: "Reused across services",
  },
];

export function Industries() {
  const [active, setActive] = useState(INDUSTRIES[0].key);
  const current = INDUSTRIES.find((i) => i.key === active) ?? INDUSTRIES[0];

  return (
    <section className="uc-sec uc-ind">
      <div className="wrap">
        <div className="uc-sec__head">
          <div className="uc-eyebrow">
            <span className="uc-eyebrow__dot" />
            One authorization · multiple industries
          </div>
          <h2 className="uc-sec__title">The same guarantee, everywhere.</h2>
          <p className="uc-sec__sub uc-sec__sub--center">
            One model — verify before execution — applied across the systems
            that move money, data and care.
          </p>
        </div>

        <div className="uc-ind__tabs" role="tablist" aria-label="Industries">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.key}
              type="button"
              role="tab"
              aria-selected={active === ind.key}
              className={`uc-ind__tab${active === ind.key ? " is-active" : ""}`}
              onClick={() => setActive(ind.key)}
            >
              {ind.tab}
            </button>
          ))}
        </div>

        <div className="uc-ind__panel" key={current.key}>
          <div className="uc-ind__copy">
            <div className="uc-ind__copy-eyebrow">{current.tab}</div>
            <h3 className="uc-ind__copy-title">{current.title}</h3>
            <p className="uc-ind__copy-desc">{current.desc}</p>
            <div className="uc-ind__outcome">{current.outcome}</div>
          </div>

          <div className="uc-ind__viz">
            <div className="uc-ind__flow">
              <div className="uc-node">{current.subject}</div>
              <span className="uc-conn" aria-hidden="true" />
              <div className="uc-node uc-node--verify">humanos.verify()</div>
              <span className="uc-conn" aria-hidden="true" />
              <div className="uc-node uc-node--ok">{current.result}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
