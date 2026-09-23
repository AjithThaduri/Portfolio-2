import Link from "next/link";
import { BLUEPRINTS_INTRO } from "@/lib/content";
import { getBlueprintMetas } from "@/lib/blueprints";
import { BlueprintCard } from "./blueprint/BlueprintCard";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

export const LatestBlueprints = () => {
  const items = getBlueprintMetas().slice(0, 3);
  if (!items.length) return null;
  return (
    <Section id="blueprints">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead eyebrow={BLUEPRINTS_INTRO.title} title={BLUEPRINTS_INTRO.headline} lede={BLUEPRINTS_INTRO.lede} className="!mb-0" />
        <Reveal>
          <Link
            href="/blueprints"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-text"
          >
            All blueprints
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((b, i) => (
          <Reveal key={b.slug} delay={0.05 * i} className="h-full">
            <BlueprintCard b={b} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
};
