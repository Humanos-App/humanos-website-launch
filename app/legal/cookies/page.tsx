import type { Metadata } from "next";
import { ConsentSettingsLink } from "@/components/consent/ConsentSettingsLink";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "Short, honest cookie policy. Two categories: essential (always on) and analytics (opt-in, off by default). No advertising or cross-site tracking.",
  alternates: { canonical: "/legal/cookies" },
};

const LAST_UPDATED = "2026-05-31";

export default function CookiesPage() {
  return (
    <main className="legal">
      <div className="wrap">
        <div className="legal__inner">
          <p className="legal__eyebrow">Cookies · last updated {LAST_UPDATED}</p>
          <h1 className="legal__title">Cookie policy</h1>

          <p className="legal__lede">
            humanos.tech uses two categories of cookies and similar storage:{" "}
            <strong>essential</strong> (always on, needed to run the site)
            and <strong>analytics</strong> (opt-in, off by default). No
            advertising, no marketing pixels, no cross-site tracking.
          </p>

          <p>
            You can change your choice any time:{" "}
            <ConsentSettingsLink className="legal__link consent-inline">
              Open cookie settings
            </ConsentSettingsLink>
            .
          </p>

          <h2 className="legal__h2">Essential</h2>
          <p>
            These are needed to make the site function — for example,
            remembering that you&rsquo;ve made a cookie choice so we
            don&rsquo;t re-prompt you every page. They never leave your
            device and contain no personal data.
          </p>

          <h2 className="legal__h2">Analytics (opt-in)</h2>
          <p>
            If you accept analytics, we use a privacy-respecting analytics
            tool to help us understand which pages people read. Visitors are
            measured in aggregate. We do not build advertising profiles,
            share data with advertisers, or sell it to data brokers.
          </p>

          <h2 className="legal__h2">What we don&rsquo;t do</h2>
          <ul className="legal__list">
            <li>No advertising or remarketing pixels.</li>
            <li>No cross-site tracking, no fingerprinting.</li>
            <li>No third-party embeds that set cookies on first load.</li>
            <li>No data sale to advertisers or data brokers.</li>
          </ul>

          <h2 className="legal__h2">Changing or withdrawing consent</h2>
          <p>
            Use the{" "}
            <ConsentSettingsLink className="legal__link consent-inline">
              cookie settings
            </ConsentSettingsLink>{" "}
            link (also in the page footer) to accept or reject analytics
            any time. When you reject, further analytics events stop firing
            on this device immediately.
          </p>

          <h2 className="legal__h2">Contact</h2>
          <p>
            Questions about cookies, privacy, or what we do with your data?
            Email{" "}
            <a className="legal__link" href="mailto:pedro@humanos.tech">
              pedro@humanos.tech
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
