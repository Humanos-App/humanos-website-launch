import { StoryPage } from "@/components/story/StoryPage";
import { storyMetadata } from "@/components/story/metadata";
import {
  Accent,
  Callout,
  CompareTable,
  FlowRow,
  FlowStack,
  FromTo,
  KeyValueList,
  LifecycleStrip,
  NumberedList,
  Prose,
  StatBox,
  Statement,
  SummaryBox,
} from "@/components/story/blocks";

export const metadata = storyMetadata({
  slug: "insurenow",
  title:
    "How InsureNow is building AI liability insurance with Humanos · Humanos customer story",
  description:
    "InsureNow is integrating Humanos operational risk signals into its proprietary underwriting framework for AI liability insurance, supporting underwriting, monitoring, renewal and claims assessment.",
});

export default function InsureNowCaseStudyPage() {
  return (
    <StoryPage
      slug="insurenow"
      name="Humanos × InsureNow"
      hero={{
        customer: "InsureNow",
        title: "How InsureNow is building AI liability insurance with Humanos",
        intro:
          "InsureNow is integrating Humanos risk intelligence into its proprietary underwriting framework to assess how AI agents operate before and throughout the policy lifecycle.",
        client: (
          <>
            Insure<span>Now</span>
          </>
        ),
        details: [
          { label: "Customer", value: "InsureNow" },
          { label: "Industry", value: "AI liability insurance · MGA" },
          {
            label: "Humanos supports",
            value: "Underwriting · Monitoring · Renewal · Claims evidence",
          },
        ],
        quote: {
          text: "“Execution receipts help address one of the hardest problems in underwriting AI liability: establishing what an agent was authorised to do and what triggered a loss. That is a key building block in making this class of risk insurable.”",
          name: "Mehdi Chaabi",
          role: "CEO, InsureNow",
        },
      }}
      tldr={{
        title: "How InsureNow is building its AI liability offering with Humanos",
        body: (
          <>
            <Prose>
              <p>
                InsureNow is integrating Humanos into its proprietary underwriting
                framework to add continuous operational risk signals about how
                insured AI agents actually operate.
              </p>
              <p>
                Customers connect their agents to Humanos during underwriting.
                From there, the same integration can support ongoing risk
                monitoring, prevention and renewal by keeping the agent&apos;s
                operational risk profile current.
              </p>
              <p>
                If an incident occurs, Humanos provides execution evidence that
                can support claims assessment by establishing what the agent was
                authorised to do and what actually happened.
              </p>
            </Prose>
            <FlowStack
              label="How the model works"
              steps={[
                { label: "Insured customer", desc: "Connects AI agent" },
                {
                  label: "Humanos",
                  desc: "Operational risk signals + execution evidence",
                  highlight: true,
                },
                {
                  label: "InsureNow",
                  desc: "Proprietary underwriting + ongoing risk assessment",
                },
              ]}
            />
            <Statement size="sm">
              One integration.{" "}
              <Accent>
                From underwriting to monitoring, renewal and claims evidence.
              </Accent>
            </Statement>
          </>
        ),
      }}
      sections={[
        {
          id: "challenge",
          nav: "The Challenge",
          title: "AI risk changes after the policy is written.",
          body: (
            <>
              <Prose>
                <p>
                  AI agents can change how they behave, what they can do and the
                  financial exposure they create over time.
                </p>
                <p>
                  For InsureNow, underwriting them therefore requires more than a
                  point-in-time questionnaire. It requires reliable answers to
                  practical underwriting questions.
                </p>
              </Prose>
              <Callout
                heading="Questions an underwriter needs answered"
                label="The questions InsureNow needed answered"
              >
                <NumberedList
                  items={[
                    "What can this agent do?",
                    "How much damage could it cause?",
                    "What safeguards are protecting it?",
                    "Is human approval required for sensitive actions?",
                    "Is its risk changing?",
                    "What actually happened if something goes wrong?",
                  ]}
                />
              </Callout>
              <Prose>
                <p>
                  InsureNow needed operational evidence it could rely on before
                  cover and throughout the life of the policy.
                </p>
              </Prose>
            </>
          ),
        },
        {
          id: "intelligence",
          nav: "From AI Activity to Risk Intelligence",
          title: "From AI activity to operational risk signals.",
          body: (
            <>
              <Prose>
                <p>
                  Humanos measures how AI agents operate and converts that
                  activity into structured operational risk signals. InsureNow
                  integrates those signals into its own proprietary risk scoring
                  and underwriting framework alongside its other underwriting
                  inputs.
                </p>
                <p>
                  As part of the underwriting process, the customer connects its
                  AI agent by installing the Humanos SDK in seconds. InsureNow
                  does not need to build a new integration for every customer.
                </p>
                <p>
                  The signals describe the factors that matter for an
                  underwriting assessment:
                </p>
              </Prose>
              <FlowRow
                label="How intelligence flows"
                steps={[
                  { label: "Customer", desc: "Connects AI agent" },
                  {
                    label: "Humanos",
                    desc: "Operational risk signals",
                    highlight: true,
                  },
                  {
                    label: "InsureNow",
                    desc: "Proprietary risk scoring + underwriting assessment",
                  },
                ]}
              />
              <KeyValueList
                items={[
                  {
                    label: "Exposure",
                    value:
                      "What the agent can do and the potential impact of its actions.",
                  },
                  {
                    label: "Safeguards",
                    value:
                      "The limits, approvals and protections reducing that exposure.",
                  },
                  {
                    label: "Behavior",
                    value:
                      "How the agent is actually operating and whether its behavior is changing.",
                  },
                  {
                    label: "Changes",
                    value: "Material changes that could increase or reduce the risk.",
                  },
                  {
                    label: "Evidence",
                    value:
                      "Execution receipts recording what the agent was authorised to do and what it did.",
                  },
                ]}
              />
              <Callout heading="Data handling" headingStyle="mono" variant="outline">
                <p>
                  Customer data remains confidential and is handled in accordance
                  with applicable data protection requirements, including GDPR.
                  InsureNow receives the operational risk signals needed for its
                  underwriting assessment rather than a stream of raw customer
                  data.
                </p>
              </Callout>
            </>
          ),
        },
        {
          id: "lifecycle",
          nav: "One Integration Across the Policy Lifecycle",
          title: "One integration. Risk intelligence across the policy lifecycle.",
          body: (
            <>
              <Prose>
                <p>
                  InsureNow is integrating with Humanos once so the same
                  operational risk infrastructure can support its AI liability
                  offering from underwriting through renewal and claims
                  assessment.
                </p>
                <p>
                  <strong>Underwrite.</strong> Humanos signals contribute to
                  InsureNow&apos;s proprietary risk assessment before cover.
                </p>
                <p>
                  <strong>Monitor.</strong> The agent&apos;s operational risk
                  profile remains current as its behavior, safeguards and
                  exposure evolve.
                </p>
                <p>
                  <strong>Renew.</strong> Updated risk information can inform
                  InsureNow&apos;s assessment at renewal.
                </p>
                <p>
                  <strong>Claims evidence.</strong> Execution receipts and
                  operational history can provide evidence to support claims
                  assessment.
                </p>
              </Prose>
              <LifecycleStrip
                label="Policy lifecycle"
                stages={["Underwrite", "Monitor", "Renew", "Claims evidence"]}
                caption="One Humanos integration · Across the policy lifecycle"
              />
              <Callout
                heading="One integration for InsureNow"
                headingStyle="accent"
                label="How the model scales"
              >
                <KeyValueList
                  variant="inset"
                  labelWidth={160}
                  items={[
                    {
                      label: "Each insured customer",
                      value: "Connects its AI agent through the Humanos SDK",
                    },
                    {
                      label: "Humanos",
                      value:
                        "Provides operational risk signals and execution evidence",
                    },
                    {
                      label: "InsureNow",
                      value:
                        "Applies its proprietary risk scoring and underwriting methodology",
                    },
                  ]}
                />
              </Callout>
            </>
          ),
        },
        {
          id: "reassessment",
          nav: "A Risk Profile Refreshed Every 24 Hours",
          title: "The insured's risk profile is refreshed every 24 hours.",
          body: (
            <>
              <Prose>
                <p>
                  AI risk is not static. An agent&apos;s behavior, capabilities,
                  safeguards and exposure can change after a policy is written.
                </p>
                <p>
                  Humanos refreshes the insured agent&apos;s operational risk
                  profile every 24 hours, with more frequent updates available
                  when required. InsureNow can integrate those updated signals
                  into its ongoing risk assessment.
                </p>
                <p>
                  The refreshed profile supports risk monitoring and prevention
                  during the policy period and provides current information for
                  renewal. It does not automatically change premium, limits or
                  deductibles during the policy term.
                </p>
              </Prose>
              <StatBox
                figure="24H"
                title="Continuous risk monitoring"
                text="Operational risk profile refreshed daily for monitoring, prevention and renewal."
              />
            </>
          ),
        },
        {
          id: "safeguards",
          nav: "Same AI, Different Safeguards, Different Risk",
          title: "Same AI. Different safeguards. Different risk.",
          body: (
            <>
              <Prose>
                <p>
                  Consider a claims settlement agent. An AI agent responsible for
                  settling claims can represent very different levels of risk
                  depending on how it is allowed to operate.
                </p>
                <p>
                  An agent able to make higher-value financial decisions
                  independently creates greater potential exposure. The same
                  agent operating with financial limits and human approval for
                  sensitive decisions creates a different risk profile.
                </p>
                <p>
                  Humanos makes that difference measurable. InsureNow can
                  incorporate those operational risk signals into its
                  proprietary risk assessment.
                </p>
              </Prose>
              <CompareTable
                caption="Example: the same claims settlement agent"
                columns={["Greater freedom", "Stronger safeguards"]}
                highlight={1}
                rows={[
                  [
                    "Makes higher-value financial decisions independently",
                    "Financial limits in place",
                  ],
                  ["Less human intervention", "Human approval for sensitive decisions"],
                  [
                    { content: "Greater potential exposure", tone: "negative" },
                    { content: "Reduced potential exposure", tone: "positive" },
                  ],
                ]}
              />
              <Statement>
                Same AI. Different safeguards. <Accent>Different risk.</Accent>
              </Statement>
            </>
          ),
        },
        {
          id: "claims",
          nav: "Supporting Claims Assessment",
          title: "When something goes wrong, the evidence is already there.",
          body: (
            <>
              <Prose>
                <p>
                  When an incident occurs, Humanos can provide evidence to
                  support claims assessment: what the agent was authorised to
                  do, which safeguards were in place, what action occurred and
                  the sequence of events surrounding the loss.
                </p>
                <p>
                  Humanos creates an execution receipt when an agent acts: a
                  signed record of what the agent was authorised to do and what
                  it actually did. These receipts create evidence that can help
                  establish the sequence and triggering event behind a loss.
                </p>
                <p>
                  This evidence can support InsureNow&apos;s assessment of what
                  happened. Claims handling itself follows the arrangements
                  agreed between InsureNow and its insurance partners.
                </p>
              </Prose>
              <FromTo
                from="From reconstructing incidents after the fact"
                to="to having the evidence already there."
              />
            </>
          ),
        },
        {
          id: "insurable",
          nav: "Building Better Infrastructure for AI Liability Insurance",
          title: "Continuous evidence for a changing class of risk.",
          body: (
            <>
              <Prose>
                <p>
                  InsureNow is building its AI liability offering around a
                  proprietary underwriting methodology. Humanos adds a
                  continuous operational view of how the AI agents being
                  assessed actually operate.
                </p>
                <p>
                  Through one integration, Humanos can provide operational risk
                  signals during underwriting, keep the insured&apos;s risk
                  profile current for monitoring and renewal, and provide
                  execution evidence when an incident occurs.
                </p>
                <p>
                  That gives InsureNow another source of evidence for assessing
                  the AI risks it underwrites on behalf of its insurance
                  partners.
                </p>
              </Prose>
              <SummaryBox>
                <FlowStack
                  label="The InsureNow model"
                  steps={[
                    { label: "Customer", desc: "Connects AI agent" },
                    {
                      label: "Humanos",
                      desc: "Operational risk signals + execution evidence",
                      highlight: true,
                    },
                    { label: "InsureNow", desc: "Proprietary underwriting assessment" },
                  ]}
                />
                <Statement size="lg">
                  Underwrite.
                  <br />
                  Monitor.
                  <br />
                  Renew.
                  <br />
                  Support claims assessment.
                </Statement>
              </SummaryBox>
            </>
          ),
        },
      ]}
    />
  );
}
