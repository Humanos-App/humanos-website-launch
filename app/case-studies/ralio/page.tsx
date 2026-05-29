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

export const metadata: Metadata = {
  title:
    "Verifiable agent payments beyond closed banking APIs · Humanos × Ralio",
  description:
    "Ralio runs procurement and payment agents that source vendors, compare pricing, and execute purchases across external B2B marketplaces. Humanos verifies every transaction at the merchant boundary.",
};

export default function RalioCaseStudyPage() {
  return (
    <div className="cs-page">
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
