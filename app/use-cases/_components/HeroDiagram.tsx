/* Large animated infrastructure diagram for the Use Cases hero.
   Inputs (human approvals) flow into the Humanos core, which emits
   machine-verifiable authorization out to systems, agents, auditors
   and regulators. Flow is rendered as marching-dash strokes so the
   network reads as continuously moving. Pure SVG — scales fluidly. */

const INPUTS = [
  "Signature",
  "Consent",
  "Payment",
  "KYC",
  "Form",
  "Policy",
  "Voice approval",
  "Email approval",
];
const INPUT_CY = [35, 105, 175, 245, 315, 385, 455, 525];

const OUTPUTS = [
  "AI Agents",
  "ERP Systems",
  "Payment Networks",
  "Healthcare Systems",
  "Insurance Platforms",
  "Auditors",
  "Regulators",
];
const OUTPUT_CY = [70, 140, 210, 280, 350, 420, 490];

const FLOW = ["a", "b", "c", "d"];

export function HeroDiagram() {
  return (
    <div className="uc-dgm-wrap">
      <svg
        className="uc-dgm"
        viewBox="0 0 1200 560"
        role="img"
        aria-label="Human approvals flow into Humanos and become machine-verifiable authorization delivered to agents, systems, auditors and regulators."
      >
        {/* connectors: input -> core */}
        {INPUT_CY.map((cy, i) => {
          const d = `M194,${cy} C 320,${cy} 380,280 498,280`;
          return (
            <g key={`il-${i}`}>
              <path className="uc-dgm__link" d={d} />
              <path
                className={`uc-dgm__flow uc-dgm__flow--${FLOW[i % 4]}`}
                d={d}
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            </g>
          );
        })}

        {/* trunk: core -> pill */}
        <path className="uc-dgm__link" d="M688,280 L720,280" />
        <path className="uc-dgm__flow uc-dgm__flow--d" d="M688,280 L720,280" />

        {/* connectors: pill -> output */}
        {OUTPUT_CY.map((cy, i) => {
          const d = `M870,280 C 920,280 950,${cy} 1006,${cy}`;
          return (
            <g key={`ol-${i}`}>
              <path className="uc-dgm__link" d={d} />
              <path
                className={`uc-dgm__flow uc-dgm__flow--${FLOW[i % 4]}`}
                d={d}
                style={{ animationDelay: `${0.3 + i * 0.12}s` }}
              />
            </g>
          );
        })}

        {/* input nodes */}
        {INPUTS.map((label, i) => {
          const cy = INPUT_CY[i];
          return (
            <g key={`in-${i}`}>
              <rect
                className="uc-dgm__nodebox"
                x={24}
                y={cy - 20}
                width={170}
                height={40}
                rx={9}
              />
              <circle className="uc-dgm__nodedot" cx={42} cy={cy} r={3} />
              <text
                className="uc-dgm__nodetx"
                x={58}
                y={cy}
                dominantBaseline="central"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* core */}
        <rect
          className="uc-dgm__halo"
          x={478}
          y={185}
          width={230}
          height={190}
          rx={26}
        />
        <rect
          className="uc-dgm__core"
          x={498}
          y={205}
          width={190}
          height={150}
          rx={18}
        />
        <text className="uc-dgm__core-tx" x={593} y={272}>
          Humanos
        </text>
        <text className="uc-dgm__core-sub" x={593} y={298}>
          verify()
        </text>

        {/* machine-verifiable authorization pill */}
        <text className="uc-dgm__pill-eyebrow" x={795} y={246}>
          MACHINE-VERIFIABLE
        </text>
        <rect
          className="uc-dgm__pill"
          x={720}
          y={262}
          width={150}
          height={40}
          rx={20}
        />
        <text className="uc-dgm__pill-tx" x={795} y={282} dominantBaseline="central">
          authorization
        </text>

        {/* output nodes */}
        {OUTPUTS.map((label, i) => {
          const cy = OUTPUT_CY[i];
          return (
            <g key={`out-${i}`}>
              <rect
                className="uc-dgm__nodebox"
                x={1006}
                y={cy - 20}
                width={170}
                height={40}
                rx={9}
              />
              <circle className="uc-dgm__nodedot" cx={1024} cy={cy} r={3} />
              <text
                className="uc-dgm__nodetx"
                x={1040}
                y={cy}
                dominantBaseline="central"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="uc-dgm-caption">
        <b>Humans approve.</b>
        <span className="sep" aria-hidden="true" />
        <b>Systems verify.</b>
      </div>
    </div>
  );
}
