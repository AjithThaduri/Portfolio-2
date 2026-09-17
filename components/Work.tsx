import { FLAGSHIP, MORE_WORK, SHOW_DRAFTS } from "@/lib/content";
import { Diagram } from "./Diagrams";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

const Flagship = () => (
  <div className="space-y-28 md:space-y-40">
    {FLAGSHIP.map((p) => (
      <article key={p.n} className="scroll-mt-24">
        <Reveal>
          <header className="border-b border-line pb-8">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]">
              <span className="text-accent">{p.n}</span>
              <span className="text-faint">{p.sector}</span>
              <span className="ml-auto text-faint">{p.role}</span>
            </div>
            <h3 className="mt-5 text-3xl font-medium tracking-tight text-text sm:text-4xl md:text-5xl">
              {p.title}
            </h3>
          </header>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid gap-6 py-10 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint md:pt-2">
              The problem
            </span>
            <p className="max-w-3xl text-lg font-light leading-relaxed text-muted">
              {p.problem}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid gap-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint md:pt-2">
              The architecture
            </span>
            <div className="min-w-0">
              <Diagram kind={p.diagram} />
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10">
          <Reveal>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint md:pt-2">
              The decisions
            </span>
          </Reveal>
          <div className="min-w-0 border-t border-line">
            {p.decisions.map((d, i) => (
              <Reveal key={d.head} delay={0.03 * i}>
                <div className="border-b border-line py-6">
                  <h4 className="text-base font-medium text-text">{d.head}</h4>
                  <p className="mt-2 max-w-3xl font-light leading-relaxed text-muted">
                    {d.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="grid gap-6 pt-10 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              Built with
            </span>
            <ul className="flex flex-wrap gap-x-2 gap-y-2">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="border border-line px-3 py-1.5 font-mono text-[11px] text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </article>
    ))}
  </div>
);

const MoreGrid = () => {
  const items = MORE_WORK.filter(
    (w) => w.status === "live" || (SHOW_DRAFTS && w.status === "draft"),
  );

  return (
    <div className="mt-28 border-t border-line pt-16 md:mt-40">
      <Reveal>
        <div className="mb-12 flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          <span className="text-accent">02.5</span>
          <span className="h-px flex-1 bg-line" aria-hidden />
          <span>Also built</span>
        </div>
      </Reveal>

      <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {items.map((w, i) => {
          const draft = w.status === "draft";
          return (
            <Reveal key={`${w.title}-${i}`} delay={0.03 * i}>
              <article
                className={`flex h-full flex-col bg-ink p-7 transition-colors ${
                  draft ? "opacity-55" : "hover:bg-surface"
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {draft ? "Draft slot — fill in" : w.sector}
                </p>
                <h4 className="mt-4 text-xl font-medium tracking-tight text-text">
                  {w.title}
                </h4>
                <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-muted">
                  {w.body}
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                  {w.tags.map((t, ti) => (
                    <li key={`${t}-${ti}`}>{t}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
};

export const Work = () => (
  <Section id="work" tone="surface" texture="grid" ghost="02">
    <SectionHead
      n="02"
      title="Selected work"
      lede="Platforms across legal, healthcare and government — and the AI tooling I built to break software like it. Described by what they had to survive rather than who paid for them. Client names withheld; the architecture is the point."
    />
    <Flagship />
    <MoreGrid />
  </Section>
);
