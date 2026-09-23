"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin accent bar across the top that fills as you read. */
export const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent-vivid"
    />
  );
};
