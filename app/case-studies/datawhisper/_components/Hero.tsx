export function Hero() {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="wrap">
        <div className="hero__meta">
          <span className="hero__meta-mark">Case study</span>
          <span className="hero__meta-sep">·</span>
          <span>Humanos × DataWhisper</span>
          <span className="hero__meta-sep">·</span>
          <span>cs_datawhisper · v1 · 2026-05-29</span>
        </div>
        <h1>
          DataWhisper&rsquo;s AI agents act inside regulated workflows.
          <br />
          <em>
            Humanos verifies every high-risk action before execution.
          </em>
        </h1>
        <p className="hero__sub">
          DataWhisper Cortex orchestrates multi-agent AI for regulated
          industries. Humanos slots into the GUARDIANSHIELD GOVERNANCE
          layer as the dedicated authorization stack — a 3rd-party API
          that fully abstracts authorization, making every agent action
          auditable, immutable, and independently verifiable by any party
          with the right access.
        </p>

        <div className="hero__quickstats">
          <div className="hero__qs">
            <div className="hero__qs-k">Domain</div>
            <div className="hero__qs-v">
              Multi-agent AI for regulated industries
              <small>Workflow orchestration · Cortex</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Surface area</div>
            <div className="hero__qs-v">
              Disputes · Claims · Compliance · Audit
              <small>High-risk regulated actions</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Integration</div>
            <div className="hero__qs-v">
              humanos.verify()
              <small>Authorization stack inside GUARDIANSHIELD</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Site</div>
            <div className="hero__qs-v">
              <a
                href="https://www.datawhisper.co.uk"
                target="_blank"
                rel="noopener noreferrer"
              >
                datawhisper.co.uk&nbsp;↗
              </a>
              <small>Multi-Agent AI OS · UK</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
