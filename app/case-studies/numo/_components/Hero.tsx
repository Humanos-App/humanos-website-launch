export function Hero() {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="wrap">
        <div className="hero__meta">
          <span className="hero__meta-mark">Case study</span>
          <span className="hero__meta-sep">·</span>
          <span>Humanos × Numo</span>
          <span className="hero__meta-sep">·</span>
          <span>cs_numo · v5 · 2026-04-22</span>
        </div>
        <h1>
          Numo&rsquo;s agents move capital across treasury, exchanges,
          custodians, and rails.
          <br />
          <em>Humanos verifies every action before execution.</em>
        </h1>
        <p className="hero__sub">
          Numo runs autonomous strategies that reallocate capital continuously
          across operating accounts, exchanges, custodians, and payment rails.
          Humanos sits between the agent&rsquo;s decision and the actual
          transaction — identity, scope, amount, validity — deterministic yes
          or no, before any capital moves.
        </p>

        <div className="hero__quickstats">
          <div className="hero__qs">
            <div className="hero__qs-k">Domain</div>
            <div className="hero__qs-v">
              Automated capital allocation
              <small>Agentic finance</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Surface area</div>
            <div className="hero__qs-v">
              Treasury · Exchanges · Custodians · Rails
              <small>Internal &amp; external systems</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Integration</div>
            <div className="hero__qs-v">
              humanos.verify()
              <small>One call · before any movement</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Site</div>
            <div className="hero__qs-v">
              <a href="https://usenumo.com/">usenumo.com&nbsp;↗</a>
              <small>Capital allocation platform</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
