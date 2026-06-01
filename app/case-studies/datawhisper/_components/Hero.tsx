export function Hero() {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="wrap">
        <div className="hero__meta">
          <span className="hero__meta-mark">Case study</span>
          <span className="hero__meta-sep">·</span>
          <span>DataWhisper × Humanos</span>
          <span className="hero__meta-sep">·</span>
          <span>cs_datawhisper · v2 · anchored 2026-05-29</span>
        </div>
        <h1>
          DataWhisper&rsquo;s agents act autonomously inside regulated
          workflows.
        </h1>
        <p className="hero__sub">
          <strong>SmartInsights.CortexOS</strong> is integrating with Humanos
          so relevant legally consequential actions an agent takes are{" "}
          <em>verified, and proved, before execution.</em>
        </p>
        <p className="hero__sub">
          SmartInsights.CortexOS is the governance-first agentic operating
          system for regulated industries. Humanos integrates as its{" "}
          <strong>external mandate verifier</strong>, branded{" "}
          <strong>GuardianShield Consent</strong>: the layer that lets a
          SmartInsights.CortexOS agent prove a human authorized an action,
          to any party.
        </p>

        <div className="hero__quickstats">
          <div className="hero__qs">
            <div className="hero__qs-k">Customer</div>
            <div className="hero__qs-v">
              DataWhisper
              <small>Autonomous AI for regulated industries</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Surface area</div>
            <div className="hero__qs-v">
              Legally consequential actions
              <small>Disputes · Settlements · KYC · Attestations</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Integration</div>
            <div className="hero__qs-v">
              humanos.verify()
              <small>External mandate verifier at the HITL gate</small>
            </div>
          </div>
          <div className="hero__qs">
            <div className="hero__qs-k">Runtime</div>
            <div className="hero__qs-v">
              SmartInsights.CortexOS
              <small>GuardianShield Governance · v5.2</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
