import { getAllBlueprints, TYPE_LABEL } from "@/lib/blueprints";
import { SITE } from "@/lib/content";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getAllBlueprints()
    .filter((b) => !b.draft)
    .map(
      (b) => `    <item>
      <title>${esc(b.title)}</title>
      <link>${SITE.url}/blueprints/${b.slug}</link>
      <guid>${SITE.url}/blueprints/${b.slug}</guid>
      <category>${TYPE_LABEL[b.type]}</category>
      <pubDate>${new Date(`${b.published}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(b.summary)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Blueprints — Ajith Thaduri</title>
    <link>${SITE.url}/blueprints</link>
    <description>Open AI architectures you can build from.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
