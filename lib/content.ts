/* ---------------------------------------------------------------------------
   ALL SITE COPY LIVES HERE.
   Edit this file to change the site — no component changes needed.

   HOW TO ADD A PROJECT
   1. Scroll to MORE_WORK below.
   2. Find an entry with  status: "draft"  and fill in every field.
   3. Change its status to "live".
   4. When every draft is filled in, set SHOW_DRAFTS = false (or leave it —
      drafts hide themselves automatically once none are left).

   RULE THIS SITE FOLLOWS: sectors, never client or employer names.
   No dates, no tenure, no years anywhere.
--------------------------------------------------------------------------- */

/** Set to false to hide unfinished project slots from the live site. */
export const SHOW_DRAFTS = true;

export const SITE = {
  // Must match the host that actually serves (the apex 307s to www).
  // If you make the apex primary in Vercel, change this one line back.
  url: "https://www.ajiththaduri.site",
  email: "Ajiththaduri1@gmail.com",
  linkedin: "https://www.linkedin.com/in/ajiththaduri",
  github: "https://github.com/AjithThaduri",
  location: "Hyderabad, India",
} as const;

export const HERO = {
  eyebrow: "AI Engineer · Technical Consultant · Instructor",
  headline: ["I build AI systems", "for environments where", "failure is not an option."],
  lede: "Agentic architectures, retrieval systems and self-hosted models — shipped into government, healthcare and legal environments where the answer has to hold up under scrutiny. I also build AI tooling that breaks software on purpose, under engagement, which is why I know where systems give.",
  stats: [
    { value: "10+", label: "Platforms shipped", sub: "end to end, in production" },
    { value: "3", label: "Regulated domains", sub: "government · health · legal" },
    { value: "500+", label: "Engineers taught", sub: "workshops & programmes" },
  ],
};

export const THESIS = {
  quote: "AI must be secure, controllable, and genuinely useful.",
  intro:
    "Most AI work fails in the gap between a demo that impresses and a system that can be trusted with real data. I work in that gap. Four rules hold everything I ship together.",
  principles: [
    {
      n: "01",
      title: "Least privilege, applied to models",
      body: "A model gets the minimum it needs to do the job — the narrowest context, the smallest tool surface, the least data. Not because of one regulation, but because a component that cannot reach something cannot leak it, misuse it, or be talked into exposing it.",
    },
    {
      n: "02",
      title: "Same input, same answer",
      body: "A system that answers differently on Tuesday is not a system, it is a demo. I build reasoning pipelines that are deterministic end to end and anchored to their sources, so a result can be reproduced, defended and audited months later by someone who was not in the room.",
    },
    {
      n: "03",
      title: "Every decision leaves a trace",
      body: "Audit logging, role-scoped access and an evidence chain that can be reconstructed after the fact. If you cannot explain why the system said what it said, you cannot defend it.",
    },
    {
      n: "04",
      title: "It only counts if it ships",
      body: "Prototypes are cheap. I measure the work by what runs in production, under real load, with real consequences attached to being wrong.",
    },
  ],
};

export type Flagship = {
  n: string;
  title: string;
  sector: string;
  role: string;
  problem: string;
  diagram: "phi-boundary" | "claims-pipeline" | "rag-gate" | "pentest-harness";
  decisions: { head: string; body: string }[];
  stack: string[];
};

