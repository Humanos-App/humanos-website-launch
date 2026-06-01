export function About() {
  return (
    <section className="section" data-screen-label="02 About">
      <div className="wrap">
        <div className="eyebrow">§ 01 · About the customer</div>
        <div className="cust__grid">
          <div className="cust__copy">
            <h2>
              Paymove is the settlement layer for agentic commerce on the Visa
              rail.
            </h2>
            <p>
              Visa&rsquo;s agentic commerce protocol gives autonomous agents a
              real rail to transact on. Paymove settles agent-initiated
              transactions on that rail — provisioning wallets, holding
              balances, and moving money the moment an agent acts.
            </p>
            <p>
              Humanos plugs into <b>Paymove&rsquo;s settlement path</b> as the
              dedicated authorization stack — a 3rd-party API that makes
              authorization a runtime primitive instead of internal wallet
              logic. Every high-value spend is verified against a human-signed
              mandate before it settles, and every settled payment carries an
              immutable, portable, on-chain-anchored receipt.
            </p>
          </div>
          <div className="cust__card">
            <div className="cust__card-head">
              <div className="cust__card-name">Paymove</div>
              <div className="cust__card-status">Integrated</div>
            </div>
            <div className="cust__rows">
              <div className="cust__row">
                <div className="cust__row-k">Domain</div>
                <div className="cust__row-v">
                  Settlement for agentic commerce
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Surface area</div>
                <div className="cust__row-v">
                  Autonomous wallet spend · Visa rail
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Runtime</div>
                <div className="cust__row-v mono">paymove.settle.v1</div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Integration</div>
                <div className="cust__row-v mono">
                  humanos.verify() · in the settlement path
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Site</div>
                <div className="cust__row-v">
                  <a
                    href="https://www.paymove.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    paymove.io&nbsp;↗
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
