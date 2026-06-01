export function Problem() {
  return (
    <section className="section" data-screen-label="03 Problem">
      <div className="wrap">
        <div className="problem__head">
          <div className="eyebrow">§ 02 · Problem</div>
          <h2 className="h-section">
            Transactions cross boundaries
            <br />
            <em>bank channels can&rsquo;t span.</em>
          </h2>
          <p className="h-lede">
            Ralio today operates inside the customer&rsquo;s own bank API.
            Every payment flows through that customer-owned channel, so
            Ralio&rsquo;s guardrails are enough — no external system has to
            recognise or authenticate the agent itself. The moment the agent
            has to transact outside the bank API — hosted checkouts, B2B
            marketplaces, acquirer networks — the same approach no longer
            applies.
          </p>
        </div>

        <div className="problem__grid">
          <article className="problem__card">
            <div className="problem__card-eye">What&rsquo;s happening</div>
            <h3>The agent is trusted inside the channel, unknown outside it.</h3>
            <p>
              Ralio governs the agent inside the customer-owned bank API
              channel by design. The moment the same agent transacts at a
              venue the customer doesn&rsquo;t own — a marketplace checkout,
              an acquirer, a third-party processor — the merchant side has no
              credential to verify, no registry to consult, no way to confirm
              the action is authorised.
            </p>
            <div className="problem__chain">
              <b>bank API channel</b>
              <span className="arrow">✓</span>
              <span className="arrow">·</span>
              <b>external venues</b>
              <span className="red">held back</span>
            </div>
          </article>
          <article className="problem__card">
            <div className="problem__card-eye">What it costs</div>
            <h3>Reach stops at the channel boundary.</h3>
            <p>
              Inside the channel, Ralio&rsquo;s guardrails, identity, and
              audit are sufficient. Outside it, agentic payments stay off the
              table. Without a shared credential bridging Ralio to merchants,
              marketplace checkouts, acquirers, and hosted checkouts remain
              unreachable, and the customer&rsquo;s agentic payment footprint
              can&rsquo;t grow past the bank API.
            </p>
            <div className="problem__chain">
              <span className="red">no shared credential</span>
              <span className="arrow">·</span>
              <b>&ldquo;is this agent allowed here?&rdquo;</b>
            </div>
          </article>
        </div>

        <div className="problem__verdict">
          <div className="problem__verdict-q">
            Trust stops at the channel boundary.{" "}
            <em>Payments don&rsquo;t.</em>
          </div>
          <div className="problem__verdict-tag">§ 02 · close</div>
        </div>
      </div>
    </section>
  );
}
