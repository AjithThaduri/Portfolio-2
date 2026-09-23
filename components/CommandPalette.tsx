"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { lockScroll } from "./SmoothScroll";

export type SearchItem = { title: string; href: string; group: string; hint?: string };

/* ⌘K / Ctrl+K anywhere, or the search button in the nav (which fires the
   "open-palette" event). The index is built on the server and passed in. */
export const CommandPalette = ({ items }: { items: SearchItem[] }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);

  useEffect(() => {
    const show = () => {
      setQ("");
      setI(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) setOpen(false);
        else show();
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [open]);

  useEffect(() => (open ? lockScroll() : undefined), [open]);

  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return items.filter((x) => x.group === "Pages" || x.group === "Blueprints");
    return items
      .map((x) => {
        const hay = `${x.title} ${x.hint ?? ""} ${x.group}`.toLowerCase();
        if (!words.every((w) => hay.includes(w))) return null;
        const score = words.reduce((s, w) => s + (x.title.toLowerCase().includes(w) ? 2 : 1), 0);
        return { x, score };
      })
      .filter((r): r is { x: SearchItem; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((r) => r.x);
  }, [q, items]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setI((v) => Math.min(v + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setI((v) => Math.max(v - 1, 0));
    } else if (e.key === "Enter" && results[i]) {
      go(results[i].href);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-3xl border border-line bg-raised shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <span aria-hidden className="text-faint">⌕</span>
              <input
                autoFocus
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setI(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Search work, blueprints, terms…"
                aria-label="Search"
                aria-activedescendant={results[i] ? `cmd-${i}` : undefined}
                aria-controls="cmd-results"
                className="h-14 flex-1 bg-transparent text-text placeholder:text-faint focus:outline-none"
              />
              <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">esc</kbd>
            </div>
            <ul id="cmd-results" role="listbox" data-lenis-prevent className="max-h-[55vh] overflow-y-auto overscroll-contain p-2">
              {results.length === 0 && <li className="px-4 py-8 text-center text-sm text-faint">No matches.</li>}
              {results.map((r, idx) => {
                const header = idx === 0 || results[idx - 1].group !== r.group;
                return (
                  <li key={`${r.group}-${r.href}`} role="presentation">
                    {header && (
                      <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                        {r.group}
                      </p>
                    )}
                    <button
                      id={`cmd-${idx}`}
                      role="option"
                      aria-selected={idx === i}
                      type="button"
                      onMouseEnter={() => setI(idx)}
                      onClick={() => go(r.href)}
                      className={`flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        idx === i ? "bg-surface text-text" : "text-muted"
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block truncate">{r.title}</span>
                        {r.hint && <span className="block truncate text-xs text-faint">{r.hint}</span>}
                      </span>
                      {idx === i && <span aria-hidden className="text-faint">↵</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
