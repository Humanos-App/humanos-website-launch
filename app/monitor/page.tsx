import type { Metadata } from "next";
import { DesignPage, designMetaOther } from "@/components/design/DesignPage";

export const metadata: Metadata = {
  title: "Monitor",
  description:
    "Know your AI risk, and prove it. A continuous Risk Score from how your agents actually operate.",
  alternates: { canonical: "/monitor" },
  other: designMetaOther,
};

export default function Page() {
  return <DesignPage slug="monitor" />;
}
