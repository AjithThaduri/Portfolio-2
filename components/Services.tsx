export const Services = () => {
    const services = [
        {
            title: "Generative AI Development",
            description: "Custom LLM applications with controlled behavior, context awareness, and model fine-tuning."
        },
        {
            title: "Agentic AI Systems",
            description: "Autonomous agents capable of complex reasoning, multi-step execution, and tool orchestration."
        },
        {
            title: "Secure AI Deployment",
            description: "Enterprise-grade AI with PHI/PII protection, guardrails, and audit logging."
        },
        {
            title: "Document Intelligence",
            description: "High-accuracy processing of unstructured data, OCR, and semantic search at scale."
        },
        {
            title: "AI Architecture & Consulting",
            description: "Strategic guidance, system design, roadmapping, and technology selection."
        },
        {
            title: "Team Training",
            description: "Hands-on workshops for engineering teams on LLMs, RAG, and best practices."
        }
    ];

    return (
        <section className="container mx-auto px-6 py-24 border-t border-white/5 bg-white/[0.02]">
            <div className="text-center mb-16">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#ff9f43] mb-4">What I Offer</h2>
                <p className="text-2xl font-light text-white/90 max-w-2xl mx-auto">
                    End-to-end AI solutions tailored for security, scale, and real-world constraints.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((item, i) => (
                    <div key={i} className="p-8 border border-white/5 bg-[#0f0f0f] hover:border-[#ff9f43]/30 transition-colors duration-300">
                        <h3 className="text-xl font-medium text-white mb-4">{item.title}</h3>
                        <p className="text-white/60 font-light leading-relaxed text-sm">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
