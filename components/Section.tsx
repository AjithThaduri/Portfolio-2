import Link from "next/link";
import { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** The section's name, set as a quiet serif note. On wide screens it sits in
    the left margin beside the heading, like a running head in a book. */
export const Eyebrow = ({
  children,
  as: Tag = "p",
  className = "",
}: {
  children: ReactNode;
  as?: "p" | "h2";
  className?: string;
}) => (
  <Tag className={`font-serif text-lg font-normal italic leading-snug text-muted ${className}`}>{children}</Tag>
);

export const SectionHead = ({
  eyebrow,
  title,
  lede,
  rail = false,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  /** put the section name in the left margin (wide screens) */
  rail?: boolean;
  className?: string;
}) => {
  const heading = (
    <>
      <h2 className="text-balance text-3xl font-medium leading-[1.1] tracking-[-0.025em] text-text sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {lede && (
        <p className="mt-6 max-w-2xl text-pretty text-lg font-light leading-relaxed text-muted">
          {lede}
        </p>
      )}
    </>
  );
  if (rail)
    return (
      <Reveal className={`mb-14 grid gap-3 md:mb-20 lg:grid-cols-12 lg:gap-8 ${className}`}>
        <Eyebrow className="lg:col-span-3 lg:pt-2.5">{eyebrow}</Eyebrow>
        <div className="max-w-3xl lg:col-span-9">{heading}</div>
      </Reveal>
    );
  return (
    <Reveal className={`mb-14 max-w-3xl md:mb-20 ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="mt-3">{heading}</div>
    </Reveal>
  );
};

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
        <nav aria-label="Breadcrumb" className="text-sm">
          <Link href="/" className="text-muted transition-colors hover:text-text">
            Home
          </Link>
          <span aria-hidden className="mx-2.5 text-faint">/</span>
          <span aria-current="page" className="text-text">{crumb}</span>
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

/** Serif italic for a phrase inside a heading — a change of voice, not of colour. */
export const Accent = ({ children }: { children: ReactNode }) => (
  <em className="font-serif font-normal italic tracking-normal">{children}</em>
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
      {external && (
        <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          ↗
        </span>
      )}
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