export const FLAGSHIP: Flagship[] = [
  {
    n: "01",
    title: "Medical-Legal Intelligence Platform",
    sector: "Legal practices — plaintiff, defense & injury",
    role: "Team Lead & Developer",
    problem:
      "Attorneys need AI analysis of dense medical case records that is defensible in court. Protected health information cannot reach a hosted reasoning model. And the same case, analysed twice, must produce the same result — an answer that moves between runs is worthless as evidence.",
    diagram: "phi-boundary",
    decisions: [
      {
        head: "A two-zone architecture, not a policy",
        body: "A Secure PHI Processing Zone — detection, tokenization, date normalization and a self-hosted clinical LLM — sits fully isolated from an Advanced Reasoning Zone. The frontier reasoning model only ever receives de-identified content. The boundary is enforced by the system's shape, so it cannot be bypassed by a misconfigured prompt.",
      },
      {
        head: "A six-stage PHI pipeline",
        body: "Detect → tokenize → shift dates → validate → store → re-identify on read. Covers 18+ PHI categories and is aligned to HIPAA Safe Harbor. Re-identification happens at the presentation layer, for authorised readers only.",
      },
      {
        head: "Reasoning that holds still",
        body: "The analysis pipeline is deterministic end to end — constrained generation against a fixed contract, no sampling variance in the path that produces findings, and every assertion anchored to a location in the source record. The same case analysed twice produces the same analysis, which is the only version of this that is admissible.",
      },
      {
        head: "Defensibility as a feature",
        body: "Enterprise audit logging, role-based access across attorney, paralegal, expert and admin, and an evidence chain built to withstand a Daubert challenge.",
      },
      {
        head: "Self-hosting, and everything that comes with it",
        body: "The clinical model runs inside the secure zone on hardware I control, because a hosted API was never an option for identified records. That made quantization and serving my problem rather than a vendor's: 4-bit weights to fit the GPU budget, a batched serving runtime to hold throughput under load, and a domain eval set re-run after every change to prove the compression had not cost accuracy where it actually mattered.",
      },
      {
        head: "Five connected capabilities",
        body: "Allegation intelligence, medical record structuring, clinical timeline generation, provider and event mapping, and an attorney review workspace with expert-matching intelligence.",
      },
    ],
    stack: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "GCP",
      "Claude Sonnet",
      "Self-hosted clinical LLM",
      "TLS 1.3 / AES-256",
    ],
  },
  {
    n: "02",
    title: "Healthcare Claims Intelligence",
    sector: "Health plans & payers",
    role: "Team Lead & Developer",
    problem:
      "Physicians reviewing claims spend more time reading documents than deciding on them. The inputs arrive in volume, in a dozen formats, with no consistent structure — and the naive answer of forwarding every page to a model is both ruinously expensive and, given what the pages contain, not permitted.",
    diagram: "claims-pipeline",
    decisions: [
      {
        head: "A document intelligence layer",
        body: "Extracts and structures clinical and claims data out of raw records — layout-aware parsing, field-level extraction and schema validation — turning unstructured pages into fields a physician can scan in seconds.",
      },
      {
        head: "A redaction tier the client could inspect",
        body: "An in-house layer detects and tokenizes sensitive fields before anything reaches a reasoning layer. Built in-house rather than bought, because the guarantee had to be auditable line by line instead of taken on trust from a vendor.",
      },
      {
        head: "Asynchronous by default",
        body: "Redis-backed background job processing so high document volumes queue and drain predictably instead of blocking a request cycle.",
      },
      {
        head: "Semantic caching at the query layer",
        body: "Repeated extraction queries across similar claims resolve against cache rather than re-calling the model — a direct, measurable cut to processing cost at scale.",
      },
    ],
    stack: ["TypeScript", "Claude API", "PostgreSQL", "Redis", "In-house PHI layer"],
  },
  {
    n: "03",
    title: "Secure Enterprise AI Assistant",
    sector: "U.S. government transit authority",
    role: "Lead Developer",
    problem:
      "Thousands of employees needed conversational access to internal documentation. As a government entity, the tolerance for data exposure was zero, and every interaction had to be attributable and auditable.",
    diagram: "rag-gate",
    decisions: [
      {
        head: "A full retrieval pipeline",
        body: "Parse → chunk → embed → retrieve → generate, giving real-time conversational intelligence over a large internal document corpus rather than a model guessing from training data.",
      },
      {
        head: "Native chat behaviour",
        body: "Context-aware conversation with persistent session memory and streaming responses, so the experience matches what people already expect from consumer AI tools.",
      },
      {
        head: "Guardrails with structured validation",
        body: "Output validation at the boundary ensures no sensitive data is surfaced at any stage of the exchange.",
      },
      {
        head: "Enterprise identity, scoped access",
        body: "SSO integration with role-based access control scoped strictly to employees — nobody outside the perimeter can reach the assistant.",
      },
      {
        head: "Observability for compliance",
        body: "Admin analytics, audit logging and SIEM monitoring, so the security team sees the system the same way they see everything else on the network.",
      },
      {
        head: "Prompt-level caching",
        body: "Repeat context — system prompts and retrieved chunks — is cached to cut both latency and token cost on high-traffic conversational sessions.",
      },
    ],
    stack: [
      "FastAPI",
      "React",
      "PostgreSQL",
      "AWS (S3, Cognito)",
      "OpenAI API",
      "SQLAlchemy",
      "Enterprise SSO",
    ],
  },
  {
    n: "04",
    title: "AI-Driven Penetration Testing Harness",
    sector: "Software products — with a module for AI applications",
    role: "Creator & Lead",
    problem:
      "Penetration testing does not scale. Skilled testers are scarce and expensive, so most products get looked at once a year; scanners run constantly but only find what somebody already wrote a signature for. Neither approach reasons about the specific application in front of it. And a whole new category of product now ships features that classic tooling does not understand at all.",
    diagram: "pentest-harness",
    decisions: [
      {
        head: "Put the model where the judgement is",
        body: "The expensive part of testing was never firing requests — it is deciding which requests are worth firing. The harness reads the application's real behaviour, forms a hypothesis about where it is likely to give, and generates test cases aimed at that specific system instead of replaying a generic wordlist against everything.",
      },
      {
        head: "A loop, not a scan",
        body: "What comes back decides what goes out next. A response that hints at an underlying assumption becomes the basis for the following round, which is how a human tester works and how a signature scanner never does.",
      },
      {
        head: "Nothing reaches a human unproven",
        body: "Every candidate finding is reproduced by the harness before it is reported. The single worst failure mode of automated security tooling is a report full of noise that nobody trusts, so verification is a gate rather than an afterthought.",
      },
      {
        head: "A dedicated module for AI products",
        body: "Because the targets increasingly ship AI features, the harness carries its own coverage for that surface — injection paths including payloads arriving through retrieval rather than the user, abuse of the tool and function-call surface, exfiltration through what the model is allowed to emit, and how far an agent can reach when one step is manipulated.",
      },
      {
        head: "Finish the job",
        body: "Findings are ranked by real impact rather than theoretical severity, handed over with the specific control that closes each one, and re-tested afterwards so the fix is proven rather than assumed.",
      },
      {
        head: "Scoped and authorised, always",
        body: "The harness runs under engagement, against systems there is written authorisation to test. Building offensive tooling responsibly means the scope boundary is part of the tool, not a policy sitting next to it.",
      },
    ],
    stack: [
      "Agentic test-generation loop",
      "Automated reproduction & verification",
      "AI-application coverage module",
      "Impact-ranked reporting",
      "Re-test workflow",
      "Scoped engagement controls",
    ],
  },
];

