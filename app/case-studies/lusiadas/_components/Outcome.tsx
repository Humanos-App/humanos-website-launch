export function Outcome() {
  return (
    <section className="section" data-screen-label="07 Outcome">
      <div className="wrap">
        <div className="outc__head">
          <div className="eyebrow">§ 05 · Outcome</div>
          <h2 className="h-section">
            What you get
            <br />
            <em>the moment it&rsquo;s wired in.</em>
          </h2>
        </div>

        <div className="outc__grid">
          <article className="outc__card">
            <div className="outc__num">
              <b>01</b> · Unified
            </div>
            <h3>One approval API across every system.</h3>
            <p>
              Medify, Glintt, NewSoft, Pipedrive, internal apps, the mobile
              app — they all consume the same single endpoint. Every kind
              of human approval, one integration.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>02</b> · Reusable
            </div>
            <h3>Collect once, verify everywhere.</h3>
            <p>
              An approval signed in one corner of the ecosystem is valid in
              every other. Patients sign once; clinicians sign once. The
              proof travels with them.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>03</b> · Compliant
            </div>
            <h3>GDPR- and regulator-ready by default.</h3>
            <p>
              Every approval emits a cryptographic receipt with signer,
              scope, timestamp, and validity. Compliance proven at the
              approval layer — not reproven per vendor integration.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>04</b> · Faster
            </div>
            <h3>Procedures proceed without rework.</h3>
            <p>
              No duplicate signatures, no re-asking the patient, no
              re-doing the KYC. Missing approvals are collected inline and
              the original clinical or admin flow resumes immediately.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>05</b> · Verifiable
            </div>
            <h3>Portable, independently verifiable proof.</h3>
            <p>
              Auditors, regulators, and insurance partners verify the
              receipt directly against Humanos. No log reconstruction from
              scattered vendor systems.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>06</b> · Agent-ready
            </div>
            <h3>Same API for humans today, agents tomorrow.</h3>
            <p>
              When AI agents start acting inside Lusíadas systems, they
              inherit the same approval infrastructure that humans use
              today. No re-engineering, no parallel stack.
            </p>
          </article>
        </div>

        <div className="outc__verdict">
          Approvals collected in one corner of the ecosystem —{" "}
          <em>verified, trusted, and reusable across all of it.</em>
        </div>
      </div>
    </section>
  );
}
