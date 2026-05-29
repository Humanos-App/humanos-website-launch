export function Problem() {
  return (
    <section className="section" data-screen-label="03 Problem">
      <div className="wrap">
        <div className="problem__head">
          <div className="eyebrow">§ 02 · Problem</div>
          <h2 className="h-section">
            Settlement got fast.
            <br />
            <em>Provable authorization didn&rsquo;t keep up.</em>
          </h2>
          <p className="h-lede">
            Visa&rsquo;s protocol lets an agent transact on a real rail, and
            Paymove gives it a wallet to spend from. But autonomous spend still
            depends on the agent&rsquo;s own logic to decide what&rsquo;s
            allowed. Limits, approvals, and &ldquo;did the human actually agree
            to this&rdquo; live inside one party&rsquo;s code and database —
            checked by the same system that moves the money.
          </p>
        </div>

        <div className="problem__grid">
          <article className="problem__card">
            <div className="problem__card-eye">What&rsquo;s happening</div>
            <h3>Agents spend, authorization is assumed.</h3>
            <p>
              Paymove can settle a transfer on the Visa rail in seconds.
              Whether a human actually authorized that specific spend — this
              amount, to this counterparty — lives in the agent&rsquo;s own
              logic, and was never designed to answer, at the moment money
              moves, &ldquo;is this exact payment authorized?&rdquo;
            </p>
            <div className="problem__chain">
              <b>provision</b>
              <span className="arrow">·</span>
              <b>spend</b>
              <span className="arrow">·</span>
              <b>settle</b>
              <span className="arrow">→</span>
              <span className="red">assumed</span>
            </div>
          </article>
          <article className="problem__card">
            <div className="problem__card-eye">What it costs</div>
            <h3>Audit is reconstruction, not proof.</h3>
            <p>
              An enterprise diligence team or a Visa-scale partner reconstructs
              what the agent <i>did</i> from one party&rsquo;s logs — never that
              any given spend was <i>actually allowed</i>. Every new partner,
              every regulator restarts the work. Authorization stays internal
              state; nothing portable, nothing both sides can check.
            </p>
            <div className="problem__chain">
              <span className="red">no shared answer</span>
              <span className="arrow">·</span>
              <b>&ldquo;was this spend authorized?&rdquo;</b>
            </div>
          </article>
        </div>

        <div className="problem__verdict">
          <div className="problem__verdict-q">
            Money moves on the rail. Authorization stays trapped in one
            party&rsquo;s database. <em>Not anymore.</em>
          </div>
          <div className="problem__verdict-tag">§ 02 · close</div>
        </div>
      </div>
    </section>
  );
}
