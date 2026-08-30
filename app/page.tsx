import type { Metadata } from "next";
import { DesignPage, designMetaOther } from "@/components/design/DesignPage";

export const metadata: Metadata = {
  // Root page keeps the layout's default title rather than templating it.
  description:
    "The Risk Network for AI. Continuously measure AI risk, build a verified risk reputation, reduce it with free controls, and insure what remains.",
  alternates: { canonical: "/" },
  other: designMetaOther,
};

export default function Page() {
  return <DesignPage slug="home" />;
}
