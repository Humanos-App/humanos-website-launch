import type { Metadata } from "next";
import { DesignPage, designMetaOther } from "@/components/design/DesignPage";

export const metadata: Metadata = {
  title: "Control",
  description:
    "Control what AI can do. Verify identity, enforce authority, and prove every decision.",
  alternates: { canonical: "/control" },
  other: designMetaOther,
};

export default function Page() {
  return <DesignPage slug="control" />;
}
