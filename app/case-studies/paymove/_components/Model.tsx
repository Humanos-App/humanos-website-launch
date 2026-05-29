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
              Human authorizes a &ldquo;make a payment&rdquo; action — amount
              limit and allowed IBANs. Humanos issues a machine-verifiable
              mandate, reusable across every payment.
            </p>
          </div>
          <div className="model__step">
            <div className="model__step-glyph">V</div>
            <div className="model__step-num">02 · Verify</div>
            <h3>Check.</h3>
            <p>
              Paymove runs humanos.verify() in the settlement path.
              Deterministic yes / no.
            </p>
          </div>
          <div className="model__step">
            <div className="model__step-glyph">C</div>
            <div className="model__step-num">03 · Collect</div>
            <h3>Approval.</h3>
            <p>
              Over the limit or an unknown IBAN? Request step-up authorization
              from the human owner in real time — API, SMS, or email.
            </p>
          </div>
          <div className="model__step">
            <div className="model__step-glyph">P</div>
            <div className="model__step-num">04 · Prove</div>
            <h3>Receipt.</h3>
            <p>
              Cryptographic Receipt per payment, mandate hash anchored
              on-chain. Auditable forever. Verifiable by anyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
