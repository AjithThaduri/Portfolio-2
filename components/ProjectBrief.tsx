"use client";

import { useState } from "react";
import { ENGAGE, SITE } from "@/lib/content";

/* A short form that composes an email — no backend, nothing stored.
   Submitting opens the visitor's mail app with the brief filled in. */
export const ProjectBrief = () => {
  const [type, setType] = useState(ENGAGE.brief.types[0]);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [constraints, setConstraints] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `${type} — ${name || "new project"}`;
    const body = [
      `Type: ${type}`,
      ...(name ? [`From: ${name}`] : []),
      "",
      "What we're building:",
      about,
      ...(constraints ? ["", "Constraints (data, timeline, stack):", constraints] : []),
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "mt-2 w-full rounded-2xl border border-line bg-ink px-4 py-3 text-text placeholder:text-faint focus:border-accent focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-line bg-raised p-6 sm:p-8">
      <fieldset>
        <legend className="text-sm font-medium text-text">What kind of help?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {ENGAGE.brief.types.map((t) => (
            <label
              key={t}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
                type === t ? "border-text bg-text text-ink" : "border-line text-muted hover:text-text"
              }`}
            >
              <input
                type="radio"
                name="type"
                value={t}
                checked={type === t}
                onChange={() => setType(t)}
                className="sr-only"
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 block text-sm font-medium text-text">
        Your name or company <span className="font-normal text-faint">(optional)</span>
        <input value={name} onChange={(e) => setName(e.target.value)} className={field} autoComplete="organization" />
      </label>

      <label className="mt-6 block text-sm font-medium text-text">
        What are you trying to build?
        <textarea
          required
          rows={4}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="A few sentences is plenty."
          className={field}
        />
      </label>

      <label className="mt-6 block text-sm font-medium text-text">
        Any constraints? <span className="font-normal text-faint">(optional)</span>
        <textarea
          rows={3}
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          placeholder="Sensitive data, deadlines, existing stack, budget…"
          className={field}
        />
      </label>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-faint">Opens in your email app. Nothing is sent or stored by this site.</p>
        <button
          type="submit"
          className="rounded-full bg-text px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent"
        >
          Write the email →
        </button>
      </div>
    </form>
  );
};
