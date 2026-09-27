import { StoryPage } from "@/components/story/StoryPage";
import { storyMetadata } from "@/components/story/metadata";
import {
  Accent,
  CardGrid,
  Chain,
  CompareTable,
  FactGrid,
  KeyValueList,
  Prose,
  PullStatement,
  Statement,
  StepsCard,
  SummaryBox,
} from "@/components/story/blocks";

export const metadata = storyMetadata({
  slug: "numo",
  title:
    "Measuring and proving AI risk in autonomous treasury operations · Humanos × Numo",
  description:
    "Numo runs autonomous strategies that reallocate capital continuously. Humanos measures the risk of every agent action and provides continuous Risk Intelligence across the portfolio.",
});

/** ✕ / ✓ marks for the build-vs-Humanos table, coloured like the old UI. */
const No = () => (
  <span className="is-negative" aria-hidden="true">
    ✕
  </span>
);
const Yes = () => (
  <span className="is-positive" aria-hidden="true">
    ✓
  </span>
);

const buildVs: Array<[string, string]> = [
  [
    "Rules fragment across systems and venues.",
    "Mandates are shared across every system that calls verify().",
  ],
  [
    "Authorization is coupled to your codebase.",
    "Rules are externalized, versioned, and revocable.",
  ],
  [
    "Auditability requires reconstructing logs after the fact.",
    "Proof is generated at execution time. Auditors verify, not reconstruct.",
  ],
  [
    "No external party can verify your trust claims.",
    "Counterparties verify Proofs independently — same standard, same primitives.",
  ],
  [
    "Every new integration restarts the work.",
    "One verify() call covers every venue, internal or external.",
  ],
  [
    "Rule changes require code, deploys, and coordination.",
    "Issue a new mandate, revoke the old one. Effective in real time.",
  ],
];

