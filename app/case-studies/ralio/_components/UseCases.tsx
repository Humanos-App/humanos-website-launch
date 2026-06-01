export function UseCases() {
  return (
    <section className="section" data-screen-label="11 Use cases">
      <div className="wrap">
        <div className="uc__head">
          <div className="eyebrow">§ 09 · Use cases</div>
          <h2 className="h-section">
            Anywhere agents transact with{" "}
            <em
              style={{
                fontStyle: "normal",
                color: "var(--hm-verification)",
              }}
            >
              external counterparties.
            </em>
          </h2>
        </div>

        <div className="uc__grid">
          {[
            {
              num: "01",
              h3: "B2B procurement",
              p: "Execute purchases on external B2B marketplaces — hardware, software, services.",
              pills: ["purchase", "renewal", "subscription"],
            },
            {
              num: "02",
              h3: "Marketplaces",
              p: "Buy on marketplaces and aggregators with authorization the marketplace itself can verify before clearing the order.",
              pills: ["checkout", "bid", "settle"],
            },
            {
              num: "03",
              h3: "Payment processors",
              p: "Card networks and acquirers verify agent-initiated charges against a human mandate before authorizing the transaction.",
              pills: ["charge", "capture", "refund"],
            },
            {
              num: "04",
              h3: "Cross-org workflows",
              p: "Agents acting across partner systems, verified independently by every system they touch.",
              pills: ["delegate", "attest", "audit"],
            },
          ].map((c) => (
            <article key={c.num} className="uc__card">
              <div className="uc__num">{c.num}</div>
              <div className="uc__body">
                <h3>{c.h3}</h3>
                <p>{c.p}</p>
              </div>
              <div className="uc__verify">
                <div className="uc__verify-label">Verify before execution</div>
                <div className="uc__verify-pills">
                  {c.pills.map((pill) => (
                    <span key={pill} className="uc__pill">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
