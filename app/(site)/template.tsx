/* Re-mounts on every navigation, so each page fades in. Pure CSS (see
   .page-enter in globals.css) — no JS, and off for reduced motion. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
