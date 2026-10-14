import Link from "next/link";
import { HELP } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

const textLink =
  "font-medium text-text underline decoration-line underline-offset-[6px] transition-colors hover:decoration-accent";

export const Help = () => (
  <Section id="help" tone="cool">
    <SectionHead rail eyebrow={HELP.title} title={HELP.lede} />

    <div className="grid gap-x-10 gap-y-14 lg:grid-cols-3">
      {HELP.items.map((h, i) => (
        <Reveal key={h.title} delay={0.06 * i} className="h-full">
          <article className="flex h-full flex-col border-t border-line pt-7">
            <h3 className="text-xl font-medium tracking-tight text-text">{h.title}</h3>
            <p className="mt-3 text-pretty font-light leading-relaxed text-muted">{h.body}</p>
            <ul className="mt-7 space-y-2.5">
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
      <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-sm sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-10">
        <p className="font-light text-muted">
          {HELP.teachingNote.text}{" "}
          <Link href="/teaching" className={textLink}>
            {HELP.teachingNote.link}
          </Link>
        </p>
        <Link href="/work-with-me" className={`${textLink} sm:ml-auto`}>
          How a project with me works
        </Link>
        <Link href="/work#capabilities" className={textLink}>
          Browse by capability
        </Link>
      </div>
    </Reveal>
  </Section>
);
