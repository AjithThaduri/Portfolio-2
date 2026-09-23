import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FLAGSHIP } from "@/lib/content";
import { Diagram } from "@/components/Diagrams";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Toc } from "@/components/Toc";
import { Reveal } from "@/components/Reveal";
import { Glow } from "@/components/Section";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FLAGSHIP.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = FLAGSHIP.find((f) => f.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.plain,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.title} — Ajith Thaduri`, description: p.plain },
  };
}

const TOC = [
  { id: "problem", label: "The problem" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Key decisions" },
  { id: "stack", label: "Built with" },
];

const Label = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2
    id={id}
    className="scroll-mt-28 font-mono text-[11px] uppercase tracking-[0.2em] text-accent"
  >
    {children}
  </h2>
);

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = FLAGSHIP.findIndex((f) => f.slug === slug);
  if (index === -1) notFound();
  const p = FLAGSHIP[index];
  const next = FLAGSHIP[(index + 1) % FLAGSHIP.length];
  const prev = FLAGSHIP[(index - 1 + FLAGSHIP.length) % FLAGSHIP.length];

  return (
    <article>
      <ReadingProgress />

      <header className="relative overflow-hidden px-6 pb-14 pt-36 sm:px-10 md:pt-44">
        <Glow />
        <div className="relative mx-auto max-w-6xl">
          <Reveal fade={false}>
            <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.2em]">
              <Link href="/" className="text-faint transition-colors hover:text-text">
                Home
              </Link>
              <span aria-hidden className="mx-3 text-line">/</span>
              <Link href="/#work" className="text-faint transition-colors hover:text-text">
                Work
              </Link>
              <span aria-hidden className="mx-3 text-line">/</span>
              <span className="text-accent">{p.n}</span>
            </nav>
          </Reveal>

          <Reveal fade={false} delay={0.06}>
            <h1 className="mt-8 max-w-4xl text-balance text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-text sm:text-5xl md:text-[4rem]">
              {p.title}
            </h1>
          </Reveal>

          <Reveal fade={false} delay={0.12}>
            <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {[
                { k: "Sector", v: p.sector },
                { k: "My role", v: p.role },
                { k: "Key decisions", v: `${p.decisions.length} covered below` },
              ].map((m) => (
                <div key={m.k} className="bg-ink px-6 py-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{m.k}</dt>
                  <dd className="mt-2 text-text">{m.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal fade={false} delay={0.18}>
            <div className="mt-6 rounded-3xl bg-surface px-7 py-8 sm:px-10 sm:py-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                In plain terms
              </p>
              <p className="mt-4 max-w-3xl text-balance font-serif text-2xl italic leading-snug text-text sm:text-[2rem]">
                {p.plain}
              </p>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="px-6 pb-28 sm:px-10 md:pb-36">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <Toc items={TOC} />
            </div>
          </aside>

          <div className="min-w-0 space-y-24">
            <section>
              <Reveal>
                <Label id="problem">The problem</Label>
                <p className="mt-6 max-w-3xl text-pretty text-xl font-light leading-relaxed text-text md:text-2xl md:leading-relaxed">
                  {p.problem}
                </p>
              </Reveal>
            </section>

            <section>
              <Reveal>
                <Label id="architecture">Architecture</Label>
                <div className="mt-6">
                  <Diagram kind={p.diagram} />
                </div>
                <p className="mt-3 text-xs text-faint sm:hidden">Scroll sideways to see the whole diagram.</p>
              </Reveal>
            </section>

            <section>
              <Reveal>
                <Label id="decisions">Key decisions</Label>
              </Reveal>
              <ol className="mt-8 grid gap-4 md:grid-cols-2">
                {p.decisions.map((d, i) => (
                  <li key={d.head} className="h-full">
                    <Reveal delay={0.04 * (i % 2)} className="flex h-full flex-col rounded-3xl border border-line bg-raised p-7">
                      <span className="font-serif text-3xl italic leading-none text-accent/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-6 text-lg font-medium tracking-tight text-text">{d.head}</h3>
                      <p className="mt-3 text-[0.95rem] font-light leading-relaxed text-muted">{d.body}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <Reveal>
                <Label id="stack">Built with</Label>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line px-4 py-2 font-mono text-xs text-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>
          </div>
        </div>

        <nav
          aria-label="More case studies"
          className="mx-auto mt-28 grid max-w-6xl gap-4 border-t border-line pt-12 sm:grid-cols-2"
        >
          {[
            { dir: "Previous", item: prev },
            { dir: "Next", item: next },
          ].map(({ dir, item }) => (
            <Link
              key={dir}
              href={`/work/${item.slug}`}
              className={`group rounded-3xl border border-line p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 ${
                dir === "Next" ? "sm:text-right" : ""
              }`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                {dir === "Previous" ? "← Previous" : "Next →"}
              </span>
              <span className="mt-3 block text-xl font-medium tracking-tight text-text transition-colors group-hover:text-accent">
                {item.title}
              </span>
              <span className="mt-1 block text-sm text-faint">{item.sector}</span>
            </Link>
          ))}
        </nav>
      </div>
    </article>
  );
}
