export function Problem() {
  return (
    <section className="section" data-screen-label="03 Problem">
      <div className="wrap">
        <div className="problem__head">
          <div className="eyebrow">§ 02 · Problem</div>
          <h2 className="h-section">
            Transactions cross trust boundaries
            <br />
            <em>no runtime can speak for.</em>
          </h2>
          <p className="h-lede">
            Agents now transact with external counterparties. Merchants,
            marketplaces, processors, and acquirers do not trust the
            agent&rsquo;s runtime — and runtime guardrails alone cannot prove
            a human authorized the action.
          </p>
        </div>

        <div className="problem__grid">
          <article className="problem__card">
            <div className="problem__card-eye">What&rsquo;s happening</div>
            <h3>Agents act, money moves, no external party verifies.</h3>
            <p>
              Decisions are defined in one system. Agents execute in another.
              Settlement happens across merchants, processors, and networks
              the customer does not control. Nothing answers, in real time,
              whether a specific transaction was actually authorized by a
              human.
            </p>
            <div className="problem__chain">
              <b>runtime</b>
              <span className="arrow">→</span>
              <b>merchant</b>
              <span className="arrow">→</span>
              <b>processor</b>
              <span className="arrow">→</span>
              <span className="red">fragmented</span>
            </div>
          </article>
          <article className="problem__card">
            <div className="problem__card-eye">What it costs</div>
            <h3>Closed channels. Stranded trust. Unprovable authority.</h3>
            <p>
              Authorization is local application state. External
              counterparties cannot verify the agent acted within scope.
              Audits reconstruct trails after the fact. Every new integration
              restarts the work.
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
            Authorization stops at the runtime boundary.{" "}
            <em>Commerce doesn&rsquo;t.</em>
          </div>
          <div className="problem__verdict-tag">§ 02 · close</div>
        </div>
      </div>
    </section>
  );
}
