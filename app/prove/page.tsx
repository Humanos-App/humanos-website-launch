import type { Metadata } from "next";
import { DesignPage, designMetaOther } from "@/components/design/DesignPage";

export const metadata: Metadata = {
  title: "Prove your AI",
  description:
    "Build a persistent risk reputation for your AI with a continuously verified Risk Score based on how it actually operates.",
  alternates: { canonical: "/prove" },
  other: designMetaOther,
};

export default function Page() {
  return <DesignPage slug="prove" />;
}
