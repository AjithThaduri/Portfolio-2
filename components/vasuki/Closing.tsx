"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/* Act V. The photograph is portrait and full length, so on a wide screen it
   hangs as a print rather than being cropped to a letterbox. */
export const Closing = ({ name }: { name: string }) => {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* a blurred wash of the same photograph fills the room behind it */}
      <div
        aria-hidden
        className="absolute inset-0 scale-110 bg-cover bg-center opacity-[0.22] blur-3xl"
        style={{ backgroundImage: "url(/vasuki/closing.webp)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 50%, rgba(6,5,9,0.72), rgba(6,5,9,0.95) 80%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center gap-12 px-6 py-20 sm:px-10 lg:flex-row lg:gap-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[300px] shrink-0 sm:max-w-[360px] lg:max-w-[420px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/vasuki/closing.webp"
            alt={`${name}`}
            className="block h-auto w-full rounded-[3px]"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,226,196,0.14), 0 50px 120px -30px rgba(0,0,0,0.95), 0 0 140px -40px rgba(255,180,110,0.35)",
            }}
          />
        </motion.div>

        <div className="w-full text-center lg:text-left">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.4rem] leading-[1] sm:text-[3.6rem] lg:text-[4.6rem]"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              letterSpacing: "-0.02em",
              color: "#fff3e4",
              textShadow: "0 16px 60px rgba(0,0,0,0.8)",
            }}
          >
            Happy birthday,
            <br />
            {name}.
          </motion.p>

          {/* ----------------------------------------------------------------
              CHARACTER WISH GOES HERE.
              Drop a <video src="/vasuki/wish.mp4" controls playsInline /> or an
              <audio> element inside this block and it sits in the layout.
          ---------------------------------------------------------------- */}

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex items-center justify-center gap-6 lg:justify-start"
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "rgba(255,230,205,0.42)" }}
            >
              ✦
            </span>
            <span
              aria-hidden
              className="h-px w-24 flex-none lg:w-40"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,180,110,0.45), transparent)",
              }}
            />
            <Link
              href="/"
              className="font-mono text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
              style={{ color: "rgba(255,230,205,0.36)" }}
            >
              ← back
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
