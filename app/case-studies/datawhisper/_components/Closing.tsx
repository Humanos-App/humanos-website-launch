import { EXTERNAL_LINKS } from "@/lib/external-links";

export function Closing() {
  return (
    <section className="section" data-screen-label="08 Closing">
      <div className="wrap">
        <div className="cat__head">
          <div className="eyebrow">§ 07 · Close</div>
          <h2 className="h-section">
            AI agents execute inside regulated environments,{" "}
            <em>within provable, independently verifiable boundaries.</em>
          </h2>
          <p>
            DataWhisper · Autonomous AI for regulated industries ·
            datawhisper.co.uk
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 32,
              flexWrap: "wrap",
            }}
          >
            <a
              className="btn btn--primary"
              href="https://www.datawhisper.co.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore SmartInsights.CortexOS{" "}
              <span className="arrow">→</span>
            </a>
            <a
              className="btn btn--ghost"
              href={EXTERNAL_LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk with us <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
