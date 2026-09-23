import {
  SITE,
  HERO,
  PRINCIPLES,
  FLAGSHIP,
  MORE_WORK,
  HELP,
  ABOUT,
  MODEL,
  TEACHING,
  STACK,
  FAQ,
} from "@/lib/content";

/* https://llmstxt.org — a plain-markdown summary for language models and
   agents that fetch the site. Generated from the same content the page uses,
   so it cannot drift out of date. */
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push("# Ajith Thaduri");
  lines.push("");
  lines.push(
    "> AI engineer and technical consultant. Builds production AI systems — agentic architectures, retrieval pipelines and self-hosted language models — for healthcare, legal and government organisations. Also builds AI-driven security tooling and teaches engineering teams.",
  );
  lines.push("");
  lines.push(`- Website: ${SITE.url}`);
  lines.push(`- Email: ${SITE.email}`);
  lines.push(`- LinkedIn: ${SITE.linkedin}`);
  lines.push(`- GitHub: ${SITE.github}`);
  lines.push(`- Location: ${SITE.location}`);
  lines.push("");

  lines.push("## Summary");
  lines.push("");
  lines.push(HERO.lede);
  lines.push("");
  for (const s of HERO.stats) lines.push(`- ${s.value} — ${s.label}`);
  lines.push("");
  for (const para of ABOUT.body) {
    lines.push(para);
    lines.push("");
  }

  lines.push("## How he works");
  lines.push("");
  lines.push(PRINCIPLES.lede);
  lines.push("");
  for (const p of PRINCIPLES.items) lines.push(`- **${p.title}** — ${p.body}`);
  lines.push("");

  lines.push("## Selected work");
  lines.push("");
  for (const p of FLAGSHIP) {
    lines.push(`### ${p.title}`);
    lines.push("");
    lines.push(`- Sector: ${p.sector}`);
    lines.push(`- Role: ${p.role}`);
    lines.push(`- Page: ${SITE.url}/work/${p.slug}`);
    lines.push(`- In plain terms: ${p.plain}`);
    lines.push(`- Problem: ${p.problem}`);
    for (const d of p.decisions) lines.push(`- ${d.head}: ${d.body}`);
    lines.push(`- Built with: ${p.stack.join(", ")}`);
    lines.push("");
  }

  lines.push("## Also built");
  lines.push("");
  for (const w of MORE_WORK.filter((w) => w.status === "live")) {
    lines.push(`- **${w.title}** (${w.sector}) — ${w.body}`);
  }
  lines.push("");

  lines.push("## Where he helps");
  lines.push("");
  for (const h of HELP.items) {
    lines.push(`### ${h.title}`);
    lines.push("");
    lines.push(h.body);
    for (const pt of h.points) lines.push(`- ${pt}`);
    lines.push("");
  }

  lines.push("## Model work");
  lines.push("");
  lines.push(MODEL.lede);
  lines.push("");
  for (const t of MODEL.tracks) lines.push(`- **${t.title}** — ${t.items.join("; ")}`);
  lines.push("");

  lines.push("## Teaching");
  lines.push("");
  lines.push(TEACHING.lede);
  lines.push("");
  for (const s of TEACHING.stats) lines.push(`- ${s.value} — ${s.label}`);
  lines.push("");
  for (const p of TEACHING.programmes) lines.push(`- **${p.title}** (${p.sector}) — ${p.body}`);
  lines.push("");
  lines.push(`Topics: ${TEACHING.topics.join(", ")}`);
  lines.push("");

  lines.push("## Technical stack");
  lines.push("");
  for (const g of STACK.groups) lines.push(`- **${g.group}**: ${g.items.join(", ")}`);
  lines.push("");

  lines.push("## Questions and answers");
  lines.push("");
  for (const f of FAQ) {
    lines.push(`### ${f.q}`);
    lines.push("");
    lines.push(f.a);
    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push(
    "Client and employer names are deliberately withheld across this site; work is described by sector and architecture. Dates and tenure are omitted by choice.",
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
