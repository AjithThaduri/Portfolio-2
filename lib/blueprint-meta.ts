/* Browser-safe blueprint types and labels (no fs). lib/blueprints.ts
   re-exports these alongside the loader. */

export type BlueprintType = "blueprint" | "teardown" | "note";
export type Level = "beginner" | "intermediate" | "advanced";
export type Status = "production" | "tested" | "experimental";

export type BlueprintMeta = {
  slug: string;
  title: string;
  summary: string;
  type: BlueprintType;
  level: Level;
  status: Status;
  topics: string[];
  published: string;
  updated?: string;
  related?: string;
  draft: boolean;
  readingMinutes: number;
};

export const TYPE_LABEL: Record<BlueprintType, string> = {
  blueprint: "Blueprint",
  teardown: "Teardown",
  note: "Note",
};

export const STATUS_LABEL: Record<Status, string> = {
  production: "Used in production",
  tested: "Built & tested",
  experimental: "Experimental",
};

export const LEVEL_LABEL: Record<Level, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export const SITE_LICENSE = "CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)";
