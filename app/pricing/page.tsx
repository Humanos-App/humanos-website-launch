import type { Metadata } from "next";
import { DesignPage, designMetaOther } from "@/components/design/DesignPage";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Manage AI risk for free. Buy the Risk Intelligence you need. Insure what remains.",
  alternates: { canonical: "/pricing" },
  other: designMetaOther,
};

export default function Page() {
  return <DesignPage slug="pricing" />;
}
