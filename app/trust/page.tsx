import type { Metadata } from "next";
import { TalkWithUs } from "@/components/dialogs/TalkWithUs";
import { EXTERNAL_LINKS } from "@/lib/external-links";
import { TrustAnimations } from "./_components/Animations";

export const metadata: Metadata = {
  title: "Trust · Humanos",
  description:
    "You don't have to trust Humanos. You can verify it. Runtime authorization, independently verifiable proof, open standards.",
};

export default function TrustPage() {
  return (
    <div className="trust-page">
      <TrustAnimations />

      {/* HERO */}
      <section className="hero" data-screen-label="01 Hero">
        <div className="hero__grid-bg" aria-hidden="true" />
        <div className="hero__glow" aria-hidden="true" />
        <div className="wrap">
          <div className="hero__inner">
            <div className="hero__left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true" />
                Why Humanos
              </span>
              <h1>You don&rsquo;t have to trust us. You can verify it.</h1>
              <p className="hero__sub">
                Humanos doesn&rsquo;t ask companies to take its word. Every
                action is checked against verifiable authorization before
                execution — and independently provable afterwards, by anyone.
              </p>
              <div className="hero__support">
                <span>Runtime authorization</span>
                <span>Independent verification</span>
                <span>Cryptographic proof</span>
              </div>
              <div className="hero__ctas">
                <TalkWithUs>
                  <button className="btn btn--primary" type="button">
                    Talk with us <span className="arrow">→</span>
                  </button>
                </TalkWithUs>
                <a
                  className="btn btn--secondary"
                  href={EXTERNAL_LINKS.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the docs <span className="arrow">→</span>
                </a>
              </div>
            </div>

            <div className="flowcard">
              <div className="flowcard__head">
                <span className="pip" />
                execution lifecycle
              </div>
              <div className="flow" id="heroFlow">
                <div className="node" data-i>
                  <span className="pip" />
                  Human
                </div>
                <div className="wire" data-i>
                  <span className="spark" />
                </div>
                <div className="node" data-i>
                  <span className="pip" />
                  Authorization
                </div>
                <div className="wire" data-i>
                  <span className="spark" />
                </div>
                <div className="node node--accent" data-i>
                  <span className="pip" />
                  Humanos
                </div>
                <div className="wire" data-i>
                  <span className="spark" />
                </div>
                <div className="node node--verify" data-i>
                  verify()
                </div>
                <div className="wire" data-i>
                  <span className="spark" />
                </div>
                <div className="node" data-i>
                  <span className="pip" />
                  Execution
                </div>
                <div className="wire" data-i>
                  <span className="spark" />
                </div>
                <div className="node node--ok" data-i>
                  <span className="pip" />
                  Proof
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY TRUST */}
      <section className="section" data-screen-label="02 Why trust">
        <div className="wrap">
          <div className="section__head">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Why companies trust Humanos
            </span>
            <h2 className="h-section">
              Trust earned by verification, not by promise.
            </h2>
            <p className="sub">
              Infrastructure shouldn&rsquo;t be believed — it should be
              checkable. Here is what a company can verify for itself before
              relying on Humanos.
            </p>
          </div>

          <div className="why-grid">
            {[
              {
                n: "01",
                t: "Verified before execution",
                d: "Authorization is checked before an action runs — not reconstructed from logs after something already happened.",
                href: "#before",
                more: "See enforcement",
              },
              {
                n: "02",
                t: "You verify — not just us",
                d: "Every decision is independently verifiable by any system, without calling back to Humanos to confirm it.",
                href: "#verify",
                more: "See verification",
              },
              {
                n: "03",
                t: "No black box",
                d: "VIA is an open protocol. The trust layer is inspectable and not owned or controlled by a single vendor.",
                href: "#via",
                more: "See VIA",
              },
              {
                n: "04",
                t: "Open standards, no lock-in",
                d: "Built on W3C Verifiable Credentials, SD-JWT, and OpenID — not proprietary identity infrastructure.",
                href: "#standards",
                more: "See standards",
              },
              {
                n: "05",
                t: "Portable proof",
                d: "Every execution leaves a cryptographic receipt your customers, auditors, partners, and regulators can verify.",
                href: "#proof",
                more: "See proof",
              },
              {
                n: "06",
                t: "Built for regulated systems",
                d: "Runtime authorization, identity attribution, and auditability that map to modern regulatory frameworks.",
                href: "#regulated",
                more: "See frameworks",
              },
            ].map((c) => (
              <a key={c.n} className="why-card" href={c.href}>
                <div className="why-card__n">{c.n}</div>
                <h3 className="why-card__t">{c.t}</h3>
                <p className="why-card__d">{c.d}</p>
                <span className="why-card__more">
                  {c.more} <span className="arrow">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE EXECUTION */}
      <section className="section" id="before" data-screen-label="03 Before execution">
        <div className="wrap">
          <div className="section__head section__head--center">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Enforcement
            </span>
            <h2 className="h-section">Trust is enforced before execution.</h2>
            <p className="sub" style={{ marginLeft: "auto", marginRight: "auto" }}>
              Most systems rely on permissions, assumptions, or logs generated
              after an action occurs. Humanos verifies whether an action is
              authorized{" "}
              <strong style={{ color: "var(--hm-ink-0)", fontWeight: 600 }}>
                before execution proceeds.
              </strong>
            </p>
          </div>

          <div className="tree" id="decisionTree">
            <div className="lnode">
              <span className="pip" />
              Action
            </div>
            <div className="tree__branchwire" />
            <div className="lnode lnode--accent">verify()</div>
            <div className="tree__fan" aria-hidden="true">
              <svg viewBox="0 0 760 36" preserveAspectRatio="none">
                <path d="M380 0 L150 36" stroke="var(--hm-line-strong)" fill="none" strokeWidth="1" />
                <path d="M380 0 L380 36" stroke="var(--hm-line-strong)" fill="none" strokeWidth="1" />
                <path d="M380 0 L610 36" stroke="var(--hm-line-strong)" fill="none" strokeWidth="1" />
              </svg>
            </div>
            <div className="tree__outcomes">
              <div className="outcome outcome--ok" data-outcome>
                <div className="outcome__tag">
                  <span className="pip" />
                  Authorized
                </div>
                <div className="outcome__desc">
                  Within approved scope. Execution proceeds.
                </div>
              </div>
              <div className="outcome outcome--recover" data-outcome>
                <div className="outcome__tag">
                  <span className="pip" />
                  Recover authorization
                </div>
                <div className="outcome__desc">
                  Missing authority is collected in real time, then resumes.
                </div>
              </div>
              <div className="outcome outcome--bad" data-outcome>
                <div className="outcome__tag">
                  <span className="pip" />
                  Rejected
                </div>
                <div className="outcome__desc">
                  Constraints violated. Execution blocked before runtime.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDEPENDENTLY VERIFIABLE */}
      <section
        className="section section--dark"
        id="verify"
        data-screen-label="04 Independently verifiable"
      >
        <div className="wrap">
          <div className="section__head section__head--center">
            <span className="eyebrow eyebrow--chalk">
              <span className="dot" aria-hidden="true" />
              Independent verification
            </span>
            <h2 className="h-section h-section--chalk">
              Every decision becomes independently verifiable.
            </h2>
            <p className="sub sub--chalk" style={{ marginLeft: "auto", marginRight: "auto" }}>
              Authorization exists independently from applications. Any system
              can verify who approved, what was approved, the constraints,
              expiration, and revocation status.
            </p>
          </div>

          <div className="hub" id="hub">
            <svg className="hub__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <g stroke="rgba(121,120,233,0.35)" strokeWidth="0.4" fill="none">
                <line x1="50" y1="50" x2="50" y2="8" />
                <line x1="50" y1="50" x2="82.8" y2="23.8" />
                <line x1="50" y1="50" x2="90.9" y2="59.3" />
                <line x1="50" y1="50" x2="68.2" y2="87.8" />
                <line x1="50" y1="50" x2="31.8" y2="87.8" />
                <line x1="50" y1="50" x2="9.1" y2="59.3" />
                <line x1="50" y1="50" x2="17.2" y2="23.8" />
              </g>
            </svg>
            <div className="hub__node hub__center">
              <div className="lab">verifies</div>
              <div className="name">Authorization</div>
            </div>
            {[
              { label: "AI Agent", left: "50%", top: "8%" },
              { label: "Bank", left: "82.8%", top: "23.8%" },
              { label: "Hospital", left: "90.9%", top: "59.3%" },
              { label: "ERP", left: "68.2%", top: "87.8%" },
              { label: "Auditor", left: "31.8%", top: "87.8%" },
              { label: "Partner API", left: "9.1%", top: "59.3%" },
              { label: "Regulator", left: "17.2%", top: "23.8%" },
            ].map((n) => (
              <div key={n.label} className="hub__node" style={{ left: n.left, top: n.top }}>
                <div className="spoke" data-spoke>
                  <span className="check" />
                  {n.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIA / OPEN INFRA */}
      <section
        className="section section--dark"
        id="via"
        data-screen-label="05 VIA"
        style={{ borderTop: "1px solid var(--hm-line-dark)" }}
      >
        <div className="wrap">
          <div className="section__head">
            <span className="eyebrow eyebrow--chalk">
              <span className="dot" aria-hidden="true" />
              Open infrastructure · VIA
            </span>
            <h2 className="h-section h-section--chalk">
              Authorization infrastructure, without black boxes.
            </h2>
            <p className="sub sub--chalk">
              VIA is the open protocol powering portable runtime authorization.
              It enables organizations, systems, and AI agents to issue,
              propagate, verify, and prove authorization across organizational
              boundaries.
            </p>
          </div>

          <div className="via">
            <div className="viaflow" id="viaFlow">
              <div className="node" data-i>
                <span className="pip" />
                Approval
              </div>
              <div className="wire" data-i>
                <span className="spark" />
              </div>
              <div className="node node--verify" data-i>
                VIA Protocol
              </div>
              <div className="wire" data-i>
                <span className="spark" />
              </div>
              <div className="node node--accent" data-i>
                <span className="pip" />
                Runtime authorization
              </div>
              <div className="wire" data-i>
                <span className="spark" />
              </div>
              <div className="viaflow__fan" data-i>
                {["AI Agent", "Bank", "Hospital", "ERP", "Auditor", "Partner"].map(
                  (l) => (
                    <div className="node" key={l}>
                      <span className="pip" />
                      {l}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="feat-grid">
              {[
                {
                  ic: "◇",
                  t: "Machine-verifiable",
                  d: "Any system can automatically verify authorization before acting.",
                },
                {
                  ic: "≡",
                  t: "Explicit conditions",
                  d: "Authorization contains scope, limits, delegation, expiration, and constraints.",
                },
                {
                  ic: "⊘",
                  t: "Independent verification",
                  d: "Verification does not depend on the issuing application.",
                },
                {
                  ic: "⌾",
                  t: "Open by design",
                  d: "Built on open standards and open-source infrastructure.",
                },
              ].map((f) => (
                <div className="feat" key={f.t}>
                  <div className="feat__ic">{f.ic}</div>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OPEN STANDARDS */}
      <section className="section" id="standards" data-screen-label="06 Open standards">
        <div className="wrap">
          <div className="section__head section__head--center">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Open standards
            </span>
            <h2 className="h-section">Built on open standards.</h2>
            <p className="sub" style={{ marginLeft: "auto", marginRight: "auto" }}>
              Humanos does not invent proprietary identity infrastructure. It
              builds on the standards the ecosystem already trusts.
            </p>
          </div>

          <div className="std-grid">
            {[
              { name: "W3C Verifiable Credentials", sub: "VC 2.0" },
              { name: "SD-JWT", sub: "selective disclosure" },
              { name: "OpenID ecosystem", sub: "OID4VC · OID4VP" },
              { name: "EU Digital Identity Wallet", sub: "EUDI compatible" },
              { name: "eIDAS 2.0", sub: "alignment" },
            ].map((s) => (
              <div className="std" key={s.name}>
                <div className="std__name">{s.name}</div>
                <div className="std__sub">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="std-note">
            Authorization should be portable, interoperable, and independently
            verifiable.
          </div>
        </div>
      </section>

      {/* REGULATED */}
      <section
        className="section section--dark reg"
        id="regulated"
        data-screen-label="07 Regulated"
      >
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--chalk">
            <span className="dot" aria-hidden="true" />
            Regulated autonomous systems
          </span>
          <h2
            className="h-section h-section--chalk"
            style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
          >
            Built for regulated autonomous systems.
          </h2>
          <p className="reg__lead">
            Humanos provides runtime authorization, identity attribution,
            auditability, and independently verifiable proof that help
            organizations implement controls required by modern regulatory
            frameworks.
          </p>

          <div className="reg__label">Built to support compliance with</div>
          <div className="reg__badges">
            {["ISO 27001", "DORA", "NIS2", "EU AI Act", "GDPR", "HIPAA", "eIDAS 2.0"].map(
              (b) => (
                <div className="reg__badge" key={b}>
                  {b}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* RECEIPT */}
      <section className="section" id="proof" data-screen-label="08 Proof">
        <div className="wrap">
          <div className="receipt-wrap">
            <div>
              <span className="eyebrow">
                <span className="dot" aria-hidden="true" />
                Proof
              </span>
              <h2 className="h-section">
                Every execution can be proven afterwards.
              </h2>
              <p className="sub">
                Portable proof that can be verified independently by customers,
                auditors, partners, or regulators — without contacting Humanos.
              </p>
            </div>

            <div className="receipt">
              <div className="receipt__bar">
                <span>execution receipt</span>
                <span className="stamp">
                  <span className="pip" />
                  verified
                </span>
              </div>
              <div className="receipt__rows">
                {[
                  ["Action", "payments.transfer · €4,800 → AWS"],
                  ["Authorized by", "did:web:acme.com#cfo"],
                  ["Constraints", "daily_limit ≤ 10,000 · vendor ∈ allowlist"],
                  ["Time", "2026-05-29T14:02:11Z"],
                ].map(([k, v]) => (
                  <div key={k} className="receipt__row">
                    <div className="receipt__k">{k}</div>
                    <div className="receipt__v">{v}</div>
                  </div>
                ))}
                <div className="receipt__row">
                  <div className="receipt__k">Verification</div>
                  <div className="receipt__v">
                    <span className="ok">● authorized</span>
                  </div>
                </div>
                <div className="receipt__row">
                  <div className="receipt__k">Proof ID</div>
                  <div className="receipt__v">
                    prf_2FA91 · independently verifiable
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIA OSS / GITHUB */}
      <section className="section section--clarity" data-screen-label="09 Open source">
        <div className="wrap">
          <div className="gh">
            <div>
              <span className="eyebrow">
                <span className="dot" aria-hidden="true" />
                VIA Protocol
              </span>
              <h2 className="h-section">Open source foundation.</h2>
              <p className="sub">
                The trust layer should belong to the ecosystem, not a single
                vendor.
              </p>
              <p className="sub" style={{ marginTop: 18, fontSize: 16 }}>
                VIA Protocol is the open-source protocol powering portable
                runtime authorization. Humanos provides the infrastructure that
                issues, propagates, verifies, recovers, and proves
                authorization throughout the execution lifecycle.
              </p>
            </div>

            <a
              className="gh-card"
              href={EXTERNAL_LINKS.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="gh-card__top">
                <div className="gh-card__mark">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="var(--hm-chalk-0)"
                    aria-hidden="true"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </div>
                <div>
                  <div className="gh-card__repo">via-protocol</div>
                  <div className="gh-card__org">github.com/humanos</div>
                </div>
              </div>
              <h3 className="gh-card__title">Explore VIA Protocol</h3>
              <p className="gh-card__desc">
                Open-source authorization infrastructure for autonomous systems.
              </p>
              <div className="gh-card__meta">
                <span>
                  <b>★</b> Stars
                </span>
                <span>
                  <b>MIT</b> license
                </span>
                <span>
                  <b>VC 2.0</b> · SD-JWT
                </span>
              </div>
              <div className="gh-card__btn">
                <span className="btn btn--invert">
                  View on GitHub <span className="arrow">→</span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final" data-screen-label="10 CTA">
        <div className="wrap wrap--narrow">
          <span className="eyebrow">
            <span className="dot" aria-hidden="true" />
            Trust layer
          </span>
          <h2>
            Ensure AI can act only when it{" "}
            <span className="accent">is allowed to.</span>
          </h2>
          <p className="final__sub">
            See how runtime authorization fits into your systems.
          </p>
          <div className="final__ctas">
            <TalkWithUs>
              <button className="btn btn--primary" type="button">
                Talk with us <span className="arrow">→</span>
              </button>
            </TalkWithUs>
            <a
              className="btn btn--secondary"
              href={EXTERNAL_LINKS.docs}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the documentation <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
