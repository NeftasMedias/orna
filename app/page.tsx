import type { Metadata } from "next";
import { site } from "@/config/site";
import { Hero } from "@/components/home/Hero";
import { NewIn } from "@/components/home/NewIn";
import { FabricTiles } from "@/components/home/FabricTiles";
import { TrustStrip } from "@/components/home/TrustStrip";
import { BrandStory } from "@/components/home/BrandStory";
import { LookOfTheWeek } from "@/components/home/LookOfTheWeek";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Sarees in Maheshwari silk and soft cotton` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewIn />
      <FabricTiles />
      <TrustStrip />
      <BrandStory />
      <LookOfTheWeek />
    </>
  );
}
