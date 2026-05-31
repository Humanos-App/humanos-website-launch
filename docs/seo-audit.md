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

## Re-audit — (pending, after deploy)
_To be filled after push + deploy._
