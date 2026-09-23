import { ReactNode } from "react";

/* Practical notes: first-hand lessons, or evidence-backed production
   guidance (title="In production"). Never invented anecdotes.

   <FieldNote prompt="What broke first when you tried this?">
     Your answer here, in your own words.
   </FieldNote>

   Left empty, it renders as a dashed "your note needed" box showing the
   prompt. That only ever appears on drafts: lib/blueprints.ts refuses to
   build a published blueprint that still has an empty FieldNote. */
export const FieldNote = ({
  prompt,
  title = "From my notes",
  children,
}: {
  prompt?: string;
  title?: string;
  children?: ReactNode;
}) => {
  const empty =
    children === undefined ||
    children === null ||
    (typeof children === "string" && children.trim() === "");

  if (empty)
    return (
      <aside className="my-10 rounded-2xl border-2 border-dashed border-flag/50 bg-flag/5 px-6 py-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-flag">
          Your note needed · draft only
        </p>
        <p className="mt-2 text-[0.97rem] leading-relaxed text-text">{prompt}</p>
      </aside>
    );

  return (
    <aside className="relative my-10 rounded-2xl bg-surface px-7 py-6">
      <span aria-hidden className="absolute -left-px top-6 h-10 w-[3px] rounded-full bg-accent-vivid" />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{title}</p>
      <div className="mt-3 text-[1.02rem] leading-[1.75] text-text [&>p]:m-0 [&>p]:text-[1.02rem] [&>p]:font-normal [&>p]:leading-[1.75] [&>p]:text-text [&>p+p]:mt-3">
        {children}
      </div>
    </aside>
  );
};
