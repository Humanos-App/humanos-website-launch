import type { Metadata } from "next";
import { Hero } from "./_components/Hero";
import { About } from "./_components/About";
import { SelectivityCallout } from "./_components/SelectivityCallout";
import { Solution } from "./_components/Solution";
import { Implementation } from "./_components/Implementation";
import { Outcome } from "./_components/Outcome";
import { UseCases } from "./_components/UseCases";
import { Closing } from "./_components/Closing";
import { CaseStudyBreadcrumb } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute:
      "Verifying human authorization inside regulated AI workflows · DataWhisper × Humanos",
  },
  description:
    "DataWhisper's SmartInsights.CortexOS is integrating with Humanos so relevant legally consequential actions an AI agent takes are verified, and proved, before execution. Branded GuardianShield Consent inside CortexOS.",
  alternates: { canonical: "/case-studies/datawhisper" },
};

export default function DataWhisperCaseStudyPage() {
  return (
    <div className="cs-page">
      <CaseStudyBreadcrumb name="DataWhisper × Humanos" slug="datawhisper" />
      <Hero />
      <About />
      <SelectivityCallout />
      <Solution />
      <Implementation />
      <Outcome />
      <UseCases />
      <Closing />
    </div>
  );
}
