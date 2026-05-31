import type { Metadata } from "next";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  SOCIAL_LINKS,
  TWITTER_HANDLE,
  absoluteUrl,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";
import { FloatingApiBar } from "@/components/chrome/FloatingApiBar";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { ConsentSettingsDialog } from "@/components/consent/ConsentSettingsDialog";
import { GoogleAnalytics } from "@/components/consent/GoogleAnalytics";

import "./globals.css";
import "./styles/buttons.css";
import "./styles/navbar.css";
import "./styles/footer.css";
import "./styles/rtbar.css";
import "./styles/dialog.css";
import "./styles/pricing.css";
import "./styles/case-study.css";
import "./styles/platform.css";
import "./styles/trust.css";
import "./styles/company.css";
import "./styles/customers.css";
import "./styles/use-cases.css";
import "./styles/consent.css";
import "./styles/legal.css";
import "./styles/mobile-simplify.css";
import "./styles/sections/hero.css";
import "./styles/sections/logos.css";
import "./styles/sections/risk.css";
import "./styles/sections/pshift.css";
import "./styles/sections/rt.css";
import "./styles/sections/anet.css";
import "./styles/sections/oc.css";
import "./styles/sections/cs-flow.css";
import "./styles/sections/ipath.css";
import "./styles/sections/why.css";
import "./styles/sections/final.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s · Humanos",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/icon"),
  description: DEFAULT_DESCRIPTION,
  sameAs: SOCIAL_LINKS,
};

const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* suppressHydrationWarning silences the benign mismatch caused by
       browser extensions (e.g. ones that inject `extension-installed`
       attributes onto <html> before React hydrates). */
    <html lang="en" suppressHydrationWarning>
      <body>
        <JsonLd data={ORGANIZATION_LD} />
        <JsonLd data={WEBSITE_LD} />
        <ConsentProvider>
          <Navbar />
          {children}
          <FloatingApiBar />
          <Footer />
          <ConsentBanner />
          <ConsentSettingsDialog />
          <GoogleAnalytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
