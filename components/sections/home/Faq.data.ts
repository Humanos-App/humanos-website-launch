/**
 * Pure data for the homepage FAQ. Kept in a non-"use client" module so the
 * server component in app/page.tsx can iterate over FAQ_ITEMS to emit
 * FAQPage JSON-LD. The interactive Faq component imports the same data.
 *
 * Source of truth: the FAQ block in public/llms.txt — keep these in sync.
 */

export type FaqCategory = "basics" | "differs" | "integration" | "audit";

export type FaqItem = {
  q: string;
  a: string;
  cat: FaqCategory;
};

export type FaqFilter = { key: "all" | FaqCategory; label: string };

export const FAQ_FILTERS: FaqFilter[] = [
  { key: "all", label: "All" },
  { key: "basics", label: "Product basics" },
  { key: "differs", label: "How Humanos differs" },
  { key: "integration", label: "Integration & SDKs" },
  { key: "audit", label: "Compliance & audit" },
];

export const FAQ_ITEMS: FaqItem[] = [
  // — Product basics —
  {
    cat: "basics",
    q: "What is Humanos?",
    a: "Humanos is independent authorization infrastructure for machine-executed financial actions. It turns human approvals into machine-verifiable mandates and lets any system confirm, before execution, that an AI agent's action was authorized by a human.",
  },
  {
    cat: "basics",
    q: "What problem does Humanos solve?",
    a: "In agentic systems the human is not present when money moves or records change, so there is no reliable way to prove an action was within what a human authorized. Authorization is scattered across emails, chats, PDFs, and internal tools, and AI executes anyway. Humanos provides a deterministic, machine-verifiable authorization check at execution time, plus portable proof afterwards.",
  },
  {
    cat: "basics",
    q: "What's a mandate?",
    a: "A mandate is a structured, machine-readable authorization record that a human signs. It is bound to that human's identity and defines the scope of what is allowed — which actions, which counterparties, which limits, and for how long it stays valid. Systems verify proposed actions against the mandate before executing. It is the source of truth for what the human approved.",
  },
  {
    cat: "basics",
    q: "What's a portable runtime authorization?",
    a: "\"Runtime\" means the authorization is checked at the exact moment of execution, not assumed from an approval that happened earlier somewhere else. \"Portable\" means that same authorization is not locked inside the system that issued it — it travels across APIs, agents, wallets, rails, banks, and external counterparties, and any of them can independently verify it. Together: authorization that any participant can check in real time, at the point of action, without trusting the system that created it.",
  },
  {
    cat: "basics",
    q: "Can one authorization be used across multiple systems?",
    a: "Yes. A Humanos mandate is portable. The same human approval and rules travel across APIs, agents, workflows, rails, and external platforms, and each participant can verify in real time before execution.",
  },
  {
    cat: "basics",
    q: "What does \"independently verifiable proof of authorization at the point of execution\" mean?",
    a: "\"Proof of authorization\" is cryptographic evidence of who approved an action, what they approved, under which constraints, and for how long. \"At the point of execution\" means it is checked at the exact moment the action runs, not inferred from an earlier step. \"Independently verifiable\" means any party — a merchant, bank, auditor, or counterparty — can confirm it directly, without trusting the system that issued it or the agent that acted. It is the difference between assuming an action was allowed and being able to prove it.",
  },
  {
    cat: "basics",
    q: "Who should use Humanos?",
    a: "Systems where agents or automated logic initiate high-stakes financial actions with no human at the keyboard and where execution must be verifiable across multiple systems — treasury operating systems, crypto and wallet infrastructure, agentic commerce rails, AI fintechs, hedge funds and asset managers, and agentic ERP and back-office automation.",
  },

  // — How Humanos differs —
  {
    cat: "differs",
    q: "How is Humanos different from Auth0, Okta, IAM, or RBAC?",
    a: "Those systems control access — whether an identity can reach a resource. Humanos verifies authority over a specific financial action — whether the action falls within what a human approved. It operates at a different layer and is consumed by execution systems, not login flows. They can coexist: identity confirms who the agent is; Humanos confirms the action was authorized.",
  },
  {
    cat: "differs",
    q: "How is Humanos different from an internal policy engine, and why integrate Humanos instead of building my own?",
    a: "How it differs: an internal policy engine enforces rules inside its own system and stores the audit trail in its own logs, which counterparties and auditors have to trust. Humanos produces a portable mandate and receipt that any external party can verify independently, without trusting the originating vendor. Why integrate instead of building your own: a homegrown engine can enforce your rules inside your system, but it cannot produce proof a counterparty, auditor, or regulator will trust without trusting you — which does not survive enterprise diligence or SOC 2 review. Humanos issues signed mandates and per-action receipts verifiable independently of you, works across systems rather than only inside yours, and removes the ongoing engineering burden of maintaining authorization logic as you add execution venues. You build differentiating product; authorization becomes verifiable infrastructure you call.",
  },
  {
    cat: "differs",
    q: "Does Humanos replace existing payment rails, MB WAY, 3DS, or Visa?",
    a: "No. Humanos complements them. It adds the missing layer that proves an agent was authorized to act, on top of rails that confirm a user approved a request or that settle the payment.",
  },
  {
    cat: "differs",
    q: "What's the difference between Humanos and Mastercard Verifiable Intent?",
    a: "Mastercard Verifiable Intent, launched with Google in March 2026, is a card-network standard that records a tamper-resistant proof of user intent for agent-initiated transactions and is being built into Mastercard Agent Pay; scope enforcement happens at the Mastercard network layer. It is a strong solution for card-based agentic commerce inside the Mastercard ecosystem. Humanos is broader and independent in two ways. First, scope: Humanos verifies any machine-executed financial action — wallet and stablecoin signing, treasury bank-API calls, ERP and accounts-payable actions, multi-rail commerce — not only card purchases. Second, independence and portability: Humanos is not a payment network with a stake in the transaction; its mandates and receipts are verifiable across any rail and any counterparty without trusting a single network operator. In card-commerce flows the two are complementary — a scheme or issuer is one of the points where humanos.verify() can be called — but where Verifiable Intent is one network's standard for card transactions, Humanos is the cross-rail, cross-system authorization layer for all autonomous financial execution.",
  },

  // — Integration and SDKs —
  {
    cat: "integration",
    q: "How do I integrate Humanos, and is there an SDK?",
    a: "Humanos is an API with SDKs for TypeScript/JavaScript (npm install humanos), Python (pip install humanos), and C#/.NET (dotnet add package Humanos). Create an account and get an API key in the app at app.humanos.tech, then place a single humanos.verify(action) call before any high-stakes action. Start with the quickstart at docs.humanos.tech/essentials/quick-start; full reference is at docs.humanos.tech.",
  },
  {
    cat: "integration",
    q: "How does an AI agent prove it was authorized to move money?",
    a: "The agent calls humanos.verify() before execution. Humanos checks the action against a human-signed mandate (scope, limits, freshness, identity, revocation) and returns a deterministic yes or no. If authorized, the action proceeds and a portable receipt is issued; if not, the action is blocked.",
  },
  {
    cat: "integration",
    q: "How do I verify an AI agent is acting within its mandate?",
    a: "Your system calls humanos.verify(action) before the action touches a system of record. Humanos runs deterministic checks against the agent's mandate — scope, limits, freshness, identity, and revocation — and returns authorized or not authorized. If the checks fail, the action is never executed. If they pass, the action proceeds and a verifiable receipt is issued.",
  },
  {
    cat: "integration",
    q: "How does the agent resume execution after human approval?",
    a: "When an action falls outside the existing mandate, Humanos does not silently fail it. It pauses the action, requests the missing approval or updated limits from the human in real time, and once that authorization is signed and verified, the action resumes automatically. This is dynamic recovery: the agent is never stuck and never executes beyond what was approved.",
  },
  {
    cat: "integration",
    q: "What happens if an action exceeds what was approved?",
    a: "Humanos pauses the action, collects the missing approval or new limits in real time, and resumes only once authorization is verified.",
  },
  {
    cat: "integration",
    q: "What's the problem Humanos solves exactly, and how?",
    a: "The problem: an AI agent can execute a financial action — move funds, sign a transaction, update a critical record — but no one can prove, at the moment it happens, that the action was within what a human actually authorized. The approval lives somewhere upstream in an email, chat, PDF, or internal tool, and the executing system just assumes it exists. How Humanos solves it: a human signs a structured mandate up front that defines exactly what is allowed (scope, counterparties, limits, validity window). Before the action runs, the executing system calls humanos.verify(), Humanos checks the action against that mandate and returns a deterministic yes or no, and every outcome emits a portable receipt that proves authorization after the fact.",
  },

  // — Compliance and audit —
  {
    cat: "audit",
    q: "Can we prove to auditors and regulators why each agent transaction was allowed with Humanos?",
    a: "Yes. Humanos is built to operate within existing regulatory frameworks. Every executed action carries a receipt linked to the signed mandate it was checked against. Months later, an auditor can retrieve the signed mandate, confirm the action fell within its scope and limits, see that it was valid at execution time, and verify all of this independently — without access to your internal systems or the vendor's logs. Each transaction becomes individually defensible with a cryptographic, auditor-readable record rather than a black box.",
  },
  {
    cat: "audit",
    q: "How does an AI agent prove to the merchant that a real person authorized the action?",
    a: "When the action executes, Humanos emits an independently verifiable receipt that is anchored and signed. The merchant — or any PSP, scheme, bank, or counterparty — can check that receipt directly and confirm that a specific human signed a mandate covering this action, within these limits, valid at this time. The merchant does not have to trust the agent, the agent's platform, or any single vendor's database; the proof stands on its own.",
  },
];
