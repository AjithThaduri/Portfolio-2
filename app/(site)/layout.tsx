import { Nav } from "@/components/Nav";
import { Contact, Footer } from "@/components/Contact";

/* Every page of the main site shares the nav, the contact block and the
   footer. /vasuki sits outside this group and has none of them. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main" className="bg-ink">
        {children}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
