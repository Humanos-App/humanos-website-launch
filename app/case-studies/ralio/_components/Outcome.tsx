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
              <b>01</b> · Verify
            </div>
            <h3>Every transaction verified before execution.</h3>
            <p>
              Nothing settles on assumption. The verify call is non-optional
              and inline at the merchant boundary, alongside Ralio&rsquo;s
              controls on the agent side.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>02</b> · Portable
            </div>
            <h3>Authorization travels with the action.</h3>
            <p>
              Issue once, verify anywhere. The same mandate works across
              merchants, processors, networks, and acquirers.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>03</b> · Independent
            </div>
            <h3>External counterparties verify directly.</h3>
            <p>
              Merchants check authority against Humanos directly. No bilateral
              relationship with the agent&rsquo;s operator is required.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>04</b> · Audit
            </div>
            <h3>Independent audit trail at the merchant boundary.</h3>
            <p>
              Each transaction emits a verifiable record attached to the
              settlement. Auditors query Humanos directly, with no internal
              log access required.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>05</b> · Update
            </div>
            <h3>Change rules without code changes.</h3>
            <p>
              Issue a new mandate. Revoke the old one. Effective immediately,
              everywhere a system verifies.
            </p>
          </article>
          <article className="outc__card">
            <div className="outc__num">
              <b>06</b> · Recover
            </div>
            <h3>Recover missing authorization in real time.</h3>
            <p>
              Out-of-scope action? Humanos collects approval (SMS, API, KYC)
              and resumes execution once the mandate is updated.
            </p>
          </article>
        </div>

        <div className="outc__verdict">
          Agents transact safely in the open economy —{" "}
          <em>within provable, externally verifiable boundaries.</em>
        </div>
      </div>
    </section>
  );
}
