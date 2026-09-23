import Link from "next/link";
import { HELP } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

export const Help = () => (
  <Section id="help" tone="surface">
    <SectionHead eyebrow={HELP.title} title={HELP.lede} />

    <div className="grid gap-5 lg:grid-cols-3">
      {HELP.items.map((h, i) => (
        <Reveal key={h.title} delay={0.06 * i} className="h-full">
          <article className="flex h-full flex-col rounded-3xl border border-line bg-raised p-8">
            <span
              aria-hidden
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface font-mono text-xs text-accent"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-8 text-xl font-medium tracking-tight text-text">{h.title}</h3>
            <p className="mt-3 font-light leading-relaxed text-muted">{h.body}</p>
            <ul className="mt-8 space-y-3 border-t border-line pt-6">
              {h.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-sm font-light leading-relaxed text-muted">
                  <span aria-hidden className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent-vivid" />
                  {pt}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </div>

    <Reveal>
      <Link
        href="/teaching"
        className="group mt-5 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-dashed border-line px-8 py-6 transition-colors hover:border-accent/50"
      >
        <span className="font-light text-muted">{HELP.teachingNote.text}</span>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-text transition-colors group-hover:text-accent">
          {HELP.teachingNote.link}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </Reveal>
  </Section>
);
