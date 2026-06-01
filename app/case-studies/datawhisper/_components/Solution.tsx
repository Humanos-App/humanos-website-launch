export function Solution() {
  return (
    <section className="section section--dark" data-screen-label="04 Solution">
      <div className="wrap">
        <div className="solution__head">
          <div className="eyebrow eyebrow--chalk">§ 03 · The integration</div>
          <h2 className="h-section" style={{ color: "var(--hm-chalk-0)" }}>
            One verify() call,
            <br />
            <em>at the SmartInsights.CortexOS HITL gate.</em>
          </h2>
          <p className="solution__intro">
            Before a legally consequential action commits, the
            SmartInsights.CortexOS HITL engine calls humanos.verify().
            Identity, scope, counterparty, amount and validity are checked
            against a signed mandate, and a deterministic allow or deny is
            returned. <strong>No LLM sits in the verification path.</strong>
          </p>
        </div>

        <div className="capture mobile-hide">
          <div className="capture__head">
            <div className="capture__head-l">
              humanos.verify() · called by the SmartInsights.CortexOS HITL gate
            </div>
            <div className="capture__head-r">2026-05-29 11:14:07.802 UTC</div>
          </div>
          <div className="capture__body">
            <div className="capture__col">
              <div className="cap-label">Case</div>
              <div className="cap-merchant">case_DW-018472</div>
              <div className="cap-did">dispute.resolve · cortex.peloton</div>

              <div className="cap-label" style={{ marginTop: 28 }}>
                Resolution
              </div>
              <div className="cap-header-row">
                <div />
                <div className="cap-amount">£&nbsp;4,750.00</div>
              </div>
              <div className="cap-tx-row">
                <span>Refund to claimant</span>
                <span>£ 3,200.00</span>
              </div>
              <div className="cap-tx-row">
                <span>Fee adjustment</span>
                <span>£ 750.00</span>
              </div>
              <div className="cap-tx-row">
                <span>Goodwill credit</span>
                <span>£ 800.00</span>
              </div>
              <div className="cap-tx-total">
                <span>Total</span>
                <span>£&nbsp;4,750.00</span>
              </div>

              <div className="cap-mandate-tag">
                x-humanos-mandate · 0xC44E…F912
              </div>

              <div className="cap-initiated">
                <b>Initiated by</b> · DataWhisper dispute-resolution Peloton
                <br />
                on behalf of: <b>Operations Lead, DataWhisper</b>
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
                  <i>claimant verified</i>
                </div>
                <div className="cap-check__ms">12 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>scope</b>
                  <i>dispute.resolve · chargeback</i>
                </div>
                <div className="cap-check__ms">22 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>counterparty</b>
                  <i>approved adjudicator list</i>
                </div>
                <div className="cap-check__ms">36 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>amount</b>
                  <i>within £ 25,000 resolution cap</i>
                </div>
                <div className="cap-check__ms">58 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>validity</b>
                  <i>mandate active to 2026-06-29</i>
                </div>
                <div className="cap-check__ms">71 ms</div>
              </div>

              <div className="cap-verdict">
                <div className="cap-verdict__l">
                  Authorised · proof emitted · 82 ms
                </div>
                <div className="cap-verdict__r">
                  proof:0xC44E…F912 · attached to resolution
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="outcomes__pair">
          <div className="outcomes__pair-card">
            <div className="outcomes__pair-head">✓ COMMIT</div>
            <h3>Resolution commits.</h3>
            <p>
              Within mandate, within constraints, within validity.
              SmartInsights.CortexOS writes the resolution to the case of
              record, and a portable proof is attached, verifiable by any
              party with the right access.
            </p>
          </div>
          <div className="outcomes__pair-card outcomes__pair-card--bad">
            <div className="outcomes__pair-head">⟲ RECOVER</div>
            <h3>Recover, then continue.</h3>
            <p>
              Out of scope, expired or revoked. The HITL engine requests
              step-up approval in real time, the mandate is updated, and
              execution resumes once authorisation is valid. The agent never
              silently fails or guesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
