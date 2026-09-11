import { readFileSync } from "node:fs";
import { join } from "node:path";
import Script from "next/script";
import { DesignBoot } from "./DesignBoot";
import { TalkToUsBridge } from "./TalkToUsBridge";
import { RiAskDrawerBridge } from "./RiAskDrawerBridge";
import { StoriesLoopBridge } from "./StoriesLoopBridge";

/**
 * Renders one page of the sep-2026 design inside the site chrome.
 *
 * `npm run sync:v2` publishes each design twice: a standalone copy at
 * public/designs/<slug>/index.html, and the same markup minus its own nav as
 * body.html. This renders that fragment, so the page inherits the layout's
 * announcement banner, navbar and footer rather than the design's own.
 *
 * Only support.js is loaded. It boots the design's runtime, and the <helmet>
 * block inside the fragment tells it which stylesheets and modules to pull in
 * — the same path the standalone copy takes, so nothing is duplicated.
 *
 * The design's runtime is a second React (18, from a CDN) alongside Next's.
 * They never touch the same DOM: Next renders the fragment once as static
 * markup and leaves it alone, and the design's React owns everything under
 * <x-dc> from there.
 */

export const DESIGN_ASSET_BASE = "/designs/_shared";

export function readDesignBody(slug: string): string | null {
  try {
    return readFileSync(
      join(process.cwd(), "public", "designs", slug, "body.html"),
      "utf8"
    );
  } catch {
    // Not published yet — `npm run sync:v2` writes these.
    return null;
  }
}

export function DesignPage({ slug }: { slug: string }) {
  const body = readDesignBody(slug);

  if (body === null) {
    return (
      <main style={{ padding: "80px 24px", maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Page not built</h1>
        <p style={{ marginTop: 12, lineHeight: 1.6 }}>
          <code>public/designs/{slug}/body.html</code> is missing. Run{" "}
          <code>npm run sync:v2</code> to publish the designs.
        </p>
      </main>
    );
  }

  return (
    <>
      {/* Tagged so DesignBoot can tell this route's fragment apart from the
          previous page's, which can still be attached right after a
          navigation. */}
      {/* min-height keeps the footer out of the viewport during the gap
          between first paint and the design runtime's render. */}
      <div
        data-design={slug}
        style={{ minHeight: "100vh" }}
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <DesignBoot slug={slug} />
      <TalkToUsBridge />
      <RiAskDrawerBridge />
      <StoriesLoopBridge />
      {/* The site chrome is sticky, so the space a design gets is the viewport
          less its height. The announcement bar has no fixed height — it is
          padding-driven and its copy can wrap — so it is measured rather than
          assumed, and republished whenever it changes. */}
      <Script id="chrome-height" strategy="afterInteractive">{`
        (function () {
          var el = document.querySelector('.site-chrome');
          if (!el) return;
          var set = function () {
            document.documentElement.style.setProperty(
              '--site-chrome-h', Math.round(el.getBoundingClientRect().height) + 'px'
            );
          };
          set();
          if (typeof ResizeObserver !== 'undefined') new ResizeObserver(set).observe(el);
          window.addEventListener('resize', set);
        })();
      `}</Script>
      <Script src={`${DESIGN_ASSET_BASE}/support.js`} strategy="afterInteractive" />
    </>
  );
}

/**
 * Assets the designs name through a template binding rather than a literal
 * src — the customer logos — are resolved against this at runtime. The
 * standalone copy carries it in its own <head>; body.html is the body alone,
 * so without it those logos would resolve relative to the current route.
 */
export const designMetaOther = { "v2-asset-base": `${DESIGN_ASSET_BASE}/` };
