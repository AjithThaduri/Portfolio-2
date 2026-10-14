"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HERO } from "@/lib/content";
import { Button, Glow } from "./Section";

const EASE = [0.22, 1, 0.36, 1] as const;

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

  const intro = HERO.intro;
  const time = useLocalTime(intro.timeZone);

  const first = HERO.headline[0];
  const last = HERO.headline[HERO.headline.length - 1];

  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-16 pt-28 sm:px-10 md:pt-32 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:pb-16 lg:pt-28"
    >
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <Glow />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
        <motion.div
          initial={{ scale: 1.015 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <PhotoPanel name={intro.name} line={intro.line} time={time} />
        </motion.div>

        <div>
            <h1 className="text-balance text-[2.6rem] font-medium leading-[1.02] tracking-[-0.045em] text-text sm:text-[3.6rem] lg:text-[3.7rem] xl:text-[4.3rem]">
              <motion.span {...rise(0.12)} className="block">
                {first}
              </motion.span>
              <motion.span
                {...rise(0.22)}
                className="text-gradient relative mt-1 inline-block pb-4 pr-4 font-serif text-[1.04em] font-normal italic leading-[1.04] tracking-[-0.03em]"
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
                  className="pointer-events-none absolute bottom-0 left-0 h-3.5 w-[94%]"
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
            className="mt-8 max-w-[52ch] text-pretty text-lg font-light leading-relaxed text-muted md:text-[1.15rem]"
          >
            {HERO.lede}
          </motion.p>
          <motion.div {...rise(0.44)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#work">See my work</Button>
            <Button href="#contact" variant="ghost">
              Get in touch
            </Button>
          </motion.div>
          <motion.p {...rise(0.54)} className="mt-12 flex items-baseline gap-5 border-t border-line pt-7">
            <span className="text-gradient pb-1 text-5xl font-light leading-none tracking-[-0.04em]">
              {HERO.proof.value}
            </span>
            <span className="max-w-[19rem] text-pretty leading-snug text-muted">{HERO.proof.line}</span>
          </motion.p>
        </div>
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

/* The photo, large, in a panel. As the page scrolls the picture drifts a
   little slower than the frame around it — the only motion in the hero. */
const PhotoPanel = ({ name, line, time }: { name: string; line: string; time: string | null }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <figure
      ref={ref}
      className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-surface shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)] sm:aspect-[4/5]"
    >
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-x-0 -top-[7%] h-[114%]">
        <Image
          src="/img/portrait-hero.jpg"
          alt="Ajith Thaduri, smiling, outdoors in the evening"
          fill
          priority
          sizes="(max-width: 1024px) 92vw, 500px"
          className="object-cover object-[50%_24%] sm:object-center"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
        <p className="text-lg font-medium tracking-tight">{name}</p>
        <p className="mt-0.5 text-sm text-white/75">
          {line}
          {time && <> It&apos;s {time} here.</>}
        </p>
      </figcaption>
    </figure>
  );
};
