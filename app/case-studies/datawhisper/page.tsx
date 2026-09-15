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
      "Measuring AI risk inside regulated enterprise workflows · Humanos × DataWhisper",
  },
  description:
    "DataWhisper's SmartInsights.CortexOS integrates Humanos Risk Intelligence to measure, score and prove the risk of every AI agent action inside regulated enterprise workflows.",
  alternates: { canonical: "/case-studies/datawhisper" },
};

export default function DataWhisperCaseStudyPage() {
  return (
    <div className="cs-page">
      <CaseStudyBreadcrumb name="Humanos × DataWhisper" slug="datawhisper" />
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
