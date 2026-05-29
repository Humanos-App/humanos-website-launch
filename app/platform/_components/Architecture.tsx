"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import { Reveal, useInView } from "./_primitives";

const STAGES: any[] = [
  {
    num: "01",
    id: "issue",
    anchor: "#authorization",
    title: "Runtime authorization",
    desc: "issue · normalize · sign",
    inputs: ["Signature", "Policy", "Consent", "Delegation"],
    log: "Approvals normalized into runtime authorization.",
  },
  {
    num: "02",
    id: "propagate",
    anchor: "#cross-system",
    title: "Cross-system propagation",
    desc: "reusable · cross-system",
    systems: ["AI agent", "ERP", "Treasury", "Bank", "CRM", "Workflow"],
    log: "Authorization propagated across systems — identity-agnostic.",
  },
  {
    num: "03",
    id: "verify",
    anchor: "#verification",
    title: "Runtime verification",
    desc: "verify(action)",
    outcomes: [
      { label: "authorized", tone: "ok" },
      { label: "escalate", tone: "warn" },
      { label: "blocked", tone: "bad" },
    ],
    log: "humanos.verify(action) — scope, freshness, identity, revocation.",
  },
  {
    num: "04",
    id: "recover",
    anchor: "#recovery",
    title: "Dynamic recovery",
    desc: "collect · resume",
    actions: ["Request signature", "Collect KYC", "Restore authority"],
    log: "Missing authorization recovered — execution resumed.",
  },
  {
    num: "05",
    id: "emit",
    anchor: "#receipts",
    title: "Execution receipts",
    desc: "independently verifiable",
    verifiers: ["Auditor", "Regulator", "Partner", "Bank", "Compliance"],
    log: "Execution receipt emitted — independently verifiable.",
  },
];

const RW_W = 1280;
const RW_H = 560;
const RW_PAD_X = 150;
const RW_RAIL_Y = 380;
const RW_INNER = RW_W - RW_PAD_X * 2;
const stageX = (i: number) => RW_PAD_X + (RW_INNER / 4) * i;

const STAGE_MS = 5200;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function Architecture() {
  return (
    <section id="architecture">
      <div className="container-wide">
        <Reveal className="section-eyebrow">
          <span>01 · Runtime authorization lifecycle</span>
        </Reveal>

        <Reveal>
          <div className="section-head">
            <h2 className="section-title">
              From human intent to autonomous execution.
            </h2>
            <p className="section-sub section-head-aside">
              Humanos issues runtime authorization, propagates it across
              systems, verifies actions before execution, recovers missing
              approval dynamically, and generates independently verifiable
              proof afterwards.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="arch-stack-note">
            <span className="arch-stack-note-mark" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span className="arch-stack-note-text">
              Use the full runtime stack — or integrate only the layers you
              need.
            </span>
          </div>
        </Reveal>

        <Reveal>
          <ArchitectureRunway />
        </Reveal>
      </div>
    </section>
  );
}

