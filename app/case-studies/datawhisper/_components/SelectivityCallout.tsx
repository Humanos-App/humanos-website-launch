export function SelectivityCallout() {
  return (
    <section className="section" data-screen-label="03 Selectivity">
      <div className="wrap">
        <div className="solution__head">
          <div className="eyebrow">§ 02 · The design principle</div>
          <h2 className="h-section">
            Selective by design,{" "}
            <em>not universal.</em>
          </h2>
          <p className="h-lede">
            GuardianShield Consent does not replace the SmartInsights.CortexOS
            internal HITL model. Most approvals, escalations and operator
            overrides resolve inside SmartInsights.CortexOS, with no external
            dependency and no added latency.{" "}
            <strong>
              Humanos is invoked only when the proof must survive outside
              DataWhisper&rsquo;s systems, or the approving party is external.
            </strong>{" "}
            If internal governance is sufficient, the external call never
            happens.
          </p>
        </div>
      </div>
    </section>
  );
}
