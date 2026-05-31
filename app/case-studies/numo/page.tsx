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
      "Verifying every agent-driven financial action before execution · Humanos × Numo",
  },
  description:
    "Numo runs autonomous strategies that reallocate capital continuously. Humanos verifies every action — identity, scope, amount, validity — before any capital moves.",
  alternates: { canonical: "/case-studies/numo" },
};

export default function NumoCaseStudyPage() {
  return (
    <div className="cs-page">
      <CaseStudyBreadcrumb name="Humanos × Numo" slug="numo" />
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
