import Link from "next/link";
import { FLAGSHIP, WORK_INTRO } from "@/lib/content";
import { MoreWork } from "./MoreWork";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

/* The four case studies as an index: sector and role in the margin, the
   system's name large, one plain sentence, the stack set quietly at the end. */
const FlagshipIndex = () => (
  <ul className="border-t border-line">
    {FLAGSHIP.map((p) => (
      <li key={p.slug} className="border-b border-line">
        <Reveal>
          <Link
            href={`/work/${p.slug}`}
            className="group grid gap-4 py-10 focus-visible:outline-offset-8 lg:grid-cols-12 lg:gap-8 lg:py-14"
          >
            <div className="space-y-1 text-sm lg:col-span-3 lg:pt-2">
              <p className="text-pretty text-muted">{p.sector}</p>
              <p className="text-faint">{p.role}</p>
            </div>
            <div className="lg:col-span-6">
              <h3 className="text-balance text-2xl font-medium leading-tight tracking-[-0.02em] text-text transition-colors duration-300 group-hover:text-accent sm:text-[2rem]">
                {p.title}
              </h3>
              <p className="mt-4 max-w-[58ch] text-pretty font-light leading-relaxed text-muted">{p.plain}</p>
            </div>
            <div className="flex flex-col justify-between gap-4 text-sm lg:col-span-3 lg:items-end lg:pt-2 lg:text-right">
              <p className="text-faint">{p.stack.slice(0, 3).join(", ")}</p>
              <span className="font-medium text-text underline decoration-line underline-offset-[6px] transition-colors group-hover:decoration-accent">
                Read the case study
              </span>
            </div>
          </Link>
        </Reveal>
      </li>
    ))}
  </ul>
);

export const Work = () => (
  <Section id="work" tone="surface">
    <SectionHead rail eyebrow={WORK_INTRO.title} title={WORK_INTRO.headline} lede={WORK_INTRO.lede} />
    <FlagshipIndex />
    <MoreWork />
    <div className="mt-14 lg:grid lg:grid-cols-12 lg:gap-8">
      <Link
        href="/work"
        className="text-sm font-medium text-text underline decoration-line underline-offset-[6px] transition-colors hover:decoration-accent lg:col-span-9 lg:col-start-4"
      >
        See all work, filterable by capability
      </Link>
    </div>
  </Section>
);
