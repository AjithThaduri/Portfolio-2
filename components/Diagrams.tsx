/* Architecture diagrams. Inline SVG, no dependencies.
   Each is drawn on a fixed viewBox and scales to its container. */

/* Theme-aware: these resolve against the tokens in globals.css. */
const L = "var(--line)";
const FILL = "var(--raised)";
const HEAD = "var(--text)";
const BODY = "var(--muted)";
const FAINT = "var(--faint)";
const ACCENT = "var(--accent)";

function Box({
  x,
  y,
  w,
  h,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  accent?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={3}
      fill={FILL}
      stroke={accent ? ACCENT : L}
      strokeWidth={1}
    />
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={L}
      strokeWidth={1}
      markerEnd="url(#arrowhead)"
      strokeDasharray={dashed ? "3 3" : undefined}
    />
  );
}

function Defs() {
  return (
    <defs>
      <marker
        id="arrowhead"
        markerWidth={7}
        markerHeight={7}
        refX={6}
        refY={3}
        orient="auto"
      >
        <path d="M0,0 L6,3 L0,6 z" fill="var(--faint)" />
      </marker>
    </defs>
  );
}

const Frame = ({
  viewBox,
  label,
  children,
}: {
  viewBox: string;
  label: string;
  children: React.ReactNode;
}) => (
  <figure className="my-10 overflow-x-auto rounded border border-line bg-surface">
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      className="block h-auto w-full min-w-[640px] font-mono"
    >
      <Defs />
      {children}
    </svg>
  </figure>
);

/* --------------------------------------------------------------- 01 */
export function PhiBoundaryDiagram() {
  return (
    <Frame
      viewBox="0 0 880 380"
      label="Two-zone architecture: a secure PHI processing zone isolated from a reasoning zone. Only de-identified content crosses the boundary; re-identification happens on read for authorised users."
    >
      {/* boundary */}
      <text x={440} y={20} fill={ACCENT} fontSize={11} textAnchor="middle" letterSpacing="1.5">
        PHI BOUNDARY
      </text>
      <line x1={440} y1={32} x2={440} y2={370} stroke={ACCENT} strokeWidth={1} strokeDasharray="4 5" opacity={0.55} />

      {/* source */}
      <Box x={20} y={40} w={200} h={34} />
      <text x={120} y={62} fill={BODY} fontSize={12} textAnchor="middle">
        Raw case records
      </text>
      <Arrow x1={120} y1={74} x2={120} y2={104} />

      {/* left zone */}
      <Box x={20} y={110} w={360} h={170} accent />
      <text x={40} y={136} fill={ACCENT} fontSize={11} letterSpacing="1.2">
        SECURE PHI ZONE
      </text>
      {["detect", "tokenize", "shift dates", "validate", "self-hosted clinical LLM"].map(
        (t, i) => (
          <text key={t} x={40} y={166 + i * 21} fill={i === 4 ? HEAD : BODY} fontSize={12}>
            {"· " + t}
          </text>
        ),
      )}

      {/* crossing arrow */}
      <Arrow x1={380} y1={192} x2={496} y2={192} />
      <text x={440} y={160} fill={ACCENT} fontSize={11} textAnchor="middle">
        de-identified
      </text>
      <text x={440} y={176} fill={ACCENT} fontSize={11} textAnchor="middle">
        content only
      </text>

      {/* right zone */}
      <Box x={500} y={110} w={360} h={170} />
      <text x={520} y={136} fill={HEAD} fontSize={11} letterSpacing="1.2">
        ADVANCED REASONING ZONE
      </text>
      {["frontier reasoning model", "deterministic decoding", "constrained generation", "source-anchored output"].map(
        (t, i) => (
          <text key={t} x={520} y={166 + i * 21} fill={i === 0 ? HEAD : BODY} fontSize={12}>
            {"· " + t}
          </text>
        ),
      )}

      {/* return path */}
      <path
        d="M 680 280 L 680 330 L 210 330 L 210 286"
        fill="none"
        stroke={L}
        strokeWidth={1}
        markerEnd="url(#arrowhead)"
      />
      <text x={445} y={352} fill={FAINT} fontSize={11} textAnchor="middle">
        re-identify on read — authorised roles only
      </text>
    </Frame>
  );
}

