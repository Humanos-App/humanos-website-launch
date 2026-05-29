export function Solution() {
  return (
    <section className="section section--dark" data-screen-label="04 Solution">
      <div className="wrap">
        <div className="solution__head">
          <div className="eyebrow eyebrow--chalk">§ 03 · Solution</div>
          <h2 className="h-section" style={{ color: "var(--hm-chalk-0)" }}>
            One verify() call,
            <br />
            <em>in the settlement path.</em>
          </h2>
          <p className="solution__intro">
            Before any spend that crosses a defined limit settles on the Visa
            rail, Paymove&rsquo;s wallet calls humanos.verify(). Signature,
            counterparty (IBAN), amount, validity, and network membership are
            checked in real time against a human-signed mandate, and a
            deterministic answer is returned that Paymove attaches to a
            portable, on-chain-anchored receipt.
          </p>
        </div>

        <div className="capture">
          <div className="capture__head">
            <div className="capture__head-l">
              verification.capture · before payment settles
            </div>
            <div className="capture__head-r">2026-05-29 11:14:07.802 UTC</div>
          </div>
          <div className="capture__body">
            <div className="capture__col">
              <div className="cap-label">Payment</div>
              <div className="cap-merchant">tx_PM-018472</div>
              <div className="cap-did">payment.send · paymove.agent.wallet</div>

              <div className="cap-label" style={{ marginTop: 28 }}>
                Spend
              </div>
              <div className="cap-header-row">
                <div />
                <div className="cap-amount">€&nbsp;5,000.00</div>
              </div>
              <div className="cap-tx-row">
                <span>To · DE89…3000</span>
                <span>€ 5,000.00</span>
              </div>
              <div className="cap-tx-row">
                <span>Rail fee</span>
                <span>€ 0.40</span>
              </div>
              <div className="cap-tx-total">
                <span>Total</span>
                <span>€&nbsp;5,000.40</span>
              </div>

              <div className="cap-mandate-tag">
                x-humanos-mandate · 0xC44E…F912
              </div>

              <div className="cap-initiated">
                <b>Initiated by</b> · Paymove agent wallet
                <br />
                on behalf of: <b>Account Owner, Paymove</b>
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
                  <b>signature</b>
                  <i>mandate signed by owner</i>
                </div>
                <div className="cap-check__ms">12 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>counterparty</b>
                  <i>IBAN on allowed list</i>
                </div>
                <div className="cap-check__ms">22 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>amount</b>
                  <i>within € 10,000.00 limit</i>
                </div>
                <div className="cap-check__ms">36 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>validity</b>
                  <i>mandate active until 2026-06-29</i>
                </div>
                <div className="cap-check__ms">58 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>network</b>
                  <i>all parties resolved</i>
                </div>
                <div className="cap-check__ms">71 ms</div>
              </div>

              <div className="cap-verdict">
                <div className="cap-verdict__l">Authorized · receipt emitted</div>
                <div className="cap-verdict__r">
                  proof:0xC44E…F912 · anchored on-chain
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="outcomes__pair">
          <div className="outcomes__pair-card">
            <div className="outcomes__pair-head">✓ Authorized</div>
            <h3>Payment settles.</h3>
            <p>
              Within limit, to an allowed IBAN, within validity. Paymove
              settles the spend on the Visa rail. A Receipt is attached to the
              transaction — portable, anchored on-chain, verifiable by either
              party without trusting the other&rsquo;s database.
            </p>
          </div>
          <div className="outcomes__pair-card outcomes__pair-card--bad">
            <div className="outcomes__pair-head">✕ Not authorized</div>
            <h3>Recover — then settle.</h3>
            <p>
              Over the limit, unknown IBAN, expired, or revoked. Humanos
              collects fresh human approval in real time (OTP by SMS, link by
              email), updates the mandate, and resumes once authorization is
              valid. The agent never silently spends or guesses.
            </p>
          </div>
        </div>

        <div className="section__quote">
          Visa owns the rail. Paymove settles. Humanos proves the human
          authorized it.
        </div>
      </div>
    </section>
  );
}
