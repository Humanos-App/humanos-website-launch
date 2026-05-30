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

// ============================================================
// Trust-layer sections 6–9
// 6 Cross-System Trust · 7 Policy Orchestration
// 8 Identity Layer · 9 Runtime Enforcement
// ============================================================

// ---- Section 6 — Cross-System Trust --------------------------------

export function CrossSystemSection() {
  return (
    <section id="cross-system" data-theme="light">
      <div className="container-wide">
        <Reveal className="section-eyebrow"><span>03 · Cross-System Propagation</span></Reveal>
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">Reusable across systems.</h2>
            <p className="section-sub section-head-aside">
              Runtime authorization propagates across APIs, agents, workflows, and external
              systems — so every participant can verify what actions are actually allowed
              before execution.
            </p>
          </div>
        </Reveal>

        <SectionOutcome
          outcomes={[
            'Identity-agnostic — works with any human or agentic identity, from any provider (Auth0, Okta, Entra, custom IdPs, agent frameworks, DIDs).',
            'Counterparties verify what you were allowed to do without API access into your stack.',
            'One runtime authorization is recognized by every system that speaks VIA — no per-partner integration.',
            'Authorization travels with the actor — across organizations, vendors, and execution surfaces.',
          ]}
          docs={{ label: 'VIA Protocol', href: 'https://humanos.mintlify.app/via' }}
        />
        <Reveal delay={120} className="mobile-hide"><CrossSystemDiagram /></Reveal>
      </div>
    </section>
  );
}