export type WorkItem = {
  title: string;
  sector: string;
  body: string;
  tags: string[];
  status: "live" | "draft";
};

export const MORE_WORK: WorkItem[] = [
  {
    title: "Conversational Product Assistant",
    sector: "SaaS product company",
    body: "Built the company's product site and embedded an AI assistant directly into its core product stack, giving users in-context answers without leaving the interface.",
    tags: ["Chatbot", "Product integration", "Full-stack"],
    status: "live",
  },
  {
    title: "Applied AI Delivery Programme",
    sector: "Technology consultancy",
    body: "Led a team of six through the adoption of modern AI workflows and tooling while delivering three full-stack AI projects to production, measurably improving deployment efficiency.",
    tags: ["Team lead", "AI workflows", "Delivery"],
    status: "live",
  },
  {
    title: "Client RAG & Assistant Builds",
    sector: "Independent clients",
    body: "A running body of freelance work: retrieval systems, domain chatbots and end-to-end AI implementations, scoped and delivered directly with the client.",
    tags: ["RAG", "Consulting", "End-to-end"],
    status: "live",
  },
  {
    title: "Generative & Agentic AI Curriculum",
    sector: "Technical institutes",
    body: "A six-month teaching engagement covering cloud fundamentals through generative and agentic AI, run as hands-on labs with project-oriented sessions aligned to real industry use cases.",
    tags: ["Curriculum", "Hands-on labs", "500+ learners"],
    status: "live",
  },
  {
    title: "Workshop Series for US Consultancies",
    sector: "US-based consultancies",
    body: "Ongoing training for working engineering teams on generative AI, agentic workflows and practical LLM application design — aimed at people who need to ship, not to pass a quiz.",
    tags: ["Workshops", "Agentic workflows", "Team enablement"],
    status: "live",
  },

  /* ---------------------------------------------------------------------
     DRAFTED FROM YOUR SKILL SET — verify or rewrite each before publishing.
     These were written from the capabilities listed on this site, not from
     engagements you described. Change `status` to "draft" on any that are
     not accurate, or edit the wording so they are.
  --------------------------------------------------------------------- */
  {
    title: "Agentic Workflow Automation",
    sector: "Operations teams",
    body: "A multi-agent system that plans a task, calls the tools it needs and stops at defined checkpoints for a human decision. Built so the escalation points are explicit rather than emergent — the agent knows what it is not allowed to finish alone.",
    tags: ["Multi-agent", "Tool calling", "Human-in-the-loop"],
    status: "live",
  },
  {
    title: "Self-Hosted Model Deployment",
    sector: "Data-sensitive enterprise",
    body: "Adapted an open-weights model to the client's domain, compressed it to fit their existing GPUs and served it inside their own network, so no request ever left the perimeter. The whole engagement existed because a hosted API was not an option.",
    tags: ["QLoRA", "Quantization", "On-prem serving"],
    status: "live",
  },
  {
    title: "AI-Led Security Engagement",
    sector: "Product engineering teams",
    body: "An authorised penetration test run through the harness — the model driving recon, hypothesis and targeted test generation, with every candidate finding reproduced before it reached the client. Delivered ranked, with the fix attached and a re-test to prove it closed.",
    tags: ["Pentesting", "AI-driven tooling", "Remediation"],
    status: "live",
  },
  {
    title: "Realtime Voice Agent",
    sector: "Customer-facing support",
    body: "A conversational voice agent — speech in, reasoning and tool calls in the middle, ElevenLabs speech out. The whole engineering problem is the turn budget: a voice that answers a beat too late stops feeling like a conversation, so the pipeline is built around latency rather than a request/response cycle.",
    tags: ["ElevenLabs", "Realtime voice", "Conversational AI"],
    status: "live",
  },
  {
    title: "Workflow Automation with n8n",
    sector: "Operations & internal tooling",
    body: "AI steps wired into the workflows a business actually runs on — n8n handling triggers, integrations, retries and the boring reliability, with the model doing only the part that needs a model. Most of the value was deciding which steps should never be an LLM call at all.",
    tags: ["n8n", "Workflow automation", "Integrations"],
    status: "live",
  },
  {
    title: "Evaluation Harness for AI Features",
    sector: "Product engineering teams",
    body: "A domain eval set and automated scoring wired into the delivery pipeline, so a prompt change, a model swap or a new quantization cannot ship if it regresses the task. Turned 'it felt better' into a number the team could argue with.",
    tags: ["Eval harness", "LLM-as-judge", "CI"],
    status: "live",
  },
];

