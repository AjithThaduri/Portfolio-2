"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { HERO, PHOTOS } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Soft lights drifting in front of the greenery, in the photo's own colours.
   Each sits at its own depth (d), so it moves at its own speed. */
const MOTES = [
  { c: "var(--stage-amber)", s: 300, x: "26%", y: "18%", o: 0.3, d: 1.6 },
  { c: "var(--stage-leaf)", s: 420, x: "70%", y: "6%", o: 0.2, d: 0.7 },
  { c: "var(--stage-rose)", s: 240, x: "52%", y: "68%", o: 0.16, d: 1.2 },
  { c: "var(--stage-amber)", s: 160, x: "86%", y: "56%", o: 0.18, d: 2.1 },
];

export const Hero = () => {
  const router = useRouter();
  const reduce = useReducedMotion();

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

  /* ---- depth: scrolling moves each layer at its own speed ---- */
  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start start", "end start"] });
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const subjectY = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const textFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* ---- and the scene leans a little towards the pointer (mouse only) ---- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 70, damping: 20, mass: 0.6 };
  const px = useSpring(mx, spring);
  const py = useSpring(my, spring);
  const plateX = useTransform(px, (v) => v * -14);
  const plateYp = useTransform(py, (v) => v * -10);
  const subjX = useTransform(px, (v) => v * 10);
  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Text slides without fading on load: the headline is the largest paint
  // on the page, so it must be visible before JavaScript runs.
  const rise = (delay: number) => ({
    initial: { y: 22 },
    animate: { y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  });

  const intro = HERO.intro;
  const time = useLocalTime(intro.timeZone);
  const first = HERO.headline[0];
  const last = HERO.headline[HERO.headline.length - 1];
  const { subject, plate } = PHOTOS.hero;

  return (
    <section id="top" className="relative px-2.5 pt-2.5 sm:px-4 sm:pt-4">
      <div
        ref={stage}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="hero-stage relative isolate flex min-h-[calc(100svh-1.25rem)] flex-col overflow-hidden rounded-[26px] sm:min-h-[calc(100svh-2rem)] sm:rounded-[36px] lg:max-h-[1000px] lg:min-h-[660px]"
      >
        {/* 1 — the evening greenery, furthest away */}
        <motion.div
          aria-hidden
          className="absolute -inset-[6%]"
          style={reduce ? undefined : { y: plateY, scale: plateScale }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <motion.div className="absolute inset-0" style={reduce ? undefined : { x: plateX, y: plateYp }}>
            <Image src={plate.src} alt="" fill priority sizes="100vw" className="object-cover object-[50%_40%]" />
          </motion.div>
        </motion.div>

        {/* light: warm behind the head, deep at the edges, darker where the words sit */}
        <div aria-hidden className="stage-light absolute inset-0" />

        {/* 2 — motes of light at their own depths */}
        <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-screen">
          {MOTES.map((m, i) => (
            <Mote key={i} {...m} progress={scrollYProgress} px={px} reduce={!!reduce} />
          ))}
        </div>

        {/* 3 — me, nearest the viewer */}
        <motion.div
          className="pointer-events-none relative mx-auto mt-20 w-[92%] max-w-[560px] sm:mt-24 lg:absolute lg:bottom-0 lg:left-[2%] lg:mx-0 lg:mt-0 lg:w-[54%] lg:max-w-[780px]"
          style={reduce ? undefined : { y: subjectY }}
        >
          <motion.div
            style={reduce ? undefined : { x: subjX }}
            initial={reduce ? false : { y: 36 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, delay: 0.15, ease: EASE }}
          >
            <Image
              src={subject.src}
              alt={PHOTOS.alt}
              width={subject.width}
              height={subject.height}
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>

        {/* the words */}
        <motion.div
          className="relative z-10 -mt-[4vw] flex flex-1 flex-col px-6 pb-12 sm:-mt-10 sm:px-12 lg:mt-0 lg:justify-center lg:pb-16 lg:pl-[54%] lg:pr-14 lg:pt-32 xl:pr-20"
          style={reduce ? undefined : { y: textY, opacity: textFade }}
        >
          <motion.p {...rise(0.25)} className="text-sm leading-relaxed text-[var(--stage-ink-2)]">
            {intro.name}, {intro.line}
            {time && <span className="text-[var(--stage-ink-3)]"> It&apos;s {time} here.</span>}
          </motion.p>

          <h1 className="mt-6 text-balance text-[2.6rem] font-medium leading-[1.02] tracking-[-0.045em] text-[var(--stage-ink)] sm:text-[3.5rem] lg:text-[3.6rem] xl:text-[4.25rem]">
            <motion.span {...rise(0.32)} className="block">
              {first}
            </motion.span>
            <motion.span
              {...rise(0.42)}
              className="mt-1 block font-serif text-[1.06em] font-normal italic leading-[1.04] tracking-[-0.025em] text-[var(--stage-amber)]"
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
            </motion.span>
          </h1>

          <motion.p
            {...rise(0.52)}
            className="mt-7 max-w-[50ch] text-pretty text-lg font-light leading-relaxed text-[var(--stage-ink-2)] md:text-[1.12rem]"
          >
            {HERO.lede}
          </motion.p>

          <motion.div {...rise(0.6)} className="mt-9 flex flex-wrap items-center gap-3">
            <StageButton href="#work" primary>
              See my work
            </StageButton>
            <StageButton href="#contact">Get in touch</StageButton>
          </motion.div>

          <motion.p
            {...rise(0.68)}
            className="mt-12 flex max-w-md items-baseline gap-5 border-t border-[var(--stage-line)] pt-6"
          >
            <span className="text-5xl font-light leading-none tracking-[-0.04em] text-[var(--stage-ink)]">
              {HERO.proof.value}
            </span>
            <span className="text-pretty leading-snug text-[var(--stage-ink-2)]">{HERO.proof.line}</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

/* Buttons that belong to the dark stage, in either theme. */
const StageButton = ({
  href,
  primary = false,
  children,
}: {
  href: string;
  primary?: boolean;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className={`inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 ${
      primary
        ? "bg-[var(--stage-ink)] text-[var(--stage-base)] hover:bg-[var(--stage-amber)]"
        : "border border-[var(--stage-line-strong)] text-[var(--stage-ink)] hover:border-[var(--stage-ink)]"
    }`}
  >
    {children}
  </a>
);

const Mote = ({
  c,
  s,
  x,
  y,
  o,
  d,
  progress,
  px,
  reduce,
}: {
  c: string;
  s: number;
  x: string;
  y: string;
  o: number;
  d: number;
  progress: MotionValue<number>;
  px: MotionValue<number>;
  reduce: boolean;
}) => {
  const ty = useTransform(progress, [0, 1], ["0%", `${-40 * d}%`]);
  const tx = useTransform(px, (v) => v * 24 * d);
  return (
    <motion.span
      className="absolute rounded-full blur-3xl"
      style={{ left: x, top: y, width: s, height: s, background: c, opacity: o, ...(reduce ? {} : { y: ty, x: tx }) }}
    />
  );
};

/* My local time, for the intro line. Rendered after mount so the server and
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