/* --------------------------------------------------------------- 02 */
export function ClaimsPipelineDiagram() {
  const stages: [string, string, boolean][] = [
    ["Unstructured", "medical documents", false],
    ["PHI redaction tier", "detect · redact · tokenize", true],
    ["Document intelligence", "extract · structure", false],
    ["Structured claims", "physician-ready fields", false],
  ];
  return (
    <Frame
      viewBox="0 0 880 300"
      label="Claims pipeline: unstructured documents pass through a PHI redaction tier before a document intelligence layer structures them, backed by asynchronous job processing and a semantic cache."
    >
      {/* semantic cache */}
      <rect x={460} y={10} width={180} height={40} rx={3} fill="none" stroke={L} strokeDasharray="3 3" />
      <text x={550} y={27} fill={FAINT} fontSize={11} textAnchor="middle">
        semantic cache
      </text>
      <text x={550} y={42} fill={FAINT} fontSize={10} textAnchor="middle">
        repeats never reach the model
      </text>
      <line x1={550} y1={50} x2={550} y2={84} stroke={L} strokeDasharray="3 3" markerEnd="url(#arrowhead)" />

      {stages.map(([head, sub, accent], i) => {
        const x = 20 + i * 220;
        return (
          <g key={head}>
            <Box x={x} y={90} w={180} h={84} accent={accent} />
            <text x={x + 90} y={124} fill={accent ? ACCENT : HEAD} fontSize={12} textAnchor="middle">
              {head}
            </text>
            <text x={x + 90} y={144} fill={BODY} fontSize={11} textAnchor="middle">
              {sub}
            </text>
            {i < 3 && <Arrow x1={x + 180} y1={132} x2={x + 216} y2={132} />}
          </g>
        );
      })}

      {/* async lane */}
      <rect x={240} y={210} width={400} height={44} rx={3} fill={FILL} stroke={L} />
      <text x={440} y={237} fill={BODY} fontSize={11} textAnchor="middle">
        Redis — asynchronous job processing at document volume
      </text>
      <line x1={330} y1={174} x2={330} y2={210} stroke={L} strokeDasharray="3 3" />
      <line x1={550} y1={174} x2={550} y2={210} stroke={L} strokeDasharray="3 3" />
    </Frame>
  );
}

/* --------------------------------------------------------------- 03 */
export function RagGateDiagram() {
  const ingest: [number, number, string][] = [
    [20, 150, "Internal documents"],
    [200, 100, "parse"],
    [320, 100, "chunk"],
    [440, 100, "embed"],
    [580, 140, "Vector index"],
  ];
  const query: [number, number, string, boolean][] = [
    [20, 130, "Employee", false],
    [180, 140, "SSO + RBAC", true],
    [350, 130, "Retrieve", false],
    [510, 180, "Generate + guardrails", false],
    [720, 140, "Streamed answer", false],
  ];
  return (
    <Frame
      viewBox="0 0 880 370"
      label="Retrieval pipeline: documents are parsed, chunked and embedded into a vector index; employee queries pass an SSO and role-based access gate before retrieval and guarded generation."
    >
      <text x={20} y={26} fill={FAINT} fontSize={11} letterSpacing="1.2">
        INGESTION
      </text>
      {ingest.map(([x, w, label], i) => (
        <g key={label}>
          <Box x={x} y={40} w={w} h={54} />
          <text x={x + w / 2} y={72} fill={i === 0 || i === 4 ? HEAD : BODY} fontSize={12} textAnchor="middle">
            {label}
          </text>
          {i < 4 && <Arrow x1={x + w} y1={67} x2={ingest[i + 1][0] - 4} y2={67} />}
        </g>
      ))}

      <text x={20} y={216} fill={FAINT} fontSize={11} letterSpacing="1.2">
        QUERY
      </text>
      {query.map(([x, w, label, accent], i) => (
        <g key={label}>
          <Box x={x} y={230} w={w} h={54} accent={accent} />
          <text x={x + w / 2} y={262} fill={accent ? ACCENT : HEAD} fontSize={12} textAnchor="middle">
            {label}
          </text>
          {i < 4 && <Arrow x1={x + w} y1={257} x2={query[i + 1][0] - 4} y2={257} />}
        </g>
      ))}

      {/* index feeds retrieval */}
      <path
        d="M 650 94 L 650 160 L 415 160 L 415 226"
        fill="none"
        stroke={L}
        strokeWidth={1}
        markerEnd="url(#arrowhead)"
      />
      <text x={532} y={152} fill={FAINT} fontSize={11} textAnchor="middle">
        top-k chunks
      </text>

      {/* annotations */}
      <text x={250} y={308} fill={ACCENT} fontSize={11} textAnchor="middle">
        nothing reaches the model unauthenticated
      </text>
      <text x={600} y={308} fill={FAINT} fontSize={11} textAnchor="middle">
        prompt cache on repeat context · structured output validation
      </text>
    </Frame>
  );
}

