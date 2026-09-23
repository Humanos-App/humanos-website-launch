import type { Metadata } from "next";
import { DesignPage, designMetaOther } from "@/components/design/DesignPage";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Measure and manage AI risk for free. Access the Risk Intelligence and financial products you need as your AI scales.",
  alternates: { canonical: "/pricing" },
  other: designMetaOther,
};

export default function Page() {
  return <DesignPage slug="pricing" />;
}
