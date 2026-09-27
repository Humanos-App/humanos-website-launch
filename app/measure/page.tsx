import { StoryPage } from "@/components/story/StoryPage";
import { pageMetadata } from "@/components/story/metadata";
import {
  Accent,
  CardGrid,
  FlowStack,
  KeyValueList,
  Prose,
  PullStatement,
  Statement,
} from "@/components/story/blocks";
import {
  BridgeCard,
  FinalCta,
  Findings,
  LiveRiskCard,
  StoryCtas,
} from "@/components/story/product-blocks";
import { Breadcrumb } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  path: "/measure",
  title: "Measure AI Agent Risk in Real Time · Humanos",
  description:
    "Give every AI agent a verified identity and a live 0–100 risk profile that updates with every action it takes.",
});

export default function MeasureRiskPage() {
  return (
    <StoryPage
      breadcrumb={<Breadcrumb items={[{ name: "Measure Risk", path: "/measure" }]} />}
      hero={{
        eyebrow: "Measure risk",
        title: (
          <>
            Know the risk behind every AI agent. <Accent>In real time.</Accent>
          </>
        ),
        intro:
          "Humanos gives every agent a verified identity, records what it does and maintains a live risk profile that updates with every action.",
        actions: <StoryCtas />,
        details: [
          { label: "Risk score", value: "0–100, higher is riskier" },
          { label: "Updates", value: "Every time the agent acts" },
          { label: "Price", value: "Free to start" },
        ],
      }}
      tldr={{
        label: "In short",
        title: "A live, verified risk profile for every agent.",
        body: (
          <Prose>
            <p>
              Who the agent is, what it can reach, how it behaves, and what
              that means right now, in one score that updates every time the
              agent acts.
            </p>
          </Prose>
        ),
      }}
      sections={[
        {
          id: "connect",
          nav: "Connect",
          title: "Connect once. Start measuring.",
          body: (
            <>
              <Prose>
                <p>
                  Send your agent&apos;s activity to Humanos through the API.
                  Your agent keeps working exactly as before.
                </p>
              </Prose>
              <CardGrid
                min={190}
                items={[
                  {
                    label: "API",
                    badge: { text: "Available now", tone: "live" },
                    text: "Connect any agent, in any language.",
                    highlight: true,
                  },
                  {
                    label: "MCP",
                    badge: { text: "Coming soon" },
                    text: "For assistants and agents that speak MCP.",
                  },
                  {
                    label: "Agent SDK",
                    badge: { text: "Coming soon" },
                    text: "A few lines around your agent's actions.",
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: "identity",
          nav: "Identity",
          title: "One identity. Everywhere your agent goes.",
          body: (
            <>
              <Prose>
                <p>
                  Every agent gets a persistent, verifiable identity, tied to
                  the organization responsible for it. Its record goes with it
                  across every company and system it deals with.
                </p>
              </Prose>
              <KeyValueList
                labelWidth={150}
                items={[
                  {
                    label: "The agent",
                    value: (
                      <>
                        <strong>KYA</strong>, Know Your Agent: a
                        cryptographically verified identity for the agent
                        itself.
                      </>
                    ),
                  },
                  {
                    label: "The person",
                    value: (
                      <>
                        <strong>KYC</strong>, Know Your Customer: who
                        authorized the agent to act.
                      </>
                    ),
                  },
                  {
                    label: "The organization",
                    value: (
                      <>
                        <strong>KYB</strong>, Know Your Business: the company
                        responsible for it, verified by its details, its domain
                        and its members.
                      </>
                    ),
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: "activity",
          nav: "Live activity",
          title: "Every action recorded as it happens.",
          body: (
            <>
              <Prose>
                <p>
                  Tool calls, payments, approvals, policy decisions and
                  outcomes are captured as they happen, signed and timestamped.
                </p>
              </Prose>
              <LiveRiskCard
                agent="TREASURY-01"
                org="Acme Corp"
                score={34}
                trend={[22, 26, 24, 38, 31, 52, 44, 61, 40, 34]}
                events={[
                  { time: "10:41:09", label: "Payment sent, $50,000", risk: 24 },
                  { time: "10:41:16", label: "New destination account", risk: 41, up: true },
                  { time: "10:41:23", label: "Human approval verified", risk: 34 },
                ]}
              />
            </>
          ),
        },
        {
          id: "signals",
          nav: "Activity to risk",
          title: "Turn agent activity into risk.",
          body: (
            <>
              <Prose>
                <p>
                  Every action becomes a verified risk signal, available through
                  the API and ready for your own systems to use.
                </p>
              </Prose>
              <PullStatement>
                Humanos doesn&apos;t just collect activity. It turns it into a
                risk state you can read.
              </PullStatement>
            </>
          ),
        },
        {
          id: "profile",
          nav: "Risk profile",
          title: "Identity, reach, behavior. One live score.",
          body: (
            <>
              <Prose>
                <p>
                  Every action updates the agent&apos;s profile across three
                  dimensions, rolled into one score.
                </p>
              </Prose>
              <FlowStack
                label="How the risk profile is built"
                steps={[
                  {
                    label: "Identity",
                    desc: "Who is the agent, who authorized it, which organization is responsible?",
                  },
                  { label: "Reach", desc: "What can it access, move or change?" },
                  { label: "Behavior", desc: "What does it actually do?" },
                  {
                    label: "Risk",
                    desc: "What does all of that mean right now?",
                    highlight: true,
                  },
                ]}
              />
              <Statement>
                0–100. Higher is riskier.{" "}
                <Accent>Updated every time the agent acts.</Accent>
              </Statement>
            </>
          ),
        },
        {
          id: "improve",
          nav: "Improve",
          title: "See exactly what would make your agent safer.",
          body: (
            <>
              <Prose>
                <p>
                  Humanos shows which permissions, missing guardrails and
                  behaviors raise the risk, and what would lower it.
                </p>
              </Prose>
              <Findings
                items={[
                  "No human approval above $10,000",
                  "Payment tool can move funds freely",
                  "Organization not verified",
                ]}
              />
            </>
          ),
        },
        {
          id: "next",
          nav: "Next: Control",
          title: "See what's increasing your risk. Then fix it.",
          body: (
            <>
              <BridgeCard
                href="/control"
                eyebrow="Next · Control Risk"
                title="Close the gaps with free guardrails"
                text="Turn what you've measured into limits, policies and human approval around every important action."
              />
              <FinalCta title="Give your agent a risk score." />
            </>
          ),
        },
      ]}
    />
  );
}
