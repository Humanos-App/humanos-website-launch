import { StoryPage } from "@/components/story/StoryPage";
import { pageMetadata } from "@/components/story/metadata";
import {
  Accent,
  CardGrid,
  KeyValueList,
  Prose,
  Statement,
} from "@/components/story/blocks";
import {
  BridgeCard,
  FinalCta,
  QuestionList,
  SnapshotCard,
  StoryCtas,
} from "@/components/story/product-blocks";
import { Breadcrumb } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  path: "/intelligence",
  title: "AI Agent Risk Intelligence · Humanos",
  description:
    "Verified identity, permissions and behavior turned into live risk intelligence that insurers, lenders and partners can use in their own decisions.",
});

export default function RiskIntelligencePage() {
  return (
    <StoryPage
      breadcrumb={
        <Breadcrumb items={[{ name: "Risk Intelligence", path: "/intelligence" }]} />
      }
      hero={{
        eyebrow: "Risk intelligence",
        title: (
          <>
            Get the risk answers behind <Accent>every AI agent.</Accent>
          </>
        ),
        intro:
          "Humanos turns verified identity, permissions and behavior into live risk intelligence that insurers, lenders and partners can use in their own decisions.",
        actions: <StoryCtas />,
        details: [
          { label: "Updates", value: "Every time the agent acts" },
          { label: "Source", value: "Built from signed records" },
          { label: "Privacy", value: "Aggregates, never personal data" },
        ],
      }}
      tldr={{
        label: "In short",
        title: "Verified behavior becomes something businesses can decide on.",
        body: (
          <Prose>
            <p>
              Once an agent&apos;s behavior is measured and verified, the
              organizations it deals with can use it: to insure it, lend to it
              or work with it. Humanos provides the evidence. They make the
              decision.
            </p>
          </Prose>
        ),
      }}
      sections={[
        {
          id: "history",
          nav: "Agent history",
          title: "Every action adds to the agent's story.",
          body: (
            <>
              <Prose>
                <p>
                  Identity, permissions, guardrails, actions and outcomes build
                  into one verified history, from the agent&apos;s first
                  connection to its latest action.
                </p>
              </Prose>
              <Statement>
                The longer an agent operates, the more its track record{" "}
                <Accent>is worth.</Accent>
              </Statement>
            </>
          ),
        },
        {
          id: "questions",
          nav: "The questions",
          title: "The questions businesses need answered.",
          body: (
            <QuestionList
              items={[
                {
                  q: "Who is this agent?",
                  a: "Its verified identity, and who stands behind it.",
                },
                {
                  q: "What can it do?",
                  a: "Its tools, permissions and limits, and how much headroom it has left.",
                },
                {
                  q: "What has it actually done?",
                  a: "Actions, approvals, denials, counterparties and incidents.",
                },
                {
                  q: "How risky is it now?",
                  a: "Its current 0–100 score, and how its risk profile is changing.",
                },
                {
                  q: "Can I trust the record?",
                  a: "It's a signed, tamper-evident history.",
                },
              ]}
            />
          ),
        },
        {
          id: "snapshot",
          nav: "Now & over time",
          title: "Right now, and over time.",
          body: (
            <>
              <CardGrid
                min={250}
                items={[
                  {
                    label: "Trust snapshot",
                    title: "What's true about this agent right now?",
                    tags: [
                      "Identity",
                      "Permissions",
                      "Limits and headroom",
                      "Human approvals",
                      "Record integrity",
                      "Current risk",
                    ],
                    highlight: true,
                  },
                  {
                    label: "Trust window",
                    title: "What happened over a period of time?",
                    tags: [
                      "Activity",
                      "Approvals and denials",
                      "Counterparties",
                      "Incidents",
                      "Behavior over time",
                    ],
                  },
                ]}
              />
              <Prose>
                <p>
                  Insurers and lenders need both: where the agent stands today,
                  and how it has behaved to get there.
                </p>
              </Prose>
            </>
          ),
        },
        {
          id: "current",
          nav: "Always current",
          title: "Always current. One request away.",
          body: (
            <>
              <Prose>
                <p>
                  The answers refresh every time the agent acts. Query them
                  whenever you need to: some partners check before every
                  decision, others update their own records periodically.
                </p>
              </Prose>
              <SnapshotCard
                agent="TREASURY-01"
                score={24}
                checks={[
                  "Registered",
                  "Valid permission",
                  "Human approval verified",
                  "Record intact",
                ]}
                note="2 actions blocked this week"
              />
            </>
          ),
        },
        {
          id: "proof",
          nav: "Proof",
          title: "Agents that can prove who they are.",
          body: (
            <Prose>
              <p>
                When an agent deals with another company or system, the other
                side verifies its identity and risk information instead of
                relying on the agent&apos;s own claims.
              </p>
              <p>
                <a href="/prove">How proof works →</a>
              </p>
            </Prose>
          ),
        },
        {
          id: "privacy",
          nav: "Privacy",
          title: "Share risk, not personal data.",
          body: (
            <>
              <Prose>
                <p>
                  Partners get the intelligence they need, never user
                  identities, contacts or internal identifiers.
                </p>
              </Prose>
              <KeyValueList
                labelWidth={150}
                items={[
                  { label: "Shared", value: "Aggregated answers about the agent." },
                  {
                    label: "Never shared",
                    labelTone: "muted",
                    value: "User identities, contacts and internal identifiers.",
                  },
                  {
                    label: "Your control",
                    value: "Sharing is explicit, and you can revoke it at any time.",
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: "use",
          nav: "Put it to work",
          title: "Put risk intelligence to work.",
          body: (
            <>
              <Prose>
                <p>
                  Knowing an agent&apos;s risk right now, and how it has evolved,
                  gives providers the information to price, limit and extend
                  services based on verified behavior. The provider makes the
                  call.
                </p>
              </Prose>
              <CardGrid
                min={260}
                items={[
                  {
                    label: "Insurance",
                    title: "Underwrite and monitor AI risk from verified behavior.",
                    text: "What the agent can do, how it behaves, which controls are in place, and what happened when something went wrong. Supports dynamic underwriting, monitoring and claims evidence.",
                    link: { href: "/case-studies/insurenow", label: "InsureNow story" },
                  },
                  {
                    label: "Credit",
                    title: "Extend credit with controls built into the agent.",
                    text: "Who stands behind the agent, how it behaves with money, and how much authority and credit headroom it has. Providers set limits and can require human approval for higher-risk actions.",
                    link: {
                      href: "/case-studies/agentics-credit",
                      label: "Agentics Credit story",
                    },
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: "exposure",
          nav: "Exposure",
          title: "From one agent to your entire exposure.",
          body: (
            <Prose>
              <p>
                Move from understanding one agent to understanding risk across
                every agent, customer, counterparty and portfolio you&apos;re
                exposed to.
              </p>
            </Prose>
          ),
        },
        {
          id: "next",
          nav: "Next steps",
          title: "Use verified agent risk wherever decisions are made.",
          body: (
            <>
              <BridgeCard
                href="/case-studies"
                eyebrow="See it in practice"
                title="Customer stories"
                text="How insurers, lenders and platforms use Humanos today."
              />
              <FinalCta title="Get the risk answers you need." />
            </>
          ),
        },
      ]}
    />
  );
}
