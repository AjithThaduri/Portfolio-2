import { TEACHING } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

export const TeachingStats = () => (
  <Reveal delay={0.18}>
    <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
      {TEACHING.stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse bg-ink px-7 py-8">
          <dt className="mt-4 text-sm text-faint">{s.label}</dt>
          <dd className="text-5xl font-light leading-none tracking-tight text-text md:text-6xl">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  </Reveal>
);

export const Programmes = () => (
  <Section id="programmes" tone="surface">
    <SectionHead eyebrow="Programmes" title="Recent teaching work." />
    <div className="grid gap-5 md:grid-cols-2">
      {TEACHING.programmes.map((p, i) => (
        <Reveal key={p.title} delay={0.06 * i} className="h-full">
          <article className="flex h-full flex-col rounded-3xl border border-line bg-raised p-8 lg:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{p.sector}</p>
            <h3 className="mt-5 text-2xl font-medium tracking-tight text-text">{p.title}</h3>
            <p className="mt-4 flex-1 font-light leading-relaxed text-muted">{p.body}</p>
            <ul className="mt-8 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <li key={t} className="rounded-full bg-surface px-2.5 py-1 font-mono text-[10px] text-faint">
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </div>
  </Section>
);

export const Formats = () => (
  <Section id="formats">
    <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
      <div>
        <SectionHead eyebrow="Formats" title="Ways we can work together." className="!mb-10" />
        <div className="border-t border-line">
          {TEACHING.formats.map((f, i) => (
            <Reveal key={f.title} delay={0.05 * i}>
              <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
                <h3 className="font-medium text-text">{f.title}</h3>
                <p className="font-light leading-relaxed text-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <div>
        <SectionHead eyebrow="Topics" title="What I teach." className="!mb-10" />
        <Reveal>
          <ul className="flex flex-wrap gap-3">
            {TEACHING.topics.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line bg-raised px-5 py-3 text-sm text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-md text-pretty font-serif text-2xl italic leading-snug text-text">
            {TEACHING.cta}
          </p>
        </Reveal>
      </div>
    </div>
  </Section>
);
