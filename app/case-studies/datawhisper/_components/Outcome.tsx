export function Outcome() {
  return (
    <section
      className="section section--dark"
      data-screen-label="07 Outcome"
    >
      <div className="wrap">
        <div className="outc__head">
          <div className="eyebrow eyebrow--chalk">§ 05 · What it delivers</div>
          <h2 className="h-section" style={{ color: "var(--hm-chalk-0)" }}>
            Provable authorization,{" "}
            <em>by default.</em>
          </h2>
        </div>

        <div className="outc__grid outc__grid--2col">
          <article className="outc__card">
            <div className="outc__num">
              <b>01</b> · Verified
            </div>
            <h3>Verified before execution.</h3>
            <p>
              Relevant legally consequential actions are verified before
              they commit. The verify call is inline at the HITL gate, not
              after the agent has acted.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>02</b> · Deterministic
            </div>
            <h3>Probabilistic AI, deterministic answer.</h3>
            <p>
              Agents stay probabilistic in reasoning. The act-or-not
              boundary is a yes or no, with no LLM in the verification
              path.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>03</b> · External reach
            </div>
            <h3>Human-in-the-loop beyond the operator.</h3>
            <p>
              Approval and consent can come from external counterparties
              and data subjects, not only internal operators. The loop
              extends past DataWhisper&rsquo;s boundary.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>04</b> · Portable
            </div>
            <h3>Authorization travels with the action.</h3>
            <p>
              Issue once, verify anywhere. The proof is recorded in the
              SmartInsights.CortexOS tamper-evident audit trail, lives
              inside GuardianShield Governance, and is verifiable by any
              permitted party.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
