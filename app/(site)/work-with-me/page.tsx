import type { Metadata } from "next";
import { ENGAGE } from "@/lib/content";
import { ProjectBrief } from "@/components/ProjectBrief";
import { Reveal } from "@/components/Reveal";
import { PageHeader, Section, SectionHead } from "@/components/Section";

export const metadata: Metadata = {
  title: "Working with me",
  description: ENGAGE.lede,
  alternates: { canonical: "/work-with-me" },
};

export default function WorkWithMe() {
  return (
    <>
      <PageHeader crumb={ENGAGE.title} title={ENGAGE.headline} lede={ENGAGE.lede} />

      <section className="px-6 pb-24 sm:px-10 md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ENGAGE.engagements.map((e, i) => (
            <Reveal key={e.title} delay={0.05 * i} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-line bg-raised p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{e.length}</p>
                <h2 className="mt-4 text-xl font-medium tracking-tight text-text">{e.title}</h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted">{e.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Section tone="surface">
        <SectionHead eyebrow="The process" title="Five steps, no surprises." />
        <ol className="relative grid gap-4 lg:grid-cols-5">
          <span aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block" />
          {ENGAGE.process.map((p, i) => (
            <li key={p.n} className="relative">
              <Reveal delay={0.06 * i}>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-line bg-raised font-serif text-lg italic text-accent">
                  {p.n}
                </span>
                <h3 className="mt-6 font-medium text-text">{p.title}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <SectionHead eyebrow="Questions" title="The usual ones." className="!mb-10" />
            <dl className="border-t border-line">
              {ENGAGE.faq.map((f) => (
                <div key={f.q} className="border-b border-line py-6">
                  <dt className="font-medium text-text">{f.q}</dt>
                  <dd className="mt-2 font-light leading-relaxed text-muted">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div id="brief" className="scroll-mt-28">
            <SectionHead eyebrow={ENGAGE.brief.title} title="A few lines is enough." lede={ENGAGE.brief.lede} className="!mb-10" />
            <ProjectBrief />
          </div>
        </div>
      </Section>
    </>
  );
}
