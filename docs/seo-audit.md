# SEO Audit — humanos.tech

Live target: `https://humanos.tech` · Canonical origin: `https://humanos.tech` (non-www)
Stack: Next.js 15.1.6 App Router on Vercel (auto-deploy on push to `main`).

## The 5 free checkers used

| # | Checker | How it's run |
|---|---------|--------------|
| 1 | Google PageSpeed Insights API | `GET …/pagespeedonline/v5/runPagespeed?url=…&category=seo&category=performance` (keyless) |
| 2 | Lighthouse CLI | `npx lighthouse <url> --only-categories=seo,accessibility,best-practices` |
| 3 | W3C Nu HTML Checker | `GET https://validator.w3.org/nu/?out=json&doc=<url>` |
| 4 | Custom on-page crawler | curl + regex over all 13 routes: title/desc/canonical/OG/Twitter/JSON-LD/h1/img-alt + robots/sitemap/manifest/favicon |
| 5 | Structured-data validation | Validate emitted JSON-LD (Organization/WebSite/FAQPage/BreadcrumbList) shapes |

---

## BASELINE — 2026-05-31 (before fixes)

### Checker 1 — PageSpeed Insights
- **Quota-blocked** at baseline (keyless global daily quota exhausted). Same Lighthouse engine covered by Checker 2. Will retry at re-audit.

### Checker 2 — Lighthouse CLI (homepage `/`)
- **SEO: 100** ✓ · Accessibility: **93** · Best-practices: **96**
- `[a11y] aria-hidden-focus` — `#nav-mobile` (`aria-hidden="true"`) contains focusable `<a>`/`<button>` descendants. **(fixable)**
- `[a11y] color-contrast` — muted text below 4.5:1 (≈7 nodes): `#76746d` (var `--hm-ink-3`) → 4.21–4.48, and `#8c8b89` (`.rt__stage-num`, var `--rt-ink-3`) → 3.26. **(design decision — hand-off)**
- `[best-practices] errors-in-console` — a `404` resource load (the missing `/favicon.ico`). **(fixed by adding favicon)**

### Checker 3 — W3C Nu HTML Checker (homepage `/`) — 6 errors
- ×5 `aria-label` on a plain `<div>` with no valid `role`: `.logos__marquee` ("Customers"), `.pshift__regs`, `.rt-timeline`, `.vchain-v`, `.vlinear`. **(fixable — add `role`)**
- ×1 `role="tab"` without a matching `role="tabpanel"`: `.oc__tab` (Outcomes/use-cases tabs). **(fixable)**
- Warnings (info): "Section/Article lacks heading"; "Trailing slash on void elements" (from SVG/minified output — low/ignorable).

### Checker 4 — Custom crawler (all 13 routes)
On-page essentials present everywhere: `title` ✓, meta `description` ✓, exactly one `h1` ✓, image `alt` coverage 100% (0 missing, 0 empty) ✓. Gaps:
- **canonical: MISSING on all 13 routes** **(fixable)**
- **Open Graph: MISSING on all 13** **(fixable)**
- **Twitter card: MISSING on all 13** **(fixable)**
- **JSON-LD: MISSING on all 13** **(fixable)**
- **`/robots.txt` → 404** **(fixable)**
- **`/sitemap.xml` → 404** **(fixable)**
- **`/manifest.webmanifest` → 404** **(fixable)**
- **`/favicon.ico` → 404** **(fixable)**
- `/pricing` and `/` inherit the root title+desc (no own `metadata` export) — `/pricing` SERP shows generic root copy. **(fixable)**
- `/legal/cookies` → **404 on live** (route exists only in the un-pushed working tree; will deploy on push).

### Checker 5 — Structured-data validation
- N/A at baseline — no JSON-LD exists yet. Validated after Phase 4.

---

## Status legend
`fixable` = code-only, done autonomously · `hand-off` = needs human input/decision

## Fixes applied (code-only) — 2026-05-31, verified locally on a production build

| Area | Fix | Files |
|------|-----|-------|
| Shared config | Single source of truth for URL/name/desc/routes/brand | `lib/seo.ts` |
| metadataBase + canonical | Absolute OG/canonical URLs; self-referential canonical on all 13 routes; `%s · Humanos` title template | `app/layout.tsx` + every `page.tsx` |
| Open Graph + Twitter | Default OG (`type/siteName/url/title/desc/image`) + `summary_large_image` | `app/layout.tsx` |
| Missing metadata | Added to `/` (title.absolute) and `/pricing` | `app/page.tsx`, `app/pricing/page.tsx` |
| Sitemap | `/sitemap.xml` generated from `ROUTES` | `app/sitemap.ts` |
| Robots | `/robots.txt` (allow all + sitemap + host) | `app/robots.ts` |
| Favicon / icons | Generated via `ImageResponse` (logo as divs) | `app/icon.tsx`, `app/apple-icon.tsx`, `components/seo/brand-mark.tsx` |
| OG image | Generated 1200×630 brand card | `app/opengraph-image.tsx` |
| Manifest | `/manifest.webmanifest` | `app/manifest.ts` |
| JSON-LD | Organization + WebSite (layout), FAQPage (home, 15 Q&A), BreadcrumbList (5 case studies) | `components/seo/JsonLd.tsx`, `app/layout.tsx`, `app/page.tsx`, case studies |
| W3C: aria-label on div ×5 | Added `role="group"` / `role="img"` | Logos, Pshift, Rt, Integrate |
| W3C: role=tab w/o tabpanel | Wired `aria-controls`/`id` + `role="tabpanel"` (article→div) | `components/sections/home/Outcomes.tsx` |
| a11y: aria-hidden-focus | `inert` on closed mobile nav | `components/chrome/Navbar.tsx` |
| best-practices: console 404 | Resolved by adding favicon | (icons above) |
| 404 page | Branded `not-found.tsx` (404 + noindex) | `app/not-found.tsx` |
| Docs | README filled in | `README.md` |

