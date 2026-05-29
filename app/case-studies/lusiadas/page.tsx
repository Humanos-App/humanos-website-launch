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
    "One approval API across every clinical system · Humanos × Lusíadas",
  description:
    "Lusíadas runs human approvals through Humanos — consents, KYCs, signatures and prescriptions captured once and verified across Medify, Glintt, NewSoft, Pipedrive, internal systems and the patient mobile app. A global, independent approval OS for a multi-vendor healthcare ecosystem.",
};

export default function LusiadasCaseStudyPage() {
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
