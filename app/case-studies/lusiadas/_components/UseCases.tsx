export function UseCases() {
  return (
    <section className="section" data-screen-label="11 Use cases">
      <div className="wrap">
        <div className="uc__head">
          <div className="eyebrow">§ 09 · Use cases</div>
          <h2 className="h-section">
            Any approval. Any system.{" "}
            <em
              style={{
                fontStyle: "normal",
                color: "var(--hm-verification)",
              }}
            >
              One API.
            </em>
          </h2>
        </div>

        <div className="uc__grid">
          <article className="uc__card">
            <div className="uc__num">01</div>
            <div className="uc__body">
              <h3>GDPR consents</h3>
              <p>
                Captured at first contact — mobile, web, or in-clinic.
                Valid across every Lusíadas touchpoint. Compliance proven
                at the approval layer, not reproven per integration.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">Verify before execution</div>
              <div className="uc__verify-pills">
                <span className="uc__pill">consent</span>
                <span className="uc__pill">scope</span>
                <span className="uc__pill">expiry</span>
              </div>
            </div>
          </article>

          <article className="uc__card">
            <div className="uc__num">02</div>
            <div className="uc__body">
              <h3>Remote identity verification</h3>
              <p>
                KYC the patient before any clinical or admin action that
                requires it. Done once, verifiable across the mobile app,
                clinical software, and back-office systems.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">Verify before execution</div>
              <div className="uc__verify-pills">
                <span className="uc__pill">kyc</span>
                <span className="uc__pill">identity</span>
                <span className="uc__pill">liveness</span>
              </div>
            </div>
          </article>

          <article className="uc__card">
            <div className="uc__num">03</div>
            <div className="uc__body">
              <h3>Informed consents</h3>
              <p>
                Signed by both the patient and the healthcare professional.
                Receipt anchored, attached to the clinical record, visible
                to every system that needs it — without re-collection.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">Verify before execution</div>
              <div className="uc__verify-pills">
                <span className="uc__pill">patient</span>
                <span className="uc__pill">physician</span>
                <span className="uc__pill">proof</span>
              </div>
            </div>
          </article>

          <article className="uc__card">
            <div className="uc__num">04</div>
            <div className="uc__body">
              <h3>Prescription signing</h3>
              <p>
                Physicians sign through Humanos; the pharmacy dispenses
                against the verified receipt. Same integration covers
                Medify, Glintt, and the patient mobile app surface.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">Verify before execution</div>
              <div className="uc__verify-pills">
                <span className="uc__pill">sign</span>
                <span className="uc__pill">dispense</span>
                <span className="uc__pill">audit</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
