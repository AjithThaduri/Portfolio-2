import Link from "next/link";
import {
  BlueprintMeta,
  formatDate,
  STATUS_LABEL,
  TYPE_LABEL,
} from "@/lib/blueprint-meta";

const statusDot = {
  production: "bg-emerald-400",
  tested: "bg-accent-vivid",
  experimental: "bg-faint",
};

export const StatusBadge = ({ status }: { status: BlueprintMeta["status"] }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] text-muted">
    <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${statusDot[status]}`} />
    {STATUS_LABEL[status]}
  </span>
);

export const BlueprintCard = ({ b }: { b: BlueprintMeta }) => (
  <Link href={`/blueprints/${b.slug}`} className="group flex h-full flex-col border-t border-line pt-6">
    <div className="flex flex-wrap items-baseline justify-between gap-3 text-sm">
      <span className="font-serif text-base italic text-muted">{TYPE_LABEL[b.type]}</span>
      <span className="text-faint">{formatDate(b.updated ?? b.published)}</span>
    </div>
    {b.draft && (
      <span className="mt-3 w-fit rounded-full bg-flag/15 px-2.5 py-0.5 text-xs text-flag">Draft</span>
    )}
    <h3 className="mt-4 text-xl font-medium leading-snug tracking-tight text-text transition-colors duration-300 group-hover:text-accent">
      {b.title}
    </h3>
    <p className="mt-3 flex-1 text-pretty text-[0.95rem] font-light leading-relaxed text-muted">{b.summary}</p>
    <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-faint">
      <StatusBadge status={b.status} />
      <span>{b.readingMinutes} min read</span>
    </div>
  </Link>
);
