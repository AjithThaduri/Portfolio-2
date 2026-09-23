"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { glossaryById } from "@/lib/glossary";

/* <Term id="rag">RAG</Term> — dotted underline; hover, focus or tap shows the
   one-line definition from lib/glossary.ts. Unknown ids render plain text. */
export const Term = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const entry = glossaryById(id);
  const [open, setOpen] = useState(false);
  const tipId = useId();
  if (!entry) return <>{children}</>;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-describedby={open ? tipId : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="cursor-help border-b border-dotted border-accent text-inherit"
      >
        {children}
      </button>
      {open && (
        <span
          id={tipId}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-30 mb-2 w-64 -translate-x-1/2 rounded-2xl border border-line bg-raised p-4 text-left text-sm font-normal not-italic leading-snug text-muted shadow-[0_20px_40px_-20px_rgba(0,0,0,0.4)]"
        >
          <span className="block font-medium text-text">{entry.term}</span>
          <span className="mt-1 block">{entry.short}</span>
          <Link href={`/glossary#${entry.id}`} className="mt-2 block text-xs text-accent">
            Glossary →
          </Link>
        </span>
      )}
    </span>
  );
};
