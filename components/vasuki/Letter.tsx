"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tileStyle } from "./sprite";

/* Act IV. The words get the room to themselves; a few photographs drift at the
   margins so she is never quite out of frame. */
export const Letter = ({ message, signature }: { message: string; signature: string }) => {
  const reduce = useReducedMotion();
  const edges = [3, 17, 29, 41, 8, 52];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-28 sm:px-12">
      <div aria-hidden className="absolute inset-0 hidden lg:block">
        {edges.map((k, i) => {
          const left = i < 3;
          return (
            <div
              key={k}
              className="absolute aspect-[3/4] w-[13vw] max-w-[190px] rounded-sm bg-cover opacity-[0.16]"
              style={{
                ...tileStyle(k),
                [left ? "left" : "right"]: `${2 + (i % 3) * 3}vw`,
                top: `${8 + (i % 3) * 30}%`,
                transform: `rotate(${(i % 2 ? 1 : -1) * (2 + i)}deg)`,
                animation: reduce
                  ? undefined
                  : `vasuki-float ${16 + i * 3}s ease-in-out ${i * 1.4}s infinite alternate`,
              }}
            />
          );
        })}
      </div>

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 50%, rgba(7,6,10,0.4), rgba(7,6,10,0.92) 75%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.span
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9 }}
          className="block text-2xl"
          style={{ color: "#ffd6a0" }}
        >
          ✦
        </motion.span>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 text-balance text-2xl font-light italic leading-[1.35] sm:text-4xl md:text-[2.9rem]"
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            color: "rgba(255,244,232,0.94)",
          }}
        >
          {message}
        </motion.p>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 font-mono text-[11px] uppercase tracking-[0.34em]"
          style={{ color: "rgba(255,214,160,0.6)" }}
        >
          {signature}
        </motion.p>
      </div>
    </section>
  );
};
