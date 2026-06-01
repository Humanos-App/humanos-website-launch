export function Category() {
  return (
    <section className="section" data-screen-label="13 Category">
      <div className="wrap">
        <div className="eyebrow">§ 11 · Category definition</div>
        <div className="cat__grid">
          <div className="cat__head">
            <h2>
              Humanos operates at the moment an agent transacts{" "}
              <em>in the open economy.</em>
            </h2>
            <p>
              At that moment, authorization must be verified, the decision must
              be deterministic, and the outcome must be provable. Everything
              else follows.
            </p>
          </div>
          <div className="cat__attrs">
            <div className="cat__attr">
              <div className="cat__attr-eye">Portable</div>
              <h4>Authorization moves with the action.</h4>
              <p>
                Across organizations, marketplaces, processors, and networks.
              </p>
            </div>
            <div className="cat__attr">
              <div className="cat__attr-eye">Independently verifiable</div>
              <h4>External counterparties check authority directly.</h4>
              <p>No bilateral relationship with the agent operator required.</p>
            </div>
            <div className="cat__attr">
              <div className="cat__attr-eye">Provable</div>
              <h4>Every transaction carries a portable receipt.</h4>
              <p>Anyone can verify it. Forever.</p>
            </div>
          </div>
        </div>

        <div className="cat__close">
          <div className="cat__close-bad">
            Authorization stays local to each system.
          </div>
          <div className="cat__close-good">
            Authorization becomes network infrastructure.
          </div>
        </div>
      </div>
    </section>
  );
}
