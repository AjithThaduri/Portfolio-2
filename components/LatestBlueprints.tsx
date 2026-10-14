import Link from "next/link";
import { BLUEPRINTS_INTRO } from "@/lib/content";
import { formatDate, getBlueprintMetas, TYPE_LABEL } from "@/lib/blueprints";
import { StatusBadge } from "./blueprint/BlueprintCard";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

/* The latest writing as a dated list — the one place on the site where
   dates belong. */
export const LatestBlueprints = () => {
  const items = getBlueprintMetas().slice(0, 3);
  if (!items.length) return null;
  return (
    <Section id="blueprints">
      <SectionHead rail eyebrow={BLUEPRINTS_INTRO.title} title={BLUEPRINTS_INTRO.headline} lede={BLUEPRINTS_INTRO.lede} />
      <ul className="border-t border-line">
        {items.map((b) => (
          <li key={b.slug} className="border-b border-line">
            <Reveal>
              <Link
                href={`/blueprints/${b.slug}`}
                className="group grid gap-3 py-8 lg:grid-cols-12 lg:gap-8 lg:py-10"
              >
                <div className="flex items-baseline gap-3 text-sm lg:col-span-3 lg:block lg:space-y-1 lg:pt-1">
                  <p className="text-muted">{formatDate(b.updated ?? b.published)}</p>
                  <p className="font-serif text-base italic text-faint">{TYPE_LABEL[b.type]}</p>
                </div>
                <div className="lg:col-span-6">
                  <h3 className="text-balance text-xl font-medium leading-snug tracking-tight text-text transition-colors duration-300 group-hover:text-accent sm:text-[1.4rem]">
                    {b.title}
                  </h3>
                  <p className="mt-3 max-w-[60ch] text-pretty font-light leading-relaxed text-muted">{b.summary}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-faint lg:col-span-3 lg:flex-col lg:items-end lg:gap-2 lg:pt-1">
                  <StatusBadge status={b.status} />
                  <span>{b.readingMinutes} min read</span>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
      <div className="mt-14 lg:grid lg:grid-cols-12 lg:gap-8">
        <Link
          href="/blueprints"
          className="text-sm font-medium text-text underline decoration-line underline-offset-[6px] transition-colors hover:decoration-accent lg:col-span-9 lg:col-start-4"
        >
          All blueprints
        </Link>
      </div>
    </Section>
  );
};
