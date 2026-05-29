export function Category() {
  return (
    <section className="section" data-screen-label="13 Category">
      <div className="wrap">
        <div className="eyebrow">§ 11 · Category definition</div>
        <div className="cat__grid">
          <div className="cat__head">
            <h2>
              Humanos operates inside Paymove&rsquo;s settlement path — the
              moment an agent decides{" "}
              <em>to move money on behalf of a human.</em>
            </h2>
            <p>
              At that moment, authorization must be verified, the decision must
              be deterministic, and the outcome must be provable. Everything
              else follows.
            </p>
          </div>
          <div className="cat__attrs">
            <div className="cat__attr">
              <div className="cat__attr-eye">Embedded</div>
              <h4>Lives inside the settlement path, not as a sidecar.</h4>
              <p>
                Plugged into Paymove&rsquo;s wallet as the dedicated
                authorization stack — every high-value spend inherits it by
                default.
              </p>
            </div>
            <div className="cat__attr">
              <div className="cat__attr-eye">Deterministic</div>
              <h4>Probabilistic agent, yes/no at the boundary.</h4>
              <p>
                The verification path is deterministic. No LLM in the verify
                call.
              </p>
            </div>
            <div className="cat__attr">
              <div className="cat__attr-eye">Provable</div>
              <h4>Receipts verifiable by any party — and on-chain.</h4>
              <p>
                Auditable, immutable, portable forever — the mandate hash
                anchored on-chain, independently verifiable.
              </p>
            </div>
          </div>
        </div>

        <div className="cat__close">
          <div className="cat__close-bad">
            Settlement layers audit after the fact.
          </div>
          <div className="cat__close-good">
            Settlement layers verify before money moves.
          </div>
        </div>
      </div>
    </section>
  );
}
