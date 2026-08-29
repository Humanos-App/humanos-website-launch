/**
 * Scroll stage — one component is active at a time, and the page dresses for it.
 *
 * The page is grouped into components, each declaring the background it wants:
 *
 *   <div data-stage data-tone="dark"> … </div>
 *
 * Whichever component holds the viewport's middle is the active one. It is
 * shown; every other component is hidden. The page background is simply the
 * active component's tone, so the two can never disagree.
 *
 * That last part is the whole point. Fading the background independently of
 * the content means a dark component can be on screen while the background is
 * still light — light text on a light page, unreadable for the length of the
 * transition. Tying visibility to the same active flag removes the failure
 * case rather than trying to time around it: a component is only ever visible
 * on its own background.
 *
 *   window.HumanosScrollStage.mount(scopeEl) -> { destroy(), refresh() }
 *
 * Components are marked with `data-stage-active="true" | "false"`; the CSS
 * owns what that looks like. The active tone is published on <html> as
 * `data-page-tone`, and painted inline on <body>.
 */
(function () {
  "use strict";

  /* `null` means "no override" — the page's own stylesheet background shows
     through, so the light tone is whatever the page normally is. */
  var DEFAULT_TONES = {
    light: null,
    dark: "#14122E",
  };

  function mount(root, opts) {
    if (!root) return null;
    opts = opts || {};

    var tones = Object.assign({}, DEFAULT_TONES, opts.tones);
    var fallback = opts.fallback || "light";
    var selector = opts.selector || "[data-stage]";
    /* <body> is what actually paints the page. A wrapper inside the app tree
       is React's to re-render, and an inline style beats stylesheet rules
       without an !important fight. */
    var target = opts.target || document.body;
    /* Fraction of viewport height that decides the active component. The
       middle is the least surprising: a component takes over as it covers the
       centre of the screen. */
    var probe = typeof opts.probe === "number" ? opts.probe : 0.5;

    var stages = [];
    var active = null;
    var raf = null;
    var timer = null;
    var destroyed = false;
    /* Mounting can happen before the components have rendered, and React may
       swap nodes later, so the list is re-collected whenever the tree moves. */
    var stale = true;

    function collect() {
      stages = Array.prototype.slice.call(
        (opts.scope || root).querySelectorAll(selector)
      );
      stale = false;
    }

    function stageAt(y) {
      for (var i = 0; i < stages.length; i++) {
        var r = stages[i].getBoundingClientRect();
        if (r.top <= y && r.bottom > y) return stages[i];
      }
      return null;
    }

    function pick() {
      var vh = window.innerHeight;
      var doc = document.documentElement;

      /* Checked before the probe, not after it. A component shorter than half
         the viewport that sits at the end of the page can never reach the
         probe line — the page runs out of scroll first — so it would stay
         hidden for good. At the bottom, the foot of the viewport decides. */
      if (window.scrollY + vh >= (doc.scrollHeight || 0) - 2) {
        var last = stageAt(vh - 1);
        if (last) return last;
      }

      var found = stageAt(vh * probe);
      if (found) return found;

      /* Between components (or before any have laid out) hold what we had,
         rather than flashing the whole page to the fallback. */
      return active;
    }

    function apply() {
      if (destroyed) return;
      if (stale) collect();

      var next = pick();
      if (!next || next === active) return;
      active = next;

      for (var i = 0; i < stages.length; i++) {
        stages[i].setAttribute(
          "data-stage-active",
          stages[i] === active ? "true" : "false"
        );
      }

      var tone = active.getAttribute("data-tone") || fallback;
      var color = tones[tone];
      if (color) target.style.setProperty("background-color", color);
      else target.style.removeProperty("background-color");
      document.documentElement.setAttribute("data-page-tone", tone);
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
        for (var i = 0; i < stages.length; i++) {
          stages[i].removeAttribute("data-stage-active");
        }
        target.style.removeProperty("background-color");
        document.documentElement.removeAttribute("data-page-tone");
      },
    };
  }

  window.HumanosScrollStage = { mount: mount };
})();
