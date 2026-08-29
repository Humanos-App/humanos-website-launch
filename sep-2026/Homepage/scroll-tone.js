/**
 * Scroll tone — the page background follows the section you are reading.
 *
 * Sections used to paint their own background, so a dark band was simply
 * there as you scrolled past it. Instead the page itself owns one background
 * colour, and sections declare the tone they want:
 *
 *   <div data-tone="dark"> … </div>
 *
 * Whichever toned section holds the probe line (the viewport's middle by
 * default) wins, and the page crossfades to that tone. Sections with no
 * `data-tone` are the fallback tone, so only the exceptions need marking —
 * add a `data-tone` to any section on any page and it joins in.
 *
 *   window.HumanosScrollTone.mount(rootEl) -> { destroy(), refresh() }
 *
 * The tone is published as a custom property on the root (`--page-bg`) and as
 * `data-page-tone`, so CSS can hang other tone-dependent rules off it.
 */
(function () {
  "use strict";

  /* `null` means "no override" — the page's own stylesheet background shows
     through. So the light tone is whatever the page normally is, and only the
     exceptions carry a colour. */
  var DEFAULT_TONES = {
    light: null,
    dark: "#14122E",
  };

  function mount(root, opts) {
    if (!root) return null;
    opts = opts || {};

    var tones = Object.assign({}, DEFAULT_TONES, opts.tones);
    var fallback = opts.fallback || "light";
    /* The background goes on <body>, which is what actually paints the page —
       not on a wrapper inside the app tree, which React owns and re-renders.
       Setting it inline also beats any stylesheet rule without needing
       !important or a cascade-order fight. */
    var target = opts.target || document.body;
    /* Fraction of the viewport height used to decide which section is being
       read. The middle is the least surprising: the tone turns over as the
       boundary passes the centre of the screen, where both sides are still
       inside their own generous section padding. */
    var probe = typeof opts.probe === "number" ? opts.probe : 0.5;

    var sections = [];
    var current = null;
    var raf = null;
    var timer = null;
    var destroyed = false;
    /* This mounts from a ref callback, which fires before the sections below
       it have rendered — so the list starts empty and has to be re-collected
       whenever the tree changes, not just once. */
    var stale = true;

    function collect() {
      sections = Array.prototype.slice.call(
        (opts.scope || root).querySelectorAll("[data-tone]")
      );
      stale = false;
    }

    function refresh() {
      stale = true;
      apply();
    }

    function toneOfSectionAt(y) {
      for (var i = 0; i < sections.length; i++) {
        var r = sections[i].getBoundingClientRect();
        if (r.top <= y && r.bottom > y) {
          return sections[i].getAttribute("data-tone") || fallback;
        }
      }
      return null;
    }

    function toneAt() {
      var vh = window.innerHeight;
      var tone = toneOfSectionAt(vh * probe);
      if (tone) return tone;

      /* At the very bottom the probe can sit above the final section — the
         page cannot scroll far enough to bring it down. Read the foot of the
         viewport instead, so a page that ends on a dark section stays dark
         rather than flicking back at the last scroll. */
      var doc = document.documentElement;
      var atBottom =
        window.scrollY + vh >= (doc.scrollHeight || 0) - 2;
      if (atBottom) {
        tone = toneOfSectionAt(vh - 1);
        if (tone) return tone;
      }
      return fallback;
    }

    function apply() {
      if (destroyed) return;
      if (stale) collect();
      var tone = toneAt();
      if (tone === current) return;
      current = tone;
      var color = tones[tone];
      if (color) target.style.setProperty("background-color", color);
      else target.style.removeProperty("background-color");
      document.documentElement.setAttribute("data-page-tone", tone);
    }

    /* Coalesce to one update per frame. rAF alone is not enough: a document
       that is hidden or backgrounded suspends frames, so a request made then
       never runs, `raf` never clears, and every later schedule() would
       short-circuit against it — leaving the tone stuck until a frame happens
       to fire. The timer is the floor that keeps that from wedging. */
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

    /* Scrolling cannot change which sections exist, only where they are, so
       it reuses the cached list; anything structural marks it stale first. */
    function scheduleRecollect() {
      stale = true;
      schedule();
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", scheduleRecollect);

    /* Sections arrive with the page's own render, which lands after this
       mounts, and React may swap nodes later — so watch for both the tree
       changing shape and the page changing height. */
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
        target.style.removeProperty("background-color");
        document.documentElement.removeAttribute("data-page-tone");
      },
    };
  }

  window.HumanosScrollTone = { mount: mount };
})();
