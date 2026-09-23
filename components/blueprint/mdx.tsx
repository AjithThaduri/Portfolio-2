import Link from "next/link";
import { isValidElement, ReactElement, ReactNode } from "react";
import { highlight } from "sugar-high";
import { CodeBlock } from "./CodeBlock";
import { FieldNote } from "./FieldNote";
import { Flow } from "./Flow";
import { Term } from "./Term";

/* Everything a blueprint's MDX can use. Plain Markdown gets the site's
   typography; the capitalised components below are the building blocks. */

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[`*_]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const text = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(text).join("");
  if (isValidElement(node)) return text((node as ReactElement<{ children?: ReactNode }>).props.children);
  return "";
};

/** h2 entries for the "On this page" list. */
export const tocFromBody = (body: string) =>
  body
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => {
      const label = l.replace(/^## /, "").trim();
      return { id: slugify(label), label: label.replace(/[`*_]/g, "") };
    });

/* ---------------------------------------------------------------- blocks */

const tones = {
  note: { bar: "var(--teal)", label: "Note" },
  tip: { bar: "var(--accent-vivid)", label: "Tip" },
  warn: { bar: "var(--flag)", label: "Watch out" },
};

export const Callout = ({
  tone = "note",
  title,
  children,
}: {
  tone?: keyof typeof tones;
  title?: string;
  children: ReactNode;
}) => (
  <aside
    className="my-8 rounded-2xl border border-line bg-surface px-6 py-5"
    style={{ borderLeft: `3px solid ${tones[tone].bar}` }}
  >
    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
      {title ?? tones[tone].label}
    </p>
    <div className="mt-2 text-[0.97rem] font-light leading-relaxed text-muted [&>p]:m-0 [&>p+p]:mt-3">
      {children}
    </div>
  </aside>
);

export const Steps = ({ children }: { children: ReactNode }) => (
  <ol className="my-10 space-y-4 [counter-reset:step]">{children}</ol>
);

export const Step = ({ title, children }: { title: string; children: ReactNode }) => (
  <li className="relative rounded-2xl border border-line bg-raised p-6 pl-16 [counter-increment:step] before:absolute before:left-6 before:top-6 before:font-serif before:text-2xl before:italic before:leading-none before:text-accent before:content-[counter(step,decimal-leading-zero)]">
    <p className="font-medium text-text">{title}</p>
    <div className="mt-2 text-[0.95rem] font-light leading-relaxed text-muted [&>p]:m-0 [&>p+p]:mt-3">
      {children}
    </div>
  </li>
);

/* Rows × columns comparison. A cell that is a number 0–3 renders as dots
   (more is better); anything else renders as text. */
export const Tradeoffs = ({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: { name: string; cells: (string | number)[]; best?: string }[];
  caption?: string;
}) => (
  <figure className="my-10 overflow-hidden rounded-3xl border border-line">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-surface">
            <th className="px-5 py-3.5 font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-faint">
              Approach
            </th>
            {columns.map((c) => (
              <th
                key={c}
                className="px-5 py-3.5 font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-faint"
              >
                {c}
              </th>
            ))}
            <th className="px-5 py-3.5 font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-faint">
              Best for
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t border-line align-top">
              <td className="px-5 py-4 font-medium text-text">{r.name}</td>
              {r.cells.map((c, i) => (
                <td key={i} className="px-5 py-4 text-muted">
                  {typeof c === "number" ? (
                    <span className="inline-flex gap-1" aria-label={`${c} of 3`}>
                      {[1, 2, 3].map((d) => (
                        <span
                          key={d}
                          className={`h-2 w-2 rounded-full ${d <= c ? "bg-accent-vivid" : "bg-line"}`}
                        />
                      ))}
                    </span>
                  ) : (
                    c
                  )}
                </td>
              ))}
              <td className="px-5 py-4 font-light text-muted">{r.best}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {caption && (
      <figcaption className="border-t border-line bg-surface px-5 py-3 text-xs text-faint">
        {caption}
      </figcaption>
    )}
  </figure>
);

/* ------------------------------------------------------------- markdown */

const H2 = ({ children }: { children?: ReactNode }) => {
  const id = slugify(text(children));
  return (
    <h2
      id={id}
      className="group mt-20 scroll-mt-28 text-2xl font-medium tracking-tight text-text sm:text-3xl"
    >
      <a href={`#${id}`} className="no-underline">
        {children}
        <span aria-hidden className="ml-2 text-faint opacity-0 transition-opacity group-hover:opacity-100">
          #
        </span>
      </a>
    </h2>
  );
};

const Pre = ({ children }: { children?: ReactNode }) => {
  if (!isValidElement(children)) return <pre>{children}</pre>;
  const props = (children as ReactElement<{ children?: ReactNode; className?: string }>).props;
  const raw = text(props.children).replace(/\n$/, "");
  const lang = props.className?.replace("language-", "");
  return <CodeBlock html={highlight(raw)} raw={raw} lang={lang} />;
};

export const mdxComponents = {
  h2: H2,
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="mt-12 text-xl font-medium tracking-tight text-text">{children}</h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mt-6 text-[1.07rem] font-light leading-[1.8] text-muted">{children}</p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mt-6 space-y-2.5 text-[1.05rem] font-light leading-relaxed text-muted [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.8em] [&>li]:before:h-px [&>li]:before:w-3 [&>li]:before:bg-accent-vivid">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mt-6 list-decimal space-y-2.5 pl-6 text-[1.05rem] font-light leading-relaxed text-muted marker:font-mono marker:text-sm marker:text-accent">
      {children}
    </ol>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-medium text-text">{children}</strong>
  ),
  a: ({ href = "", children }: { href?: string; children?: ReactNode }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} className="text-text underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
        {children}
      </Link>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text underline decoration-accent/50 underline-offset-4 hover:decoration-accent"
      >
        {children}
      </a>
    ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-10 border-l-2 border-accent-vivid pl-6 font-serif text-2xl italic leading-snug text-text [&>p]:m-0 [&>p]:font-serif [&>p]:text-2xl [&>p]:text-text">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children?: ReactNode }) => (
    <code className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-text">{children}</code>
  ),
  pre: Pre,
  hr: () => <hr className="my-16 border-line" />,
  table: ({ children }: { children?: ReactNode }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-line">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className="bg-surface px-4 py-3 font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-faint">
      {children}
    </th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="border-t border-line px-4 py-3 align-top font-light text-muted">{children}</td>
  ),
  Callout,
  Steps,
  Step,
  Tradeoffs,
  Flow,
  Term,
  FieldNote,
};
