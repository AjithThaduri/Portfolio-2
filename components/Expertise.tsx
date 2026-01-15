export const Expertise = () => {
    const domains = [
        {
            category: "AI / ML Frameworks",
            skills: ["LangChain / LangGraph", "Hugging Face Transformers", "OpenAI-compatible APIs", "Advanced Model Tuning"]
        },
        {
            category: "Vector & Data Systems",
            skills: ["Pinecone / Weaviate", "FAISS / Chroma", "PostgreSQL / pgvector", "Distributed Retrieval"]
        },
        {
            category: "Backend & Operations",
            skills: ["Python / FastAPI", "Node.js / Express", "Kubernetes / Docker", "MLOps & CI/CD"]
        },
        {
            category: "AI Security",
            skills: ["PII/PHI Detection", "AI Guardrails", "Observability", "Adversarial Defense"]
        },
        {
            category: "Document Intelligence",
            skills: ["OCR & Text Extraction", "Embeddings & Semantic Search", "Complex Parsing", "Structure Recognition"]
        },
        {
            category: "Frontend",
            skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "D3.js / Visualization"]
        }
    ];

    return (
        <section className="container mx-auto px-6 py-24 border-t border-white/5">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#ff9f43] mb-6">Technical Stack</h2>
                    <p className="text-xl font-light text-white/70 leading-relaxed mb-8">
                        A production-tested toolkit built through real-world AI system delivery. I select tools for stability, scalability, and security.
                    </p>
                    <div className="h-[1px] w-24 bg-[#ff9f43]"></div>
                </div>
                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                    {domains.map((d, i) => (
                        <div key={i}>
                            <h3 className="text-lg font-medium mb-4 text-white/90">{d.category}</h3>
                            <ul className="space-y-2 border-l border-white/10 pl-4">
                                {d.skills.map((s, j) => (
                                    <li key={j} className="text-white/50 text-sm hover:text-white transition-colors cursor-default">
                                        {s}
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
