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
          <h2 className="h-section">How Paymove implemented it.</h2>
          <p className="h-lede">
            Five stages in chronological order. The animation on the right
            walks through one agent payment end-to-end — authorized by the
            Paymove account owner, verified by Humanos in the{" "}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--hm-ink-0)",
              }}
            >
              settlement path
            </span>
            , and settled on the Visa rail only after a deterministic yes/no.
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
                The Paymove account owner defines a &ldquo;make a
                payment&rdquo; action and authorizes its limits — a maximum
                amount and a list of allowed IBANs. Humanos issues a
                machine-verifiable mandate — signed once, reusable across every
                payment the agent makes.
              </p>
              <div className="istage__facts">
                <div className="istage__fact">
                  <span className="istage__fact-k">Approver</span>
                  <span className="istage__fact-v">
                    Account Owner · Paymove
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Action</span>
                  <span className="istage__fact-v indigo">
                    payment.send · agentic
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Limit</span>
                  <span className="istage__fact-v">€ 10,000.00 / payment</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Valid until</span>
                  <span className="istage__fact-v">2026-06-29</span>
                </div>
              </div>
            </article>

            <article className="istage" data-istage="prepare">
              <div className="istage__num">
                <span>02</span>
              </div>
              <div className="istage__eye">§ 02 · Prepare</div>
              <h3 className="istage__title">Agent prepares spend.</h3>
              <p className="istage__lede">
                The Paymove agent wallet assembles the proposed payment —
                amount and destination IBAN. It presents the credential ID of
                the user-signed mandate and requests a verifiable presentation
                built on{" "}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--hm-ink-0)",
                  }}
                >
                  W3C VC 2.0
                </span>
                , attached as{" "}
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
                    paymove.agent.wallet
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Payment</span>
                  <span className="istage__fact-v">tx_PM-018472</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Destination</span>
                  <span className="istage__fact-v">DE89…3000</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Amount</span>
                  <span className="istage__fact-v">€ 5,000.00</span>
                </div>
              </div>
            </article>

            <article className="istage" data-istage="verify">
              <div className="istage__num">
                <span>03</span>
              </div>
              <div className="istage__eye">§ 03 · Verify</div>
              <h3 className="istage__title">Paymove verifies.</h3>
              <p className="istage__lede">
                Before the payment settles, Paymove calls{" "}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--hm-ink-0)",
                  }}
                >
                  humanos.verify()
                </span>{" "}
                directly against the mandate. Signature, counterparty (IBAN),
                amount, validity, and network membership are checked in 184 ms —
                deterministic, no LLM in the path.
              </p>
              <div className="istage__facts">
                <div className="istage__fact">
                  <span className="istage__fact-k">Caller</span>
                  <span className="istage__fact-v">paymove.settle</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Counterparty</span>
                  <span className="istage__fact-v indigo">
                    IBAN allowed · 52 ms
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Amount</span>
                  <span className="istage__fact-v indigo">
                    € 5,000 ≤ € 10,000 · 88 ms
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Latency</span>
                  <span className="istage__fact-v">184 ms total</span>
                </div>
              </div>
            </article>

            <article className="istage" data-istage="settle">
              <div className="istage__num">
                <span>04</span>
              </div>
              <div className="istage__eye">§ 04 · Settle</div>
              <h3 className="istage__title">Settle on the Visa rail.</h3>
              <p className="istage__lede">
                Authorized → Paymove settles the payment on the Visa rail and
                writes the receipt. Not authorized → the agent doesn&rsquo;t
                fail silently or guess. For Paymove&rsquo;s out-of-scope
                attempts (an €18,000 transfer beyond the limit), Humanos blocks
                before settlement and triggers a real-time step-up.
              </p>
              <div className="istage__facts">
                <div className="istage__fact">
                  <span className="istage__fact-k">Authorized</span>
                  <span className="istage__fact-v indigo">
                    € 5,000.00 · settled
                  </span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Blocked</span>
                  <span className="istage__fact-v red">
                    € 18,000.00 · over_limit
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
                Every settled payment emits a cryptographic Receipt — the
                mandate hash anchored on-chain, attached to the transaction,
                portable forever. Both parties, partners, and regulators verify
                the Receipt directly against Humanos and the chain; nothing
                reconstructs trails from Paymove&rsquo;s internal logs.
              </p>
              <div className="istage__facts">
                <div className="istage__fact">
                  <span className="istage__fact-k">Proof ID</span>
                  <span className="istage__fact-v">proof:0xC44E…F912</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Attached</span>
                  <span className="istage__fact-v">tx.receipt</span>
                </div>
                <div className="istage__fact">
                  <span className="istage__fact-k">Verifiers</span>
                  <span className="istage__fact-v">
                    Counterparty · Partner · Regulator
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
                  Live · humanos.verify() · Paymove × tx_PM-018472
                </div>
                <div className="impl__viz-head-r" data-iv-stage-label>
                  § 01 · Issue
                </div>
              </div>

              <div className="impl__viz-body">
                <div className="impl__viz-phase">
                  <b>01 · Issue</b> · mandate signed by Account Owner
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
                        &quot;paymove.agent.wallet&quot;
                      </span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">principal</span>
                      <span className="c">:</span>{" "}
                      <span className="v">
                        &quot;owner@paymove.io&quot;
                      </span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">action</span>
                      <span className="c">:</span>{" "}
                      <span className="v">&quot;payment.send&quot;</span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">scope</span>
                      <span className="c">:</span>{" "}
                      <span className="v">
                        [&quot;payment.send&quot;]
                      </span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">allowed_ibans</span>
                      <span className="c">:</span>{" "}
                      <span className="v">
                        [&quot;DE89…3000&quot;, &quot;FR76…1234&quot;]
                      </span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">amount_max</span>
                      <span className="c">:</span>{" "}
                      <span className="v">
                        &quot;€ 10,000.00 / payment&quot;
                      </span>
                      <span className="c">,</span>
                    </div>
                    <div>
                      <span className="k">valid_until</span>
                      <span className="c">:</span>{" "}
                      <span className="v">&quot;2026-06-29&quot;</span>
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
                      text: "Send € 5,000.00 → DE89…3000",
                      sys: "tx_PM-018472 · within mandate scope",
                    },
                    {
                      num: "A2",
                      text: "Send € 2,400.00 → FR76…1234",
                      sys: "tx_PM-018473 · within € 10,000 limit",
                    },
                    {
                      num: "A3",
                      text: "Send € 18,000.00 → DE89…3000",
                      sys: "tx_PM-091284 · exceeds € 10,000 limit",
                    },
                    {
                      num: "A4",
                      text: "Add new IBAN: NL91…7654",
                      sys: "step-up SMS → Account Owner · resolves · resumes",
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
                          over_limit
                        </span>
                        <span className="iv-action__result" data-result />
                      </div>
                      <div className="iv-action__sys">{a.sys}</div>
                    </li>
                  ))}
                </ol>

                <div className="iv-verify">
                  <div className="iv-verify__label">
                    verify() — called by Paymove&rsquo;s settlement path, not by
                    the agent
                  </div>
                  <div className="iv-verify__code">
                    <span className="iv-c-kw">await</span> humanos.
                    <span className="iv-c-fn">verify</span>(
                    <span className="iv-c-arg">
                      {"{ subject, action, amount, counterparty, mandate }"}
                    </span>
                    ){" "}
                    <span className="iv-c-comment">
                      // 184 ms · deterministic
                    </span>
                  </div>
                </div>

                <div className="iv-settle">
                  <div className="iv-settle__l">
                    settled · € 5,000.00 · tx_PM-018472
                  </div>
                  <div>0xC44E…F912</div>
                </div>

                <div className="impl__viz-phase">
                  <b>05 · Prove</b> · cryptographic receipt, mandate hash
                  anchored on-chain
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
                        v: '"Account Owner · Paymove"',
                        emph: true,
                      },
                      { k: "tx_ref", v: '"tx_PM-018472"', emph: true },
                      { k: "action", v: '"payment.send"', emph: false },
                      { k: "amount", v: '"€ 5,000.00"', emph: true },
                      {
                        k: "counterparty",
                        v: '"DE89…3000"',
                        emph: false,
                      },
                      { k: "mandate", v: '"0xC44E…F912"', emph: true },
                      { k: "validity", v: '"≤ 2026-06-29"', emph: false },
                      {
                        k: "timestamp",
                        v: '"2026-05-29T11:14:07.802Z"',
                        emph: true,
                      },
                      { k: "signature", v: '"0xC44E…F912"', emph: false },
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
                  <span className="iv-extverify__chip">Counterparty</span>
                  <span className="iv-extverify__chip">Partner</span>
                  <span className="iv-extverify__chip">Regulator</span>
                  <span className="iv-extverify__arr">→</span>
                  <span>
                    <span className="iv-c-fn">verify</span>(proof)
                  </span>
                  <span className="iv-extverify__arr">→</span>
                  <span className="iv-extverify__result">true</span>
                </div>

                <div className="iv-final">
                  ✓ receipt anchored on-chain · independently verifiable ·
                  forever
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
