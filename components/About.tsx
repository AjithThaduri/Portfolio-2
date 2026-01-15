export const About = () => {
    return (
        <section className="min-h-[60vh] flex flex-col justify-center container mx-auto px-6 py-24 text-white/90">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Title Column */}
                <div className="self-start">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#ff9f43] mb-8">Philosophy</h2>
                    <h3 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                        Building AI systems that are <span className="text-[#ff9f43]">operational infrastructure</span>, not experimental demos.
                    </h3>
                </div>

                {/* Text Column */}
                <div className="space-y-8 text-lg md:text-xl font-light text-white/60 leading-relaxed">
                    <p>
                        My work centers on deploying intelligent systems in environments where <span className="text-white font-normal">failures are unacceptable</span>—systems that must be auditable, secure, and controllable by design.
                    </p>
                    <p>
                        I have delivered multiple end-to-end AI platforms, including enterprise- and government-grade conversational and document intelligence systems, all engineered with:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-normal text-white/80">
                        <li className="flex items-center gap-2"><span className="text-[#ff9f43]">●</span> Strict PHI/PII protection</li>
                        <li className="flex items-center gap-2"><span className="text-[#ff9f43]">●</span> Compliance-aware guardrails</li>
                        <li className="flex items-center gap-2"><span className="text-[#ff9f43]">●</span> End-to-end auditability</li>
                        <li className="flex items-center gap-2"><span className="text-[#ff9f43]">●</span> Reliability guarantees</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
