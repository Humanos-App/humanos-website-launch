export function UseCases() {
  return (
    <section className="section" data-screen-label="11 Use cases">
      <div className="wrap">
        <div className="uc__head">
          <div className="eyebrow">§ 09 · Use cases</div>
          <h2 className="h-section">
            Anywhere agents{" "}
            <em
              style={{
                fontStyle: "normal",
                color: "var(--hm-verification)",
              }}
            >
              move capital.
            </em>
          </h2>
        </div>

        <div className="uc__grid">
          {[
            {
              num: "01",
              h3: "Treasury",
              p: "Sweep, rebalance, and allocate liquidity across operating accounts and yield venues.",
              pills: ["transfer", "rebalance", "sweep"],
            },
            {
              num: "02",
              h3: "Crypto / DeFi",
              p: "Allocate capital across exchanges, vaults, and on-chain protocols on autonomous schedules.",
              pills: ["deposit", "swap", "stake"],
            },
            {
              num: "03",
              h3: "Trading systems",
              p: "Run strategies across venues, with strict limits set for each venue, each asset, and each time window.",
              pills: ["order", "hedge", "close"],
            },
            {
              num: "04",
              h3: "Market makers",
              p: "Coordinate inventory and quote risk across multiple environments and counterparties.",
              pills: ["quote", "move inventory", "settle"],
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
