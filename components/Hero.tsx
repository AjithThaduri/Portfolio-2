"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HERO, SITE } from "@/lib/content";
import { HeroCanvas } from "./HeroCanvas";

const legend = [
  { c: "var(--accent-vivid)", label: "raw input" },
  { c: "var(--flag)", label: "needs handling" },
  { c: "var(--teal)", label: "structured out" },
];

/* The same shape recurs across the work, so the gate names a different
   stage every few seconds rather than claiming to be only one of them. */
const STAGES = [
  "retrieving",
  "redacting",
  "routing",
  "validating",
  "structuring",
];

export const Hero = () => {
  const reduce = useReducedMotion();
  const router = useRouter();
  const [stage, setStage] = useState(0);

  /* A door for one person. Type her name anywhere, or click the full stop
     at the end of the headline — it looks like punctuation because it is. */
  useEffect(() => {
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA)$/.test(el.tagName)) return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-12);
      if (buffer.endsWith("vasuki")) router.push("/vasuki");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 2600);
    return () => clearInterval(id);
  }, []);
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-32 sm:px-10"
    >
      <HeroCanvas />

      {/* scrims: keep the type legible over the simulation */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/10 md:via-ink/80 md:to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div {...rise(0.05)} className="mb-9 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 border border-line bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Live —
            <span className="relative inline-block min-w-[5.5rem] text-left text-accent">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={STAGES[stage]}
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block"
                >
                  {STAGES[stage]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {HERO.eyebrow}
          </p>
        </motion.div>

        <h1 className="max-w-5xl text-[2.4rem] font-medium leading-[1.04] tracking-[-0.035em] text-text sm:text-5xl md:text-6xl lg:text-[4.6rem]">
          {HERO.headline.map((line, i) => (
            <motion.span key={line} {...rise(0.12 + i * 0.09)} className="block">
              {i === 2 ? (
                <span className="bg-gradient-to-r from-[#ff9f43] via-[#ffd9a8] to-[#68d6c6] bg-clip-text text-transparent">
                  {line.replace(/\.$/, "")}
                  <span
                    onPointerDown={(e) => {
                      e.preventDefault();
                      router.push("/vasuki");
                    }}
                    onClick={() => router.push("/vasuki")}
                    className="-mx-3 px-3"
                    style={{ cursor: "default", touchAction: "manipulation" }}
                  >
                    .
                  </span>
                </span>
              ) : (
                line
              )}{" "}
            </motion.span>
          ))}
        </h1>

        <motion.p
          {...rise(0.42)}
          className="mt-9 max-w-2xl text-lg font-light leading-relaxed text-muted"
        >
          {HERO.lede}
        </motion.p>

        <motion.dl
          {...rise(0.52)}
          className="mt-14 grid max-w-4xl grid-cols-1 gap-px border-t border-line bg-line sm:grid-cols-3"
        >
          {HERO.stats.map((s) => (
            <div key={s.label} className="bg-ink/85 px-1 pt-6 backdrop-blur-sm sm:px-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                {s.label}
              </dt>
              <dd>
                <span className="mt-2 block text-4xl font-light tracking-tight text-text">
                  {s.value}
                </span>
                <span className="mt-1 block text-sm text-faint">{s.sub}</span>
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          {...rise(0.62)}
          className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.16em]"
        >
          <a
            href={`mailto:${SITE.email}`}
            className="border-b border-accent pb-1 text-accent transition-opacity hover:opacity-70"
          >
            Start a conversation
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-text"
          >
            LinkedIn ↗
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-text"
          >
            GitHub ↗
          </a>
        </motion.div>
      </div>

      {/* legend — tells the viewer what they are watching */}
      <motion.ul
        {...rise(0.8)}
        className="pointer-events-none absolute bottom-6 right-6 z-10 hidden gap-5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint md:flex sm:right-10"
      >
        {legend.map((l) => (
          <li key={l.label} className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: l.c, boxShadow: `0 0 8px ${l.c}` }}
            />
            {l.label}
          </li>
        ))}
      </motion.ul>
    </section>
  );
};