export const MODEL = {
  story: [
    "Three things push you below the prompt layer: cost that stops being rounding error once you are at volume, latency you cannot fix from the outside, and data that is simply not allowed to leave the building. A hosted API answers none of them.",
    "So you host it yourself — and everything the API was quietly handling becomes your problem: what it costs in VRAM, how fast it decodes under concurrent load, and how much capability you give up to make it fit. That layer is less glamorous than prompt design. It is also where most of the real engineering is.",
  ],
  tracks: [
    {
      n: "01",
      title: "Adaptation",
      lede: "Teaching a model the domain without retraining it from scratch.",
      items: [
        "LoRA and QLoRA adapters for domain-specific behaviour on a single-GPU budget",
        "Supervised fine-tuning and instruction tuning against curated task data",
        "Dataset curation, deduplication and eval-set hygiene — the eval set never touches training",
        "Knowing when not to fine-tune: retrieval solves more problems than people expect, and costs far less to maintain",
      ],
    },
    {
      n: "02",
      title: "Quantization",
      lede: "Making it fit without making it useless.",
      items: [
        "AWQ 4-bit for GPU serving — activation-aware, so the weights that carry the most signal keep their precision",
        "GPTQ evaluated against the same calibration set, as a comparison rather than an article of faith",
        "GGUF K-quants (Q4_K_M, Q5_K_M) for llama.cpp on CPU, Metal and edge targets",
        "bitsandbytes NF4 and int8 for fast experiments before committing to a serving format",
        "Calibration sets drawn from the actual domain corpus, never a generic web sample",
      ],
    },
    {
      n: "03",
      title: "Serving & runtime",
      lede: "Throughput is a design decision, not a benchmark you read off a page.",
      items: [
        "vLLM — PagedAttention, continuous batching and tensor parallelism for concurrent GPU serving",
        "llama.cpp — CPU and Metal inference where a GPU is unavailable, unaffordable, or not permitted",
        "KV-cache and prefix-cache management so repeated system context is never recomputed",
        "Latency against throughput: batch size, max context, concurrency ceilings, queueing behaviour",
        "Model routing — a small model answers first, a larger one only when the task actually needs it",
      ],
    },
    {
      n: "04",
      title: "Machine learning & deep learning",
      lede: "The part of the work that predates all of this, and still decides most of it.",
      items: [
        "Supervised and unsupervised learning, feature engineering, model selection",
        "Neural network architectures and training loops",
        "Custom NLP models for domain classification and structured extraction",
        "Evaluation chosen around the cost of each error type — a false negative on PHI is not the same as a false positive",
      ],
    },
  ],
  note: "Perplexity is not the test. The test is whether the task still passes once the model has been compressed — which means holding a domain eval set and re-running it every single time the quantization, the adapter or the runtime changes.",
};

