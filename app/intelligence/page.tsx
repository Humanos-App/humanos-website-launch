import type { Metadata } from "next";
import { DesignPage, designMetaOther } from "@/components/design/DesignPage";

export const metadata: Metadata = {
  title: "Risk Intelligence",
  description:
    "Get the risk answers you need — continuous, standardized, verifiable Risk Intelligence for insurers, auditors and compliance teams.",
  alternates: { canonical: "/intelligence" },
  other: designMetaOther,
};

export default function Page() {
  return <DesignPage slug="intelligence" />;
}
