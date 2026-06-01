export function Hero() {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="wrap">
        <div className="hero__meta">
          <span className="hero__meta-mark">Case study</span>
          <span className="hero__meta-sep">·</span>
          <span>Humanos × Paymove</span>
          <span className="hero__meta-sep">·</span>
          <span>cs_paymove · v1 · 2026-05-29</span>
        </div>
        <h1>
          Paymove settles agent payments on Visa&rsquo;s rail.
          <br />
          <em>
            Humanos proves a human authorized the spend before it moves.
          </em>
        </h1>
        <p className="hero__sub">
          Paymove is the settlement layer for agentic commerce on Visa&rsquo;s
          protocol. Humanos slots into the settlement path as the dedicated
          authorization stack — a 3rd-party API that verifies every high-value
          spend against a human-signed mandate before it settles, and emits a
          portable, on-chain-anchored receipt either party can check.
        </p>

        <div className="hero__quickstats">
          <div className="hero__qs">
            <div className="hero__qs-k">Domain</div>
            <div className="hero__qs-v">
              Settlement for agentic commerce
              <small>Visa rail · agent wallets</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Surface area</div>
            <div className="hero__qs-v">
              Autonomous spend · IBAN-scoped
              <small>High-value agent payments</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Integration</div>
            <div className="hero__qs-v">
              humanos.verify()
              <small>Inside Paymove&rsquo;s settlement path</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Site</div>
            <div className="hero__qs-v">
              <a
                href="https://www.paymove.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                paymove.io&nbsp;↗
              </a>
              <small>Agentic settlement · Europe</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
