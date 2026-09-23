"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => {
  // No reduced-motion branch here on purpose: the server can't know the
  // preference, so branching would leave server-rendered content hidden.
  // <MotionConfig reducedMotion="user"> (in SmoothScroll) turns the rise
  // into a plain fade for people who ask for less motion.
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};
