export function NetworkEffect() {
  return (
    <section className="section" data-screen-label="10 Network effect">
      <div className="wrap">
        <div className="net__head">
          <div className="eyebrow">§ 08 · Network effect</div>
          <h2 className="h-section">
            Authorization becomes <em>a shared primitive</em> — not something
            rebuilt per customer.
          </h2>
        </div>

        <div className="net__grid">
          <div className="net__diagram mobile-hide">
            <svg
              className="net__lines"
              viewBox="0 0 400 400"
              preserveAspectRatio="none"
            >
              <line x1="200" y1="200" x2="0" y2="200" />
              <line x1="200" y1="200" x2="200" y2="0" />
              <line x1="200" y1="200" x2="400" y2="0" />
              <line x1="200" y1="200" x2="400" y2="400" />
              <line x1="200" y1="200" x2="200" y2="400" />
            </svg>
            <div className="net__center">
              <div className="net__center-l1">Humanos</div>
              <div className="net__center-l2">verify()</div>
            </div>
            <div className="net__node net__node--ralio">
              Cortex agent
              <small>caller</small>
            </div>
            <div className="net__node net__node--merchant">
              Adjudicator
              <small>dispute boundary</small>
            </div>
            <div className="net__node net__node--market">
              Regulator
              <small>oversight</small>
            </div>
            <div className="net__node net__node--proc">
              Banking partner
              <small>settlement</small>
            </div>
            <div className="net__node net__node--acq">
              Audit ledger
              <small>immutable</small>
            </div>
          </div>

          <div className="net__points">
            <div className="net__point">
              <span className="net__point-arr">→</span>
              <div>
                <h4>Mandates work across every party Cortex acts in front of.</h4>
                <p>
                  Issue once. Verify anywhere — adjudicators, regulators,
                  banking partners, internal audit.
                </p>
              </div>
            </div>
            <div className="net__point">
              <span className="net__point-arr">→</span>
              <div>
                <h4>Counterparties verify Cortex&rsquo;s actions directly.</h4>
                <p>
                  External parties check authority against Humanos itself —
                  without trusting Cortex&rsquo;s runtime or its agent traces.
                </p>
              </div>
            </div>
            <div className="net__point">
              <span className="net__point-arr">→</span>
              <div>
                <h4>Every Cortex integration reuses the same standard.</h4>
                <p>
                  No new authorization logic per customer. The integration is
                  the verify() call.
                </p>
              </div>
            </div>
            <div className="net__point">
              <span className="net__point-arr">→</span>
              <div>
                <h4>Each verifier strengthens the network.</h4>
                <p>
                  The more systems verify against Humanos, the more valuable
                  every mandate becomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
