import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CAPABILITIES, FLAGSHIP, MORE_WORK } from "@/lib/content";
import { getBlueprintMetas } from "@/lib/blueprints";
import { BlueprintCard } from "@/components/blueprint/BlueprintCard";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, PageHeader } from "@/components/Section";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CAPABILITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = CAPABILITIES.find((x) => x.slug === slug);
  if (!c) return {};
  return { title: c.title, description: c.plain, alternates: { canonical: `/capabilities/${c.slug}` } };
}

export default async function CapabilityPage({ params }: Props) {
  const { slug } = await params;
  const c = CAPABILITIES.find((x) => x.slug === slug);
  if (!c) notFound();

  const flagships = FLAGSHIP.filter((f) => f.caps.includes(c.slug));
  const projects = MORE_WORK.filter((w) => w.status === "live" && w.caps.includes(c.slug));
  const blueprints = getBlueprintMetas().filter((b) => b.topics.includes(c.slug));

  return (
    <>
      <PageHeader crumb={c.title} title={c.title} lede={c.plain} />

      <section className="px-6 pb-20 sm:px-10 md:pb-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <p className="text-pretty text-xl font-light leading-relaxed text-text md:text-2xl md:leading-relaxed">
              {c.body}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="rounded-3xl border border-line bg-surface p-7">
              <li className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">What this covers</li>
              {c.points.map((p) => (
                <li key={p} className="mt-4 flex gap-3 text-[0.97rem] font-light leading-relaxed text-muted">
                  <span aria-hidden className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent-vivid" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {(flagships.length > 0 || projects.length > 0) && (
        <section className="bg-surface px-6 py-20 sm:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Eyebrow as="h2">Work in this area</Eyebrow>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {flagships.map((f) => (
                <Link
                  key={f.slug}
                  href={`/work/${f.slug}`}
                  className="group flex flex-col rounded-3xl border border-line bg-raised p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    Case study · {f.sector}
                  </span>
                  <span className="mt-3 text-xl font-medium tracking-tight text-text group-hover:text-accent">
                    {f.title}
                  </span>
                  <span className="mt-2 text-sm font-light leading-relaxed text-muted">{f.plain}</span>
                </Link>
              ))}
              {projects.map((w) => (
                <article key={w.title} className="rounded-3xl border border-line bg-ink p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{w.sector}</p>
                  <h3 className="mt-3 text-lg font-medium tracking-tight text-text">{w.title}</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-muted">{w.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {c.code && c.code.length > 0 && (
        <section className="px-6 py-20 sm:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Eyebrow as="h2">Code you can run</Eyebrow>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {c.code.map((x) => (
                <li key={x.href}>
                  <a
                    href={x.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-3xl border border-line bg-raised p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
                  >
                    <span className="flex items-center justify-between gap-3 font-mono text-sm text-text group-hover:text-accent">
                      {x.label}
                      <span aria-hidden className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                    </span>
                    <span className="mt-3 text-sm font-light leading-relaxed text-muted">{x.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {blueprints.length > 0 && (
        <section className="border-t border-line px-6 py-20 sm:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Eyebrow as="h2">Blueprints on this</Eyebrow>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {blueprints.map((b) => (
                <BlueprintCard key={b.slug} b={b} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line px-6 py-20 sm:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Eyebrow as="h2">Other areas</Eyebrow>
          <div className="mt-10">
            <CapabilityGrid exclude={c.slug} />
          </div>
        </div>
      </section>
    </>
  );
}
