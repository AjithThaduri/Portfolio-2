const ITEMS = [
  "Agentic orchestration",
  "Retrieval-augmented generation",
  "LoRA / QLoRA fine-tuning",
  "AWQ & GGUF quantization",
  "vLLM serving",
  "llama.cpp on edge",
  "Multi-agent tool calling",
  "Structured output enforcement",
  "Semantic & prompt caching",
  "Document intelligence",
  "Model routing",
  "Guardrails & evaluation",
  "AI-driven pentesting",
  "Realtime voice agents",
  "n8n automation",
  "Automated exploit verification",
  "Hybrid search",
  "Deep learning",
];

export const Ticker = () => (
  <div
    aria-hidden
    className="relative flex overflow-hidden border-t border-line bg-surface py-5"
  >
    <div className="animate-ticker flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-faint"
        >
          {item}
          <span className="h-1 w-1 rounded-full bg-accent-vivid" />
        </span>
      ))}
    </div>
  </div>
);
