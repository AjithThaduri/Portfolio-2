import type { RepoCard } from "@/lib/content";
import { Reveal } from "./Reveal";

const GitHubMark = ({ className = "" }: { className?: string }) => (
  <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" className={className}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

/** Cards linking to GitHub. `featured` renders larger cards for my own repos. */
export const RepoGrid = ({ repos, featured = false }: { repos: RepoCard[]; featured?: boolean }) => (
  <ul className={`grid gap-4 ${featured ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
    {repos.map((r, i) => {
      const [owner, name] = r.repo.split("/");
      return (
        <li key={r.repo}>
          <Reveal delay={0.03 * (i % 3)} className="h-full">
            <a
              href={`https://github.com/${r.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex h-full flex-col rounded-3xl border border-line bg-raised transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] ${
                featured ? "p-8" : "p-6"
              }`}
            >
              <span className="flex items-center gap-2.5 font-mono text-xs">
                <GitHubMark className="shrink-0 fill-faint transition-colors group-hover:fill-text" />
                <span className="min-w-0 truncate">
                  <span className="text-faint">{owner}/</span>
                  <span className="text-muted group-hover:text-text">{name}</span>
                </span>
                <span aria-hidden className="ml-auto text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                  ↗
                </span>
              </span>
              <span className={`mt-5 font-medium tracking-tight text-text group-hover:text-accent ${featured ? "text-2xl" : "text-lg"}`}>
                {r.title}
              </span>
              <span className="mt-3 flex-1 text-sm font-light leading-relaxed text-muted">{r.body}</span>
              <span className="mt-6 flex flex-wrap gap-1.5">
                {r.tags.map((t) => (
                  <span key={t} className="rounded-full bg-surface px-2.5 py-1 font-mono text-[10px] text-faint">
                    {t}
                  </span>
                ))}
              </span>
            </a>
          </Reveal>
        </li>
      );
    })}
  </ul>
);
