import type { Metadata } from "next";
import { DesignPage, designMetaOther } from "@/components/design/DesignPage";

export const metadata: Metadata = {
  title: {
    absolute: "Humanos | The Risk Network for AI",
  },
  description:
    "Humanos helps companies measure AI agent risk, prove safety and unlock financial products such as insurance and credit through continuous Risk Intelligence.",
  alternates: { canonical: "/" },
  other: designMetaOther,
};

export default function Page() {
  return <DesignPage slug="home" />;
}
