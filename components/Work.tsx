import Link from "next/link";
import { FLAGSHIP, WORK_INTRO } from "@/lib/content";
import { MoreWork } from "./MoreWork";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

const FlagshipCards = () => (
  <div className="grid gap-5 md:grid-cols-2">
    {FLAGSHIP.map((p, i) => (
      <Reveal key={p.slug} delay={0.05 * (i % 2)} className="h-full">
        <Link
          href={`/work/${p.slug}`}
          className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-raised p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] sm:p-9"
        >
          {/* warm light that follows the card into hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-20"
            style={{ background: "var(--accent-vivid)" }}
          />
          <div className="relative flex items-start justify-between gap-6">
            <span className="font-serif text-5xl italic leading-none text-accent/80">
              {p.n}
            </span>
            <span className="max-w-[14rem] text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-faint">
              {p.sector}
            </span>
          </div>

          <h3 className="relative mt-10 text-2xl font-medium tracking-tight text-text sm:text-[1.75rem] sm:leading-tight">
            {p.title}
          </h3>
          <p className="relative mt-4 flex-1 text-pretty font-light leading-relaxed text-muted">
            {p.plain}
          </p>

          <ul className="relative mt-8 flex flex-wrap gap-2">
            {p.stack.slice(0, 4).map((s) => (
              <li
                key={s}
                className="rounded-full border border-line px-3 py-1 font-mono text-[10px] text-faint"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="relative mt-8 flex items-center justify-between border-t border-line pt-6 text-sm">
            <span className="text-faint">{p.role}</span>
            <span className="inline-flex items-center gap-2 font-medium text-text transition-colors group-hover:text-accent">
              Read case study
              <span
                aria-hidden
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:translate-x-1 group-hover:border-accent group-hover:bg-accent group-hover:text-ink"
              >
                →
              </span>
            </span>
          </div>
        </Link>
      </Reveal>
    ))}
  </div>
);

export const Work = () => (
  <Section id="work" tone="surface">
    <SectionHead eyebrow={WORK_INTRO.title} title={WORK_INTRO.lede} />
    <FlagshipCards />
    <MoreWork />
  </Section>
);
