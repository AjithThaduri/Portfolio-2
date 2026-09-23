"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export const Reveal = ({
  children,
  delay = 0,
  className,
  fade = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** false for above-the-fold content: slide without fading, so the text
      is visible (and counts as painted) before JavaScript loads. */
  fade?: boolean;
}) => {
  // No reduced-motion branch here on purpose: the server can't know the
  // preference, so branching would leave server-rendered content hidden.
  // <MotionConfig reducedMotion="user"> (in SmoothScroll) turns the rise
  // into a plain fade for people who ask for less motion.
  return (
    <motion.div
      className={className}
      initial={fade ? { opacity: 0, y: 18 } : { y: 12 }}
      whileInView={fade ? { opacity: 1, y: 0 } : { y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};
