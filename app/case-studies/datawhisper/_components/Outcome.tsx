export function Outcome() {
  return (
    <section className="section" data-screen-label="07 Outcome">
      <div className="wrap">
        <div className="outc__head">
          <div className="eyebrow">§ 05 · Outcome</div>
          <h2 className="h-section">
            What you get
            <br />
            <em>the moment it&rsquo;s wired in.</em>
          </h2>
        </div>

        <div className="outc__grid">
          <article className="outc__card">
            <div className="outc__num">
              <b>01</b> · Verify
            </div>
            <h3>Every high-risk action verified before execution.</h3>
            <p>
              Nothing commits on assumption. The verify call is non-optional
              and inline — at the GUARDIANSHIELD boundary, not after the
              agent has already acted.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>02</b> · Deterministic
            </div>
            <h3>Probabilistic AI, deterministic answer.</h3>
            <p>
              Cortex agents stay probabilistic where it matters (reasoning,
              context). The act-or-not boundary becomes a yes/no — no LLM in
              the verification path.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>03</b> · Auditable
            </div>
            <h3>Auditability without rebuilding logs.</h3>
            <p>
              Every action emits a portable Proof, anchored at
              GUARDIANSHIELD. Auditors query directly; they don&rsquo;t
              reconstruct from internal traces.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>04</b> · Recover
            </div>
            <h3>Recover missing authorization in real time.</h3>
            <p>
              Out-of-scope action? Humanos collects approval (SMS, API, KYC),
              updates the mandate, and resumes execution once authorization
              is valid. No silent failures.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>05</b> · Portable
            </div>
            <h3>Authorization travels with the action.</h3>
            <p>
              Issue once; verify anywhere. The same mandate works across
              customers, partners, regulators, and external counterparties
              the agent acts in front of.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>06</b> · Cortex-native
            </div>
            <h3>Authorization becomes a runtime primitive.</h3>
            <p>
              Inside GUARDIANSHIELD GOVERNANCE, not a sidecar. Every Cortex
              workflow inherits portable, immutable, independently verifiable
              authorization by default.
            </p>
          </article>
        </div>

        <div className="outc__verdict">
          AI agents execute inside regulated environments —{" "}
          <em>within provable, independently verifiable boundaries.</em>
        </div>
      </div>
    </section>
  );
}
