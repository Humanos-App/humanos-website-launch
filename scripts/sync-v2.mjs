#!/usr/bin/env node
/**
 * sync-v2 — publish the sep-2026 designs as the site's pages.
 *
 * `sep-2026/` is the read-only source of truth (a Claude Design export).
 * This script derives the served copy into `public/designs/`:
 *
 *   public/designs/_shared/...        design system, support.js, logos (one copy)
 *   public/designs/<slug>/index.html  standalone page, refs rewritten absolute
 *   public/designs/<slug>/body.html   the same minus its nav, for the route
 *
 * The export ships the design system, support.js and the logo assets
 * duplicated inside every page folder. Those copies are byte-identical, so we
 * publish one shared copy — and assert the identity, so a future re-import that
 * diverges fails loudly here instead of silently serving the wrong bundle.
 *
 * Run: npm run sync:v2
 */

import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "sep-2026");
const OUT = join(ROOT, "public", "designs");
const SHARED_URL = "/designs/_shared";

/**
 * The 8 unique pages in the export.
 *
 * `Know Risk/` and `Risk Intelligence/` are byte-identical subsets of
 * `Control Risk/`, so every page they hold is published from `Control Risk/`.
 * Nothing is lost — the duplicate folders contain no unique file.
 */
const PAGES = [
  // `path` is the route the page is served at; `slug` is only where its build
  // output lands. They differ for the homepage, and for the two pages the
  // rebrand renamed.
  //
  // `assetDirs` are trees the HTML never names in a src/href literal because
  // the paths are produced at runtime by a template binding. Nothing would
  // claim them, so they are copied wholesale and the page resolves them
  // against the asset base injected below.
  {
    slug: "home",
    path: "/",
    dir: "Homepage",
    file: "Homepage.dc.html",
    assetDirs: ["logos/customers"],
  },
  { slug: "pricing", path: "/pricing", dir: "Pricing", file: "Pricing.dc.html" },
  { slug: "prove", path: "/prove", dir: "Prove Risk", file: "Prove Your AI.dc.html" },
  { slug: "control", path: "/control", dir: "Control Risk", file: "Control.dc.html" },
  { slug: "monitor", path: "/monitor", dir: "Control Risk", file: "Monitor v3.dc.html" },
  {
    slug: "intelligence",
    path: "/intelligence",
    dir: "Control Risk",
    file: "Risk Intelligence.dc.html",
  },
];

