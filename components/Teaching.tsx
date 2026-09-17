import { TEACHING } from "@/lib/content";
import { Reveal } from "./Reveal";

export const Teaching = () => (
  <section
    id="teaching"
    className="relative scroll-mt-20 overflow-hidden border-t border-line bg-ink px-6 py-28 sm:px-10 md:py-36"
  >
    {/* warm wash — this is the one section that should feel human */}
    <div
      aria-hidden
      className="pointer-events-none absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full blur-[110px]"
      style={{ background: "var(--accent-vivid)", opacity: "var(--glow-a)" }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full blur-[110px]"
      style={{ background: "var(--teal)", opacity: "var(--glow-b)" }}
    />

    <div className="relative mx-auto max-w-6xl">
      <Reveal>
        <div className="mb-14 flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          <span className="text-accent">05</span>
          <span className="h-px flex-1 bg-line" aria-hidden />
          <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-faint">
            Teaching
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="max-w-4xl text-balance text-3xl font-light leading-[1.2] tracking-tight text-text sm:text-4xl md:text-[2.75rem]">
          {TEACHING.lede}
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <dl className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-3">
          {TEACHING.stats.map((s) => (
            <div key={s.label}>
              <dd className="text-6xl font-light leading-none tracking-tight text-text md:text-7xl">
                {s.value}
              </dd>
              <dt className="mt-4 max-w-[12rem] font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-faint">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="mt-20 border-t border-line pt-8">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            What I teach
          </h3>
          <ul className="mt-7 flex flex-wrap gap-3">
            {TEACHING.topics.map((t) => (
              <li
                key={t}
                className="border border-line bg-raised px-4 py-2.5 text-sm font-light text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  </section>
);
