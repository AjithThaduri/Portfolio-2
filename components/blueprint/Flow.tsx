"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* An interactive pipeline diagram, written as data inside MDX:

   <Flow
     title="Ingestion"
     zones={[{ id: "secure", label: "PHI zone", tone: "teal" }]}
     stages={[
       { id: "parse", label: "Parse", note: "layout-aware", detail: "…" },
       { id: "redact", label: "Redact", zone: "secure", detail: "…" },
     ]}
   />

   Click a stage to read what it does. "Copy as Mermaid" exports the same
   diagram so it can be pasted into docs, GitHub or a slide. */

type Stage = { id: string; label: string; note?: string; detail: string; zone?: string };
type Zone = { id: string; label: string; tone?: "teal" | "accent" | "flag" };

const toneVar = { teal: "var(--teal)", accent: "var(--accent-vivid)", flag: "var(--flag)" };

const toMermaid = (stages: Stage[], zones: Zone[]) => {
  const lines = ["flowchart LR"];
  const node = (s: Stage) => `  ${s.id}["${s.label}${s.note ? `<br/><small>${s.note}</small>` : ""}"]`;
  const inZone = new Set<string>();
  for (const z of zones) {
    const members = stages.filter((s) => s.zone === z.id);
    if (!members.length) continue;
    lines.push(`  subgraph ${z.id}["${z.label}"]`);
    members.forEach((m) => {
      lines.push(`  ${node(m)}`);
      inZone.add(m.id);
    });
    lines.push("  end");
  }
  stages.filter((s) => !inZone.has(s.id)).forEach((s) => lines.push(node(s)));
  for (let i = 0; i < stages.length - 1; i++) lines.push(`  ${stages[i].id} --> ${stages[i + 1].id}`);
  return lines.join("\n");
};

export const Flow = ({
  title,
  stages,
  zones = [],
}: {
  title?: string;
  stages: Stage[];
  zones?: Zone[];
}) => {
  const [active, setActive] = useState<string>(stages[0]?.id);
  const [copied, setCopied] = useState(false);
  const current = stages.find((s) => s.id === active);
  const zoneOf = (s: Stage) => zones.find((z) => z.id === s.zone);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(toMermaid(stages, zones));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — nothing sensible to fall back to */
    }
  };

  return (
    <figure className="not-prose my-10 overflow-hidden rounded-3xl border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <figcaption className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          {title ?? "Architecture"} · click a stage
        </figcaption>
        <div className="flex flex-wrap items-center gap-3">
          {zones.map((z) => (
            <span key={z.id} className="inline-flex items-center gap-1.5 text-xs text-muted">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full"
                style={{ background: toneVar[z.tone ?? "teal"] }}
              />
              {z.label}
            </span>
          ))}
          <button
            type="button"
            onClick={copy}
            className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-text hover:text-text"
          >
            {copied ? "Copied ✓" : "Copy as Mermaid"}
          </button>
        </div>
      </div>

      <ol className="flex flex-col gap-2 overflow-x-auto p-5 sm:flex-row sm:items-stretch sm:gap-0">
        {stages.map((s, i) => {
          const z = zoneOf(s);
          const on = s.id === active;
          return (
            <li key={s.id} className="flex flex-col items-stretch sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setActive(s.id)}
                aria-pressed={on}
                className={`relative min-w-[8.5rem] rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                  on
                    ? "border-accent bg-raised shadow-[0_12px_30px_-16px_var(--accent-vivid)]"
                    : "border-line bg-raised/60 hover:border-faint"
                }`}
              >
                {z && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 top-0 h-[2px] rounded-full"
                    style={{ background: toneVar[z.tone ?? "teal"] }}
                  />
                )}
                <span className="block font-mono text-[10px] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-sm font-medium text-text">{s.label}</span>
                {s.note && <span className="mt-0.5 block text-xs text-faint">{s.note}</span>}
              </button>
              {i < stages.length - 1 && (
                <span
                  aria-hidden
                  className="self-center px-1.5 py-1 text-faint sm:py-0"
                >
                  <span className="hidden sm:inline">→</span>
                  <span className="sm:hidden">↓</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="border-t border-line bg-ink px-6 py-5" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm font-medium text-text">{current.label}</p>
              <p className="mt-1.5 max-w-3xl text-sm font-light leading-relaxed text-muted">
                {current.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </figure>
  );
};
