import type { Metadata } from "next";
import { BLUEPRINTS_INTRO } from "@/lib/content";
import { getBlueprintMetas, TYPE_LABEL } from "@/lib/blueprints";
import { BlueprintList } from "@/components/blueprint/BlueprintList";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/Section";

export const metadata: Metadata = {
  title: "Blueprints",
  description: BLUEPRINTS_INTRO.lede,
  alternates: {
    canonical: "/blueprints",
    types: { "application/rss+xml": "/blueprints/rss.xml" },
  },
};

export default function Blueprints() {
  const items = getBlueprintMetas();
  return (
    <>
      <PageHeader crumb={BLUEPRINTS_INTRO.title} title={BLUEPRINTS_INTRO.headline} lede={BLUEPRINTS_INTRO.lede}>
        <Reveal delay={0.18}>
          <dl className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
            {(Object.keys(BLUEPRINTS_INTRO.types) as (keyof typeof BLUEPRINTS_INTRO.types)[]).map((k) => (
              <div key={k} className="bg-ink px-6 py-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {TYPE_LABEL[k]}
                </dt>
                <dd className="mt-2 text-sm font-light leading-relaxed text-muted">
                  {BLUEPRINTS_INTRO.types[k]}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </PageHeader>

      <section className="px-6 pb-24 sm:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <BlueprintList items={items} />
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 text-sm text-faint">
            <span>{BLUEPRINTS_INTRO.license}</span>
            <a href="/blueprints/rss.xml" className="transition-colors hover:text-text">
              RSS feed ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
