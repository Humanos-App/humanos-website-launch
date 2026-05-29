"use client";

import { useEffect, useRef } from "react";

export function RuntimeFlow() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rail = root.querySelector(".rtflow__rail");
    if (!rail) return;
    const steps = Array.from(rail.children) as HTMLElement[];

    const receiptTime = root.querySelector<HTMLElement>("[data-receipt-time]");
    if (receiptTime) {
      receiptTime.textContent = new Date().toISOString().replace(/\.\d+Z$/, "Z");
    }

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    function clearTimers() {
      for (const t of timeouts) clearTimeout(t);
      timeouts = [];
    }

    function reset() {
      for (const el of steps) el.classList.remove("is-on");
    }

    function play() {
      reset();
      let t = 0;
      for (const el of steps) {
        const isLine = el.classList.contains("rtdown");
        const delay = isLine ? 350 : 650;
        timeouts.push(setTimeout(() => el.classList.add("is-on"), t));
        t += delay;
      }
      timeouts.push(setTimeout(play, t + 20000));
    }

    play();

    return () => {
      clearTimers();
    };
  }, []);

  return (
    <div ref={rootRef} className="rtflow" aria-hidden="true">
      <div className="rtflow__rail" data-mode="main">
        <div className="rtstep">
          <div className="rtstep__eyebrow">01 · Portable mandates</div>
          <div className="rtstep__authstack">
            <div className="rtauth">
              <span className="rtauth__src">CFO</span>
              <span className="rtauth__sep">·</span>
              <span className="rtauth__rule">Treasury payments ≤ €5K</span>
            </div>
            <div className="rtauth">
              <span className="rtauth__src">Customer</span>
              <span className="rtauth__sep">·</span>
              <span className="rtauth__rule">KYC verified</span>
            </div>
            <div className="rtauth">
              <span className="rtauth__src">Vendor</span>
              <span className="rtauth__sep">·</span>
              <span className="rtauth__rule">Contract signed</span>
            </div>
          </div>
        </div>

        <div className="rtstep rtdown">
          <div className="rtdown__bar" />
        </div>

        <div className="rtstep">
          <div className="rtstep__eyebrow">02 · Action</div>
          <div className="rtstep__title rtstep__title--mono">
            pay_vendor(€4,800)
          </div>
        </div>

        <div className="rtstep rtdown">
          <div className="rtdown__bar" />
        </div>

        <div className="rtstep">
          <div className="rtstep__eyebrow rtstep__eyebrow--accent">
            03 · Verify
          </div>
          <div className="rtstep__call">humanos.verify(action)</div>
        </div>

        <div className="rtstep rtdown">
          <div className="rtdown__bar" />
        </div>
        <div className="rtstep">
          <div className="rtstep__status">
            <span className="rtstep__ic rtstep__ic--ok">✓</span>Authorized
          </div>
        </div>

        <div className="rtstep rtdown">
          <div className="rtdown__bar" />
        </div>

        <div className="rtstep">
          <div className="rtstep__eyebrow">04 · Execute</div>
          <div className="rtstep__title rtstep__title--run">Action runs</div>
        </div>

        <div className="rtstep rtdown">
          <div className="rtdown__bar" />
        </div>

        <div className="rtstep">
          <div className="rtstep__eyebrow">
            05 · Universal Execution Receipt
          </div>
          <div className="rtreceipt">
            <div className="rtreceipt__row">
              <span className="rtreceipt__k">Verified at</span>
              <span
                className="rtreceipt__v rtreceipt__v--mono"
                data-receipt-time
              >
                2025-04-12T14:08:22Z
              </span>
            </div>
            <div className="rtreceipt__row">
              <span className="rtreceipt__k">Signed</span>
              <span className="rtreceipt__v rtreceipt__v--mono">0x9f4a…c2e1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
