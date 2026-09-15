import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Humanos is building the Risk Network for AI — infrastructure to measure, control and transfer the risk created by autonomous systems.",
  alternates: { canonical: "/company" },
};

/** Who currently sees which slice of AI risk, and in which silo. */
const SIGNALS: [string, string][] = [
  ["AI platforms", "see agent activity."],
  ["Infrastructure providers", "see runtime events."],
  ["Governance systems", "see controls."],
  ["Enterprises", "see business outcomes."],
  ["Banks", "see financial exposure."],
  ["Insurers", "see underwriting and claims."],
  ["Auditors and compliance", "see evidence."],
];

/** What happens at one node, and where it can be reused. */
const REUSE: { from: string; fromLine: string; to: string; toLine: string }[] = [
  {
    from: "Platform",
    fromLine: "An agent proves months of low-risk operation.",
    to: "Customer",
    toLine: "Uses that history instead of starting its evaluation from zero.",
  },
  {
    from: "Control",
    fromLine:
      "A guardrail is continuously enforced by one infrastructure provider.",
    to: "Insurer",
    toLine:
      "Can use verified evidence of that control when evaluating residual risk.",
  },
  {
    from: "Agent",
    fromLine: "Builds a verified history across thousands of actions.",
    to: "Bank",
    toLine:
      "Can use that risk profile when deciding what the agent is allowed to do.",
  },
  {
    from: "Enterprise",
    fromLine: "Generates verified runtime evidence.",
    to: "Auditor",
    toLine:
      "Can verify what happened without reconstructing the entire system.",
  },
];

/** Nodes around the network, as fractions of a circle starting at the top. */
const NODES = [
  "AI PLATFORM",
  "AGENT",
  "ENTERPRISE",
  "INFRASTRUCTURE",
  "WALLET",
  "BANK",
  "INSURER",
  "COMPLIANCE",
  "AUDITOR",
];

function NetworkMap() {
  const w = 920;
  const h = 520;
  const cx = w / 2;
  const cy = h / 2;
  const rx = 372;
  const ry = 196;

  const points = NODES.map((label, i) => {
    const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
    return { label, x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry };
  });

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Humanos sits between AI platforms, agents, enterprises, infrastructure, wallets, banks, insurers, compliance teams and auditors, carrying risk information between them.">
      {/* every node reaches the network, and the network reaches every node */}
      {points.map((p) => (
        <line
          key={`s-${p.label}`}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke="var(--hm-line)"
          strokeWidth="1"
        />
      ))}
      {/* the rim: risk that travels between nodes, through the network */}
      {points.map((p, i) => {
        const n = points[(i + 1) % points.length];
        return (
          <line
            key={`r-${p.label}`}
            x1={p.x}
            y1={p.y}
            x2={n.x}
            y2={n.y}
            stroke="var(--hm-line)"
            strokeWidth="1"
            strokeDasharray="2 5"
          />
        );
      })}

      {points.map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="4" fill="var(--hm-ink-3)" />
          <text
            x={p.x}
            y={p.y + (p.y < cy ? -16 : 24)}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11.5"
            letterSpacing="1.4"
            fill="var(--hm-ink-2)"
          >
            {p.label}
          </text>
        </g>
      ))}

      <rect
        x={cx - 148}
        y={cy - 40}
        width="296"
        height="80"
        fill="var(--hm-verification)"
      />
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="15"
        letterSpacing="2"
        fill="#F4F3EF"
      >
        HUMANOS
      </text>
      <text
        x={cx}
        y={cy + 18}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="1.6"
        fill="#C6C4FF"
      >
        THE RISK NETWORK FOR AI
      </text>
    </svg>
  );
}

