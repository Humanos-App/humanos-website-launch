export function Problem() {
  return (
    <section className="section" data-screen-label="03 Problem">
      <div className="wrap">
        <div className="problem__head">
          <div className="eyebrow">§ 02 · Problem</div>
          <h2 className="h-section">
            Every system needed its own approval flow.
            <br />
            <em>Patients re-signed the same consent on three apps.</em>
          </h2>
          <p className="h-lede">
            A modern hospital network runs on a multi-vendor stack. Each
            vendor — clinical software, back-office, CRM, mobile — shipped
            its own way to collect a signature, a consent, a KYC. None of
            them spoke to the others. An approval signed in Medify
            couldn&rsquo;t be reused in Glintt. A KYC done in the mobile
            app didn&rsquo;t carry over to NewSoft. GDPR compliance had to
            be re-proven per integration.
          </p>
        </div>

        <div className="problem__grid">
          <article className="problem__card">
            <div className="problem__card-eye">What&rsquo;s happening</div>
            <h3>Each vendor reimplements signatures, KYCs, consents.</h3>
            <p>
              Every clinical or admin system needs human approvals — but
              every one of them builds it differently. Same patient,
              different flows, different storage, different proof formats.
              Approvals end up trapped inside whichever app collected them.
            </p>
            <div className="problem__chain">
              <b>medify</b>
              <span className="arrow">·</span>
              <b>glintt</b>
              <span className="arrow">·</span>
              <b>newsoft</b>
              <span className="arrow">→</span>
              <span className="red">duplicated</span>
            </div>
          </article>
          <article className="problem__card">
            <div className="problem__card-eye">What it costs</div>
            <h3>Approvals can&rsquo;t travel between systems.</h3>
            <p>
              An informed consent signed at admission doesn&rsquo;t reach
              the OR system. A GDPR consent given in the mobile app
              doesn&rsquo;t propagate to the back-office. Patients sign
              the same thing two or three times. Audit becomes a
              reconstruction exercise across disconnected vendors.
            </p>
            <div className="problem__chain">
              <span className="red">trapped per app</span>
              <span className="arrow">·</span>
              <b>&ldquo;did the patient already sign this?&rdquo;</b>
            </div>
          </article>
        </div>

        <div className="problem__verdict">
          <div className="problem__verdict-q">
            One patient, one approval, three apps re-asking for it.{" "}
            <em>Not anymore.</em>
          </div>
          <div className="problem__verdict-tag">§ 02 · close</div>
        </div>
      </div>
    </section>
  );
}
