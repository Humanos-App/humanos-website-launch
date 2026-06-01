export function BuildVs() {
  return (
    <section className="section mobile-hide" data-screen-label="09 Build vs Humanos">
      <div className="wrap">
        <div className="bvh__head">
          <div className="eyebrow">§ 07 · Build vs Humanos</div>
          <h2 className="h-section">
            Authorization doesn&rsquo;t scale
            <br />
            <em>as an internal system.</em>
          </h2>
        </div>

        <div className="bvh__grid">
          <div className="bvh__col-head bvh__col-head--bad">
            <div className="bvh__col-eye">Build it yourself</div>
            <h3>Internal authorization</h3>
          </div>
          <div className="bvh__col-head bvh__col-head--good">
            <div className="bvh__col-eye">With Humanos</div>
            <h3>Shared authorization layer</h3>
          </div>

          {[
            {
              bad: "Trust stays inside the customer-owned channel.",
              good: "Authorisation is independently verifiable beyond the channel.",
            },
            {
              bad: "External merchants have no shared way to verify the agent.",
              good: "Merchants verify the mandate directly against Humanos.",
            },
            {
              bad: "Authorisation is tied to the agent's home environment.",
              good: "Authorisation is a portable, machine-verifiable certificate.",
            },
            {
              bad: "Each party holds its own audit trail in isolation.",
              good: "Verifiable record attached to every settlement, portable forever.",
            },
            {
              bad: "Every new external counterparty requires bilateral setup.",
              good: "One verify() call covers every counterparty.",
            },
            {
              bad: "Permission changes coordinate party-by-party.",
              good: "Revoke the mandate; effective everywhere on next verify.",
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
