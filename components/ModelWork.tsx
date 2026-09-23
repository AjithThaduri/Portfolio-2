import { MODEL } from "@/lib/content";
import { InferenceStackDiagram } from "./Diagrams";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

export const ModelWork = () => (
  <Section id="models" tone="surface">
    <SectionHead eyebrow={MODEL.title} title={MODEL.lede} />

    <div className="grid gap-6 md:grid-cols-2 md:gap-12">
      {MODEL.story.map((para, i) => (
        <Reveal key={para.slice(0, 24)} delay={0.05 * i}>
          <p className="text-pretty text-lg font-light leading-relaxed text-muted">{para}</p>
        </Reveal>
      ))}
    </div>

    <Reveal delay={0.08}>
      <div className="mt-14">
        <InferenceStackDiagram />
      </div>
    </Reveal>

    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {MODEL.tracks.map((tr, i) => (
        <Reveal key={tr.n} delay={0.04 * i} className="h-full">
          <article className="flex h-full flex-col rounded-3xl border border-line bg-raised p-8 lg:p-10">
            <span className="font-serif text-3xl italic leading-none text-accent/80">{tr.n}</span>
            <h3 className="mt-6 text-2xl font-medium tracking-tight text-text">{tr.title}</h3>
            <p className="mt-3 font-light leading-relaxed text-muted">{tr.lede}</p>
            <ul className="mt-8 space-y-3 border-t border-line pt-6">
              {tr.items.map((it) => (
                <li key={it} className="flex gap-3 text-sm font-light leading-relaxed text-muted">
                  <span aria-hidden className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent-vivid" />
                  {it}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </div>

    <Reveal delay={0.1}>
      <aside className="mt-6 rounded-3xl border-l-2 border-accent-vivid bg-ink px-8 py-8">
        <p className="max-w-3xl text-balance font-serif text-2xl italic leading-snug text-text">
          {MODEL.note}
        </p>
      </aside>
    </Reveal>
  </Section>
);
