import type { Metadata } from "next";
import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";
import { FloatingApiBar } from "@/components/chrome/FloatingApiBar";

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
  title: "Humanos — Authorization infrastructure for the agentic economy",
  description:
    "Portable Authorization & Runtime Verification for AI. Every authorized action becomes independently verifiable.",
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
        <Navbar />
        {children}
        <FloatingApiBar />
        <Footer />
      </body>
    </html>
  );
}
