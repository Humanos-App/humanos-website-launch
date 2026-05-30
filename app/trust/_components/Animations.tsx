"use client";

import { useEffect } from "react";

/**
 * Wires the four IntersectionObserver-driven loops used across the
 * Trust page:
 *   - #heroFlow  : cascade nodes lit sequentially down a vertical chain
 *   - #viaFlow   : same cascade on the VIA section
 *   - #decisionTree : cycle active outcome (weighted toward authorized)
 *   - #hub       : sequentially "verify" each spoke around the hub
 *
 * Each animation only runs while its container is in view, and resets
 * when scrolled away. All effects use opacity/class toggles so they
 * compose cleanly with the static SSR markup.
 */
export function TrustAnimations() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    const onView = (
      el: Element,
      onIn: () => void,
      onOut?: () => void,
    ): () => void => {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) onIn();
            else if (onOut) onOut();
          });
        },
        { threshold: 0.25 },
      );
      io.observe(el);
      return () => io.disconnect();
    };

    /* Cascade: light nodes inside #id one-by-one, looping on period ms. */
    const cascade = (id: string, period: number) => {
      const c = document.getElementById(id);
      if (!c) return;
      const items = Array.from(c.querySelectorAll<HTMLElement>("[data-i]"));
      const lit = items.filter(
        (n) =>
          n.classList.contains("node") || n.classList.contains("viaflow__fan"),
      );
      let timers: number[] = [];
      let loop: number | null = null;
      const clear = () => {
        timers.forEach((t) => window.clearTimeout(t));
        timers = [];
      };
      const run = () => {
        clear();
        lit.forEach((n) => n.classList.remove("is-lit"));
        lit.forEach((n, i) => {
          timers.push(
            window.setTimeout(() => n.classList.add("is-lit"), 250 + i * 360),
          );
        });
      };
      cleanups.push(
        onView(
          c,
          () => {
            if (loop === null) {
              run();
              loop = window.setInterval(run, period);
            }
          },
          () => {
            if (loop !== null) {
              window.clearInterval(loop);
              loop = null;
              clear();
            }
          },
        ),
      );
      cleanups.push(() => {
        if (loop !== null) window.clearInterval(loop);
        clear();
      });
    };

    cascade("heroFlow", 4200);
    cascade("viaFlow", 3800);

    /* Decision tree: cycle the active outcome on a weighted sequence. */
    const tree = document.getElementById("decisionTree");
    if (tree) {
      const outs = Array.from(
        tree.querySelectorAll<HTMLElement>("[data-outcome]"),
      );
      const order = [0, 0, 1, 0, 2, 0, 1];
      let idx = 0;
      let loop: number | null = null;
      const step = () => {
        outs.forEach((o) => o.classList.remove("is-active"));
        outs[order[idx % order.length]]?.classList.add("is-active");
        idx++;
      };
      cleanups.push(
        onView(
          tree,
          () => {
            if (loop === null) {
              step();
              loop = window.setInterval(step, 1600);
            }
          },
          () => {
            if (loop !== null) {
              window.clearInterval(loop);
              loop = null;
            }
          },
        ),
      );
      cleanups.push(() => {
        if (loop !== null) window.clearInterval(loop);
      });
    }

    /* Hub: stagger-verify each spoke, then reset on next loop. */
    const hub = document.getElementById("hub");
    if (hub) {
      const spokes = Array.from(
        hub.querySelectorAll<HTMLElement>("[data-spoke]"),
      );
      let timers: number[] = [];
      let loop: number | null = null;
      const clear = () => {
        timers.forEach((t) => window.clearTimeout(t));
        timers = [];
      };
      const run = () => {
        clear();
        spokes.forEach((s) => s.classList.remove("is-verified"));
        spokes.forEach((s, i) =>
          timers.push(
            window.setTimeout(
              () => s.classList.add("is-verified"),
              300 + i * 280,
            ),
          ),
        );
      };
      cleanups.push(
        onView(
          hub,
          () => {
            if (loop === null) {
              run();
              loop = window.setInterval(run, 4200);
            }
          },
          () => {
            if (loop !== null) {
              window.clearInterval(loop);
              loop = null;
              clear();
            }
          },
        ),
      );
      cleanups.push(() => {
        if (loop !== null) window.clearInterval(loop);
        clear();
      });
    }

    return () => {
      cleanups.forEach((c) => c());
    };
  }, []);

  return null;
}
