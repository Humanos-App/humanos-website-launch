import type { Metadata } from "next";
import { DesignPage, designMetaOther } from "@/components/design/DesignPage";

export const metadata: Metadata = {
  title: "Control",
  description:
    "Control what AI can do. Set enforceable rules, require human approval when needed, and create verifiable evidence of how every agent operates.",
  alternates: { canonical: "/control" },
  other: designMetaOther,
};

export default function Page() {
  return <DesignPage slug="control" />;
}
