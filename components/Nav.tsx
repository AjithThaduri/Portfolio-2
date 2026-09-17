"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-line bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <Link
            href="#top"
            className="relative z-50 font-mono text-sm tracking-tight"
            onClick={() => setOpen(false)}
          >
            <span className="text-text">Ajith</span>
            <span className="text-accent">Thaduri</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-text"
              >
                {l.label}
              </Link>
            ))}
            <ThemeToggle />
            <a
              href={`mailto:${SITE.email}`}
              className="border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle className="relative z-50" />
          <button
            type="button"
            className="relative z-50 -mr-2 flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-px w-5 bg-text transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-text transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-text transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-ink px-8 lg:hidden"
          >
            {NAV.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-5 border-b border-line py-4 text-3xl font-light text-text"
              >
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {l.label}
              </Link>
            ))}
            <a
              href={`mailto:${SITE.email}`}
              onClick={() => setOpen(false)}
              className="mt-8 break-all font-mono text-sm text-accent"
            >
              {SITE.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
