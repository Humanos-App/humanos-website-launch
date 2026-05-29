export function UseCases() {
  return (
    <section className="section" data-screen-label="11 Use cases">
      <div className="wrap">
        <div className="uc__head">
          <div className="eyebrow">§ 09 · Use cases</div>
          <h2 className="h-section">
            Anywhere an agent moves money{" "}
            <em
              style={{
                fontStyle: "normal",
                color: "var(--hm-verification)",
              }}
            >
              on behalf of a human.
            </em>
          </h2>
        </div>

        <div className="uc__grid">
          <article className="uc__card">
            <div className="uc__num">01</div>
            <div className="uc__body">
              <h3>Autonomous procurement</h3>
              <p>
                Agents pay suppliers and vendors. Every transfer scoped to an
                approved IBAN and amount, authorized at settlement, carrying a
                portable receipt.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">Verify before settlement</div>
              <div className="uc__verify-pills">
                <span className="uc__pill">pay</span>
                <span className="uc__pill">transfer</span>
                <span className="uc__pill">settle</span>
              </div>
            </div>
          </article>

          <article className="uc__card">
            <div className="uc__num">02</div>
            <div className="uc__body">
              <h3>Subscriptions &amp; recurring spend</h3>
              <p>
                Agents top up balances and pay recurring invoices. Humanos
                verifies each charge sits inside the mandate — within the limit,
                to an allowed IBAN — before it settles.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">Verify before settlement</div>
              <div className="uc__verify-pills">
                <span className="uc__pill">charge</span>
                <span className="uc__pill">renew</span>
                <span className="uc__pill">cap</span>
              </div>
            </div>
          </article>

          <article className="uc__card">
            <div className="uc__num">03</div>
            <div className="uc__body">
              <h3>Treasury &amp; disbursements</h3>
              <p>
                Payouts, refunds, cross-border transfers. The agent proposes;
                Humanos verifies authority and emits a Receipt the counterparty
                can verify independently, on-chain.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">Verify before settlement</div>
              <div className="uc__verify-pills">
                <span className="uc__pill">payout</span>
                <span className="uc__pill">refund</span>
                <span className="uc__pill">fx</span>
              </div>
            </div>
          </article>

          <article className="uc__card">
            <div className="uc__num">04</div>
            <div className="uc__body">
              <h3>Marketplace settlement</h3>
              <p>
                The Paymove agent settles on behalf of a human account owner
                across every counterparty it pays. Every payment carries the
                owner&rsquo;s mandate — verifiable by every party it touches.
              </p>
            </div>
            <div className="uc__verify">
              <div className="uc__verify-label">Verify before settlement</div>
              <div className="uc__verify-pills">
                <span className="uc__pill">escrow</span>
                <span className="uc__pill">release</span>
                <span className="uc__pill">attest</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
