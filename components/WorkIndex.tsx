"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CAPABILITIES, Cap, FLAGSHIP, MORE_WORK, SHOW_DRAFTS } from "@/lib/content";

type Entry =
  | { kind: "flagship"; key: string; title: string; sector: string; body: string; tags: string[]; caps: Cap[]; href: string; n: string }
  | { kind: "project"; key: string; title: string; sector: string; body: string; tags: string[]; caps: Cap[] };

const entries: Entry[] = [
  ...FLAGSHIP.map((f) => ({
    kind: "flagship" as const,
    key: f.slug,
    title: f.title,
    sector: f.sector,
    body: f.plain,
    tags: f.stack.slice(0, 4),
    caps: f.caps,
    href: `/work/${f.slug}`,
    n: f.n,
  })),
  ...MORE_WORK.filter((w) => w.status === "live" || (SHOW_DRAFTS && w.status === "draft")).map((w) => ({
    kind: "project" as const,
    key: w.title,
    title: w.title,
    sector: w.sector,
    body: w.body,
    tags: w.tags,
    caps: w.caps,
  })),
];

export const WorkIndex = ({ initial }: { initial?: Cap }) => {
  const [cap, setCap] = useState<Cap | "all">(initial ?? "all");
  const shown = entries.filter((e) => cap === "all" || e.caps.includes(cap));
  const count = (c: Cap) => entries.filter((e) => e.caps.includes(c)).length;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by capability">
        <button
          type="button"
          aria-pressed={cap === "all"}
          onClick={() => setCap("all")}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            cap === "all" ? "border-text bg-text text-ink" : "border-line text-muted hover:text-text"
          }`}
        >
          All <span className="ml-1 opacity-60">{entries.length}</span>
        </button>
        {CAPABILITIES.filter((c) => count(c.slug) > 0).map((c) => (
          <button
            key={c.slug}
            type="button"
            aria-pressed={cap === c.slug}
            onClick={() => setCap(c.slug)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              cap === c.slug ? "border-text bg-text text-ink" : "border-line text-muted hover:text-text"
            }`}
          >
            {c.title} <span className="ml-1 opacity-60">{count(c.slug)}</span>
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((e) => (
            <motion.li
              key={e.key}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={e.kind === "flagship" ? "md:col-span-2 lg:col-span-1" : ""}
            >
              {e.kind === "flagship" ? (
                <Link
                  href={e.href}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-raised p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[var(--card-glow)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-gradient pb-1 pr-2 font-serif text-4xl italic leading-none">{e.n}</span>
                    <span className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      Case study
                    </span>
                  </div>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{e.sector}</p>
                  <h3 className="mt-2 text-xl font-medium tracking-tight text-text">{e.title}</h3>
                  <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-muted">{e.body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text group-hover:text-accent">
                    Read case study
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              ) : (
                <article className="flex h-full flex-col rounded-3xl border border-line bg-ink p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{e.sector}</p>
                  <h3 className="mt-4 text-lg font-medium tracking-tight text-text">{e.title}</h3>
                  <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-muted">{e.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => (
                      <li key={t} className="rounded-full bg-surface px-2.5 py-1 font-mono text-[10px] text-faint">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
