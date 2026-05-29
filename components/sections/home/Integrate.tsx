export function Integrate() {
  return (
    <section className="ipath" data-screen-label="11 Integrate">
      <div className="ipath__wrap">
        <header className="ipath__head">
          <div className="ipath__head-text">
            <div className="ipath__eyebrow">Integration</div>
            <h2 className="ipath__title">
              Integrates into any execution path.
            </h2>
            <p className="ipath__sub">
              Your systems already decide who can act. Humanos allows external
              systems and autonomous workflows to verify what they were actually
              allowed to do before execution.
            </p>
            <p className="ipath__sub">
              Drop <code>verify()</code> into agents, workflows, APIs, ERPs,
              CRMs, or internal tools.
            </p>
          </div>
          <div className="ipath__pills" aria-hidden="true">
            <span className="ipath__pill is-active">
              <span className="dot" />
              5-min integration
            </span>
            <span className="ipath__sep">·</span>
            <span className="ipath__pill">Runtime verification</span>
            <span className="ipath__sep">·</span>
            <span className="ipath__pill">Existing systems</span>
          </div>
        </header>

        <div className="ipath__cards">
          {/* CARD 1 / SDK · MCP · API · Agents */}
          <article className="ipath__card ipath__card--primary">
            <div className="ipath__card-visual">
              <div
                className="vchain-v"
                aria-label="verify() resolves to one of three outcomes: blocked, approval, or authorized"
              >
                <span className="ipath-pill ipath-pill--active">
                  <span className="dot" />
                  verify()
                </span>
                <span className="vchain-v__conn" />
                <span className="ipath-pill">
                  <span className="dot" />
                  blocked
                </span>
                <span className="vchain-v__conn" />
                <span className="ipath-pill">
                  <span className="dot" />
                  approval
                </span>
                <span className="vchain-v__conn" />
                <span className="ipath-pill">
                  <span className="dot" />
                  authorized
                </span>
              </div>
            </div>
            <div className="ipath__card-body">
              <div className="ipath__card-tag">SDK · MCP · API · Agents</div>
              <h3 className="ipath__card-h">
                Add <code>verify()</code> to any system.
              </h3>
              <p className="ipath__card-sub">
                Verify actions at runtime. Block, request approval, or resume
                execution — all in one call.
              </p>

              <div className="ipath__card-divider" />
              <div className="ipath__card-tags">
                {[
                  "TypeScript",
                  "Python",
                  "Go",
                  "REST",
                  "MCP",
                  "Claude",
                  "Cursor",
                ].map((t) => (
                  <span key={t} className="ipath__chip">
                    {t}
                  </span>
                ))}
              </div>
              <a className="ipath__card-link" href="#">
                Run verify() <span className="arrow">→</span>
              </a>
            </div>
          </article>

          {/* CARD 2 / Workflows */}
          <article className="ipath__card">
            <div className="ipath__card-visual">
              <div
                className="vlinear"
                aria-label="Trigger then verify() then Action"
              >
                <span className="ipath-box">Trigger</span>
                <span className="vlinear__seg" />
                <span className="ipath-box ipath-box--verify">verify()</span>
                <span className="vlinear__seg" />
                <span className="ipath-box">Action</span>
              </div>
            </div>
            <div className="ipath__card-body">
              <div className="ipath__card-tag">Workflows</div>
              <h3 className="ipath__card-h">
                Control <code>actions</code> in automation flows.
              </h3>
              <p className="ipath__card-sub">
                Drop a verify step into Zapier, n8n, or skills before actions
                execute.
              </p>

              <div className="ipath__card-divider" />
              <div className="ipath__card-tags">
                {["Zapier", "n8n", "Skills"].map((t) => (
                  <span key={t} className="ipath__chip">
                    {t}
                  </span>
                ))}
              </div>
              <a className="ipath__card-link" href="#">
                Open template <span className="arrow">→</span>
              </a>
            </div>
          </article>

          {/* CARD 3 / Existing stack */}
          <article className="ipath__card">
            <div className="ipath__card-visual">
              <svg
                viewBox="0 0 320 120"
                width="100%"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="SAP, Salesforce, Internal API converge into verify() then execute"
              >
                <defs>
                  <marker
                    id="ipathArrow2"
                    viewBox="0 0 8 8"
                    refX="7"
                    refY="4"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto"
                  >
                    <path
                      d="M0,0 L8,4 L0,8"
                      fill="none"
                      stroke="#C9C4B7"
                      strokeWidth="1.2"
                      strokeLinejoin="miter"
                    />
                  </marker>
                </defs>

                <g
                  fontFamily="JetBrains Mono, ui-monospace, monospace"
                  fontSize="9"
                  letterSpacing="1.2"
                  fill="#2A2A28"
                >
                  <rect
                    x="4"
                    y="8"
                    width="78"
                    height="22"
                    rx="3"
                    fill="#FFFFFF"
                    stroke="#C9C4B7"
                  />
                  <text x="43" y="23" textAnchor="middle">
                    SAP
                  </text>

                  <rect
                    x="4"
                    y="49"
                    width="78"
                    height="22"
                    rx="3"
                    fill="#FFFFFF"
                    stroke="#C9C4B7"
                  />
                  <text x="43" y="64" textAnchor="middle">
                    SALESFORCE
                  </text>

                  <rect
                    x="4"
                    y="90"
                    width="78"
                    height="22"
                    rx="3"
                    fill="#FFFFFF"
                    stroke="#C9C4B7"
                  />
                  <text x="43" y="105" textAnchor="middle">
                    INTERNAL API
                  </text>
                </g>

                <g fill="none" stroke="#C9C4B7" strokeWidth="1">
                  <path d="M82 19  C 120 19, 130 60, 168 60" />
                  <path d="M82 60  L 168 60" />
                  <path d="M82 101 C 120 101, 130 60, 168 60" />
                </g>

                <g>
                  <rect
                    x="168"
                    y="46"
                    width="68"
                    height="28"
                    rx="14"
                    fill="rgba(75,73,202,0.08)"
                    stroke="rgba(75,73,202,0.32)"
                  />
                  <text
                    x="202"
                    y="64"
                    textAnchor="middle"
                    fontFamily="JetBrains Mono, ui-monospace, monospace"
                    fontSize="11"
                    fill="#4B49CA"
                  >
                    verify()
                  </text>
                </g>

                <line
                  x1="236"
                  y1="60"
                  x2="266"
                  y2="60"
                  stroke="#C9C4B7"
                  strokeWidth="1"
                  markerEnd="url(#ipathArrow2)"
                />

                <g>
                  <rect
                    x="266"
                    y="48"
                    width="52"
                    height="24"
                    rx="3"
                    fill="rgba(31,138,91,0.08)"
                    stroke="rgba(31,138,91,0.32)"
                  />
                  <text
                    x="292"
                    y="64"
                    textAnchor="middle"
                    fontFamily="JetBrains Mono, ui-monospace, monospace"
                    fontSize="9"
                    letterSpacing="1.2"
                    fill="#1F8A5B"
                  >
                    EXECUTE
                  </text>
                </g>
              </svg>
            </div>
            <div className="ipath__card-body">
              <div className="ipath__card-tag">Existing stack</div>
              <h3 className="ipath__card-h">
                Works with your <code>current</code> systems.
              </h3>
              <p className="ipath__card-sub">
                Verify actions in front of ERP, CRM, payments, or internal
                tools. No rewrites required.
              </p>

              <div className="ipath__card-divider" />
              <div className="ipath__card-tags">
                {["SAP", "Salesforce", "NetSuite", "Internal APIs"].map((t) => (
                  <span key={t} className="ipath__chip">
                    {t}
                  </span>
                ))}
              </div>
              <a className="ipath__card-link" href="#">
                Test with your stack <span className="arrow">→</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
