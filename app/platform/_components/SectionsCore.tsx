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
// Core sections 2–5
// 2 Portable Authorization · 3 Runtime Verification
// 4 Dynamic Recovery · 5 Execution Receipts
// ============================================================

// ---- Section 2 — Portable Authorization ----------------------------

export function PortableAuthSection() {
  return (
    <section id="authorization" data-theme="light">
      <div className="container-wide">
        <Reveal className="section-eyebrow"><span>02 · Portable Authorization</span></Reveal>
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">Portable authorization.</h2>
            <p className="section-sub section-head-aside">
              Turn approvals, permissions, policies, contracts, and delegated authority into
              reusable runtime authorization — verifiable by any system that needs to act on them.
            </p>
          </div>
        </Reveal>

        <SectionOutcome
          outcomes={[
            'Sign an approval once; reuse it across every system that needs to act on it.',
            'Add a new acting system without re-issuing or re-signing mandates.',
            'Keep policy and enforcement in lockstep — no drift between what was approved and what runs.',
            'Revoke or amend in one place; every downstream system sees it on the next verify.',
          ]}
          docs={{ label: 'Mandates & Requests', href: 'https://docs.humanos.id/essentials/quick-start' }}
        />

        <Reveal delay={120}><MandatePortability /></Reveal>
      </div>
    </section>
  );
}

const MANDATE_FIELDS = [
  { k: 'mandate_id',     v: '0xA13F·B82C·DD41…', mono: true },
  { k: 'subject',        v: 'did:hum:org/treasury-eu', mono: true },
  { k: 'action',         v: 'transfer.execute' },
  { k: 'scope',          v: 'counterparty.allowlist · region:EU' },
  { k: 'constraints',    v: 'amount ≤ €10,000 · per_day ≤ €50,000' },
  { k: 'delegation',     v: 'cfo → ops → agent.v1', mono: true },
  { k: 'valid_until',    v: '2026-06-01T23:59:59Z', mono: true },
  { k: 'revocation',     v: 'registry:via.revoke/0xA13F' },
  { k: 'signer',         v: 'Elena Ruiz · Authority of Record' },
];

