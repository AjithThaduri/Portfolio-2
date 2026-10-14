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
    <div className="mt-24 grid gap-10 md:mt-32 lg:grid-cols-12 lg:gap-8">
      <Reveal className="lg:col-span-3">
        <h3 className="font-serif text-2xl italic text-text">Also built</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
          Smaller projects and engagements, across the same kind of work. {items.length} in all.
        </p>
      </Reveal>

      <div className="lg:col-span-9">
        <ul id="more-work" className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
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
                  className={`border-t border-line pt-6 ${draft ? "opacity-55" : ""}`}
                >
                  <p className={`text-sm ${draft ? "text-flag" : "text-faint"}`}>
                    {draft ? "Draft slot — fill in" : w.sector}
                  </p>
                  <h4 className="mt-2 text-lg font-medium tracking-tight text-text">{w.title}</h4>
                  <p className="mt-3 text-pretty text-[0.95rem] font-light leading-relaxed text-muted">{w.body}</p>
                  <p className="mt-4 text-sm text-faint">{w.tags.join(", ")}</p>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {hidden > 0 && (
          <button
            type="button"
            aria-expanded={open}
            aria-controls="more-work"
            onClick={() => setOpen((v) => !v)}
            className="group mt-12 inline-flex items-center gap-3 rounded-full border border-line px-6 py-3 text-sm font-medium text-text transition-colors hover:border-text"
          >
            {open ? "Show fewer" : `Show ${hidden} more`}
            <span
              aria-hidden
              className={`inline-block transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            >
              ↓
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
