export function Category() {
  return (
    <section className="section" data-screen-label="13 Category">
      <div className="wrap">
        <div className="eyebrow">§ 11 · Category definition</div>
        <div className="cat__grid">
          <div className="cat__head">
            <h2>
              Humanos operates at the moment an agent decides{" "}
              <em>to move money.</em>
            </h2>
            <p>
              At that moment, authorization must be verified, the decision must
              be deterministic, and the outcome must be provable. Everything
              else follows.
            </p>
          </div>
          <div className="cat__attrs">
            <div className="cat__attr">
              <div className="cat__attr-eye">Verified</div>
              <h4>Authorization is checked at execution.</h4>
              <p>Never assumed. Never after the fact.</p>
            </div>
            <div className="cat__attr">
              <div className="cat__attr-eye">Deterministic</div>
              <h4>Allow, block, or request approval.</h4>
              <p>Nothing in between. Deterministic yes / no.</p>
            </div>
            <div className="cat__attr">
              <div className="cat__attr-eye">Provable</div>
              <h4>Every action emits a cryptographic receipt.</h4>
              <p>Anyone can verify it. Forever.</p>
            </div>
          </div>
        </div>

        <div className="cat__close">
          <div className="cat__close-bad">Agents assume permission.</div>
          <div className="cat__close-good">Agents verify it.</div>
        </div>
      </div>
    </section>
  );
}
