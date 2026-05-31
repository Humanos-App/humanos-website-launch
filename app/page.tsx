import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { Logos } from "@/components/sections/home/Logos";
import { Risk } from "@/components/sections/home/Risk";
import { Pshift } from "@/components/sections/home/Pshift";
import { Rt } from "@/components/sections/home/Rt";
import { Anet } from "@/components/sections/home/Anet";
import { Outcomes } from "@/components/sections/home/Outcomes";
import { Integrate } from "@/components/sections/home/Integrate";
import { Faq, FAQ_ITEMS } from "@/components/sections/home/Faq";
import { Final } from "@/components/sections/home/Final";
import { JsonLd } from "@/components/seo/JsonLd";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function HomePage() {
  return (
    <main>
      <JsonLd data={FAQ_LD} />
      <Hero />
      <Logos />
      <Risk />
      <Pshift />
      <Rt />
      <Anet />
      <Outcomes />
      <Integrate />
      <Faq />
      <Final />
    </main>
  );
}
