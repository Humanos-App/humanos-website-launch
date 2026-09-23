import type { Metadata } from "next";
import { DesignPage, designMetaOther } from "@/components/design/DesignPage";

export const metadata: Metadata = {
  title: "Risk Intelligence",
  description:
    "Turn AI activity into continuous, standardized Risk Intelligence for companies, insurers, lenders and other risk takers.",
  alternates: { canonical: "/intelligence" },
  other: designMetaOther,
};

export default function Page() {
  return <DesignPage slug="intelligence" />;
}
