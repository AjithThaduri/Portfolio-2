/* ---------------------------------------------------------------------------
   GLOSSARY — one-line, plain-language definitions.
   Used by <Term id="rag">RAG</Term> in blueprints (hover or tap for the
   definition) and listed in full at /glossary. Keep each `short` to a single
   sentence a non-engineer can follow.
--------------------------------------------------------------------------- */

export type GlossaryEntry = { id: string; term: string; short: string; more?: string };

export const GLOSSARY: GlossaryEntry[] = [
  {
    id: "llm",
    term: "LLM",
    short: "A large language model — software trained on huge amounts of text that can read and write language.",
  },
  {
    id: "rag",
    term: "RAG",
    short: "Retrieval-augmented generation: find the relevant passages first, then have the model answer using only those.",
    more: "It lets a model answer from your own documents instead of from memory, and makes it possible to cite where each answer came from.",
  },
  {
    id: "embedding",
    term: "Embedding",
    short: "A list of numbers that captures what a piece of text means, so similar meanings end up close together.",
  },
  {
    id: "vector-search",
    term: "Vector search",
    short: "Finding text by meaning rather than exact words, by comparing embeddings.",
  },
  {
    id: "bm25",
    term: "BM25",
    short: "A classic keyword-search scoring method — good at exact terms, codes and names that meaning-based search can miss.",
  },
  {
    id: "hybrid-search",
    term: "Hybrid search",
    short: "Running keyword search and vector search together and merging the results.",
  },
  {
    id: "reranker",
    term: "Reranker",
    short: "A second, more careful model that re-orders search results by how well they actually answer the question.",
  },
  {
    id: "chunking",
    term: "Chunking",
    short: "Splitting documents into smaller pieces so they can be searched and fed to a model.",
  },
  {
    id: "context-window",
    term: "Context window",
    short: "How much text a model can read at once. Anything beyond it has to be left out or summarised.",
  },
  {
    id: "token",
    term: "Token",
    short: "The unit models read and bill by — roughly three-quarters of an English word.",
  },
  {
    id: "phi",
    term: "PHI",
    short: "Protected health information: anything that can identify a patient alongside their health details.",
    more: "In the US, HIPAA governs how PHI is stored, shared and de-identified.",
  },
  {
    id: "pii",
    term: "PII",
    short: "Personally identifiable information — names, addresses, ID numbers and anything else that points to a person.",
  },
  {
    id: "de-identification",
    term: "De-identification",
    short: "Removing or replacing the details that identify a person, so the rest of the data can be used more safely.",
  },
  {
    id: "tokenization-phi",
    term: "Tokenization (privacy)",
    short: "Swapping a sensitive value for a placeholder like [PATIENT_1], with the real value kept in a separate locked store.",
  },
  {
    id: "safe-harbor",
    term: "HIPAA Safe Harbor",
    short: "A US method for de-identifying health data by removing 18 specific kinds of identifier.",
  },
  {
    id: "guardrails",
    term: "Guardrails",
    short: "Checks placed around a model to stop unsafe input going in or unsafe output coming out.",
  },
  {
    id: "prompt-injection",
    term: "Prompt injection",
    short: "Hiding instructions in text a model reads — a document, a web page — to make it do something it shouldn't.",
  },
  {
    id: "agent",
    term: "Agent",
    short: "A model that can plan steps and use tools — search, databases, APIs — to complete a task, not just answer once.",
  },
  {
    id: "fine-tuning",
    term: "Fine-tuning",
    short: "Further training an existing model on your own examples so it behaves better for your task.",
  },
  {
    id: "lora",
    term: "LoRA / QLoRA",
    short: "Cheap fine-tuning methods that train a small add-on instead of the whole model.",
  },
  {
    id: "quantization",
    term: "Quantization",
    short: "Storing a model's numbers with less precision so it needs less memory and runs faster, at a small cost in quality.",
  },
  {
    id: "inference",
    term: "Inference",
    short: "Running a trained model to get an answer — as opposed to training it.",
  },
  {
    id: "eval-set",
    term: "Eval set",
    short: "A fixed set of questions with known good answers, used to check whether a change made the system better or worse.",
  },
  {
    id: "llm-as-judge",
    term: "LLM-as-judge",
    short: "Using a model to grade another model's answers against a rubric.",
  },
  {
    id: "deterministic",
    term: "Deterministic",
    short: "Gives exactly the same output every time for the same input.",
  },
  {
    id: "semantic-cache",
    term: "Semantic cache",
    short: "Reusing a previous answer when a new question means the same thing, even if worded differently.",
  },
  {
    id: "ocr",
    term: "OCR",
    short: "Optical character recognition — turning scanned pages and images into machine-readable text.",
  },
  {
    id: "mcp",
    term: "MCP",
    short: "Model Context Protocol — an open standard for connecting models to tools and data sources.",
  },
];

export const glossaryById = (id: string) => GLOSSARY.find((g) => g.id === id);
