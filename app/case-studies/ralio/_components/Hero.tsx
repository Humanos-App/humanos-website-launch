export function Hero() {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="wrap">
        <div className="hero__meta">
          <span className="hero__meta-mark">Case study</span>
          <span className="hero__meta-sep">·</span>
          <span>Humanos × Ralio</span>
          <span className="hero__meta-sep">·</span>
          <span>ralio.agents.v3</span>
          <span className="hero__meta-sep">·</span>
          <span>v1 · anchored 2026-05-19</span>
        </div>
        <h1>
          Ralio&rsquo;s agents execute transactions on behalf of businesses.
          <br />
          <em>Humanos makes those transactions independently verifiable.</em>
        </h1>
        <p className="hero__sub">
          Ralio runs payment agents that execute transactions (spend, payroll,
          treasury) on behalf of business customers, under guardrails,
          identity, and audit on every move. Humanos sits at the merchant
          boundary and verifies every transaction before it executes.
        </p>

        <div className="hero__quickstats">
          <div className="hero__qs">
            <div className="hero__qs-k">Domain</div>
            <div className="hero__qs-v">
              Agentic B2B payments
              <small>Spend · payroll · treasury</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Surface area</div>
            <div className="hero__qs-v">
              Bank accounts · Cards · Stablecoins
              <small>Across rails</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Integration</div>
            <div className="hero__qs-v">
              humanos.verify()
              <small>One call · at the merchant boundary</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Site</div>
            <div className="hero__qs-v">
              <a
                href="https://ralio.co"
                target="_blank"
                rel="noopener noreferrer"
              >
                ralio.co&nbsp;↗
              </a>
              <small>Agent runtime · 2026</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
