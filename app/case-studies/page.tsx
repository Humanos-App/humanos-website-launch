import type { Metadata } from "next";
import { TalkWithUs } from "@/components/dialogs/TalkWithUs";
import { EXTERNAL_LINKS } from "@/lib/external-links";
import {
  StoriesGrid,
  type Story,
  type Filter,
} from "./_components/StoriesGrid";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "Real systems. Real risk. Humanos in production — across workflows where identity, authorization, controls and verifiable evidence matter.",
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
              Customers
            </span>
            <h1>
              Real systems. Real risk. <em>Humanos in production.</em>
            </h1>
            <p className="hero__sub">
              See how companies use Humanos across real-world workflows where
              identity, authorization, controls and verifiable evidence matter.
            </p>
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
                In production
              </span>
              <h2>Built for consequential workflows.</h2>
            </div>
            <p className="sub">
              From financial transactions to healthcare and enterprise
              operations, Humanos is deployed where AI and software actions need
              clear authority, enforceable controls and verifiable evidence.
            </p>
          </div>

          <StoriesGrid filters={FILTERS} stories={STORIES} />
        </div>
      </section>

      {/* ONE INFRASTRUCTURE — replaces the aggregate metrics band. Those
          figures still appear inside the individual case studies, where they
          describe an actual deployment rather than the company. */}
      <section className="proof" data-screen-label="03 One infrastructure">
        <div className="proof__glow" aria-hidden="true" />
        <div className="wrap">
          <div className="proof__inner">
            <span className="eyebrow eyebrow--chalk">
              <span className="dot" aria-hidden="true" />
              One infrastructure
            </span>
            <h2>Different workflows. The same foundation.</h2>
            <p className="proof__sub">
              Identity, authority, controls and runtime evidence create the
              foundation for understanding how consequential systems actually
              operate. As Humanos expands into continuous Risk Scores and Risk
              Intelligence, that same infrastructure becomes part of a broader
              Risk Network for AI.
            </p>

            <div className="foundation">
              <div className="foundation__row">
                <span className="foundation__part">Identity</span>
                <span className="foundation__plus">+</span>
                <span className="foundation__part">Authority</span>
                <span className="foundation__plus">+</span>
                <span className="foundation__part">Controls</span>
                <span className="foundation__plus">+</span>
                <span className="foundation__part">Runtime evidence</span>
              </div>
              <div className="foundation__down">↓</div>
              <div className="foundation__sum">Humanos Risk Network</div>
            </div>
          </div>
        </div>
      </section>

      {/* THE RISK NETWORK — the bridge from what is deployed today to where
          Humanos is going. Deliberately short, and careful not to imply the
          case studies above already use all four. */}
      <section className="section" data-screen-label="04 The Risk Network">
        <div className="wrap">
          <div className="section__head">
            <div>
              <span className="eyebrow">
                <span className="dot" aria-hidden="true" />
                The Risk Network
              </span>
              <h2>Every action creates evidence.</h2>
            </div>
            <p className="sub">
              The identity, authorization, control and execution evidence
              generated across Humanos deployments can become signals for
              continuously understanding AI risk. That is the foundation of the
              Humanos Risk Network.
            </p>
          </div>

          <div className="bridge__grid">
            <div className="bridge__item">
              <div className="bridge__name">Monitor</div>
              <div className="bridge__line">Know the risk.</div>
            </div>
            <div className="bridge__item">
              <div className="bridge__name">Control</div>
              <div className="bridge__line">Reduce the risk.</div>
            </div>
            <div className="bridge__item">
              <div className="bridge__name">Understand</div>
              <div className="bridge__line">Get the answers you need.</div>
            </div>
            <div className="bridge__item">
              <div className="bridge__name">Insure</div>
              <div className="bridge__line">Transfer what remains.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" data-screen-label="04 CTA">
        <div className="wrap wrap--narrow">
          <span className="eyebrow">
            <span className="dot" aria-hidden="true" />
            Get started
          </span>
          <h2>
            Put your AI on the <span className="accent">Risk Network.</span>
          </h2>
          <p className="cta__sub">
            Start with a continuous Risk Score, use Humanos controls, or connect
            the infrastructure you already have.
          </p>
          <div className="cta__ctas">
            <a
              className="btn btn--primary"
              href={EXTERNAL_LINKS.app}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start risk scoring <span className="arrow">→</span>
            </a>
            <TalkWithUs>
              <button className="btn btn--secondary" type="button">
                Talk to our team <span className="arrow">→</span>
              </button>
            </TalkWithUs>
          </div>
        </div>
      </section>
    </div>
  );
}
