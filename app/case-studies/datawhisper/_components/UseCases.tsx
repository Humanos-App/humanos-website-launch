export function UseCases() {
  return (
    <section className="section" data-screen-label="11 Use cases">
      <div className="wrap">
        <div className="uc__head">
          <div className="eyebrow">§ 09 · Use cases</div>
          <h2 className="h-section">
            Anywhere a regulated agent acts{" "}
            <em
              style={{
                fontStyle: "normal",
                color: "var(--hm-verification)",
              }}
            >
              on behalf of a human.
            </em>
          </h2>
        </div>

        <div className="uc__grid">
          <article className="uc__card">
            <div className="uc__num">01</div>
            <div className="uc__body">
              <h3>Disputes &amp; chargebacks</h3>
              <p>
                Banking, telco, marketplaces. Refunds, settlements, goodwill
                credits — every resolution authorized at the boundary, every
                action carrying a portable proof.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">Verify before execution</div>
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
              <h3>Claims resolution</h3>
              <p>
                Insurance, healthcare denials, warranty disputes. AI agents
                propose resolutions; Humanos verifies they sit inside the
                mandate before settlement commits.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">Verify before execution</div>
              <div className="uc__verify-pills">
                <span className="uc__pill">approve</span>
                <span className="uc__pill">deny</span>
                <span className="uc__pill">escalate</span>
              </div>
            </div>
          </article>

          <article className="uc__card">
            <div className="uc__num">03</div>
            <div className="uc__body">
              <h3>Compliance attestations</h3>
              <p>
                KYC, sanctions screening, regulatory filings. The agent
                drafts; Humanos verifies authority and emits a Proof the
                regulator can verify independently.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">Verify before execution</div>
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
              <h3>Cross-customer workflows</h3>
              <p>
                The Cortex agent acts on behalf of an internal human at every
                customer it serves. Every action carries the customer&rsquo;s
                mandate — verifiable by every party they touch.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">Verify before execution</div>
              <div className="uc__verify-pills">
                <span className="uc__pill">delegate</span>
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
