import type { Metadata } from "next";
import Link from "next/link";
import { EXTERNAL_LINKS } from "@/lib/external-links";
import { EventsGlobe } from "./EventsGlobe";

import "../styles/events.css";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Meet Humanos in person — visit the website, book time with the team, or follow along on X and LinkedIn.",
  /* QR-code link hub for event booths. Thin content by design, so it stays
     out of the index — and out of ROUTES/sitemap in lib/seo.ts. */
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

type Action = {
  label: string;
  href: string;
  external?: boolean;
};

const ACTIONS: Action[] = [
  { label: "Visit Website", href: "/" },
  { label: "Talk with us", href: EXTERNAL_LINKS.calendly, external: true },
  { label: "Follow X", href: EXTERNAL_LINKS.x, external: true },
  { label: "Follow LinkedIn", href: EXTERNAL_LINKS.linkedin, external: true },
];

export default function Page() {
  return (
    <main className="events">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo-wordmark-black.svg"
        alt="Humanos"
        className="events__logo"
        width={1523}
        height={382}
      />
      <nav className="events__actions" aria-label="Event links">
          {ACTIONS.map((a) =>
            a.external ? (
              <a
                key={a.label}
                className="events__btn"
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{a.label}</span>
                <span className="events__btn-glyph" aria-hidden="true">
                  →
                </span>
              </a>
            ) : (
              <Link key={a.label} className="events__btn" href={a.href}>
                <span>{a.label}</span>
                <span className="events__btn-glyph" aria-hidden="true">
                  →
                </span>
              </Link>
            )
          )}
      </nav>
      <EventsGlobe />
    </main>
  );
}
