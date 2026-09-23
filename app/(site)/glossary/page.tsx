import type { Metadata } from "next";
import { GLOSSARY } from "@/lib/glossary";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/Section";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Plain-language definitions of the AI terms used across this site — RAG, embeddings, PHI, quantization and more.",
  alternates: { canonical: "/glossary" },
};

export default function Glossary() {
  const entries = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
  const letters = [...new Set(entries.map((e) => e.term[0].toUpperCase()))];

  return (
    <>
      <PageHeader
        crumb="Glossary"
        title="AI terms, in plain language."
        lede="Short definitions of the words this site uses. If you're new to the field, start here; if you're not, skip ahead."
      />
      <section className="px-6 pb-24 sm:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Jump to letter" className="flex flex-wrap gap-2">
            {letters.map((l) => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line font-mono text-xs text-muted transition-colors hover:border-text hover:text-text"
              >
                {l}
              </a>
            ))}
          </nav>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {entries.map((e, i) => {
              const first = i === 0 || entries[i - 1].term[0].toUpperCase() !== e.term[0].toUpperCase();
              return (
                <Reveal key={e.id} delay={0.02 * (i % 4)}>
                  {first && <span id={`letter-${e.term[0].toUpperCase()}`} className="block scroll-mt-28" />}
                  <dl
                    id={e.id}
                    className="h-full scroll-mt-28 rounded-2xl border border-line bg-raised p-6 target:border-accent"
                  >
                    <dt className="text-lg font-medium tracking-tight text-text">{e.term}</dt>
                    <dd className="mt-2 font-light leading-relaxed text-muted">{e.short}</dd>
                    {e.more && <dd className="mt-2 text-sm font-light leading-relaxed text-faint">{e.more}</dd>}
                  </dl>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
