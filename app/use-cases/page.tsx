import type { Metadata } from "next";
import { Hero } from "./_components/Hero";
import { Outcomes } from "./_components/Outcomes";
import { Industries } from "./_components/Industries";
import { HowItWorks } from "./_components/HowItWorks";
import { CaseStudies } from "./_components/CaseStudies";
import { FinalCta } from "./_components/FinalCta";

export const metadata: Metadata = {
  title: "Use cases",
  description:
    "What becomes possible when human authorization becomes machine-verifiable? Turn human approvals into authorization that systems, agents, partners and auditors can verify before execution.",
  alternates: { canonical: "/use-cases" },
};

export default function UseCasesPage() {
  return (
    <main className="uc-page">
      <Hero />
      <Outcomes />
      <Industries />
      <HowItWorks />
      <CaseStudies />
      <FinalCta />
    </main>
  );
}
