export function About() {
  return (
    <section className="section" data-screen-label="02 About">
      <div className="wrap">
        <div className="eyebrow">§ 01 · About the customer</div>
        <div className="cust__grid">
          <div className="cust__copy">
            <h2>
              Lusíadas is a national private hospital network running on a
              multi-vendor clinical stack.
            </h2>
            <p>
              Their ecosystem spans third-party clinical and back-office
              software — <b>Medify</b>, <b>Glintt</b>, <b>NewSoft</b>,{" "}
              <b>Pipedrive</b> — and their own internal systems and patient
              mobile app. Every one of those surfaces eventually needs the
              same thing: a signed, verifiable human approval — a consent,
              a KYC, a signature, a prescription.
            </p>
            <p>
              Humanos sits across the ecosystem as a global, independent{" "}
              <b>approval OS</b>. One API any system can call. Approvals
              are collected once, anchored as portable proofs, and
              verifiable from any other system that needs them — making
              every clinical and administrative process faster, safer, and
              audit-ready by default.
            </p>
          </div>
          <div className="cust__card">
            <div className="cust__card-head">
              <div className="cust__card-name">Lusíadas</div>
              <div className="cust__card-status">Integrated</div>
            </div>
            <div className="cust__rows">
              <div className="cust__row">
                <div className="cust__row-k">Domain</div>
                <div className="cust__row-v">
                  National private hospital network
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Surface area</div>
                <div className="cust__row-v">
                  Consents · KYCs · Signatures · Prescriptions
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Stack</div>
                <div className="cust__row-v mono">
                  Medify · Glintt · NewSoft · Pipedrive · mobile
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Integration</div>
                <div className="cust__row-v mono">
                  humanos.requestApproval() · global approval OS
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Site</div>
                <div className="cust__row-v">
                  <a
                    href="https://www.lusiadas.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    lusiadas.pt&nbsp;↗
                  </a>
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Anchored</div>
                <div className="cust__row-v mono">2026-05-29 · v1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
