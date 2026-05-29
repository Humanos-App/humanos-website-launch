"use client";

import { useEffect, useRef } from "react";

const SVG_NS = "http://www.w3.org/2000/svg";

export function Anet() {
  const capsRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<SVGSVGElement>(null);
  const linesRef = useRef<SVGGElement>(null);
  const signalsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const caps = capsRef.current;
    const ambient = ambientRef.current;
    const linesG = linesRef.current;
    const signalsG = signalsRef.current;
    if (!caps || !ambient || !linesG || !signalsG) return;

    const tiles = Array.from(
      caps.querySelectorAll<HTMLElement>("[data-anet-cap]"),
    );

    let ambientLines: { path: SVGPathElement; len: number }[] = [];

    function build() {
      if (!caps || !ambient || !linesG || !signalsG) return;
      linesG.innerHTML = "";
      while (signalsG.firstChild) signalsG.removeChild(signalsG.firstChild);
      ambientLines = [];
      const r = caps.getBoundingClientRect();
      if (r.width === 0) return;
      ambient.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);

      for (const ratio of [0.22, 0.5, 0.78]) {
        const y = r.height * ratio;
        const path = document.createElementNS(SVG_NS, "path") as SVGPathElement;
        path.setAttribute(
          "d",
          `M 0 ${y.toFixed(2)} L ${r.width.toFixed(2)} ${y.toFixed(2)}`,
        );
        path.setAttribute("class", "anet__ambient-line");
        linesG.appendChild(path);
        ambientLines.push({ path, len: path.getTotalLength() });
      }
    }

    function fireAmbient() {
      if (!ambientLines.length || !signalsG) return;
      const { path, len } =
        ambientLines[Math.floor(Math.random() * ambientLines.length)];
      const dot = document.createElementNS(SVG_NS, "circle") as SVGCircleElement;
      dot.setAttribute("r", "2");
      dot.setAttribute("class", "anet__ambient-dot");
      signalsG.appendChild(dot);
      const dir = Math.random() < 0.5 ? 1 : -1;
      const duration = 2400 + Math.random() * 800;
      const t0 = performance.now();
      function step(t: number) {
        const k = Math.min(1, (t - t0) / duration);
        const eased = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const progress = dir === 1 ? eased : 1 - eased;
        const pt = path.getPointAtLength(progress * len);
        dot.setAttribute("cx", String(pt.x));
        dot.setAttribute("cy", String(pt.y));
        dot.style.opacity = String(
          k < 0.12
            ? (k / 0.12) * 0.6
            : k > 0.88
              ? ((1 - k) / 0.12) * 0.6
              : 0.6,
        );
        if (k < 1) requestAnimationFrame(step);
        else dot.remove();
      }
      requestAnimationFrame(step);
    }

    function pulseTile() {
      if (!tiles.length) return;
      const tile = tiles[Math.floor(Math.random() * tiles.length)];
      tile.classList.add("is-pulsing");
      setTimeout(() => tile.classList.remove("is-pulsing"), 900);
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
    let ambientTimer: ReturnType<typeof setInterval> | null = null;
    let pulseTimer: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) inView = e.isIntersecting;
        if (inView) {
          if (!ambientTimer)
            ambientTimer = setInterval(() => {
              if (inView) fireAmbient();
            }, 1700);
          if (!pulseTimer)
            pulseTimer = setInterval(() => {
              if (inView) pulseTile();
            }, 2200);
        }
      },
      { threshold: 0.12 },
    );
    io.observe(caps);

    return () => {
      window.removeEventListener("resize", rebuild);
      if (raf) cancelAnimationFrame(raf);
      if (ambientTimer) clearInterval(ambientTimer);
      if (pulseTimer) clearInterval(pulseTimer);
      io.disconnect();
    };
  }, []);

  return (
    <section className="anet" data-screen-label="05 Network & Trust">
      <div className="anet__wrap">
        <div className="anet__head">
          <div className="anet__eyebrow">Network &amp; trust</div>
          <h2 className="anet__title">
            Every authorized action becomes{" "}
            <em>independently verifiable</em>.
          </h2>
          <p className="anet__sub">
            Existing permissions, approvals and policies become reusable runtime
            authorization across systems, APIs and autonomous agents.
          </p>
        </div>

        <div className="anet__caps" ref={capsRef}>
          <svg
            className="anet__ambient"
            ref={ambientRef}
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <g ref={linesRef} />
            <g ref={signalsRef} />
          </svg>

          {/* 01 Reuse */}
          <article className="anet__cap" data-anet-cap>
            <div className="anet__cap-eyebrow">
              Reuse <span className="num">· 01</span>
            </div>
            <div className="anet__cap-vis">
              <div className="anet__vis-fan" aria-hidden="true">
                <svg viewBox="0 0 200 120">
                  <g strokeLinecap="round">
                    <line className="anet__vis-fan-line" x1="100" y1="60" x2="22" y2="22" />
                    <line className="anet__vis-fan-line" x1="100" y1="60" x2="178" y2="22" />
                    <line className="anet__vis-fan-line" x1="100" y1="60" x2="22" y2="98" />
                    <line className="anet__vis-fan-line" x1="100" y1="60" x2="178" y2="98" />
                    <line className="anet__vis-fan-line" x1="100" y1="60" x2="100" y2="14" />
                  </g>
                  <circle className="anet__vis-fan-sat" cx="22" cy="22" r="3" />
                  <circle className="anet__vis-fan-sat" cx="178" cy="22" r="3" />
                  <circle className="anet__vis-fan-sat" cx="22" cy="98" r="3" />
                  <circle className="anet__vis-fan-sat" cx="178" cy="98" r="3" />
                  <circle className="anet__vis-fan-sat" cx="100" cy="14" r="3" />
                  <circle className="anet__vis-fan-ring" cx="100" cy="60" r="10" />
                  <circle className="anet__vis-fan-core" cx="100" cy="60" r="6.5" />
                </svg>
              </div>
            </div>
            <h3 className="anet__cap-title">
              Reuse portable authorization across systems
            </h3>
            <p className="anet__cap-body">one mandate, accepted everywhere</p>
          </article>

          {/* 02 Identity */}
          <article className="anet__cap" data-anet-cap>
            <div className="anet__cap-eyebrow">
              Identity <span className="num">· 02</span>
            </div>
            <div className="anet__cap-vis">
              <div className="anet__vis-id" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="anet__vis-id-row">
                    <span className="anet__vis-id-pip" />
                    <span className="anet__vis-id-line" />
                    <span className="anet__vis-id-mark">✓</span>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="anet__cap-title">
              Verify identity and signer authenticity
            </h3>
            <p className="anet__cap-body">signers verified cryptographically</p>
          </article>

          {/* 03 Policy */}
          <article className="anet__cap" data-anet-cap>
            <div className="anet__cap-eyebrow">
              Policy <span className="num">· 03</span>
            </div>
            <div className="anet__cap-vis">
              <div className="anet__vis-policy" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="anet__vis-policy-row">
                    <span className="anet__vis-policy-tag" />
                    <span className="anet__vis-policy-track">
                      <span className="anet__vis-policy-fill" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="anet__cap-title">Policy changes without redeploying</h3>
            <p className="anet__cap-body">rules propagate live through mandates</p>
          </article>

          {/* 04 Audit */}
          <article className="anet__cap" data-anet-cap>
            <div className="anet__cap-eyebrow">
              Audit <span className="num">· 04</span>
            </div>
            <div className="anet__cap-vis">
              <div className="anet__vis-audit" aria-hidden="true">
                <span className="anet__vis-audit-block" />
                <span className="anet__vis-audit-link" />
                <span className="anet__vis-audit-block" />
                <span className="anet__vis-audit-link" />
                <span className="anet__vis-audit-block" />
                <span className="anet__vis-audit-link" />
                <span className="anet__vis-audit-block" />
                <span className="anet__vis-audit-link" />
                <span className="anet__vis-audit-block" />
              </div>
            </div>
            <h3 className="anet__cap-title">
              Independently verifiable audit trails
            </h3>
            <p className="anet__cap-body">
              every action anchored, re-verifiable forever
            </p>
          </article>

          {/* 05 Portable */}
          <article className="anet__cap" data-anet-cap>
            <div className="anet__cap-eyebrow">
              Portable <span className="num">· 05</span>
            </div>
            <div className="anet__cap-vis">
              <div className="anet__vis-orbit" aria-hidden="true">
                <svg viewBox="0 0 200 120">
                  <ellipse
                    className="anet__vis-orbit-ring"
                    cx="100"
                    cy="60"
                    rx="86"
                    ry="34"
                  />
                  <ellipse
                    className="anet__vis-orbit-ring"
                    cx="100"
                    cy="60"
                    rx="50"
                    ry="20"
                  />
                  <circle
                    className="anet__vis-orbit-core"
                    cx="100"
                    cy="60"
                    r="6"
                  />
                  <circle className="anet__vis-orbit-inner" r="3.5">
                    <animateMotion
                      dur="4s"
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href="#anetOrbitInnerPath" />
                    </animateMotion>
                  </circle>
                  <circle className="anet__vis-orbit-outer" r="4">
                    <animateMotion
                      dur="7s"
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href="#anetOrbitOuterPath" />
                    </animateMotion>
                  </circle>
                  <defs>
                    <path
                      id="anetOrbitInnerPath"
                      d="M 150 60 A 50 20 0 1 1 50 60 A 50 20 0 1 1 150 60 Z"
                    />
                    <path
                      id="anetOrbitOuterPath"
                      d="M 186 60 A 86 34 0 1 1 14 60 A 86 34 0 1 1 186 60 Z"
                    />
                  </defs>
                </svg>
              </div>
            </div>
            <h3 className="anet__cap-title">
              Portable authorization across organizations
            </h3>
            <p className="anet__cap-body">authority that travels with the actor</p>
          </article>

          {/* 06 Runtime */}
          <article className="anet__cap" data-anet-cap>
            <div className="anet__cap-eyebrow">
              Runtime <span className="num">· 06</span>
            </div>
            <div className="anet__cap-vis">
              <div className="anet__vis-link" aria-hidden="true">
                <span className="anet__vis-link-box">agent</span>
                <span className="anet__vis-link-conn" />
                <span className="anet__vis-link-box anet__vis-link-box--accent">
                  mandate
                </span>
              </div>
            </div>
            <h3 className="anet__cap-title">
              Runtime enforcement for autonomous systems
            </h3>
            <p className="anet__cap-body">
              agents that cannot act outside their mandate
            </p>
          </article>
        </div>

        <div className="anet__closer">
          <p className="anet__closer-line">
            Humanos separates <em>authorization</em> from <em>execution</em>.
          </p>
        </div>
      </div>
    </section>
  );
}