function MandatePortability() {
  const [ref, inView] = useInView(0.15);
  const [activeField, setActiveField] = useState(-1);
  const [portableMode, setPortableMode] = useState(false);
  const [targetIdx, setTargetIdx] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let timeouts = [];
    // Stagger fields in
    MANDATE_FIELDS.forEach((_, i) => {
      timeouts.push(setTimeout(() => setActiveField(i), i * 140 + 100));
    });
    // Switch to portable mode
    timeouts.push(setTimeout(() => setPortableMode(true), MANDATE_FIELDS.length * 140 + 600));
    // Cycle target highlights
    const interval = setInterval(() => {
      setTargetIdx(i => (i + 1) % 5);
    }, 1400);
    timeouts.push(interval);
    return () => timeouts.forEach(t => clearTimeout(t));
  }, [inView]);

  const targets = [
    { label: 'ERP',         sub: 'po.dispatch' },
    { label: 'Treasury',    sub: 'transfer.execute' },
    { label: 'AI agents',   sub: 'autonomous.action' },
    { label: 'External API',sub: 'partner.system' },
    { label: 'Wallet',      sub: 'signer.attest' },
  ];

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: '1.05fr 1fr',
      gap: 32,
      alignItems: 'stretch',
    }} className="mandate-stage">
      {/* Mandate card */}
      <div style={{
        background: 'var(--surface-1)',
        border: '1px solid var(--line-mid)',
        borderRadius: 8,
        padding: 36,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 8,
        }}>
          <span className="label-cap">MANDATE · VC v2</span>
          <span className="result-pill is-authorized" style={{ background: 'rgba(75,73,202,0.10)' }}>
            <span className="mark"></span>
            <span>Signed</span>
          </span>
        </div>
        <h3 style={{
          fontSize: 24, fontWeight: 600, letterSpacing: '-0.018em',
          margin: '12px 0 4px', color: 'var(--fg-on-dark-1)',
        }}>transfer.execute</h3>
        <p className="mono" style={{
          color: 'var(--fg-on-dark-3)', fontSize: 12, margin: '0 0 28px',
        }}>did:hum:mandate/0xA13F·B82C</p>

        <hr className="rule" style={{ background: 'var(--line-dim)' }} />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {MANDATE_FIELDS.map((f, i) => (
            <div key={f.k}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: 16,
                padding: '11px 0',
                borderBottom: '1px solid var(--line-dim)',
                opacity: i <= activeField ? 1 : 0,
                transform: i <= activeField ? 'none' : 'translateY(4px)',
                transition: 'opacity 420ms var(--ease-standard), transform 420ms var(--ease-standard)',
              }}
            >
              <span className="mono" style={{
                fontSize: 11, color: 'var(--fg-on-dark-3)',
                letterSpacing: '0.04em',
              }}>{f.k}</span>
              <span style={{
                fontSize: f.mono ? 12.5 : 13.5,
                fontFamily: f.mono ? 'JetBrains Mono, monospace' : 'inherit',
                color: 'var(--fg-on-dark-1)',
                letterSpacing: f.mono ? 0 : '-0.005em',
              }}>{f.v}</span>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginTop: 24,
        }}>
          <HumanosMark size={14} />
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-on-dark-3)', letterSpacing: '0.06em' }}>
            VERIFIED BY HUMANOS · ANCHORED 2026-04-21T09:14:22Z
          </span>
        </div>
      </div>

      {/* Portability target column */}
      <div style={{
        background: 'var(--surface-1)',
        border: '1px solid var(--line-mid)',
        borderRadius: 8,
        padding: 36,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span className="label-cap">PORTABILITY</span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-on-dark-3)' }}>
            { portableMode ? 'same mandate · reused' : 'awaiting binding…' }
          </span>
        </div>

        <h3 style={{
          fontSize: 22, fontWeight: 600, letterSpacing: '-0.012em',
          margin: 0, color: 'var(--fg-on-dark-1)', maxWidth: 380,
        }}>
          The same mandate, verifiable across every system that acts on it.
        </h3>

        <div style={{ flex: 1, position: 'relative', marginTop: 32 }}>
          <svg viewBox="0 0 460 360" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <linearGradient id="portLine" x1="0" x2="1">
                <stop offset="0%" stopColor="#4B49CA" stopOpacity="0" />
                <stop offset="50%" stopColor="#4B49CA" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#4B49CA" stopOpacity="0" />
              </linearGradient>
              <filter id="portGlow"><feGaussianBlur stdDeviation="2.5" /></filter>
            </defs>
            {/* Central mandate token */}
            <g transform="translate(80, 180)">
              <circle r="34" fill="rgba(75,73,202,0.10)" stroke="rgba(75,73,202,0.45)" strokeWidth="1" />
              <circle r="22" fill="#0E0E11" stroke="rgba(75,73,202,0.50)" strokeWidth="1" />
              <g transform="translate(-9, -9)">
                <rect x="0" y="2" width="3" height="14" fill="#7978E9" />
                <rect x="7" y="-2" width="3" height="20" fill="#7978E9" />
                <rect x="14" y="5" width="3" height="9" fill="#7978E9" />
              </g>
              <text y="-50" textAnchor="middle" fill="#8A887F" fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.14em">MANDATE</text>
              <text y="58" textAnchor="middle" fill="#C5C3BC" fontSize="10.5" fontFamily="JetBrains Mono, monospace">0xA13F·B82C</text>
            </g>

            {/* Target nodes around */}
            {targets.map((t, i) => {
              const total = targets.length;
              const angle = -Math.PI / 2 + (i / (total - 1)) * Math.PI; // arc from top to bottom on right
              const cx = 80 + Math.cos(angle - Math.PI / 2 + Math.PI) * 0; // ignore
              // We'll just lay them in a column on the right
              const x = 360;
              const y = 40 + i * 70;
              const active = portableMode && targetIdx === i;
              return (
                <g key={t.label}>
                  <path
                    d={`M 114 180 C 200 180, 260 ${y}, ${x - 6} ${y}`}
                    stroke={active ? '#4B49CA' : 'rgba(75,73,202,0.18)'}
                    strokeWidth={active ? '1.5' : '1'}
                    fill="none"
                    style={{ transition: 'stroke 400ms' }}
                  />
                  {active && (
                    <circle r="3" fill="#7978E9" filter="url(#portGlow)">
                      <animateMotion dur="1.2s" repeatCount="1"
                        path={`M 114 180 C 200 180, 260 ${y}, ${x - 6} ${y}`} />
                    </circle>
                  )}
                  <rect
                    x={x} y={y - 18}
                    width="100" height="36"
                    fill={active ? 'rgba(75,73,202,0.10)' : '#16161A'}
                    stroke={active ? 'rgba(75,73,202,0.55)' : 'rgba(244,243,239,0.10)'}
                    strokeWidth="1"
                    rx="3"
                    style={{ transition: 'all 400ms' }}
                  />
                  <text x={x + 12} y={y - 2}
                    fill="#F4F3EF" fontSize="12" fontWeight="500" fontFamily="Inter, sans-serif"
                  >{t.label}</text>
                  <text x={x + 12} y={y + 12}
                    fill="#76746D" fontSize="10" fontFamily="JetBrains Mono, monospace"
                  >{t.sub}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <div style={{ display: 'flex', gap: 24, marginTop: 16, flexWrap: 'wrap' }}>
          <Stat n="1×" l="issued by human" />
          <Stat n="∞" l="verifications" />
          <Stat n="0" l="re-approval" />
        </div>
      </div>
    </div>
  );
}

function Stat({ n, l }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--fg-on-dark-1)' }}>{n}</span>
      <span className="label-cap" style={{ fontSize: 10.5 }}>{l}</span>
    </div>
  );
}

// ---- Section 3 — Runtime Verification -------------------------------

export function RuntimeVerificationSection() {
  return (
    <section id="verification">
      <div className="container-wide">
        <Reveal className="section-eyebrow"><span>04 · Runtime Verification</span></Reveal>
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">Verify before execution.</h2>
            <p className="section-sub section-head-aside">
              Every action passes through six deterministic checks before it touches a system of record.
              No verification, no execution.
            </p>
          </div>
        </Reveal>

        <SectionOutcome
          outcomes={[
            'Block disallowed actions before they touch a system of record — not after.',
            'Replace per-app rule code with one deterministic verification call.',
            'Get a signed, sub-second answer in the execution path instead of after-the-fact reconciliation.',
            'Make every “was this allowed?” question answerable from a single source.',
          ]}
          docs={{ label: 'humanos.verify()', href: 'https://humanos.mintlify.app/verify' }}
        />

        <Reveal delay={120}><VerificationEngine /></Reveal>
      </div>
    </section>
  );
}

const VERIFY_CHECKS = [
  { k: 'scope',       label: 'scope' },
  { k: 'delegation',  label: 'delegation chain' },
  { k: 'policy',      label: 'policy constraints' },
  { k: 'revocation',  label: 'revocation registry' },
  { k: 'freshness',   label: 'mandate freshness' },
  { k: 'identity',    label: 'identity & DID' },
];

const VERIFY_SCRIPT = [
  { src: 'treasury',     action: 'transfer €4,800', mandate: '0xA13F', result: 'authorized', checks: 'all' },
  { src: 'erp',          action: 'po.dispatch 1.2M',mandate: '0x91D2', result: 'escalate',   checks: ['scope'] },
  { src: 'ai-agent',     action: 'rebalance €60k',  mandate: '0xC44A', result: 'collect',    checks: ['policy'] },
  { src: 'broker',       action: 'sell 12k shares', mandate: '0xE001', result: 'authorized', checks: 'all' },
  { src: 'healthcare',   action: 'order.release',   mandate: '0x77BE', result: 'rejected',   checks: ['revocation'] },
  { src: 'treasury',     action: 'transfer €820',   mandate: '0xA13F', result: 'authorized', checks: 'all' },
];

function VerificationEngine() {
  const [ref, inView] = useInView(0.2);
  const [stepIdx, setStepIdx] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle, checking, resolved
  const [activeCheckIdx, setActiveCheckIdx] = useState(-1);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    let timeouts = [];

    const runStep = (idx) => {
      const step = VERIFY_SCRIPT[idx];
      setStepIdx(idx);
      setPhase('checking');
      setActiveCheckIdx(-1);
      VERIFY_CHECKS.forEach((_, i) => {
        timeouts.push(setTimeout(() => {
          if (cancelled) return;
          setActiveCheckIdx(i);
        }, 220 * (i + 1)));
      });
      timeouts.push(setTimeout(() => {
        if (cancelled) return;
        setPhase('resolved');
        setRecent(r => [{ ...step, t: Date.now() }, ...r].slice(0, 8));
      }, 220 * VERIFY_CHECKS.length + 200));
      timeouts.push(setTimeout(() => {
        if (cancelled) return;
        runStep((idx + 1) % VERIFY_SCRIPT.length);
      }, 220 * VERIFY_CHECKS.length + 1800));
    };
    runStep(0);
    return () => { cancelled = true; timeouts.forEach(t => clearTimeout(t)); };
  }, [inView]);

  const step = VERIFY_SCRIPT[stepIdx];
  const resultMeta = {
    authorized: { color: '#4B49CA', label: 'authorized', sub: 'execution allowed' },
    rejected:   { color: '#F3797E', label: 'rejected',   sub: 'mandate revoked' },
    collect:    { color: '#E4D8C8', label: 'collect_missing', sub: 'auth not in scope' },
    escalate:   { color: '#FFC46B', label: 'escalate',   sub: 'human signature required' },
  }[step.result];

  return (
    <div ref={ref} className="stage-light" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 0.9fr',
      gap: 24,
      padding: 24,
    }}>
      {/* Live engine */}
      <div style={{
        background: 'var(--surface-1)',
        border: '1px solid var(--line-mid)',
        borderRadius: 8,
        padding: 32,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span className="label-cap">VERIFY · LIVE</span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-on-dark-3)' }}>
            {phase === 'checking' ? 'running…' : phase === 'resolved' ? 'resolved' : 'idle'}
          </span>
        </div>

        {/* Incoming request */}
        <div style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--line-mid)',
          borderRadius: 4,
          padding: '16px 20px',
          marginBottom: 24,
        }}>
          <span className="label-cap" style={{ fontSize: 10 }}>INCOMING</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
            <span className="mono" style={{ fontSize: 14, color: 'var(--c-pending)' }}>
              verify({step.src}.{step.action.split(' ')[0]})
            </span>
            <span style={{ color: 'var(--fg-on-dark-2)', fontSize: 14 }}>{step.action}</span>
          </div>
          <div style={{ marginTop: 6 }}>
            <span className="mono" style={{ fontSize: 11.5, color: 'var(--fg-on-dark-3)' }}>
              mandate · {step.mandate}
            </span>
          </div>
        </div>

        {/* Six checks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {VERIFY_CHECKS.map((c, i) => {
            const failed = phase === 'resolved' && Array.isArray(step.checks) && step.checks.includes(c.k);
            const passed = (phase === 'resolved' && !failed) || (phase === 'checking' && activeCheckIdx >= i);
            const checking = phase === 'checking' && activeCheckIdx === i;
            return (
              <div key={c.k} style={{
                display: 'grid',
                gridTemplateColumns: '20px 1fr 90px',
                alignItems: 'center',
                gap: 14,
                padding: '8px 0',
                opacity: passed || checking ? 1 : 0.4,
                transition: 'opacity 200ms',
              }}>
                <span style={{
                  width: 16, height: 16, borderRadius: 2,
                  border: `1px solid ${failed ? 'var(--c-reject)' : passed ? 'var(--c-verify)' : 'var(--line-mid)'}`,
                  background: failed ? 'rgba(243,121,126,0.18)' : passed ? 'var(--c-verify)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: failed ? 'var(--c-reject)' : '#0A0A0B',
                  transition: 'all 220ms',
                }}>
                  {passed && !failed && <CheckGlyph size={10} />}
                  {failed && <CrossGlyph size={10} />}
                </span>
                <span className="mono" style={{ fontSize: 12.5, color: 'var(--fg-on-dark-2)' }}>{c.label}</span>
                <span className="mono" style={{
                  fontSize: 10.5,
                  color: failed ? 'var(--c-reject)' : passed ? 'var(--c-verify)' : 'var(--fg-on-dark-4)',
                  textAlign: 'right',
                  letterSpacing: '0.06em',
                }}>
                  {checking ? 'CHECKING…' : failed ? 'FAILED' : passed ? 'PASS' : 'QUEUED'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Result */}
        <div style={{
          marginTop: 24,
          padding: '20px 24px',
          background: `linear-gradient(180deg, ${hexA(resultMeta.color, 0.10)}, transparent)`,
          border: `1px solid ${hexA(resultMeta.color, 0.40)}`,
          borderRadius: 4,
          opacity: phase === 'resolved' ? 1 : 0.25,
          transform: phase === 'resolved' ? 'none' : 'translateY(4px)',
          transition: 'opacity 360ms, transform 360ms',
        }}>
          <span className="label-cap" style={{ fontSize: 10 }}>RESULT</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 6 }}>
            <span className="mono" style={{
              fontSize: 22, fontWeight: 500,
              color: resultMeta.color,
              letterSpacing: '-0.005em',
            }}>{resultMeta.label}</span>
            <span style={{ fontSize: 13, color: 'var(--fg-on-dark-3)' }}>{resultMeta.sub}</span>
          </div>
        </div>
      </div>

      {/* Result primitives & recent stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--line-mid)',
          borderRadius: 8,
          padding: 24,
        }}>
          <span className="label-cap">RESULT PRIMITIVES</span>
          <div style={{
            marginTop: 16,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
          }}>
            {[
              { color: '#4B49CA', label: 'authorized' },
              { color: '#F3797E', label: 'rejected' },
              { color: '#E4D8C8', label: 'collect_missing' },
              { color: '#FFC46B', label: 'escalate' },
            ].map(r => (
              <div key={r.label} style={{
                padding: '10px 12px',
                background: 'var(--surface-2)',
                border: '1px solid var(--line-mid)',
                borderRadius: 2,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: r.color,
                  boxShadow: `0 0 12px ${r.color}`,
                }}></span>
                <span className="mono" style={{ fontSize: 11.5, color: 'var(--fg-on-dark-2)' }}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--line-mid)',
          borderRadius: 8,
          padding: 24,
          flex: 1,
          minHeight: 320,
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span className="label-cap">RECENT VERIFICATIONS</span>
            <span className="mono" style={{ fontSize: 10, color: 'var(--fg-on-dark-3)' }}>last 8 events</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recent.length === 0 && (
              <span className="mono" style={{ fontSize: 11.5, color: 'var(--fg-on-dark-4)' }}>
                awaiting traffic…
              </span>
            )}
            {recent.map((r, i) => {
              const c = {
                authorized: '#4B49CA',
                rejected:   '#F3797E',
                collect:    '#E4D8C8',
                escalate:   '#FFC46B',
              }[r.result];
              return (
                <div key={`${r.t}-${i}`} style={{
                  display: 'grid',
                  gridTemplateColumns: '8px 1fr auto',
                  gap: 12,
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--line-dim)',
                  opacity: 1 - i * 0.10,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%', background: c,
                    boxShadow: i === 0 ? `0 0 8px ${c}` : 'none',
                  }}></span>
                  <span className="mono" style={{ fontSize: 11.5, color: 'var(--fg-on-dark-2)' }}>
                    {r.src}.{r.action}
                  </span>
                  <span className="mono" style={{ fontSize: 10.5, color: c, letterSpacing: '0.06em' }}>
                    {r.result === 'collect' ? 'COLLECT' : r.result.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function hexA(hex, a) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

// ---- Section 4 — Dynamic Authorization Recovery --------------------

export function RecoverySection() {
  return (
    <section id="recovery" data-theme="light">
      <div className="container-wide">
        <Reveal className="section-eyebrow"><span>05 · Dynamic Recovery</span></Reveal>
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">Recover authorization dynamically.</h2>
            <p className="section-sub section-head-aside">
              Most systems allow or deny. Humanos recovers execution legitimacy in real time — pausing
              an action, collecting what's missing, resuming where it stopped.
            </p>
          </div>
        </Reveal>

        <SectionOutcome
          outcomes={[
            'Keep workflows moving when authority changes hands mid-flight — no silent stalls.',
            'Escalate to a human only when one is actually required — and resume cleanly after.',
            'Eliminate manual “re-issue approval” cycles when scope, signers, or constraints shift.',
            'Turn auth failures into recoverable states instead of dead ends.',
          ]}
          docs={{ label: 'Mandate lifecycle', href: 'https://docs.humanos.id/essentials/quick-start' }}
        />
        <Reveal delay={120}><RecoveryFlow /></Reveal>
      </div>
    </section>
  );
}

const RECOVERY_STEPS = [
  { state: 'executing', label: 'transaction in flight', sub: 'agent.v1 · transfer €52,000', tone: 'execute' },
  { state: 'paused',    label: 'paused — outside scope', sub: 'mandate ceiling: €50,000', tone: 'reject' },
  { state: 'collect',   label: 'authorization request', sub: 'requesting CFO approval', tone: 'collect' },
  { state: 'signed',    label: 'human signature received', sub: 'Elena Ruiz · 2026-04-21T09:14:22Z', tone: 'human' },
  { state: 'updated',   label: 'mandate updated', sub: 'ceiling raised to €60,000', tone: 'verify' },
  { state: 'resumed',   label: 'execution resumed', sub: 'transfer completed · proof emitted', tone: 'verify' },
];

const TONE_COLORS = {
  execute: '#7978E9',
  reject:  '#F3797E',
  collect: '#E4D8C8',
  human:   '#E4D8C8',
  verify:  '#4B49CA',
};

function RecoveryFlow() {
  const [ref, inView] = useInView(0.2);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    setActiveStep(0);
    const interval = setInterval(() => {
      i = (i + 1) % (RECOVERY_STEPS.length + 1);
      setActiveStep(i >= RECOVERY_STEPS.length ? 0 : i);
    }, 1600);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} style={{
      background: 'var(--surface-1)',
      border: '1px solid var(--line-mid)',
      borderRadius: 8,
      padding: 40,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 16,
        marginBottom: 32,
        position: 'relative',
      }}>
        {/* Connecting line behind */}
        <div style={{
          position: 'absolute',
          left: '8.3%', right: '8.3%',
          top: 14,
          height: 1,
          background: 'var(--line-mid)',
          zIndex: 0,
        }}></div>
        <div style={{
          position: 'absolute',
          left: '8.3%',
          top: 14,
          height: 1,
          width: `calc(${(activeStep / (RECOVERY_STEPS.length - 1)) * 83.4}%)`,
          background: 'linear-gradient(90deg, var(--c-execute), var(--c-verify))',
          transition: 'width 600ms var(--ease-standard)',
          zIndex: 1,
        }}></div>

        {RECOVERY_STEPS.map((s, i) => {
          const isActive = activeStep === i;
          const isPast = i < activeStep;
          const color = TONE_COLORS[s.tone];
          return (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              position: 'relative',
              zIndex: 2,
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: '50%',
                background: isActive || isPast ? color : 'var(--surface-2)',
                border: `1px solid ${isActive || isPast ? color : 'var(--line-mid)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#0A0A0B',
                boxShadow: isActive ? `0 0 0 6px ${hexA(color, 0.18)}, 0 0 18px ${hexA(color, 0.4)}` : 'none',
                transition: 'all 320ms',
                position: 'relative',
              }}>
                {isPast ? <CheckGlyph size={11} /> : null}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    inset: -8,
                    borderRadius: '50%',
                    border: `1px solid ${color}`,
                    opacity: 0.4,
                    animation: 'recoveryPulse 1.4s infinite',
                  }}></span>
                )}
              </span>
              <span className="mono" style={{
                fontSize: 10, color: 'var(--fg-on-dark-3)', letterSpacing: '0.10em',
                textAlign: 'center',
              }}>STEP 0{i+1}</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes recoveryPulse {
          0% { transform: scale(1); opacity: 0.45; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>

      {/* Live detail panel */}
      <div style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--line-mid)',
        borderRadius: 4,
        padding: 32,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        minHeight: 200,
      }}>
        <div>
          <span className="label-cap" style={{
            color: TONE_COLORS[RECOVERY_STEPS[activeStep].tone],
          }}>{RECOVERY_STEPS[activeStep].state.toUpperCase()}</span>
          <h3 style={{
            fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em',
            margin: '10px 0 8px', color: 'var(--fg-on-dark-1)',
          }}>{RECOVERY_STEPS[activeStep].label}</h3>
          <p className="mono" style={{
            fontSize: 13, color: 'var(--fg-on-dark-3)',
          }}>{RECOVERY_STEPS[activeStep].sub}</p>
        </div>

        <div style={{
          display: 'flex', flexDirection: 'column', gap: 10,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12,
        }}>
          <RecoveryLog active={activeStep >= 0} color="#7978E9" l="exec.start" v="agent.v1 → transfer.execute" />
          <RecoveryLog active={activeStep >= 1} color="#F3797E" l="exec.pause" v="reason: scope.amount.exceeded" />
          <RecoveryLog active={activeStep >= 2} color="#E4D8C8" l="auth.request" v="signer: cfo · channel: secure_link" />
          <RecoveryLog active={activeStep >= 3} color="#E4D8C8" l="auth.signed" v="Elena Ruiz · 2026-04-21T09:14:22Z" />
          <RecoveryLog active={activeStep >= 4} color="#4B49CA" l="mandate.update" v="ceiling: €50,000 → €60,000" />
          <RecoveryLog active={activeStep >= 5} color="#4B49CA" l="exec.resume" v="proof.id: 0xPF·77E2 · authorized" />
        </div>
      </div>
    </div>
  );
}

function RecoveryLog({ active, color, l, v }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      gap: 16,
      opacity: active ? 1 : 0.25,
      transition: 'opacity 360ms',
    }}>
      <span style={{ color, letterSpacing: '0.04em' }}>{l}</span>
      <span style={{ color: 'var(--fg-on-dark-2)' }}>{v}</span>
    </div>
  );
}

// ---- Section 5 — Execution Receipts --------------------------------

export function ReceiptsSection() {
  return (
    <section id="receipts">
      <div className="container-wide">
        <Reveal className="section-eyebrow"><span>06 · Execution Receipts</span></Reveal>
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">Portable execution receipts.</h2>
            <p className="section-sub section-head-aside">
              Every action emits independently verifiable proof — anchored, signed, and
              re-verifiable by any party that needs to attest to what happened.
            </p>
          </div>
        </Reveal>

        <SectionOutcome
          outcomes={[
            'Hand auditors and counterparties cryptographic proof — not screenshots and log exports.',
            'Make every executed action independently re-verifiable by anyone, forever.',
            'Skip downstream reconciliation between systems that already agree on the proof.',
            'Anchor compliance evidence at the moment of action, not at quarter-end.',
          ]}
          docs={{ label: 'Proofs (PoAI)', href: 'https://humanos.mintlify.app/proofs' }}
        />
        <Reveal delay={120}><ReceiptStage /></Reveal>
      </div>
    </section>
  );
}

function ReceiptStage() {
  const [ref, inView] = useInView(0.2);
  const [expanded, setExpanded] = useState(false);
  const [emit, setEmit] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setExpanded(true), 400);
    const t2 = setTimeout(() => setEmit(true), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [inView]);

  const receiptFields = [
    { l: 'authorized_by', v: 'Elena Ruiz · CFO' },
    { l: 'mandate',       v: '0xA13F·B82C·DD41', mono: true },
    { l: 'action',        v: 'transfer.execute · €4,800' },
    { l: 'constraints',   v: 'counterparty.allow · region.EU' },
    { l: 'delegation',    v: 'cfo → ops → agent.v1', mono: true },
    { l: 'policy_version', v: 'treasury.policy/v2.4', mono: true },
    { l: 'executed_at',   v: '2026-04-21T09:14:22Z', mono: true },
    { l: 'result',        v: 'authorized' },
    { l: 'proof_id',      v: '0xPF·77E2·1AC9', mono: true },
  ];

  const verifiers = [
    { label: 'Auditor',       sub: 'verifies(proof) · independent' },
    { label: 'Bank',          sub: 'settlement.assert' },
    { label: 'Regulator',     sub: 'compliance.scan' },
    { label: 'Counterparty',  sub: 'partner.acknowledge' },
  ];

  return (
    <div ref={ref} className="stage-light" style={{
      display: 'grid',
      gridTemplateColumns: '1.05fr 1fr',
      gap: 32,
      padding: 24,
    }}>
      {/* Receipt itself */}
      <div style={{
        background: 'var(--surface-1)',
        border: '1px solid var(--line-mid)',
        borderRadius: 8,
        padding: 36,
        position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <span className="label-cap">PROOF · POAI</span>
          <span className="result-pill is-authorized" style={{ background: 'rgba(75,73,202,0.10)' }}>
            <span className="mark"></span>
            <span>Anchored</span>
          </span>
        </div>

        <h3 style={{
          fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em',
          margin: '0 0 4px', color: 'var(--fg-on-dark-1)',
        }}>verifiable proof</h3>
        <p className="mono" style={{ fontSize: 12, color: 'var(--fg-on-dark-3)', margin: 0 }}>
          one verification event · permanent record · re-verifiable forever
        </p>

        <hr className="rule" style={{ margin: '24px 0' }} />

        <div style={{
          display: 'flex', flexDirection: 'column',
        }}>
          {receiptFields.map((f, i) => (
            <div key={f.l} style={{
              display: 'grid',
              gridTemplateColumns: '140px 1fr',
              gap: 16,
              padding: '10px 0',
              borderBottom: '1px solid var(--line-dim)',
              opacity: expanded ? 1 : 0.0,
              transform: expanded ? 'translateY(0)' : 'translateY(6px)',
              transition: `opacity 400ms ${i * 60}ms var(--ease-standard), transform 400ms ${i * 60}ms var(--ease-standard)`,
            }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--fg-on-dark-3)' }}>{f.l}</span>
              <span style={{
                fontSize: f.mono ? 12.5 : 13.5,
                fontFamily: f.mono ? 'JetBrains Mono, monospace' : 'inherit',
                color: 'var(--fg-on-dark-1)',
              }}>{f.v}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 24 }}>
          <HumanosMark size={14} />
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-on-dark-3)', letterSpacing: '0.06em' }}>
            VERIFIED BY HUMANOS · ANYONE CAN RE-VERIFY THIS PROOF, FOREVER
          </span>
        </div>
      </div>

      {/* Verifiers */}
      <div style={{
        background: 'var(--surface-1)',
        border: '1px solid var(--line-mid)',
        borderRadius: 8,
        padding: 36,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <span className="label-cap">EXTERNAL VERIFIERS</span>
        <h3 style={{
          fontSize: 22, fontWeight: 600, letterSpacing: '-0.012em',
          margin: '12px 0 32px', color: 'var(--fg-on-dark-1)', maxWidth: 380,
        }}>
          Every party that needs to trust an action can verify it independently.
        </h3>

        <div style={{ flex: 1, position: 'relative' }}>
          <svg viewBox="0 0 460 360" style={{ width: '100%', height: '100%' }}>
            <defs>
              <filter id="receiptGlow"><feGaussianBlur stdDeviation="2" /></filter>
            </defs>
            {/* central proof token */}
            <g transform="translate(80, 180)">
              <rect x="-30" y="-22" width="60" height="44" fill="rgba(75,73,202,0.10)" stroke="rgba(75,73,202,0.45)" rx="3" />
              <text textAnchor="middle" y="-2" fill="#F4F3EF" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif">PROOF</text>
              <text textAnchor="middle" y="12" fill="#7978E9" fontSize="9" fontFamily="JetBrains Mono, monospace">0xPF·77E2</text>
            </g>

            {verifiers.map((v, i) => {
              const y = 40 + i * 90;
              return (
                <g key={v.label}>
                  <path d={`M 110 180 C 200 180, 260 ${y}, 350 ${y}`}
                    stroke={emit ? 'rgba(75,73,202,0.45)' : 'rgba(75,73,202,0.10)'}
                    strokeWidth="1" fill="none"
                    style={{ transition: 'stroke 600ms' }}
                  />
                  {emit && (
                    <circle r="2.6" fill="#7978E9" filter="url(#receiptGlow)">
                      <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.6}s`}
                        path={`M 110 180 C 200 180, 260 ${y}, 350 ${y}`} />
                    </circle>
                  )}
                  <rect x="350" y={y - 22} width="110" height="44"
                    fill="#16161A" stroke="rgba(244,243,239,0.10)" rx="3" />
                  <text x="362" y={y - 4} fill="#F4F3EF" fontSize="12" fontWeight="500" fontFamily="Inter, sans-serif">{v.label}</text>
                  <text x="362" y={y + 11} fill="#76746D" fontSize="9.5" fontFamily="JetBrains Mono, monospace">{v.sub}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          paddingTop: 24,
          borderTop: '1px solid var(--line-dim)',
        }}>
          <Stat n="W3C" l="VC v2.0" />
          <Stat n="DID" l="identified" />
          <Stat n="∞" l="re-verifiable" />
        </div>
      </div>
    </div>
  );
}

