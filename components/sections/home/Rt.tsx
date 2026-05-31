"use client";

import { useEffect, useRef } from "react";
import { MobileVisualDrawer } from "@/components/MobileVisualDrawer";

const COLLECT_PILLS = [
  "Signature",
  "Consent",
  "KYC",
  "Contract",
  "SMS",
  "WhatsApp",
  "Form",
  "Policy",
  "Payment",
  "Voice",
  "Email",
  "Slack",
  "PDF",
  "Webhook",
  "Wallet Pass",
  "OAuth",
  "Identity Check",
  "Approval Flow",
  "Document",
  "Invoice",
];

const PROP_SYSTEMS = ["Bank API", "ERP", "Treasury agent"];

const PROOF_VERIFIERS = [
  "Auditor",
  "Regulator",
  "Counterparty",
  "Bank",
  "Insurance",
  "Court",
  "Partner system",
  "Blockchain explorer",
];

const RECOVER_SCENARIOS = [
  {
    name: "Treasury",
    rows: [
      "AI agent attempts payment",
      "Amount exceeds approved limit",
      "CFO approval requested live",
      "Approval verified",
      "Payment execution resumes",
    ],
  },
  {
    name: "Healthcare",
    rows: [
      "AI agent requests patient action",
      "Consent missing for procedure",
      "Consent requested in real time",
      "Patient approves via SMS",
      "Workflow resumes safely",
    ],
  },
  {
    name: "ERP",
    rows: [
      "Invoice submitted to ERP",
      "Vendor contract missing",
      "Signature requested automatically",
      "Contract verified",
      "ERP execution resumes",
    ],
  },
  {
    name: "Procurement",
    rows: [
      "Procurement agent places order",
      "New supplier requires approval",
      "Finance review triggered",
      "Supplier approved",
      "Order proceeds automatically",
    ],
  },
];

const STACK_ITEMS = [
  { key: "1", label: "Runtime authorization" },
  { key: "2", label: "Cross-system propagation" },
  { key: "3", label: "Verify before execution" },
  { key: "4", label: "Dynamic recovery" },
  { key: "5", label: "Execution receipts" },
];

