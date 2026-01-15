export const Experience = () => {
    const roles = [
        {
            title: "AI / ML Consultant",
            focus: "Government-Grade & Enterprise AI Systems",
            period: "Current",
            achievements: [
                "Delivered end-to-end AI platforms with strict compliance and auditability.",
                "Built conversational AI systems with controlled LLM behavior.",
                "Designed agentic systems for autonomous, multi-step reasoning.",
                "Architected RAG pipelines processing high-volume documents."
            ]
        },
        {
            title: "Lead ML Engineer",
            focus: "Large-Scale Document Intelligence Platforms",
            period: "Previous",
            achievements: [
                "Architected document intelligence systems processing massive document streams daily.",
                "Implemented compliance-aware AI guardrails.",
                "Optimized infrastructure to significantly reduce operational costs.",
                "Mentored and guided junior ML engineers."
            ]
        },
        {
            title: "ML Engineer",
            focus: "AI Research & Applied Systems",
            period: "Previous",
            achievements: [
                "Built custom NLP models achieving high domain accuracy.",
                "Developed real-time ML inference APIs at scale.",
                "Designed automated data pipelines improving processing efficiency."
            ]
        }
    ];

    return (
        <section className="container mx-auto px-6 py-24 border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#ff9f43] mb-6">Career Journey</h2>
                    <p className="text-xl font-light text-white/70 max-w-xs leading-relaxed">
                        A consistent track record of delivering production-grade AI systems.
                        <span className="block mt-6 text-white font-normal text-base">
                            Collaborated with 4 major enterprises and associated with 3 innovative startups.
                        </span>
                    </p>
                </div>
                <div className="md:col-span-2 space-y-12">
                    {roles.map((role, i) => (
                        <div key={i} className="group">
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className="text-2xl font-medium text-white">{role.title}</h3>
                                <span className="text-xs uppercase tracking-widest text-white/30">{role.period}</span>
                            </div>
                            <p className="text-sm text-[#ff9f43] font-medium mb-4 uppercase tracking-wide">{role.focus}</p>
                            <ul className="space-y-2">
                                {role.achievements.map((item, j) => (
                                    <li key={j} className="text-white/60 font-light flex items-start gap-3">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
