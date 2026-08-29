import { readFileSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";

/**
 * The sep-2026 design previews, rendered inside the real site chrome.
 *
 * `npm run sync:v2` publishes each design twice: a standalone page at
 * public/v2/<slug>/index.html, and the same markup minus its own <nav> as
 * body.html. This route renders that fragment, so the previews inherit the
 * layout's announcement banner, navbar and footer instead of the design's
 * placeholder chrome.
 *
 * Only support.js is loaded here. It boots the design's own runtime, and the
 * <helmet> block inside the fragment tells it which stylesheets and modules to
 * pull in — the same path the standalone page takes, so nothing is duplicated.
 *
 * Two things to know about sharing a page with the app:
 *
 *  - The design's runtime is a second React (18, from a CDN) alongside Next's.
 *    They never touch the same DOM: Next renders this fragment once as static
 *    markup and leaves it alone, and the design's React owns everything under
 *    <x-dc> from there.
 *  - The design system's stylesheets are global, so on these routes they also
 *    restyle the chrome wherever the two define the same --hm-* token. That is
 *    the point of previewing here, but it does mean the navbar is not pixel
 *    identical to v1 on a /v2 route.
 */

/** Where sync-v2 publishes the shared design assets. */
const SHARED_BASE = "/v2/_shared";

const PAGES: { slug: string; title: string }[] = [
  { slug: "homepage", title: "Homepage" },
  { slug: "pricing", title: "Pricing" },
  { slug: "prove", title: "Prove Your AI" },
  { slug: "control", title: "Control" },
  { slug: "monitor", title: "Monitor" },
  { slug: "monitor-v2", title: "Monitor v2" },
  { slug: "monitor-v3", title: "Monitor v3" },
  { slug: "risk-intelligence", title: "Risk Intelligence" },
];

export function generateStaticParams() {
  return PAGES.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES.find((p) => p.slug === slug);
  return {
    title: page ? `${page.title} · v2 preview` : "v2 preview",
    // Internal previews: never index them, even if /v2 reaches production.
    robots: { index: false, follow: false },
    // Assets the design names through a template binding rather than a literal
    // src — the customer logos — are resolved against this at runtime. The
    // standalone page carries it in its own <head>; body.html is the body
    // alone, so without this the logos would resolve relative to /v2/<slug>.
    other: { "v2-asset-base": `${SHARED_BASE}/` },
  };
}

function readBody(slug: string): string | null {
  try {
    return readFileSync(
      join(process.cwd(), "public", "v2", slug, "body.html"),
      "utf8"
    );
  } catch {
    // Not published yet — `npm run sync:v2` writes these.
    return null;
  }
}

export default async function V2Preview({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!PAGES.some((p) => p.slug === slug)) notFound();

  const body = readBody(slug);
  if (body === null) {
    return (
      <main style={{ padding: "80px 24px", maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Preview not built</h1>
        <p style={{ marginTop: 12, lineHeight: 1.6 }}>
          <code>public/v2/{slug}/body.html</code> is missing. Run{" "}
          <code>npm run sync:v2</code> to publish the designs.
        </p>
      </main>
    );
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src={`${SHARED_BASE}/support.js`} strategy="afterInteractive" />
    </>
  );
}
