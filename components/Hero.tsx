"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { HERO } from "@/lib/content";
import { Button, Glow } from "./Section";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Line icons for the sector row — drawn at 20px, stroke follows text colour. */
const SectorIcon = ({ name }: { name: string }) => {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "Healthcare")
    return (
      <svg {...common}>
        <path d="M12 21s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7.5 2.8C19.5 16.4 12 21 12 21Z" />
        <path d="M12 11v4M10 13h4" />
      </svg>
    );
  if (name === "Legal")
    return (
      <svg {...common}>
        <path d="M12 4v16M8 20h8M5 7h14M7 7l-3 6a3 3 0 0 0 6 0L7 7ZM17 7l-3 6a3 3 0 0 0 6 0l-3-6Z" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M3 20h18M5 20V10M9.5 20V10M14.5 20V10M19 20V10M2.5 10 12 4l9.5 6h-19Z" />
    </svg>
  );
};

export const Hero = () => {
  const router = useRouter();

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

  // Slide without fading: the headline and lede are the largest paint on
  // the page, so they must be visible before JavaScript runs.
  const rise = (delay: number) => ({
    initial: { y: 18 },
    animate: { y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  const first = HERO.headline[0];
  const last = HERO.headline[HERO.headline.length - 1];

  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-16 pt-28 sm:px-10 md:pt-32 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:pb-16 lg:pt-28"
    >
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <Glow />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
        {/* ------------------------------------------------ words */}
        <div>
          <motion.div {...rise(0.05)} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-raised/80 py-1.5 pl-2.5 pr-3.5 text-xs text-muted shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {HERO.status}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              {HERO.eyebrow}
            </span>
          </motion.div>

          <h1 className="mt-8 text-balance text-[2.6rem] font-medium leading-[1.02] tracking-[-0.045em] text-text sm:text-[3.5rem] lg:text-[3.9rem] xl:text-[4.4rem]">
            <motion.span {...rise(0.12)} className="block max-w-[13ch] lg:max-w-none">
              {first}
            </motion.span>
            <motion.span
              {...rise(0.22)}
              className="text-gradient relative mt-1 inline-block pb-3 pr-3 font-serif text-[1.04em] font-normal italic leading-[1.05] tracking-[-0.03em]"
            >
              {last.replace(/\.$/, "")}
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
              {/* hand-drawn underline, drawn in once */}
              <svg
                aria-hidden
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                className="pointer-events-none absolute bottom-0 left-0 h-3 w-[92%]"
              >
                <defs>
                  <linearGradient id="hero-underline" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" style={{ stopColor: "var(--g1)" }} />
                    <stop offset="55%" style={{ stopColor: "var(--g2)" }} />
                    <stop offset="100%" style={{ stopColor: "var(--g3)" }} />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M2 9 C 60 3, 120 3, 180 7 S 270 11, 298 4"
                  fill="none"
                  stroke="url(#hero-underline)"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.85 }}
                  transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
                />
              </svg>
            </motion.span>
          </h1>

          <motion.p
            {...rise(0.34)}
            className="mt-8 max-w-xl text-pretty text-lg font-light leading-relaxed text-muted md:text-[1.15rem]"
          >
            {HERO.lede}
          </motion.p>

          <motion.div {...rise(0.44)} className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#work">See my work</Button>
            <Button href="#contact" variant="ghost">
              Get in touch
            </Button>
          </motion.div>

          <motion.div
            {...rise(0.54)}
            className="mt-12 grid gap-8 border-t border-line pt-7 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-12"
          >
            <dl className="flex gap-10">
              {HERO.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-2 max-w-[8rem] text-xs leading-snug text-faint">{s.label}</dt>
                  <dd className="text-gradient w-fit pb-1 text-4xl font-light leading-none tracking-tight">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="sm:border-l sm:border-line sm:pl-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                {HERO.sectorsLabel}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {HERO.sectors.map((s) => (
                  <li
                    key={s}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-raised/70 px-3 py-1.5 text-sm text-muted"
                  >
                    <span className="text-accent">
                      <SectorIcon name={s} />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ------------------------------------------------ portrait scene */}
        <motion.div
          initial={{ scale: 0.97 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          <PortraitScene />
        </motion.div>
      </div>

    </section>
  );
};

/* My local time, for the caption. Rendered after mount so the server and
   the browser never disagree about the minute. */
const useLocalTime = (timeZone: string) => {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone });
    const tick = () => setTime(fmt.format(new Date()).replace(/\s?([ap])m$/i, " $1m").toLowerCase());
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
};

/* The photo is a cut-out standing in an arch whose backdrop the theme
   paints, and the arch dissolves into the page. On pointer move the figure
   and the backdrop shift by different amounts — a little depth, nothing
   more. No badges: the words on the left already say what I do. */
const PortraitScene = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 110, damping: 20 };
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), spring);
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), spring);
  /* figure leans with the pointer, backdrop drifts against it */
  const fx = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), spring);
  const fy = useSpring(useTransform(my, [-0.5, 0.5], [-4, 4]), spring);
  const bx = useSpring(useTransform(mx, [-0.5, 0.5], [6, -6]), spring);
  const by = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), spring);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const p = HERO.portrait;
  const time = useLocalTime(p.timeZone);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative px-6 py-8 sm:px-10"
      style={{ perspective: 1200 }}
    >
      {/* one soft light behind the arch */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[78%] w-[78%] rounded-full blur-3xl"
          style={{ background: "var(--accent-vivid)", opacity: "var(--glow-a)" }}
        />
      </div>

      <motion.figure
        style={reduce ? undefined : { rotateX: rx, rotateY: ry }}
        className="relative mx-auto max-w-[360px]"
      >
        <div className="portrait-fade relative aspect-[4/5] overflow-hidden rounded-t-full">
          <motion.div
            aria-hidden
            style={reduce ? undefined : { x: bx, y: by }}
            className="portrait-backdrop absolute -inset-4"
          />
          {/* a hairline doorway inside the arch */}
          <div
            aria-hidden
            className="absolute inset-3 rounded-t-full border"
            style={{ borderColor: "var(--portrait-line)" }}
          />
          <motion.div style={reduce ? undefined : { x: fx, y: fy }} className="absolute inset-0 top-2">
            <Image
              src="/img/portrait-cutout.webp"
              alt="Ajith Thaduri, smiling, in a red shirt"
              fill
              sizes="(max-width: 640px) 80vw, 360px"
              className="object-cover object-bottom"
              priority
            />
          </motion.div>
        </div>

        <figcaption className="relative -mt-8 flex flex-wrap items-end justify-between gap-x-4 gap-y-1 px-2">
          <div>
            <p className="text-xl font-medium tracking-tight text-text">{p.name}</p>
            <p className="mt-1 whitespace-nowrap text-sm text-muted">{p.role}</p>
          </div>
          <p className="min-h-[1.25rem] whitespace-nowrap text-sm text-faint">
            {time && (
              <>
                <span className="text-muted">{time}</span> in {p.city}
              </>
            )}
          </p>
        </figcaption>
      </motion.figure>
    </div>
  );
};
