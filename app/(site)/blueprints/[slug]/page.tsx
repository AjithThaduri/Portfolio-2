import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  formatDate,
  getAllBlueprints,
  getBlueprint,
  getBlueprintMetas,
  CODE_REPO,
  TYPE_LABEL,
} from "@/lib/blueprints";
import { CAPABILITIES, FLAGSHIP, SITE } from "@/lib/content";
import { BlueprintCard, StatusBadge } from "@/components/blueprint/BlueprintCard";
import { CopyMarkdown } from "@/components/blueprint/CopyMarkdown";
import { RepoList } from "@/components/blueprint/RepoList";
import { mdxComponents, tocFromBody } from "@/components/blueprint/mdx";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Toc } from "@/components/Toc";
import { Reveal } from "@/components/Reveal";
import { Glow } from "@/components/Section";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlueprints().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBlueprint(slug);
  if (!b) return {};
  return {
    title: b.title,
    description: b.summary,
    alternates: { canonical: `/blueprints/${b.slug}` },
    openGraph: {
      type: "article",
      title: b.title,
      description: b.summary,
      publishedTime: b.published,
      modifiedTime: b.updated ?? b.published,
    },
    ...(b.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function BlueprintPage({ params }: Props) {
  const { slug } = await params;
  const b = getBlueprint(slug);
  if (!b) notFound();

  const toc = [
    ...tocFromBody(b.body),
    ...(b.repos.length ? [{ id: "repos", label: "Repos to explore" }] : []),
  ];
  const related = b.related ? FLAGSHIP.find((f) => f.slug === b.related) : undefined;
  const caps = CAPABILITIES.filter((c) => b.topics.includes(c.slug));
  const more = getBlueprintMetas()
    .filter((o) => o.slug !== b.slug)
    .sort((x, y) => Number(y.topics.some((t) => b.topics.includes(t))) - Number(x.topics.some((t) => b.topics.includes(t))))
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: b.title,
    description: b.summary,
    datePublished: b.published,
    dateModified: b.updated ?? b.published,
    author: { "@id": `${SITE.url}#person` },
    url: `${SITE.url}/blueprints/${b.slug}`,
    license: "https://creativecommons.org/licenses/by/4.0/",
  };

  return (
    <article>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="relative overflow-hidden px-6 pb-12 pt-36 sm:px-10 md:pt-44">
        <Glow />
        <div className="relative mx-auto max-w-6xl">
          {b.draft && (
            <p className="mb-8 inline-flex rounded-full border border-flag/40 bg-flag/10 px-4 py-2 text-sm text-flag">
              Draft — awaiting review. Hidden on the live site until approved.
            </p>
          )}
          <Reveal fade={false}>
            <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.2em]">
              <Link href="/" className="text-faint transition-colors hover:text-text">Home</Link>
              <span aria-hidden className="mx-3 text-line">/</span>
              <Link href="/blueprints" className="text-faint transition-colors hover:text-text">Blueprints</Link>
              <span aria-hidden className="mx-3 text-line">/</span>
              <span className="text-accent">{TYPE_LABEL[b.type]}</span>
            </nav>
          </Reveal>
          <Reveal fade={false} delay={0.06}>
            <h1 className="mt-8 max-w-4xl text-balance text-4xl font-medium leading-[1.06] tracking-[-0.035em] text-text sm:text-5xl md:text-[3.6rem]">
              {b.title}
            </h1>
          </Reveal>
          <Reveal fade={false} delay={0.12}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-faint">
              <StatusBadge status={b.status} />
              <span>{b.readingMinutes} min read</span>
              <span aria-hidden>·</span>
              <span>
                {b.updated ? `Updated ${formatDate(b.updated)}` : `Published ${formatDate(b.published)}`}
              </span>
            </div>
          </Reveal>
          <Reveal fade={false} delay={0.18}>
            <div className="mt-10 rounded-3xl bg-surface px-7 py-8 sm:px-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">In plain terms</p>
              <p className="mt-4 max-w-3xl text-balance font-serif text-2xl italic leading-snug text-text sm:text-[1.9rem]">
                {b.summary}
              </p>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="px-6 pb-24 sm:px-10 md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-10">
              {toc.length > 0 && <Toc items={toc} />}
              <div className="space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Take it with you</p>
                {b.code && (
                  <a
                    href={`${CODE_REPO}/tree/main/${b.code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 rounded-full bg-text px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent"
                  >
                    Run the code <span aria-hidden>↗</span>
                  </a>
                )}
                <CopyMarkdown slug={b.slug} />
                <a
                  href={`/blueprints/${b.slug}/raw`}
                  className="block text-sm text-muted transition-colors hover:text-text"
                >
                  View raw Markdown ↗
                </a>
              </div>
            </div>
          </aside>

          <div className="min-w-0 max-w-3xl">
            <MDXRemote
              source={b.body}
              components={mdxComponents}
              options={{ blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />

            <RepoList repos={b.repos} />

            <footer className="mt-20 space-y-5">
              {related && (
                <Link
                  href={`/work/${related.slug}`}
                  className="group flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-surface px-7 py-6 transition-colors hover:border-accent/50"
                >
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                      Where I&apos;ve used this
                    </span>
                    <span className="mt-1 block text-lg font-medium text-text group-hover:text-accent">
                      {related.title}
                    </span>
                  </span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              )}
              {b.changelog.length > 0 && (
                <details className="group rounded-3xl border border-line px-7 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-muted">
                    <span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Changelog</span>
                      <span className="ml-3">{b.changelog.length} revision{b.changelog.length > 1 ? "s" : ""}</span>
                    </span>
                    <span aria-hidden className="transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <ol className="mt-4 space-y-2 border-t border-line pt-4">
                    {b.changelog.map((c) => (
                      <li key={c.date + c.note} className="flex gap-4 text-sm">
                        <span className="w-24 shrink-0 font-mono text-xs text-faint">{formatDate(c.date)}</span>
                        <span className="font-light text-muted">{c.note}</span>
                      </li>
                    ))}
                  </ol>
                </details>
              )}
              <div className="flex flex-wrap items-center gap-2 lg:hidden">
                {b.code && (
                  <a
                    href={`${CODE_REPO}/tree/main/${b.code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-text px-4 py-2 text-sm font-medium text-ink"
                  >
                    Run the code ↗
                  </a>
                )}
                <CopyMarkdown slug={b.slug} />
              </div>
              {caps.length > 0 && (
                <p className="text-sm text-faint">
                  Filed under{" "}
                  {caps.map((c, i) => (
                    <span key={c.slug}>
                      {i > 0 && ", "}
                      <Link href={`/capabilities/${c.slug}`} className="text-muted underline decoration-line underline-offset-4 hover:text-text">
                        {c.title}
                      </Link>
                    </span>
                  ))}
                  . Text and diagrams are CC BY 4.0.
                </p>
              )}
            </footer>
          </div>
        </div>

        {more.length > 0 && (
          <div className="mx-auto mt-24 max-w-6xl border-t border-line pt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Read next</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {more.map((m) => (
                <BlueprintCard key={m.slug} b={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
