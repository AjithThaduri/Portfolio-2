"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BlueprintMeta, TYPE_LABEL } from "@/lib/blueprint-meta";
import { CAPABILITIES } from "@/lib/content";
import { BlueprintCard } from "./BlueprintCard";

type Filter = { kind: "all" } | { kind: "type"; v: string } | { kind: "topic"; v: string };

const Chip = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    aria-pressed={on}
    onClick={onClick}
    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
      on ? "border-text bg-text text-ink" : "border-line text-muted hover:border-faint hover:text-text"
    }`}
  >
    {children}
  </button>
);

export const BlueprintList = ({ items }: { items: BlueprintMeta[] }) => {
  const [f, setF] = useState<Filter>({ kind: "all" });

  const topics = useMemo(
    () => CAPABILITIES.filter((c) => items.some((b) => b.topics.includes(c.slug))),
    [items],
  );
  const types = useMemo(() => [...new Set(items.map((b) => b.type))], [items]);

  const shown = items.filter((b) =>
    f.kind === "all"
      ? true
      : f.kind === "type"
        ? b.type === f.v
        : b.topics.includes(f.v),
  );
  const is = (k: Filter["kind"], v?: string) => f.kind === k && (!v || ("v" in f && f.v === v));

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Chip on={is("all")} onClick={() => setF({ kind: "all" })}>
          All <span className="ml-1 opacity-60">{items.length}</span>
        </Chip>
        {topics.map((t) => (
          <Chip key={t.slug} on={is("topic", t.slug)} onClick={() => setF({ kind: "topic", v: t.slug })}>
            {t.title}
          </Chip>
        ))}
        {types.length > 1 &&
          types.map((t) => (
            <Chip key={t} on={is("type", t)} onClick={() => setF({ kind: "type", v: t })}>
              {TYPE_LABEL[t]}s
            </Chip>
          ))}
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((b) => (
            <motion.li
              key={b.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <BlueprintCard b={b} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {shown.length === 0 && <p className="mt-10 text-muted">Nothing here yet — more on the way.</p>}
    </div>
  );
};