const NOINDEX = '<meta name="robots" content="noindex, nofollow">';
const EXTERNAL = /^(#|[a-z][a-z0-9+.-]*:|\/\/|\/)/i;

/**
 * A ref holding a template binding is not a path — it is a hole the page fills
 * at runtime. Rewriting it would corrupt the binding, so these pass through
 * untouched and the page resolves the result against ASSET_BASE.
 */
const BINDING = /\{\{|\}\}/;
const ASSET_BASE = `<meta name="v2-asset-base" content="${SHARED_URL}/">`;

const sha = (buf) => createHash("sha256").update(buf).digest("hex");
const warnings = [];
const componentCounts = new Map();

/** slug lookup for cross-page links, keyed by "<source dir>::<filename>" */
const slugByFile = new Map(PAGES.map((p) => [`${p.dir}::${p.file}`, p.path]));

/** relative path (as written in the HTML) -> the source dir we first copied it from */
const sharedOrigin = new Map();

/**
 * Copy a page-relative asset into the shared tree, asserting that every page
 * claiming the same path ships byte-identical content.
 */
function claimShared(relPath, pageDir) {
  const from = join(SRC, pageDir, relPath);
  const to = join(OUT, "_shared", relPath);

  if (!existsSync(from)) {
    warnings.push(`missing source asset: ${pageDir}/${relPath}`);
    return;
  }

  const prev = sharedOrigin.get(relPath);
  if (prev) {
    if (sha(readFileSync(from)) !== sha(readFileSync(join(SRC, prev, relPath)))) {
      throw new Error(
        `Shared asset diverged: "${relPath}" differs between "${prev}" and "${pageDir}".\n` +
          `The export's per-folder copies are no longer identical, so they can no longer ` +
          `be served from one shared path. Give this asset a per-page path before re-running.`
      );
    }
    return;
  }

  sharedOrigin.set(relPath, pageDir);
  mkdirSync(dirname(to), { recursive: true });
  // _ds/ is a tree: styles.css @imports ./colors_and_type.css as a sibling, so
  // copy the whole directory rather than only the files the HTML names.
  const dsRoot = relPath.match(/^_ds\/[^/]+/)?.[0];
  if (dsRoot) {
    cpSync(join(SRC, pageDir, dsRoot), join(OUT, "_shared", dsRoot), { recursive: true });
  } else {
    cpSync(from, to);
  }
}

/** Map one relative ref from the export onto its served URL. */
function rewriteRef(ref, page) {
  if (EXTERNAL.test(ref) || BINDING.test(ref)) return null;

  const clean = decodeURIComponent(ref.replace(/^\.\//, "")).split("#")[0].split("?")[0];
  if (!clean) return null;

  if (clean.endsWith(".dc.html")) {
    const target = slugByFile.get(`${page.dir}::${clean}`);
    if (!target) {
      warnings.push(`unmapped page link in ${page.slug}: "${ref}" — left as-is`);
      return null;
    }
    return target;
  }

  claimShared(clean, page.dir);
  return posix.join(SHARED_URL, clean.split("/").map(encodeURIComponent).join("/"));
}

/**
 * Assemble `<!-- @component <id> -->` slots from a page's components/ folder.
 *
 * The homepage is authored as one file per component plus a components.json
 * manifest that carries the order, the tone each component wants, and any
 * group it belongs to. This wraps each component in its stage element so the
 * markup files stay pure content — no scroll plumbing bleeding into them.
 */
function assembleComponents(html, page) {
  const dir = join(SRC, page.dir, "components");
  const manifestPath = join(dir, "components.json");
  if (!existsSync(manifestPath)) return { html, count: 0 };

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const byId = new Map(manifest.map((c) => [c.id, c]));
  const used = new Set();

  html = html.replace(/^[ \t]*<!--\s*@component\s+([\w-]+)\s*-->[ \t]*$/gm, (whole, id) => {
    const c = byId.get(id);
    if (!c) {
      warnings.push(`${page.slug}: no manifest entry for component "${id}"`);
      return whole;
    }
    const file = join(dir, c.file);
    if (!existsSync(file)) {
      warnings.push(`${page.slug}: missing component file ${c.file}`);
      return whole;
    }
    used.add(id);
    const tone = c.tone || "light";
    // A component only fades where the tone changes, since that is the only
    // place the page has something to hand over. `fadeOut` / `fadeIn` opt a
    // component into fading at a boundary its neighbour shares a tone with.
    const attrs = [
      `data-stage="${c.id}"`,
      `data-tone="${tone}"`,
      c.group ? `data-group="${c.group}"` : null,
      c.pin ? "data-pin" : null,
      c.fadeOut ? "data-fade-out" : null,
      c.fadeIn ? "data-fade-in" : null,
    ]
      .filter(Boolean)
      .join(" ");
    // Components are transparent by default: the page as a whole owns the
    // background and crossfades between tones across a boundary (see
    // scroll-stage.js), and a component painting its own tone would cut a hard
    // edge through that fade.
    //
    // `background` opts one out of that entirely — it paints itself and leaves
    // the page alone. Such a component keeps its neighbours' `tone`, so no
    // handover is triggered at either of its edges and it never fades.
    const style =
      `display:flex; flex-direction:column;` +
      (c.background ? ` background:${c.background};` : "");
    return (
      `  <div ${attrs} style="${style}">\n` +
      readFileSync(file, "utf8").replace(/\s*$/, "") +
      `\n  </div>`
    );
  });

  for (const c of manifest) {
    if (!used.has(c.id)) warnings.push(`${page.slug}: component "${c.id}" has no slot`);
  }
  return { html, count: used.size };
}

/**
 * Remove the design's own top navigation.
 *
 * The pages do not agree on what to call it: the homepage uses <nav>, most of
 * the others <header>, and one just a <div>. What they share is a sticky
 * 56px bar at the top, so that is matched too — narrowly enough not to catch
 * the pinned panels, which are sticky but a full viewport tall.
 *
 * The element is closed by depth rather than by the next closing tag, so
 * nested markup inside it is not miscounted.
 */
function stripDesignNav(html) {
  const candidates = [
    { re: /<nav\b/i, tag: "nav" },
    { re: /<header\b/i, tag: "header" },
    { re: /<div\b[^>]*position:\s*sticky[^>]*height:\s*56px[^>]*>/i, tag: "div" },
  ];

  let best = null;
  for (const c of candidates) {
    const at = html.search(c.re);
    if (at !== -1 && (!best || at < best.at)) best = { at, tag: c.tag };
  }
  if (!best) return html;

  const tag = new RegExp(`<${best.tag}\\b|</${best.tag}>`, "gi");
  tag.lastIndex = best.at;
  let depth = 0;
  let m;
  while ((m = tag.exec(html))) {
    depth += m[0][1] === "/" ? -1 : 1;
    if (depth === 0) {
      return html.slice(0, best.at) + html.slice(m.index + m[0].length);
    }
  }
  return html;
}

function buildPage(page) {
  const src = join(SRC, page.dir, page.file);
  if (!existsSync(src)) throw new Error(`Page not found: ${page.dir}/${page.file}`);

  let html = readFileSync(src, "utf8");
  let rewritten = 0;

  const assembled = assembleComponents(html, page);
  html = assembled.html;

  for (const dir of page.assetDirs ?? []) {
    const from = join(SRC, page.dir, dir);
    if (!existsSync(from)) {
      warnings.push(`missing assetDir: ${page.dir}/${dir}`);
      continue;
    }
    if (!sharedOrigin.has(dir)) {
      sharedOrigin.set(dir, page.dir);
      cpSync(from, join(OUT, "_shared", dir), { recursive: true });
    }
  }

  html = html.replace(/(\b(?:src|href)=")([^"]+)(")/g, (whole, pre, ref, post) => {
    const next = rewriteRef(ref, page);
    if (!next) return whole;
    rewritten++;
    return `${pre}${next}${post}`;
  });

  // Keep these previews out of search results even if /v2 reaches production,
  // and tell the page where its runtime-resolved assets were published.
  if (/<head[^>]*>/i.test(html)) {
    html = html.replace(/<head[^>]*>/i, (h) => `${h}\n  ${NOINDEX}\n  ${ASSET_BASE}`);
  } else {
    warnings.push(`no <head> in ${page.slug}; noindex not injected`);
  }

  const dest = join(OUT, page.slug, "index.html");
  if (assembled.count) componentCounts.set(page.slug, assembled.count);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, html);

  // Also emit the body on its own, for the page route to render
  // inside the real site chrome. The design's own <nav> is dropped there — the
  // v1 navbar takes its place. Everything else is kept verbatim, <helmet>
  // included, because support.js loads those assets itself once it boots.
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (body) writeFileSync(join(OUT, page.slug, "body.html"), stripDesignNav(body[1]));
  else warnings.push(`no <body> in ${page.slug}; body fragment not written`);
  return rewritten;
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

console.log(`sync-v2: sep-2026/ -> public/designs/\n`);
for (const page of PAGES) {
  const n = buildPage(page);
  console.log(`  ${page.path.padEnd(16)} <- ${page.dir}/${page.file}  (${n} refs rewritten)`);
}

for (const [slug, n] of componentCounts) console.log(`  ${" ".repeat(22)}   ${n} components assembled for /v2/${slug}`);
console.log(`\n  shared assets: ${sharedOrigin.size} path(s) under /designs/_shared/`);
if (warnings.length) {
  console.log(`\n  ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`    ! ${w}`);
}
console.log(`\nDone. ${PAGES.length} pages published.`);
