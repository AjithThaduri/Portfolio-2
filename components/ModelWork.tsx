import { MODEL } from "@/lib/content";
import { InferenceStackDiagram } from "./Diagrams";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

export const ModelWork = () => (
  <Section id="models" tone="ink" texture="rule" ghost="03">
    <SectionHead
      n="03"
      title="Model work"
      lede="Fine-tuning, quantization and self-hosted serving — the layer below the prompt, where the cost actually lives."
    />

    <div className="grid gap-10 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10">
      <Reveal>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint md:pt-2">
          Why
        </span>
      </Reveal>
      <div className="max-w-3xl space-y-6">
        {MODEL.story.map((para, i) => (
          <Reveal key={para.slice(0, 24)} delay={0.05 * i}>
            <p className="text-lg font-light leading-relaxed text-muted">{para}</p>
          </Reveal>
        ))}
      </div>
    </div>

    <Reveal delay={0.08}>
      <div className="mt-4 grid gap-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint md:pt-2">
          The stack
        </span>
        <div className="min-w-0">
          <InferenceStackDiagram />
        </div>
      </div>
    </Reveal>

    <div className="mt-8 grid gap-px border-t border-line bg-line sm:grid-cols-2">
      {MODEL.tracks.map((tr, i) => (
        <Reveal key={tr.n} delay={0.04 * i}>
          <article className="flex h-full flex-col bg-raised p-8 lg:p-10">
            <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
              {tr.n}
            </span>
            <h3 className="mt-5 text-2xl font-medium tracking-tight text-text">
              {tr.title}
            </h3>
            <p className="mt-3 font-light leading-relaxed text-muted">{tr.lede}</p>
            <ul className="mt-8 space-y-4 border-t border-line pt-6">
              {tr.items.map((it) => (
                <li
                  key={it}
                  className="flex gap-3 text-sm font-light leading-relaxed text-muted"
                >
                  <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-accent" />
                  {it}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </div>

    <Reveal delay={0.1}>
      <aside className="mt-12 border-l-2 border-accent bg-surface px-7 py-7">
        <p className="max-w-3xl text-lg font-light leading-relaxed text-text">
          {MODEL.note}
        </p>
      </aside>
    </Reveal>
  </Section>
);
