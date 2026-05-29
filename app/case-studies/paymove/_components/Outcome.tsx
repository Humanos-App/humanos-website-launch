export function Outcome() {
  return (
    <section className="section" data-screen-label="07 Outcome">
      <div className="wrap">
        <div className="outc__head">
          <div className="eyebrow">§ 04 · Outcome</div>
          <h2 className="h-section">
            What you get
            <br />
            <em>the moment it&rsquo;s wired in.</em>
          </h2>
        </div>

        <div className="outc__grid">
          <article className="outc__card">
            <div className="outc__num">
              <b>01</b> · Verify
            </div>
            <h3>Every high-value spend verified before settlement.</h3>
            <p>
              Nothing settles on assumption. The verify call is non-optional
              and inline — in the settlement path, before money moves on the
              Visa rail, not after the agent has already spent.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>02</b> · Deterministic
            </div>
            <h3>Probabilistic agent, deterministic answer.</h3>
            <p>
              The agent stays probabilistic where it matters (reasoning,
              context). The spend-or-not boundary becomes a yes/no — no LLM in
              the verification path.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>03</b> · Auditable
            </div>
            <h3>Auditability without rebuilding logs.</h3>
            <p>
              Every settled payment emits a portable Receipt, with the mandate
              hash anchored on-chain. Both parties verify directly; they
              don&rsquo;t reconstruct from one side&rsquo;s database.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>04</b> · Recover
            </div>
            <h3>Recover missing authorization in real time.</h3>
            <p>
              Over the limit or an unknown IBAN? Humanos collects approval (OTP
              by SMS, link by email, KYC), updates the mandate, and resumes
              settlement once authorization is valid. No silent spends.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>05</b> · Portable
            </div>
            <h3>Authorization travels with the payment.</h3>
            <p>
              Issue once; verify anywhere. The mandate authorizes spend to a
              specific IBAN and amount, so the boundary travels with the
              transaction — independent of which system executes it.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>06</b> · Counterparty-scoped
            </div>
            <h3>Scoped to the IBAN, not a category.</h3>
            <p>
              The mandate authorizes this amount, to this counterparty — not a
              coarse spending category. The boundary is the IBAN and the limit,
              cryptographically signed by a human.
            </p>
          </article>
        </div>

        <div className="outc__verdict">
          Agents move real money on the Visa rail —{" "}
          <em>within provable, independently verifiable boundaries.</em>
        </div>
      </div>
    </section>
  );
}
