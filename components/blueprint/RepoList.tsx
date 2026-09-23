/* "Repos to explore" — open-source projects related to a blueprint.
   Listed from frontmatter; these are other people's work, linked with credit. */
export const RepoList = ({ repos }: { repos: { repo: string; note: string }[] }) => {
  if (!repos.length) return null;
  return (
    <section aria-labelledby="repos" className="mt-20">
      <h2 id="repos" className="scroll-mt-28 text-2xl font-medium tracking-tight text-text sm:text-3xl">
        Repos to explore
      </h2>
      <p className="mt-3 text-sm text-faint">
        Open-source projects worth reading alongside this. Each belongs to its authors; check the licence before using it.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {repos.map(({ repo, note }) => {
          const [owner, name] = repo.split("/");
          return (
            <li key={repo}>
              <a
                href={`https://github.com/${repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-line bg-raised p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50"
              >
                <span className="flex items-center gap-2.5">
                  <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" className="shrink-0 fill-faint group-hover:fill-text">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                  </svg>
                  <span className="min-w-0 truncate font-mono text-sm">
                    <span className="text-faint">{owner}/</span>
                    <span className="text-text group-hover:text-accent">{name}</span>
                  </span>
                  <span aria-hidden className="ml-auto text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </span>
                <span className="mt-2 text-sm font-light leading-snug text-muted">{note}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
