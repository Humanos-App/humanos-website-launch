"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * MobileVisualDrawer wraps a heavy visualization (an SVG diagram, a
 * scroll-driven animation, a dense card) so it behaves two different
 * ways across breakpoints:
 *
 * - Desktop (> 720 px): renders `children` inline exactly where the
 *   wrapper sits. Zero CSS impact compared to having the visualization
 *   in the JSX directly.
 *
 * - Mobile (≤ 720 px): hides `children` from the page flow and renders
 *   an "Expand" pill button in its place. Tapping the button opens a
 *   full-width bottom-sheet drawer that mounts a fresh copy of
 *   `children` and animates in from the bottom of the screen. The
 *   drawer can be closed by:
 *     • tapping the X button at the top-right
 *     • tapping the backdrop
 *     • pressing Escape
 *     • dragging the handle downward past ~25 % of the drawer height
 *
 * The visualization is rendered twice on mobile when the drawer is
 * open (once inline with `display:none`, once inside the drawer), but
 * the inline copy never has a layout box so any IntersectionObserver
 * loops it owns stay idle — only the drawer copy actually animates.
 */
export function MobileVisualDrawer({
  label = "Expand animation",
  drawerInnerClassName,
  children,
}: {
  /** Pill button copy shown on mobile in place of the visualization. */
  label?: string;
  /**
   * Optional class string applied to a wrapper INSIDE the drawer's
   * .mvd__content (NOT around the inline copy). Used to re-create the
   * parent context the visualization expects when it's portaled out
   * of its original DOM home — e.g. the rt charts depend on
   * `.rt__stage.is-active` as an ancestor for ~30 reveal rules, so
   * Rt.tsx passes `"rt__stage is-active"` here. Desktop is untouched
   * because the inline copy doesn't get this wrapper.
   */
  drawerInnerClassName?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dragY, setDragY] = useState(0);
  const dragStart = useRef<number | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  /* Portal mount guard — createPortal needs document, which is only
     available client-side. */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Lock background scroll while open. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Escape closes. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onTouchStart = (e: React.TouchEvent) => {
    dragStart.current = e.touches[0].clientY;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (dragStart.current == null) return;
    const delta = e.touches[0].clientY - dragStart.current;
    if (delta > 0) setDragY(delta);
  };
  const onTouchEnd = () => {
    const drawerH = drawerRef.current?.getBoundingClientRect().height ?? 600;
    if (dragY > drawerH * 0.25 || dragY > 140) {
      setOpen(false);
    }
    dragStart.current = null;
    setDragY(0);
  };

  return (
    <>
      <button
        type="button"
        className="mvd__expand"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
      >
        <span>Expand</span>
        <span className="mvd__expand-icon" aria-hidden="true">
          ↗
        </span>
      </button>

      <div className="mvd__inline">{children}</div>

      {/* Render the overlay into document.body so position:fixed resolves
         against the viewport. Any ancestor with transform/filter/
         will-change/backdrop-filter would otherwise become the
         containing block and collapse the drawer to that ancestor's
         dimensions (see Rt.tsx's transformed .rt__stage-visual). */}
      {mounted && open
        ? createPortal(
            <div
              className="mvd__overlay"
              role="presentation"
              onClick={() => setOpen(false)}
            >
              <div
                ref={drawerRef}
                className="mvd__drawer"
                role="dialog"
                aria-modal="true"
                aria-label={label}
                onClick={(e) => e.stopPropagation()}
                style={
                  dragY > 0
                    ? { transform: `translateY(${dragY}px)`, transition: "none" }
                    : undefined
                }
              >
                <div
                  className="mvd__handle-row"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <span className="mvd__handle" aria-hidden="true" />
                  <button
                    type="button"
                    className="mvd__close"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
                <div className="mvd__content">
                  {drawerInnerClassName ? (
                    <div className={drawerInnerClassName}>{children}</div>
                  ) : (
                    children
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
