import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { LatestBlueprints } from "@/components/LatestBlueprints";
import { Principles } from "@/components/Principles";
import { Help } from "@/components/Help";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <LatestBlueprints />
      <Principles />
      <Help />
    </>
  );
}
