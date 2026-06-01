export function UseCases() {
  return (
    <section className="section" data-screen-label="11 Use cases">
      <div className="wrap">
        <div className="uc__head">
          <div className="eyebrow">§ 06 · Where it applies</div>
          <h2 className="h-section">
            Anywhere a regulated agent acts{" "}
            <em
              style={{
                fontStyle: "normal",
                color: "var(--hm-verification)",
              }}
            >
              on a human&rsquo;s authority.
            </em>
          </h2>
        </div>

        <div className="uc__grid">
          <article className="uc__card">
            <div className="uc__num">01</div>
            <div className="uc__body">
              <h3>Disputes &amp; chargebacks</h3>
              <p>
                Refunds, settlements and goodwill credits, each authorised at
                the gate and carrying a portable proof.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">
                Engage &amp; Grow · Fraud &amp; Risk
              </div>
              <div className="uc__verify-pills">
                <span className="uc__pill">refund</span>
                <span className="uc__pill">settle</span>
                <span className="uc__pill">credit</span>
              </div>
            </div>
          </article>

          <article className="uc__card">
            <div className="uc__num">02</div>
            <div className="uc__body">
              <h3>High-value payment execution</h3>
              <p>
                Above an operator-defined threshold, cryptographic proof that
                a human authorised execution at a specific amount.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">
                Engage &amp; Grow · Fraud &amp; Risk
              </div>
              <div className="uc__verify-pills">
                <span className="uc__pill">approve</span>
                <span className="uc__pill">execute</span>
                <span className="uc__pill">prove</span>
              </div>
            </div>
          </article>

          <article className="uc__card">
            <div className="uc__num">03</div>
            <div className="uc__body">
              <h3>KYB / KYC &amp; sanctions</h3>
              <p>
                A signed human authorisation record provides audit-ready
                evidence for FCA or equivalent review.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">AI Onboarding</div>
              <div className="uc__verify-pills">
                <span className="uc__pill">kyc</span>
                <span className="uc__pill">sanction</span>
                <span className="uc__pill">file</span>
              </div>
            </div>
          </article>

          <article className="uc__card">
            <div className="uc__num">04</div>
            <div className="uc__body">
              <h3>Contract &amp; terms acceptance</h3>
              <p>
                Tamper-proof evidence that a counterparty accepted terms at a
                specific time and scope.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">Engage &amp; Grow</div>
              <div className="uc__verify-pills">
                <span className="uc__pill">accept</span>
                <span className="uc__pill">attest</span>
                <span className="uc__pill">audit</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