function ArchitectureRunway() {
  const [ref, inView] = useInView(0.2);
  const [phase, setPhase] = useState(0);
  const stageEntryTimeRef = useRef(performance.now());
  const pulseRef = useRef<SVGCircleElement | null>(null);
  const pulseHaloRef = useRef<SVGCircleElement | null>(null);
  const railProgressRef = useRef<SVGLineElement | null>(null);
  const particleLayerRef = useRef<SVGGElement | null>(null);
  const particlesRef = useRef<any[]>([]);
  const particleIdRef = useRef(0);
  const lastStageRef = useRef(-1);

  const spawnStageParticles = (stageIdx: number) => {
    const stage = STAGES[stageIdx];
    const target = stageX(stageIdx);

    const spawn = (
      sx: number,
      sy: number,
      ex: number,
      ey: number,
      color: string,
      delay = 0,
      dur = 700,
    ) => {
      const id = particleIdRef.current++;
      const p: any = {
        id,
        sx,
        sy,
        ex,
        ey,
        color,
        t0: performance.now() + delay,
        dur,
        el: null,
        halo: null,
      };
      particlesRef.current.push(p);
    };

    if (stageIdx === 0) {
      stage.inputs.forEach((_: any, i: number) => {
        const cx = target;
        const cy = 130 + i * 60;
        spawn(cx, cy + 14, target, RW_RAIL_Y, "#7978E9", i * 200, 900);
      });
    } else if (stageIdx === 1) {
      stage.systems.forEach((_: any, i: number) => {
        const angle =
          -Math.PI + (Math.PI / (stage.systems.length - 1)) * i;
        const r = 130;
        const ex = target + Math.cos(angle) * r;
        const ey = RW_RAIL_Y + Math.sin(angle) * r - 30;
        spawn(target, RW_RAIL_Y, ex, ey, "#7978E9", 200 + i * 80, 800);
      });
    } else if (stageIdx === 2) {
      stage.outcomes.forEach((o: any, i: number) => {
        const ey = 160 + i * 56;
        const ex = target;
        const color =
          o.tone === "ok"
            ? "#4B49CA"
            : o.tone === "warn"
              ? "#7DA0FA"
              : "#F3797E";
        spawn(target, RW_RAIL_Y, ex, ey, color, 200 + i * 350, 600);
      });
    } else if (stageIdx === 3) {
      const recY = 134;
      stage.actions.forEach((_: any, i: number) => {
        const ex = target - 180 + i * 180;
        spawn(target, RW_RAIL_Y, ex, recY, "#7DA0FA", 200 + i * 500, 700);
        spawn(
          ex,
          recY,
          target,
          RW_RAIL_Y,
          "#7978E9",
          200 + i * 500 + 800,
          700,
        );
      });
    } else if (stageIdx === 4) {
      stage.verifiers.forEach((_: any, i: number) => {
        const cy = 130 + i * 42;
        const cx = target - 125;
        spawn(target, RW_RAIL_Y, cx, cy, "#7978E9", 200 + i * 220, 1000);
      });
    }
  };

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    stageEntryTimeRef.current = performance.now();
    lastStageRef.current = -1;

    const tick = (now: number) => {
      const cycle = STAGE_MS * STAGES.length;
      const elapsed = (now - stageEntryTimeRef.current) % cycle;
      const curStage = Math.floor(elapsed / STAGE_MS);
      const within = (elapsed % STAGE_MS) / STAGE_MS;

      if (curStage !== lastStageRef.current) {
        lastStageRef.current = curStage;
        setPhase(curStage);
        spawnStageParticles(curStage);
      }

      let pulseFrac;
      if (within < 0.85) {
        pulseFrac = curStage / 4;
      } else {
        const k = (within - 0.85) / 0.15;
        const next = (curStage + 1) % STAGES.length;
        if (curStage === STAGES.length - 1) {
          pulseFrac = curStage / 4 + (1 - curStage / 4) * k;
        } else {
          pulseFrac =
            curStage / 4 + (next / 4 - curStage / 4) * easeInOut(k);
        }
      }

      const px = RW_PAD_X + RW_INNER * pulseFrac;
      const py = RW_RAIL_Y;
      if (pulseRef.current) {
        pulseRef.current.setAttribute("cx", String(px));
        pulseRef.current.setAttribute("cy", String(py));
      }
      if (pulseHaloRef.current) {
        pulseHaloRef.current.setAttribute("cx", String(px));
        pulseHaloRef.current.setAttribute("cy", String(py));
      }
      if (railProgressRef.current) {
        railProgressRef.current.setAttribute("x2", String(px));
      }

      if (particleLayerRef.current) {
        const layer = particleLayerRef.current;
        const ns = "http://www.w3.org/2000/svg";
        const alive: any[] = [];
        for (const p of particlesRef.current) {
          const t = (now - p.t0) / p.dur;
          if (t < 0) {
            alive.push(p);
            continue;
          }
          if (t > 1.2) {
            if (p.el && p.el.parentNode === layer) layer.removeChild(p.el);
            if (p.halo && p.halo.parentNode === layer)
              layer.removeChild(p.halo);
            continue;
          }
          if (!p.el) {
            const halo = document.createElementNS(ns, "circle");
            halo.setAttribute("r", "7");
            halo.setAttribute("fill", p.color);
            halo.setAttribute("opacity", "0.20");
            halo.setAttribute("filter", "url(#rwGlow)");
            const dot = document.createElementNS(ns, "circle");
            dot.setAttribute("r", "2.8");
            dot.setAttribute("fill", p.color);
            layer.appendChild(halo);
            layer.appendChild(dot);
            p.el = dot;
            p.halo = halo;
          }
          const k = Math.min(1, Math.max(0, t));
          const e = easeOut(k);
          const x = p.sx + (p.ex - p.sx) * e;
          const y = p.sy + (p.ey - p.sy) * e;
          const fade = k > 0.85 ? 1 - (k - 0.85) / 0.15 : 1;
          if (p.el) {
            p.el.setAttribute("cx", String(x));
            p.el.setAttribute("cy", String(y));
            p.el.setAttribute("opacity", String(fade));
          }
          if (p.halo) {
            p.halo.setAttribute("cx", String(x));
            p.halo.setAttribute("cy", String(y));
            p.halo.setAttribute("opacity", String(fade * 0.2));
          }
          alive.push(p);
        }
        particlesRef.current = alive;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div className="arch-runway" ref={ref as any}>
      <svg
        viewBox={`0 0 ${RW_W} ${RW_H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <filter
            id="rwGlow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
          <linearGradient id="rwLineFade" x1="0" x2="1">
            <stop offset="0%" stopColor="#7978E9" stopOpacity="0" />
            <stop offset="20%" stopColor="#7978E9" stopOpacity="0.40" />
            <stop offset="80%" stopColor="#7978E9" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#7978E9" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g key={phase} className="arch-glyph-enter">
          <StageGlyphs stage={STAGES[phase]} stageIdx={phase} active={true} />
        </g>

        <line
          x1={RW_PAD_X}
          y1={RW_RAIL_Y}
          x2={RW_W - RW_PAD_X}
          y2={RW_RAIL_Y}
          stroke="rgba(244,243,239,0.10)"
          strokeWidth="1"
        />
        <line
          ref={railProgressRef}
          x1={RW_PAD_X}
          y1={RW_RAIL_Y}
          x2={RW_PAD_X}
          y2={RW_RAIL_Y}
          stroke="#4B49CA"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {STAGES.map((stage, i) => (
          <StageNode
            key={stage.id}
            stage={stage}
            stageIdx={i}
            active={phase === i}
            passed={i < phase}
          />
        ))}

        {STAGES.map((stage, i) => (
          <StageCard
            key={stage.id}
            stage={stage}
            stageIdx={i}
            active={phase === i}
          />
        ))}

        <circle
          ref={pulseHaloRef}
          cx={RW_PAD_X}
          cy={RW_RAIL_Y}
          r="14"
          fill="#7978E9"
          opacity="0.28"
          filter="url(#rwGlow)"
        />
        <circle
          ref={pulseRef}
          cx={RW_PAD_X}
          cy={RW_RAIL_Y}
          r="4.2"
          fill="#F4F3EF"
        />

        <g ref={particleLayerRef} />
      </svg>

      <div className="arch-log" aria-live="polite">
        <div className="arch-log-head">
          <span className="arch-log-dot" aria-hidden="true"></span>
          <span className="arch-log-title">RUNTIME LOG</span>
        </div>
        <div className="arch-log-line-wrap">
          <div key={phase} className="arch-log-current">
            <span className="arch-log-num mono">{STAGES[phase].num}</span>
            <span className="arch-log-line">{STAGES[phase].log}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StageGlyphs({
  stage,
  stageIdx,
  active,
}: {
  stage: any;
  stageIdx: number;
  active: boolean;
}) {
  const cx = stageX(stageIdx);
  const opacity = active ? 1 : 0.32;
  const styleAttr = { transition: "opacity 600ms var(--ease-standard)" };

  if (stageIdx === 0) {
    return (
      <g style={styleAttr} opacity={opacity}>
        {stage.inputs.map((label: string, i: number) => {
          const ix = cx;
          const iy = 130 + i * 60;
          return (
            <g key={label}>
              <path
                d={`M ${ix} ${iy + 14} C ${ix} ${iy + 60}, ${cx} ${RW_RAIL_Y - 80}, ${cx} ${RW_RAIL_Y - 8}`}
                stroke="rgba(121,120,233,0.30)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="2 4"
              />
              <rect
                x={ix - 65}
                y={iy - 14}
                width="130"
                height="28"
                fill="#16161A"
                stroke="rgba(244,243,239,0.10)"
                rx="3"
              />
              <text
                x={ix}
                y={iy + 5}
                textAnchor="middle"
                fill="#F4F3EF"
                fontSize="11.5"
                fontWeight="500"
                fontFamily="Inter, sans-serif"
              >
                {label}
              </text>
            </g>
          );
        })}
      </g>
    );
  }

  if (stageIdx === 1) {
    return (
      <g style={styleAttr} opacity={opacity}>
        {stage.systems.map((label: string, i: number) => {
          const angle =
            -Math.PI + (Math.PI / (stage.systems.length - 1)) * i;
          const r = 130;
          const sx = cx + Math.cos(angle) * r;
          const sy = RW_RAIL_Y + Math.sin(angle) * r - 30;
          return (
            <g key={label}>
              <path
                d={`M ${cx} ${RW_RAIL_Y - 8} Q ${cx} ${(RW_RAIL_Y + sy) / 2 - 20}, ${sx} ${sy}`}
                stroke="rgba(121,120,233,0.28)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="2 4"
              />
              <rect
                x={sx - 44}
                y={sy - 12}
                width="88"
                height="24"
                fill="#16161A"
                stroke="rgba(244,243,239,0.12)"
                rx="3"
              />
              <text
                x={sx}
                y={sy + 4}
                textAnchor="middle"
                fill="#F4F3EF"
                fontSize="10.5"
                fontWeight="500"
                fontFamily="Inter, sans-serif"
              >
                {label}
              </text>
            </g>
          );
        })}
      </g>
    );
  }

  if (stageIdx === 2) {
    return (
      <g style={styleAttr} opacity={opacity}>
        <text
          x={cx}
          y={120}
          textAnchor="middle"
          fill="#7978E9"
          fontSize="11"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.04em"
        >
          humanos.verify(action)
        </text>
        {stage.outcomes.map((o: any, i: number) => {
          const ey = 160 + i * 56;
          const color =
            o.tone === "ok"
              ? "#4B49CA"
              : o.tone === "warn"
                ? "#7DA0FA"
                : "#F3797E";
          return (
            <g key={o.label}>
              <path
                d={`M ${cx} ${RW_RAIL_Y - 8} Q ${cx} ${(RW_RAIL_Y + ey) / 2}, ${cx} ${ey + 14}`}
                stroke={color}
                strokeOpacity="0.30"
                strokeWidth="1"
                fill="none"
                strokeDasharray="2 4"
              />
              <rect
                x={cx - 70}
                y={ey - 14}
                width="140"
                height="28"
                fill="#16161A"
                stroke={color}
                strokeOpacity="0.55"
                rx="3"
              />
              <circle cx={cx - 54} cy={ey} r="3" fill={color} />
              <text
                x={cx - 42}
                y={ey + 4}
                fill="#F4F3EF"
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
              >
                {o.label}
              </text>
            </g>
          );
        })}
      </g>
    );
  }

  if (stageIdx === 3) {
    return (
      <g style={styleAttr} opacity={opacity}>
        <path
          d={`M ${cx} ${RW_RAIL_Y - 10} Q ${cx - 200} ${RW_RAIL_Y - 140}, ${cx - 180} 134 L ${cx + 180} 134 Q ${cx + 200} ${RW_RAIL_Y - 140}, ${cx} ${RW_RAIL_Y - 10}`}
          stroke="rgba(125,160,250,0.55)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3 4"
        />
        {stage.actions.map((label: string, i: number) => {
          const ex = cx - 180 + i * 180;
          return (
            <g key={label}>
              <rect
                x={ex - 75}
                y={120}
                width="150"
                height="28"
                fill="#16161A"
                stroke="rgba(125,160,250,0.55)"
                rx="3"
              />
              <text
                x={ex}
                y={138}
                textAnchor="middle"
                fill="#7DA0FA"
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
              >
                {label}
              </text>
            </g>
          );
        })}
        <text
          x={cx}
          y={104}
          textAnchor="middle"
          fill="#7DA0FA"
          fontSize="10.5"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.10em"
        >
          RECOVERY BRANCH
        </text>
      </g>
    );
  }

  if (stageIdx === 4) {
    return (
      <g style={styleAttr} opacity={opacity}>
        {stage.verifiers.map((label: string, i: number) => {
          const cy = 130 + i * 42;
          const chipX = cx - 200;
          const chipW = 150;
          return (
            <g key={label}>
              <path
                d={`M ${cx} ${RW_RAIL_Y - 8} Q ${cx - 100} ${(RW_RAIL_Y + cy) / 2}, ${chipX + chipW} ${cy}`}
                stroke="rgba(121,120,233,0.40)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="2 4"
              />
              <rect
                x={chipX}
                y={cy - 14}
                width={chipW}
                height="28"
                fill="#16161A"
                stroke="rgba(121,120,233,0.45)"
                rx="3"
              />
              <text
                x={chipX + chipW / 2}
                y={cy + 4}
                textAnchor="middle"
                fill="#F4F3EF"
                fontSize="11"
                fontWeight="500"
                fontFamily="Inter, sans-serif"
              >
                {label}
              </text>
            </g>
          );
        })}
        <text
          x={cx - 125}
          y={108}
          textAnchor="middle"
          fill="#7978E9"
          fontSize="10.5"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.10em"
        >
          INDEPENDENTLY VERIFIABLE
        </text>
      </g>
    );
  }
  return null;
}

function StageNode({
  stage,
  stageIdx,
  active,
  passed,
}: {
  stage: any;
  stageIdx: number;
  active: boolean;
  passed: boolean;
}) {
  const cx = stageX(stageIdx);
  return (
    <g>
      <circle
        cx={cx}
        cy={RW_RAIL_Y}
        r={active ? 9 : 5}
        fill={active ? "#4B49CA" : passed ? "#4B49CA" : "#16161A"}
        stroke={active || passed ? "#4B49CA" : "rgba(244,243,239,0.30)"}
        strokeWidth="1.5"
        style={{
          transition:
            "r 240ms var(--ease-standard), fill 240ms var(--ease-standard)",
        }}
      />
      {active && (
        <circle
          cx={cx}
          cy={RW_RAIL_Y}
          r="20"
          fill="#4B49CA"
          opacity="0.18"
          filter="url(#rwGlow)"
        />
      )}
      <text
        x={cx}
        y={RW_RAIL_Y - 26}
        textAnchor="middle"
        fill={active || passed ? "#7978E9" : "#76746D"}
        fontSize="10"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="0.18em"
        style={{ transition: "fill 240ms var(--ease-standard)" }}
      >
        {stage.num}
      </text>
    </g>
  );
}

function StageCard({
  stage,
  stageIdx,
  active,
}: {
  stage: any;
  stageIdx: number;
  active: boolean;
}) {
  const cx = stageX(stageIdx);
  const cardW = 226;
  const cardH = 78;
  return (
    <g
      transform={`translate(${cx - cardW / 2}, ${RW_RAIL_Y + 32})`}
      style={{ transition: "opacity 240ms var(--ease-standard)" }}
    >
      <rect
        width={cardW}
        height={cardH}
        fill={active ? "rgba(75,73,202,0.10)" : "#16161A"}
        stroke={active ? "rgba(75,73,202,0.55)" : "rgba(244,243,239,0.10)"}
        strokeWidth="1"
        rx="3"
        style={{
          transition:
            "fill 240ms var(--ease-standard), stroke 240ms var(--ease-standard)",
        }}
      />
      <text
        x="14"
        y="28"
        fill="#F4F3EF"
        fontSize="13"
        fontWeight="600"
        fontFamily="Inter, sans-serif"
        letterSpacing="-0.008em"
      >
        {stage.title}
      </text>
      <text
        x="14"
        y={cardH - 18}
        fill={active ? "#7978E9" : "#76746D"}
        fontSize="10.5"
        fontFamily="JetBrains Mono, monospace"
        style={{ transition: "fill 240ms var(--ease-standard)" }}
      >
        {stage.desc}
      </text>
    </g>
  );
}
