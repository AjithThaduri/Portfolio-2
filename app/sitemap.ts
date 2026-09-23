import { MetadataRoute } from "next";
import { FLAGSHIP, SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  });
  return [
    page("", 1.0),
    ...FLAGSHIP.map((p) => page(`/work/${p.slug}`, 0.8)),
    page("/about", 0.7),
    page("/teaching", 0.6),
  ];
}