export default function NumoCaseStudyPage() {
  return (
    <StoryPage
      slug="numo"
      name="Humanos × Numo"
      hero={{
        customer: "Numo",
        title:
          "Numo's agents move capital across treasury, exchanges, custodians, and rails.",
        intro:
          "Numo runs autonomous strategies that reallocate capital continuously across operating accounts, exchanges, custodians, and payment rails. Humanos sits between the agent's decision and the actual transaction — identity, scope, amount, validity — deterministic yes or no, before any capital moves.",
        client: "Numo",
        details: [
          {
            label: "Domain",
            value: "Automated capital allocation · Agentic finance",
          },
          {
            label: "Surface area",
            value: "Treasury · Exchanges · Custodians · Rails",
          },
          {
            label: "Integration",
            value: (
              <>
                <span className="story-mono">humanos.verify()</span> · One call
                before any movement
              </>
            ),
          },
          {
            label: "Site",
            value: <a href="https://usenumo.com/" target="_blank" rel="noopener noreferrer">usenumo.com&nbsp;↗</a>,
          },
        ],
      }}
      tldr={{
        title: "Numo's agents move capital. Humanos verifies every action before execution.",
        body: (
          <>
            <Prose>
              <p>
                Numo is a platform for automated capital allocation. Strategies
                run autonomously. Capital is reallocated continuously across
                treasury, exchanges, custodians, and payment rails.
              </p>
              <p>
                Humanos sits between the agent&apos;s decision and the actual
                transaction, and checks every action before it goes through —
                identity, scope, amount, validity.
              </p>
              <p>
                Standing mandates replace four-person chains. Humans sign once —
                not every time. Approval, KYC, or identity verification is
                collected the moment it&apos;s needed.
              </p>
              <p>
                Every action produces a cryptographic Proof. Auditors look it up
                directly, instead of piecing together logs after the fact.
              </p>
            </Prose>
            <Statement size="sm">
              Nothing moves on assumption.{" "}
              <Accent>Every action verified before execution.</Accent>
            </Statement>
          </>
        ),
      }}
      sections={[
        {
          id: "customer",
          nav: "About the Customer",
          title:
            "Numo is a platform for automated capital allocation, where agents move capital across systems.",
          body: (
            <>
              <Prose>
                <p>
                  Strategies run autonomously. Capital is reallocated
                  continuously across treasury, exchanges, custodians, and
                  payment rails.
                </p>
                <p>
                  Humanos sits between the agent&apos;s decision and the actual
                  transaction, and checks every action before it goes through —
                  identity, scope, amount, validity.
                </p>
              </Prose>
              <KeyValueList
                items={[
                  { label: "Status", value: "Integrated", valueTone: "strong" },
                  { label: "Domain", value: "Automated capital allocation" },
                  {
                    label: "Surface area",
                    value: "Treasury · Exchanges · Custodians · Rails",
                  },
                  {
                    label: "Runtime",
                    value: <span className="story-mono">numo.strategies.v2</span>,
                  },
                  {
                    label: "Integration",
                    value: (
                      <span className="story-mono">humanos.verify() · one call</span>
                    ),
                  },
                  {
                    label: "Site",
                    value: <a href="https://usenumo.com/" target="_blank" rel="noopener noreferrer">usenumo.com&nbsp;↗</a>,
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: "problem",
          nav: "The Problem",
          title: "Capital moves on assumptions, not authorization.",
          body: (
            <>
              <Prose>
                <p>
                  Agents now move money. Strategies run on their own. Execution
                  spans treasury, exchanges, custodians, and payment rails. The
                  rules that govern what is allowed live in code, scattered
                  across systems, slowly drifting out of sync — and never
                  actually checked at the moment an action happens.
                </p>
              </Prose>
              <CardGrid
                min={280}
                items={[
                  {
                    label: "What's happening",
                    title: "Agents act, capital moves, no one verifies.",
                    text: "Decisions are defined in one place. Agents act in another. Execution happens across multiple systems. Approvals — when they exist — are captured elsewhere. Nothing answers, in real time, whether a specific action is actually allowed.",
                  },
                  {
                    label: "What it costs",
                    title: "Drift. Replication. Unprovable trust.",
                    text: (
                      <>
                        Rules duplicated per venue. Policy changes require code
                        deploys. Auditors reconstruct trails after the fact. The
                        firm can show what agents <em>did</em> — not that any
                        given action was <em>allowed</em>.
                      </>
                    ),
                  },
                ]}
              />
              <PullStatement>
                Capital moves on assumptions.{" "}
                <Accent>Not on verified authorization.</Accent>
              </PullStatement>
            </>
          ),
        },
        {
          id: "solution",
          nav: "The Solution",
          title: "One verification step between decision and execution.",
          body: (
            <>
              <Prose>
                <p>
                  Before any capital movement, Numo&apos;s agent calls{" "}
                  <span className="story-mono">humanos.verify()</span>. Identity,
                  scope, amount, and validity are checked against a signed
                  mandate in real time. Authorized actions execute. Missing
                  authorization is collected at runtime — not silently failed.
                </p>
              </Prose>
              <CardGrid
                min={280}
                items={[
                  {
                    label: "✓ Authorized",
                    title: "Execute.",
                    text: "Within mandate, within constraints, within validity. The agent proceeds. A Proof is generated — portable, verifiable by any party.",
                  },
                  {
                    label: "✕ Not authorized",
                    title: "Recover — then continue.",
                    text: "Humanos requests approval instantly (SMS, API), collects KYC or identity verification if required, updates the mandate, and resumes execution once authorization is valid.",
                  },
                ]}
              />
              <Statement>
                The system doesn&apos;t fail.{" "}
                <Accent>It recovers authorization at runtime.</Accent>
              </Statement>
            </>
          ),
        },
        {
          id: "implementation",
          nav: "Implementation",
          title: "How Numo implemented it.",
          body: (
            <>
              <Prose>
                <p>
                  Five stages in chronological order, walking through
                  Numo&apos;s €50,000 capital reallocation — signed by the
                  Treasury Lead, verified before any movement, executed across{" "}
                  <span className="story-mono">custodian.fireblocks</span> and{" "}
                  <span className="story-mono">venue.binance</span>.
                </p>
              </Prose>
              <StepsCard
                caption="Example · €50,000 capital reallocation"
                steps={[
                  {
                    title: "Issue · Define mandate.",
                    text: "Treasury lead authorizes scope, strategy, ceiling, and validity. Humanos issues a machine-verifiable mandate — signed once, reusable across every system that calls verify().",
                  },
                  {
                    title: "Prepare · Agent prepares action.",
                    text: (
                      <>
                        A strategy decides to reallocate capital. The Numo runtime
                        assembles the action with subject, amount, and runtime
                        context. The agent attaches the mandate via{" "}
                        <span className="story-mono">x-humanos-mandate</span>.
                      </>
                    ),
                  },
                  {
                    title: "Verify · Verify before execution.",
                    text: (
                      <>
                        Before any capital movement, the agent calls{" "}
                        <span className="story-mono">humanos.verify()</span>.
                        Constraints, validity, and revocation are checked in 176
                        ms. Deterministic yes / no.
                      </>
                    ),
                  },
                  {
                    title: "Execute · Execute — or recover.",
                    text: "Authorized → execution proceeds across rails. Not authorized → Humanos doesn't fail. It collects approval or KYC in real time (SMS, API), updates the mandate, and resumes once authorization is valid.",
                  },
                  {
                    title: "Prove · Audit proof.",
                    text: "Every action emits a cryptographic Proof — attached to the execution, portable forever. Auditors, custodians, and counterparties verify the Proof directly against Humanos; nothing reconstructs trails from internal logs.",
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: "outcome",
          nav: "The Outcome",
          title: "What you get the moment it's wired in.",
          body: (
            <>
              <CardGrid
                min={220}
                items={[
                  {
                    label: "01 · Verify",
                    title: "Every action verified before execution.",
                    text: "Nothing moves on assumption. The verify call is non-optional and inline — before any capital movement, not after the fact.",
                  },
                  {
                    label: "02 · Enforce",
                    title: "One rule set across all systems.",
                    text: "Internal and external systems read from the same authorization source. No fragmentation per venue, custodian, or rail.",
                  },
                  {
                    label: "03 · Eliminate",
                    title: "Manual approvals are gone.",
                    text: "Standing mandates replace four-person chains. Humans sign once — not every time.",
                  },
                  {
                    label: "04 · Audit",
                    title: "Auditability without building logs.",
                    text: "Every action produces a cryptographic Proof. Auditors look it up directly, instead of piecing together logs after the fact.",
                  },
                  {
                    label: "05 · Update",
                    title: "Change rules without code changes.",
                    text: "Issue a new mandate. Revoke the old one. Effective immediately, everywhere a system verifies.",
                  },
                  {
                    label: "06 · Recover",
                    title: "Recover missing authorization in real time.",
                    text: "Approval, KYC, or identity verification is collected the moment it's needed. Execution resumes once authorization is valid.",
                  },
                ]}
              />
              <Statement>
                Agents can act autonomously —{" "}
                <Accent>within provable, enforceable boundaries.</Accent>
              </Statement>
            </>
          ),
        },
        {
          id: "build-vs-buy",
          nav: "Build vs Humanos",
          title: "Authorization doesn't scale as an internal system.",
          body: (
            <CompareTable
              caption="Build it yourself vs. with Humanos"
              columns={["Internal authorization", "Shared authorization layer"]}
              highlight={1}
              rows={buildVs.map(([bad, good]) => [
                {
                  content: (
                    <>
                      <No /> {bad}
                    </>
                  ),
                  tone: "muted",
                },
                {
                  content: (
                    <>
                      <Yes /> {good}
                    </>
                  ),
                  tone: "strong",
                },
              ])}
            />
          ),
        },
        {
          id: "network",
          nav: "Network Effect and Use Cases",
          title:
            "Authorization becomes a shared primitive — not something rebuilt per system.",
          body: (
            <>
              <Prose>
                <p>
                  <strong>Mandates work across systems.</strong> Issue once.
                  Verify anywhere — internal services, custodians, exchanges,
                  rails.
                </p>
                <p>
                  <strong>Counterparties verify independently.</strong> Auditors
                  and partners check Proofs without trusting your logs.
                </p>
                <p>
                  <strong>Integrations reuse the same standard.</strong> No new
                  logic per venue. The integration is the verify() call.
                </p>
                <p>
                  <strong>Each participant strengthens the standard.</strong> The
                  more systems verify against Humanos, the more valuable a Proof
                  becomes.
                </p>
              </Prose>
              <Statement>
                Anywhere agents <Accent>move capital.</Accent>
              </Statement>
              <CardGrid
                min={280}
                items={[
                  {
                    label: "01",
                    title: "Treasury",
                    text: "Sweep, rebalance, and allocate liquidity across operating accounts and yield venues.",
                    tags: ["transfer", "rebalance", "sweep"],
                  },
                  {
                    label: "02",
                    title: "Crypto / DeFi",
                    text: "Allocate capital across exchanges, vaults, and on-chain protocols on autonomous schedules.",
                    tags: ["deposit", "swap", "stake"],
                  },
                  {
                    label: "03",
                    title: "Trading systems",
                    text: "Run strategies across venues, with strict limits set for each venue, each asset, and each time window.",
                    tags: ["order", "hedge", "close"],
                  },
                  {
                    label: "04",
                    title: "Market makers",
                    text: "Coordinate inventory and quote risk across multiple environments and counterparties.",
                    tags: ["quote", "move inventory", "settle"],
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: "model",
          nav: "The Model",
          title: "Issue → Verify → Collect → Prove.",
          body: (
            <>
              <Chain items={["Mandate", "Check", "Approval", "Receipt"]} />
              <KeyValueList
                items={[
                  {
                    label: "Issue",
                    value:
                      "Human authorizes scope. Humanos issues a machine-verifiable mandate, reusable across every system that verifies.",
                  },
                  {
                    label: "Verify",
                    value: (
                      <>
                        Any external system runs{" "}
                        <span className="story-mono">humanos.verify()</span>.
                        Deterministic yes / no.
                      </>
                    ),
                  },
                  {
                    label: "Collect",
                    value:
                      "Out of scope? Request step-up authorization from the human principal in real time — API, SMS, or email.",
                  },
                  {
                    label: "Prove",
                    value:
                      "Cryptographic Proof per action. Auditable forever. Verifiable by anyone.",
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: "category",
          nav: "Category Definition",
          title: "Humanos operates at the moment an agent decides to move money.",
          body: (
            <>
              <Prose>
                <p>
                  At that moment, authorization must be verified, the decision
                  must be deterministic, and the outcome must be provable.
                  Everything else follows.
                </p>
              </Prose>
              <SummaryBox>
                <FactGrid
                  items={[
                    {
                      label: "Verified",
                      value:
                        "Authorization is checked at execution. Never assumed. Never after the fact.",
                    },
                    {
                      label: "Deterministic",
                      value:
                        "Allow, block, or request approval. Nothing in between. Deterministic yes / no.",
                    },
                    {
                      label: "Provable",
                      value:
                        "Every action emits a cryptographic receipt. Anyone can verify it. Forever.",
                    },
                  ]}
                />
                <Statement size="lg">
                  Agents assume permission.
                  <br />
                  <Accent>Agents verify it.</Accent>
                </Statement>
              </SummaryBox>
            </>
          ),
        },
      ]}
    />
  );
}
