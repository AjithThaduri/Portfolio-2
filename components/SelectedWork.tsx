import Link from "next/link";

const projects = [
    {
        title: "Secure Generative AI Platform",
        type: "Enterprise-Grade Conversational System",
        description: "Controlled LLM behavior with strict PHI/PII protection. Serving tens of thousands of users reliably with compliance-aware document reasoning.",
    },
    {
        title: "Agentic AI Workflow System",
        type: "Autonomous Reasoning & Execution",
        description: "Multi-agent architecture for task orchestration and intelligent tool integration, delivering significant operational efficiency improvements.",
    },
    {
        title: "High-Risk Document Intelligence",
        type: "Secure, Large-Scale Processing",
        description: "Structured data extraction from complex unstructured documents. Deployed in high-security, restricted environments with optimized accuracy.",
    },
    {
        title: "Scalable RAG Infrastructure",
        type: "Production Knowledge Platform",
        description: "Distributed vector search architecture providing real-time retrieval at scale with high availability and near-perfect uptime.",
    }
];

export const SelectedWork = () => {
    return (
        <section className="container mx-auto px-6 py-24">
            <div className="mb-16">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#ff9f43] mb-6">Selected Work</h2>
                <p className="text-xl font-light text-white/70 max-w-xl">
                    Anonymized case studies demonstrating high-impact deployments in regulated industries.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((p, i) => (
                    <div key={i} className="group relative p-10 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-2">

                        <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px]">
                            <div>
                                <span className="text-xs font-bold text-[#ff9f43] mb-3 block uppercase tracking-wider">{p.type}</span>
                                <h3 className="text-3xl font-light mb-4 text-white group-hover:text-[#ff9f43] transition-colors">{p.title}</h3>
                                <p className="text-white/60 leading-relaxed font-light">{p.description}</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                                <span className="text-sm font-medium text-white/40 group-hover:text-white transition-colors">Case Study Locked</span>
                                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-[#ff9f43] group-hover:text-[#ff9f43] transition-all">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
