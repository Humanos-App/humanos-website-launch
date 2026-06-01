export function NetworkEffect() {
  return (
    <section className="section" data-screen-label="10 Network effect">
      <div className="wrap">
        <div className="net__head">
          <div className="eyebrow">§ 08 · Network effect</div>
          <h2 className="h-section">
            Counterparties <em>verify independently.</em>
          </h2>
          <p className="h-lede">
            External parties can check authority directly through Humanos,
            with no bilateral relationship required.
          </p>
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
              Ralio agent
              <small>caller</small>
            </div>
            <div className="net__node net__node--merchant">
              Merchant
              <small>techsupply.eu</small>
            </div>
            <div className="net__node net__node--market">
              Marketplace
              <small>aggregator</small>
            </div>
            <div className="net__node net__node--proc">
              Processor
              <small>card · ACH</small>
            </div>
            <div className="net__node net__node--acq">
              Acquirer
              <small>network</small>
            </div>
          </div>

          <div className="net__points">
            <div className="net__point">
              <span className="net__point-arr">→</span>
              <div>
                <h4>Mandates work across systems.</h4>
                <p>
                  Issue once. Verify anywhere — merchants, processors,
                  networks, acquirers.
                </p>
              </div>
            </div>
            <div className="net__point">
              <span className="net__point-arr">→</span>
              <div>
                <h4>Counterparties verify independently.</h4>
                <p>
                  External parties check authority directly, without trusting
                  the agent&rsquo;s runtime.
                </p>
              </div>
            </div>
            <div className="net__point">
              <span className="net__point-arr">→</span>
              <div>
                <h4>Integrations reuse the same standard.</h4>
                <p>No new logic per venue. The integration is the verify() call.</p>
              </div>
            </div>
            <div className="net__point">
              <span className="net__point-arr">→</span>
              <div>
                <h4>Each participant strengthens the standard.</h4>
                <p>
                  The more systems verify against Humanos, the more valuable
                  each mandate becomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
