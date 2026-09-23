import Link from "next/link";
import { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Small mono label with a short accent rule — used above every heading. */
export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
    <span aria-hidden className="h-px w-6 bg-accent-vivid" />
    {children}
  </p>
);

export const SectionHead = ({
  eyebrow,
  title,
  lede,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  className?: string;
}) => (
  <Reveal className={`mb-14 max-w-3xl md:mb-20 ${className}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-6 text-balance text-3xl font-medium leading-[1.1] tracking-[-0.025em] text-text sm:text-4xl md:text-[2.75rem]">
      {title}
    </h2>
    {lede && (
      <p className="mt-6 max-w-2xl text-pretty text-lg font-light leading-relaxed text-muted">
        {lede}
      </p>
    )}
  </Reveal>
);

/** tone: which surface the band sits on. */
export const Section = ({
  id,
  children,
  tone = "ink",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  tone?: "ink" | "surface";
  className?: string;
}) => (
  <section
    id={id}
    className={`relative scroll-mt-20 overflow-hidden px-6 py-24 sm:px-10 md:py-36 ${
      tone === "surface" ? "bg-surface" : "bg-ink"
    } ${className}`}
  >
    <div className="relative mx-auto max-w-6xl">{children}</div>
  </section>
);

/** The opening block of an inner page: breadcrumb, big title, lede. */
export const PageHeader = ({
  crumb,
  title,
  lede,
  children,
}: {
  crumb: string;
  title: ReactNode;
  lede?: string;
  children?: ReactNode;
}) => (
  <header className="relative overflow-hidden px-6 pb-16 pt-36 sm:px-10 md:pb-24 md:pt-44">
    <Glow />
    <div className="relative mx-auto max-w-6xl">
      <Reveal>
        <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.2em]">
          <Link href="/" className="text-faint transition-colors hover:text-text">
            Home
          </Link>
          <span aria-hidden className="mx-3 text-line">/</span>
          <span className="text-accent">{crumb}</span>
        </nav>
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="mt-8 max-w-4xl text-balance text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-text sm:text-5xl md:text-[4rem]">
          {title}
        </h1>
      </Reveal>
      {lede && (
        <Reveal delay={0.12}>
          <p className="mt-8 max-w-2xl text-pretty text-lg font-light leading-relaxed text-muted md:text-xl">
            {lede}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  </header>
);

/** Two soft discs of warm and cool light. Purely decorative. */
export const Glow = () => (
  <>
    <div
      aria-hidden
      className="glow -left-40 -top-40 h-[34rem] w-[34rem]"
      style={{ background: "var(--accent-vivid)", opacity: "var(--glow-a)" }}
    />
    <div
      aria-hidden
      className="glow -right-48 top-10 h-[28rem] w-[28rem]"
      style={{ background: "var(--teal)", opacity: "var(--glow-b)" }}
    />
  </>
);

/** Serif italic accent for a word or phrase inside a heading. */
export const Accent = ({ children }: { children: ReactNode }) => (
  <em className="font-serif font-normal italic tracking-normal text-accent">{children}</em>
);

const btnBase =
  "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300";

export const Button = ({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}) => {
  const cls =
    variant === "primary"
      ? `${btnBase} bg-text text-ink hover:bg-accent hover:shadow-[0_10px_30px_-10px_var(--accent-vivid)]`
      : `${btnBase} border border-line text-text hover:border-text`;
  const inner = (
    <>
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        {external ? "↗" : "→"}
      </span>
    </>
  );
  if (external || href.startsWith("mailto:"))
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
};
