"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowRight } from "./_primitives";

const NAV_SECTIONS = [
  { id: "architecture", label: "Architecture", group: "overview" },
  { id: "authorization", label: "Authorization", group: "runtime" },
  {
    id: "cross-system",
    label: "Cross-System Propagation",
    group: "runtime",
  },
  { id: "verification", label: "Verification", group: "runtime" },
  { id: "recovery", label: "Recovery", group: "runtime" },
  { id: "receipts", label: "Receipts", group: "runtime" },
  { id: "policy", label: "Policy Layer", group: "fabric" },
  { id: "identity", label: "Identity Layer", group: "fabric" },
  { id: "enforcement", label: "Runtime Enforcement", group: "fabric" },
  { id: "integrations", label: "Integrations", group: "prod" },
  { id: "use-cases", label: "Use Cases", group: "prod" },
];

const GROUP_LABELS: Record<string, string> = {
  overview: "Overview",
  runtime: "Runtime",
  fabric: "Trust fabric",
  prod: "In production",
};

export function SectionNav() {
  const [active, setActive] = useState("architecture");
  const navRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [overflow, setOverflow] = useState({ left: false, right: false });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setOverflow({
        left: el.scrollLeft > 2,
        right: el.scrollLeft < maxScroll - 2,
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const nudgeRight = () => {
    const el = scrollerRef.current;
    if (el) el.scrollBy({ left: el.clientWidth * 0.6, behavior: "smooth" });
  };

  useEffect(() => {
    const update = () => {
      let current = NAV_SECTIONS[0].id;
      const probe = window.innerHeight * 0.35;
      for (const s of NAV_SECTIONS) {
        const el = document.getElementById(s.id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= probe) current = s.id;
        }
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 116;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(
      `.section-nav-item[data-id="${active}"]`,
    );
    if (el && el.parentElement) {
      const parent = el.parentElement;
      const elRect = el.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      const offset =
        elRect.left -
        parentRect.left -
        parentRect.width / 2 +
        elRect.width / 2;
      parent.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, [active]);

  return (
    <div
      ref={navRef}
      className={`section-nav ${overflow.left ? "has-overflow-left" : ""} ${
        overflow.right ? "has-overflow-right" : ""
      }`}
    >
      <div className="section-nav-inner" ref={scrollerRef}>
        {NAV_SECTIONS.map((s, i) => {
          const prev = NAV_SECTIONS[i - 1];
          const groupChanged = !prev || prev.group !== s.group;
          return (
            <Fragment key={s.id}>
              {groupChanged && (
                <div className="section-nav-group" aria-hidden="true">
                  <span className="section-nav-group-bar"></span>
                  <span className="section-nav-group-label">
                    {GROUP_LABELS[s.group]}
                  </span>
                </div>
              )}
              <button
                data-id={s.id}
                className={`section-nav-item ${
                  active === s.id ? "is-active" : ""
                }`}
                onClick={() => scrollTo(s.id)}
              >
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </button>
            </Fragment>
          );
        })}
      </div>
      <button
        className="section-nav-hint"
        onClick={nudgeRight}
        aria-label="Scroll sections right"
        title="More sections"
      >
        <ArrowRight />
      </button>
    </div>
  );
}
