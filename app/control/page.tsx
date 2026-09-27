import { StoryPage } from "@/components/story/StoryPage";
import { pageMetadata } from "@/components/story/metadata";
import {
  Accent,
  CardGrid,
  FactGrid,
  Prose,
  PullStatement,
  StepsCard,
} from "@/components/story/blocks";
import {
  BridgeCard,
  DecisionCard,
  FinalCta,
  GuardrailGrid,
  StoryCtas,
} from "@/components/story/product-blocks";
import { Breadcrumb } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  path: "/control",
  title: "Control What AI Agents Can Do · Humanos",
  description:
    "Deterministic limits, policies and real-time human approval around every important agent action. Humanos guardrails are free.",
});

export default function ControlRiskPage() {
  return (
    <StoryPage
      breadcrumb={<Breadcrumb items={[{ name: "Control Risk", path: "/control" }]} />}
      hero={{
        eyebrow: "Control risk",
        title: (
          <>
            Stop risky actions <Accent>before they happen.</Accent>
          </>
        ),
        intro:
          "Humanos turns your agent's risk profile into deterministic controls, so actions stay within defined limits and people step in when they need to.",
        actions: <StoryCtas />,
        details: [
          { label: "Every action", value: "Allowed, blocked or escalated" },
          { label: "Humans", value: "Approve in real time" },
          { label: "Price", value: "Guardrails are free" },
        ],
      }}
      tldr={{
        label: "In short",
        title: "An agent can be autonomous without being unrestricted.",
        body: (
          <Prose>
            <p>
              You define what the agent is allowed to do. Humanos checks every
              important action against those rules before it runs, and brings a
              person in only when more authority is needed.
            </p>
          </Prose>
        ),
      }}
      sections={[
        {
          id: "gap",
          nav: "Close the gap",
          title: "See the gap. Close the gap.",
          body: (
            <StepsCard
              caption="From measuring to controlling"
              steps={[
                { title: "Measure", text: "See where the agent is exposed." },
                { title: "Define", text: "Set limits, policies and approval requirements." },
                {
                  title: "Enforce",
                  text: "Every important action is allowed, blocked or escalated.",
                },
              ]}
            />
          ),
        },
        {
          id: "controls",
          nav: "Six controls",
          title: "Six controls between intent and action.",
          body: (
            <>
              <Prose>
                <p>
                  Each one closes a different gap. Together they decide what
                  happens between an agent wanting to act and the action
                  actually running.
                </p>
              </Prose>
              <GuardrailGrid
                items={[
                  {
                    eyebrow: "Identity",
                    title: "Know the agent",
                    text: "Every agent gets a cryptographically verified identity.",
                    visual: "identity",
                  },
                  {
                    eyebrow: "Human",
                    title: "Know who authorized it",
                    text: "Confirm who approved an action with an OTP, passkey or full KYC check.",
                    visual: "human",
                  },
                  {
                    eyebrow: "Policy",
                    title: "Define what it can do",
                    text: "Set the rules, limits and approval requirements.",
                    visual: "policy",
                  },
                  {
                    eyebrow: "Check",
                    title: "Check before it acts",
                    text: "Every important action is checked against its rules before it runs.",
                    visual: "check",
                  },
                  {
                    eyebrow: "Approval",
                    title: "Escalate when authority is missing",
                    text: "If the agent needs permission it doesn't have, Humanos asks the right person in real time.",
                    visual: "approval",
                  },
                  {
                    eyebrow: "Record",
                    title: "Keep every decision auditable",
                    text: "Every attempt is recorded: allowed actions run, blocked ones don't, the rest are escalated.",
                    visual: "record",
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: "decisions",
          nav: "Decisions",
          title: "Every important action ends in a decision.",
          body: (
            <>
              <DecisionCard
                caption="Example decision"
                rows={[
                  { label: "Agent", value: "Treasury-01" },
                  { label: "Action", value: "Pay supplier, $12,000" },
                  { label: "Result", value: "Blocked: above the $10,000 limit", tone: "blocked" },
                  {
                    label: "Next",
                    value: "Approval requested from the finance lead",
                    tone: "pending",
                  },
                ]}
              />
              <CardGrid
                min={190}
                items={[
                  {
                    label: "Allowed",
                    labelTone: "ok",
                    title: "Within policy",
                    text: "It runs, and the decision is recorded.",
                  },
                  {
                    label: "Blocked",
                    labelTone: "bad",
                    title: "Outside policy",
                    text: "It never runs, and the decision is recorded.",
                  },
                  {
                    label: "Escalated",
                    title: "More authority needed",
                    text: "A person approves in real time, then it can proceed.",
                    highlight: true,
                  },
                ]}
              />
              <PullStatement>
                If the rule says no, the agent can&apos;t turn it into a yes.
              </PullStatement>
              <Prose>
                <p>
                  Policies are deterministic, so even if an agent behaves
                  unexpectedly, it can&apos;t act outside the authority it has
                  been given.
                </p>
              </Prose>
            </>
          ),
        },
        {
          id: "existing",
          nav: "Existing tools",
          title: "Already have guardrails? Keep them.",
          body: (
            <Prose>
              <p>
                Humanos can take in events from the governance and guardrail
                tools you already use, and fill only the gaps.
              </p>
            </Prose>
          ),
        },
        {
          id: "pricing",
          nav: "Pricing",
          title: "Guardrails are free.",
          body: (
            <>
              <Prose>
                <p>
                  Limits, policies, checks, approvals and email OTPs cost
                  nothing. You only pay for the two things that carry a real
                  cost to deliver.
                </p>
              </Prose>
              <FactGrid
                items={[
                  { label: "Free", value: "Guardrails, policies, checks, approvals and email OTPs" },
                  { label: "Paid", value: "Full KYC checks (ID document + biometrics) and SMS OTPs" },
                ]}
              />
            </>
          ),
        },
        {
          id: "next",
          nav: "Next: Intelligence",
          title: "Turn lower risk into usable intelligence.",
          body: (
            <>
              <BridgeCard
                href="/intelligence"
                eyebrow="Next · Risk Intelligence"
                title="Put your agent's verified record to work"
                text="Every decision becomes evidence that insurers, lenders and partners can use in their own decisions."
              />
              <FinalCta title="Control what your agent can do." />
            </>
          ),
        },
      ]}
    />
  );
}
