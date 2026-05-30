export function Solution() {
  return (
    <section className="section section--dark" data-screen-label="04 Solution">
      <div className="wrap">
        <div className="solution__head">
          <div className="eyebrow eyebrow--chalk">§ 03 · Solution</div>
          <h2 className="h-section" style={{ color: "var(--hm-chalk-0)" }}>
            Verification captured in real time,
            <br />
            <em>at the moment of execution.</em>
          </h2>
          <p className="solution__intro">
            When the merchant accepts an agent transaction, Humanos verifies
            the mandate live — identity, scope, counterparty, amount, validity
            — and returns a deterministic decision before settlement.
          </p>
        </div>

        <div className="capture mobile-hide">
          <div className="capture__head">
            <div className="capture__head-l">
              verification.capture · at the merchant boundary
            </div>
            <div className="capture__head-r">2026-05-19 14:02:18.412 UTC</div>
          </div>
          <div className="capture__body">
            <div className="capture__col">
              <div className="cap-label">Merchant</div>
              <div className="cap-merchant">techsupply.eu</div>
              <div className="cap-did">DID:web:techsupply.eu</div>

              <div className="cap-label" style={{ marginTop: 28 }}>
                Transaction
              </div>
              <div className="cap-header-row">
                <div />
                <div className="cap-amount">€&nbsp;23,840.00</div>
              </div>
              <div className="cap-tx-row">
                <span>12 × MacBook Pro 14&quot;</span>
                <span>€ 21,588.00</span>
              </div>
              <div className="cap-tx-row">
                <span>12 × USB-C dock</span>
                <span>€ 1,548.00</span>
              </div>
              <div className="cap-tx-row">
                <span>Shipping &amp; VAT</span>
                <span>€ 704.00</span>
              </div>
              <div className="cap-tx-total">
                <span>Total</span>
                <span>€&nbsp;23,840.00</span>
              </div>

              <div className="cap-mandate-tag">
                x-humanos-mandate · 0xA13F…84e9
              </div>

              <div className="cap-initiated">
                <b>Initiated by</b> · Ralio procurement agent
                <br />
                on behalf of: <b>Finance Lead, ACME GmbH</b>
              </div>
            </div>

            <div className="capture__col">
              <div className="cap-verify-head">
                <div className="cap-verify-title">
                  humanos.verify() · live capture
                </div>
                <div className="cap-verify-tot">82 ms</div>
              </div>

              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>identity</b>
                  <i>principal verified</i>
                </div>
                <div className="cap-check__ms">12 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>scope</b>
                  <i>procurement · hardware</i>
                </div>
                <div className="cap-check__ms">21 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>counterparty</b>
                  <i>approved vendor list</i>
                </div>
                <div className="cap-check__ms">35 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>amount</b>
                  <i>within € 24,000.00 ceiling</i>
                </div>
                <div className="cap-check__ms">58 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>validity</b>
                  <i>mandate active until 2026-06-19</i>
                </div>
                <div className="cap-check__ms">71 ms</div>
              </div>

              <div className="cap-verdict">
                <div className="cap-verdict__l">Authorized · proof emitted</div>
                <div className="cap-verdict__r">
                  proof:0xA13F…84e9 · attached to settlement
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="outcomes__pair">
          <div className="outcomes__pair-card">
            <div className="outcomes__pair-head">✓ Authorized</div>
            <h3>Merchant proceeds.</h3>
            <p>
              Within mandate, within constraints, within validity. The merchant
              settles. A Proof is attached to the transaction — portable,
              verifiable by any party.
            </p>
          </div>
          <div className="outcomes__pair-card outcomes__pair-card--bad">
            <div className="outcomes__pair-head">✕ Not authorized</div>
            <h3>Recover — then continue.</h3>
            <p>
              Out of scope, expired, or revoked. Humanos requests step-up
              approval in real time (SMS, API), updates the mandate, and
              resumes once authorization is valid.
            </p>
          </div>
        </div>

        <div className="section__quote">
          The merchant verifies the mandate directly through Humanos — not the
          agent&rsquo;s runtime.
        </div>
      </div>
    </section>
  );
}
