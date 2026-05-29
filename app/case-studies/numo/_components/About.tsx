export function About() {
  return (
    <section className="section" data-screen-label="02 About">
      <div className="wrap">
        <div className="eyebrow">§ 01 · About the customer</div>
        <div className="cust__grid">
          <div className="cust__copy">
            <h2>
              Numo is a platform for automated capital allocation, where agents
              move capital across systems.
            </h2>
            <p>
              Strategies run autonomously. Capital is reallocated continuously
              across treasury, exchanges, custodians, and payment rails.
            </p>
            <p>
              Humanos sits between the agent&rsquo;s decision and the actual
              transaction, and checks every action before it goes through —
              identity, scope, amount, validity.
            </p>
          </div>
          <div className="cust__card">
            <div className="cust__card-head">
              <div className="cust__card-name">Numo</div>
              <div className="cust__card-status">Integrated</div>
            </div>
            <div className="cust__rows">
              <div className="cust__row">
                <div className="cust__row-k">Domain</div>
                <div className="cust__row-v">
                  Automated capital allocation
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Surface area</div>
                <div className="cust__row-v">
                  Treasury · Exchanges · Custodians · Rails
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Runtime</div>
                <div className="cust__row-v mono">numo.strategies.v2</div>
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
                  <a href="https://usenumo.com/">usenumo.com&nbsp;↗</a>
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Anchored</div>
                <div className="cust__row-v mono">2026-04-22 · v5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
