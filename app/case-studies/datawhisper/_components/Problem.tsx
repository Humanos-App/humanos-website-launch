export function Problem() {
  return (
    <section className="section" data-screen-label="03 Problem">
      <div className="wrap">
        <div className="problem__head">
          <div className="eyebrow">§ 02 · Problem</div>
          <h2 className="h-section">
            Workflow automation moved fast.
            <br />
            <em>Provable authorization didn&rsquo;t keep up.</em>
          </h2>
          <p className="h-lede">
            Modern orchestration platforms can trigger anything — refunds,
            settlements, regulatory filings, KYC releases. But the rules that
            decide what is allowed still live across emails, PDFs, Slack
            threads, static role tables, and disconnected compliance systems.
            AI agents act on probabilistic context, then operators try to
            reconstruct what they were allowed to do, after the fact.
          </p>
        </div>

        <div className="problem__grid">
          <article className="problem__card">
            <div className="problem__card-eye">What&rsquo;s happening</div>
            <h3>Agents act, approvals lag behind.</h3>
            <p>
              Cortex can resolve a dispute, settle a claim, file an
              attestation in seconds. The mandates that govern those actions
              live somewhere else entirely — and were never designed to
              answer, at the moment of action, &ldquo;is this specific
              decision actually authorized?&rdquo;
            </p>
            <div className="problem__chain">
              <b>orchestrate</b>
              <span className="arrow">·</span>
              <b>execute</b>
              <span className="arrow">·</span>
              <b>audit</b>
              <span className="arrow">→</span>
              <span className="red">fragmented</span>
            </div>
          </article>
          <article className="problem__card">
            <div className="problem__card-eye">What it costs</div>
            <h3>Audit is reconstruction, not proof.</h3>
            <p>
              Compliance teams piece together what the agent <i>did</i> from
              logs and traces — never that any given action was{" "}
              <i>actually allowed</i>. Every new customer, every new partner,
              every regulator restarts the work. Authorization stays internal
              application state; nothing portable.
            </p>
            <div className="problem__chain">
              <span className="red">no shared answer</span>
              <span className="arrow">·</span>
              <b>&ldquo;was this allowed?&rdquo;</b>
            </div>
          </article>
        </div>

        <div className="problem__verdict">
          <div className="problem__verdict-q">
            AI executes. Authorization stays trapped in emails and PDFs.{" "}
            <em>Not anymore.</em>
          </div>
          <div className="problem__verdict-tag">§ 02 · close</div>
        </div>
      </div>
    </section>
  );
}
