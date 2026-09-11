import type { Metadata } from "next";
import { DesignPage, designMetaOther } from "@/components/design/DesignPage";

export const metadata: Metadata = {
  title: "Prove your AI",
  description:
    "Give your AI a risk reputation — a continuously verified Risk Score you can use wherever trust matters.",
  alternates: { canonical: "/prove" },
  other: designMetaOther,
};

export default function Page() {
  return <DesignPage slug="prove" />;
}