/* --------------------------------------------------------------- 04 */
export function InferenceStackDiagram() {
  return (
    <Frame
      viewBox="0 0 880 400"
      label="The self-hosted inference stack: an open-weights base model is adapted with LoRA or QLoRA, compressed with AWQ or GGUF quantization, then served either through vLLM on GPU or llama.cpp on CPU and edge. VRAM, throughput and task accuracy are re-measured after every change, and the results feed back into the compression step."
    >
      <text x={20} y={26} fill={FAINT} fontSize={11} letterSpacing="1.2">
        THE STACK I OWN
      </text>

      {/* pipeline */}
      <Box x={20} y={70} w={160} h={64} />
      <text x={100} y={97} fill={HEAD} fontSize={12} textAnchor="middle">
        Open-weights base
      </text>
      <text x={100} y={115} fill={BODY} fontSize={10} textAnchor="middle">
        chosen for the domain
      </text>
      <Arrow x1={180} y1={102} x2={221} y2={102} />

      <Box x={225} y={70} w={170} h={64} />
      <text x={310} y={97} fill={HEAD} fontSize={12} textAnchor="middle">
        Adapt
      </text>
      <text x={310} y={115} fill={BODY} fontSize={10} textAnchor="middle">
        LoRA · QLoRA · SFT
      </text>
      <Arrow x1={395} y1={102} x2={436} y2={102} />

      <Box x={440} y={70} w={175} h={64} accent />
      <text x={527} y={97} fill={ACCENT} fontSize={12} textAnchor="middle">
        Compress
      </text>
      <text x={527} y={115} fill={BODY} fontSize={10} textAnchor="middle">
        AWQ 4-bit · GGUF K-quant
      </text>

      {/* branch to two runtimes */}
      <path d="M 615 102 L 640 102 L 640 58 L 661 58" fill="none" stroke={L} strokeWidth={1} markerEnd="url(#arrowhead)" />
      <path d="M 640 102 L 640 146 L 661 146" fill="none" stroke={L} strokeWidth={1} markerEnd="url(#arrowhead)" />

      <Box x={665} y={28} w={195} h={60} />
      <text x={762} y={52} fill={HEAD} fontSize={12} textAnchor="middle">
        vLLM · GPU
      </text>
      <text x={762} y={70} fill={BODY} fontSize={10} textAnchor="middle">
        PagedAttention · batching
      </text>

      <Box x={665} y={116} w={195} h={60} />
      <text x={762} y={140} fill={HEAD} fontSize={12} textAnchor="middle">
        llama.cpp · CPU / edge
      </text>
      <text x={762} y={158} fill={BODY} fontSize={10} textAnchor="middle">
        GGUF · Metal · no GPU
      </text>

      {/* measurement band */}
      <text x={20} y={238} fill={FAINT} fontSize={11} letterSpacing="1.2">
        RE-MEASURED AFTER EVERY CHANGE
      </text>
      {[
        ["VRAM footprint", "does it still fit"],
        ["Tokens/sec under batch", "at real concurrency"],
        ["Task accuracy delta", "on a held domain eval set"],
      ].map(([head, sub], i) => {
        const x = 20 + i * 285;
        return (
          <g key={head}>
            <Box x={x} y={252} w={270} h={62} />
            <text x={x + 135} y={278} fill={HEAD} fontSize={12} textAnchor="middle">
              {head}
            </text>
            <text x={x + 135} y={296} fill={BODY} fontSize={10} textAnchor="middle">
              {sub}
            </text>
          </g>
        );
      })}

      {/* feedback loop */}
      <path
        d="M 155 252 L 155 200 L 527 200 L 527 140"
        fill="none"
        stroke={ACCENT}
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.75}
        markerEnd="url(#arrowhead)"
      />
      <text x={341} y={193} fill={ACCENT} fontSize={10} textAnchor="middle">
        results decide the next quantization
      </text>

      <text x={440} y={352} fill={FAINT} fontSize={11} textAnchor="middle">
        perplexity is not the test — the domain eval set is
      </text>
    </Frame>
  );
}

