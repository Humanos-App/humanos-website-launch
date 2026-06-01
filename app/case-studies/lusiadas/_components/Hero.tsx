export function Hero() {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="wrap">
        <div className="hero__meta">
          <span className="hero__meta-mark">Case study</span>
          <span className="hero__meta-sep">·</span>
          <span>Humanos × Lusíadas</span>
          <span className="hero__meta-sep">·</span>
          <span>cs_lusiadas · v1 · 2026-05-29</span>
        </div>
        <h1>
          Lusíadas runs human approvals through Humanos.
          <br />
          <em>
            One API for every consent, KYC, signature and prescription —
            across every system.
          </em>
        </h1>
        <p className="hero__sub">
          Lusíadas is a national private hospital network with a
          multi-vendor stack — Medify, Glintt, NewSoft, Pipedrive,
          internal systems and the patient mobile app. Humanos sits across
          all of it as a global, independent approval OS. One API any
          system can call when a human needs to consent, sign, prove
          identity, or authorize an action — collected once, verifiable
          everywhere.
        </p>

        <div className="hero__quickstats">
          <div className="hero__qs">
            <div className="hero__qs-k">Domain</div>
            <div className="hero__qs-v">
              National private hospital network
              <small>Healthcare · multi-vendor stack</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Surface area</div>
            <div className="hero__qs-v">
              Consents · KYCs · Signatures · Prescriptions
              <small>Across patients & clinicians</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Integration</div>
            <div className="hero__qs-v">
              humanos.requestApproval()
              <small>Global approval OS · single API</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Site</div>
            <div className="hero__qs-v">
              <a
                href="https://www.lusiadas.pt/en"
                target="_blank"
                rel="noopener noreferrer"
              >
                lusiadas.pt&nbsp;↗
              </a>
              <small>Private hospital network · PT</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
