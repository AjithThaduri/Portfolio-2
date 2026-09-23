/* ---------------------------------------------------------------------------
   ALL SITE COPY LIVES HERE.
   Edit this file to change the site — no component changes needed.

   PAGES
   /                 HERO, FLAGSHIP (as cards), MORE_WORK, PRINCIPLES, HELP
   /work/[slug]      one FLAGSHIP entry in full
   /about            ABOUT, MODEL, STACK, FAQ
   /teaching         TEACHING
   /work             WORK_INDEX (every FLAGSHIP + MORE_WORK, filterable)
   /capabilities/*   CAPABILITIES
   /work-with-me     ENGAGE
   /blueprints       BLUEPRINTS_INTRO — articles themselves are MDX files in
                     content/blueprints/ (see lib/blueprints.ts)
   /open-source      OPEN_SOURCE — my public repos and the ones I rely on
   /glossary         lib/glossary.ts
   every page        CONTACT (bottom), NAV (top)

   HOW TO ADD A PROJECT
   1. Scroll to MORE_WORK below.
   2. Add an entry (or find one with  status: "draft") and fill in every field.
   3. Set its status to "live".
   The home page shows the first MORE_WORK_INITIAL entries; the rest sit behind
   a "Show more" button, so order the list by what you most want seen.

   HOUSE RULES
   - Sectors, never client or employer names.
   - No dates, no tenure, no years anywhere.
   - Voice: first person, calm and specific. Say what was built and why;
     let the detail carry the weight rather than adjectives or slogans.
--------------------------------------------------------------------------- */

/** Set to false to hide unfinished project slots from the live site. */
export const SHOW_DRAFTS = true;

/** How many "Also built" cards show before the "Show more" button. */
export const MORE_WORK_INITIAL = 3;

export const SITE = {
  // Must match the host that actually serves (the apex 307s to www).
  // If you make the apex primary in Vercel, change this one line back.
  url: "https://www.ajiththaduri.site",
  email: "Ajiththaduri1@gmail.com",
  linkedin: "https://www.linkedin.com/in/ajiththaduri",
  github: "https://github.com/AjithThaduri",
  location: "Hyderabad, India",
} as const;

export const NAV = [
  { label: "Work", href: "/work" },
  { label: "Blueprints", href: "/blueprints" },
  { label: "Open source", href: "/open-source" },
  { label: "About", href: "/about" },
  { label: "Teaching", href: "/teaching" },
];

/* Capability slugs used to tag work and blueprint topics. */
export type Cap =
  | "retrieval"
  | "agents"
  | "guardrails"
  | "models"
  | "voice"
  | "security"
  | "evaluation";

export const HERO = {
  eyebrow: "AI Engineer · Hyderabad, India",
  /* The last line is set in the serif accent. Its closing full stop is also
     the hidden door to /vasuki — keep a full stop at the end of it. */
  headline: ["I build AI systems for teams", "handling sensitive data."],
  lede: "Mostly in healthcare, legal and government work — where records are private and answers get checked. I design how the data stays protected, how the model reasons, and how every answer can be traced back to its source.",
  stats: [
    { value: "10+", label: "Platforms in production" },
    { value: "3", label: "Regulated sectors" },
  ],
  /* shown on the portrait card and the pill above the headline */
  status: "Taking on new projects",
  sectorsLabel: "Shipped for",
  sectors: ["Healthcare", "Legal", "Government"],
  /* Small glass notes floating around the portrait. Each is a real property
     of a system on this site — keep them true and short. */
  notes: [
    { k: "PHI", v: "18+ categories redacted before any reasoning", tone: "teal" },
    { k: "Deterministic", v: "Same case in, same answer out", tone: "accent" },
    { k: "Verified", v: "Every finding reproduced before it's reported", tone: "live" },
  ],
};

export const WORK_INTRO = {
  title: "Selected work",
  lede: "A few systems I've led, described by the problem they had to solve. Client names stay private; the thinking behind each one is on its own page.",
};

export type Flagship = {
  slug: string;
  n: string;
  title: string;
  sector: string;
  role: string;
  /** One or two sentences anyone can follow — no jargon. */
  plain: string;
  problem: string;
  diagram: "phi-boundary" | "claims-pipeline" | "rag-gate" | "pentest-harness";
  decisions: { head: string; body: string }[];
  stack: string[];
  caps: Cap[];
};

