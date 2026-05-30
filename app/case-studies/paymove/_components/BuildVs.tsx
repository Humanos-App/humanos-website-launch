export function BuildVs() {
  return (
    <section className="section mobile-hide" data-screen-label="09 Build vs Humanos">
      <div className="wrap">
        <div className="bvh__head">
          <div className="eyebrow">§ 07 · Build vs Humanos</div>
          <h2 className="h-section">
            Authorization doesn&rsquo;t scale
            <br />
            <em>as internal wallet logic.</em>
          </h2>
        </div>

        <div className="bvh__grid">
          <div className="bvh__col-head bvh__col-head--bad">
            <div className="bvh__col-eye">Build it inside the wallet</div>
            <h3>Internal authorization</h3>
          </div>
          <div className="bvh__col-head bvh__col-head--good">
            <div className="bvh__col-eye">Paymove + Humanos</div>
            <h3>Authorization as runtime primitive</h3>
          </div>

          {[
            {
              bad: "Authorization is internal wallet logic and database state.",
              good: "Authorization is a portable runtime primitive either party can verify.",
            },
            {
              bad: "The counterparty must trust Paymove's database.",
              good: "Counterparties verify the mandate directly against Humanos and the on-chain hash.",
            },
            {
              bad: "Audit reconstructed from one party's transaction logs.",
              good: "Immutable Receipt per payment, mandate hash anchored on-chain.",
            },
            {
              bad: "Limits are coarse category rules inside the agent.",
              good: "Spend scoped to a specific IBAN and amount, signed by a human.",
            },
            {
              bad: "Policy changes require code deploys and agent rewrites.",
              good: "Revoke or amend a mandate; effective on the next verify.",
            },
            {
              bad: "Probabilistic agent logic decides whether the spend is allowed.",
              good: "Deterministic yes/no in the settlement path — no LLM in the path.",
            },
          ].map((row, i) => (
            <div key={i} className="bvh__row">
              <div className="bvh__cell bvh__cell--bad">
                <span className="bvh__cell-mark">✕</span>
                {row.bad}
              </div>
              <div className="bvh__cell bvh__cell--good">
                <span className="bvh__cell-mark">✓</span>
                {row.good}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
