import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Thesis } from "@/components/Thesis";
import { Work } from "@/components/Work";
import { ModelWork } from "@/components/ModelWork";
import { Practice } from "@/components/Practice";
import { Teaching } from "@/components/Teaching";
import { Stack } from "@/components/Stack";
import { Faq } from "@/components/Faq";
import { Contact, Footer } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-ink">
        <Hero />
        <Ticker />
        <Thesis />
        <Work />
        <ModelWork />
        <Practice />
        <Teaching />
        <Stack />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
