import { StoryPage } from "../_components/story/StoryPage";
import { storyMetadata } from "../_components/story/metadata";
import {
  Accent,
  CardGrid,
  Chain,
  Chips,
  CompareTable,
  FactGrid,
  FlowStack,
  KeyValueList,
  Prose,
  PullStatement,
  Statement,
  StepsCard,
  SummaryBox,
} from "../_components/story/blocks";

export const metadata = storyMetadata({
  slug: "agentics-credit",
  title:
    "How AI agents on Polymarket get credit · Agentics Credit × Humanos customer story",
  description:
    "Agentics Credit provides AI agents with credit to trade on Polymarket. Humanos measures their operational risk as they act, and Agentics Credit uses that intelligence alongside its own credit score to set financial capacity.",
});

export default function AgenticsCreditCaseStudyPage() {
  return (
    <StoryPage
      slug="agentics-credit"
      name="Humanos × Agentics Credit"
      hero={{
        customer: "Agentics Credit",
        size: "display",
        title: "How AI agents on Polymarket get credit",
        intro:
          "Agentics Credit provides AI agents with credit to trade on Polymarket. Humanos provides the identity and continuous operational risk intelligence that helps determine how much financial capacity those agents can access.",
        client: (
          <>
            Agentics<span> Credit</span>
          </>
        ),
        details: [
          { label: "Customer", value: "Agentics Credit" },
          { label: "Provides", value: "Credit for AI agents" },
          { label: "Where agents trade", value: "Polymarket" },
          {
            label: "Uses Humanos for",
            value: "Runtime risk · Identity · Human approval · Risk Passport",
          },
        ],
      }}
      tldr={{
        title: "AI agents are borrowing real capital to trade on Polymarket.",
        body: (
          <>
            <Prose>
              <p>
                Agentics Credit provides the credit and runs its own credit
                scoring system. Humanos adds identity and continuous operational
                risk intelligence.
              </p>
              <p>
                As an agent trades, Humanos measures its risk at relevant actions
                and builds a verified history of how it actually operates.
                Agentics Credit uses that intelligence alongside its own credit
                score to set and adjust financial capacity.
              </p>
              <p>
                Above $10K, the agent must be identified through the Humanos
                network. Higher-risk actions can require approval from the human
                behind it.
              </p>
              <p>That history becomes the agent&apos;s portable Humanos Risk Passport.</p>
            </Prose>
            <FlowStack
              label="How the model works"
              steps={[
                { label: "AI agent", desc: "Acts" },
                { label: "Humanos", desc: "Identity + runtime risk", highlight: true },
                { label: "Agentics Credit", desc: "Credit + limits" },
                { label: "Polymarket", desc: "Agent trades" },
              ]}
            />
          </>
        ),
      }}
      sections={[
        {
          id: "setting",
          nav: "Real Credit on Polymarket",
          title: "AI agents are getting real credit to trade on Polymarket.",
          body: (
            <>
              <Prose>
                <p>
                  On Polymarket, AI agents can take positions on real-world
                  outcomes autonomously.
                </p>
                <p>
                  Some of those agents trade using credit from Agentics Credit.
                  That means autonomous software is being given real financial
                  capacity to make real economic decisions.
                </p>
              </Prose>
              <PullStatement>
                For a lender, that creates a new question: how do you understand
                the risk of software that is continuously acting with borrowed
                capital?
              </PullStatement>
            </>
          ),
        },
        {
          id: "lender",
          nav: "Agentics Credit Provides the Credit",
          title: "Agentics Credit decides how much an agent can borrow.",
          body: (
            <>
              <Prose>
                <p>
                  Agentics Credit provides AI agents with credit they can use to
                  trade on Polymarket.
                </p>
                <p>
                  It already runs its own credit scoring system to decide which
                  agents receive credit, how much they can access and under what
                  conditions.
                </p>
                <p>
                  Humanos does not replace that score. It provides an additional
                  third-party view of something traditional credit scoring cannot
                  capture alone: how the AI agent is actually operating.
                </p>
              </Prose>
              <CardGrid
                items={[
                  { label: "Agentics Credit", title: "Creditworthiness" },
                  { label: "Humanos", title: "Operational risk", highlight: true },
                ]}
              />
            </>
          ),
        },
        {
          id: "runtime",
          nav: "Risk Measured as the Agent Acts",
          title: "The risk is measured as the agent acts.",
          body: (
            <>
              <Prose>
                <p>
                  Instead of assessing the agent once and assuming its risk stays
                  the same, Humanos measures how it operates at runtime.
                </p>
                <p>
                  When the agent makes a relevant tool call, for example
                  attempting to place a trade, Humanos evaluates the action in
                  context and records what happened.
                </p>
              </Prose>
              <StepsCard
                caption="Example · An agent trades on Polymarket"
                steps={[
                  {
                    title: "The agent acts",
                    text: "An AI agent identifies a market opportunity on Polymarket and attempts to place a trade using its Agentics Credit line.",
                  },
                  {
                    title: "Humanos measures the action",
                    text: "At the tool call, Humanos measures the operational risk around the action: the agent making it, its current exposure, the safeguards governing it and its recent behavior.",
                  },
                  {
                    title: "The action is logged",
                    text: "The action and its outcome become part of the agent's verified operational history.",
                  },
                  {
                    title: "The risk profile updates",
                    text: "As the agent continues operating, relevant actions continuously contribute to its current risk profile.",
                  },
                  {
                    title: "Agentics Credit uses the intelligence",
                    text: "Agentics Credit combines this current operational risk intelligence with its own credit score when setting or adjusting the agent's financial capacity.",
                  },
                ]}
              />
              <Chain
                items={[
                  "The agent acts",
                  "Risk is measured",
                  "The history updates",
                  "Credit can adapt",
                ]}
              />
              <Prose>
                <p>
                  An agent demonstrating lower operational risk can support
                  greater financial capacity. If its risk increases, Agentics
                  Credit can tighten limits or conditions. The credit decision
                  always stays with Agentics Credit.
                </p>
              </Prose>
            </>
          ),
        },
        {
          id: "identity",
          nav: "Above $10K, Identity Is Required",
          title: "Above $10K, Agentics Credit needs to know who is behind the agent.",
          body: (
            <>
              <Prose>
                <p>
                  Any AI agent seeking more than $10K in credit from Agentics
                  Credit must be identified through the Humanos network.
                </p>
                <p>
                  Humanos establishes the agent&apos;s identity and the verified
                  person or organization behind it. That gives Agentics Credit
                  accountability before giving autonomous software greater
                  financial capacity.
                </p>
              </Prose>
              <CompareTable
                caption="Credit requested by an agent"
                columns={["Up to $10K", "More than $10K"]}
                highlight={1}
                monoHead
                rows={[
                  [
                    "Agentics Credit's requirements",
                    { content: "Verified through Humanos", tone: "strong" },
                  ],
                  [
                    { content: "—", tone: "muted" },
                    {
                      content: "Human or organization behind the agent established",
                      tone: "strong",
                    },
                  ],
                ]}
              />
            </>
          ),
        },
        {
          id: "approval",
          nav: "Human Approval When Risk Requires It",
          title: "Autonomous until the risk requires a human.",
          body: (
            <>
              <Prose>
                <p>Agents do not need human approval for every routine action.</p>
                <p>
                  When an action crosses a risk threshold defined by Agentics
                  Credit, Humanos can collect explicit approval from the verified
                  person or organization behind the agent before the action
                  proceeds.
                </p>
                <p>
                  This allows routine activity to remain autonomous while giving
                  Agentics Credit human accountability when the risk requires it.
                </p>
              </Prose>
              <KeyValueList
                labelWidth={200}
                items={[
                  {
                    label: "Routine action",
                    labelTone: "muted",
                    value: "Agent acts autonomously",
                  },
                  {
                    label: "Higher-risk action",
                    labelTone: "strong",
                    valueTone: "strong",
                    value: (
                      <span className="story-kv__inline">
                        <span>Human approval required</span>
                        <Chips
                          items={[
                            { label: "✔ APPROVE", tone: "approve" },
                            { label: "✖ DENY", tone: "deny" },
                          ]}
                        />
                      </span>
                    ),
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: "passport",
          nav: "The Risk Passport",
          title: "Every action contributes to a risk history the agent can carry with it.",
          body: (
            <>
              <Prose>
                <p>
                  The history created as an agent operates does not disappear when
                  it leaves Polymarket.
                </p>
                <p>
                  Relevant actions measured through Humanos contribute to the
                  agent&apos;s Risk Passport: an evolving record of its identity,
                  operational behavior, safeguards and risk history. That Risk
                  Passport travels with the agent across the Humanos network.
                </p>
                <p>
                  If the same agent appears in another product, platform or
                  Agentics Credit customer, Agentics Credit can use the history it
                  has already built instead of treating it as entirely unknown.
                </p>
              </Prose>
              <FlowStack
                label="How the Risk Passport travels"
                steps={[
                  { label: "Polymarket", desc: "Agent builds history" },
                  {
                    label: "Humanos Risk Passport",
                    desc: "Identity + behavior + risk history",
                    highlight: true,
                  },
                  {
                    label: "Next product / customer",
                    desc: "History travels with the agent",
                  },
                ]}
              />
              <Statement size="lg">
                One agent.
                <br />
                One evolving risk history.
                <br />
                <Accent>Across the network.</Accent>
              </Statement>
              <Prose>
                <p>
                  The better the verified risk profile an agent builds, the more
                  financial capacity it can potentially unlock.
                </p>
              </Prose>
            </>
          ),
        },
        {
          id: "unlocks",
          nav: "What This Unlocks",
          title: "More confidence to give AI agents financial capacity.",
          body: (
            <>
              <Prose>
                <p>
                  Agentics Credit provides the capital and determines
                  creditworthiness. Humanos gives it an independent view of who is
                  behind the agent and how that agent is actually operating.
                </p>
                <p>
                  Together, Agentics Credit can make credit decisions using both
                  financial and operational risk, while the agent builds a
                  portable track record through every environment where it
                  operates.
                </p>
              </Prose>
              <SummaryBox>
                <FactGrid
                  items={[
                    { label: "Real credit", value: "for autonomous agents" },
                    { label: "Current risk", value: "measured as they operate" },
                    { label: "Human accountability", value: "when required" },
                    { label: "Portable history", value: "that follows the agent" },
                  ]}
                />
                <Statement size="lg">
                  Better verified risk can unlock{" "}
                  <Accent>greater financial capacity.</Accent>
                </Statement>
              </SummaryBox>
            </>
          ),
        },
      ]}
    />
  );
}
