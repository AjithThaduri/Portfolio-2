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
  <Link
    href={`/blueprints/${b.slug}`}
    className="group relative flex h-full flex-col rounded-3xl border border-line bg-raised p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[var(--card-glow)]"
  >
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
        {TYPE_LABEL[b.type]}
      </span>
      {b.draft && (
        <span className="ml-auto rounded-full bg-flag/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-flag">
          Draft
        </span>
      )}
    </div>
    <h3 className="mt-6 text-xl font-medium leading-snug tracking-tight text-text">{b.title}</h3>
    <p className="mt-3 flex-1 text-[0.95rem] font-light leading-relaxed text-muted">{b.summary}</p>
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
      <StatusBadge status={b.status} />
      <span className="text-xs text-faint">
        {formatDate(b.updated ?? b.published)} · {b.readingMinutes} min
      </span>
    </div>
  </Link>
);
