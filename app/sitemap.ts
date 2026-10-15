import { MetadataRoute } from "next";
import { CAPABILITIES, FLAGSHIP, PHOTOS, SITE } from "@/lib/content";
import { getAllBlueprints } from "@/lib/blueprints";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (
    path: string,
    priority: number,
    lastModified: Date | string = new Date(),
    images?: string[],
  ) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
    ...(images ? { images: images.map((src) => `${SITE.url}${src}`) } : {}),
  });
  // Photos of Ajith, listed against the pages that show them.
  const photos = [PHOTOS.avatar.src, PHOTOS.square.src, PHOTOS.landscape.src, PHOTOS.wide.src];
  return [
    page("", 1.0, undefined, photos),
    page("/work", 0.9),
    ...FLAGSHIP.map((p) => page(`/work/${p.slug}`, 0.8)),
    page("/blueprints", 0.9),
    ...getAllBlueprints()
      .filter((b) => !b.draft)
      .map((b) => page(`/blueprints/${b.slug}`, 0.8, b.updated ?? b.published)),
    ...CAPABILITIES.map((c) => page(`/capabilities/${c.slug}`, 0.6)),
    page("/open-source", 0.7),
    page("/about", 0.7, undefined, [PHOTOS.portrait.src, PHOTOS.square.src]),
    page("/work-with-me", 0.7),
    page("/teaching", 0.6),
    page("/glossary", 0.5),
  ];
}
