// @ts-nocheck
"use client";

import {
  useEffect,
  useRef,
  useState,
  useMemo,
  useLayoutEffect,
} from "react";
import {
  Reveal,
  useInView,
  useTick,
  ArrowRight,
  CheckGlyph,
  CrossGlyph,
  HumanosMark,
  ResultPill,
  Caret,
  SectionOutcome,
  CornerBrackets,
} from "./_primitives";
import { TalkWithUs } from "@/components/dialogs/TalkWithUs";

// ============================================================
// End sections — Integrations · Execution environments · Final
// ============================================================

// ---- Section 10 — Integrations -------------------------------------

export function IntegrationsSection() {
  const items = [
    { name: 'SAP',         glyph: <BadgeGlyph t="SAP" /> },
    { name: 'Salesforce',  glyph: <CloudGlyph /> },
    { name: 'ServiceNow',  glyph: <BadgeGlyph t="SN" /> },
    { name: 'Okta',        glyph: <RingGlyph /> },
    { name: 'OAuth 2.1',   glyph: <KeyGlyph /> },
    { name: 'REST · gRPC', glyph: <StackGlyph /> },
    { name: 'MCP',         glyph: <BadgeGlyph t="MCP" /> },
    { name: 'AI agents',   glyph: <DotGlyph /> },
    { name: 'Wallets',     glyph: <ChainGlyph /> },
    { name: 'DocuSign',    glyph: <SignGlyph /> },
  ];

  return (
    <section id="integrations" data-theme="light">
      <div className="container-wide">
        <Reveal className="section-eyebrow"><span>10 · Integrations</span></Reveal>
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">Works with your existing stack.</h2>
            <p className="section-sub section-head-aside">
              Humanos complements the systems you already run. The trust layer slots in alongside
              identity, applications, and external counterparties — without replacing any of them.
            </p>
          </div>
        </Reveal>

        <SectionOutcome
          outcomes={[
            'Drop Humanos into existing systems via SDKs, webhooks, and direct API — no replatform.',
            'Sit alongside your identity, applications, and external counterparties — not in front.',
            'Cover first-party systems and third-party APIs with the same verify contract.',
            'Ship the trust layer in days, not migrations.',
          ]}
          docs={{ label: 'SDKs & API reference', href: 'https://humanos.mintlify.app/sdk' }}
        />
        <Reveal delay={120}>
          <div className="integrations-grid">
            {items.map((it, i) => (
              <div className="integration-cell" key={it.name}>
                <span className="glyph">{it.glyph}</span>
                <span className="name">{it.name}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const BadgeGlyph = ({ t }) => (
  <span className="mono" style={{
    border: '1px solid currentColor', padding: '4px 8px',
    fontSize: 11, letterSpacing: '0.04em', borderRadius: 2,
  }}>{t}</span>
);
const CloudGlyph = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M7 18a4 4 0 010-8 6 6 0 0111-1 4 4 0 010 9H7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);
const RingGlyph = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
const KeyGlyph = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="10" cy="14" r="4" stroke="currentColor" strokeWidth="1.4" />
    <path d="M14 14h10M20 14v4M24 14v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const StackGlyph = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="6" y="7" width="16" height="4" stroke="currentColor" strokeWidth="1.4" />
    <rect x="6" y="13" width="16" height="4" stroke="currentColor" strokeWidth="1.4" />
    <rect x="6" y="19" width="16" height="2" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
const DotGlyph = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="9" cy="14" r="2" fill="currentColor" />
    <circle cx="14" cy="14" r="3" fill="currentColor" />
    <circle cx="20" cy="14" r="2" fill="currentColor" />
  </svg>
);
const ChainGlyph = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="6" y="11" width="7" height="6" rx="3" stroke="currentColor" strokeWidth="1.4" />
    <rect x="15" y="11" width="7" height="6" rx="3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M13 14h2" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
const SignGlyph = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M5 20c3-1 5-6 8-6s4 4 7 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M5 23h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// ---- Section 11 — Execution Environments ---------------------------

export function UseCasesSection() {
  const cases = [
    { k: 'treasury',   title: 'Autonomous Treasury',     outcome: 'Agents move capital within signed mandates. Every transfer carries an independently verifiable proof.', mini: <UCTreasury /> },
    { k: 'erp',        title: 'ERP Automation',          outcome: 'Purchase orders, payments, and exceptions clear at runtime — verified against policy before they reach the system of record.', mini: <UCErp /> },
    { k: 'healthcare', title: 'Healthcare Operations',   outcome: 'Orders, releases, and consent flows execute under signed clinical authority, recoverable mid-action.', mini: <UCHealth /> },
    { k: 'trading',    title: 'Delegated Trading',       outcome: 'Strategies operate inside scoped trading authority — every fill emits a proof a counterparty can verify.', mini: <UCTrade /> },
    { k: 'commerce',   title: 'Agentic Commerce',        outcome: 'Buyer agents transact across merchants with portable spending authority, settled against signed limits.', mini: <UCCommerce /> },
    { k: 'workflows',  title: 'AI Workflow Execution',   outcome: 'Multi-step AI workflows pause, escalate, and resume — never executing beyond the authority granted.', mini: <UCWorkflow /> },
  ];
  return (
    <section id="use-cases">
      <div className="container-wide">
        <Reveal className="section-eyebrow"><span>11 · Real Execution Environments</span></Reveal>
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">Where it runs in production.</h2>
            <p className="section-sub section-head-aside">
              Organized by execution environment, not industry. Each setting shares the same primitive:
              actions that need to verify before they execute.
            </p>
          </div>
        </Reveal>
        <div className="uc-grid stage-light" style={{ marginTop: 24, padding: 24 }}>
          {cases.map((c, i) => (
            <UseCaseCard key={c.k} title={c.title} outcome={c.outcome} mini={c.mini} index={i+1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCaseCard({ title, outcome, mini, index }) {
  return (
    <div className="uc-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span className="mono" style={{ fontSize: 10.5, color: 'var(--fg-on-dark-3)', letterSpacing: '0.12em' }}>
          ENV · 0{index}
        </span>
        <span className="mono" style={{ fontSize: 10, color: 'var(--c-execute)', letterSpacing: '0.10em' }}>
          ● LIVE
        </span>
      </div>
      <div className="uc-card-anim">{mini}</div>
      <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', margin: 0, color: 'var(--fg-on-dark-1)' }}>{title}</h3>
      <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: 0, color: 'var(--fg-on-dark-3)' }}>{outcome}</p>
    </div>
  );
}

function UCTreasury() {
  const [ref, inView] = useInView(0.3);
  return (
    <svg ref={ref} viewBox="0 0 280 140" style={{ width: '100%', height: '100%', display: 'block' }}>
      <text x="14" y="22" fill="#76746D" fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">TRANSFER · LIVE</text>
      <g transform="translate(14, 36)">
        {[
          { l: '€4,800',  d: 'authorized', c: '#4B49CA' },
          { l: '€820',    d: 'authorized', c: '#4B49CA' },
          { l: '€52,000', d: 'collect',    c: '#E4D8C8' },
          { l: '€1,200',  d: 'authorized', c: '#4B49CA' },
        ].map((row, i) => (
          <g key={i} transform={`translate(0, ${i * 22})`}>
            <text fill="#F4F3EF" fontSize="11.5" fontFamily="JetBrains Mono, monospace">{row.l}</text>
            <rect x="74" y="-9" width="120" height="12" fill="rgba(244,243,239,0.04)" rx="1" />
            <rect x="74" y="-9" width="120" height="12" fill={row.c} opacity="0.18" rx="1">
              {inView && <animate attributeName="opacity" values="0;0.18" dur="0.5s" begin={`${i*0.2}s`} fill="freeze" />}
            </rect>
            <text x="200" y="0" fill={row.c} fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">{row.d.toUpperCase()}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function UCErp() {
  return (
    <svg viewBox="0 0 280 140" style={{ width: '100%', height: '100%', display: 'block' }}>
      <text x="14" y="22" fill="#76746D" fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">PURCHASE ORDER</text>
      <g transform="translate(14, 38)">
        <rect width="120" height="80" fill="rgba(244,243,239,0.04)" stroke="rgba(244,243,239,0.10)" rx="3" />
        <text x="10" y="18" fill="#F4F3EF" fontSize="10.5" fontFamily="JetBrains Mono, monospace">PO-4821</text>
        <text x="10" y="36" fill="#C5C3BC" fontSize="9.5" fontFamily="JetBrains Mono, monospace">€124,000</text>
        <text x="10" y="52" fill="#76746D" fontSize="9" fontFamily="JetBrains Mono, monospace">vendor.ack</text>
        <text x="10" y="68" fill="#4B49CA" fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em">✓ AUTH</text>
      </g>
      <g transform="translate(150, 38)">
        <rect width="116" height="80" fill="rgba(75,73,202,0.06)" stroke="rgba(75,73,202,0.30)" rx="3" />
        <text x="10" y="18" fill="#7978E9" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">PROOF</text>
        <text x="10" y="36" fill="#F4F3EF" fontSize="10.5" fontFamily="JetBrains Mono, monospace">0xPF·22A1</text>
        <text x="10" y="52" fill="#76746D" fontSize="9" fontFamily="JetBrains Mono, monospace">verified by 3</text>
        <circle cx="98" cy="62" r="4" fill="#4B49CA" />
      </g>
      <path d="M 134 78 L 150 78" stroke="rgba(75,73,202,0.45)" strokeWidth="1" />
    </svg>
  );
}

function UCHealth() {
  const [ref, inView] = useInView(0.3);
  return (
    <svg ref={ref} viewBox="0 0 280 140" style={{ width: '100%', height: '100%', display: 'block' }}>
      <text x="14" y="22" fill="#76746D" fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">ORDER · RELEASE</text>
      <g transform="translate(14, 40)">
        {[
          { l: 'clinical.auth',   c: '#4B49CA' },
          { l: 'consent',         c: '#4B49CA' },
          { l: 'scope.check',     c: '#FFC46B' },
          { l: 'release',         c: '#4B49CA' },
        ].map((s, i) => (
          <g key={i} transform={`translate(${i * 64}, 0)`}>
            <rect x="0" y="20" width="50" height="50" fill="rgba(244,243,239,0.04)" stroke="rgba(244,243,239,0.10)" rx="3" />
            <circle cx="25" cy="45" r="6" fill={s.c} opacity={inView ? 0.9 : 0.3}>
              {inView && <animate attributeName="opacity" values="0.3;0.9;0.5" dur="2s" repeatCount="indefinite" begin={`${i*0.25}s`} />}
            </circle>
            <text x="25" y="84" textAnchor="middle" fill="#C5C3BC" fontSize="8.5" fontFamily="JetBrains Mono, monospace">{s.l}</text>
            {i < 3 && <path d={`M 50 45 L 64 45`} stroke="rgba(244,243,239,0.20)" strokeWidth="1" />}
          </g>
        ))}
      </g>
    </svg>
  );
}

function UCTrade() {
  return (
    <svg viewBox="0 0 280 140" style={{ width: '100%', height: '100%', display: 'block' }}>
      <text x="14" y="22" fill="#76746D" fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">FILL · STREAM</text>
      <polyline
        points="14,90 50,82 90,86 130,72 170,76 210,60 250,64 266,52"
        fill="none" stroke="#7978E9" strokeWidth="1.5"
      />
      <polyline
        points="14,90 50,82 90,86 130,72 170,76 210,60 250,64 266,52"
        fill="none" stroke="rgba(121,120,233,0.18)" strokeWidth="6"
      />
      {[
        { x: 50, c: '#4B49CA' },
        { x: 130, c: '#4B49CA' },
        { x: 210, c: '#E4D8C8' },
        { x: 266, c: '#4B49CA' },
      ].map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={[82,72,60,52][i]} r="3" fill={d.c} />
        </g>
      ))}
      <text x="14" y="120" fill="#C5C3BC" fontSize="10" fontFamily="JetBrains Mono, monospace">12,400 fills · all under mandate · €4.2M</text>
    </svg>
  );
}

function UCCommerce() {
  return (
    <svg viewBox="0 0 280 140" style={{ width: '100%', height: '100%', display: 'block' }}>
      <text x="14" y="22" fill="#76746D" fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">BUYER AGENT</text>
      <g transform="translate(14, 38)">
        <circle cx="20" cy="20" r="14" fill="rgba(75,73,202,0.10)" stroke="rgba(75,73,202,0.45)" />
        <text x="20" y="24" textAnchor="middle" fill="#7978E9" fontSize="11" fontFamily="JetBrains Mono, monospace">A</text>
      </g>
      {[
        { x: 110, y: 30, l: 'merchant.A' },
        { x: 200, y: 26, l: 'merchant.B' },
        { x: 200, y: 80, l: 'merchant.C' },
        { x: 110, y: 80, l: 'merchant.D' },
      ].map((m, i) => (
        <g key={i}>
          <rect x={m.x} y={m.y} width="64" height="20" fill="rgba(244,243,239,0.04)" stroke="rgba(244,243,239,0.10)" rx="2" />
          <text x={m.x + 6} y={m.y + 14} fill="#C5C3BC" fontSize="9" fontFamily="JetBrains Mono, monospace">{m.l}</text>
          <path d={`M 48 58 L ${m.x} ${m.y + 10}`} stroke="rgba(75,73,202,0.30)" strokeWidth="1" />
          <circle r="2" fill="#7978E9">
            <animateMotion dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`}
              path={`M 48 58 L ${m.x} ${m.y + 10}`} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

function UCWorkflow() {
  const [ref, inView] = useInView(0.3);
  return (
    <svg ref={ref} viewBox="0 0 280 140" style={{ width: '100%', height: '100%', display: 'block' }}>
      <text x="14" y="22" fill="#76746D" fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">PIPELINE</text>
      <g transform="translate(14, 50)">
        {[
          { c: '#7978E9' },
          { c: '#4B49CA' },
          { c: '#FFC46B' },
          { c: '#4B49CA' },
          { c: '#4B49CA' },
        ].map((s, i) => (
          <g key={i} transform={`translate(${i * 50}, 0)`}>
            <rect width="40" height="24" fill="rgba(244,243,239,0.04)" stroke={s.c} strokeWidth="1" rx="2" opacity="0.9" />
            <circle cx="20" cy="12" r="3" fill={s.c}>
              {inView && <animate attributeName="opacity" values="0.3;1;0.6" dur="2s" repeatCount="indefinite" begin={`${i*0.2}s`} />}
            </circle>
            {i < 4 && <path d="M 40 12 L 50 12" stroke="rgba(244,243,239,0.20)" />}
          </g>
        ))}
      </g>
      <text x="14" y="106" fill="#C5C3BC" fontSize="10" fontFamily="JetBrains Mono, monospace">step.3 → escalate → resume → settle</text>
    </svg>
  );
}

// ---- Final CTA -----------------------------------------------------

export function FinalSection() {
  const [ref, inView] = useInView(0.2);
  return (
    <section className="final" ref={ref} id="final">
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        {/* Concentric rings ambient */}
        <FinalAmbient active={inView} />
        <Reveal>
          <span className="label-cap" style={{ display: 'block', marginBottom: 32, textAlign: 'center' }}>
            HUMANOS · VIA PROTOCOL
          </span>
          <h2>Authorization becomes infrastructure.</h2>
        </Reveal>
        <Reveal delay={150}>
          <p>
            Today, authorization is trapped inside applications and workflows. Humanos separates
            it from systems and turns it into portable runtime infrastructure — reusable across
            organizations, APIs, agents, and autonomous workflows.
          </p>
        </Reveal>
        <Reveal delay={250}>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <TalkWithUs>
              <button className="btn btn-primary" type="button">
                Talk to us <span className="arrow"><ArrowRight /></span>
              </button>
            </TalkWithUs>
            <a
              className="btn btn-secondary"
              href="https://docs.humanos.id"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the docs <span className="arrow"><ArrowRight /></span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalAmbient({ active }) {
  return (
    <svg
      viewBox="0 0 1200 600"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    >
      <defs>
        <radialGradient id="finalGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4B49CA" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#4B49CA" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#4B49CA" stopOpacity="0.0" />
        </radialGradient>
      </defs>
      {[1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx="600" cy="300"
          r={60 + i * 80}
          fill="none"
          stroke={i % 2 === 0 ? 'rgba(75,73,202,0.10)' : 'rgba(121,120,233,0.06)'}
          strokeWidth="1"
        >
          {active && <animate attributeName="r"
            values={`${60 + i * 80};${60 + i * 80 + 12};${60 + i * 80}`}
            dur="6s" repeatCount="indefinite" begin={`${i * 0.4}s`} />}
        </circle>
      ))}
    </svg>
  );
}

