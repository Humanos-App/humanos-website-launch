import { StoryPage } from "@/components/story/StoryPage";
import { storyMetadata } from "@/components/story/metadata";
import {
  Accent,
  CardGrid,
  FactGrid,
  KeyValueList,
  Prose,
  PullStatement,
  Statement,
  StepsCard,
  SummaryBox,
} from "@/components/story/blocks";

export const metadata = storyMetadata({
  slug: "datawhisper",
  title:
    "Measuring AI risk inside regulated enterprise workflows · Humanos × DataWhisper",
  description:
    "DataWhisper's SmartInsights.CortexOS integrates Humanos Risk Intelligence to measure, score and prove the risk of every AI agent action inside regulated enterprise workflows.",
});

const DATAWHISPER_URL = "https://www.datawhisper.co.uk";

export default function DataWhisperCaseStudyPage() {
  return (
    <StoryPage
      slug="datawhisper"
      name="Humanos × DataWhisper"
      hero={{
        customer: "DataWhisper",
        title: "DataWhisper’s agents act autonomously inside regulated workflows.",
        intro:
          "SmartInsights.CortexOS is integrating with Humanos so relevant legally consequential actions an agent takes are verified, and proved, before execution.",
        client: "DataWhisper",
        details: [
          {
            label: "Customer",
            value: "DataWhisper · Autonomous AI for regulated industries",
          },
          {
            label: "Surface area",
            value:
              "Legally consequential actions: disputes, settlements, KYC, attestations",
          },
          {
            label: "Integration",
            value: "humanos.verify() · External mandate verifier at the HITL gate",
          },
          {
            label: "Runtime",
            value: "SmartInsights.CortexOS · GuardianShield Governance · v5.2",
          },
        ],
      }}
      tldr={{
        title: "Legally consequential actions, verified and proved before execution.",
        body: (
          <>
            <Prose>
              <p>
                SmartInsights.CortexOS is the governance-first agentic operating
                system for regulated industries. Humanos integrates as its
                external mandate verifier, branded GuardianShield Consent: the
                layer that lets a SmartInsights.CortexOS agent prove a human
                authorized an action, to any party.
              </p>
              <p>
                Inside SmartInsights.CortexOS, the human-in-the-loop (HITL)
                engine holds legally consequential actions at an approval gate.
                For the defined class where the approving party is external, or
                the proof must be independently verifiable, it calls Humanos.
              </p>
              <p>
                Relevant legally consequential actions are verified before they
                commit. The act-or-not boundary is a yes or no, with no LLM in
                the verification path.
              </p>
            </Prose>
            <Statement size="sm">
              Issue once, <Accent>verify anywhere.</Accent>
            </Statement>
          </>
        ),
      }}
      sections={[
        {
          id: "customer",
          nav: "The Customer",
          title: "The governance-first agentic OS for regulated industries.",
          body: (
            <>
              <Prose>
                <p>
                  <strong>SmartInsights.CortexOS</strong> orchestrates
                  multi-agent teams, called <strong>Pelotons</strong>, inside
                  enterprise workflows: onboarding, dispute resolution, claims,
                  KYC, attestations. Governance is enforced at the infrastructure
                  boundary, not inside a prompt. Every action passes an{" "}
                  <strong>18-stage tool gateway</strong> and is recorded in a
                  hash-chained, tamper-evident audit trail.
                </p>
                <p>
                  Inside SmartInsights.CortexOS, the human-in-the-loop (HITL)
                  engine holds legally consequential actions at an approval
                  gate. For the defined class where the approving party is
                  external, or the proof must be independently verifiable, it
                  calls Humanos. <strong>GuardianShield</strong>, the governance
                  and audit plane, records and proves it — branded inside
                  CortexOS as <strong>GuardianShield Consent</strong>.
                </p>
                <p>
                  Explore SmartInsights.CortexOS at{" "}
                  <a href={DATAWHISPER_URL} target="_blank" rel="noopener noreferrer">
                    datawhisper.co.uk
                  </a>
                  .
                </p>
              </Prose>
              <KeyValueList
                items={[
                  { label: "Channels", value: "Channel governance" },
                  { label: "Agents", value: "Agentic AI Governance · HITL engine" },
                  { label: "Core", value: "Orchestration · memory · identity" },
                  { label: "Roots", value: "GuardianShield · GuardianShield Consent" },
                  { label: "Runtime", value: "SmartInsights.CortexOS · v5.2" },
                  { label: "Integration", value: "humanos.verify() · one call" },
                  {
                    label: "Site",
                    value: (
                      <a href={DATAWHISPER_URL} target="_blank" rel="noopener noreferrer">
                        datawhisper.co.uk&nbsp;↗
                      </a>
                    ),
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: "selective",
          nav: "Selective by Design",
          title: "Selective by design, not universal.",
          body: (
            <>
              <Prose>
                <p>
                  GuardianShield Consent does not replace the
                  SmartInsights.CortexOS internal HITL model. Most approvals,
                  escalations and operator overrides resolve inside
                  SmartInsights.CortexOS, with no external dependency and no
                  added latency.
                </p>
              </Prose>
              <PullStatement>
                Humanos is invoked only when the proof must survive outside
                DataWhisper&rsquo;s systems, or the approving party is external.
              </PullStatement>
              <Prose>
                <p>
                  If internal governance is sufficient, the external call never
                  happens.
                </p>
              </Prose>
            </>
          ),
        },
        {
          id: "integration",
          nav: "The Integration",
          title: "One verify() call, at the SmartInsights.CortexOS HITL gate.",
          body: (
            <>
              <Prose>
                <p>
                  Before a legally consequential action commits, the
                  SmartInsights.CortexOS HITL engine calls humanos.verify().
                  Identity, scope, counterparty, amount and validity are checked
                  against a signed mandate, and a deterministic allow or deny is
                  returned.
                </p>
              </Prose>
              <Statement>
                No LLM sits in <Accent>the verification path.</Accent>
              </Statement>
              <CardGrid
                items={[
                  {
                    label: "✓ Commit",
                    title: "Resolution commits.",
                    text: "Within mandate, within constraints, within validity. SmartInsights.CortexOS writes the resolution to the case of record, and a portable proof is attached, verifiable by any party with the right access.",
                  },
                  {
                    label: "⟲ Recover",
                    title: "Recover, then continue.",
                    text: "Out of scope, expired or revoked. The HITL engine requests step-up approval in real time, the mandate is updated, and execution resumes once authorization is valid. The agent never silently fails or guesses.",
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: "stages",
          nav: "How It Works",
          title: "Five stages, from mandate to proof.",
          body: (
            <>
              <Prose>
                <p>
                  The stages below walk through one dispute case end-to-end —
                  issued by DataWhisper Operations, verified by Humanos at the
                  SmartInsights.CortexOS HITL engine gate, and committed only
                  after a deterministic yes/no.
                </p>
              </Prose>
              <StepsCard
                caption="Example · One dispute case, from mandate to proof"
                steps={[
                  {
                    title: "A human authorizes scope.",
                    text: (
                      <>
                        A DataWhisper Operations Lead authorizes scope, ceiling
                        and validity. Humanos issues a machine-verifiable{" "}
                        <strong>W3C Verifiable Credential</strong>, signed once
                        and reusable across every case.
                      </>
                    ),
                  },
                  {
                    title: "SmartInsights.CortexOS prepares the action.",
                    text: (
                      <>
                        The dispute-resolution Peloton assembles the proposed
                        resolution — refund, fee adjustment, goodwill credit —
                        and attaches the mandate to its outbound action as{" "}
                        <span className="story-mono">x-humanos-mandate</span>.
                      </>
                    ),
                  },
                  {
                    title: "The HITL engine verifies.",
                    text: (
                      <>
                        The HITL engine calls{" "}
                        <span className="story-mono">humanos.verify()</span>{" "}
                        against the mandate. Identity, scope, counterparty,
                        amount and validity are checked in 82 ms —
                        deterministic, no LLM in the path.
                      </>
                    ),
                  },
                  {
                    title: "Commit, or step up.",
                    text: "Authorized → SmartInsights.CortexOS commits the resolution. Out of scope — a £45,000 settlement against a £25,000 ceiling — the gate blocks and triggers a real-time step-up.",
                  },
                  {
                    title: "Anchor the proof.",
                    text: "Each authorized action emits a cryptographic proof, recorded in both the SmartInsights.CortexOS tamper-evident audit trail and the independent consent record. Auditors, regulators and partners verify it directly, without reconstructing internal logs.",
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: "outcome",
          nav: "What It Delivers",
          title: "Provable authorization, by default.",
          body: (
            <CardGrid
              items={[
                {
                  label: "Verified",
                  title: "Verified before execution.",
                  text: "Relevant legally consequential actions are verified before they commit. The verify call is inline at the HITL gate, not after the agent has acted.",
                },
                {
                  label: "Deterministic",
                  title: "Probabilistic AI, deterministic answer.",
                  text: "Agents stay probabilistic in reasoning. The act-or-not boundary is a yes or no, with no LLM in the verification path.",
                },
                {
                  label: "External reach",
                  title: "Human-in-the-loop beyond the operator.",
                  text: "Approval and consent can come from external counterparties and data subjects, not only internal operators. The loop extends past DataWhisper’s boundary.",
                },
                {
                  label: "Portable",
                  title: "Authorization travels with the action.",
                  text: "Issue once, verify anywhere. The proof is recorded in the SmartInsights.CortexOS tamper-evident audit trail, lives inside GuardianShield Governance, and is verifiable by any permitted party.",
                },
              ]}
            />
          ),
        },
        {
          id: "use-cases",
          nav: "Where It Applies",
          title: "Anywhere a regulated agent acts on a human’s authority.",
          body: (
            <>
              <CardGrid
                items={[
                  {
                    label: "Engage & Grow · Fraud & Risk",
                    title: "Disputes & chargebacks",
                    text: "Refunds, settlements and goodwill credits, each authorized at the gate and carrying a portable proof.",
                    tags: ["refund", "settle", "credit"],
                  },
                  {
                    label: "Engage & Grow · Fraud & Risk",
                    title: "High-value payment execution",
                    text: "Above an operator-defined threshold, cryptographic proof that a human authorized execution at a specific amount.",
                    tags: ["approve", "execute", "prove"],
                  },
                  {
                    label: "AI Onboarding",
                    title: "KYB / KYC & sanctions",
                    text: "A signed human authorization record provides audit-ready evidence for FCA or equivalent review.",
                    tags: ["kyc", "sanction", "file"],
                  },
                  {
                    label: "Engage & Grow",
                    title: "Contract & terms acceptance",
                    text: "Tamper-proof evidence that a counterparty accepted terms at a specific time and scope.",
                    tags: ["accept", "attest", "audit"],
                  },
                ]}
              />
              <SummaryBox>
                <FactGrid
                  items={[
                    { label: "Verified", value: "before execution" },
                    { label: "Deterministic", value: "no LLM in the verification path" },
                    { label: "External reach", value: "beyond the operator" },
                    { label: "Portable", value: "authorization travels with the action" },
                  ]}
                />
                <Statement size="lg">
                  AI agents execute inside regulated environments,{" "}
                  <Accent>within provable, independently verifiable boundaries.</Accent>
                </Statement>
              </SummaryBox>
            </>
          ),
        },
      ]}
    />
  );
}
