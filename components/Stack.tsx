import { STACK } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

export const Stack = () => (
  <Section id="stack" tone="surface" texture="grid" ghost="06">
    <SectionHead
      n="06"
      title="Stack"
      lede="Tools I have actually shipped with. Deliberately not a list of everything I have read about."
    />

    <div className="grid gap-x-12 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3">
      {STACK.map((g, i) => (
        <Reveal key={g.group} delay={0.03 * i}>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {g.group}
            </h3>
            <ul className="mt-5 space-y-2 border-l border-line pl-5">
              {g.items.map((it) => (
                <li key={it} className="text-sm font-light text-muted">
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
