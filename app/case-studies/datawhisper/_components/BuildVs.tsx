export function BuildVs() {
  return (
    <section className="section mobile-hide" data-screen-label="09 Build vs Humanos">
      <div className="wrap">
        <div className="bvh__head">
          <div className="eyebrow">§ 07 · Build vs Humanos</div>
          <h2 className="h-section">
            Authorization doesn&rsquo;t scale
            <br />
            <em>as internal Cortex state.</em>
          </h2>
        </div>

        <div className="bvh__grid">
          <div className="bvh__col-head bvh__col-head--bad">
            <div className="bvh__col-eye">Build it inside Cortex</div>
            <h3>Internal authorization</h3>
          </div>
          <div className="bvh__col-head bvh__col-head--good">
            <div className="bvh__col-eye">GUARDIANSHIELD + Humanos</div>
            <h3>Authorization as runtime primitive</h3>
          </div>

          {[
            {
              bad: "Authorization is internal Cortex application state.",
              good: "Authorization is a portable runtime primitive any party can verify.",
            },
            {
              bad: "External parties must trust the agent provider.",
              good: "Auditors, regulators, partners verify the mandate directly against Humanos.",
            },
            {
              bad: "Audit reconstructed from agent traces and logs.",
              good: "Immutable Proof attached to every action, anchored at GUARDIANSHIELD.",
            },
            {
              bad: "Each customer integration restarts authorization work.",
              good: "One verify() call covers every customer the agent acts in front of.",
            },
            {
              bad: "Policy changes require code deploys and agent rewrites.",
              good: "Revoke or amend a mandate; effective on the next verify.",
            },
            {
              bad: "Probabilistic AI decides whether the action is allowed.",
              good: "Deterministic yes/no at the GUARDIANSHIELD boundary — no LLM in the path.",
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