/* --------------------------------------------------------------- 05 */
export function PentestHarnessDiagram() {
  const loop: [number, number, string, string][] = [
    [20, 150, "Recon", "map the surface"],
    [200, 165, "Hypothesise", "where it likely gives"],
    [395, 175, "Generate cases", "targeted, not a wordlist"],
    [600, 185, "Execute & observe", "what actually happened"],
  ];
  return (
    <Frame
      viewBox="0 0 880 430"
      label="An AI-driven penetration testing loop: recon maps the surface, the model hypothesises where a target is likely to give, generates targeted test cases rather than a generic wordlist, executes and observes. What comes back feeds the next hypothesis. Candidate findings are reproduced before any human sees them, then ranked, reported and re-tested. A dedicated module adds coverage for AI-specific surfaces."
    >
      <text x={20} y={26} fill={FAINT} fontSize={11} letterSpacing="1.2">
        THE HARNESS
      </text>

      {/* AI-product coverage module feeding the generator */}
      <rect x={368} y={8} width={230} height={44} rx={3} fill="none" stroke={ACCENT} strokeDasharray="3 3" />
      <text x={483} y={26} fill={ACCENT} fontSize={10} textAnchor="middle">
        AI-product module
      </text>
      <text x={483} y={40} fill={BODY} fontSize={9} textAnchor="middle">
        injection · tool abuse · agent reach
      </text>
      <line x1={482} y1={52} x2={482} y2={70} stroke={ACCENT} strokeDasharray="3 3" markerEnd="url(#arrowhead)" opacity={0.8} />

      {loop.map(([x, w, head, sub], i) => (
        <g key={head}>
          <Box x={x} y={76} w={w} h={64} accent={i === 2} />
          <text x={x + w / 2} y={104} fill={i === 2 ? ACCENT : HEAD} fontSize={12} textAnchor="middle">
            {head}
          </text>
          <text x={x + w / 2} y={122} fill={BODY} fontSize={10} textAnchor="middle">
            {sub}
          </text>
          {i < 3 && <Arrow x1={x + w} y1={108} x2={loop[i + 1][0] - 4} y2={108} />}
        </g>
      ))}

      {/* agentic feedback */}
      <path
        d="M 640 140 L 640 180 L 282 180 L 282 144"
        fill="none"
        stroke={ACCENT}
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.8}
        markerEnd="url(#arrowhead)"
      />
      <text x={461} y={173} fill={ACCENT} fontSize={10} textAnchor="middle">
        what came back decides what to try next
      </text>

      {/* out of the loop, into verification */}
      <path d="M 760 140 L 760 226" fill="none" stroke={L} strokeWidth={1} markerEnd="url(#arrowhead)" />

      <Box x={470} y={230} w={315} h={64} />
      <text x={627} y={258} fill={HEAD} fontSize={12} textAnchor="middle">
        Verify & reproduce
      </text>
      <text x={627} y={276} fill={BODY} fontSize={10} textAnchor="middle">
        nothing reaches a human unproven
      </text>

      <Arrow x1={470} y1={262} x2={426} y2={262} />

      <Box x={90} y={230} w={330} h={64} />
      <text x={255} y={258} fill={HEAD} fontSize={12} textAnchor="middle">
        Rank · report · re-test
      </text>
      <text x={255} y={276} fill={BODY} fontSize={10} textAnchor="middle">
        with the fix, then proven closed
      </text>

      <line x1={20} y1={340} x2={860} y2={340} stroke={L} strokeDasharray="4 4" />
      <text x={440} y={366} fill={FAINT} fontSize={11} textAnchor="middle">
        runs only under engagement, against systems there is written authorisation to test
      </text>
    </Frame>
  );
}

export function Diagram({ kind }: { kind: string }) {
  if (kind === "phi-boundary") return <PhiBoundaryDiagram />;
  if (kind === "claims-pipeline") return <ClaimsPipelineDiagram />;
  if (kind === "rag-gate") return <RagGateDiagram />;
  if (kind === "inference-stack") return <InferenceStackDiagram />;
  if (kind === "pentest-harness") return <PentestHarnessDiagram />;
  return null;
}
