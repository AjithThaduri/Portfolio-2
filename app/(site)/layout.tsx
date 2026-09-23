import { Nav } from "@/components/Nav";
import { Contact, Footer } from "@/components/Contact";
import { CommandPalette, SearchItem } from "@/components/CommandPalette";
import { CAPABILITIES, FLAGSHIP, MORE_WORK, NAV } from "@/lib/content";
import { getBlueprintMetas, TYPE_LABEL } from "@/lib/blueprints";
import { GLOSSARY } from "@/lib/glossary";

/* Every page of the main site shares the nav, the search palette, the
   contact block and the footer. /vasuki sits outside this group. */

const searchIndex = (): SearchItem[] => [
  { title: "Home", href: "/", group: "Pages" },
  ...NAV.map((n) => ({ title: n.label, href: n.href, group: "Pages" })),
  { title: "Working with me", href: "/work-with-me", group: "Pages", hint: "Engagements, process, project brief" },
  { title: "Glossary", href: "/glossary", group: "Pages", hint: "AI terms in plain language" },
  { title: "Contact", href: "#contact", group: "Pages" },
  ...getBlueprintMetas().map((b) => ({
    title: b.title,
    href: `/blueprints/${b.slug}`,
    group: "Blueprints",
    hint: `${TYPE_LABEL[b.type]} · ${b.summary}`,
  })),
  ...FLAGSHIP.map((f) => ({ title: f.title, href: `/work/${f.slug}`, group: "Case studies", hint: f.plain })),
  ...CAPABILITIES.map((c) => ({ title: c.title, href: `/capabilities/${c.slug}`, group: "Capabilities", hint: c.plain })),
  ...MORE_WORK.filter((w) => w.status === "live").map((w) => ({
    title: w.title,
    href: "/work",
    group: "Projects",
    hint: `${w.sector} · ${w.tags.join(", ")}`,
  })),
  ...GLOSSARY.map((g) => ({ title: g.term, href: `/glossary#${g.id}`, group: "Glossary", hint: g.short })),
];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <CommandPalette items={searchIndex()} />
      <main id="main" className="bg-ink">
        {children}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
