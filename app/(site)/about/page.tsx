import type { Metadata } from "next";
import Image from "next/image";
import { ABOUT } from "@/lib/content";
import { Faq } from "@/components/Faq";
import { ModelWork } from "@/components/ModelWork";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/Section";
import { Stack } from "@/components/Stack";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who I am, how I approach AI systems for sensitive data, the model work below the prompt layer, and the tools I use.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <PageHeader crumb={ABOUT.title} title={ABOUT.headline} />

      <section className="px-6 pb-24 sm:px-10 md:pb-36">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <div className="overflow-hidden rounded-[28px] border border-line bg-raised p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-surface">
                <Image
                  src="/img/portrait.webp"
                  alt="Portrait of Ajith Thaduri"
                  fill
                  sizes="(max-width: 1024px) 80vw, 320px"
                  className="object-cover"
                />
              </div>
            </div>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {ABOUT.facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-4 py-3 text-sm">
                  <dt className="text-faint">{f.label}</dt>
                  <dd className="text-right text-text">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="max-w-2xl space-y-7">
            {ABOUT.body.map((para, i) => (
              <Reveal key={para.slice(0, 24)} delay={0.05 * i}>
                <p
                  className={`text-pretty font-light leading-relaxed ${
                    i === 0 ? "text-xl text-text md:text-2xl md:leading-relaxed" : "text-lg text-muted"
                  }`}
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ModelWork />
      <Stack />
      <Faq />
    </>
  );
}
