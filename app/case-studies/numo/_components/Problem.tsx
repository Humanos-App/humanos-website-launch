export function Problem() {
  return (
    <section className="section" data-screen-label="03 Problem">
      <div className="wrap">
        <div className="problem__head">
          <div className="eyebrow">§ 02 · Problem</div>
          <h2 className="h-section">
            Capital moves on assumptions,
            <br />
            <em>not authorization.</em>
          </h2>
          <p className="h-lede">
            Agents now move money. Strategies run on their own. Execution spans
            treasury, exchanges, custodians, and payment rails. The rules that
            govern what is allowed live in code, scattered across systems,
            slowly drifting out of sync — and never actually checked at the
            moment an action happens.
          </p>
        </div>

        <div className="problem__grid">
          <article className="problem__card">
            <div className="problem__card-eye">What&rsquo;s happening</div>
            <h3>Agents act, capital moves, no one verifies.</h3>
            <p>
              Decisions are defined in one place. Agents act in another.
              Execution happens across multiple systems. Approvals — when they
              exist — are captured elsewhere. Nothing answers, in real time,
              whether a specific action is actually allowed.
            </p>
            <div className="problem__chain">
              <b>decision</b>
              <span className="arrow">·</span>
              <b>execution</b>
              <span className="arrow">·</span>
              <b>monitoring</b>
              <span className="arrow">→</span>
              <span className="red">fragmented</span>
            </div>
          </article>
          <article className="problem__card">
            <div className="problem__card-eye">What it costs</div>
            <h3>Drift. Replication. Unprovable trust.</h3>
            <p>
              Rules duplicated per venue. Policy changes require code deploys.
              Auditors reconstruct trails after the fact. The firm can show
              what agents <i>did</i> — not that any given action was{" "}
              <i>allowed</i>.
            </p>
            <div className="problem__chain">
              <span className="red">no shared answer</span>
              <span className="arrow">·</span>
              <b>&ldquo;what is allowed right now&rdquo;</b>
            </div>
          </article>
        </div>

        <div className="problem__verdict">
          <div className="problem__verdict-q">
            Capital moves on assumptions.{" "}
            <em>Not on verified authorization.</em>
          </div>
          <div className="problem__verdict-tag">§ 02 · close</div>
        </div>
      </div>
    </section>
  );
}
