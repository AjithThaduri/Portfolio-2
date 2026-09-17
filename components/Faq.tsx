import { FAQ } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

export const Faq = () => (
  <Section id="about" tone="surface" ghost="07">
    <SectionHead
      n="07"
      title="In short"
      lede="The plain-language version, for anyone — or anything — that wants the summary rather than the scroll."
    />

    <dl className="border-t border-line">
      {FAQ.map((item, i) => (
        <Reveal key={item.q} delay={0.03 * i}>
          <div className="grid gap-4 border-b border-line py-8 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-12">
            <dt className="text-lg font-medium tracking-tight text-text">
              {item.q}
            </dt>
            <dd className="max-w-3xl font-light leading-relaxed text-muted">
              {item.a}
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  </Section>
);
