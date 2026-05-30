export function Solution() {
  return (
    <section className="section section--dark" data-screen-label="04 Solution">
      <div className="wrap">
        <div className="solution__head">
          <div className="eyebrow eyebrow--chalk">§ 03 · Solution</div>
          <h2 className="h-section" style={{ color: "var(--hm-chalk-0)" }}>
            One approval API,
            <br />
            <em>shared by every system in the stack.</em>
          </h2>
          <p className="solution__intro">
            Any clinical or admin system in the Lusíadas ecosystem — Medify,
            Glintt, NewSoft, Pipedrive, internal apps, the patient mobile
            app — can request and verify a human approval through a single
            call to Humanos. Approvals are collected once, signed by the
            right human(s), anchored as portable proofs, and consultable
            from any other system that needs them.
          </p>
        </div>

        <div className="capture mobile-hide">
          <div className="capture__head">
            <div className="capture__head-l">
              approval.capture · informed consent
            </div>
            <div className="capture__head-r">2026-05-29 11:14:07.802 UTC</div>
          </div>
          <div className="capture__body">
            <div className="capture__col">
              <div className="cap-label">Consent</div>
              <div className="cap-merchant">consent_LU-204891</div>
              <div className="cap-did">consent.informed · medify.app</div>

              <div className="cap-label" style={{ marginTop: 28 }}>
                Procedure
              </div>
              <div className="cap-header-row">
                <div />
                <div className="cap-amount">Cardiac catheterization</div>
              </div>
              <div className="cap-tx-row">
                <span>Patient signature</span>
                <span>required</span>
              </div>
              <div className="cap-tx-row">
                <span>Physician signature</span>
                <span>required</span>
              </div>
              <div className="cap-tx-row">
                <span>GDPR processing consent</span>
                <span>linked</span>
              </div>
              <div className="cap-tx-total">
                <span>Signers</span>
                <span>Patient + Cardiologist</span>
              </div>

              <div className="cap-mandate-tag">
                x-humanos-approval · 0xA77B…D204
              </div>

              <div className="cap-initiated">
                <b>Initiated by</b> · Medify (clinical software)
                <br />
                on behalf of: <b>Lusíadas</b>
              </div>
            </div>

            <div className="capture__col">
              <div className="cap-verify-head">
                <div className="cap-verify-title">
                  humanos.verify() · live capture
                </div>
                <div className="cap-verify-tot">94 ms</div>
              </div>

              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>identity</b>
                  <i>patient KYC verified</i>
                </div>
                <div className="cap-check__ms">14 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>scope</b>
                  <i>consent.informed · cardiology</i>
                </div>
                <div className="cap-check__ms">24 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>counterparty</b>
                  <i>physician registered · OM 38291</i>
                </div>
                <div className="cap-check__ms">42 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>signatures</b>
                  <i>patient + cardiologist signed</i>
                </div>
                <div className="cap-check__ms">68 ms</div>
              </div>
              <div className="cap-check">
                <div className="cap-check__mark">✓</div>
                <div className="cap-check__t">
                  <b>anchor</b>
                  <i>written to Lusíadas approval ledger</i>
                </div>
                <div className="cap-check__ms">86 ms</div>
              </div>

              <div className="cap-verdict">
                <div className="cap-verdict__l">Approved · receipt emitted</div>
                <div className="cap-verdict__r">
                  proof:0xA77B…D204 · attached to clinical record
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="outcomes__pair">
          <div className="outcomes__pair-card">
            <div className="outcomes__pair-head">✓ Approved</div>
            <h3>Procedure can proceed.</h3>
            <p>
              Both signers verified, scope correct, receipt anchored. The
              proof is attached to the patient&rsquo;s clinical record and
              becomes visible to NewSoft, Glintt, the OR system, and the
              patient mobile app — without anyone re-collecting it.
            </p>
          </div>
          <div className="outcomes__pair-card outcomes__pair-card--bad">
            <div className="outcomes__pair-head">✕ Missing approval</div>
            <h3>Collect inline — then continue.</h3>
            <p>
              Missing a signature, an expired KYC, an outdated GDPR consent.
              Humanos requests the missing approval in real time through
              whichever surface the human is on (mobile, web, in-clinic),
              and the original flow resumes once the receipt is valid.
            </p>
          </div>
        </div>

        <div className="section__quote">
          Lusíadas approves once — and the rest of the ecosystem just
          verifies.
        </div>
      </div>
    </section>
  );
}
