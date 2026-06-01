"use client";

import { useEffect, useRef } from "react";
import { MobileVisualDrawer } from "@/components/MobileVisualDrawer";

const SYSTEMS = [
  { name: "AI Agent", meta: "Executor" },
  { name: "Bank", meta: "Counterparty" },
  { name: "ERP", meta: "System of record" },
  { name: "Auditor", meta: "External" },
  { name: "Partner API", meta: "Verifier" },
];

const REGS = [
  "ISO 27001",
  "DORA",
  "NIS2",
  "EU AI Act",
  "GDPR",
  "HIPAA",
  "eIDAS 2.0",
];

const SVG_NS = "http://www.w3.org/2000/svg";

export function Pshift() {
  const vizRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const wiresRef = useRef<SVGGElement>(null);
  const signalsRef = useRef<SVGGElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const mandateRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const viz = vizRef.current;
    const svg = svgRef.current;
    const wiresG = wiresRef.current;
    const signalsG = signalsRef.current;
    const chat = chatRef.current;
    const mandate = mandateRef.current;
    if (!viz || !svg || !wiresG || !signalsG || !chat || !mandate) return;

    const systems = Array.from(
      viz.querySelectorAll<HTMLElement>("[data-pshift-sys]"),
    );

    let issuePath: SVGPathElement | null = null;
    let issueLen = 0;
    let outWires: { path: SVGPathElement; len: number; sysEl: HTMLElement }[] =
      [];

    function build() {
      if (!viz || !svg || !wiresG || !signalsG || !chat || !mandate) return;
      wiresG.innerHTML = "";
      while (signalsG.firstChild) signalsG.removeChild(signalsG.firstChild);
      outWires = [];

      const o = viz.getBoundingClientRect();
      if (o.width === 0) return;
      svg.setAttribute("viewBox", `0 0 ${o.width} ${o.height}`);

      const chatRect = chat.getBoundingClientRect();
      const mandateRect = mandate.getBoundingClientRect();

      const cStart = {
        x: chatRect.right - o.left,
        y: chatRect.top + 28 - o.top + 6,
      };
      const mLeft = {
        x: mandateRect.left - o.left,
        y: mandateRect.top + mandateRect.height / 2 - o.top,
      };
      const dx1 = mLeft.x - cStart.x;
      const issueD = `M ${cStart.x.toFixed(2)} ${cStart.y.toFixed(2)} C ${(cStart.x + dx1 * 0.5).toFixed(2)} ${cStart.y.toFixed(2)} ${(cStart.x + dx1 * 0.5).toFixed(2)} ${mLeft.y.toFixed(2)} ${mLeft.x.toFixed(2)} ${mLeft.y.toFixed(2)}`;
      const iPath = document.createElementNS(SVG_NS, "path") as SVGPathElement;
      iPath.setAttribute("d", issueD);
      iPath.setAttribute("class", "pshift__wire pshift__wire--issue");
      wiresG.appendChild(iPath);
      issuePath = iPath;
      issueLen = iPath.getTotalLength();

      const mRightX = mandateRect.right - o.left;
      const mRightY = mandateRect.top + mandateRect.height / 2 - o.top;
      for (const sys of systems) {
        const r = sys.getBoundingClientRect();
        const sLeft = { x: r.left - o.left, y: r.top + r.height / 2 - o.top };
        const start = { x: mRightX, y: mRightY };
        const dx = sLeft.x - start.x;
        const c1x = start.x + dx * 0.5;
        const c1y = start.y;
        const c2x = start.x + dx * 0.5;
        const c2y = sLeft.y;
        const d = `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${sLeft.x.toFixed(2)} ${sLeft.y.toFixed(2)}`;
        const path = document.createElementNS(SVG_NS, "path") as SVGPathElement;
        path.setAttribute("d", d);
        path.setAttribute("class", "pshift__wire");
        wiresG.appendChild(path);
        outWires.push({ path, len: path.getTotalLength(), sysEl: sys });
      }
    }

    function travel(
      path: SVGPathElement,
      len: number,
      duration: number,
      onDone?: () => void,
    ) {
      if (!signalsG) return;
      const dot = document.createElementNS(
        SVG_NS,
        "circle",
      ) as SVGCircleElement;
      dot.setAttribute("r", "2.5");
      dot.setAttribute("class", "pshift__signal");
      signalsG.appendChild(dot);
      const t0 = performance.now();
      function step(t: number) {
        const k = Math.min(1, (t - t0) / duration);
        const eased = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const pt = path.getPointAtLength(eased * len);
        dot.setAttribute("cx", String(pt.x));
        dot.setAttribute("cy", String(pt.y));
        dot.style.opacity = String(
          k < 0.12 ? k / 0.12 : k > 0.88 ? (1 - k) / 0.12 : 1,
        );
        if (k < 1) requestAnimationFrame(step);
        else {
          dot.remove();
          if (onDone) onDone();
        }
      }
      requestAnimationFrame(step);
    }

    function fireVerify() {
      if (!outWires.length) return;
      const idx = Math.floor(Math.random() * outWires.length);
      const { path, len, sysEl } = outWires[idx];
      travel(path, len, 900, () => {
        sysEl.classList.add("is-verifying");
        setTimeout(() => sysEl.classList.remove("is-verifying"), 1000);
      });
    }

    function fireIssue() {
      if (!issuePath) return;
      travel(issuePath, issueLen, 1100);
    }

    let raf: number | null = null;
    function rebuild() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        build();
      });
    }

    build();
    window.addEventListener("resize", rebuild);

    let inView = false;
    let timer: ReturnType<typeof setInterval> | null = null;
    let tick = 0;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) inView = e.isIntersecting;
        if (inView && !timer) {
          timer = setInterval(() => {
            if (!inView) return;
            if (tick % 5 === 0) fireIssue();
            else fireVerify();
            tick++;
          }, 1500);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(viz);

    return () => {
      window.removeEventListener("resize", rebuild);
      if (raf) cancelAnimationFrame(raf);
      if (timer) clearInterval(timer);
      io.disconnect();
    };
  }, []);

  return (
    <section className="pshift" data-screen-label="03 Authorization Layer">
      <div className="pshift__wrap">
        <div className="pshift__head">
          <div className="pshift__label">The authorization layer</div>
          <h2 className="pshift__title">
            Human intent becomes runtime authorization.
          </h2>
          <p className="pshift__sub">
            Humanos turns approvals, contracts, policies, signatures, and
            delegated authority into runtime authorization systems verify before
            execution.
          </p>
          <p className="pshift__kicker">
            AI agents, banks, ERPs, auditors and partner APIs, all can
            autonomously verify whether actions are allowed{" "}
            <em>before execution</em>.
          </p>
        </div>

        <MobileVisualDrawer label="Expand the authorization layer">
          <div className="pshift__viz" ref={vizRef}>
            <svg
              className="pshift__svg"
              ref={svgRef}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <g ref={wiresRef} />
              <g ref={signalsRef} />
            </svg>

            <div className="pshift__left">
              <span className="pshift__col-label">Existing approval</span>
              <div className="pshift__chat" ref={chatRef}>
                <div className="pshift__chat-avatar" aria-hidden="true">
                  ER
                </div>
                <div className="pshift__chat-meta">
                  <span className="pshift__chat-name">Elena Ruiz</span>
                  <span className="pshift__chat-time">14:22</span>
                </div>
                <p className="pshift__chat-msg">
                  Authorize treasury transfers up to €10,000 / day to AWS until
                  June 1.
                </p>
                <div className="pshift__chat-foot">
                  <span className="tick">✔</span> Signed
                </div>
              </div>
            </div>

            <div className="pshift__center">
              <span className="pshift__col-label pshift__col-label--accent">
                Live mandate
              </span>
              <article className="pshift__mandate" ref={mandateRef}>
                <header className="pshift__mandate-head">
                  <span className="pshift__mandate-kind">
                    <span className="dot" />
                    Mandate
                  </span>
                  <span className="pshift__mandate-id">0xA13F…E2C9</span>
                </header>
                <div className="pshift__mandate-rows">
                  <span className="pshift__mandate-k">Subject</span>
                  <span className="pshift__mandate-v">treasury@acme</span>
                  <span className="pshift__mandate-k">Scope</span>
                  <span className="pshift__mandate-v">transfer.usd</span>
                  <span className="pshift__mandate-k">Constraint</span>
                  <span className="pshift__mandate-v">≤ €10,000 / day</span>
                  <span className="pshift__mandate-k">Signatures</span>
                  <span className="pshift__mandate-v">2 of 2</span>
                  <span className="pshift__mandate-k">Expires</span>
                  <span className="pshift__mandate-v">2026-06-01T00:00Z</span>
                </div>
                <footer className="pshift__mandate-foot">
                  <span className="ok">Verified by Humanos</span>
                  <span>VC · v2.0</span>
                </footer>
              </article>
            </div>

            <div className="pshift__right">
              <span className="pshift__col-label">
                Verified before execution
              </span>
              <ul className="pshift__systems">
                {SYSTEMS.map((s) => (
                  <li key={s.name} className="pshift__system" data-pshift-sys>
                    <span className="pshift__system-name">{s.name}</span>
                    <span className="pshift__system-meta">{s.meta}</span>
                    <span className="pshift__system-ring" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="pshift__regs"
            role="group"
            aria-label="Built to operate within existing regulatory frameworks"
          >
            <p className="pshift__regs-label">
              Built to operate within existing regulatory frameworks, enabling{" "}
              <span className="pshift__regs-accent">
                defensible, auditable and compliant
              </span>{" "}
              autonomous execution.
            </p>
            <ul className="pshift__regs-list">
              {REGS.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </MobileVisualDrawer>
      </div>
    </section>
  );
}
