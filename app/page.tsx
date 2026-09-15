import type { Metadata } from "next";
import { DEFAULT_DESCRIPTION } from "@/lib/seo";
import { DesignPage, designMetaOther } from "@/components/design/DesignPage";

export const metadata: Metadata = {
  title: {
    absolute: "Humanos | The Risk Network for AI",
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  other: designMetaOther,
};

export default function Page() {
  return <DesignPage slug="home" />;
}
