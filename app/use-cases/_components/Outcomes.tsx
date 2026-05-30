function Check() {
  return (
    <svg
      className="uc-check"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 6.5l2.2 2.2L9.5 3.5" />
    </svg>
  );
}

function Lock() {
  return (
    <svg
      className="uc-ops__lock"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3.5" y="7" width="9" height="6" rx="1.5" />
      <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" strokeLinecap="round" />
    </svg>
  );
}

function Conn() {
  return <span className="uc-conn" aria-hidden="true" />;
}

/* ---- Outcome 1: agents execute only when authorized ---- */
function VizGate() {
  return (
    <div className="uc-viz">
      <div className="uc-viz__status">
        <span className="dot" /> Runtime check
      </div>
      <div className="uc-stack">
        <div className="uc-node">Agent action</div>
        <Conn />
        <div className="uc-node uc-node--verify">humanos.verify()</div>
        <Conn />
        <div className="uc-branch">
          <div className="uc-node uc-node--ok uc-node--sm">
            Execute
            <span className="uc-node__sub">authorized</span>
          </div>
          <div className="uc-node uc-node--block uc-node--sm">
            Block
            <span className="uc-node__sub">denied</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Outcome 2: delegate actions safely ---- */
function VizDelegate() {
  return (
    <div className="uc-viz">
      <div className="uc-viz__status">
        <span className="dot" /> Scoped delegation
      </div>
      <div className="uc-stack">
        <div className="uc-node">User</div>
        <Conn />
        <div className="uc-node uc-node--verify">
          Authorization
          <span className="uc-node__sub">limits attached</span>
        </div>
        <div className="uc-pillrow">
          <span className="uc-chip uc-chip--ok">Amount</span>
          <span className="uc-chip uc-chip--ok">Time</span>
          <span className="uc-chip uc-chip--ok">Scope</span>
          <span className="uc-chip uc-chip--ok">Counterparty</span>
        </div>
        <Conn />
        <div className="uc-node uc-node--sm">Agent</div>
        <Conn />
        <div className="uc-branch">
          <div className="uc-node uc-node--ok uc-node--sm">Within limits</div>
          <div className="uc-node uc-node--block uc-node--sm">Out of scope</div>
        </div>
      </div>
    </div>
  );
}

/* ---- Outcome 3: reuse approvals across systems (radial) ---- */
function VizPortable() {
  const SAT = [
    { x: 180, y: 32, label: "Hospital" },
    { x: 312, y: 112, label: "Insurance" },
    { x: 270, y: 252, label: "Bank" },
    { x: 90, y: 252, label: "Retailer" },
    { x: 48, y: 112, label: "AI Agent" },
  ];
  return (
    <div className="uc-viz">
      <div className="uc-viz__status">
        <span className="dot" /> Portable authorization
      </div>
      <svg className="uc-radial" viewBox="0 0 360 300" aria-hidden="true">
        {SAT.map((s, i) => {
          const d = `M180,150 L${s.x},${s.y}`;
          return (
            <g key={i}>
              <path className="uc-radial__line" d={d} />
              <path
                className="uc-radial__flow"
                d={d}
                style={{ animationDelay: `${i * 0.16}s` }}
              />
            </g>
          );
        })}
        {SAT.map((s, i) => (
          <g key={`n-${i}`}>
            <rect
              className="uc-radial__node"
              x={s.x - 42}
              y={s.y - 17}
              width={84}
              height={34}
              rx={8}
            />
            <text
              className="uc-radial__tx"
              x={s.x}
              y={s.y}
              dominantBaseline="central"
            >
              {s.label}
            </text>
          </g>
        ))}
        <rect
          className="uc-radial__core"
          x={134}
          y={128}
          width={92}
          height={44}
          rx={12}
        />
        <text
          className="uc-radial__core-tx"
          x={180}
          y={150}
          dominantBaseline="central"
        >
          Humanos
        </text>
      </svg>
    </div>
  );
}

/* ---- Outcome 4: agent-to-agent commerce ---- */
function VizA2A() {
  return (
    <div className="uc-viz">
      <div className="uc-viz__status">
        <span className="dot" /> Agent-to-agent
      </div>
      <div className="uc-rail">
        <div className="uc-rail__side">
          <div className="uc-node uc-node--sm">Buyer Agent</div>
          <span className="uc-chip uc-chip--ok">
            <Check /> verified
          </span>
        </div>
        <div className="uc-rail__verify">Verify authorization</div>
        <div className="uc-rail__side">
          <div className="uc-node uc-node--sm">Merchant Agent</div>
          <span className="uc-chip uc-chip--ok">
            <Check /> verified
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---- Outcome 5: prove every decision ---- */
function VizProof() {
  return (
    <div className="uc-viz">
      <div className="uc-viz__status">
        <span className="dot" /> Verifiable receipt
      </div>
      <div className="uc-stack">
        <div className="uc-node uc-node--sm">Action executed</div>
        <Conn />
        <div className="uc-receipt">
          <div className="uc-receipt__title">Execution receipt</div>
          <div className="uc-receipt__row">
            <span className="uc-receipt__k">Action</span>
            <span className="uc-receipt__v">pay_vendor()</span>
          </div>
          <div className="uc-receipt__row">
            <span className="uc-receipt__k">Verified</span>
            <span className="uc-receipt__v">2026-05-30T11:04Z</span>
          </div>
          <div className="uc-receipt__row">
            <span className="uc-receipt__k">Signed</span>
            <span className="uc-receipt__v">0x9f4a…c2e1</span>
          </div>
          <div className="uc-receipt__row">
            <span className="uc-receipt__k">Result</span>
            <span className="uc-receipt__v ok">authorized</span>
          </div>
        </div>
        <Conn />
        <div className="uc-node uc-node--ok uc-node--sm">
          Auditor verifies independently
        </div>
      </div>
    </div>
  );
}

/* ---- Outcome 6: automate high-risk operations ---- */
function VizAutomate() {
  const OPS = [
    "Invoice posting",
    "Treasury allocation",
    "Claims processing",
    "Healthcare workflows",
  ];
  return (
    <div className="uc-viz">
      <div className="uc-viz__status">
        <span className="dot" /> Automated · still authorized
      </div>
      <div className="uc-ops">
        {OPS.map((op) => (
          <div className="uc-ops__row" key={op}>
            <span className="name">
              <Lock />
              {op}
            </span>
            <span className="uc-ops__tag">Automated</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type Outcome = {
  num: string;
  title: React.ReactNode;
  desc: string;
  viz: React.ReactNode;
};

const OUTCOMES: Outcome[] = [
  {
    num: "Outcome 01",
    title: "AI agents execute only when authorized",
    desc: "Before an agent acts, it verifies whether the action is authorized — checked in real time, before execution.",
    viz: <VizGate />,
  },
  {
    num: "Outcome 02",
    title: "Let users delegate actions safely",
    desc: "Users define limits once. Agents operate within those limits automatically — anything outside the approved scope is blocked.",
    viz: <VizDelegate />,
  },
  {
    num: "Outcome 03",
    title: "Reuse approvals across systems",
    desc: "Collect authorization once. Verify it anywhere. Authorization moves between systems without requiring re-approval.",
    viz: <VizPortable />,
  },
  {
    num: "Outcome 04",
    title: "Enable trusted agent-to-agent commerce",
    desc: "Agents transact only when authorization can be independently verified — both sides validate before execution.",
    viz: <VizA2A />,
  },
  {
    num: "Outcome 05",
    title: "Prove every decision",
    desc: "Generate independently verifiable evidence after execution — a signed receipt anyone can check.",
    viz: <VizProof />,
  },
  {
    num: "Outcome 06",
    title: "Automate high-risk operations",
    desc: "Remove approval bottlenecks without removing human control. Approvals become automated execution while authorization checks stay in the path.",
    viz: <VizAutomate />,
  },
];

export function Outcomes() {
  return (
    <section className="uc-sec uc-outcomes">
      <div className="wrap">
        <div className="uc-sec__head">
          <div className="uc-eyebrow">
            <span className="uc-eyebrow__dot" />
            Outcomes enabled by Humanos
          </div>
          <h2 className="uc-sec__title">
            What becomes possible when approval is verifiable.
          </h2>
          <p className="uc-sec__sub uc-sec__sub--center">
            Six things you can do once human authorization is something machines
            can check.
          </p>
        </div>

        {OUTCOMES.map((o, i) => (
          <div
            key={o.num}
            className={`uc-out${i % 2 === 1 ? " uc-out--flip" : ""}`}
          >
            <div className="uc-out__text">
              <div className="uc-out__num">{o.num}</div>
              <h3 className="uc-out__title">{o.title}</h3>
              <p className="uc-out__desc">{o.desc}</p>
            </div>
            <div className="uc-out__viz">{o.viz}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
