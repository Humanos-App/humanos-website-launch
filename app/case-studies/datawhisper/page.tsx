import type { Metadata } from "next";
import { Hero } from "./_components/Hero";
import { About } from "./_components/About";
import { Problem } from "./_components/Problem";
import { Solution } from "./_components/Solution";
import { Implementation } from "./_components/Implementation";
import { Outcome } from "./_components/Outcome";
import { SystemFlow } from "./_components/SystemFlow";
import { BuildVs } from "./_components/BuildVs";
import { NetworkEffect } from "./_components/NetworkEffect";
import { UseCases } from "./_components/UseCases";
import { Model } from "./_components/Model";
import { Category } from "./_components/Category";
import { CaseStudyBreadcrumb } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute:
      "Verifying every high-risk AI action inside regulated workflows · Humanos × DataWhisper",
  },
  description:
    "DataWhisper Cortex orchestrates multi-agent AI for regulated industries. Humanos plugs into GUARDIANSHIELD GOVERNANCE as the authorization stack — verifying every high-risk action before execution, with portable independently verifiable proof afterwards.",
  alternates: { canonical: "/case-studies/datawhisper" },
};

export default function DataWhisperCaseStudyPage() {
  return (
    <div className="cs-page">
      <CaseStudyBreadcrumb name="Humanos × DataWhisper" slug="datawhisper" />
      <Hero />
      <About />
      <Problem />
      <Solution />
      <Implementation />
      <Outcome />
      <SystemFlow />
      <BuildVs />
      <NetworkEffect />
      <UseCases />
      <Model />
      <Category />
    </div>
  );
}
