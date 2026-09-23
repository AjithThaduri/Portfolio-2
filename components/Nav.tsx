"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

export const Nav = () => {
  const pathname = usePathname();
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

  /* On the home page, section links become plain hashes so the smooth
     scroller can take them; elsewhere they navigate home first. */
  const resolve = (href: string) =>
    pathname === "/" && href.startsWith("/#") ? href.slice(1) : href;
  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);
  const onWork = pathname.startsWith("/work/");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border py-2 pl-5 pr-2 transition-all duration-500 ${
            scrolled || open
              ? "border-line bg-ink/75 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              : "border-transparent"
          }`}
        >
          <Link
            href="/"
            className="relative z-50 flex items-center gap-2.5 text-sm font-medium tracking-tight text-text"
            onClick={() => setOpen(false)}
          >
            <span
              aria-hidden
              className="flex h-7 w-7 items-center justify-center rounded-full bg-text font-serif text-[15px] italic text-ink"
            >
              A
            </span>
            Ajith Thaduri
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV.map((l) => {
              const active = isActive(l.href) || (l.label === "Work" && onWork);
              return (
                <Link
                  key={l.href}
                  href={resolve(l.href)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    active ? "bg-surface text-text" : "text-muted hover:text-text"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <ThemeToggle className="mx-1" />
            <a
              href="#contact"
              className="rounded-full bg-text px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent"
            >
              Get in touch
            </a>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle className="relative z-50" />
            <button
              type="button"
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`h-px w-5 bg-text transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-text transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
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
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 md:hidden"
          >
            {[...NAV, { label: "Contact", href: "#contact" }].map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 * i }}
              >
                <Link
                  href={resolve(l.href)}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-5 border-b border-line py-5 text-4xl font-medium tracking-tight text-text"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <a
              href={`mailto:${SITE.email}`}
              onClick={() => setOpen(false)}
              className="mt-10 break-all font-mono text-sm text-accent"
            >
              {SITE.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
