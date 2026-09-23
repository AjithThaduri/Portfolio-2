"use client";

import { useEffect, useState } from "react";

/** "On this page" list that highlights the section you're reading. */
export const Toc = ({ items }: { items: { id: string; label: string }[] }) => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!headings.length) return;

    // The active section is the last heading that has scrolled past a line
    // a third of the way down the screen.
    const update = () => {
      const line = window.innerHeight * 0.33;
      let current: string | null = null;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h.id;
      }
      // At the very bottom, the last short section may never cross the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = headings[headings.length - 1].id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">On this page</p>
      <ul className="mt-5 space-y-1 border-l border-line">
        {items.map((t) => {
          const on = t.id === active;
          return (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px block border-l py-1.5 pl-4 text-sm leading-snug transition-colors duration-300 ${
                  on ? "border-accent font-medium text-text" : "border-transparent text-muted hover:border-faint hover:text-text"
                }`}
              >
                {t.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
