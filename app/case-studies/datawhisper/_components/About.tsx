export function About() {
  return (
    <section className="section" data-screen-label="02 About">
      <div className="wrap">
        <div className="eyebrow">§ 01 · About the customer</div>
        <div className="cust__grid">
          <div className="cust__copy">
            <h2>
              DataWhisper is the Multi-Agent AI Operating System for regulated
              industries.
            </h2>
            <p>
              Cortex orchestrates AI agents end-to-end inside enterprise
              workflows — case handling, dispute resolution, claims, KYC,
              attestations. Every layer of Cortex is purpose-built so agents
              can act safely on behalf of humans, not around them.
            </p>
            <p>
              Humanos plugs into the <b>GUARDIANSHIELD GOVERNANCE</b> layer as
              the dedicated authorization stack — a 3rd-party API that makes
              authorization a runtime primitive instead of internal
              application state. Every high-risk action is verified against a
              signed mandate before execution, and every executed action
              carries an immutable, portable proof.
            </p>
          </div>
          <div className="cust__card">
            <div className="cust__card-head">
              <div className="cust__card-name">DataWhisper</div>
              <div className="cust__card-status">Integrated</div>
            </div>
            <div className="cust__rows">
              <div className="cust__row">
                <div className="cust__row-k">Domain</div>
                <div className="cust__row-v">
                  Multi-agent AI for regulated industries
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Surface area</div>
                <div className="cust__row-v">
                  Disputes · Claims · Compliance · Audit
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Runtime</div>
                <div className="cust__row-v mono">cortex.agents.v3</div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Integration</div>
                <div className="cust__row-v mono">
                  humanos.verify() · inside GUARDIANSHIELD
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Site</div>
                <div className="cust__row-v">
                  <a
                    href="https://www.datawhisper.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    datawhisper.co.uk&nbsp;↗
                  </a>
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Anchored</div>
                <div className="cust__row-v mono">2026-05-29 · v1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
