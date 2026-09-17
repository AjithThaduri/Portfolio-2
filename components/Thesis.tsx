import Image from "next/image";
import { THESIS, SITE } from "@/lib/content";
import { Reveal } from "./Reveal";

export const Thesis = () => (
  <section
    id="approach"
    className="relative scroll-mt-20 overflow-hidden border-t border-line bg-ink px-6 py-24 sm:px-10 md:py-32"
  >
    <span
      aria-hidden
      className="pointer-events-none absolute -right-4 top-6 select-none font-mono text-[11rem] font-medium leading-none text-line opacity-60 sm:text-[15rem] md:-right-8"
    >
      01
    </span>
    <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-20">
      {/* Portrait — the one human moment on the page */}
      <Reveal className="lg:sticky lg:top-28 lg:self-start">
        <figure>
          <div className="relative aspect-[4/5] w-full max-w-[340px] overflow-hidden border border-line bg-surface">
            <Image
              src="/img/portrait.webp"
              alt="Portrait of Ajith Thaduri"
              fill
              sizes="(max-width: 1024px) 70vw, 340px"
              className="object-cover"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
            />
          </div>
          <figcaption className="mt-5 max-w-[340px] border-t border-line pt-4 font-mono text-[11px] leading-relaxed tracking-[0.1em] text-faint">
            <span className="block uppercase text-muted">Ajith Thaduri</span>
            <span className="mt-1 block">
              AI Engineer · Consultant · Instructor
            </span>
            <span className="mt-1 block">{SITE.location}</span>
          </figcaption>
        </figure>
      </Reveal>

      <div>
        <Reveal>
          <div className="mb-8 flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            <span className="text-accent">01</span>
            <span className="h-px flex-1 bg-line" aria-hidden />
            <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-faint">
              Approach
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <blockquote className="text-balance text-3xl font-light leading-[1.15] tracking-tight text-text sm:text-4xl md:text-5xl">
            &ldquo;{THESIS.quote}&rdquo;
          </blockquote>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-10 max-w-2xl text-lg font-light leading-relaxed text-muted">
            {THESIS.intro}
          </p>
        </Reveal>

        <div className="mt-16 border-t border-line">
          {THESIS.principles.map((p, i) => (
            <Reveal key={p.n} delay={0.04 * i}>
              <article className="grid gap-4 border-b border-line py-8 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-8">
                <span className="font-mono text-[11px] tracking-[0.2em] text-accent md:pt-1">
                  {p.n}
                </span>
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-text">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-2xl font-light leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
