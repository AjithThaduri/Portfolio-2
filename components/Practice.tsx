import { PRACTICE } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

export const Practice = () => (
  <Section id="practice" tone="surface" ghost="04">
    <SectionHead
      n="04"
      title="Practice"
      lede="Three ways I work. Most engagements are some combination of the three — build the thing, decide how it should be built, or teach the team to build it themselves."
    />

    <div className="grid gap-px border-t border-line bg-line sm:grid-cols-2">
      {PRACTICE.map((p, i) => (
        <Reveal key={p.n} delay={0.06 * i}>
          <article className="flex h-full flex-col bg-ink p-8 lg:p-10">
            <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
              {p.n}
            </span>
            <h3 className="mt-5 text-2xl font-medium tracking-tight text-text">
              {p.title}
            </h3>
            <p className="mt-3 font-light leading-relaxed text-muted">{p.lede}</p>
            <ul className="mt-8 space-y-4 border-t border-line pt-6">
              {p.points.map((pt) => (
                <li
                  key={pt}
                  className="flex gap-3 text-sm font-light leading-relaxed text-muted"
                >
                  <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-accent" />
                  {pt}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </div>
  </Section>
);
