export function Category() {
  return (
    <section className="section" data-screen-label="13 Category">
      <div className="wrap">
        <div className="eyebrow">§ 11 · Category definition</div>
        <div className="cat__grid">
          <div className="cat__head">
            <h2>
              Humanos is the approval OS across the Lusíadas ecosystem —{" "}
              <em>
                the moment a human action needs to be authorized.
              </em>
            </h2>
            <p>
              At that moment, the approval must be unified across every
              system, portable across every vendor, and future-proofed for
              the agents that come next. Everything else follows.
            </p>
          </div>
          <div className="cat__attrs">
            <div className="cat__attr">
              <div className="cat__attr-eye">Unified</div>
              <h4>One API, every system.</h4>
              <p>
                Medify, Glintt, NewSoft, Pipedrive, internal apps and the
                mobile app all consume the same single approval endpoint.
              </p>
            </div>
            <div className="cat__attr">
              <div className="cat__attr-eye">Portable</div>
              <h4>An approval works wherever it&rsquo;s needed.</h4>
              <p>
                Signed once. Verifiable everywhere. Patients and
                clinicians never re-sign what the ecosystem already has.
              </p>
            </div>
            <div className="cat__attr">
              <div className="cat__attr-eye">Future-proof</div>
              <h4>Humans today, agents tomorrow.</h4>
              <p>
                The same API serves human approvals now and the AI agents
                that will act on behalf of those humans next.
              </p>
            </div>
          </div>
        </div>

        <div className="cat__close">
          <div className="cat__close-bad">
            Each system reimplements approvals.
          </div>
          <div className="cat__close-good">
            Every system shares one approval layer.
          </div>
        </div>
      </div>
    </section>
  );
}
