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
      "AI risk scoring for agent payments on the Visa rail · Humanos × Paymove",
  },
  description:
    "Paymove is the settlement layer for agentic commerce on Visa's protocol. Humanos provides continuous risk scoring and Risk Intelligence for every agent-initiated payment before it settles.",
  alternates: { canonical: "/case-studies/paymove" },
};

export default function PaymoveCaseStudyPage() {
  return (
    <div className="cs-page">
      <CaseStudyBreadcrumb name="Humanos × Paymove" slug="paymove" />
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
