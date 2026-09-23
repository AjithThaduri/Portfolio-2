"use client";

import { useState } from "react";

/** Copies the article's raw Markdown, so anyone can drop it into their own docs. */
export const CopyMarkdown = ({ slug }: { slug: string }) => {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const copy = async () => {
    try {
      const res = await fetch(`/blueprints/${slug}/raw`);
      await navigator.clipboard.writeText(await res.text());
      setState("copied");
    } catch {
      setState("error");
    }
    setTimeout(() => setState("idle"), 1800);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-text transition-colors hover:border-text"
    >
      {state === "copied" ? "Copied ✓" : state === "error" ? "Couldn't copy" : "Copy as Markdown"}
    </button>
  );
};
