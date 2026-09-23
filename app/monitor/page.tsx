import type { Metadata } from "next";
import { DesignPage, designMetaOther } from "@/components/design/DesignPage";

export const metadata: Metadata = {
  title: "Monitor",
  description:
    "Know your AI risk and prove it with a continuous Risk Score based on how your AI agents actually operate.",
  alternates: { canonical: "/monitor" },
  other: designMetaOther,
};

export default function Page() {
  return <DesignPage slug="monitor" />;
}
