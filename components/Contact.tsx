import { CONTACT, SITE } from "@/lib/content";
import { Reveal } from "./Reveal";

const links = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "LinkedIn", value: "in/ajiththaduri", href: SITE.linkedin },
  { label: "GitHub", value: "AjithThaduri", href: SITE.github },
];

export const Contact = () => (
  <section
    id="contact"
    className="relative scroll-mt-20 overflow-hidden border-t border-line bg-ink px-6 py-24 sm:px-10 md:py-32"
  >
    <span
      aria-hidden
      className="pointer-events-none absolute -right-4 top-6 select-none font-mono text-[11rem] font-medium leading-none text-line opacity-60 sm:text-[15rem] md:-right-8"
    >
      08
    </span>
    <div className="relative mx-auto max-w-6xl">
      <Reveal>
        <div className="mb-14 flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          <span className="text-accent">08</span>
          <span className="h-px flex-1 bg-line" aria-hidden />
          <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-faint">
            Contact
          </h2>
        </div>
      </Reveal>

      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="text-4xl font-medium leading-[1.05] tracking-tight text-text sm:text-5xl md:text-6xl">
              {CONTACT.headline[0]}
              <br />
              <span className="text-muted">{CONTACT.headline[1]}</span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-muted">
              {CONTACT.lede}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <ul className="mt-10 space-y-3">
              {CONTACT.availability.map((a) => (
                <li
                  key={a.text}
                  className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint"
                >
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 rounded-full ${
                      a.dot === "live" ? "bg-emerald-400" : "bg-accent"
                    }`}
                  />
                  {a.text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="border-t border-line">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  l.href.startsWith("mailto") ? undefined : "noopener noreferrer"
                }
                className="group flex items-baseline justify-between gap-6 border-b border-line py-7 transition-colors hover:border-accent"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                  {l.label}
                </span>
                <span className="min-w-0 flex-1 break-all text-right text-lg font-light text-text transition-colors group-hover:text-accent sm:text-xl">
                  {l.value}
                </span>
                <span
                  aria-hidden
                  className="text-faint transition-colors group-hover:text-accent"
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="border-t border-line px-6 py-10 sm:px-10">
    <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-faint sm:flex-row sm:items-center">
      <span>Ajith Thaduri</span>
      <span>{SITE.location}</span>
      <span>Built with Next.js</span>
    </div>
  </footer>
);
