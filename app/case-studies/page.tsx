import type { Metadata } from "next";
import {
  StoriesGrid,
  type Story,
  type Filter,
} from "./_components/StoriesGrid";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "Real systems. Real risk. See how companies use Humanos to measure, control and transfer AI risk in production.",
  alternates: { canonical: "/case-studies" },
};

const FILTERS: Filter[] = [
  { key: "all", label: "All" },
  { key: "insurance", label: "Insurance" },
  { key: "finance", label: "Agentic finance" },
  { key: "healthcare", label: "Healthcare" },
  { key: "infra", label: "Infrastructure" },
];

const STORIES: Story[] = [
  {
    cat: "insurance",
    name: "InsureNow",
    status: "Testing",
    domain: "AI liability insurance · MGA",
    title: (
      <>
        AI liability underwritten on how agents actually operate —{" "}
        <em>from cover to claims evidence.</em>
      </>
    ),
    desc: "InsureNow is integrating Humanos risk intelligence into its proprietary underwriting framework. One integration supports underwriting, monitoring and renewal, with execution receipts as evidence when something goes wrong.",
    href: "/case-studies/insurenow",
    cta: "Read the story",
    verify: {
      chip: "verify · claims.settle",
      code: (
        <>
          <span className="tk-kw">await</span> humanos.
          <span className="tk-verify">verify</span>({"{\n"}
          {"  "}
          <span className="tk-prop">subject</span>:{" "}
          <span className="tk-str">&quot;insured.claims-agent&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">action</span>:{" "}
          <span className="tk-str">&quot;claims.settle&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">amount</span>:{" "}
          <span className="tk-num">18500</span>,{"\n"}
          {"  "}
          <span className="tk-prop">approval</span>:{" "}
          <span className="tk-str">&quot;human&quot;</span>
          {"\n})"}
        </>
      ),
      checks: [
        "exposure measured · within financial limit",
        "safeguard matched · human approval",
        "receipt signed · claims evidence",
      ],
      verdict: (
        <>
          <span className="ok">● receipt</span> — risk profile refreshed every
          24h
        </>
      ),
    },
  },
  {
    cat: "finance",
    name: "Agentics Credit",
    status: "Integrated",
    domain: "Agentic credit · Polymarket",
    title: (
      <>
        AI agents borrow real capital to trade —{" "}
        <em>credit set on how they actually operate.</em>
      </>
    ),
    desc: "Agentics Credit provides AI agents with credit to trade on Polymarket. Humanos adds identity and runtime risk intelligence, which Agentics Credit uses alongside its own credit score to set and adjust financial capacity.",
    href: "/case-studies/agentics-credit",
    cta: "Read the story",
    verify: {
      chip: "verify · market.trade",
      code: (
        <>
          <span className="tk-kw">await</span> humanos.
          <span className="tk-verify">verify</span>({"{\n"}
          {"  "}
          <span className="tk-prop">subject</span>:{" "}
          <span className="tk-str">&quot;agent:polymarket-7f3&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">action</span>:{" "}
          <span className="tk-str">&quot;market.trade&quot;</span>,{"\n"}
          {"  "}
          <span className="tk-prop">amount</span>:{" "}
          <span className="tk-num">12000</span>,{"\n"}
          {"  "}
          <span className="tk-prop">credit</span>:{" "}
          <span className="tk-str">&quot;agentics-credit&quot;</span>
          {"\n})"}
        </>
      ),
      checks: [
        "identity verified · owner established (> $10K)",
        "runtime risk measured · current profile",
        "passport updated · history recorded",
      ],
      verdict: (
        <>
          <span className="ok">● authorized</span> — within credit line
        </>
      ),
    },
  },
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

    </div>
  );
}