export function Rt() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const stages = Array.from(root.querySelectorAll<HTMLElement>(".rt__stage"));
    if (!stages.length) return;

    const jumpItems = Array.from(
      root.querySelectorAll<HTMLButtonElement>(".rt__copy-item[data-rt-jump]"),
    );
    const itemByStage = new Map<string, HTMLButtonElement>();
    for (const btn of jumpItems) {
      if (btn.dataset.rtJump) itemByStage.set(btn.dataset.rtJump, btn);
    }

    function getStickyOffset() {
      if (!root) return 96;
      const left = root.querySelector<HTMLElement>(".rt__left");
      if (!left) return 96;
      const top = getComputedStyle(left).top;
      const parsed = parseInt(top, 10);
      return Number.isFinite(parsed) ? parsed : 96;
    }

    function update() {
      const viewMid = window.innerHeight * 0.5;
      let bestIdx = 0;
      let bestDist = Infinity;
      stages.forEach((stage, i) => {
        const rect = stage.getBoundingClientRect();
        const mid = rect.top + rect.height * 0.5;
        const dist = Math.abs(mid - viewMid);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      stages.forEach((stage, i) => {
        const active = i === bestIdx;
        stage.classList.toggle("is-active", active);
        const key = stage.dataset.stage;
        const btn = key ? itemByStage.get(key) : null;
        if (btn) btn.classList.toggle("is-active", active);
      });
    }

    const clickHandlers: { btn: HTMLButtonElement; handler: () => void }[] = [];
    for (const btn of jumpItems) {
      const handler = () => {
        const key = btn.dataset.rtJump;
        const target = stages.find((s) => s.dataset.stage === key);
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const offset = getStickyOffset() + 24;
        const y = rect.top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      };
      btn.addEventListener("click", handler);
      clickHandlers.push({ btn, handler });
    }

    let raf: number | null = null;
    function schedule() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        update();
      });
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    // Stage 4 scenario rotator
    const recoverWrap = root.querySelector<HTMLElement>("[data-rt-recover]");
    let timer: ReturnType<typeof setInterval> | null = null;
    let io: IntersectionObserver | null = null;

    if (recoverWrap) {
      const nameEl =
        recoverWrap.querySelector<HTMLElement>("[data-rt-recover-name]");
      const textEls = Array.from(
        recoverWrap.querySelectorAll<HTMLElement>("[data-rt-recover-text]"),
      );
      const dotEls = Array.from(
        recoverWrap.querySelectorAll<HTMLElement>(".rt-recover__scenario-dot"),
      );
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      let idx = 0;

      function applyScenario(i: number) {
        const s = RECOVER_SCENARIOS[i];
        if (!s) return;
        if (nameEl) nameEl.textContent = s.name;
        textEls.forEach((el, k) => {
          if (s.rows[k]) el.textContent = s.rows[k];
        });
        dotEls.forEach((d, k) => d.classList.toggle("is-on", k === i));
      }

      function step() {
        const next = (idx + 1) % RECOVER_SCENARIOS.length;
        if (reduced) {
          idx = next;
          applyScenario(idx);
          return;
        }
        recoverWrap?.classList.add("is-swapping");
        setTimeout(() => {
          idx = next;
          applyScenario(idx);
        }, 220);
        setTimeout(() => {
          recoverWrap?.classList.remove("is-swapping");
        }, 440);
      }

      function start() {
        if (timer) return;
        timer = setInterval(step, 5600);
      }
      function stop() {
        if (!timer) return;
        clearInterval(timer);
        timer = null;
      }

      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) start();
            else stop();
          }
        },
        { threshold: 0.35 },
      );
      io.observe(recoverWrap);
    }

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
      for (const { btn, handler } of clickHandlers) {
        btn.removeEventListener("click", handler);
      }
      if (timer) clearInterval(timer);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="rt"
      data-screen-label="03 Runtime Authorization"
    >
      <div className="rt__wrap">
        <div className="rt__layout">
          <aside className="rt__left">
            <div className="rt__eyebrow">The runtime authorization lifecycle</div>
            <h2 className="rt__title">The full authorization lifecycle.</h2>
            <p className="rt__copy">
              <span className="rt__copy-lead">
                Humanos issues runtime authorization, propagates it across
                systems, verifies actions before execution, recovers missing
                approval dynamically, and generates independently verifiable
                execution receipts afterwards.
              </span>
              <span className="rt__copy-micro">
                Use the full runtime stack — or integrate only the layers you
                need.
              </span>
            </p>

            <div className="rt__group mobile-hide">
              <div className="rt__group-label">The runtime stack</div>
              <ol className="rt__copy-list">
                {STACK_ITEMS.map((item) => (
                  <li key={item.key}>
                    <button
                      className="rt__copy-item"
                      type="button"
                      data-rt-jump={item.key}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rt__call">
              <span className="fn">humanos.verify</span>(
              <span className="arg">action</span>)
            </div>
          </aside>

          <div className="rt__right">
            <article className="rt__stage" data-stage="1">
              <div className="rt__stage-num">01 / Portable authorization</div>
              <h3 className="rt__stage-h">Portable runtime authorization.</h3>
              <p className="rt__stage-sub">
                Turn existing approvals and policies — collected through Humanos
                or external systems — into runtime authorization AI systems
                verify before acting.
              </p>

              <MobileVisualDrawer label="Expand portable authorization" drawerInnerClassName="rt__stage is-active">
              <div className="rt__stage-visual rt-collect">
                <div className="rt-collect__pills">
                  {COLLECT_PILLS.map((p) => (
                    <span key={p} className="rt-collect__pill">
                      {p}
                    </span>
                  ))}
                </div>
                <div className="rt-collect__arrow" aria-hidden="true">
                  →
                </div>
                <div className="rt-obj">
                  <div className="rt-obj__head">
                    <span className="rt-obj__label">Mandate</span>
                    <span className="rt-obj__state">signed</span>
                  </div>
                  <div className="rt-obj__rows">
                    {[
                      ["scope", "treasury.payments"],
                      ["limit", "€10k / day"],
                      ["vendor", "AWS"],
                      ["subject", "acme-treasury"],
                      ["expires", "2026-12-31"],
                    ].map(([k, v]) => (
                      <div key={k} className="rt-obj__row">
                        <span className="rt-obj__k">{k}</span>
                        <span className="rt-obj__v">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rt-obj__foot">Verified before execution</div>
                </div>
              </div>
              </MobileVisualDrawer>
            </article>

            <article className="rt__stage" data-stage="2">
              <div className="rt__stage-num">02 / Cross-system propagation</div>
              <h3 className="rt__stage-h">Reusable across systems.</h3>
              <p className="rt__stage-sub">
                Runtime authorization propagates across APIs, agents, workflows,
                and external systems — allowing every participant to verify what
                actions are actually allowed before execution.
              </p>

              <MobileVisualDrawer label="Expand cross-system propagation" drawerInnerClassName="rt__stage is-active">
              <div className="rt__stage-visual rt-prop">
                <div className="rt-prop__col rt-prop__col--mandate">
                  <div className="rt-prop__mandate">
                    <div className="rt-prop__mandate-head">
                      <span className="rt-prop__mandate-label">Mandate</span>
                      <span className="rt-prop__mandate-id">auth_pK7g3xN9</span>
                    </div>
                    <div className="rt-prop__mandate-body">
                      <div className="rt-prop__mandate-row">
                        <span className="rt-prop__mandate-k">scope</span>
                        <span className="rt-prop__mandate-v">
                          treasury.payments
                        </span>
                      </div>
                      <div className="rt-prop__mandate-row">
                        <span className="rt-prop__mandate-k">limit</span>
                        <span className="rt-prop__mandate-v">€10k / day</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rt-prop__arrows" aria-hidden="true">
                  {PROP_SYSTEMS.map((_, i) => (
                    <div key={i} className="rt-prop__arrow-row">
                      <svg viewBox="0 0 64 12">
                        <path d="M0 6 L56 6" />
                        <polygon points="56,2 64,6 56,10" />
                      </svg>
                    </div>
                  ))}
                </div>

                <div className="rt-prop__col rt-prop__col--systems">
                  <ul className="rt-prop__systems">
                    {PROP_SYSTEMS.map((sys) => (
                      <li key={sys} className="rt-prop__system">
                        <span className="rt-prop__system-name">{sys}</span>
                        <span
                          className="rt-prop__system-mark"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              </MobileVisualDrawer>
            </article>

            <article className="rt__stage" data-stage="3">
              <div className="rt__stage-num">03 / Verify before execution</div>
              <h3 className="rt__stage-h">Verify before execution.</h3>
              <p className="rt__stage-sub">
                Every action passes through deterministic checks — scope,
                freshness, identity, revocation — before it touches a system of
                record. No verification, no execution.
              </p>

              <MobileVisualDrawer label="Expand verify before execution" drawerInnerClassName="rt__stage is-active">
              <div className="rt__stage-meta" aria-hidden="true">
                Portable authorization · Verified at runtime · Cross-system
              </div>
              <div className="rt__stage-visual rt-verify">
                <div className="rt-timeline" role="group" aria-label="Runtime verification flow">
                  <div className="rt-timeline__step">
                    <div className="rt-timeline__label">01</div>
                    <div className="rt-timeline__text">Action</div>
                  </div>
                  <div className="rt-timeline__arrow" aria-hidden="true">
                    <svg viewBox="0 0 28 10">
                      <path d="M0 5 L22 5" />
                      <polygon points="22,1 28,5 22,9" />
                    </svg>
                  </div>
                  <div className="rt-timeline__step rt-timeline__step--accent">
                    <div className="rt-timeline__label">02</div>
                    <div className="rt-timeline__text">
                      <span className="rt-timeline__fn">
                        humanos.verify(action)
                      </span>
                    </div>
                  </div>
                  <div className="rt-timeline__arrow" aria-hidden="true">
                    <svg viewBox="0 0 28 10">
                      <path d="M0 5 L22 5" />
                      <polygon points="22,1 28,5 22,9" />
                    </svg>
                  </div>
                  <div className="rt-timeline__step rt-timeline__step--ok">
                    <div className="rt-timeline__label">03</div>
                    <div className="rt-timeline__text">Authorized</div>
                  </div>
                  <div className="rt-timeline__arrow" aria-hidden="true">
                    <svg viewBox="0 0 28 10">
                      <path d="M0 5 L22 5" />
                      <polygon points="22,1 28,5 22,9" />
                    </svg>
                  </div>
                  <div className="rt-timeline__step">
                    <div className="rt-timeline__label">04</div>
                    <div className="rt-timeline__text">Execute</div>
                  </div>
                </div>

                <div className="rt-verify__call">
                  <span className="fn">humanos.verify</span>({" "}
                  <span className="arg">action</span>:{" "}
                  <span className="str">&quot;wire.transfer&quot;</span>,{" "}
                  <span className="arg">amount</span>:{" "}
                  <span className="num">4200</span>,{" "}
                  <span className="arg">vendor</span>:{" "}
                  <span className="str">&quot;AWS&quot;</span> {"}"})
                </div>

                <div className="rt-verify__states">
                  <div className="rt-verify__state rt-verify__state--ok">
                    <span className="rt-verify__state-pip">AUTHORIZED</span>
                    <span className="rt-verify__state-desc">
                      Within approved runtime scope. Execution proceeds.
                    </span>
                  </div>
                  <div className="rt-verify__state rt-verify__state--warn">
                    <span className="rt-verify__state-pip">
                      COLLECT_MISSING
                    </span>
                    <span className="rt-verify__state-desc">
                      Outside approved scope. Authorization recovered live.
                    </span>
                  </div>
                  <div className="rt-verify__state rt-verify__state--err">
                    <span className="rt-verify__state-pip">REJECTED</span>
                    <span className="rt-verify__state-desc">
                      Constraints violated. Execution blocked before runtime.
                    </span>
                  </div>
                </div>
              </div>
              </MobileVisualDrawer>
            </article>

            <article className="rt__stage" data-stage="4">
              <div className="rt__stage-num">04 / Dynamic recovery</div>
              <h3 className="rt__stage-h">Recover authorization dynamically.</h3>
              <p className="rt__stage-sub">
                When execution falls outside approved limits, Humanos pauses the
                action, collects what&apos;s missing in real time, and resumes
                automatically once authorization is verified.
              </p>

              <MobileVisualDrawer label="Expand dynamic recovery" drawerInnerClassName="rt__stage is-active">
              <div className="rt__stage-visual rt-recover-wrap" data-rt-recover>
                <div className="rt-recover__scenario" aria-hidden="true">
                  <span className="rt-recover__scenario-eyebrow">Scenario</span>
                  <span
                    className="rt-recover__scenario-name"
                    data-rt-recover-name
                  >
                    {RECOVER_SCENARIOS[0].name}
                  </span>
                  <span className="rt-recover__scenario-dots">
                    {RECOVER_SCENARIOS.map((_, i) => (
                      <span
                        key={i}
                        className={`rt-recover__scenario-dot${i === 0 ? " is-on" : ""}`}
                      />
                    ))}
                  </span>
                </div>
                <div className="rt-recover">
                  {RECOVER_SCENARIOS[0].rows.map((row, i) => {
                    const modifiers: Record<number, string> = {
                      1: " rt-recover__step--warn",
                      2: " rt-recover__step--accent",
                      3: " rt-recover__step--ok",
                      4: " rt-recover__step--ok",
                    };
                    const marks = [
                      "action",
                      "paused",
                      "recovering",
                      "authorized",
                      "resumed",
                    ];
                    return (
                      <div
                        key={i}
                        className={`rt-recover__step${modifiers[i] ?? ""}`}
                        data-rt-recover-row={i}
                      >
                        <span className="rt-recover__step-num">
                          0{i + 1}
                        </span>
                        <span
                          className="rt-recover__step-text"
                          data-rt-recover-text
                        >
                          {row}
                        </span>
                        <span className="rt-recover__step-mark">
                          {marks[i]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              </MobileVisualDrawer>
            </article>

            <article className="rt__stage" data-stage="5">
              <div className="rt__stage-num">05 / Execution receipts</div>
              <h3 className="rt__stage-h">Portable execution receipts.</h3>
              <p className="rt__stage-sub">
                Every action emits independently verifiable proof — anchored,
                signed, and re-verifiable by any party that needs to attest to
                what happened.
              </p>

              <MobileVisualDrawer label="Expand execution receipts" drawerInnerClassName="rt__stage is-active">
              <div className="rt__stage-visual rt-proof">
                <div className="rt-proof__receipt">
                  <div className="rt-proof__head">
                    <span className="rt-proof__label">Execution receipt</span>
                    <span className="rt-proof__seal">Ed25519 · verified</span>
                  </div>
                  <div className="rt-proof__rows">
                    {[
                      ["action", "wire.transfer"],
                      ["amount", "€4,200"],
                      ["auth_id", "auth_pK7g3xN9"],
                      ["timestamp", "2026-04-12T14:23:08Z"],
                      ["signature", "0x4f8a…c2e1"],
                      ["hash", "sha256:9f3c…8b41"],
                    ].map(([k, v]) => (
                      <div key={k} className="rt-proof__row">
                        <span className="rt-proof__k">{k}</span>
                        <span className="rt-proof__v">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rt-proof__verifiers">
                  <div className="rt-proof__verifiers-label">
                    Independently verifiable by
                  </div>
                  <div className="rt-proof__verifiers-row">
                    {PROOF_VERIFIERS.map((v) => (
                      <span key={v} className="rt-proof__verifier">
                        {v}
                      </span>
                    ))}
                    <span className="rt-proof__verifier rt-proof__verifier--note">
                      anyone with the public key
                    </span>
                  </div>
                </div>

                <p className="rt-proof__caption">
                  No callback to Humanos required.
                </p>
              </div>
              </MobileVisualDrawer>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
