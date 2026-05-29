export function BuildVs() {
  return (
    <section className="section" data-screen-label="09 Build vs Humanos">
      <div className="wrap">
        <div className="bvh__head">
          <div className="eyebrow">§ 07 · Build vs Humanos</div>
          <h2 className="h-section">
            Approvals don&rsquo;t scale
            <br />
            <em>built per system.</em>
          </h2>
        </div>

        <div className="bvh__grid">
          <div className="bvh__col-head bvh__col-head--bad">
            <div className="bvh__col-eye">Build per system</div>
            <h3>Approvals locked per app</h3>
          </div>
          <div className="bvh__col-head bvh__col-head--good">
            <div className="bvh__col-eye">Humanos approval OS</div>
            <h3>One API, every system</h3>
          </div>

          {[
            {
              bad: "Each vendor implements its own signature, consent, and KYC flow.",
              good: "One API every system in the stack calls — consents, signatures, KYCs, prescriptions.",
            },
            {
              bad: "Approvals are trapped inside whichever app collected them.",
              good: "Approvals are portable proofs, consultable from any other system that needs them.",
            },
            {
              bad: "GDPR compliance reproven per vendor integration.",
              good: "Compliance proven once at the approval layer; every system inherits it.",
            },
            {
              bad: "Audit assembled from scattered vendor logs.",
              good: "Every approval emits a portable receipt anchored at the Lusíadas approval ledger.",
            },
            {
              bad: "Patients re-sign the same consent across two or three apps.",
              good: "Patients sign once; the rest of the ecosystem just verifies.",
            },
            {
              bad: "Re-engineer the approval layer when AI agents arrive.",
              good: "Same API today for humans, tomorrow for agents — no parallel stack.",
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
