export function Solution() {
  return (
    <section className="section section--dark" data-screen-label="04 Solution">
      <div className="wrap">
        <div className="solution__head">
          <div className="eyebrow eyebrow--chalk">§ 03 · Solution</div>
          <h2 className="h-section" style={{ color: "var(--hm-chalk-0)" }}>
            One verification step
            <br />
            <em>between decision and execution.</em>
          </h2>
          <p className="solution__intro">
            Before any capital movement, Numo&rsquo;s agent calls{" "}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--hm-chalk-0)",
              }}
            >
              humanos.verify()
            </span>
            . Identity, scope, amount, and validity are checked against a
            signed mandate in real time. Authorized actions execute. Missing
            authorization is collected at runtime — not silently failed.
          </p>
        </div>

        <div className="capture mobile-hide">
          <div className="capture__head">
            <div className="capture__head-l">
              verification.capture · before any capital movement
            </div>
            <div className="capture__head-r">2026-04-22 09:14:02.187 UTC</div>
          </div>
          <div className="capture__body">
            <div className="capture__col">
              <div className="cap-label">Action</div>
              <div className="cap-merchant">reallocate_capital</div>
              <div className="cap-did">strategy: delta_neutral · numo.exec</div>

              <div className="cap-label" style={{ marginTop: 28 }}>
                Movement
              </div>
              <div className="cap-header-row">
                <div />
                <div className="cap-amount">€&nbsp;50,000.00</div>
              </div>
              <div className="cap-tx-row">
                <span>From: operating treasury</span>
                <span>→</span>
              </div>
              <div className="cap-tx-row">
                <span>To: custodian.fireblocks</span>
                <span>€ 30,000.00</span>
              </div>
              <div className="cap-tx-row">
                <span>To: venue.binance (USDC)</span>
                <span>€ 20,000.00</span>
              </div>
              <div className="cap-tx-total">
                <span>Total</span>
                <span>€&nbsp;50,000.00</span>
              </div>

              <div className="cap-mandate-tag">
                x-humanos-mandate · 0x7B2C…91d4
              </div>

              <div className="cap-initiated">
                <b>Initiated by</b> · Numo strategy agent
                <br />
                on behalf of: <b>Treasury Lead, Atlas Capital</b>
              </div>
            </div>

            <div className="capture__col">
              <div className="cap-verify-head">
                <div className="cap-verify-title">
                  humanos.verify() · live capture
                </div>
                <div className="cap-verify-tot">176 ms</div>
              </div>

              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>identity</b>
                  <i>principal verified</i>
                </div>
                <div className="cap-check__ms">22 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>scope</b>
                  <i>delta_neutral · reallocate</i>
                </div>
                <div className="cap-check__ms">44 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>counterparty</b>
                  <i>approved venue list</i>
                </div>
                <div className="cap-check__ms">76 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>amount</b>
                  <i>within € 250,000 daily ceiling</i>
                </div>
                <div className="cap-check__ms">128 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>validity</b>
                  <i>mandate active until 2026-05-22</i>
                </div>
                <div className="cap-check__ms">160 ms</div>
              </div>

              <div className="cap-verdict">
                <div className="cap-verdict__l">Authorized · proof emitted</div>
                <div className="cap-verdict__r">
                  proof:0x7B2C…91d4 · attached to execution
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="outcomes__pair">
          <div className="outcomes__pair-card">
            <div className="outcomes__pair-head">✓ Authorized</div>
            <h3>Execute.</h3>
            <p>
              Within mandate, within constraints, within validity. The agent
              proceeds. A Proof is generated — portable, verifiable by any
              party.
            </p>
          </div>
          <div className="outcomes__pair-card outcomes__pair-card--bad">
            <div className="outcomes__pair-head">✕ Not authorized</div>
            <h3>Recover — then continue.</h3>
            <p>
              Humanos requests approval instantly (SMS, API), collects KYC or
              identity verification if required, updates the mandate, and
              resumes execution once authorization is valid.
            </p>
          </div>
        </div>

        <div className="section__quote">
          The system doesn&rsquo;t fail. It recovers authorization at runtime.
        </div>
      </div>
    </section>
  );
}
