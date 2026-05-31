"use client";

import Link from "next/link";
import { useConsent } from "./ConsentProvider";

/**
 * First-visit consent banner. Shows until the user accepts, declines,
 * or saves preferences via the settings dialog. After that, it's
 * permanently dismissed (reachable again via the footer "Cookie
 * settings" link, which opens the same settings dialog).
 */
export function ConsentBanner() {
  const { hydrated, state, acceptAll, declineAll } = useConsent();

  if (!hydrated) return null;
  if (state.decided) return null;

  return (
    <div
      className="consent"
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
    >
      <div className="consent__inner">
        <div className="consent__copy">
          <p id="consent-title" className="consent__title">
            Cookies on humanos.tech
          </p>
          <p className="consent__text">
            We use cookies essential to running this site and, with your
            permission, cookies to help us understand how it&rsquo;s used.{" "}
            <Link href="/legal/cookies" className="consent__link">
              Read our cookie policy
            </Link>
            .
          </p>
        </div>

        <div className="consent__actions">
          <button
            type="button"
            className="consent__btn consent__btn--secondary"
            onClick={declineAll}
          >
            Reject
          </button>
          <button
            type="button"
            className="consent__btn consent__btn--primary"
            onClick={acceptAll}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
