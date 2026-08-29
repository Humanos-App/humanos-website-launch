/**
 * Scroll stage — the page crossfades between components as you scroll.
 *
 * Components are transparent. The page as a whole owns the background, and
 * where two neighbouring components want different tones the handover happens
 * across the boundary between them:
 *
 *   the outgoing component fades out,
 *   the incoming component fades in,
 *   the page background travels from one tone to the other,
 *
 * all three driven by the same scroll progress, so they cannot disagree.
 *
 * Progress is measured from where the boundary sits in the viewport: at the
 * bottom edge nothing has happened yet, at the top edge the handover is done.
 * The fade itself is squeezed into the middle of that travel (see EASE_IN /
 * EASE_OUT) — stretching it over the whole viewport leaves both components
 * washed out for most of a screen, which reads as broken rather than smooth.
 *
 * Boundaries between components of the *same* tone are left alone entirely:
 * there is nothing to hand over, so both stay fully opaque.
 *
 *   window.HumanosScrollStage.mount(scopeEl) -> { destroy(), refresh() }
 */
(function () {
  "use strict";

  var TONES = {
    light: [244, 243, 239] /* --hm-clarity */,
    dark: [20, 18, 46] /* #14122E */,
  };

  /* Fraction of the boundary's travel across the viewport over which the
     crossfade runs. Before EASE_IN and after EASE_OUT the components sit at
     full opacity, so only the middle third is ever mid-fade. */
  var EASE_IN = 0.3;
  var EASE_OUT = 0.7;

  function clamp01(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }

  /* smoothstep — eases both ends so the fade has no hard start or stop */
  function smooth(t) {
    return t * t * (3 - 2 * t);
  }

  function mix(a, b, t) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * t),
      Math.round(a[1] + (b[1] - a[1]) * t),
      Math.round(a[2] + (b[2] - a[2]) * t),
    ];
  }

  function rgb(c) {
    return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")";
  }

  function mount(root, opts) {
    if (!root) return null;
    opts = opts || {};

    var selector = opts.selector || "[data-stage]";
    var fallback = opts.fallback || "light";

    /* The tone is painted on a fixed, full-viewport layer rather than on
       <body>. This page's body box is zero-high — the design system's host
       lets the content escape it — so a background there only ever covered
       the first screen. A fixed layer covers the viewport at every scroll
       position no matter how the document is laid out. It sits at z-index -1:
       above the root background, below all content. */
    var target = opts.target || null;
    if (!target) {
      target = document.querySelector("[data-page-backdrop]");
      if (!target) {
        target = document.createElement("div");
        target.setAttribute("data-page-backdrop", "");
        target.setAttribute("aria-hidden", "true");
        document.body.insertBefore(target, document.body.firstChild);
      }
    }

    var stages = [];
    var raf = null;
    var timer = null;
    var destroyed = false;
    var stale = true;
    var reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function collect() {
      stages = Array.prototype.slice.call(
        (opts.scope || root).querySelectorAll(selector)
      );
      stale = false;
    }

    function toneOf(el) {
      return el.getAttribute("data-tone") || fallback;
    }

    function apply() {
      if (destroyed) return;
      if (stale) collect();
      if (!stages.length) return;

      var vh = window.innerHeight;
      var i;

      /* How much of the screen each component holds. Working from coverage
         rather than from one "current boundary" is what makes short
         components safe: when three are on screen at once every one of them
         gets its own share, instead of a single boundary driving the fade and
         leaving the others on stale values. Coverage across all components
         sums to the viewport, so the shares are already normalised. */
      var cover = [];
      var total = 0;
      for (i = 0; i < stages.length; i++) {
        var r = stages[i].getBoundingClientRect();
        var overlap = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        cover[i] = overlap > 0 ? overlap / vh : 0;
        total += cover[i];
      }

      /* The page cannot scroll past its own end, so the last component may
         never grow enough to take over on its own — leaving the page resting
         forever on a half-mixed background. Over the final stretch, hand it
         the rest of the screen. */
      var maxY = (document.documentElement.scrollHeight || 0) - vh;
      if (maxY > 0 && stages.length) {
        var run = vh * 0.5;
        var toEnd = clamp01((window.scrollY - (maxY - run)) / run);
        if (toEnd > 0) {
          var last = stages.length - 1;
          cover[last] = Math.max(cover[last], toEnd);
          total = 0;
          for (i = 0; i < stages.length; i++) {
            if (i !== last) cover[i] *= 1 - toEnd;
            total += cover[i];
          }
        }
      }

      if (total <= 0) return;

      /* Background is every visible tone weighted by its share — defined for
         any arrangement, not just a two-way handover. Weights are cubed
         first: a straight average never reaches a pure tone while a sliver of
         the next component is still on screen, so a section shorter than the
         viewport would sit permanently on a washed-out background. Cubing
         lets whichever component dominates the screen carry the page. */
      var acc = [0, 0, 0];
      var wsum = 0;
      for (i = 0; i < stages.length; i++) {
        if (!cover[i]) continue;
        var share = cover[i] / total;
        var w = share * share * share;
        var c = TONES[toneOf(stages[i])] || TONES[fallback];
        acc[0] += c[0] * w;
        acc[1] += c[1] * w;
        acc[2] += c[2] * w;
        wsum += w;
      }
      var color = wsum
        ? [
            Math.round(acc[0] / wsum),
            Math.round(acc[1] / wsum),
            Math.round(acc[2] / wsum),
          ]
        : TONES[fallback];

      /* Opacity is a property of the handover, not of how much screen a
         component happens to hold: a component partway into view is still
         being read and must stay solid. So everything is opaque except the
         two components either side of a tone change that is on screen. */
      var opacity = [];
      for (i = 0; i < stages.length; i++) opacity[i] = 1;

      for (i = 0; i < stages.length - 1; i++) {
        var from = toneOf(stages[i]);
        var to = toneOf(stages[i + 1]);
        if (from === to) continue;

        var bTop = stages[i + 1].getBoundingClientRect().top;
        if (bTop > vh) continue;

        /* Travel measured in scroll, not in viewport position, so a boundary
           the page cannot bring all the way to the top still completes: the
           range ends at whichever comes first, the top edge or the last
           scrollable pixel. */
        var start = bTop + window.scrollY - vh;
        var end = Math.min(bTop + window.scrollY, maxY);
        var travel =
          end > start ? clamp01((window.scrollY - start) / (end - start)) : 1;

        var t = smooth(clamp01((travel - EASE_IN) / (EASE_OUT - EASE_IN)));
        if (reduced) t = travel < 0.5 ? 0 : 1;

        /* Several handovers can be live at once around a short component;
           each only ever darkens its own pair, so the strictest wins. */
        opacity[i] = Math.min(opacity[i], 1 - t);
        opacity[i + 1] = Math.min(opacity[i + 1], t);
      }

      for (i = 0; i < stages.length; i++) {
        var o =
          opacity[i] >= 1 ? "" : String(Math.round(opacity[i] * 1000) / 1000);
        if (stages[i].style.opacity !== o) stages[i].style.opacity = o;
      }
      target.style.setProperty("background-color", rgb(color));
    }

    /* Coalesce to one update per frame. rAF alone is not enough: a hidden or
       backgrounded document suspends frames, so a request made then never
       runs, the handle never clears, and every later schedule() would
       short-circuit against it. The timer is the floor that prevents that. */
    function schedule() {
      if (destroyed || raf !== null) return;
      raf = window.requestAnimationFrame(run);
      if (timer === null) timer = window.setTimeout(run, 120);
    }

    function run() {
      if (raf !== null) {
        window.cancelAnimationFrame(raf);
        raf = null;
      }
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
      apply();
    }

    function scheduleRecollect() {
      stale = true;
      schedule();
    }

    function refresh() {
      stale = true;
      apply();
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", scheduleRecollect);

    var ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(scheduleRecollect);
      ro.observe(root);
    }

    var mo = null;
    if (typeof MutationObserver !== "undefined") {
      mo = new MutationObserver(scheduleRecollect);
      mo.observe(root, { childList: true, subtree: true });
    }

    refresh();

    return {
      refresh: refresh,
      destroy: function () {
        destroyed = true;
        if (raf !== null) window.cancelAnimationFrame(raf);
        if (timer !== null) window.clearTimeout(timer);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", scheduleRecollect);
        if (ro) ro.disconnect();
        if (mo) mo.disconnect();
        for (var i = 0; i < stages.length; i++) stages[i].style.opacity = "";
        target.style.removeProperty("background-color");
        if (target.hasAttribute("data-page-backdrop") && target.parentNode) target.parentNode.removeChild(target);
      },
    };
  }

  window.HumanosScrollStage = { mount: mount };
})();
