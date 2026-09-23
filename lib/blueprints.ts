import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlueprintMeta } from "./blueprint-meta";

export * from "./blueprint-meta";

/* ---------------------------------------------------------------------------
   BLUEPRINTS — long-form articles live as MDX in content/blueprints/.
   One file per article; the file name is the URL slug.

   Frontmatter:
     title      string
     summary    one or two plain sentences (shown on cards and "In plain terms")
     type       "blueprint" | "teardown" | "note"
     level      "beginner" | "intermediate" | "advanced"
     status     "production" | "tested" | "experimental"
                — production: I've run this in a live system
                — tested:     built and measured, not yet in production
                — experimental: an idea worth trying, evidence still thin
     topics     string[]   e.g. ["retrieval", "documents"]
     published  YYYY-MM-DD
     updated    YYYY-MM-DD (optional)
     related    FLAGSHIP slug (optional) — links "Where I've used this"
     draft      true while awaiting review. Drafts show in dev and on
                preview deploys, never on the production site.
--------------------------------------------------------------------------- */

export type Blueprint = BlueprintMeta & { body: string };

const DIR = path.join(process.cwd(), "content", "blueprints");

/** Drafts are hidden only on the production deployment. */
export const showDrafts = process.env.VERCEL_ENV !== "production";

const read = (file: string): Blueprint => {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title,
    summary: data.summary,
    type: data.type ?? "blueprint",
    level: data.level ?? "intermediate",
    status: data.status ?? "experimental",
    topics: data.topics ?? [],
    published: String(data.published),
    updated: data.updated ? String(data.updated) : undefined,
    related: data.related,
    draft: Boolean(data.draft),
    readingMinutes: Math.max(1, Math.round(words / 220)),
    body: content,
  };
};

export const getAllBlueprints = (): Blueprint[] => {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(read)
    .filter((b) => showDrafts || !b.draft)
    .sort((a, b) => (b.updated ?? b.published).localeCompare(a.updated ?? a.published));
};

export const getBlueprint = (slug: string) => getAllBlueprints().find((b) => b.slug === slug);

/** Card-safe metadata without the body, for client components. */
export const getBlueprintMetas = (): BlueprintMeta[] =>
  getAllBlueprints().map((b) => {
    const meta: Partial<Blueprint> = { ...b };
    delete meta.body;
    return meta as BlueprintMeta;
  });