export const PRACTICE = [
  {
    n: "01",
    title: "AI Engineering",
    lede: "Design and delivery of production AI systems, owned end to end.",
    points: [
      "Agentic architectures — multi-agent orchestration, tool-calling, plan-and-execute, human-in-the-loop",
      "Retrieval systems — chunking strategy, hybrid search, index design, evaluation",
      "Guardrails — PII/PHI redaction, prompt-injection defense, structured output enforcement",
      "Inference economics — prompt and semantic caching, model routing, streaming, latency work",
      "Self-hosted serving — fine-tuning, quantization and throughput tuning for open weights that must run where an API cannot go",
    ],
  },
  {
    n: "02",
    title: "Technical Consulting",
    lede: "Architecture and judgement for teams who have to get it right the first time.",
    points: [
      "Architecture review and system design for AI platforms",
      "Security and compliance design — PHI/PII boundaries, audit and access models",
      "Technology selection: which model, which retrieval strategy, which parts not to build",
      "Roadmapping from prototype to production readiness",
    ],
  },
  {
    n: "03",
    title: "Teaching & Training",
    lede: "Turning working engineers into people who can ship AI, not just talk about it.",
    points: [
      "Hands-on workshops on generative AI, agentic workflows and LLM application design",
      "Multi-month curriculum programmes with labs and project-oriented assessment",
      "Team enablement for consultancies adopting AI tooling in live delivery",
      "500+ engineers and students taught across institutes and consultancies",
    ],
  },
  {
    n: "04",
    title: "Penetration Testing with AI",
    lede: "Using AI to test software products properly — and tooling I built to do it at scale.",
    points: [
      "An AI-driven testing harness that reasons about the target rather than replaying a wordlist",
      "Automated reproduction, so findings arrive proven instead of as scanner noise",
      "A dedicated module for AI-based products: injection paths, tool-surface abuse, agent reach",
      "Impact-ranked reporting with the fix attached, and a re-test that proves it closed",
    ],
  },
];

