import { ReactNode } from "react";

export const SectionHead = ({
  n,
  title,
  lede,
}: {
  n: string;
  title: string;
  lede?: string;
}) => (
  <div className="mb-16 max-w-3xl">
    <div className="mb-6 flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
      <span className="text-accent">{n}</span>
      <span className="h-px flex-1 bg-line" aria-hidden />
      <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-faint">
        {title}
      </h2>
    </div>
    {lede && (
      <p className="text-balance text-2xl font-light leading-snug text-text sm:text-3xl">
        {lede}
      </p>
    )}
  </div>
);

/** tone: which surface the band sits on. texture: optional background pattern. */
export const Section = ({
  id,
  children,
  tone = "ink",
  texture = "none",
  ghost,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  tone?: "ink" | "surface";
  texture?: "none" | "grid" | "rule";
  ghost?: string;
  className?: string;
}) => (
  <section
    id={id}
    className={`relative scroll-mt-20 overflow-hidden border-t border-line px-6 py-24 sm:px-10 md:py-32 ${
      tone === "surface" ? "bg-surface" : "bg-ink"
    } ${className}`}
  >
    {texture !== "none" && (
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-70 ${
          texture === "grid" ? "texture-grid" : "texture-rule"
        }`}
      />
    )}
    {ghost && (
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 top-6 select-none font-mono text-[11rem] font-medium leading-none text-line opacity-60 sm:text-[15rem] md:-right-8"
      >
        {ghost}
      </span>
    )}
    <div className="relative mx-auto max-w-6xl">{children}</div>
  </section>
);
