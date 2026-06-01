import type { Metadata } from "next";
import { TalkWithUs } from "@/components/dialogs/TalkWithUs";
import { EXTERNAL_LINKS } from "@/lib/external-links";
import {
  StoriesGrid,
  type Story,
  type Filter,
} from "./_components/StoriesGrid";

export const metadata: Metadata = {
  title: "Customer stories",
  description:
    "Real stories from systems that verify before they act. Hospitals, insurers, fintechs, payment processors, and AI platforms running Humanos in their execution path.",
  alternates: { canonical: "/case-studies" },
};

const FILTERS: Filter[] = [
  { key: "all", label: "All" },
  { key: "finance", label: "Agentic finance" },
  { key: "procurement", label: "Procurement" },
  { key: "healthcare", label: "Healthcare" },
  { key: "infra", label: "Infrastructure" },
];

const STORIES: Story[] = [
  {
    cat: "finance",
    name: "Numo",
    status: "Integrated",
    domain: "Agentic finance · Treasury",
    title: (
      <>
        Agents move capital across treasury, exchanges, and rails{" "}
        <em>verified before execution.</em>
      </>
    ),
    desc: "Numo runs autonomous strategies that reallocate capital continuously. Humanos sits between the agent's decision and the rail, verifying every action against signed mandates before it settles.",
    stats: [
      { num: "€50K", lab: "Reallocation, verified live" },
      { num: "4", lab: "Rails under one mandate" },
      { num: "<1", lab: "Step between decision & execution" },
    ],
    href: "/case-studies/numo",
    cta: "Read the story",
    verify: {
      chip: "verify · treasury.reallocate",
      code: (
        <>
          <span className="tk-kw">await</span> humanos.
          <span className="tk-verify">verify</span>({"{\n"}
          {"  "}
          <span className="tk-prop">subject</span>:{" "}
          <span className="tk-str">&quot;numo-treasury&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">action</span>:{" "}
          <span className="tk-str">&quot;capital.reallocate&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">amount</span>:{" "}
          <span className="tk-num">50000</span>,{"\n"}
          {"  "}
          <span className="tk-prop">rail</span>:{" "}
          <span className="tk-str">&quot;custodian-a&quot;</span>
          {"\n})"}
        </>
      ),
      checks: [
        "subject resolved · numo-treasury",
        "mandate matched · treasury.reallocate",
        "constraints ok · ≤ daily limit",
      ],
      verdict: (
        <>
          <span className="ok">● authorized</span> — within signed treasury
          scope
        </>
      ),
    },
  },
  {
    cat: "procurement",
    name: "Ralio",
    status: "Integrated",
    domain: "Procurement · Marketplaces",
    title: (
      <>
        Agents transact across external marketplaces —{" "}
        <em>made independently verifiable.</em>
      </>
    ),
    desc: "Ralio's procurement agents source vendors and execute purchases across external B2B marketplaces. Humanos sits at the merchant boundary, so counterparties can verify the agent acted within scope.",
    stats: [
      { num: "€23.8K", lab: "Order settled & proven" },
      { num: "100%", lab: "Cross-boundary verifiability" },
      { num: "0", lab: "After-the-fact audits" },
    ],
    href: "/case-studies/ralio",
    cta: "Read the story",
    verify: {
      chip: "verify · payments.purchase",
      code: (
        <>
          <span className="tk-kw">await</span> humanos.
          <span className="tk-verify">verify</span>({"{\n"}
          {"  "}
          <span className="tk-prop">subject</span>:{" "}
          <span className="tk-str">&quot;ralio-procurement&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">action</span>:{" "}
          <span className="tk-str">&quot;payments.purchase&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">amount</span>:{" "}
          <span className="tk-num">23840</span>,{"\n"}
          {"  "}
          <span className="tk-prop">vendor</span>:{" "}
          <span className="tk-str">&quot;mkt:acme-supply&quot;</span>
          {"\n})"}
        </>
      ),
      checks: [
        "subject resolved · ralio-procurement",
        "scope matched · payments.purchase",
        "proof signed · verifiable by vendor",
      ],
      verdict: (
        <>
          <span className="ok">● proof_id</span> prf_R19A2 — verifiable by
          vendor
        </>
      ),
    },
  },
  {
    cat: "finance",
    name: "Paymove",
    status: "Integrated",
    domain: "Agentic commerce · Visa rail",
    title: (
      <>
        Consumer agent payments settle on the Visa rail —{" "}
        <em>every spend authorized before it moves.</em>
      </>
    ),
    desc: "Paymove's agents transact on behalf of consumers. Humanos sits in the settlement path; every payment is verified against a user-signed mandate before it reaches the rail.",
    stats: [
      { num: "100%", lab: "Spends pre-authorized" },
      { num: "0", lab: "Out-of-mandate settlements" },
      { num: "1", lab: "API for any consumer scope" },
    ],
    href: "/case-studies/paymove",
    cta: "Read the story",
    verify: {
      chip: "verify · payments.consumer",
      code: (
        <>
          <span className="tk-kw">await</span> humanos.
          <span className="tk-verify">verify</span>({"{\n"}
          {"  "}
          <span className="tk-prop">subject</span>:{" "}
          <span className="tk-str">&quot;paymove-agent&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">action</span>:{" "}
          <span className="tk-str">&quot;payments.consumer&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">amount</span>:{" "}
          <span className="tk-num">280</span>,{"\n"}
          {"  "}
          <span className="tk-prop">user</span>:{" "}
          <span className="tk-str">&quot;usr_8F22&quot;</span>
          {"\n})"}
        </>
      ),
      checks: [
        "subject resolved · paymove-agent",
        "mandate matched · user-signed cap",
        "rail ok · visa · within scope",
      ],
      verdict: (
        <>
          <span className="ok">● authorized</span> — within user-signed mandate
        </>
      ),
    },
  },
  {
    cat: "healthcare",
    name: "Lusíadas",
    status: "Integrated",
    domain: "Healthcare · Approval OS",
    title: (
      <>
        Consents, KYCs, and prescriptions —{" "}
        <em>collected once, verified everywhere.</em>
      </>
    ),
    desc: "Lusíadas runs human approvals through Humanos across a multi-vendor stack: Medify, Glintt, NewSoft, internal systems, and the patient mobile app. Approvals are anchored as portable proofs and reusable across every system.",
    stats: [
      { num: "1", lab: "API · every approval kind" },
      { num: "100%", lab: "GDPR-grade receipts" },
      { num: "0", lab: "Re-collected approvals" },
    ],
    href: "/case-studies/lusiadas",
    cta: "Read the story",
    verify: {
      chip: "verify · consent.informed",
      code: (
        <>
          <span className="tk-kw">await</span> humanos.
          <span className="tk-verify">verify</span>({"{\n"}
          {"  "}
          <span className="tk-prop">subject</span>:{" "}
          <span className="tk-str">&quot;medify.app&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">action</span>:{" "}
          <span className="tk-str">&quot;consent.informed&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">patient</span>:{" "}
          <span className="tk-str">&quot;pt_4F19&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">signers</span>: [
          <span className="tk-str">&quot;patient&quot;</span>,{" "}
          <span className="tk-str">&quot;physician&quot;</span>]{"\n})"}
        </>
      ),
      checks: [
        "subject resolved · medify.app",
        "signers matched · patient + physician",
        "anchored · Lusíadas approval ledger",
      ],
      verdict: (
        <>
          <span className="ok">● approved</span> — receipt attached to record
        </>
      ),
    },
  },
  {
    cat: "infra",
    name: "DataWhisper",
    status: "Integrated",
    domain: "Multi-agent AI · Regulated industries",
    title: (
      <>
        Agents act inside regulated workflows —{" "}
        <em>governed by Humanos at every step.</em>
      </>
    ),
    desc: "DataWhisper orchestrates multi-agent AI for regulated industries. Humanos sits as the authorization stack — every high-risk agent action is verified before execution and produces a clean, portable audit trail.",
    stats: [
      { num: "184ms", lab: "Median verify latency" },
      { num: "100%", lab: "Actions on-mandate" },
      { num: "1", lab: "Audit trail format · forever" },
    ],
    href: "/case-studies/datawhisper",
    cta: "Read the story",
    verify: {
      chip: "verify · action.high_risk",
      code: (
        <>
          <span className="tk-kw">await</span> humanos.
          <span className="tk-verify">verify</span>({"{\n"}
          {"  "}
          <span className="tk-prop">subject</span>:{" "}
          <span className="tk-str">&quot;cortex.agent&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">action</span>:{" "}
          <span className="tk-str">&quot;dispute.resolve&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">case</span>:{" "}
          <span className="tk-str">&quot;DW-018472&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">scope</span>:{" "}
          <span className="tk-str">&quot;dispute.resolve&quot;</span>
          {"\n})"}
        </>
      ),
      checks: [
        "subject resolved · cortex.agent",
        "mandate matched · operations lead",
        "audit · anchored & portable",
      ],
      verdict: (
        <>
          <span className="ok">● authorized</span> — within signed scope, proof
          emitted
        </>
      ),
    },
  },
];

export default function CustomerStoriesPage() {
  return (
    <div className="customers-page">
      {/* HERO */}
      <section className="hero" data-screen-label="01 Hero">
        <div className="hero__grid-bg" aria-hidden="true" />
        <div className="hero__glow" aria-hidden="true" />
        <div className="wrap">
          <div className="hero__inner">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Customer stories
            </span>
            <h1>
              Real stories from systems that <em>verify before they act.</em>
            </h1>
            <p className="hero__sub">
              See how hospitals, insurers, fintechs, payment processors, and AI
              platforms use Humanos to verify actions before execution, recover
              missing authorization in real time, and generate independently
              verifiable proof afterwards.
            </p>

            <div className="hero__stats">
              <div className="hero__stat">
                <div className="hero__stat-num">
                  100<span className="unit">%</span>
                </div>
                <div className="hero__stat-lab">
                  Actions verified pre-execution
                </div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-num">
                  184<span className="unit">ms</span>
                </div>
                <div className="hero__stat-lab">Median verify latency</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-num">0</div>
                <div className="hero__stat-lab">Unprovable transactions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORIES — filterable, animated */}
      <section className="section" data-screen-label="02 Stories">
        <div className="wrap">
          <div className="section__head">
            <div>
              <span className="eyebrow">
                <span className="dot" aria-hidden="true" />
                Customer stories
              </span>
              <h2>Wherever autonomous systems act.</h2>
            </div>
            <p className="sub">
              Filter by domain. Every deployment runs the same model: verify
              before execution, recover what&rsquo;s missing, prove after.
            </p>
          </div>

          <StoriesGrid filters={FILTERS} stories={STORIES} />
        </div>
      </section>

      {/* PROOF BAND */}
      <section className="proof" data-screen-label="03 Proof">
        <div className="proof__glow" aria-hidden="true" />
        <div className="wrap">
          <div className="proof__inner">
            <span className="eyebrow eyebrow--chalk">
              <span className="dot" aria-hidden="true" />
              Across deployments
            </span>
            <h2>The same guarantee, whatever the system acts on.</h2>
            <div className="proof__grid">
              <div className="proof__item">
                <div className="proof__num">
                  184<span className="unit">ms</span>
                </div>
                <div className="proof__lab">
                  Median verify latency
                  <br />
                  on the execution path
                </div>
              </div>
              <div className="proof__item">
                <div className="proof__num">
                  100<span className="unit">%</span>
                </div>
                <div className="proof__lab">
                  Of agent actions verified
                  <br />
                  before they run
                </div>
              </div>
              <div className="proof__item">
                <div className="proof__num">3</div>
                <div className="proof__lab">
                  Deterministic outcomes:
                  <br />
                  authorize · recover · reject
                </div>
              </div>
              <div className="proof__item">
                <div className="proof__num">∞</div>
                <div className="proof__lab">
                  Independently verifiable
                  <br />
                  execution receipts
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" data-screen-label="04 CTA">
        <div className="wrap wrap--narrow">
          <span className="eyebrow">
            <span className="dot" aria-hidden="true" />
            Your turn
          </span>
          <h2>
            Become the next <span className="accent">story.</span>
          </h2>
          <p className="cta__sub">
            Put authorization in your execution path. We&rsquo;ll review your
            flows and propose a mandate model.
          </p>
          <div className="cta__ctas">
            <TalkWithUs>
              <button className="btn btn--primary" type="button">
                Talk with us <span className="arrow">→</span>
              </button>
            </TalkWithUs>
            <a
              className="btn btn--secondary"
              href={EXTERNAL_LINKS.docs}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the docs <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
