"use client";

import { useEffect, useRef } from "react";

const STAGES = ["issue", "prepare", "verify", "settle", "prove"] as const;
const LABEL: Record<string, string> = {
  issue: "§ 01 · Issue",
  prepare: "§ 02 · Prepare",
  verify: "§ 03 · Verify",
  settle: "§ 04 · Settle",
  prove: "§ 05 · Prove",
};

const ACTIONS_DATA = [
  { sequence: ["ok"], result: "settled" },
  { sequence: ["ok"], result: "settled" },
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
      // On mobile the viz panel is pinned to the top (see case-study.css
      // .impl mobile rules), so the active stage must track the
      // card in the strip *below* the panel — anchor lower than on desktop.
      const mobile = window.matchMedia("(max-width: 1080px)").matches;
      const anchor = window.innerHeight * (mobile ? 0.8 : 0.45);
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
          <h2 className="h-section">How Ralio implemented it.</h2>
          <p className="h-lede">
            Five stages in chronological order. The animation on the right is
            the exact flow from our product page — adapted to Ralio&rsquo;s
            €23,840.00 procurement order, settled at{" "}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--hm-ink-0)",
              }}
            >
              techsupply.eu
            </span>
            .
          </p>
        </div>

        <div className="impl__grid" ref={rootRef}>
          <div className="impl__stages" role="list">
            <article className="istage is-active" data-istage="issue">
              <div className="istage__num">
                <span>01</span>
              </div>
              <div className="istage__eye">§ 01 · Issue</div>
              <h3 className="istage__title">Define mandate.</h3>
              <p className="istage__lede">
                Finance lead authorizes scope, counterparties, ceiling, and
                validity. Humanos issues a machine-verifiable mandate — signed
                once, reusable across every merchant that verifies.
              </p>
              <div className="istage__facts">
                <div className="istage__fact">
                  <span className="istage__fact-k">Approver</span>
                  <span className="istage__fact-v">
                    Finance Lead · ACME GmbH
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Scope</span>
                  <span className="istage__fact-v indigo">
                    procurement · hardware
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Ceiling</span>
                  <span className="istage__fact-v">€ 24,000.00</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Valid until</span>
                  <span className="istage__fact-v">2026-06-19</span>
                </div>
              </div>
            </article>

            <article className="istage" data-istage="prepare">
              <div className="istage__num">
                <span>02</span>
              </div>
              <div className="istage__eye">§ 02 · Prepare</div>
              <h3 className="istage__title">Agent prepares action.</h3>
              <p className="istage__lede">
                Ralio runtime sources vendors, compares pricing, and assembles
                the procurement order. The agent attaches the mandate to its
                outbound request as{" "}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--hm-ink-0)",
                  }}
                >
                  x-humanos-mandate
                </span>
                .
              </p>
              <div className="istage__facts">
                <div className="istage__fact">
                  <span className="istage__fact-k">Agent</span>
                  <span className="istage__fact-v">
                    ralio.procurement.agent
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Order</span>
                  <span className="istage__fact-v">
                    12 × MacBook Pro · 12 × dock
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Vendor</span>
                  <span className="istage__fact-v">techsupply.eu</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Total</span>
                  <span className="istage__fact-v">€ 23,840.00</span>
                </div>
              </div>
            </article>

            <article className="istage" data-istage="verify">
              <div className="istage__num">
                <span>03</span>
              </div>
              <div className="istage__eye">§ 03 · Verify</div>
              <h3 className="istage__title">Merchant verifies.</h3>
              <p className="istage__lede">
                At checkout, the merchant calls{" "}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--hm-ink-0)",
                  }}
                >
                  humanos.verify()
                </span>{" "}
                directly against the mandate — not against Ralio&rsquo;s
                runtime. Identity, scope, counterparty, amount, and validity
                are checked in 181 ms.
              </p>
              <div className="istage__facts">
                <div className="istage__fact">
                  <span className="istage__fact-k">Caller</span>
                  <span className="istage__fact-v">techsupply.eu (DID:web)</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Identity</span>
                  <span className="istage__fact-v indigo">
                    verified · 27 ms
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Amount</span>
                  <span className="istage__fact-v indigo">
                    € 23,840 ≤ € 24,000 · 134 ms
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Latency</span>
                  <span className="istage__fact-v">181 ms total</span>
                </div>
              </div>
            </article>

            <article className="istage" data-istage="settle">
              <div className="istage__num">
                <span>04</span>
              </div>
              <div className="istage__eye">§ 04 · Settle</div>
              <h3 className="istage__title">Execute payment.</h3>
              <p className="istage__lede">
                Authorized → payment settles. Not authorized → merchant
                declines deterministically. For Ralio&rsquo;s out-of-scope
                attempts (a €50,000 server rack), Humanos blocks at the
                boundary and triggers real-time step-up authorization.
              </p>
              <div className="istage__facts">
                <div className="istage__fact">
                  <span className="istage__fact-k">Authorized</span>
                  <span className="istage__fact-v indigo">
                    € 23,840.00 · settled
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Blocked</span>
                  <span className="istage__fact-v red">
                    € 50,000.00 · out_of_scope
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Recover</span>
                  <span className="istage__fact-v">
                    step-up · SMS · resumes
                  </span>
                </div>
              </div>
            </article>

            <article className="istage" data-istage="prove">
              <div className="istage__num">
                <span>05</span>
              </div>
              <div className="istage__eye">§ 05 · Prove</div>
              <h3 className="istage__title">Audit proof.</h3>
              <p className="istage__lede">
                Every transaction emits a cryptographic Proof — attached to the
                settlement, portable forever. Auditors, processors, and
                acquirers verify the Proof directly against Humanos; nothing
                reconstructs trails from internal logs.
              </p>
              <div className="istage__facts">
                <div className="istage__fact">
                  <span className="istage__fact-k">Proof ID</span>
                  <span className="istage__fact-v">proof:0xA13F…84e9</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Attached</span>
                  <span className="istage__fact-v">settlement.receipt</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Verifiers</span>
                  <span className="istage__fact-v">
                    Auditor · Processor · Acquirer
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

          <div className="impl__viz mobile-hide">
            <div
              className="impl__viz-frame"
              data-iv-mandate="off"
              data-iv-verify="off"
              data-iv-settle="off"
              data-iv-prove="off"
            >
              <div className="impl__viz-head">
                <div className="impl__viz-head-l">
                  Live · humanos.verify() · Ralio × techsupply.eu
                </div>
                <div className="impl__viz-head-r" data-iv-stage-label>
                  § 01 · Issue
                </div>
              </div>

              <div className="impl__viz-body">
                <div className="impl__viz-phase">
                  <b>01 · Issue</b> · mandate signed by Finance Lead
                </div>
                <div className="iv-mandate">
                  <div className="iv-mandate__bar">
                    <span className="iv-mandate__bar-dot" />
                    <span className="iv-mandate__bar-name">mandate</span>
                    <span className="iv-mandate__bar-sig">signed</span>
                  </div>
                  <div className="iv-mandate__body">
                    <div>
                      <span className="k">subject</span>
                      <span className="c">:</span>{" "}
                      <span className="v">
                        &quot;ralio.procurement.agent&quot;
                      </span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">principal</span>
                      <span className="c">:</span>{" "}
                      <span className="v">
                        &quot;finance.lead@acme.gmbh&quot;
                      </span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">action</span>
                      <span className="c">:</span>{" "}
                      <span className="v">&quot;purchase.execute&quot;</span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">scope</span>
                      <span className="c">:</span>{" "}
                      <span className="v">
                        [&quot;procurement&quot;, &quot;hardware&quot;]
                      </span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">counterparty</span>
                      <span className="c">:</span>{" "}
                      <span className="v">approved_vendor_list</span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">amount_max</span>
                      <span className="c">:</span>{" "}
                      <span className="v">&quot;€ 24,000.00&quot;</span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">valid_until</span>
                      <span className="c">:</span>{" "}
                      <span className="v">&quot;2026-06-19&quot;</span>
                    </div>
                  </div>
                </div>

                <div className="impl__viz-phase">
                  <b>02·03·04 · Prepare → Verify → Settle</b>
                </div>
                <ol className="iv-actions">
                  {[
                    {
                      num: "A1",
                      text: 'Purchase 12 × MacBook Pro 14"',
                      sys: "at techsupply.eu · € 21,588.00",
                    },
                    {
                      num: "A2",
                      text: "Add 12 × USB-C dock + shipping",
                      sys: "at techsupply.eu · € 2,252.00",
                    },
                    {
                      num: "A3",
                      text: "Procure € 50,000 server rack",
                      sys: "at racks-direct.de · exceeds € 24,000 ceiling",
                    },
                    {
                      num: "A4",
                      text: "Add new vendor: AcmeCloud (SaaS)",
                      sys: "step-up SMS · resolves · resumes",
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
                          authorized
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
                          approved
                        </span>
                        <span
                          className="iv-action__chip iv-action__chip--no"
                          data-chip="bad"
                        >
                          out_of_scope
                        </span>
                        <span className="iv-action__result" data-result />
                      </div>
                      <div className="iv-action__sys">{a.sys}</div>
                    </li>
                  ))}
                </ol>

                <div className="iv-verify">
                  <div className="iv-verify__label">
                    verify() — called by the merchant, not by Ralio
                  </div>
                  <div className="iv-verify__code">
                    <span className="iv-c-kw">await</span> humanos.
                    <span className="iv-c-fn">verify</span>(
                    <span className="iv-c-arg">
                      {"{ subject, action, amount, counterparty, mandate }"}
                    </span>
                    ){" "}
                    <span className="iv-c-comment">
                      // 181 ms · deterministic
                    </span>
                  </div>
                </div>

                <div className="iv-settle">
                  <div className="iv-settle__l">
                    settled · € 23,840.00 · at techsupply.eu
                  </div>
                  <div>0xA13F…84e9</div>
                </div>

                <div className="impl__viz-phase">
                  <b>05 · Prove</b> · cryptographic receipt, attached to
                  settlement
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
                        v: '"Finance Lead · ACME GmbH"',
                        emph: true,
                      },
                      { k: "merchant", v: '"techsupply.eu"', emph: true },
                      { k: "action", v: '"purchase.execute"', emph: false },
                      { k: "amount", v: '"€ 23,840.00"', emph: true },
                      {
                        k: "scope",
                        v: '["procurement", "hardware"]',
                        emph: false,
                      },
                      { k: "mandate", v: '"0xA13F…84e9"', emph: true },
                      { k: "validity", v: '"≤ 2026-06-19"', emph: false },
                      {
                        k: "timestamp",
                        v: '"2026-05-19T14:02:18.412Z"',
                        emph: true,
                      },
                      { k: "signature", v: '"0xA13F…84e9"', emph: false },
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
                  <span className="iv-extverify__chip">Processor</span>
                  <span className="iv-extverify__chip">Acquirer</span>
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
