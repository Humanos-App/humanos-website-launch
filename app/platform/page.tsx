import type { Metadata } from "next";
import { Hero } from "./_components/Hero";
import { SectionNav } from "./_components/SectionNav";
import { Architecture } from "./_components/Architecture";
import {
  PortableAuthSection,
  RuntimeVerificationSection,
  RecoverySection,
  ReceiptsSection,
} from "./_components/SectionsCore";
import {
  CrossSystemSection,
  PolicySection,
  IdentitySection,
  RuntimeEnforcementSection,
} from "./_components/SectionsTrust";
import {
  IntegrationsSection,
  UseCasesSection,
  FinalSection,
} from "./_components/SectionsEnd";

export const metadata: Metadata = {
  title: "Humanos Platform — Portable authorization infrastructure",
  description:
    "Humanos turns approvals, permissions, enterprise policies, and delegated authority into machine-verifiable runtime authorization systems can verify before execution.",
};

export default function PlatformPage() {
  return (
    <div className="platform-page">
      <div className="grain" aria-hidden="true" />
      <Hero />
      <SectionNav />
      <Architecture />
      <PortableAuthSection />
      <CrossSystemSection />
      <RuntimeVerificationSection />
      <RecoverySection />
      <ReceiptsSection />
      <PolicySection />
      <IdentitySection />
      <RuntimeEnforcementSection />
      <IntegrationsSection />
      <UseCasesSection />
      <FinalSection />
    </div>
  );
}
