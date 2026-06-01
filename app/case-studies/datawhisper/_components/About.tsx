export function About() {
  return (
    <section className="section" data-screen-label="02 About">
      <div className="wrap">
        <div className="eyebrow">§ 01 · The customer</div>
        <div className="cust__grid">
          <div className="cust__copy">
            <h2>
              The governance-first agentic OS for regulated industries.
            </h2>
            <p>
              <strong>SmartInsights.CortexOS</strong> orchestrates multi-agent
              teams, called <strong>Pelotons</strong>, inside enterprise
              workflows: onboarding, dispute resolution, claims, KYC,
              attestations. Governance is enforced at the infrastructure
              boundary, not inside a prompt. Every action passes an{" "}
              <strong>18-stage tool gateway</strong> and is recorded in a
              hash-chained, tamper-evident audit trail.
            </p>
            <p>
              Inside SmartInsights.CortexOS, the human-in-the-loop (HITL)
              engine holds legally consequential actions at an approval gate.
              For the defined class where the approving party is external, or
              the proof must be independently verifiable, it calls Humanos.{" "}
              <strong>GuardianShield</strong>, the governance and audit plane,
              records and proves it — branded inside CortexOS as{" "}
              <strong>GuardianShield Consent</strong>.
            </p>
            <p>
              Explore SmartInsights.CortexOS at{" "}
              <a
                href="https://www.datawhisper.co.uk"
                target="_blank"
                rel="noopener noreferrer"
              >
                datawhisper.co.uk
              </a>
              .
            </p>
          </div>

          <div className="cust__card">
            <div className="cust__card-head">
              <div className="cust__card-name">DataWhisper</div>
              <div className="cust__card-status">Integrated</div>
            </div>
            <div className="cust__rows">
              <div className="cust__row">
                <div className="cust__row-k">Channels</div>
                <div className="cust__row-v">Channel governance</div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Agents</div>
                <div className="cust__row-v">
                  Agentic AI Governance · HITL engine
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Core</div>
                <div className="cust__row-v">
                  Orchestration · memory · identity
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Roots</div>
                <div className="cust__row-v">
                  GuardianShield · GuardianShield Consent
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Runtime</div>
                <div className="cust__row-v mono">
                  SmartInsights.CortexOS · v5.2
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Integration</div>
                <div className="cust__row-v mono">
                  humanos.verify() · one call
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Site</div>
                <div className="cust__row-v">
                  <a
                    href="https://www.datawhisper.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    datawhisper.co.uk&nbsp;↗
                  </a>
                </div>
              </div>
              <div className="cust__row">
                <div className="cust__row-k">Anchored</div>
                <div className="cust__row-v mono">2026-05-29 · v2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
