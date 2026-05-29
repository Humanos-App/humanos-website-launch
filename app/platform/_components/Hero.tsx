import { Reveal, ArrowRight } from "./_primitives";
import { EXTERNAL_LINKS } from "@/lib/external-links";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container-wide">
        <Reveal className="hero-eyebrow" as="div">
          <span className="pulse"></span>
          <span>VIA Protocol · Runtime authorization</span>
        </Reveal>

        <Reveal>
          <h1 className="hero-title">
            Portable authorization infrastructure
            <br />
            <span style={{ color: "var(--fg-on-dark-3)" }}>
              for autonomous systems.
            </span>
          </h1>
        </Reveal>

        <Reveal>
          <p className="hero-sub">
            Humanos turns approvals, permissions, enterprise policies, and
            delegated authority into machine-verifiable runtime authorization
            systems can verify before execution.
          </p>
        </Reveal>

        <Reveal>
          <div className="hero-cta-row">
            <a className="btn btn-primary" href="#architecture">
              Explore architecture{" "}
              <span className="arrow">
                <ArrowRight />
              </span>
            </a>
            <a
              className="btn btn-secondary"
              href={EXTERNAL_LINKS.docs}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read API docs{" "}
              <span className="arrow">
                <ArrowRight />
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ marginTop: 96 }}>
            <HeroExplainer />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HeroExplainer() {
  const groups = [
    {
      key: "runtime",
      label: "The runtime",
      blurb:
        "The execution loop — what happens every time a system tries to act.",
      items: [
        {
          num: "02",
          id: "authorization",
          title: "Runtime authorization",
          body: "Approvals, permissions, and delegated authority become reusable runtime authorization.",
        },
        {
          num: "03",
          id: "cross-system",
          title: "Cross-system propagation",
          body: "Reusable across systems — identity-agnostic, any human or agent.",
        },
        {
          num: "04",
          id: "verification",
          title: "Runtime verification",
          body: "Scope, freshness, identity, revocation — checked before execution.",
        },
        {
          num: "05",
          id: "recovery",
          title: "Dynamic recovery",
          body: "Missing authorization is collected or escalated mid-flight.",
        },
        {
          num: "06",
          id: "receipts",
          title: "Execution receipts",
          body: "Each verified action emits an independently verifiable receipt.",
        },
      ],
    },
    {
      key: "fabric",
      label: "The trust fabric",
      blurb:
        "The substrate the runtime stands on — identity, policy, and enforcement.",
      items: [
        {
          num: "07",
          id: "policy",
          title: "Policy orchestration",
          body: "Authoring, versioning, and distribution of policy.",
        },
        {
          num: "08",
          id: "identity",
          title: "Identity layer",
          body: "DIDs, signers, and the chain of human authority.",
        },
        {
          num: "09",
          id: "enforcement",
          title: "Runtime enforcement",
          body: "Block, allow, or escalate at the moment of action.",
        },
      ],
    },
    {
      key: "production",
      label: "In production",
      blurb: "Where Humanos runs today — and what teams use it for.",
      items: [
        {
          num: "10",
          id: "integrations",
          title: "Integrations",
          body: "Native hooks into the systems that already act.",
        },
        {
          num: "11",
          id: "use-cases",
          title: "Real execution environments",
          body: "Treasury, healthcare, brokerage, agents in production.",
        },
      ],
    },
  ];

  return (
    <div className="hero-explainer">
      <div className="hero-explainer-def">
        <div className="hero-explainer-label">
          <span className="hero-explainer-tick"></span>
          <span>What it is</span>
        </div>
        <p className="hero-explainer-statement">
          Humanos is a <em>runtime authorization layer</em> that sits between
          any acting system — an AI agent, an ERP, a treasury, a trading desk
          — and the systems it tries to act on.
        </p>
        <p className="hero-explainer-body">
          Before an action executes, the system asks Humanos:
          <span className="hero-explainer-q">
            {" "}
            &ldquo;is this allowed, right now, by whom, under what mandate?&rdquo;
          </span>{" "}
          Humanos returns a portable, verifiable answer the rest of the stack
          can trust.
        </p>
      </div>

      <a href="#architecture" className="hero-explainer-map">
        <div className="hero-explainer-map-meta">
          <span className="hero-explainer-map-num">01</span>
          <span className="hero-explainer-map-kicker">Start here</span>
        </div>
        <div className="hero-explainer-map-title">
          Architecture — the full map
        </div>
        <div className="hero-explainer-map-body">
          See how the runtime, the trust fabric, and the production surface fit
          together.
        </div>
        <div className="hero-explainer-map-arrow">
          <ArrowRight />
        </div>
      </a>

      <div className="hero-explainer-pillars-head">
        <span className="hero-explainer-pillars-label">
          Then explore by layer
        </span>
        <span className="hero-explainer-pillars-rule" aria-hidden="true"></span>
      </div>

      <div className="hero-explainer-groups">
        {groups.map((g) => (
          <div key={g.key} className="hero-group">
            <div className="hero-group-head">
              <div className="hero-group-label">{g.label}</div>
              <div className="hero-group-blurb">{g.blurb}</div>
            </div>
            <ul className="hero-group-list">
              {g.items.map((it) => (
                <li key={it.num}>
                  <a href={`#${it.id}`} className="hero-group-item">
                    <span className="hero-group-item-num">{it.num}</span>
                    <span className="hero-group-item-text">
                      <span className="hero-group-item-title">{it.title}</span>
                      <span className="hero-group-item-body">{it.body}</span>
                    </span>
                    <span
                      className="hero-group-item-arrow"
                      aria-hidden="true"
                    >
                      <ArrowRight />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
