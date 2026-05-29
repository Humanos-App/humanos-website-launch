export function NetworkEffect() {
  return (
    <section className="section" data-screen-label="10 Network effect">
      <div className="wrap">
        <div className="net__head">
          <div className="eyebrow">§ 08 · Network effect</div>
          <h2 className="h-section">
            One approval becomes <em>shared infrastructure</em> — not
            something each vendor rebuilds.
          </h2>
        </div>

        <div className="net__grid">
          <div className="net__diagram">
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
              <div className="net__center-l2">approval OS</div>
            </div>
            <div className="net__node net__node--ralio">
              Medify
              <small>clinical</small>
            </div>
            <div className="net__node net__node--merchant">
              Glintt
              <small>hospital · pharmacy</small>
            </div>
            <div className="net__node net__node--market">
              NewSoft
              <small>back-office</small>
            </div>
            <div className="net__node net__node--proc">
              Pipedrive
              <small>CRM</small>
            </div>
            <div className="net__node net__node--acq">
              Mobile app
              <small>patient surface</small>
            </div>
          </div>

          <div className="net__points">
            <div className="net__point">
              <span className="net__point-arr">→</span>
              <div>
                <h4>An approval signed in one system works in every other.</h4>
                <p>
                  Sign in Medify, verify in Glintt. Sign in the mobile app,
                  verify in NewSoft. The proof travels with the patient.
                </p>
              </div>
            </div>
            <div className="net__point">
              <span className="net__point-arr">→</span>
              <div>
                <h4>Every vendor consumes the same approval layer.</h4>
                <p>
                  No re-collection. No duplicated KYCs. No re-asking the
                  patient for a consent they already gave somewhere else
                  in the ecosystem.
                </p>
              </div>
            </div>
            <div className="net__point">
              <span className="net__point-arr">→</span>
              <div>
                <h4>New vendor? Same API.</h4>
                <p>
                  Onboarding a new clinical or admin system means calling
                  the same endpoint. No new approval logic per integration.
                </p>
              </div>
            </div>
            <div className="net__point">
              <span className="net__point-arr">→</span>
              <div>
                <h4>Each system strengthens the network.</h4>
                <p>
                  The more systems run on the same approval OS, the more
                  reusable every signed receipt becomes — and the simpler
                  every audit gets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
