export function Solution() {
  return (
    <section className="section section--dark" data-screen-label="04 Solution">
      <div className="wrap">
        <div className="solution__head">
          <div className="eyebrow eyebrow--chalk">§ 03 · Solution</div>
          <h2 className="h-section" style={{ color: "var(--hm-chalk-0)" }}>
            One verify() call,
            <br />
            <em>inside GUARDIANSHIELD GOVERNANCE.</em>
          </h2>
          <p className="solution__intro">
            Before any high-risk action commits — a chargeback, a settlement,
            an attestation, a regulator filing — Cortex calls{" "}
            humanos.verify(). Identity, scope, counterparty, amount, validity
            are checked against a signed mandate in real time, and a
            deterministic answer is returned the rest of GUARDIANSHIELD can
            attach to a portable proof.
          </p>
        </div>

        <div className="capture mobile-hide">
          <div className="capture__head">
            <div className="capture__head-l">
              verification.capture · before dispute action commits
            </div>
            <div className="capture__head-r">2026-05-29 11:14:07.802 UTC</div>
          </div>
          <div className="capture__body">
            <div className="capture__col">
              <div className="cap-label">Case</div>
              <div className="cap-merchant">case_DW-018472</div>
              <div className="cap-did">dispute.resolve · cortex.agent</div>

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
                <b>Initiated by</b> · DataWhisper dispute-resolution agent
                <br />
                on behalf of: <b>Operations Lead, DataWhisper</b>
              </div>
            </div>

            <div className="capture__col">
              <div className="cap-verify-head">
                <div className="cap-verify-title">
                  humanos.verify() · live capture
                </div>
                <div className="cap-verify-tot">184 ms</div>
              </div>

              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>identity</b>
                  <i>claimant verified</i>
                </div>
                <div className="cap-check__ms">28 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>scope</b>
                  <i>dispute.resolve · chargeback</i>
                </div>
                <div className="cap-check__ms">52 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>counterparty</b>
                  <i>approved adjudicator list</i>
                </div>
                <div className="cap-check__ms">88 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>amount</b>
                  <i>within £ 25,000 resolution cap</i>
                </div>
                <div className="cap-check__ms">142 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>validity</b>
                  <i>mandate active until 2026-06-29</i>
                </div>
                <div className="cap-check__ms">176 ms</div>
              </div>

              <div className="cap-verdict">
                <div className="cap-verdict__l">Authorized · proof emitted</div>
                <div className="cap-verdict__r">
                  proof:0xC44E…F912 · attached to resolution
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="outcomes__pair">
          <div className="outcomes__pair-card">
            <div className="outcomes__pair-head">✓ Authorized</div>
            <h3>Resolution commits.</h3>
            <p>
              Within mandate, within constraints, within validity. Cortex
              writes the resolution into the case-of-record. A Proof is
              attached to the case — portable, verifiable by any party with
              the right access.
            </p>
          </div>
          <div className="outcomes__pair-card outcomes__pair-card--bad">
            <div className="outcomes__pair-head">✕ Not authorized</div>
            <h3>Recover — then continue.</h3>
            <p>
              Out of scope, expired, or revoked. Humanos requests step-up
              approval in real time (SMS, API), updates the mandate, and
              resumes once authorization is valid. The agent never silently
              fails or guesses.
            </p>
          </div>
        </div>

        <div className="section__quote">
          Humanos verifies the action against the mandate — not against the
          agent&rsquo;s runtime.
        </div>
      </div>
    </section>
  );
}
