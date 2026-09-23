/* Browser-safe blueprint types and labels (no fs). lib/blueprints.ts
   re-exports these alongside the loader. */

export type BlueprintType = "blueprint" | "teardown" | "note";
export type Status = "production" | "tested" | "experimental";

export type BlueprintMeta = {
  slug: string;
  title: string;
  summary: string;
  type: BlueprintType;
  status: Status;
  topics: string[];
  published: string;
  updated?: string;
  related?: string;
  draft: boolean;
  readingMinutes: number;
  changelog: { date: string; note: string }[];
  repos: { repo: string; note: string }[];
  code?: string;
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

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export const SITE_LICENSE = "CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)";

/** Companion repository with runnable code for every blueprint. */
export const CODE_REPO = "https://github.com/AjithThaduri/blueprints";
