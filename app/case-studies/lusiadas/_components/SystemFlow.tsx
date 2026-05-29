export function SystemFlow() {
  return (
    <section
      className="section section--dark"
      data-screen-label="08 System flow"
    >
      <div className="wrap">
        <div className="flow__head">
          <div className="eyebrow eyebrow--chalk">§ 05 · System flow</div>
          <h2 className="h-section" style={{ color: "var(--hm-chalk-0)" }}>
            System → verify() →
            <br />
            <em>resume → prove.</em>
          </h2>
          <div className="flow__meta">
            <span>Live · 30s loop · request → sign → resume → prove</span>
            <span style={{ color: "var(--hm-line-dark)" }}>·</span>
            <span>
              <b>humanos.requestApproval()</b>
            </span>
          </div>
        </div>

        <div className="flow__diagram">
          <svg
            className="flow__svg"
            viewBox="0 0 1080 360"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker
                id="arrh"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 z" fill="#4B49CA" />
              </marker>
              <marker
                id="arrh2"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 z" fill="#7978E9" />
              </marker>
              <marker
                id="arrh3"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 z" fill="#F3797E" />
              </marker>
            </defs>

            <g
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
              letterSpacing="0.06em"
              fill="#CFCDC6"
            >
              <rect
                x="40"
                y="40"
                width="180"
                height="64"
                rx="2"
                fill="rgba(255,255,255,0.04)"
                stroke="#2A2A28"
              />
              <text x="56" y="64" fill="#F4F3EF" fontWeight="600" fontSize="12">
                Caller
              </text>
              <text x="56" y="84" fill="#8F8D85">
                medify · glintt · mobile
              </text>

              <line
                x1="220"
                y1="72"
                x2="320"
                y2="72"
                stroke="#4B49CA"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                markerEnd="url(#arrh)"
              />

              <rect
                x="320"
                y="32"
                width="200"
                height="80"
                rx="2"
                fill="rgba(75,73,202,0.10)"
                stroke="#4B49CA"
              />
              <text x="336" y="58" fill="#F4F3EF" fontWeight="600" fontSize="12">
                verify()
              </text>
              <text x="336" y="78" fill="#CFCDC6">
                humanos.verify(...)
              </text>
              <text x="336" y="96" fill="#7978E9">
                94ms · deterministic
              </text>

              <line
                x1="520"
                y1="72"
                x2="620"
                y2="72"
                stroke="#4B49CA"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                markerEnd="url(#arrh)"
              />

              <rect
                x="620"
                y="40"
                width="200"
                height="64"
                rx="2"
                fill="rgba(255,255,255,0.04)"
                stroke="#2A2A28"
              />
              <text x="636" y="64" fill="#F4F3EF" fontWeight="600" fontSize="12">
                Approval
              </text>
              <text x="636" y="84" fill="#8F8D85">
                signers · scope · validity
              </text>

              <rect
                x="860"
                y="20"
                width="180"
                height="44"
                rx="2"
                fill="rgba(75,73,202,0.10)"
                stroke="#4B49CA"
              />
              <text x="876" y="46" fill="#4B49CA" fontWeight="600">
                Approve
              </text>
              <text x="924" y="46" fill="#8F8D85">
                signed · valid
              </text>

              <rect
                x="860"
                y="80"
                width="180"
                height="44"
                rx="2"
                fill="rgba(243,121,126,0.10)"
                stroke="#F3797E"
              />
              <text x="876" y="106" fill="#F3797E" fontWeight="600">
                Missing
              </text>
              <text x="936" y="106" fill="#8F8D85">
                step-up
              </text>

              <rect
                x="320"
                y="160"
                width="200"
                height="64"
                rx="2"
                fill="#E4D8C8"
                stroke="#E4D8C8"
              />
              <text x="336" y="184" fill="#111" fontWeight="600">
                Human
              </text>
              <text x="336" y="204" fill="#2A2A28">
                sign · KYC · consent
              </text>

              <line
                x1="420"
                y1="112"
                x2="420"
                y2="160"
                stroke="#F3797E"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                markerEnd="url(#arrh3)"
              />
              <line
                x1="320"
                y1="192"
                x2="220"
                y2="192"
                stroke="#7978E9"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                markerEnd="url(#arrh2)"
              />

              <rect
                x="40"
                y="160"
                width="180"
                height="64"
                rx="2"
                fill="rgba(255,255,255,0.04)"
                stroke="#2A2A28"
              />
              <text x="56" y="184" fill="#F4F3EF" fontWeight="600">
                System
              </text>
              <text x="56" y="204" fill="#8F8D85">
                resumes flow
              </text>

              <line
                x1="130"
                y1="104"
                x2="130"
                y2="160"
                stroke="#4B49CA"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                markerEnd="url(#arrh)"
              />

              <line
                x1="220"
                y1="192"
                x2="320"
                y2="192"
                stroke="#4B49CA"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                markerEnd="url(#arrh)"
              />

              <line
                x1="520"
                y1="192"
                x2="620"
                y2="192"
                stroke="#4B49CA"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                markerEnd="url(#arrh)"
              />

              <rect
                x="620"
                y="160"
                width="200"
                height="64"
                rx="2"
                fill="rgba(75,73,202,0.10)"
                stroke="#4B49CA"
              />
              <text x="636" y="184" fill="#F4F3EF" fontWeight="600">
                Proof
              </text>
              <text x="636" y="204" fill="#8F8D85">
                receipt · anchored
              </text>

              <line
                x1="820"
                y1="192"
                x2="900"
                y2="192"
                stroke="#4B49CA"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                markerEnd="url(#arrh)"
              />

              <rect
                x="900"
                y="156"
                width="140"
                height="22"
                rx="2"
                fill="none"
                stroke="#2A2A28"
              />
              <text x="910" y="172" fill="#CFCDC6">
                Insurance partner
              </text>

              <rect
                x="900"
                y="183"
                width="140"
                height="22"
                rx="2"
                fill="none"
                stroke="#2A2A28"
              />
              <text x="910" y="199" fill="#CFCDC6">
                Auditor
              </text>

              <rect
                x="900"
                y="210"
                width="140"
                height="22"
                rx="2"
                fill="none"
                stroke="#2A2A28"
              />
              <text x="910" y="226" fill="#CFCDC6">
                Regulator
              </text>

              <text
                x="40"
                y="280"
                fill="#8F8D85"
                fontSize="10"
                letterSpacing="0.08em"
              >
                00 · IDLE
              </text>

              <line x1="40" y1="296" x2="1040" y2="296" stroke="#2A2A28" />

              <g fill="#CFCDC6" fontSize="10" letterSpacing="0.06em">
                <text x="40" y="320">01 · Agent prepares</text>
                <text x="200" y="320">02 · verify() called</text>
                <text x="380" y="320">03 · Out of scope</text>
                <text x="540" y="320">04 · Request approval</text>
                <text x="40" y="344">05 · Mandate updated</text>
                <text x="200" y="344">06 · Re-verify · auth</text>
                <text x="380" y="344">07 · Execute</text>
                <text x="540" y="344" fill="#7978E9">
                  08 · Proof emitted
                </text>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
