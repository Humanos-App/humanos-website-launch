import { Hero } from "@/components/sections/home/Hero";
import { Logos } from "@/components/sections/home/Logos";
import { Risk } from "@/components/sections/home/Risk";
import { Pshift } from "@/components/sections/home/Pshift";
import { Rt } from "@/components/sections/home/Rt";
import { Anet } from "@/components/sections/home/Anet";
import { Outcomes } from "@/components/sections/home/Outcomes";
import { Integrate } from "@/components/sections/home/Integrate";
import { Faq } from "@/components/sections/home/Faq";
import { Final } from "@/components/sections/home/Final";

export default function HomePage() {
  return (
    <main>
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
