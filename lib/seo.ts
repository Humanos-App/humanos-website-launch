/**
 * Single source of truth for SEO-related constants.
 * Consumed by app/layout.tsx, app/sitemap.ts, app/robots.ts,
 * app/manifest.ts, the generated OG/icon routes, and the JSON-LD helpers.
 */

export const SITE_URL = "https://humanos.tech";

export const SITE_NAME = "Humanos";

export const DEFAULT_TITLE =
  "Humanos — Authorization infrastructure for the agentic economy";

export const DEFAULT_DESCRIPTION =
  "Portable Authorization & Runtime Verification for AI. Every authorized action becomes independently verifiable.";

/** Brand palette (mirrors public/assets/colors_and_type.css). */
export const BRAND = {
  authority: "#111111", // ink / primary surface
  clarity: "#F4F3EF", // page base
  verification: "#4B49CA", // indigo — verified
  chalk: "#F4F3EF", // text on authority
} as const;

/**
 * Every public, indexable route. Drives the sitemap so it can't drift
 * from the actual pages. Keep in sync when adding/removing routes.
 */
export const ROUTES: string[] = [
  "/",
  "/platform",
  "/use-cases",
  "/case-studies",
  "/case-studies/numo",
  "/case-studies/ralio",
  "/case-studies/lusiadas",
  "/case-studies/paymove",
  "/case-studies/datawhisper",
  "/company",
  "/trust",
  "/pricing",
  "/legal/cookies",
];

/** Absolute URL for a path on the canonical origin. */
export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
