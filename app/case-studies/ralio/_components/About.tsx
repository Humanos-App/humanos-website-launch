export function About() {
  return (
    <section className="section" data-screen-label="02 About">
      <div className="wrap">
        <div className="eyebrow">§ 01 · About the customer</div>
        <div className="cust__grid">
          <div className="cust__copy">
            <h2>
              Ralio is an agent runtime for autonomous commerce, where agents
              transact across external marketplaces.
            </h2>
            <p>
              Procurement and payment agents source vendors, compare pricing,
              and execute purchases across external B2B marketplaces.
            </p>
            <p>
              Humanos sits at the merchant boundary and verifies every
              transaction before it executes — identity, scope, counterparty,
              amount, validity.
            </p>
          </div>
          <div className="cust__card">
            <div className="cust__card-head">
              <div className="cust__card-name">Ralio</div>
              <div className="cust__card-status">Integrated</div>
            </div>
            <div className="cust__rows">
              <div className="cust__row">
                <div className="cust__row-k">Domain</div>
                <div className="cust__row-v">
                  Autonomous procurement &amp; payments
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Surface area</div>
                <div className="cust__row-v">
                  Marketplaces · Merchants · Processors · Acquirers
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Runtime</div>
                <div className="cust__row-v mono">ralio.agents.v3</div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Integration</div>
                <div className="cust__row-v mono">
                  humanos.verify() · one call
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Site</div>
                <div className="cust__row-v">
                  <a
                    href="https://ralio.co"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ralio.co&nbsp;↗
                  </a>
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Anchored</div>
                <div className="cust__row-v mono">2026-05-19 · v1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
