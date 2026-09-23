import Link from "next/link";
import { CAPABILITIES, Cap } from "@/lib/content";
import { Reveal } from "./Reveal";

/** Seven tiles linking to /capabilities/[slug]. `exclude` hides the current one. */
export const CapabilityGrid = ({ exclude }: { exclude?: Cap }) => (
  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
    {CAPABILITIES.filter((c) => c.slug !== exclude).map((c, i) => (
      <li key={c.slug}>
        <Reveal delay={0.03 * i} className="h-full">
          <Link
            href={`/capabilities/${c.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-line bg-raised p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50"
          >
            <span className="flex items-center justify-between gap-3 font-medium text-text group-hover:text-accent">
              {c.title}
              <span aria-hidden className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent">
                →
              </span>
            </span>
            <span className="mt-2 text-sm font-light leading-snug text-muted">{c.plain}</span>
          </Link>
        </Reveal>
      </li>
    ))}
  </ul>
);
