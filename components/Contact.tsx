"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT, NAV, SITE } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Accent, Eyebrow, Glow } from "./Section";

const links = [
  { label: "LinkedIn", value: "in/ajiththaduri", href: SITE.linkedin },
  { label: "GitHub", value: "AjithThaduri", href: SITE.github },
];

const CopyEmail = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-line bg-raised p-2 sm:flex-row sm:items-center">
      <a
        href={`mailto:${SITE.email}`}
        className="group flex min-w-0 flex-1 items-center gap-4 rounded-[20px] px-5 py-4 transition-colors hover:bg-surface"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Email</span>
        <span className="min-w-0 truncate text-lg font-light text-text transition-colors group-hover:text-accent sm:text-xl">
          {SITE.email}
        </span>
      </a>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="rounded-full bg-text px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent sm:mr-1"
      >
        {copied ? "Copied ✓" : "Copy email"}
      </button>
    </div>
  );
};

export const Contact = () => (
  <section
    id="contact"
    className="relative scroll-mt-20 overflow-hidden border-t border-line bg-ink px-6 py-24 sm:px-10 md:py-36"
  >
    <Glow />
    <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
      <div>
        <Reveal>
          <Eyebrow>{CONTACT.eyebrow}</Eyebrow>
          <h2 className="mt-8 text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-text sm:text-5xl md:text-6xl">
            {CONTACT.headline[0]}
            <br />
            <Accent>{CONTACT.headline[1]}</Accent>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-8 max-w-xl text-pretty text-lg font-light leading-relaxed text-muted">
            {CONTACT.lede}
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <ul className="mt-10 flex flex-wrap gap-3">
            {CONTACT.availability.map((a) => (
              <li
                key={a.text}
                className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-xs text-muted"
              >
                <span
                  aria-hidden
                  className={`h-1.5 w-1.5 rounded-full ${
                    a.dot === "live" ? "bg-emerald-400" : "bg-accent-vivid"
                  }`}
                />
                {a.text}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="lg:pt-16">
        <CopyEmail />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-3xl border border-line px-6 py-5 transition-colors hover:border-accent/50"
            >
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  {l.label}
                </span>
                <span className="mt-1 block text-text transition-colors group-hover:text-accent">
                  {l.value}
                </span>
              </span>
              <span
                aria-hidden
                className="text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="border-t border-line px-6 py-10 sm:px-10">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="font-medium text-text">Ajith Thaduri</span>
        <span aria-hidden>·</span>
        <span>{SITE.location}</span>
      </div>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
        {NAV.map((l) => (
          <Link key={l.href} href={l.href} className="transition-colors hover:text-text">
            {l.label}
          </Link>
        ))}
        <a href="#top" className="transition-colors hover:text-text">
          Back to top ↑
        </a>
      </nav>
    </div>
  </footer>
);
