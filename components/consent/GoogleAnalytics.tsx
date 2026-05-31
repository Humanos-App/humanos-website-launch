"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useConsent } from "./ConsentProvider";

/**
 * Loads Google Analytics (gtag.js) only after the user has granted
 * analytics consent. Reads the measurement ID from
 * `NEXT_PUBLIC_GA_ID` (e.g. `G-XXXXXXXXXX`).
 *
 * - No script tags render when analytics is denied → zero tracking.
 * - On revocation, sets Google's documented kill-switch flag
 *   (`window['ga-disable-{ID}'] = true`) so any in-flight events stop
 *   firing without a page reload.
 * - `anonymize_ip: true` is set so IP addresses are not stored in
 *   full — required practice under GDPR.
 */

/* Measurement ID for humanos.tech. GA IDs are public by design (the
   gtag.js snippet exposes them in every loaded page), so hardcoding
   the default is fine. The env var still wins if set — useful for
   swapping properties per environment (e.g. a staging GA property). */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-VEF4WQC17J";

export function GoogleAnalytics() {
  const { hydrated, state } = useConsent();
  const allowed = state.categories.analytics;

  /* When the user revokes consent after GA already loaded, flip the
     documented kill-switch so further events are dropped client-side.
     The previously-injected scripts can't be unloaded, but this stops
     them from sending pings. */
  useEffect(() => {
    if (!GA_ID) return;
    if (typeof window === "undefined") return;
    const key = `ga-disable-${GA_ID}` as const;
    (window as unknown as Record<string, unknown>)[key] = !allowed;
  }, [allowed]);

  if (!GA_ID) return null;
  if (!hydrated) return null;
  if (!allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
