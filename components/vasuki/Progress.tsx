"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/* A hairline on the right edge — the only chrome on the page. */
export const Progress = () => {
  const { scrollYProgress } = useScroll();
  const y = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <div
      aria-hidden
      className="fixed right-0 top-0 z-50 h-full w-px"
      style={{ background: "rgba(255,230,205,0.07)" }}
    >
      <motion.div
        className="w-px origin-top"
        style={{
          scaleY: y,
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(255,180,110,0.9), rgba(255,140,90,0.35))",
        }}
      />
    </div>
  );
};