export const FLAGSHIP: Flagship[] = [
  {
    slug: "medical-legal-intelligence",
    n: "01",
    title: "Medical-Legal Intelligence Platform",
    sector: "Legal practices — plaintiff, defense & injury",
    role: "Team lead & developer",
    plain:
      "Helps attorneys make sense of thousands of pages of medical records — without patient details ever reaching an outside AI service, and with the same answer every time the case is run.",
    problem:
      "Attorneys wanted AI help reading dense medical case records, and the output had to stand up in court. Two things made that hard. Protected health information couldn't be sent to a hosted reasoning model. And if the same case, analysed twice, gave two different answers, neither could be used as evidence.",
    diagram: "phi-boundary",
    decisions: [
      {
        head: "Separate the data by design, not by policy",
        body: "Detection, tokenization, date normalization and a self-hosted clinical model all live in an isolated PHI zone. The frontier reasoning model sits in a second zone and only ever sees de-identified text. Because the separation is in the system's structure, a badly written prompt can't route around it.",
      },
      {
        head: "A six-step PHI pipeline",
        body: "Detect → tokenize → shift dates → validate → store → re-identify on read. It covers 18+ PHI categories and follows HIPAA Safe Harbor. Real names come back only at the very end, and only for people authorised to see them.",
      },
      {
        head: "The same case gives the same answer",
        body: "Generation is constrained against a fixed contract, with no sampling variance in the path that produces findings, and every statement points to a location in the source record. Run a case twice and you get the same analysis — which is what makes it usable as evidence.",
      },
      {
        head: "Built to be defended",
        body: "Audit logging, role-based access for attorneys, paralegals, experts and admins, and an evidence chain designed to hold up under a Daubert challenge.",
      },
      {
        head: "Self-hosting the clinical model",
        body: "A hosted API was never an option for identified records, so the clinical model runs on hardware we control. That made compression and serving our job: 4-bit weights to fit the GPU budget, a batched runtime to keep up under load, and a domain eval set re-run after every change to check nothing important was lost.",
      },
      {
        head: "Five connected tools",
        body: "Allegation analysis, medical record structuring, clinical timelines, provider and event mapping, and a review workspace for attorneys that also suggests suitable experts.",
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
    caps: ["guardrails", "models", "retrieval"],
  },
  {
    slug: "claims-intelligence",
    n: "02",
    title: "Healthcare Claims Intelligence",
    sector: "Health plans & payers",
    role: "Team lead & developer",
    plain:
      "Turns piles of messy claim documents into clean, structured summaries, so physicians spend their time deciding instead of reading.",
    problem:
      "Physicians reviewing claims were spending more time reading documents than making decisions. The documents arrived in volume, in a dozen formats, with no consistent structure. Sending every page to a model would have been very expensive — and, given what the pages contain, not allowed.",
    diagram: "claims-pipeline",
    decisions: [
      {
        head: "A document intelligence layer",
        body: "Layout-aware parsing, field-level extraction and schema validation turn raw records into fields a physician can scan in seconds.",
      },
      {
        head: "Redaction the client could inspect",
        body: "Sensitive fields are detected and tokenized before anything reaches a reasoning model. We built this in-house rather than buying it, so the client could audit it line by line instead of trusting a vendor.",
      },
      {
        head: "Queue first, not request-response",
        body: "Redis-backed background jobs let large batches queue and drain predictably instead of tying up a request.",
      },
      {
        head: "Semantic caching",
        body: "Similar extraction queries across similar claims are answered from cache instead of calling the model again — a direct, measurable cut in processing cost.",
      },
    ],
    stack: ["TypeScript", "Claude API", "PostgreSQL", "Redis", "In-house PHI layer"],
    caps: ["retrieval", "guardrails"],
  },
  {
    slug: "secure-enterprise-assistant",
    n: "03",
    title: "Secure Enterprise AI Assistant",
    sector: "U.S. government transit authority",
    role: "Lead developer",
    plain:
      "A private, ChatGPT-style assistant that lets thousands of employees ask questions about internal documents — with every conversation logged and nothing leaving the organisation.",
    problem:
      "Thousands of employees needed a conversational way into internal documentation. As a government body, the organisation couldn't accept any data exposure, and every interaction had to be attributable and auditable.",
    diagram: "rag-gate",
    decisions: [
      {
        head: "Answers from the documents, not from memory",
        body: "A full retrieval pipeline — parse, chunk, embed, retrieve, generate — so responses come from the organisation's own corpus rather than whatever the model learned in training.",
      },
      {
        head: "Feels like the tools people already use",
        body: "Persistent session memory, context-aware follow-ups and streamed responses, so it behaves like the consumer AI tools employees are used to.",
      },
      {
        head: "Checks on the way out",
        body: "Structured validation on every response makes sure nothing sensitive is surfaced at any point in the exchange.",
      },
      {
        head: "Only employees get in",
        body: "Enterprise SSO with role-based access control, scoped strictly to staff.",
      },
      {
        head: "Visible to the security team",
        body: "Admin analytics, audit logs and SIEM monitoring, so security sees this system the same way they see everything else on the network.",
      },
      {
        head: "Prompt-level caching",
        body: "Repeated context — system prompts and retrieved passages — is cached, cutting both latency and token cost on busy sessions.",
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
    caps: ["retrieval", "guardrails"],
  },
  {
    slug: "ai-penetration-testing",
    n: "04",
    title: "AI-Driven Penetration Testing Harness",
    sector: "Software products — with a module for AI applications",
    role: "Creator & lead",
    plain:
      "A tool that uses AI to look for security holes the way a human tester would — thinking about each specific app — and proves every problem is real before reporting it.",
    problem:
      "Penetration testing doesn't scale well. Good testers are scarce and expensive, so most products are tested once a year. Scanners run all the time but only find what someone already wrote a signature for. Neither reasons about the particular application in front of it — and a growing number of products now ship AI features that classic tooling doesn't understand at all.",
    diagram: "pentest-harness",
    decisions: [
      {
        head: "Use the model for judgement",
        body: "Sending requests is cheap; deciding which ones are worth sending is the hard part. The harness studies how the application actually behaves, forms a view on where it's likely to be weak, and writes test cases for that system rather than replaying a generic wordlist.",
      },
      {
        head: "A loop, not a one-off scan",
        body: "Each response shapes the next round. A reply that hints at an underlying assumption becomes the basis for the following test — closer to how a human tester works than to how a scanner does.",
      },
      {
        head: "Nothing reported until it's reproduced",
        body: "Every candidate finding is re-run by the harness before anyone sees it. A report full of false positives is the quickest way to lose a team's trust, so verification is a gate, not a nice-to-have.",
      },
      {
        head: "Coverage for AI products",
        body: "A dedicated module for AI features: injection — including payloads that arrive through retrieved content rather than the user — misuse of tool and function calls, data leaking through model output, and how far an agent can reach when one step is manipulated.",
      },
      {
        head: "Seeing it through to the fix",
        body: "Findings are ranked by real impact, delivered with the specific control that closes each one, and re-tested afterwards so the fix is confirmed.",
      },
      {
        head: "Authorised scope only",
        body: "The harness runs only under engagement, against systems there is written permission to test. The scope boundary is built into the tool, not left as a policy beside it.",
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
    caps: ["security", "agents"],
  },
];

export type WorkItem = {
  title: string;
  sector: string;
  body: string;
  tags: string[];
  status: "live" | "draft";
  caps: Cap[];
};

/* Ordered by what should be seen first — the first MORE_WORK_INITIAL show
   on load, the rest behind "Show more". */
export const MORE_WORK: WorkItem[] = [
  {
    title: "Self-Hosted Model Deployment",
    sector: "Data-sensitive enterprise",
    body: "Adapted an open-weights model to the client's domain, compressed it to fit their existing GPUs and served it inside their own network, so no request ever left. The project existed because a hosted API wasn't an option.",
    tags: ["QLoRA", "Quantization", "On-prem serving"],
    status: "live",
    caps: ["models"],
  },
  {
    title: "Realtime Voice Agent",
    sector: "Customer support",
    body: "Speech in, reasoning and tool calls in the middle, ElevenLabs speech out. Most of the engineering is about timing — a reply that arrives a beat late stops feeling like a conversation — so the pipeline is built around latency.",
    tags: ["ElevenLabs", "Realtime voice", "Conversational AI"],
    status: "live",
    caps: ["voice", "agents"],
  },
  {
    title: "Evaluation Harness for AI Features",
    sector: "Product engineering teams",
    body: "A domain eval set with automated scoring, wired into the delivery pipeline, so a prompt change, model swap or new quantization can't ship if it makes the task worse. It turned “it feels better” into a number the team could discuss.",
    tags: ["Eval harness", "LLM-as-judge", "CI"],
    status: "live",
    caps: ["evaluation"],
  },
  {
    title: "Agentic Workflow Automation",
    sector: "Operations teams",
    body: "A multi-agent system that plans a task, calls the tools it needs and pauses at set checkpoints for a person to decide. The escalation points are explicit, so the agent knows what it isn't allowed to finish on its own.",
    tags: ["Multi-agent", "Tool calling", "Human-in-the-loop"],
    status: "live",
    caps: ["agents"],
  },
  {
    title: "AI-Led Security Engagement",
    sector: "Product engineering teams",
    body: "An authorised penetration test run through the harness — the model handling recon and targeted test generation, with every finding reproduced before it reached the client. Delivered ranked, with fixes attached and a re-test to confirm them.",
    tags: ["Pentesting", "AI-driven tooling", "Remediation"],
    status: "live",
    caps: ["security"],
  },
  {
    title: "Workflow Automation with n8n",
    sector: "Operations & internal tooling",
    body: "AI steps added to the workflows a business already runs on. n8n handles triggers, integrations and retries; the model does only the part that needs a model. Much of the value was deciding which steps should never be an LLM call.",
    tags: ["n8n", "Workflow automation", "Integrations"],
    status: "live",
    caps: ["agents"],
  },
  {
    title: "Conversational Product Assistant",
    sector: "SaaS product company",
    body: "Built the company's product site and embedded an AI assistant into the core product, so users get answers in context without leaving the interface.",
    tags: ["Chatbot", "Product integration", "Full-stack"],
    status: "live",
    caps: ["retrieval"],
  },
  {
    title: "Applied AI Delivery Programme",
    sector: "Technology consultancy",
    body: "Led a team of six through adopting modern AI workflows and tooling while delivering three full-stack AI projects to production.",
    tags: ["Team lead", "AI workflows", "Delivery"],
    status: "live",
    caps: [],
  },
  {
    title: "Client RAG & Assistant Builds",
    sector: "Independent clients",
    body: "Ongoing freelance work: retrieval systems, domain chatbots and end-to-end AI implementations, scoped and delivered directly with each client.",
    tags: ["RAG", "Consulting", "End-to-end"],
    status: "live",
    caps: ["retrieval"],
  },
];

export const PRINCIPLES = {
  title: "How I work",
  lede: "Plenty of AI looks good in a demo. The harder part is building something people can trust with real data. A few habits guide how I do that.",
  items: [
    {
      n: "01",
      title: "Give the model only what it needs",
      body: "The narrowest context, the fewest tools, the least data. A part of the system that can't reach something can't leak it or be talked into exposing it.",
    },
    {
      n: "02",
      title: "Same input, same answer",
      body: "If a result changes from one run to the next, nobody can rely on it. I build pipelines that repeat exactly and point back to their sources, so results can be checked months later.",
    },
    {
      n: "03",
      title: "Leave a trail",
      body: "Audit logs, scoped access and a record of how each answer was reached. If you can't explain why the system said something, you can't stand behind it.",
    },
    {
      n: "04",
      title: "Measure it in production",
      body: "A prototype is a starting point. The work counts when it's running for real users, under real load.",
    },
  ],
  /* caption under the live pipeline illustration */
  figure: {
    caption: "Most of the systems here share one shape: messy input comes in, anything sensitive is handled at a single checkpoint, and structured, traceable output comes out.",
    legend: ["Raw input", "Needs handling", "Structured output"],
  },
};

export const HELP = {
  title: "Where I can help",
  lede: "Most projects are some mix of these.",
  items: [
    {
      title: "Building AI systems",
      body: "Designing and shipping production AI end to end — agents, retrieval, guardrails, and self-hosted models where an API can't go.",
      points: ["Agentic & multi-agent systems", "Retrieval (RAG) & search", "Guardrails, redaction & evaluation", "Fine-tuning, quantization & serving"],
    },
    {
      title: "Architecture advice",
      body: "Helping teams make the early decisions that are expensive to undo — before a lot of code depends on them.",
      points: ["Architecture & design reviews", "PHI / PII boundaries, audit & access", "Model and tooling choices", "Prototype-to-production plans"],
    },
    {
      title: "Security testing with AI",
      body: "Testing software, including AI features, with tooling that reasons about the specific app and proves each finding.",
      points: ["AI-driven penetration testing", "Prompt-injection & agent-reach testing", "Impact-ranked findings with fixes", "Re-tests to confirm the fix"],
    },
  ],
  teachingNote: {
    text: "I also run workshops and longer programmes for engineering teams.",
    link: "About my teaching",
  },
};

export const ABOUT = {
  title: "About",
  headline: "I'm Ajith — an AI engineer who likes the unglamorous parts.",
  body: [
    "Most of my work is for organisations where the data is sensitive and the output gets scrutinised: health plans, legal practices, a government agency. In that setting, a clever prompt isn't enough. What matters is where the data goes, whether an answer can be reproduced, and whether someone can check how it was reached.",
    "So I spend a lot of time below the prompt layer — isolating sensitive data, making pipelines deterministic, and fine-tuning, compressing and self-hosting models when an API can't meet the cost, latency or data-residency requirement. I also build AI tooling for security testing, which has taught me a lot about where systems break.",
    "Alongside the engineering, I teach. Explaining this material to a room of engineers is the quickest way I know to find the gaps in my own understanding.",
  ],
  facts: [
    { label: "Based in", value: "Hyderabad, India" },
    { label: "Works with", value: "Teams worldwide, remote" },
    { label: "Focus", value: "Secure, production AI" },
    { label: "Sectors", value: "Healthcare · Legal · Government" },
  ],
};

export const MODEL = {
  title: "Model work",
  lede: "Fine-tuning, quantization and self-hosted serving — the layer below the prompt, where most of the cost sits.",
  story: [
    "Three things push you below the prompt layer: cost that stops being small once you're at volume, latency you can't fix from outside, and data that isn't allowed to leave the building. A hosted API doesn't solve any of them.",
    "So you host the model yourself — and everything the API was quietly handling becomes your job: how much VRAM it needs, how fast it runs under concurrent load, and how much capability you give up to make it fit. It's less visible than prompt design, but it's where a lot of the real engineering happens.",
  ],
  tracks: [
    {
      n: "01",
      title: "Adaptation",
      lede: "Teaching a model the domain without training from scratch.",
      items: [
        "LoRA and QLoRA adapters for domain behaviour on a single-GPU budget",
        "Supervised fine-tuning and instruction tuning on curated task data",
        "Dataset curation, deduplication and eval hygiene — the eval set never touches training",
        "Knowing when not to fine-tune: retrieval solves more than people expect and is cheaper to maintain",
      ],
    },
    {
      n: "02",
      title: "Quantization",
      lede: "Making it fit without making it useless.",
      items: [
        "AWQ 4-bit for GPU serving — activation-aware, so the most important weights keep their precision",
        "GPTQ compared against the same calibration set, rather than picked on reputation",
        "GGUF K-quants (Q4_K_M, Q5_K_M) for llama.cpp on CPU, Metal and edge devices",
        "bitsandbytes NF4 and int8 for quick experiments before choosing a serving format",
        "Calibration sets drawn from the real domain data, not a generic web sample",
      ],
    },
    {
      n: "03",
      title: "Serving & runtime",
      lede: "Throughput is a design decision, not a number from a benchmark page.",
      items: [
        "vLLM — PagedAttention, continuous batching and tensor parallelism for concurrent GPU serving",
        "llama.cpp — CPU and Metal inference where a GPU isn't available, affordable or permitted",
        "KV-cache and prefix-cache management so repeated system context isn't recomputed",
        "Balancing latency and throughput: batch size, context length, concurrency limits, queueing",
        "Model routing — a small model answers first, a larger one only when the task needs it",
      ],
    },
    {
      n: "04",
      title: "Machine learning foundations",
      lede: "The groundwork that still shapes most of the decisions above.",
      items: [
        "Supervised and unsupervised learning, feature engineering, model selection",
        "Neural network architectures and training loops",
        "Custom NLP models for domain classification and structured extraction",
        "Evaluation built around the cost of each kind of error — missing PHI is not the same as over-flagging it",
      ],
    },
  ],
  note: "Perplexity isn't the real test. The real test is whether the task still passes after the model is compressed — which means keeping a domain eval set and re-running it every time the quantization, adapter or runtime changes.",
};

export const STACK = {
  title: "Tools I use",
  lede: "Things I've shipped with in production, grouped by what they're for.",
  groups: [
    { group: "Languages", items: ["Python", "TypeScript", "Java", "C"] },
    {
      group: "Agents & orchestration",
      items: ["LangGraph", "LangChain", "CrewAI", "AutoGen", "OpenAI Agents SDK", "MCP", "n8n"],
    },
    {
      group: "Retrieval",
      items: ["Embeddings", "Hybrid search", "Chunking & indexing", "pgvector", "FAISS", "ChromaDB"],
    },
    {
      group: "Models & serving",
      items: ["Claude API", "OpenAI API", "Hugging Face", "vLLM", "llama.cpp", "LoRA / QLoRA", "AWQ · GPTQ · GGUF"],
    },
    {
      group: "Safety & evaluation",
      items: ["PII / PHI redaction", "Prompt-injection defense", "Structured outputs", "LLM-as-judge", "Domain eval sets", "Audit logging"],
    },
    {
      group: "Voice & realtime",
      items: ["ElevenLabs", "Speech-to-text", "Streaming", "Turn-taking & barge-in"],
    },
    {
      group: "Backend & data",
      items: ["FastAPI", "PostgreSQL", "Redis", "SQLAlchemy", "Alembic"],
    },
    { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
    { group: "Cloud & identity", items: ["AWS", "GCP", "SSO / JWT", "RBAC"] },
  ],
};

export const TEACHING = {
  title: "Teaching",
  headline: "I teach engineers to build AI they can actually ship.",
  lede: "I teach because it's the fastest way to find out whether I really understand something. Explaining a retrieval architecture to sixty engineers who keep asking “why?” brings every hidden assumption to the surface.",
  stats: [
    { value: "500+", label: "Engineers & students taught" },
    { value: "250+", label: "Participants in a single programme" },
    { value: "6 mo", label: "Longest curriculum engagement" },
  ],
  programmes: [
    {
      title: "Generative & Agentic AI Curriculum",
      sector: "Technical institutes",
      body: "A six-month programme from cloud fundamentals through generative and agentic AI, run as hands-on labs with projects based on real industry use cases.",
      tags: ["Curriculum", "Hands-on labs", "Project-based"],
    },
    {
      title: "Workshops for Consultancy Teams",
      sector: "US-based consultancies",
      body: "Ongoing training for working engineering teams on generative AI, agentic workflows and practical LLM application design — focused on shipping rather than theory.",
      tags: ["Workshops", "Agentic workflows", "Team enablement"],
    },
  ],
  formats: [
    { title: "Workshops", body: "One to three days, hands-on, for a team that needs to start building." },
    { title: "Programmes", body: "Multi-week or multi-month tracks with labs and project-based assessment." },
    { title: "Team enablement", body: "Working alongside a team as they bring AI tooling into live delivery." },
  ],
  topics: [
    "Generative AI foundations",
    "Agentic workflows & orchestration",
    "Practical LLM application design",
    "RAG systems, hands-on",
    "Guardrails & AI safety in production",
    "Cloud fundamentals for AI teams",
  ],
  cta: "Planning training for your team? Tell me who it's for and what they need to build.",
};

export const CONTACT = {
  eyebrow: "Contact",
  headline: ["Working on something", "like this?"],
  lede: "I'm open to AI engineering, architecture and training work. Tell me what you're building and what the constraints are — that's usually enough to start.",
  availability: [
    { dot: "live", text: "Taking on new projects" },
    { dot: "accent", text: "Usually replies within a day" },
  ],
};

export const FAQ = [
  {
    q: "Who is Ajith Thaduri?",
    a: "Ajith Thaduri is an AI engineer and technical consultant based in Hyderabad, India. He designs and builds production AI systems — agentic architectures, retrieval pipelines and self-hosted language models — for healthcare, legal and government organisations where the data is regulated and the output is closely checked. He also builds AI-driven security tooling and teaches engineering teams.",
  },
  {
    q: "What has he built?",
    a: "Complete AI platforms rather than prototypes: a medical-legal intelligence platform for attorneys, a claims-intelligence system for health plans, a secure conversational assistant for a U.S. government transit authority, and an AI-driven penetration testing harness. Alongside those are agentic workflow automation, realtime voice agents, retrieval systems and evaluation harnesses.",
  },
  {
    q: "How does he approach AI projects?",
    a: "He keeps sensitive data isolated by the system's architecture rather than by policy, makes reasoning pipelines deterministic so results can be reproduced later, keeps an audit trail of every decision, and fine-tunes, quantizes and self-hosts models when a hosted API can't meet the cost, latency or data-residency needs.",
  },
  {
    q: "Does he do security work?",
    a: "Yes. He built an AI-driven penetration testing harness that studies a target application, writes test cases for that specific system, reproduces every finding before a person sees it, and includes a module for AI products covering injection, tool misuse and agent reach. It runs only with written authorisation.",
  },
  {
    q: "Does he teach?",
    a: "Yes. He has taught more than 500 engineers and students through workshops and multi-month programmes at technical institutes and US-based consultancies, covering generative AI, agentic workflows, retrieval, guardrails and practical LLM application design.",
  },
  {
    q: "How do you get in touch?",
    a: "By email at Ajiththaduri1@gmail.com, on LinkedIn at linkedin.com/in/ajiththaduri, or on GitHub as AjithThaduri. He usually replies within a day.",
  },
];

export const WORK_INDEX = {
  title: "Work",
  headline: "Everything I've built, in one place.",
  lede: "Four systems I've written up in depth, and a longer list of projects and engagements. Filter by the kind of work you're interested in.",
};

export type Capability = {
  slug: Cap;
  title: string;
  /** One plain sentence for newcomers. */
  plain: string;
  /** What I actually do in this area — two or three sentences. */
  body: string;
  points: string[];
  /** Public code of mine that shows this capability. */
  code?: { label: string; note: string; href: string }[];
};

const GH = "https://github.com/AjithThaduri";

export const CAPABILITIES: Capability[] = [
  {
    slug: "retrieval",
    title: "Retrieval & documents",
    plain: "Getting AI to answer from your own documents — accurately, with sources — instead of from memory.",
    body: "Most of the AI systems I build start with documents: medical records, claims, internal manuals. The hard part is rarely the model. It's parsing messy files, splitting them sensibly, finding the right passages, and making sure every answer can point back to where it came from.",
    points: [
      "Layout-aware parsing and OCR for scanned and structured documents",
      "Chunking strategies matched to the document, not one size for all",
      "Hybrid search, reranking and citation-grounded answers",
      "Retrieval evaluation — measuring whether the right passages come back",
    ],
    code: [
      { label: "blueprints / chunking", note: "Compare chunking strategies on your own documents, with Recall@k and MRR.", href: `${GH}/blueprints/blob/main/src/blueprints/chunking.py` },
      { label: "blueprints / longdoc", note: "Long-document retrieval with a heading tree, routing and ordered excerpts.", href: `${GH}/blueprints/blob/main/src/blueprints/longdoc.py` },
      { label: "blueprints / ocr", note: "Tiered OCR routing that trusts good text layers and escalates hard pages.", href: `${GH}/blueprints/tree/main/src/blueprints/ocr` },
      { label: "rag-eval", note: "Retrieval metrics and a CI gate that catches real regressions.", href: `${GH}/rag-eval` },
    ],
  },
  {
    slug: "agents",
    title: "Agents & automation",
    plain: "AI that can plan steps and use tools to finish a task — with a person in the loop where it matters.",
    body: "I build agents that do real work — calling tools, querying systems, moving tasks along — with explicit checkpoints where a human decides. I'm just as interested in which steps should never be an LLM call, and often the right answer is a plain workflow with one model step inside it.",
    points: [
      "Multi-agent orchestration, tool calling and plan-and-execute",
      "Human-in-the-loop checkpoints and escalation rules",
      "Workflow automation with n8n where a full agent is overkill",
      "MCP and function-calling integrations with existing systems",
    ],
    code: [
      { label: "blueprints / memory", note: "Tiered agent memory: time-stamped facts, per-user isolation, token budgets.", href: `${GH}/blueprints/tree/main/src/blueprints/memory` },
    ],
  },
  {
    slug: "guardrails",
    title: "Privacy & guardrails",
    plain: "Keeping sensitive data safe and stopping AI from saying things it shouldn't.",
    body: "In healthcare, legal and government work, where data goes matters more than which model you use. I design systems where sensitive data is separated by architecture — so a bad prompt can't route around it — with checks on what goes in and what comes out.",
    points: [
      "PHI / PII detection, tokenization and re-identification on read",
      "Two-zone architectures that keep identified data away from hosted models",
      "Prompt-injection defense, including injection through retrieved content",
      "Structured output enforcement, audit logging and role-based access",
    ],
  },
  {
    slug: "models",
    title: "Models & serving",
    plain: "Running AI models on your own hardware when sending data to an outside service isn't an option.",
    body: "When cost, latency or data residency rule out a hosted API, I adapt, compress and serve open-weights models myself — and keep an eval set that proves the compressed model still does the job.",
    points: [
      "LoRA / QLoRA fine-tuning on a single-GPU budget",
      "AWQ, GPTQ and GGUF quantization, compared on the real task",
      "vLLM and llama.cpp serving, batching and caching",
      "Model routing — small model first, large model only when needed",
    ],
  },
  {
    slug: "voice",
    title: "Voice & realtime",
    plain: "AI you can talk to, that answers fast enough to feel like a conversation.",
    body: "Voice agents live or die on timing. I build pipelines around a latency budget — speech in, reasoning and tools in the middle, speech out — with turn-taking and interruption handled properly.",
    points: [
      "Speech-to-text, reasoning and ElevenLabs speech out",
      "Streaming end to end, with a latency budget per stage",
      "Turn-taking and barge-in",
      "Tool calls mid-conversation without awkward silence",
    ],
  },
  {
    slug: "security",
    title: "Security testing with AI",
    plain: "Using AI to find security holes in software — including in other AI products — and proving each one is real.",
    body: "I built an AI-driven penetration testing harness that reasons about the specific application, reproduces every finding before reporting it, and has a dedicated module for AI features. It only ever runs with written authorisation.",
    points: [
      "Agentic test generation aimed at the specific target",
      "Automatic reproduction so reports contain no noise",
      "Testing AI features: injection, tool misuse, agent reach",
      "Impact-ranked findings, fixes attached, re-tests to confirm",
    ],
  },
  {
    slug: "evaluation",
    title: "Evaluation",
    plain: "Measuring whether an AI system is actually getting better — with numbers, not impressions.",
    body: "Every serious system I build carries an eval set. It turns 'this prompt feels better' into a number, and it's what lets a team change models, prompts or quantization without fear.",
    points: [
      "Domain eval sets built from real cases",
      "LLM-as-judge with rubrics, checked against human grading",
      "Retrieval metrics alongside answer quality",
      "Evals wired into CI so regressions can't ship",
    ],
    code: [
      { label: "rag-eval", note: "Paired-bootstrap regression gate and an LLM judge calibrated against human labels.", href: `${GH}/rag-eval` },
    ],
  },
];

export const ENGAGE = {
  title: "Working with me",
  headline: "How a project with me usually goes.",
  lede: "Every project is different, but most follow the same shape. Here's what to expect — and what I'll need from you.",
  engagements: [
    {
      title: "Architecture review",
      length: "1–2 weeks",
      body: "I look at what you have or what you're planning, and write up what I'd keep, change and avoid — with a diagram and a prioritised list.",
    },
    {
      title: "Build",
      length: "Several weeks to months",
      body: "I design and build the system with your team, from first prototype to production, and hand it over with documentation and an eval set.",
    },
    {
      title: "Security test",
      length: "1–3 weeks",
      body: "An authorised, AI-driven penetration test of your product or AI feature, with ranked findings, fixes and a re-test.",
    },
    {
      title: "Training",
      length: "1 day to 6 months",
      body: "Hands-on workshops or longer programmes for your engineers. More on the teaching page.",
    },
  ],
  process: [
    { n: "01", title: "A conversation", body: "You tell me what you're trying to build and what's in the way. No preparation needed." },
    { n: "02", title: "A short proposal", body: "Scope, approach, timeline and cost, in plain language — usually within a few days." },
    { n: "03", title: "Architecture first", body: "We agree the design before much code is written, because that's where the expensive mistakes are." },
    { n: "04", title: "Build in the open", body: "Regular demos, a shared eval set, and nothing hidden in a black box." },
    { n: "05", title: "Handover", body: "Documentation, diagrams and the eval set stay with your team, so you're never dependent on me." },
  ],
  faq: [
    { q: "Do you sign NDAs?", a: "Yes, routinely. It's why client names never appear on this site." },
    { q: "Do you work remotely?", a: "Yes. I'm based in Hyderabad and work with teams across time zones, with a few hours of overlap each day." },
    { q: "Can you work with our existing team?", a: "That's the usual setup. I'd rather leave your team stronger than leave you depending on me." },
    { q: "Which models and clouds do you work with?", a: "Claude, OpenAI and open-weights models; AWS and GCP; on-prem when data can't leave. I'll recommend what fits, not what I prefer." },
  ],
  brief: {
    title: "Tell me about your project",
    lede: "Fill this in and it'll open as an email to me — nothing is stored on this site.",
    types: ["Architecture review", "Build", "Security test", "Training", "Something else"],
  },
};

export const BLUEPRINTS_INTRO = {
  title: "Blueprints",
  headline: "Open architectures you can build from.",
  lede: "How I'd design common AI systems — retrieval over long or sensitive documents, agents, guardrails — written up in enough detail to use. Free to use and adapt; a link back is appreciated.",
  types: {
    blueprint: "My own design for a problem, detailed enough to build from.",
    teardown: "My take on someone else's published method — what works, what breaks, how I'd adapt it.",
    note: "A shorter opinion or lesson learned.",
  },
  license: "Text and diagrams are CC BY 4.0 — use them, adapt them, credit the source.",
};

/* Public code. "mine" are repos I wrote. "rely" credits other people's
   projects I recommend — always link the ORIGINAL repository, never a copy. */
export type RepoCard = { repo: string; title: string; body: string; tags: string[] };

export const OPEN_SOURCE = {
  title: "Open source",
  headline: "Code you can run, and the projects I build on.",
  lede: "Most of my production work lives in private client repositories, so it can't be shared. What I can share is here: runnable reference code for my blueprints, and the open-source projects I think deserve more attention.",
  mine: [
    {
      repo: "AjithThaduri/blueprints",
      title: "Blueprints: runnable reference code",
      body: "The working version of every blueprint on this site: chunking strategies you can compare on your own documents, long-document retrieval with a heading tree, tiered OCR routing and tiered agent memory. Dependency-free core, tested in CI.",
      tags: ["RAG", "OCR", "Agent memory", "Python"],
    },
    {
      repo: "AjithThaduri/rag-eval",
      title: "rag-eval",
      body: "Retrieval evaluation with a regression gate that uses a paired bootstrap, so CI fails on real drops and ignores noise, plus an LLM judge you calibrate against human labels before trusting it.",
      tags: ["Evaluation", "CI", "LLM-as-judge"],
    },
  ] as RepoCard[],
  relyIntro: "Well-built projects that solve real problems, several of them less known than they should be. Each belongs to its authors.",
  rely: [
    { repo: "jina-ai/late-chunking", title: "Late chunking", body: "Chunk embeddings that carry the whole document's context, with no extra model calls. The cleanest fix I know for chunks that lose meaning on their own.", tags: ["Retrieval", "Embeddings"] },
    { repo: "parthsarthi03/raptor", title: "RAPTOR", body: "Recursive summary trees for answering questions about a whole document. The idea behind my long-document design.", tags: ["Long documents"] },
    { repo: "TIGER-AI-Lab/LongRAG", title: "LongRAG", body: "Retrieves long units instead of short passages, so long-context models see coherent evidence. A useful counterweight to over-chunking.", tags: ["Long context"] },
    { repo: "hhhuang/CAG", title: "Cache-augmented generation", body: "Skip retrieval entirely for small, static knowledge bases by preloading and caching them. Worth knowing before building a RAG stack you don't need.", tags: ["Alternatives to RAG"] },
    { repo: "vectara/open-rag-eval", title: "open-rag-eval", body: "RAG evaluation that works without golden answers. Handy when you have real traffic but no labelled set yet.", tags: ["Evaluation"] },
    { repo: "lightonai/pylate", title: "PyLate", body: "Training and running late-interaction (ColBERT-style) retrievers. The most active home for multi-vector retrieval.", tags: ["Retrieval", "Training"] },
    { repo: "agiresearch/A-mem", title: "A-MEM", body: "Agent memory organised as linked, evolving notes. A thoughtful alternative to flat vector memory.", tags: ["Agent memory"] },
    { repo: "xiaowu0162/LongMemEval", title: "LongMemEval", body: "The benchmark I'd use for agent memory: updated facts, reasoning across sessions and over time, and knowing when to say 'I don't know'.", tags: ["Agent memory", "Evaluation"] },
    { repo: "getzep/graphiti", title: "Graphiti", body: "Temporal knowledge graphs where changed facts are invalidated, not deleted. The model for how I handle facts that change.", tags: ["Agent memory", "Graphs"] },
    { repo: "docling-project/docling", title: "Docling", body: "MIT-licensed document conversion that keeps headings, tables and reading order. Structure-aware chunking starts here.", tags: ["Documents", "OCR"] },
    { repo: "allenai/olmocr", title: "olmOCR", body: "An open OCR model and benchmark that holds up on hard pages, with published cost per million pages.", tags: ["OCR"] },
    { repo: "FlagOpen/FlagEmbedding", title: "BGE embeddings & rerankers", body: "Open embedding and reranker models that run on one GPU. The reranker is the cheapest big win in most RAG stacks.", tags: ["Retrieval", "Models"] },
  ] as RepoCard[],
};
