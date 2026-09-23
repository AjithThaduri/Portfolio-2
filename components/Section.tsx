import Link from "next/link";
import { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Small mono label with a short accent rule — used above every heading. */
export const Eyebrow = ({ children, as: Tag = "p" }: { children: ReactNode; as?: "p" | "h2" }) => (
  <Tag className="flex items-center gap-3 font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-accent">
    <span aria-hidden className="bg-gradient-brand h-px w-6" />
    {children}
  </Tag>
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
  tone?: "ink" | "surface" | "cool";
  className?: string;
}) => (
  <section
    id={id}
    className={`relative scroll-mt-20 overflow-hidden px-6 py-24 sm:px-10 md:py-36 ${
      tone === "surface" ? "bg-surface" : tone === "cool" ? "bg-surface-cool" : "bg-ink"
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
    <Glow soft />
    <div className="relative mx-auto max-w-6xl">
      <Reveal fade={false}>
        <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.2em]">
          <Link href="/" className="text-muted transition-colors hover:text-text">
            Home
          </Link>
          <span aria-hidden className="mx-3 text-line">/</span>
          <span className="text-accent">{crumb}</span>
        </nav>
      </Reveal>
      <Reveal fade={false} delay={0.06}>
        <h1 className="mt-8 max-w-4xl text-balance text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-text sm:text-5xl md:text-[4rem]">
          {title}
        </h1>
      </Reveal>
      {lede && (
        <Reveal fade={false} delay={0.12}>
          <p className="mt-8 max-w-2xl text-pretty text-lg font-light leading-relaxed text-muted md:text-xl">
            {lede}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  </header>
);

/** Aurora: three soft discs — tangerine, rose, teal — drifting slowly.
    Strong enough to give the light theme warmth; purely decorative. */
export const Glow = ({ soft = false }: { soft?: boolean }) => {
  // Inner-page headers carry small text (breadcrumbs, meta) right on top of
  // the glow, so they get a softer aurora kept away from the text.
  const k = soft ? 0.55 : 1;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`glow aurora-a h-[36rem] w-[36rem] ${soft ? "-left-72 -top-72" : "-left-40 -top-48"}`}
        style={{ background: "var(--accent-vivid)", opacity: `calc(var(--glow-a) * ${k})` }}
      />
      <div
        className="glow aurora-b left-[35%] -top-64 h-[30rem] w-[30rem]"
        style={{ background: "var(--g2)", opacity: `calc(var(--glow-c) * ${k})` }}
      />
      <div
        className="glow aurora-c -right-48 top-10 h-[32rem] w-[32rem]"
        style={{ background: "var(--teal)", opacity: `calc(var(--glow-b) * ${k})` }}
      />
    </div>
  );
};

/** Serif italic accent for a word or phrase inside a heading. */
export const Accent = ({ children }: { children: ReactNode }) => (
  <em className="text-gradient inline-block pb-2 pr-2 font-serif font-normal italic tracking-normal">{children}</em>
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
