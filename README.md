# Humanos website

Marketing site for [humanos.tech](https://humanos.tech) — authorization infrastructure for the agentic economy.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19
- TypeScript
- Plain CSS (design tokens in `public/assets/colors_and_type.css`)
- Deployed on [Vercel](https://vercel.com/) — auto-deploys on push to `main`

## Local development

```bash
npm install
npm run dev      # start the dev server on http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check |

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `MAILERSEND_API_KEY`, `MAILERSEND_FROM_EMAIL`, `MAILERSEND_FROM_NAME` — transactional email (contact form)
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID (analytics are consent-gated)

Add the same variables in Vercel (Project → Settings → Environment Variables) for production.

## SEO

Metadata, canonical URLs, Open Graph/Twitter cards, JSON-LD, the sitemap and robots
rules are centralized in `lib/seo.ts`. The sitemap (`app/sitemap.ts`), robots
(`app/robots.ts`), icons (`app/icon.tsx`, `app/apple-icon.tsx`), OG image
(`app/opengraph-image.tsx`) and manifest (`app/manifest.ts`) are generated from there.
See `docs/seo-audit.md` for the audit baseline and checker setup.