function CrossSystemDiagram() {
  const [ref, inView] = useInView(0.2);
  const flowLayerRef = useRef(null);
  const flowsRef = useRef([]);
  const idRef = useRef(0);

  // viewBox 1280 x 540 — extra vertical space to separate the title /
  // identity-chip strip / org cards, plus room inside each org card
  // between its title and the first system row.
  const W = 1280, H = 540;

  const orgA = {
    x: 60, y: 130, w: 440, h: 360,
    label: 'Organization A',
    sub: 'issues mandate',
    systems: [
      { y: 270, label: 'Treasury' },
      { y: 340, label: 'AI agent' },
      { y: 410, label: 'ERP' },
    ],
  };
  const orgB = {
    x: W - 60 - 440, y: 130, w: 440, h: 360,
    label: 'Organization B',
    sub: 'verifies mandate',
    systems: [
      { y: 270, label: 'Bank' },
      { y: 340, label: 'Partner system' },
      { y: 410, label: 'Counterparty' },
    ],
  };

  useEffect(() => {
    if (!inView) return;
    let raf, lastT = performance.now(), spawnAcc = 0;
    const tick = (now) => {
      const dt = (now - lastT) / 1000;
      lastT = now;
      spawnAcc += dt * 1000;
      if (spawnAcc > 500) {
        spawnAcc = 0;
        const src = Math.floor(Math.random() * orgA.systems.length);
        const tgt = Math.floor(Math.random() * orgB.systems.length);
        flowsRef.current.push({ id: idRef.current++, src, tgt, t: 0, el: null, halo: null });
      }
      const survivors = [];
      for (const f of flowsRef.current) {
        f.t += dt * 0.5;
        if (f.t > 1) { if (f.el) f.el.style.opacity = '0'; if (f.halo) f.halo.style.opacity = '0'; continue; }
        const x0 = orgA.x + orgA.w - 24;
        const y0 = orgA.systems[f.src].y;
        const x1 = orgB.x + 24;
        const y1 = orgB.systems[f.tgt].y;
        const cx1 = x0 + 80, cx2 = x1 - 80;
        // bezier point
        const k = f.t;
        const x = bez(x0, cx1, cx2, x1, k);
        const y = bez(y0, y0, y1, y1, k);
        if (f.el) { f.el.setAttribute('cx', x); f.el.setAttribute('cy', y); }
        if (f.halo) { f.halo.setAttribute('cx', x); f.halo.setAttribute('cy', y); }
        survivors.push(f);
      }
      flowsRef.current = survivors;
      if (flowLayerRef.current) {
        for (const f of flowsRef.current) {
          if (!f.el) {
            const ns = 'http://www.w3.org/2000/svg';
            const halo = document.createElementNS(ns, 'circle');
            halo.setAttribute('r', '6'); halo.setAttribute('opacity', '0.22');
            halo.setAttribute('filter', 'url(#csGlow)'); halo.setAttribute('fill', '#7978E9');
            const dot = document.createElementNS(ns, 'circle');
            dot.setAttribute('r', '2.8'); dot.setAttribute('fill', '#7978E9');
            dot.setAttribute('style','transition:opacity 400ms;');
            flowLayerRef.current.appendChild(halo);
            flowLayerRef.current.appendChild(dot);
            f.el = dot; f.halo = halo;
          }
        }
        const dead = [];
        for (const c of Array.from(flowLayerRef.current.children)) {
          if (c.style && c.style.opacity === '0') dead.push(c);
        }
        dead.slice(0,4).forEach(c => flowLayerRef.current.removeChild(c));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={ref} className="arch-stage" style={{ padding: 0 }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          <filter id="csGlow"><feGaussianBlur stdDeviation="2.5" /></filter>
          <linearGradient id="csLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#7978E9" stopOpacity="0" />
            <stop offset="50%" stopColor="#7978E9" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#7978E9" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Org containers */}
        <OrgBlock org={orgA} side="left" />
        <OrgBlock org={orgB} side="right" />

        {/* Cross-org channel label + identity-agnostic strip */}
        <g>
          <text x={W / 2} y={28} textAnchor="middle"
            fill="#7978E9" fontSize="10.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.18em"
          >VIA · CROSS-SYSTEM PROPAGATION</text>
          <text x={W / 2} y={46} textAnchor="middle"
            fill="#76746D" fontSize="10.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.04em"
          >identity-agnostic — humans &amp; agents, any provider</text>
          {/* Identity provider chips */}
          {[
            { label: 'Auth0',     x: W/2 - 280 },
            { label: 'Okta',      x: W/2 - 200 },
            { label: 'Entra ID',  x: W/2 - 124 },
            { label: 'LangGraph', x: W/2 -  36 },
            { label: 'OpenAI',    x: W/2 +  56 },
            { label: 'did:web',   x: W/2 + 132 },
            { label: 'did:hum',   x: W/2 + 212 },
          ].map((c) => (
            <g key={c.label} transform={`translate(${c.x}, 80)`}>
              <rect width="68" height="18" fill="rgba(121,120,233,0.06)"
                stroke="rgba(121,120,233,0.30)" strokeWidth="1" rx="2"
              />
              <text x="34" y="12" textAnchor="middle"
                fill="#C5C3BC" fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.02em"
              >{c.label}</text>
            </g>
          ))}
          <rect x={W/2 - 280} y={108} width={560} height={1} fill="rgba(121,120,233,0.20)" />
        </g>

        {/* Connection paths */}
        {orgA.systems.map((s, i) =>
          orgB.systems.map((t, j) => (
            <path key={`p-${i}-${j}`}
              d={`M ${orgA.x + orgA.w - 24} ${s.y} C ${orgA.x + orgA.w + 60} ${s.y}, ${orgB.x - 60} ${t.y}, ${orgB.x + 24} ${t.y}`}
              stroke="url(#csLine)" strokeWidth="1" fill="none" opacity="0.5"
            />
          ))
        )}

        <g ref={flowLayerRef} />
      </svg>
    </div>
  );
}

function bez(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return u*u*u*p0 + 3*u*u*t*p1 + 3*u*t*t*p2 + t*t*t*p3;
}

function OrgBlock({ org, side }) {
  return (
    <g>
      <rect x={org.x} y={org.y} width={org.w} height={org.h}
        fill="rgba(75,73,202,0.04)" stroke="rgba(75,73,202,0.20)" strokeWidth="1" rx="6"
      />
      <CornerBrackets x={org.x} y={org.y} w={org.w} h={org.h} color="#4B49CA" />

      <text x={org.x + 24} y={org.y + 32}
        fill="#8A887F" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="0.16em"
      >{side === 'left' ? 'ISSUER' : 'VERIFIER'}</text>
      <text x={org.x + 24} y={org.y + 60}
        fill="#F4F3EF" fontSize="20" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="-0.012em"
      >{org.label}</text>
      <text x={org.x + 24} y={org.y + 80}
        fill="#C5C3BC" fontSize="12" fontFamily="JetBrains Mono, monospace"
      >{org.sub}</text>

      {org.systems.map((s, i) => (
        <g key={`s-${i}`}>
          <rect x={org.x + 24} y={s.y - 18} width={org.w - 48} height="36"
            fill="#16161A" stroke="rgba(244,243,239,0.10)" rx="3"
          />
          <text x={org.x + 40} y={s.y - 1}
            fill="#F4F3EF" fontSize="13" fontWeight="500" fontFamily="Inter, sans-serif"
          >{s.label}</text>
          <text x={org.x + 40} y={s.y + 13}
            fill="#76746D" fontSize="10" fontFamily="JetBrains Mono, monospace"
          >{side === 'left' ? 'mandate.bind' : 'proof.verify'}</text>
          <circle
            cx={side === 'left' ? org.x + org.w - 24 : org.x + 24}
            cy={s.y} r="2.5"
            fill="#7978E9" opacity="0.65"
          />
        </g>
      ))}

      <text x={org.x + 24} y={org.y + org.h - 18}
        fill="#76746D" fontSize="10.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em"
      >DID · did:hum:org/{org.label.split(' ')[1].toLowerCase()}</text>
    </g>
  );
}

// ---- Section 7 — Policy Orchestration -------------------------------

export function PolicySection() {
  return (
    <section id="policy">
      <div className="container-wide">
        <Reveal className="section-eyebrow"><span>07 · Policy Orchestration</span></Reveal>
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">Policies become executable infrastructure.</h2>
            <p className="section-sub section-head-aside">
              Contracts, approvals, and enterprise rules normalize into runtime authorization
              semantics — composable, signed, machine-verifiable.
            </p>
          </div>
        </Reveal>

        <SectionOutcome
          outcomes={[
            'Move policy out of scattered YAML and code into versioned, signed artifacts.',
            'Author once, distribute to every enforcement point — no per-system rewrites.',
            'Roll back or amend a policy in one place and have it propagate atomically.',
            'Make policy changes auditable as first-class events, not config diffs.',
          ]}
          docs={{ label: 'Policy Requests', href: 'https://docs.humanos.id/api-reference/2026-05-17/requests/create-request' }}
        />
        <Reveal delay={120} className="mobile-hide"><PolicyTransform /></Reveal>
      </div>
    </section>
  );
}

function PolicyTransform() {
  return (
    <div className="stage-light" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 60px 1fr',
      gap: 24,
      alignItems: 'stretch',
      padding: 24,
    }}>
      {/* Input — messy enterprise logic */}
      <div style={{
        background: 'var(--surface-1)',
        border: '1px solid var(--line-mid)',
        borderRadius: 8,
        padding: 32,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <span className="label-cap">INPUT · ENTERPRISE LOGIC</span>
        <h3 style={{
          fontSize: 20, fontWeight: 600, letterSpacing: '-0.012em',
          margin: '12px 0 24px', color: 'var(--fg-on-dark-1)',
        }}>Messy, locked in applications</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { kind: 'PDF',    label: 'Treasury Policy v2.4',     sub: '34 pages · signed Q1' },
            { kind: 'EMAIL',  label: '"Approved up to €50k"',    sub: 'CFO · 2026-02-14' },
            { kind: 'TICKET', label: 'JIRA-7821 · approval',     sub: 'Finance Ops · closed' },
            { kind: 'POLICY', label: 'Counterparty allowlist',    sub: 'spreadsheet · 412 rows' },
            { kind: 'DELEG.', label: 'Power of attorney',        sub: 'notarized · paper' },
          ].map((p, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '64px 1fr',
              gap: 16,
              padding: '14px 16px',
              background: 'var(--surface-2)',
              border: '1px solid var(--line-mid)',
              borderRadius: 3,
            }}>
              <span className="mono" style={{
                fontSize: 10.5, color: 'var(--fg-on-dark-3)',
                letterSpacing: '0.08em', alignSelf: 'center',
              }}>{p.kind}</span>
              <div>
                <div style={{ fontSize: 13.5, color: 'var(--fg-on-dark-1)', fontWeight: 500 }}>{p.label}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--fg-on-dark-3)', marginTop: 2 }}>{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transform arrow column */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
      }}>
        <span className="mono" style={{
          fontSize: 9.5, color: 'var(--fg-on-dark-3)', letterSpacing: '0.18em',
          writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)',
        }}>HUMANOS · NORMALIZE</span>
        <svg width="40" height="60" viewBox="0 0 40 60">
          <defs>
            <linearGradient id="trArrow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4B49CA" stopOpacity="0" />
              <stop offset="50%" stopColor="#4B49CA" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#4B49CA" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 4 30 L 32 30 M 24 22 L 32 30 L 24 38"
            stroke="#7978E9" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Output — runtime authorization */}
      <div style={{
        background: 'var(--surface-1)',
        border: '1px solid rgba(75,73,202,0.40)',
        borderRadius: 8,
        padding: 32,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <span className="label-cap" style={{ color: 'var(--c-execute)' }}>OUTPUT · RUNTIME AUTHORIZATION</span>
        <h3 style={{
          fontSize: 20, fontWeight: 600, letterSpacing: '-0.012em',
          margin: '12px 0 24px', color: 'var(--fg-on-dark-1)',
        }}>Composable, executable, verifiable</h3>

        <div style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--line-mid)',
          borderRadius: 3,
          padding: 22,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12.5,
          lineHeight: 1.65,
          color: 'var(--fg-on-dark-2)',
        }}>
          <div><span style={{ color: '#7978E9' }}>policy</span> <span style={{ color: '#F4F3EF' }}>treasury.eu</span> {'{'}</div>
          <div style={{ paddingLeft: 16 }}><span style={{ color: 'var(--fg-on-dark-3)' }}>subject:</span> <span>did:hum:org/treasury-eu</span></div>
          <div style={{ paddingLeft: 16 }}><span style={{ color: 'var(--fg-on-dark-3)' }}>action:</span> <span style={{ color: '#E4D8C8' }}>"transfer.execute"</span></div>
          <div style={{ paddingLeft: 16 }}><span style={{ color: 'var(--fg-on-dark-3)' }}>scope:</span> {'{'}</div>
          <div style={{ paddingLeft: 32 }}>counterparty: <span style={{ color: '#E4D8C8' }}>"allowlist:CTLST-014"</span></div>
          <div style={{ paddingLeft: 32 }}>region: <span style={{ color: '#E4D8C8' }}>"EU"</span></div>
          <div style={{ paddingLeft: 16 }}>{'},'}</div>
          <div style={{ paddingLeft: 16 }}><span style={{ color: 'var(--fg-on-dark-3)' }}>constraints:</span> {'{'}</div>
          <div style={{ paddingLeft: 32 }}>amount: <span style={{ color: '#7DA0FA' }}>{'≤ €10,000'}</span></div>
          <div style={{ paddingLeft: 32 }}>per_day: <span style={{ color: '#7DA0FA' }}>{'≤ €50,000'}</span></div>
          <div style={{ paddingLeft: 16 }}>{'},'}</div>
          <div style={{ paddingLeft: 16 }}><span style={{ color: 'var(--fg-on-dark-3)' }}>delegation:</span> <span style={{ color: '#E4D8C8' }}>[cfo → ops → agent.v1]</span></div>
          <div style={{ paddingLeft: 16 }}><span style={{ color: 'var(--fg-on-dark-3)' }}>valid_until:</span> <span>2026-06-01T23:59:59Z</span></div>
          <div style={{ paddingLeft: 16 }}><span style={{ color: 'var(--fg-on-dark-3)' }}>signed_by:</span> <span style={{ color: '#7978E9' }}>Elena Ruiz · CFO ✓</span></div>
          <div>{'}'}</div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          marginTop: 18,
        }}>
          {[
            { l: 'composable',  c: '#7978E9' },
            { l: 'signed',      c: '#4B49CA' },
            { l: 'verifiable',  c: '#E4D8C8' },
          ].map(p => (
            <div key={p.l} style={{
              padding: '10px 12px',
              background: 'var(--surface-2)',
              borderRadius: 3,
              border: '1px solid var(--line-mid)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 50, background: p.c, boxShadow: `0 0 8px ${p.c}` }}></span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--fg-on-dark-2)' }}>{p.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Section 8 — Identity Layer ------------------------------------

export function IdentitySection() {
  return (
    <section id="identity" data-theme="light">
      <div className="container-wide">
        <Reveal className="section-eyebrow"><span>08 · Identity Layer</span></Reveal>
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">Works with your existing identity systems.</h2>
            <p className="section-sub section-head-aside">
              Humanos does not replace identity infrastructure. It standardizes authorization semantics
              around the identity you already have.
            </p>
          </div>
        </Reveal>

        <SectionOutcome
          outcomes={[
            'Keep your existing IdP (Okta, Auth0, Azure AD) — Humanos layers on top, doesn’t replace.',
            'Bind authorization to W3C DIDs without migrating users or rewriting login flows.',
            'Give agents and services first-class verifiable identities, recognized across counterparties.',
            'Map any identity provider into one authorization model your acting systems can trust.',
          ]}
          docs={{ label: 'DIDs & VCs', href: 'https://humanos.mintlify.app/identity' }}
        />
        <Reveal delay={120} className="mobile-hide"><IdentityDiagram /></Reveal>
      </div>
    </section>
  );
}

function IdentityDiagram() {
  const [ref, inView] = useInView(0.2);
  // Animated dot from each identity provider → hub → portable auth out
  const flowLayerRef = useRef(null);
  const flowsRef = useRef([]);
  const idRef = useRef(0);

  const providers = [
    { label: 'Okta',           sub: 'enterprise SSO' },
    { label: 'OAuth',          sub: 'OAuth 2.1' },
    { label: 'KYC',            sub: 'Sumsub · Persona' },
    { label: 'Wallet',         sub: 'EVM signers' },
    { label: 'eID',            sub: 'national identity' },
    { label: 'AI identity',    sub: 'did:agent' },
  ];

  const W = 1280, H = 460;
  const pY = (i) => 60 + i * (H - 120) / (providers.length - 1);

  useEffect(() => {
    if (!inView) return;
    let raf, lastT = performance.now(), spawnAcc = 0;
    const tick = (now) => {
      const dt = (now - lastT) / 1000;
      lastT = now;
      spawnAcc += dt * 1000;
      if (spawnAcc > 420) {
        spawnAcc = 0;
        const src = Math.floor(Math.random() * providers.length);
        flowsRef.current.push({ id: idRef.current++, src, t: 0, el: null, halo: null });
      }
      const survivors = [];
      for (const f of flowsRef.current) {
        f.t += dt * 0.55;
        if (f.t > 1.5) { if (f.el) f.el.style.opacity = '0'; if (f.halo) f.halo.style.opacity = '0'; continue; }
        let x, y, color;
        if (f.t < 1) {
          // provider → hub
          const x0 = 220, y0 = pY(f.src);
          const x1 = W/2 - 100, y1 = H/2;
          const cx1 = x0 + 100, cx2 = x1 - 100;
          x = bez(x0, cx1, cx2, x1, f.t);
          y = bez(y0, y0, y1, y1, f.t);
          color = '#7DA0FA';
        } else {
          // hub → portable auth out
          const k = (f.t - 1) / 0.5;
          const x0 = W/2 + 100, y0 = H/2;
          const x1 = W - 200, y1 = H/2;
          x = x0 + (x1 - x0) * k;
          y = y0 + (y1 - y0) * k;
          color = '#7978E9';
        }
        if (f.el) { f.el.setAttribute('cx', x); f.el.setAttribute('cy', y); f.el.setAttribute('fill', color); }
        if (f.halo) { f.halo.setAttribute('cx', x); f.halo.setAttribute('cy', y); f.halo.setAttribute('fill', color); }
        survivors.push(f);
      }
      flowsRef.current = survivors;
      if (flowLayerRef.current) {
        for (const f of flowsRef.current) {
          if (!f.el) {
            const ns = 'http://www.w3.org/2000/svg';
            const halo = document.createElementNS(ns, 'circle');
            halo.setAttribute('r', '6'); halo.setAttribute('opacity', '0.22');
            halo.setAttribute('filter', 'url(#idGlow)'); halo.setAttribute('fill', '#7DA0FA');
            const dot = document.createElementNS(ns, 'circle');
            dot.setAttribute('r', '2.6'); dot.setAttribute('fill', '#7DA0FA');
            dot.setAttribute('style','transition:opacity 400ms;');
            flowLayerRef.current.appendChild(halo);
            flowLayerRef.current.appendChild(dot);
            f.el = dot; f.halo = halo;
          }
        }
        const dead = [];
        for (const c of Array.from(flowLayerRef.current.children)) {
          if (c.style && c.style.opacity === '0') dead.push(c);
        }
        dead.slice(0,4).forEach(c => flowLayerRef.current.removeChild(c));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={ref} className="arch-stage" style={{ padding: 0 }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          <filter id="idGlow"><feGaussianBlur stdDeviation="2.5" /></filter>
          <linearGradient id="idLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F4F3EF" stopOpacity="0.02" />
            <stop offset="50%" stopColor="#F4F3EF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#F4F3EF" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Left column: identity providers */}
        <text x="60" y="40" fill="#76746D" fontSize="10.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.14em">IDENTITY SOURCES</text>
        {providers.map((p, i) => (
          <g key={p.label}>
            <rect x="60" y={pY(i) - 18} width="160" height="36" fill="#16161A" stroke="rgba(244,243,239,0.10)" rx="3" />
            <text x="76" y={pY(i) - 2} fill="#F4F3EF" fontSize="12.5" fontWeight="500" fontFamily="Inter, sans-serif">{p.label}</text>
            <text x="76" y={pY(i) + 12} fill="#76746D" fontSize="10" fontFamily="JetBrains Mono, monospace">{p.sub}</text>
            <circle cx="220" cy={pY(i)} r="2.5" fill="#7DA0FA" opacity="0.6" />
            <path d={`M 220 ${pY(i)} C 320 ${pY(i)}, ${W/2 - 200} ${H/2}, ${W/2 - 100} ${H/2}`}
              stroke="url(#idLine)" strokeWidth="1" fill="none" />
          </g>
        ))}

        {/* Hub */}
        <g>
          <rect x={W/2 - 100} y={H/2 - 70} width="200" height="140" fill="#16161A" stroke="rgba(75,73,202,0.45)" rx="4" />
          <CornerBrackets x={W/2 - 100} y={H/2 - 70} w={200} h={140} color="#4B49CA" />
          <text x={W/2} y={H/2 - 38} textAnchor="middle" fill="#8A887F" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="0.18em">HUMANOS</text>
          <text x={W/2} y={H/2 - 14} textAnchor="middle" fill="#F4F3EF" fontSize="15" fontWeight="600" fontFamily="Inter, sans-serif">authorization</text>
          <text x={W/2} y={H/2 + 6} textAnchor="middle" fill="#F4F3EF" fontSize="15" fontWeight="600" fontFamily="Inter, sans-serif">semantics</text>
          <text x={W/2} y={H/2 + 36} textAnchor="middle" fill="#C5C3BC" fontSize="11" fontFamily="JetBrains Mono, monospace">DID-aware · VC v2</text>
        </g>

        {/* Right output */}
        <text x={W - 240} y="40" fill="#76746D" fontSize="10.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.14em">PORTABLE AUTHORIZATION</text>
        <g>
          <rect x={W - 280} y={H/2 - 28} width="220" height="56" fill="rgba(75,73,202,0.10)" stroke="rgba(75,73,202,0.45)" rx="4" />
          <text x={W - 264} y={H/2 - 6} fill="#F4F3EF" fontSize="14" fontWeight="600" fontFamily="Inter, sans-serif">Mandate · VC v2.0</text>
          <text x={W - 264} y={H/2 + 14} fill="#7978E9" fontSize="11" fontFamily="JetBrains Mono, monospace">independent of identity source</text>
        </g>
        <path d={`M ${W/2 + 100} ${H/2} L ${W - 280} ${H/2}`} stroke="rgba(75,73,202,0.30)" strokeWidth="1" />

        <g ref={flowLayerRef} />
      </svg>
    </div>
  );
}

// ---- Section 9 — Runtime Enforcement (futuristic cards) ------------

export function RuntimeEnforcementSection() {
  return (
    <section id="enforcement">
      <div className="container-wide">
        <Reveal className="section-eyebrow"><span>09 · Runtime Enforcement</span></Reveal>
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">What becomes possible when authorization becomes portable.</h2>
          </div>
        </Reveal>

        <SectionOutcome
          outcomes={[
            'Apply the same authorization rules to humans, agents, and systems uniformly.',
            'Convert manual controls (4-eyes, segregation of duties) into programmatic enforcement.',
            'Build new automated workflows on top of guaranteed authorization — not best-effort.',
            'Run autonomous systems with hard guardrails that travel with every action.',
          ]}
          docs={{ label: 'Enforcement points', href: 'https://humanos.mintlify.app/enforcement' }}
        />

        <div className="stage-light" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginTop: 24,
          padding: 24,
          borderRadius: 8,
        }}>
          {[
            { l: 'Cross-system runtime verification', sub: 'every action verifiable at the boundary' },
            { l: 'Portable delegation across organizations', sub: 'authority that travels with the actor' },
            { l: 'External execution legitimacy before settlement', sub: 'verify what was allowed, before money moves' },
            { l: 'Runtime enforcement for autonomous systems', sub: 'agents that cannot act outside their mandate' },
          ].map((c, i) => (
            <EnforcementCard key={i} idx={i} label={c.l} sub={c.sub} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EnforcementCard({ idx, label, sub }) {
  const [ref, inView] = useInView(0.3);
  return (
    <div ref={ref} style={{
      background: 'var(--surface-1)',
      border: '1px solid var(--line-mid)',
      borderRadius: 8,
      padding: 28,
      minHeight: 340,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <span className="mono" style={{ fontSize: 10.5, color: 'var(--fg-on-dark-3)', letterSpacing: '0.12em' }}>
        EMERGING · 0{idx+1}
      </span>
      <div
        className="mobile-hide"
        style={{
          flex: 1,
          position: 'relative',
          borderRadius: 4,
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(75,73,202,0.10), transparent 60%), var(--surface-3)',
          border: '1px solid var(--line-dim)',
          minHeight: 140,
          overflow: 'hidden',
        }}
      >
        <EnforcementMini idx={idx} active={inView} />
      </div>

      <h3 style={{
        fontSize: 16.5, fontWeight: 600, letterSpacing: '-0.008em',
        lineHeight: 1.3, margin: 0, color: 'var(--fg-on-dark-1)',
      }}>{label}</h3>
      <p style={{
        fontSize: 13, lineHeight: 1.5, margin: 0,
        color: 'var(--fg-on-dark-3)',
      }}>{sub}</p>
    </div>
  );
}

function EnforcementMini({ idx, active }) {
  // Four distinct subtle motion vignettes
  if (idx === 0) return <MiniGrid active={active} />;
  if (idx === 1) return <MiniOrbit active={active} />;
  if (idx === 2) return <MiniLedger active={active} />;
  return <MiniAgent active={active} />;
}

function MiniGrid({ active }) {
  return (
    <svg viewBox="0 0 200 140" style={{ width: '100%', height: '100%', display: 'block' }}>
      {Array.from({ length: 6 }).map((_, c) => Array.from({ length: 5 }).map((__, r) => {
        const x = 20 + c * 30;
        const y = 18 + r * 25;
        const delay = (c + r) * 0.2;
        return (
          <rect key={`${c}-${r}`} x={x - 3} y={y - 3} width="6" height="6"
            fill="#7978E9" opacity="0.18">
            {active && <animate attributeName="opacity" values="0.18;0.7;0.18" dur="2.4s" repeatCount="indefinite" begin={`${delay}s`} />}
          </rect>
        );
      })).flat()}
    </svg>
  );
}

function MiniOrbit({ active }) {
  return (
    <svg viewBox="0 0 200 140" style={{ width: '100%', height: '100%' }}>
      <ellipse cx="100" cy="70" rx="70" ry="38" fill="none" stroke="rgba(244,243,239,0.10)" strokeWidth="1" />
      <ellipse cx="100" cy="70" rx="42" ry="22" fill="none" stroke="rgba(244,243,239,0.12)" strokeWidth="1" />
      <circle cx="100" cy="70" r="6" fill="#7978E9" />
      <circle r="2.4" fill="#E4D8C8">
        {active && <animateMotion dur="3.6s" repeatCount="indefinite" path="M 170 70 A 70 38 0 1 1 30 70 A 70 38 0 1 1 170 70" />}
      </circle>
      <circle r="2.4" fill="#7DA0FA">
        {active && <animateMotion dur="2.4s" repeatCount="indefinite" path="M 142 70 A 42 22 0 1 1 58 70 A 42 22 0 1 1 142 70" />}
      </circle>
    </svg>
  );
}

function MiniLedger({ active }) {
  return (
    <svg viewBox="0 0 200 140" style={{ width: '100%', height: '100%' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <g key={i} transform={`translate(20, ${20 + i * 22})`}>
          <rect width="160" height="14" fill="rgba(244,243,239,0.04)" rx="1.5" />
          <rect width={40 + i * 24} height="14" fill="#7978E9" opacity="0.3" rx="1.5">
            {active && <animate attributeName="width" values={`0;${40 + i * 24}`} dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />}
          </rect>
          <circle cx="166" cy="7" r="2" fill="#4B49CA">
            {active && <animate attributeName="opacity" values="0;1" dur="2s" repeatCount="indefinite" begin={`${i * 0.3 + 1.4}s`} />}
          </circle>
        </g>
      ))}
    </svg>
  );
}

function MiniAgent({ active }) {
  return (
    <svg viewBox="0 0 200 140" style={{ width: '100%', height: '100%' }}>
      <rect x="30" y="50" width="50" height="40" fill="rgba(244,243,239,0.04)" stroke="rgba(244,243,239,0.10)" rx="3" />
      <text x="55" y="74" textAnchor="middle" fill="#F4F3EF" fontSize="9" fontFamily="JetBrains Mono, monospace">agent</text>
      <rect x="120" y="50" width="50" height="40" fill="rgba(75,73,202,0.10)" stroke="rgba(75,73,202,0.45)" rx="3" />
      <text x="145" y="74" textAnchor="middle" fill="#7978E9" fontSize="9" fontFamily="JetBrains Mono, monospace">mandate</text>
      <path d="M 80 70 L 120 70" stroke="rgba(75,73,202,0.40)" strokeWidth="1" />
      {active && (
        <>
          <circle r="2.5" fill="#7978E9">
            <animateMotion dur="2.4s" repeatCount="indefinite" path="M 80 70 L 120 70" />
          </circle>
          <circle r="2.5" fill="#E4D8C8">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin="1.2s" path="M 120 70 L 80 70" />
          </circle>
        </>
      )}
    </svg>
  );
}

