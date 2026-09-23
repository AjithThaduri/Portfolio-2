import { getAllBlueprints, getBlueprint, SITE_LICENSE } from "@/lib/blueprints";
import { SITE } from "@/lib/content";

/* The article as plain Markdown — for copying into docs, notes or an LLM.
   JSX blocks (diagrams, tables) are left as-is; they read fine as text. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllBlueprints().map((b) => ({ slug: b.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getBlueprint(slug);
  if (!b) return new Response("Not found", { status: 404 });
  const head = [
    `# ${b.title}`,
    "",
    `> ${b.summary}`,
    "",
    `Source: ${SITE.url}/blueprints/${b.slug} — ${SITE_LICENSE}`,
    "",
    "",
  ].join("\n");
  // Glossary tooltips become plain words; everything else stays as written.
  const body = b.body.replace(/<Term id="[^"]*">([^<]*)<\/Term>/g, "$1").trim();
  return new Response(head + body + "\n", {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
