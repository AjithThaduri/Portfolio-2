import { PRINCIPLES } from "@/lib/content";
import { PipelineCanvas } from "./PipelineCanvas";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

const legendColours = ["var(--accent-vivid)", "var(--flag)", "var(--teal)"];

export const Principles = () => (
  <Section id="approach" className="border-t border-line">
    <SectionHead eyebrow={PRINCIPLES.title} title={PRINCIPLES.headline} lede={PRINCIPLES.lede} />

    {/* The live illustration: messy input, one checkpoint, structured output. */}
    <Reveal>
      <figure>
        <div className="relative h-[280px] overflow-hidden rounded-3xl border border-line sm:h-[340px]">
          <PipelineCanvas />
          <ul className="pointer-events-none absolute left-5 top-5 flex flex-wrap gap-2 sm:left-6 sm:top-6">
            {PRINCIPLES.figure.legend.map((l, i) => (
              <li
                key={l}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted backdrop-blur-md"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: legendColours[i], boxShadow: `0 0 8px ${legendColours[i]}` }}
                />
                {l}
              </li>
            ))}
          </ul>
        </div>
        <figcaption className="mt-5 max-w-2xl text-sm leading-relaxed text-faint">
          {PRINCIPLES.figure.caption}
        </figcaption>
      </figure>
    </Reveal>

    <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {PRINCIPLES.items.map((p, i) => (
        <Reveal key={p.n} delay={0.06 * i}>
          <article className="border-t border-line pt-6">
            <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{p.n}</span>
            <h3 className="mt-4 text-lg font-medium tracking-tight text-text">{p.title}</h3>
            <p className="mt-3 text-[0.95rem] font-light leading-relaxed text-muted">{p.body}</p>
          </article>
        </Reveal>
      ))}
    </div>
  </Section>
);
