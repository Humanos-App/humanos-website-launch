export function Model() {
  return (
    <section className="section section--dark" data-screen-label="12 Model">
      <div className="wrap">
        <div className="model__head">
          <div className="eyebrow eyebrow--chalk">§ 10 · Model</div>
          <h2 className="h-section" style={{ color: "var(--hm-chalk-0)" }}>
            Issue → Verify → Collect → <em>Prove.</em>
          </h2>
        </div>

        <div className="model__strip">
          <div className="model__step">
            <div className="model__step-glyph">I</div>
            <div className="model__step-num">01 · Issue</div>
            <h3>Mandate.</h3>
            <p>
              Human authorizes scope. Humanos issues a machine-verifiable
              mandate, reusable across every system that verifies.
            </p>
          </div>
          <div className="model__step">
            <div className="model__step-glyph">V</div>
            <div className="model__step-num">02 · Verify</div>
            <h3>Check.</h3>
            <p>
              Any external system runs humanos.verify(). Deterministic yes /
              no.
            </p>
          </div>
          <div className="model__step">
            <div className="model__step-glyph">C</div>
            <div className="model__step-num">03 · Collect</div>
            <h3>Approval.</h3>
            <p>
              Out of scope? Request step-up authorization from the human
              principal in real time — API, SMS, or email.
            </p>
          </div>
          <div className="model__step">
            <div className="model__step-glyph">P</div>
            <div className="model__step-num">04 · Prove</div>
            <h3>Receipt.</h3>
            <p>
              Cryptographic Proof per action. Auditable forever. Verifiable by
              anyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