**Local verification (production build + `next start`):**
- W3C Nu validator on prod homepage: **0 errors** (was 6), 3 info warnings only.
- All 13 routes + `/robots.txt` `/sitemap.xml` `/manifest.webmanifest` `/icon` `/opengraph-image` → HTTP 200.
- 404 page → HTTP 404 + `<meta name="robots" content="noindex">`.
- JSON-LD parses; Organization/WebSite/FAQPage(15)/BreadcrumbList present.
- OG image renders the logo mark + headline + domain.

## Hand-off — items needing your input (after re-audit)
1. **Color contrast (a11y 93→100):** muted text `--hm-ink-3` (#76746d) and `.rt__stage-num` (#8c8b89) fall just under WCAG AA 4.5:1 (3.26–4.48). Darkening is a brand/design decision — not auto-applied.
2. **Google Search Console** verification token → `verification.google` in root metadata + submit sitemap.
3. **`sameAs` social URLs** (LinkedIn/X/GitHub) for Organization JSON-LD.
4. **Twitter handle** (`twitter.site`/`creator`).
5. Optional: bespoke designed OG image / multi-res favicon (generated versions ship now).

## Re-audit — 2026-05-31 (live, after deploy to www.humanos.tech)

> Note: the live site serves on **www.humanos.tech**; the apex `humanos.tech` 307-redirects to www. See critical hand-off item #1.

| Checker | Baseline | Re-audit | Δ |
|---------|----------|----------|---|
| Lighthouse — SEO | 100 | 92 → **100*** | *link-text fix pushed (commit 8c9a972), 100 after redeploy |
| Lighthouse — Accessibility | 93 | **97** | aria-hidden-focus fixed; color-contrast remains |
| Lighthouse — Best-practices | 96 | **100** | console 404 (favicon) resolved |
| W3C Nu HTML errors | 6 | **0** | all aria-label/role=tab errors fixed |
| Crawler — canonical/OG/Twitter/JSON-LD | MISSING on all 13 | **present on all 13** | ✓ |
| Crawler — robots/sitemap/manifest | 404 | **200** | ✓ |
| Crawler — /pricing metadata | inherited root | **own title+desc** | ✓ |
| Crawler — /legal/cookies | 404 | **200** | now deployed |
| Structured data | none | **Organization, WebSite, FAQPage(15), BreadcrumbList** — all valid | ✓ |
| PageSpeed Insights API | quota-blocked | quota-blocked | keyless daily quota; covered by Lighthouse engine |

**Fixed this round:** the `link-text` SEO regression ("Learn more" → "Read our cookie policy" in the cookie banner, `components/consent/ConsentBanner.tsx`) — pushed, restores SEO to 100 on next deploy.

### Fixed after the re-audit (round 2)
- **Color contrast → FIXED** (commit 61a9d92): `--hm-ink-3` and the rt stage-num now `#6B6A63` (≥4.89:1). Local Lighthouse accessibility = **100**, 0 contrast failures. Live after redeploy.

### Still open
1. **www vs non-www — YOUR ACTION (decided: keep non-www).** Code canonicals stay at `https://humanos.tech`. The apex currently redirects to `www`, so you'll flip Vercel's primary domain (Settings → Domains → make `humanos.tech` primary, `www` → redirect) so the canonical host matches the served host.
2. **`sameAs` social URLs** (LinkedIn/X/GitHub) for Organization JSON-LD — awaiting URLs from you.
3. **Twitter handle** for `twitter.site`/`twitter.creator` — awaiting @handle from you.
4. *(Deferred by you)* Google Search Console verification token.

### Score summary (live, will reflect fully after the pending redeploys)
| | Baseline | After fixes |
|---|---|---|
| Lighthouse SEO | 100 | 100 |
| Lighthouse Accessibility | 93 | 100 |
| Lighthouse Best-practices | 96 | 100 |
| W3C errors | 6 | 0 |
| Canonical/OG/Twitter/JSON-LD coverage | 0/13 | 13/13 |
| sitemap / robots / manifest | 404 | 200 |
