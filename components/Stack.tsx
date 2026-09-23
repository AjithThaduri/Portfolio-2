import { STACK } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

export const Stack = () => (
  <Section id="stack">
    <SectionHead eyebrow={STACK.title} title={STACK.lede} />

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {STACK.groups.map((g, i) => (
        <Reveal key={g.group} delay={0.03 * i} className="h-full">
          <div className="h-full rounded-3xl border border-line p-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {g.group}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="rounded-full bg-surface px-3 py-1.5 text-sm font-light text-muted"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);
