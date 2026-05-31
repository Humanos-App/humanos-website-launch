export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Does Humanos replace our IAM or policy engine?",
    a: "No. Existing systems continue deciding who can act internally. Humanos standardizes authorization into portable runtime infrastructure external systems and autonomous workflows can verify before execution.",
  },
  {
    q: "Do we need to replace our existing authorization system?",
    a: "No. Humanos works alongside existing IAM, RBAC, OAuth, approval workflows, ERP permissions and policy systems. Existing authorization becomes portable and externally verifiable across systems before execution.",
  },
  {
    q: "Why not keep authorization entirely inside our application?",
    a: "Internal authorization works inside the application that created it. Autonomous systems increasingly operate across APIs, workflows, organizations and counterparties. Humanos makes authorization portable and independently verifiable outside the originating system.",
  },
  {
    q: "Can external systems verify authorization without trusting our application?",
    a: "Yes. Humanos turns approvals and policies into machine-verifiable mandates external systems can verify independently before execution.",
  },
  {
    q: "Why not build authorization infrastructure in-house?",
    a: "Humanos replaces fragmented approval collection, runtime verification, escalation flows, audit systems, and compliance logic with one runtime API. Instead of building separate approval workflows, policy engines, audit logs, and verification layers internally, systems call Humanos before execution.",
  },
  {
    q: "How is this different from human-in-the-loop?",
    a: "Humanos verifies whether the exact action being executed falls within the scope, limits, counterparties, expiration rules, and conditions previously authorized. This transforms approvals and policies from static documentation into machine-verifiable runtime authorization.",
  },
  {
    q: "How does this reduce hallucinations and unauthorized actions?",
    a: "AI systems no longer rely solely on prompts, assumptions, or loosely enforced business logic. Before execution, Humanos checks whether the requested action is actually authorized, preventing systems from operating outside approved boundaries.",
  },
  {
    q: "What happens when authorization rules change?",
    a: "Authorization becomes externalized runtime infrastructure instead of hardcoded application logic. Limits, permissions, counterparties, expiration dates, delegation rights, and policies can be updated, revoked, or replaced without redesigning workflows or redeploying systems.",
  },
  {
    q: "Can the same authorization work across multiple systems?",
    a: "Approvals collected once can be verified across ERPs, payment systems, AI agents, CRMs, treasury systems, partner organizations, and workflows. Authorization becomes portable infrastructure instead of being trapped inside individual applications.",
  },
  {
    q: "What happens when an action falls outside approved scope?",
    a: "Humanos pauses execution, requests approval dynamically through any channel, updates authorization in real time, and resumes execution automatically once approval is granted.",
  },
  {
    q: "How can every execution be verified afterwards?",
    a: "Every authorized action produces a signed, portable execution receipt containing who authorized the action, under which constraints, the exact payload executed, timestamps, and verification data. These receipts can be independently verified outside Humanos.",
  },
  {
    q: "Can auditors verify without our internal logs?",
    a: "Auditors, regulators, banks, insurers, counterparties, courts, and external systems can verify what was approved and executed without relying on internal logs or trusting a single organization's infrastructure.",
  },
  {
    q: "How does this affect regulated deployments?",
    a: "Organizations can deploy autonomous systems into finance, healthcare, insurance, ERP operations, and regulated workflows without rebuilding governance, approval, and audit infrastructure internally from scratch.",
  },
  {
    q: "Can multiple organizations share authorization?",
    a: "Different organizations and systems can verify the same authorization object independently, enabling interoperable trust between enterprises, AI agents, partners, platforms, and external systems.",
  },
  {
    q: "Why not embed this directly in our application code?",
    a: "Approval enforcement moves out of scattered workflow code and into a shared runtime verification layer. Systems no longer need to embed custom authorization logic into every workflow, service, or AI agent individually.",
  },
];

export function Faq() {
  return (
    <section className="why" data-screen-label="04 Why Humanos">
      <div className="why__wrap">
        <div className="why__head">
          <div className="why__eyebrow">FAQ</div>
          <h2 className="why__title">
            Authorization, as infrastructure you call — not a feature you build.
          </h2>
        </div>
        <ul className="why__list">
          {FAQ_ITEMS.map((item) => (
            <li key={item.q}>
              <details className="why__item">
                <summary className="why__q">
                  <span className="why__q-text">{item.q}</span>
                  <span className="why__q-icon" aria-hidden="true" />
                </summary>
                <p className="why__a">{item.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