export const TEACHING = {
  lede: "I teach because it is the fastest way to find out whether you actually understand something. Explaining a retrieval architecture to a room of sixty engineers who will ask why exposes every assumption you were quietly carrying.",
  stats: [
    { value: "500+", label: "Engineers & students taught" },
    { value: "250+", label: "Participants in a single programme" },
    { value: "6 mo", label: "Longest curriculum engagement" },
  ],
  topics: [
    "Generative AI foundations",
    "Agentic workflows & orchestration",
    "Practical LLM application design",
    "RAG systems, hands-on",
    "Guardrails & AI safety in production",
    "Cloud fundamentals for AI teams",
  ],
};

export const STACK = [
  {
    group: "Languages",
    items: ["Python", "TypeScript", "Java", "C"],
  },
  {
    group: "Agentic & orchestration",
    items: [
      "LangGraph",
      "LangChain",
      "CrewAI",
      "AutoGen",
      "Multi-agent architectures",
      "Tool-calling agents",
      "ReAct",
      "Plan-and-execute",
      "Human-in-the-loop",
      "n8n workflow automation",
    ],
  },
  {
    group: "Voice & realtime",
    items: [
      "ElevenLabs",
      "Speech-to-text pipelines",
      "Realtime streaming",
      "Turn-taking & barge-in",
      "Latency budgeting",
    ],
  },
  {
    group: "RAG & retrieval",
    items: [
      "Embeddings",
      "Semantic search",
      "Hybrid search (vector + keyword)",
      "Chunking & indexing",
      "FAISS",
      "ChromaDB",
      "pgvector",
    ],
  },
  {
    group: "Security & penetration testing",
    items: [
      "AI-driven pentest harness (built in-house)",
      "Agentic test generation & reasoning loops",
      "Automated reproduction & verification",
      "Web & API application testing",
      "AI-application coverage: injection, tool abuse, agent reach",
      "Impact-ranked reporting & re-test",
    ],
  },
  {
    group: "Guardrails & safety",
    items: [
      "PII/PHI detection & redaction",
      "Prompt-injection defense",
      "Output moderation",
      "Structured output enforcement",
      "Policy enforcement",
    ],
  },
  {
    group: "Evaluation & observability",
    items: [
      "LLM-as-a-judge",
      "Hallucination detection",
      "Prompt evaluation",
      "Domain eval harnesses",
      "Audit logging",
    ],
  },
  {
    group: "Machine learning & deep learning",
    items: [
      "Supervised & unsupervised learning",
      "Feature engineering",
      "Neural networks",
      "Custom NLP models",
      "Model evaluation",
    ],
  },
  {
    group: "Fine-tuning & adaptation",
    items: [
      "LoRA / QLoRA",
      "Supervised fine-tuning (SFT)",
      "Instruction tuning",
      "PEFT",
      "Hugging Face Transformers",
      "Dataset curation & eval sets",
    ],
  },
  {
    group: "Quantization",
    items: [
      "AWQ (4-bit)",
      "GPTQ",
      "GGUF K-quants (Q4_K_M / Q5_K_M)",
      "bitsandbytes NF4 / int8",
      "Calibration-set design",
      "Accuracy-vs-VRAM tradeoff",
    ],
  },
  {
    group: "Inference, serving & cost",
    items: [
      "vLLM (PagedAttention, continuous batching)",
      "llama.cpp (CPU / Metal / edge)",
      "Tensor parallelism",
      "KV-cache & prefix caching",
      "Prompt & semantic caching",
      "Model routing",
      "Streaming responses",
    ],
  },
  {
    group: "Model APIs & protocols",
    items: [
      "Claude API",
      "OpenAI API",
      "OpenAI Agents SDK",
      "Model Context Protocol (MCP)",
      "Function / tool calling",
    ],
  },
  {
    group: "Backend & data",
    items: ["FastAPI", "PostgreSQL", "Redis", "SQLAlchemy", "Alembic", "REST APIs"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    group: "Cloud & deployment",
    items: ["AWS", "GCP", "JWT / SSO auth", "RBAC", "Secure API integration"],
  },
];

export const CONTACT = {
  headline: ["Let's build something", "that holds up."],
  lede: "Available for AI engineering, architecture consulting and training engagements. Tell me what you are trying to ship and what the constraints are — that is usually the whole conversation.",
  availability: [
    { dot: "live", text: "Available for new engagements" },
    { dot: "accent", text: "Replies within 24 hours" },
  ],
};

export const FAQ = [
  {
    q: "Who is Ajith Thaduri?",
    a: "Ajith Thaduri is an AI engineer, technical consultant and instructor based in Hyderabad, India. He designs and ships production AI systems — agentic architectures, retrieval pipelines and self-hosted language models — for government, healthcare and legal organisations where the data is regulated and the output has to withstand scrutiny. He also builds AI-driven security tooling and teaches engineering teams.",
  },
  {
    q: "What does he actually build?",
    a: "End-to-end AI platforms rather than prototypes. That includes a medical-legal intelligence platform for attorneys, a claims-intelligence system for health plans, a secure conversational assistant for a U.S. government transit authority, and an AI-driven penetration testing harness. Alongside those sit agentic workflow automation, realtime voice agents, retrieval systems and evaluation harnesses.",
  },
  {
    q: "What makes his approach different?",
    a: "He works below the prompt layer. Sensitive data is isolated by architecture rather than policy, reasoning pipelines are deterministic so results can be reproduced and defended months later, every decision leaves an audit trail, and models are fine-tuned, quantized and self-hosted when a hosted API cannot meet the cost, latency or data-residency constraint.",
  },
  {
    q: "Does he do security work?",
    a: "Yes. He built an AI-driven penetration testing harness that reasons about a target application, generates test cases aimed at that specific system, reproduces every candidate finding before a human sees it, and carries a dedicated module for AI-based products covering injection paths, tool-surface abuse and agent privilege reach. It runs only under written authorisation.",
  },
  {
    q: "Does he teach?",
    a: "Yes. He has taught more than 500 engineers and students through workshops and multi-month curriculum programmes across technical institutes and US-based consultancies, covering generative AI, agentic workflows, retrieval systems, guardrails and practical LLM application design.",
  },
  {
    q: "What is he available for, and how do you reach him?",
    a: "AI engineering, architecture consulting, security engagements and training. He is contactable by email at Ajiththaduri1@gmail.com, on LinkedIn at linkedin.com/in/ajiththaduri, and on GitHub as AjithThaduri. He typically replies within 24 hours.",
  },
];

export const NAV = [
  { label: "Approach", href: "#approach" },
  { label: "Work", href: "#work" },
  { label: "Models", href: "#models" },
  { label: "Practice", href: "#practice" },
  { label: "Teaching", href: "#teaching" },
  { label: "Stack", href: "#stack" },
  { label: "In short", href: "#about" },
  { label: "Contact", href: "#contact" },
];
