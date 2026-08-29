#!/usr/bin/env node
/**
 * sync-v2 — publish the sep-2026 rebrand designs at /v2/<slug>.
 *
 * `sep-2026/` is the read-only source of truth (a Claude Design export).
 * This script derives the *served* copy into `public/v2/`:
 *
 *   public/v2/_shared/...        design system, support.js, logos (one copy)
 *   public/v2/<slug>/index.html  the page, with refs rewritten to absolute
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
const OUT = join(ROOT, "public", "v2");
const SHARED_URL = "/v2/_shared";

/**
 * The 8 unique pages in the export.
 *
 * `Know Risk/` and `Risk Intelligence/` are byte-identical subsets of
 * `Control Risk/`, so every page they hold is published from `Control Risk/`.
 * Nothing is lost — the duplicate folders contain no unique file.
 */
const PAGES = [
  { slug: "homepage", dir: "Homepage", file: "Homepage.dc.html" },
  { slug: "pricing", dir: "Pricing", file: "Pricing.dc.html" },
  { slug: "prove", dir: "Prove Risk", file: "Prove Your AI.dc.html" },
  { slug: "control", dir: "Control Risk", file: "Control.dc.html" },
  { slug: "monitor", dir: "Control Risk", file: "Monitor.dc.html" },
  { slug: "monitor-v2", dir: "Control Risk", file: "Monitor v2.dc.html" },
  { slug: "monitor-v3", dir: "Control Risk", file: "Monitor v3.dc.html" },
  { slug: "risk-intelligence", dir: "Control Risk", file: "Risk Intelligence.dc.html" },
];

const NOINDEX = '<meta name="robots" content="noindex, nofollow">';
const EXTERNAL = /^(#|[a-z][a-z0-9+.-]*:|\/\/|\/)/i;

const sha = (buf) => createHash("sha256").update(buf).digest("hex");
const warnings = [];

/** slug lookup for cross-page links, keyed by "<source dir>::<filename>" */
const slugByFile = new Map(PAGES.map((p) => [`${p.dir}::${p.file}`, p.slug]));

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
  if (EXTERNAL.test(ref)) return null;

  const clean = decodeURIComponent(ref.replace(/^\.\//, "")).split("#")[0].split("?")[0];
  if (!clean) return null;

  if (clean.endsWith(".dc.html")) {
    const slug = slugByFile.get(`${page.dir}::${clean}`);
    if (!slug) {
      warnings.push(`unmapped page link in ${page.slug}: "${ref}" — left as-is`);
      return null;
    }
    return `/v2/${slug}`;
  }

  claimShared(clean, page.dir);
  return posix.join(SHARED_URL, clean.split("/").map(encodeURIComponent).join("/"));
}

function buildPage(page) {
  const src = join(SRC, page.dir, page.file);
  if (!existsSync(src)) throw new Error(`Page not found: ${page.dir}/${page.file}`);

  let html = readFileSync(src, "utf8");
  let rewritten = 0;

  html = html.replace(/(\b(?:src|href)=")([^"]+)(")/g, (whole, pre, ref, post) => {
    const next = rewriteRef(ref, page);
    if (!next) return whole;
    rewritten++;
    return `${pre}${next}${post}`;
  });

  // Keep these previews out of search results even if /v2 reaches production.
  if (/<head[^>]*>/i.test(html)) {
    html = html.replace(/<head[^>]*>/i, (h) => `${h}\n  ${NOINDEX}`);
  } else {
    warnings.push(`no <head> in ${page.slug}; noindex not injected`);
  }

  const dest = join(OUT, page.slug, "index.html");
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, html);
  return rewritten;
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

console.log(`sync-v2: sep-2026/ -> public/v2/\n`);
for (const page of PAGES) {
  const n = buildPage(page);
  console.log(`  /v2/${page.slug.padEnd(18)} <- ${page.dir}/${page.file}  (${n} refs rewritten)`);
}

console.log(`\n  shared assets: ${sharedOrigin.size} path(s) under /v2/_shared/`);
if (warnings.length) {
  console.log(`\n  ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`    ! ${w}`);
}
console.log(`\nDone. ${PAGES.length} pages published.`);
