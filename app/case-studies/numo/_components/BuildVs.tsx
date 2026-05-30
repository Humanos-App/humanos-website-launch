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
              bad: "Rules fragment across systems and venues.",
              good: "Mandates are shared across every system that calls verify().",
            },
            {
              bad: "Authorization is coupled to your codebase.",
              good: "Rules are externalized, versioned, and revocable.",
            },
            {
              bad: "Auditability requires reconstructing logs after the fact.",
              good: "Proof is generated at execution time. Auditors verify, not reconstruct.",
            },
            {
              bad: "No external party can verify your trust claims.",
              good: "Counterparties verify Proofs independently — same standard, same primitives.",
            },
            {
              bad: "Every new integration restarts the work.",
              good: "One verify() call covers every venue, internal or external.",
            },
            {
              bad: "Rule changes require code, deploys, and coordination.",
              good: "Issue a new mandate, revoke the old one. Effective in real time.",
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
