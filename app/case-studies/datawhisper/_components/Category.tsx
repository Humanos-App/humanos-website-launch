export function Category() {
  return (
    <section className="section" data-screen-label="13 Category">
      <div className="wrap">
        <div className="eyebrow">§ 11 · Category definition</div>
        <div className="cat__grid">
          <div className="cat__head">
            <h2>
              Humanos operates inside Cortex&rsquo;s GUARDIANSHIELD GOVERNANCE
              — the moment an agent decides{" "}
              <em>to act on behalf of a human.</em>
            </h2>
            <p>
              At that moment, authorization must be verified, the decision
              must be deterministic, and the outcome must be provable.
              Everything else follows.
            </p>
          </div>
          <div className="cat__attrs">
            <div className="cat__attr">
              <div className="cat__attr-eye">Embedded</div>
              <h4>Lives inside Cortex governance, not as a sidecar.</h4>
              <p>
                Plugged into GUARDIANSHIELD as the dedicated authorization
                stack — every agent action inherits it by default.
              </p>
            </div>
            <div className="cat__attr">
              <div className="cat__attr-eye">Deterministic</div>
              <h4>Probabilistic AI, yes/no at the boundary.</h4>
              <p>
                The verification path is deterministic. No LLM in the verify
                call.
              </p>
            </div>
            <div className="cat__attr">
              <div className="cat__attr-eye">Provable</div>
              <h4>Receipts verifiable by any party with the right access.</h4>
              <p>
                Auditable, immutable, portable forever — independently
                verifiable.
              </p>
            </div>
          </div>
        </div>

        <div className="cat__close">
          <div className="cat__close-bad">
            Agent runtimes audit after the fact.
          </div>
          <div className="cat__close-good">
            Agent runtimes verify before the action.
          </div>
        </div>
      </div>
    </section>
  );
}
