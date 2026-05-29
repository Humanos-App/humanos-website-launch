"use client";

import { useEffect, useRef } from "react";

const STAGES = ["issue", "prepare", "verify", "settle", "prove"] as const;
const LABEL: Record<string, string> = {
  issue: "§ 01 · Issue",
  prepare: "§ 02 · Prepare",
  verify: "§ 03 · Verify",
  settle: "§ 04 · Execute",
  prove: "§ 05 · Prove",
};

const ACTIONS_DATA = [
  { sequence: ["ok"], result: "recorded" },
  { sequence: ["ok"], result: "signed" },
  { sequence: ["bad"], result: "blocked" },
  { sequence: ["warn", "req", "resolved"], result: "resumed" },
] as const;

export function Implementation() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const frame = root.querySelector<HTMLElement>(".impl__viz-frame");
    const stages = Array.from(
      root.querySelectorAll<HTMLElement>("[data-istage]"),
    );
    const stageLabel = root.querySelector<HTMLElement>("[data-iv-stage-label]");
    const actions = Array.from(
      root.querySelectorAll<HTMLElement>("[data-iv-action]"),
    );
    const proofFields = Array.from(
      root.querySelectorAll<HTMLElement>("[data-iv-proof-field]"),
    );
    const bodyEl = root.querySelector<HTMLElement>(".impl__viz-body");
    if (!frame) return;

    const timers: Record<"verify" | "prove", ReturnType<typeof setTimeout>[]> =
      { verify: [], prove: [] };
    const clearT = (k: "verify" | "prove") => {
      timers[k].forEach(clearTimeout);
      timers[k] = [];
    };
    const later = (k: "verify" | "prove", ms: number, fn: () => void) =>
      timers[k].push(setTimeout(fn, ms));

    const setStageClasses = (active: string) => {
      const i = STAGES.indexOf(active as (typeof STAGES)[number]);
      stages.forEach((el, idx) => {
        el.classList.remove("is-active", "is-past", "is-future");
        if (idx < i) el.classList.add("is-past");
        else if (idx === i) el.classList.add("is-active");
        else el.classList.add("is-future");
      });
    };

    const scrollPhaseIntoView = (phase: string) => {
      if (!bodyEl) return;
      const sel: Record<string, string> = {
        issue: ".iv-mandate",
        prepare: ".iv-actions",
        verify: ".iv-verify",
        settle: ".iv-settle",
        prove: ".iv-proof",
      };
      const target = root.querySelector<HTMLElement>(sel[phase]);
      if (!target) return;
      const bodyRect = bodyEl.getBoundingClientRect();
      const r = target.getBoundingClientRect();
      const top = r.top - bodyRect.top + bodyEl.scrollTop - 24;
      bodyEl.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    };

    const resetVerify = () => {
      clearT("verify");
      actions.forEach((el) => {
        el.classList.remove("is-running", "is-done");
        el.removeAttribute("data-state");
        el.querySelectorAll(".iv-action__chip").forEach((c) =>
          c.classList.remove("is-on"),
        );
        const r = el.querySelector<HTMLElement>("[data-result]");
        if (r) r.textContent = "";
      });
    };

    const playVerifyActions = (includeSettle: boolean) => {
      resetVerify();
      const startDelays = [0, 450, 950, 1500];
      actions.forEach((el, i) => {
        const data = ACTIONS_DATA[i];
        if (!data) return;
        const startAt = startDelays[i] ?? 0;
        later("verify", startAt, () => el.classList.add("is-running"));
        let t = startAt;
        data.sequence.forEach((chip, ci) => {
          later("verify", t, () => {
            el.querySelectorAll<HTMLElement>(".iv-action__chip").forEach((c) =>
              c.classList.toggle(
                "is-on",
                c.getAttribute("data-chip") === chip,
              ),
            );
          });
          t += ci === data.sequence.length - 1 ? 0 : 500;
        });
        if (includeSettle) {
          later("verify", t + 600, () => {
            const last = data.sequence[data.sequence.length - 1];
            el.setAttribute("data-state", last === "bad" ? "bad" : "ok");
            el.classList.remove("is-running");
            el.classList.add("is-done");
            const r = el.querySelector<HTMLElement>("[data-result]");
            if (r) r.textContent = data.result;
          });
        }
      });
    };

    const playProveFields = () => {
      clearT("prove");
      proofFields.forEach((f) => f.classList.remove("is-on"));
      proofFields.forEach((f, idx) =>
        later("prove", idx * 90, () => f.classList.add("is-on")),
      );
    };

    const applyStage = (stage: string) => {
      if (stageLabel) stageLabel.textContent = LABEL[stage] || "";
      const idx = STAGES.indexOf(stage as (typeof STAGES)[number]);
      frame.setAttribute(
        "data-iv-mandate",
        stage === "issue" || idx > 0 ? "on" : "off",
      );
      frame.setAttribute("data-iv-verify", idx >= 2 ? "on" : "off");
      frame.setAttribute("data-iv-settle", idx >= 3 ? "on" : "off");

      if (stage === "issue") resetVerify();
      else if (stage === "prepare") {
        resetVerify();
        actions.forEach((el) => el.classList.add("is-running"));
      } else if (stage === "verify") playVerifyActions(false);
      else if (stage === "settle" || stage === "prove") playVerifyActions(true);

      if (stage === "prove") {
        frame.setAttribute("data-iv-prove", "fields");
        playProveFields();
        later("prove", proofFields.length * 90 + 240, () =>
          frame.setAttribute("data-iv-prove", "extverify"),
        );
        later("prove", proofFields.length * 90 + 900, () =>
          frame.setAttribute("data-iv-prove", "final"),
        );
      } else {
        frame.setAttribute("data-iv-prove", "off");
        proofFields.forEach((f) => f.classList.remove("is-on"));
        clearT("prove");
      }

      setStageClasses(stage);
      scrollPhaseIntoView(stage);
    };

    const clickHandlers: { el: HTMLElement; handler: () => void }[] = [];
    stages.forEach((el) => {
      const handler = () => {
        const s = el.getAttribute("data-istage");
        if (s) applyStage(s);
      };
      el.addEventListener("click", handler);
      clickHandlers.push({ el, handler });
    });

    const pickStage = (): string | null => {
      const anchor = window.innerHeight * 0.45;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      stages.forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - anchor);
        if (d < bestDist) {
          bestDist = d;
          best = el;
        }
      });
      return best ? (best as HTMLElement).getAttribute("data-istage") : null;
    };

    let lastStage: string | null = null;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const s = pickStage();
        if (s && s !== lastStage) {
          lastStage = s;
          applyStage(s);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    applyStage("issue");

    return () => {
      window.removeEventListener("scroll", onScroll);
      clickHandlers.forEach(({ el, handler }) =>
        el.removeEventListener("click", handler),
      );
      clearT("verify");
      clearT("prove");
    };
  }, []);

  return (
    <section className="section" data-screen-label="06 Implementation">
      <div className="wrap">
        <div className="impl__head">
          <div className="eyebrow">§ 06 · Implementation</div>
          <h2 className="h-section">How Lusíadas implemented it.</h2>
          <p className="h-lede">
            Five stages in chronological order. The animation on the right
            walks through one informed-consent flow end-to-end — collected
            in Medify, verified by Humanos, surfaced across NewSoft, Glintt,
            and the patient mobile app without anyone re-asking.
          </p>
        </div>

        <div className="impl__grid" ref={rootRef}>
          <div className="impl__stages" role="list">
            <article className="istage is-active" data-istage="issue">
              <div className="istage__num">
                <span>01</span>
              </div>
              <div className="istage__eye">§ 01 · Issue</div>
              <h3 className="istage__title">Define approval template.</h3>
              <p className="istage__lede">
                Lusíadas Compliance authorizes the approval template — consent
                type, required signers, scope, validity. Humanos issues a
                machine-verifiable schema — one template, reusable across
                every system that needs that approval.
              </p>
              <div className="istage__facts">
                <div className="istage__fact">
                  <span className="istage__fact-k">Issuer</span>
                  <span className="istage__fact-v">
                    Compliance · Lusíadas
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Scope</span>
                  <span className="istage__fact-v indigo">
                    consent.informed · cardiology
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Signers</span>
                  <span className="istage__fact-v">
                    Patient + Cardiologist
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Valid until</span>
                  <span className="istage__fact-v">2026-12-29</span>
                </div>
              </div>
            </article>

            <article className="istage" data-istage="prepare">
              <div className="istage__num">
                <span>02</span>
              </div>
              <div className="istage__eye">§ 02 · Prepare</div>
              <h3 className="istage__title">Medify renders the consent.</h3>
              <p className="istage__lede">
                The clinical software (Medify) renders the informed-consent
                document for the patient and the signing physician. It
                attaches the approval template to its outbound request as{" "}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--hm-ink-0)",
                  }}
                >
                  x-humanos-approval
                </span>
                .
              </p>
              <div className="istage__facts">
                <div className="istage__fact">
                  <span className="istage__fact-k">Caller</span>
                  <span className="istage__fact-v">medify.app</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Consent</span>
                  <span className="istage__fact-v">consent_LU-204891</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Procedure</span>
                  <span className="istage__fact-v">
                    Cardiac catheterization
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Linked</span>
                  <span className="istage__fact-v">GDPR processing</span>
                </div>
              </div>
            </article>

            <article className="istage" data-istage="verify">
              <div className="istage__num">
                <span>03</span>
              </div>
              <div className="istage__eye">§ 03 · Verify</div>
              <h3 className="istage__title">Humanos verifies signers.</h3>
              <p className="istage__lede">
                Both signers (patient + physician) sign through Humanos.
                Identity, scope, registered counterparty, signatures, and
                anchor are checked in 94 ms — deterministic, single API
                across every system in the stack.
              </p>
              <div className="istage__facts">
                <div className="istage__fact">
                  <span className="istage__fact-k">Identity</span>
                  <span className="istage__fact-v indigo">
                    patient KYC · 14 ms
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Counterparty</span>
                  <span className="istage__fact-v indigo">
                    physician OM 38291 · 42 ms
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Signatures</span>
                  <span className="istage__fact-v indigo">
                    both signers · 68 ms
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Latency</span>
                  <span className="istage__fact-v">94 ms total</span>
                </div>
              </div>
            </article>

            <article className="istage" data-istage="settle">
              <div className="istage__num">
                <span>04</span>
              </div>
              <div className="istage__eye">§ 04 · Execute</div>
              <h3 className="istage__title">Commit to clinical record.</h3>
              <p className="istage__lede">
                Approved → the consent is written to the patient&rsquo;s
                clinical record and becomes consultable by NewSoft, Glintt,
                the OR system, and the patient mobile app — no
                re-collection. Missing → step-up is requested inline
                (mobile, SMS, in-clinic) and the original flow resumes.
              </p>
              <div className="istage__facts">
                <div className="istage__fact">
                  <span className="istage__fact-k">Recorded</span>
                  <span className="istage__fact-v indigo">
                    clinical record · written
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Surfaced in</span>
                  <span className="istage__fact-v">
                    Medify · NewSoft · Glintt · mobile
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Recover</span>
                  <span className="istage__fact-v">
                    step-up · mobile · resumes
                  </span>
                </div>
              </div>
            </article>

            <article className="istage" data-istage="prove">
              <div className="istage__num">
                <span>05</span>
              </div>
              <div className="istage__eye">§ 05 · Prove</div>
              <h3 className="istage__title">Portable receipt.</h3>
              <p className="istage__lede">
                Every approval emits a cryptographic receipt — anchored to
                the Lusíadas approval ledger, attached to the clinical
                record, portable forever. Auditors, regulators, and insurance
                partners verify the receipt directly against Humanos; nothing
                reconstructs trails from scattered vendor logs.
              </p>
              <div className="istage__facts">
                <div className="istage__fact">
                  <span className="istage__fact-k">Proof ID</span>
                  <span className="istage__fact-v">proof:0xA77B…D204</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Attached</span>
                  <span className="istage__fact-v">clinical.record</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Verifiers</span>
                  <span className="istage__fact-v">
                    Auditor · Regulator · Insurance partner
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Result</span>
                  <span className="istage__fact-v indigo">
                    independently verifiable · forever
                  </span>
                </div>
              </div>
            </article>
          </div>

          <div className="impl__viz">
            <div
              className="impl__viz-frame"
              data-iv-mandate="off"
              data-iv-verify="off"
              data-iv-settle="off"
              data-iv-prove="off"
            >
              <div className="impl__viz-head">
                <div className="impl__viz-head-l">
                  Live · humanos.verify() · Lusíadas × consent_LU-204891
                </div>
                <div className="impl__viz-head-r" data-iv-stage-label>
                  § 01 · Issue
                </div>
              </div>

              <div className="impl__viz-body">
                <div className="impl__viz-phase">
                  <b>01 · Issue</b> · approval template signed by Compliance
                </div>
                <div className="iv-mandate">
                  <div className="iv-mandate__bar">
                    <span className="iv-mandate__bar-dot" />
                    <span className="iv-mandate__bar-name">approval</span>
                    <span className="iv-mandate__bar-sig">signed</span>
                  </div>
                  <div className="iv-mandate__body">
                    <div>
                      <span className="k">subject</span>
                      <span className="c">:</span>{" "}
                      <span className="v">
                        &quot;medify.app&quot;
                      </span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">principal</span>
                      <span className="c">:</span>{" "}
                      <span className="v">
                        &quot;compliance@lusiadas.pt&quot;
                      </span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">action</span>
                      <span className="c">:</span>{" "}
                      <span className="v">&quot;consent.informed&quot;</span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">scope</span>
                      <span className="c">:</span>{" "}
                      <span className="v">
                        [&quot;consent.informed&quot;, &quot;GDPR.processing&quot;]
                      </span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">signers</span>
                      <span className="c">:</span>{" "}
                      <span className="v">[&quot;patient&quot;, &quot;physician&quot;]</span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">procedure</span>
                      <span className="c">:</span>{" "}
                      <span className="v">&quot;Cardiac catheterization&quot;</span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">valid_until</span>
                      <span className="c">:</span>{" "}
                      <span className="v">&quot;2026-12-29&quot;</span>
                    </div>
                  </div>
                </div>

                <div className="impl__viz-phase">
                  <b>02·03·04 · Prepare → Verify → Execute</b>
                </div>
                <ol className="iv-actions">
                  {[
                    {
                      num: "A1",
                      text: "Collect GDPR consent → patient.profile",
                      sys: "mobile.app · valid signers, scope in mandate",
                    },
                    {
                      num: "A2",
                      text: "Sign prescription → medify.dispensary",
                      sys: "consult_LU-114022 · physician signed",
                    },
                    {
                      num: "A3",
                      text: "Discharge without informed consent",
                      sys: "case_LU-204891 · missing required signer",
                    },
                    {
                      num: "A4",
                      text: "Re-verify expired patient KYC",
                      sys: "step-up SMS → patient · resolves · resumes",
                    },
                  ].map((a, i) => (
                    <li key={i} className="iv-action" data-iv-action={i}>
                      <div className="iv-action__row">
                        <span className="iv-action__num">{a.num}</span>
                        <span className="iv-action__text">{a.text}</span>
                        <span
                          className="iv-action__chip iv-action__chip--ok"
                          data-chip="ok"
                        >
                          approved
                        </span>
                        <span
                          className="iv-action__chip iv-action__chip--warn"
                          data-chip="warn"
                        >
                          missing
                        </span>
                        <span
                          className="iv-action__chip iv-action__chip--warn"
                          data-chip="req"
                        >
                          requesting…
                        </span>
                        <span
                          className="iv-action__chip iv-action__chip--ok"
                          data-chip="resolved"
                        >
                          signed
                        </span>
                        <span
                          className="iv-action__chip iv-action__chip--no"
                          data-chip="bad"
                        >
                          blocked
                        </span>
                        <span className="iv-action__result" data-result />
                      </div>
                      <div className="iv-action__sys">{a.sys}</div>
                    </li>
                  ))}
                </ol>

                <div className="iv-verify">
                  <div className="iv-verify__label">
                    verify() — called by every system, against one approval OS
                  </div>
                  <div className="iv-verify__code">
                    <span className="iv-c-kw">await</span> humanos.
                    <span className="iv-c-fn">verify</span>(
                    <span className="iv-c-arg">
                      {"{ subject, action, signers, scope, approval }"}
                    </span>
                    ){" "}
                    <span className="iv-c-comment">
                      // 94 ms · deterministic
                    </span>
                  </div>
                </div>

                <div className="iv-settle">
                  <div className="iv-settle__l">
                    recorded · consent_LU-204891 · clinical.record
                  </div>
                  <div>0xA77B…D204</div>
                </div>

                <div className="impl__viz-phase">
                  <b>05 · Prove</b> · cryptographic receipt, anchored at
                  Lusíadas approval ledger
                </div>
                <div className="iv-proof">
                  <div className="iv-proof__bar">
                    <span className="iv-proof__bar-dot" />
                    <span className="iv-proof__bar-name">proof.json</span>
                    <span className="iv-proof__bar-sig">signed</span>
                  </div>
                  <div className="iv-proof__body">
                    <div>{"{"}</div>
                    {[
                      {
                        k: "who_approved",
                        v: '"Patient + Cardiologist"',
                        emph: true,
                      },
                      { k: "consent_ref", v: '"consent_LU-204891"', emph: true },
                      { k: "action", v: '"consent.informed"', emph: false },
                      {
                        k: "procedure",
                        v: '"Cardiac catheterization"',
                        emph: true,
                      },
                      {
                        k: "scope",
                        v: '["consent.informed", "GDPR.processing"]',
                        emph: false,
                      },
                      { k: "approval", v: '"0xA77B…D204"', emph: true },
                      { k: "validity", v: '"≤ 2026-12-29"', emph: false },
                      {
                        k: "timestamp",
                        v: '"2026-05-29T11:14:07.802Z"',
                        emph: true,
                      },
                      { k: "signature", v: '"0xA77B…D204"', emph: false },
                    ].map((row, i, arr) => (
                      <div
                        key={i}
                        className={`iv-proof__field${row.emph ? " iv-proof__field--emph" : ""}`}
                        data-iv-proof-field={i}
                      >
                        &nbsp;&nbsp;
                        <span className="iv-proof__k">
                          &quot;{row.k}&quot;
                        </span>
                        <span className="iv-proof__c">:</span>{" "}
                        <span className="iv-proof__v">{row.v}</span>
                        {i < arr.length - 1 && (
                          <span className="iv-proof__c">,</span>
                        )}
                      </div>
                    ))}
                    <div>{"}"}</div>
                  </div>
                </div>

                <div className="iv-extverify">
                  <span className="iv-extverify__chip">Auditor</span>
                  <span className="iv-extverify__chip">Regulator</span>
                  <span className="iv-extverify__chip">Insurance partner</span>
                  <span className="iv-extverify__arr">→</span>
                  <span>
                    <span className="iv-c-fn">verify</span>(proof)
                  </span>
                  <span className="iv-extverify__arr">→</span>
                  <span className="iv-extverify__result">true</span>
                </div>

                <div className="iv-final">
                  ✓ proof attached · independently verifiable · forever
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
