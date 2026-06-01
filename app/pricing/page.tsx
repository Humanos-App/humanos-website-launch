import type { Metadata } from "next";
import { TalkWithUs } from "@/components/dialogs/TalkWithUs";
import { EXTERNAL_LINKS } from "@/lib/external-links";

export const metadata: Metadata = {
  title: "Pricing — pay for execution, not seats",
  description:
    "Start free with runtime authorization APIs and scale to enterprise execution. Humanos pricing scales with verified execution — not seats, users, agents, or stored data.",
  alternates: { canonical: "/pricing" },
};

const FREE_INCLUDES = [
  "Runtime verification API",
  "Mandate issuance",
  "Universal execution receipts",
  "Dynamic approval collection",
  "SDK + API access",
];

const PAYG_INCLUDES = [
  "Issue & reuse authorization across systems",
  "Real-time verification before execution",
  "On-demand approval collection",
  "Lifecycle management (expiry, revocation)",
  "Full decision history",
];

const ENTERPRISE_INCLUDES = [
  "SLA-backed runtime verification",
  "Cross-organization authorization",
  "Offline verification (verify without calling Humanos)",
  "Deterministic execution enforcement",
  "Independent execution receipts",
  "Cryptographic auditability",
  "Dedicated VPC / region deployment",
  "Policy lifecycle management",
  "Compliance & deployment support",
];

function Check() {
  return <span className="check">✔</span>;
}

export default function PricingPage() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="ph" data-screen-label="01 Hero">
        <div className="ph__grid-bg" aria-hidden="true" />
        <div className="ph__inner">
          <div className="ph__eyebrow">Pricing</div>
          <h1>
            Start free.
            <br />
            <em>Scale to enterprise execution.</em>
          </h1>
          <p className="ph__sub">
            Start with runtime authorization APIs, scale into production
            verification infrastructure, and deploy enterprise-grade
            authorization systems when execution becomes mission critical.
          </p>
          <p className="ph__support">
            Pricing scales with <b>execution</b> — not seats, users, agents, or
            stored data. Designed for low-latency runtime verification.
          </p>

          <div className="ph__progression">
            <span className="ph__progression-step">Prototype</span>
            <span className="ph__progression-arr">→</span>
            <span className="ph__progression-step">Production</span>
            <span className="ph__progression-arr">→</span>
            <span className="ph__progression-step ph__progression-step--end">
              Regulated execution
            </span>
          </div>
        </div>
      </section>

      {/* ===== Pricing grid ===== */}
      <section className="section" id="pricing">
        <div className="wrap">
          <div className="pricing__grid">
            {/* FREE */}
            <div className="price">
              <div className="price__title">Free</div>
              <div className="price__tag">
                Prototype runtime authorization. Start building autonomous
                execution flows.
              </div>

              <div className="price__price-row">
                <div className="price__amount">
                  <span className="price__amount-num">$0</span>
                  <span className="price__amount-unit">forever</span>
                </div>
                <div className="price__trust">
                  <div className="price__trust-line">
                    <Check />
                    No credit card required
                  </div>
                  <div className="price__trust-line">
                    <Check />
                    No setup. No contracts.
                  </div>
                </div>
              </div>

              <hr className="price__divider" />
              <div className="price__group-label">Free tier quota</div>

              <div className="quota">
                <div className="quota__head">
                  <div className="quota__head-l">
                    <span className="quota__cap">1,000</span>
                    <span className="quota__cap-unit">credits</span>
                  </div>
                  <div className="quota__head-r">any mix</div>
                </div>
                <div className="quota__bar" aria-hidden="true">
                  <span className="quota__bar-a" style={{ width: "65%" }} />
                  <span className="quota__bar-b" style={{ width: "35%" }} />
                </div>
                <div className="quota__legend">
                  <span className="quota__legend-item">
                    <span className="quota__legend-dot quota__legend-dot--a" />
                    Mandates issued
                  </span>
                  <span className="quota__legend-item">
                    <span className="quota__legend-dot quota__legend-dot--b" />
                    Runtime verifications
                  </span>
                </div>
              </div>

              <hr className="price__divider" />
              <div className="price__group-label">Includes</div>
              <ul className="price__list">
                {FREE_INCLUDES.map((item) => (
                  <li key={item}>
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="price__cta">
                <a
                  className="btn btn--secondary"
                  href={EXTERNAL_LINKS.app}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start building <span className="arrow">→</span>
                </a>
              </div>
            </div>

            {/* PAY-AS-YOU-GO (FEATURED) */}
            <div className="price price--featured">
              <div className="price__title">Pay-as-you-go</div>
              <div className="price__tag">
                Production runtime infrastructure. For systems executing real
                autonomous actions.
              </div>

              <div className="price__price-row">
                <div className="price__amount">
                  <span className="price__amount-num">$0.02</span>
                  <span className="price__amount-unit">
                    / runtime verification
                  </span>
                </div>
                <div className="price__amount-2">
                  <strong>$0.10</strong>
                  <span>/ authorization issued</span>
                </div>
                <div className="price__fineprint">
                  KYC: <span>$0.89</span>
                  <span className="dot">•</span>Payments: Stripe fee + $0.10
                </div>
              </div>

              <hr className="price__divider" />
              <div className="price__group-label">Economics</div>
              <div className="price__econ">
                <div className="price__econ-row">
                  <span className="price__econ-step">One Approval</span>
                  <span className="price__econ-step">
                    One Reusable authorization
                  </span>
                  <span className="price__econ-step price__econ-step--many">
                    Infinite runtime verifications
                  </span>
                </div>
              </div>

              <hr className="price__divider" />
              <div className="price__group-label">
                Includes everything in Free, plus
              </div>
              <ul className="price__list">
                {PAYG_INCLUDES.map((item) => (
                  <li key={item}>
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="price__cta">
                <a
                  className="btn btn--primary"
                  href={EXTERNAL_LINKS.app}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get API key <span className="arrow">→</span>
                </a>
              </div>
            </div>

            {/* ENTERPRISE */}
            <div className="price">
              <div className="price__title">Enterprise</div>
              <div className="price__tag">
                Regulated autonomous execution. For enterprise systems where
                unauthorized execution is unacceptable.
              </div>

              <div className="price__price-row">
                <div className="price__amount">
                  <span className="price__amount-num price__amount-num--small">
                    Custom
                  </span>
                </div>
                <div className="price__fineprint" style={{ marginTop: 8 }}>
                  Based on volume, latency & deployment.
                </div>
              </div>

              <hr className="price__divider" />
              <div className="price__group-label">
                Includes everything in Pay-as-you-go, plus
              </div>
              <ul className="price__list">
                {ENTERPRISE_INCLUDES.map((item) => (
                  <li key={item}>
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="price__cta">
                <TalkWithUs>
                  <button type="button" className="btn btn--secondary">
                    Book session with Humanos team{" "}
                    <span className="arrow">→</span>
                  </button>
                </TalkWithUs>
              </div>
            </div>
          </div>

          <p className="pricing__anchor">
            Pricing is tied to <strong>execution</strong> — not seats, not
            agents, not stored data.
          </p>
        </div>
      </section>
    </>
  );
}
