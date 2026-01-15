"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { createContext, useContext } from "react";

const ScrollContext = createContext<MotionValue<number> | null>(null);

export const useScrollContext = () => {
    const context = useContext(ScrollContext);
    if (!context) throw new Error("useScrollContext must be used within ScrollyCanvas");
    return context;
};

export const Overlay = () => {
    const scrollYProgress = useScrollContext();

    // Slide 1: Hero Identity (Visible 0% - 15%)
    const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const scale1 = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

    // Slide 2: Trust/Impact (20% - 35%)
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.4], [50, -50]);

    // Slide 3: Philosophy Quote (45% - 60%)
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.5, 0.6, 0.65], [0, 1, 1, 0]);

    // Slide 4: Building Intro (70% - 85%)
    const opacity4 = useTransform(scrollYProgress, [0.7, 0.75, 0.85, 0.9], [0, 1, 1, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-center z-10 px-6">

            {/* Slide 1: Main Title (Ref Image Style) */}
            <motion.div style={{ opacity: opacity1, scale: scale1 }} className="flex flex-col items-center w-full px-4 text-center">
                <span className="text-[#ff9f43] text-[10px] md:text-sm font-bold tracking-[0.3em] uppercase mb-4">
                    AI/ML Engineer
                </span>
                <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] mb-8">
                    <span className="text-white block md:inline">Ajith</span>
                    <span className="text-[#ff9f43] block md:inline">Thaduri</span>
                </h1>
                <p className="max-w-2xl text-base sm:text-xl md:text-2xl font-light text-white/90 leading-relaxed">
                    Building intelligent systems that are <span className="font-medium text-white">secure</span>, <span className="font-medium text-white">scalable</span>, and <span className="font-medium text-white">genuinely impactful</span>.
                </p>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-pulse">
                    <div className="w-[1px] h-8 bg-white/50"></div>
                    <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
                </div>
            </motion.div>

            {/* Slide 2: Impact Snapshot */}
            <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute text-center max-w-4xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">Impact Snapshot</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-[#ff9f43] mb-2">20+</div>
                        <div className="text-xs uppercase tracking-widest text-white/60">Production<br />Systems</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-[#ff9f43] mb-2">100%</div>
                        <div className="text-xs uppercase tracking-widest text-white/60">Client<br />Satisfaction</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-[#ff9f43] mb-2">99.9%</div>
                        <div className="text-xs uppercase tracking-widest text-white/60">System<br />Uptime</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-[#ff9f43] mb-2">High</div>
                        <div className="text-xs uppercase tracking-widest text-white/60">Risk<br />Deployments</div>
                    </div>
                </div>
            </motion.div>

            {/* Slide 3: Philosophy Quote */}
            <motion.div style={{ opacity: opacity3 }} className="absolute max-w-4xl text-center">
                <blockquote className="text-3xl md:text-5xl font-light leading-tight italic text-white/90">
                    &quot;AI must be secure, controllable, and genuinely useful.&quot;
                </blockquote>
                <p className="mt-8 text-sm uppercase tracking-widest text-[#ff9f43]">Core Philosophy</p>
            </motion.div>

            {/* Slide 4: Transition */}
            <motion.div style={{ opacity: opacity4 }} className="absolute text-center max-w-3xl">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Technical Excellence</h2>
                <p className="text-xl text-white/70">From research concepts to production-ready platforms.</p>
            </motion.div>

        </div>
    );
};

export { ScrollContext };
