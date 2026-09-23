"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MORE_WORK, MORE_WORK_INITIAL, SHOW_DRAFTS } from "@/lib/content";
import { Reveal } from "./Reveal";

export const MoreWork = () => {
  const [open, setOpen] = useState(false);

  const items = MORE_WORK.filter(
    (w) => w.status === "live" || (SHOW_DRAFTS && w.status === "draft"),
  );
  const shown = open ? items : items.slice(0, MORE_WORK_INITIAL);
  const hidden = items.length - MORE_WORK_INITIAL;

  return (
    <div className="mt-24 md:mt-32">
      <Reveal>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-medium tracking-tight text-text">Also built</h3>
            <p className="mt-2 text-muted">
              Smaller projects and engagements, across the same kind of work.
            </p>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            {items.length} projects
          </span>
        </div>
      </Reveal>

      <ul id="more-work" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {shown.map((w, i) => {
            const draft = w.status === "draft";
            return (
              <motion.li
                key={`${w.title}-${i}`}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{
                  duration: 0.45,
                  delay: i >= MORE_WORK_INITIAL ? 0.05 * (i - MORE_WORK_INITIAL) : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <article
                  className={`flex h-full flex-col rounded-2xl border border-line bg-ink p-7 transition-colors duration-300 ${
                    draft ? "opacity-55" : "hover:border-accent/40"
                  }`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {draft ? "Draft slot — fill in" : w.sector}
                  </p>
                  <h4 className="mt-4 text-lg font-medium tracking-tight text-text">
                    {w.title}
                  </h4>
                  <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-muted">
                    {w.body}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {w.tags.map((t, ti) => (
                      <li
                        key={`${t}-${ti}`}
                        className="rounded-full bg-surface px-2.5 py-1 font-mono text-[10px] text-faint"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {hidden > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="more-work"
            onClick={() => setOpen((v) => !v)}
            className="group inline-flex items-center gap-3 rounded-full border border-line bg-ink px-6 py-3 text-sm font-medium text-text transition-colors hover:border-text"
          >
            {open ? "Show fewer" : `Show ${hidden} more projects`}
            <span
              aria-hidden
              className={`inline-block transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            >
              ↓
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