export default function CompanyPage() {
  return (
    <div className="company-page">
      {/* 01 · HERO */}
      <section className="intro" data-screen-label="01 Company">
        <div className="intro__grid-bg" aria-hidden="true" />
        <div className="intro__glow" aria-hidden="true" />
        <div className="wrap">
          <div className="intro__inner">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Company
            </span>
            <h1 className="h-lead">Building the Risk Network for AI.</h1>

            <div className="intro__body">
              <p className="body-lg">
                AI is becoming capable of moving money, accessing data, making
                decisions and acting across organizations.
              </p>
              <p className="body-lg">
                But the infrastructure for{" "}
                <span className="hl">
                  understanding, controlling and transferring the risk
                </span>{" "}
                behind those actions wasn&rsquo;t built for autonomous systems.
              </p>
              <p className="body-lg">
                <span className="hl">We&rsquo;re building it.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · TEAM PHOTO */}
      <section className="team" data-screen-label="02 Team">
        <div className="wrap">
          <div className="team__photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/founders.jpg" alt="The Humanos team" />
          </div>
          <div className="team__caption">
            <span className="mark" aria-hidden="true" />
            The Humanos team is spread across the US and Europe.
          </div>
        </div>
      </section>

      {/* 03 · THE PROBLEM */}
      <section className="why" data-screen-label="03 Why Humanos">
        <div className="why__glow" aria-hidden="true" />
        <div className="wrap">
          <div className="why__inner">
            <span className="eyebrow eyebrow--dark">
              <span className="dot" aria-hidden="true" />
              Why Humanos
            </span>
            <h2>
              AI can act. <span className="q">But who carries the risk?</span>
            </h2>
            <div className="why__body">
              <p>
                Every consequential AI action creates{" "}
                <span className="hl">exposure</span>. As agents gain more
                autonomy, organizations need to decide whether to trust them,
                approve them, give them more authority, finance them or insure
                them.
              </p>
              <p>
                But AI changes continuously. A questionnaire completed six
                months ago cannot tell you how an agent is operating today.
              </p>
              <p>
                Static assessments tell you what the risk{" "}
                <span className="hl">was</span>. AI requires infrastructure that
                tells you what the risk <span className="hl">is</span>.
              </p>
            </div>

            <div className="contrast">
              <div className="contrast__col">
                <div className="contrast__label">Static risk</div>
                <div className="contrast__step">Questionnaire</div>
                <div className="contrast__arrow">↓</div>
                <div className="contrast__step">Point-in-time assessment</div>
                <div className="contrast__arrow">↓</div>
                <div className="contrast__step">Decision</div>
              </div>
              <div className="contrast__col contrast__col--live">
                <div className="contrast__label">AI risk</div>
                <div className="contrast__step">Runtime activity</div>
                <div className="contrast__arrow">↓</div>
                <div className="contrast__step">Continuous Risk Score</div>
                <div className="contrast__arrow">↓</div>
                <div className="contrast__step">
                  Controls + Risk Intelligence
                </div>
                <div className="contrast__arrow">↓</div>
                <div className="contrast__step">Continuous decisions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 · THE THESIS */}
      <section className="vision" data-screen-label="04 Our thesis">
        <div className="wrap">
          <div className="vision__inner">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Our thesis
            </span>
            <h2 className="h-section">AI needs a risk reputation.</h2>

            <div className="vision__body">
              <p className="body-lg">
                Today, an AI agent can operate across customers, platforms and
                organizations without carrying a persistent record of how it has
                behaved. Its risk history disappears between systems. Its
                controls are interpreted again. Its trust has to be rebuilt.
              </p>
              <p className="body-lg">
                We believe every AI agent should build a{" "}
                <span className="hl">
                  continuously evolving, verifiable risk profile
                </span>{" "}
                based on how it actually operates — a reputation that becomes
                stronger as the agent proves itself.
              </p>
            </div>

            <div className="creed">
              <span>Measure once.</span>
              <span>Build history continuously.</span>
              <span>Prove it everywhere.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 05 · WHY A NETWORK */}
      <section className="vision" data-screen-label="05 The Risk Network">
        <div className="wrap">
          <div className="vision__inner">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              The Risk Network
            </span>
            <h2 className="h-section">
              Risk shouldn&rsquo;t start from zero every time.
            </h2>

            <div className="signals">
              {SIGNALS.map(([who, what]) => (
                <div className="signals__row" key={who}>
                  <span className="signals__who">{who}</span>
                  <span className="signals__what">{what}</span>
                </div>
              ))}
            </div>

            <div className="netmap">
              <NetworkMap />
              <p className="netmap__note">
                These signals live in separate systems. Humanos creates a shared
                risk layer between them, so{" "}
                <span className="hl">
                  one integration shouldn&rsquo;t create value once
                </span>{" "}
                — it should create a reusable risk reputation across the
                network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 · PORTABLE RISK */}
      <section className="vision" data-screen-label="06 Portable risk">
        <div className="wrap">
          <div className="vision__inner">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Portable risk
            </span>
            <h2 className="h-section">
              Build your risk reputation once. Use it everywhere.
            </h2>

            <div className="vision__body">
              <p className="body-lg">
                An agent&rsquo;s Risk Score, controls, authority, risk history
                and evidence shouldn&rsquo;t disappear when it moves between
                systems. Humanos turns them into a{" "}
                <span className="hl">reusable risk profile</span> that
                authorized participants across the network can verify.
              </p>
            </div>

            <div className="reuse">
              {REUSE.map((r) => (
                <div className="reuse__pair" key={r.from}>
                  <span className="reuse__node">{r.from}</span>
                  <p className="reuse__line">{r.fromLine}</p>
                  <div className="reuse__arrow">↓</div>
                  <span className="reuse__node reuse__node--to">{r.to}</span>
                  <p className="reuse__line">{r.toLine}</p>
                </div>
              ))}
            </div>

            <p className="reuse__claim">
              What happens at one node can create trust at another.
            </p>
          </div>
        </div>
      </section>

      {/* 07 · THE NETWORK EFFECT */}
      <section className="why" data-screen-label="07 The flywheel">
        <div className="why__glow" aria-hidden="true" />
        <div className="wrap">
          <div className="why__inner">
            <span className="eyebrow eyebrow--dark">
              <span className="dot" aria-hidden="true" />
              The flywheel
            </span>
            <h2>Every new participant makes the network more valuable.</h2>

            <div className="flywheel">
              <div className="flywheel__step">More AI activity</div>
              <div className="flywheel__turn">→</div>
              <div className="flywheel__step">More risk evidence</div>
              <div className="flywheel__turn">→</div>
              <div className="flywheel__step">Stronger risk profiles</div>
              <div className="flywheel__turn">→</div>
              <div className="flywheel__step">Better risk decisions</div>
              <div className="flywheel__turn">→</div>
              <div className="flywheel__step flywheel__step--gain">
                More trust
                <br />
                More autonomy
                <br />
                More capital
                <br />
                More insurance
              </div>
            </div>

            <div className="why__body">
              <p>
                As more AI operates through the network, more verified risk
                history is created. Better evidence helps organizations make
                better decisions about AI. Better decisions allow trusted AI to
                take on progressively{" "}
                <span className="hl">more valuable economic activity</span> —
                which creates more AI activity, and turns the wheel again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 08 · THE LONG-TERM VISION */}
      <section className="vision" data-screen-label="08 Our vision">
        <div className="wrap">
          <div className="vision__inner">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Our vision
            </span>
            <h2 className="h-section">AI risk should be portable.</h2>

            <div className="vision__ledger">
              <div className="vision__row">
                <div className="vision__co">The internet</div>
                <div className="vision__did">made information portable.</div>
              </div>
              <div className="vision__row">
                <div className="vision__co">Payment networks</div>
                <div className="vision__did">made money interoperable.</div>
              </div>
              <div className="vision__row">
                <div className="vision__co">Identity networks</div>
                <div className="vision__did">made identity reusable.</div>
              </div>
              <div className="vision__row vision__row--now">
                <div className="vision__co">Humanos</div>
                <div className="vision__did">is making risk portable.</div>
              </div>
            </div>

            <div className="vision__body">
              <p className="body-lg">
                A world where an AI agent doesn&rsquo;t start from zero every
                time it encounters a new customer, platform, bank or insurer.
                Where its identity, authority, controls, behavior and history
                contribute to a{" "}
                <span className="hl">persistent risk reputation</span>. Where
                organizations can verify that reputation instead of rebuilding
                it.
              </p>
              <p className="body-lg">
                And where AI that proves itself can progressively earn more
                trust, more autonomy and access to more economic activity.
              </p>
            </div>

            <div className="creed">
              <span>One Risk Score.</span>
              <span>One Risk Network.</span>
              <span>Any AI. Any stakeholder.</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
