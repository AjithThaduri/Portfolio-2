"use client";

import { useState } from "react";

/* Code blocks in blueprints. Highlighting is done on the server
   (sugar-high); this wrapper adds the language label and a copy button. */
export const CodeBlock = ({
  html,
  raw,
  lang,
}: {
  html: string;
  raw: string;
  lang?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="not-prose group my-8 overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          {lang ?? "code"}
        </span>
        <button
          type="button"
          onClick={copy}
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint transition-colors hover:text-text"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
};
