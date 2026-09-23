# ajiththaduri.site

Personal site — AI engineering, consulting and teaching.

## Editing content

**All copy lives in `lib/content.ts`.** Components read from it; you should not
need to touch a component to change what the site says.

| Page / area              | What                                   | Where in `lib/content.ts`       |
| ------------------------ | -------------------------------------- | ------------------------------- |
| every page               | Email, LinkedIn, GitHub · nav · contact | `SITE`, `NAV`, `CONTACT`        |
| `/`                      | Hero, notes around the portrait        | `HERO`                          |
| `/`                      | Project cards                          | `WORK_INTRO`, `FLAGSHIP`        |
| `/`                      | "Also built" grid (+ show more)        | `MORE_WORK`, `MORE_WORK_INITIAL`|
| `/`                      | How I work · Where I can help          | `PRINCIPLES`, `HELP`            |
| `/work/[slug]`           | Full case study per `FLAGSHIP` entry   | `FLAGSHIP`                      |
| `/about`                 | Story, model work, tools, FAQ          | `ABOUT`, `MODEL`, `STACK`, `FAQ`|
| `/teaching`              | Teaching stats, programmes, topics     | `TEACHING`                      |
| `/work`                  | Every project, filterable              | `WORK_INDEX` + `caps` on each   |
| `/capabilities/[slug]`   | Seven capability hubs                  | `CAPABILITIES`                  |
| `/work-with-me`          | Engagements, process, project brief    | `ENGAGE`                        |
| `/blueprints`            | Intro text (articles are MDX, below)   | `BLUEPRINTS_INTRO`              |
| `/glossary`              | Plain-language AI terms                | `lib/glossary.ts`               |

### Adding a project

Add an entry to `MORE_WORK` with `status: "live"`. The first
`MORE_WORK_INITIAL` entries show on load; the rest sit behind "Show more", so
order the list by what you most want seen. `status: "draft"` cards render
greyed out with a "DRAFT SLOT — FILL IN" label; `SHOW_DRAFTS = false` hides them.

A new flagship case study is a new `FLAGSHIP` entry with a unique `slug` — its
page at `/work/<slug>` is generated automatically.

### Writing a blueprint

Blueprints are long-form articles, so they live as MDX in
`content/blueprints/<slug>.mdx` rather than in `lib/content.ts`. The
frontmatter fields are documented at the top of `lib/blueprints.ts`.

- `draft: true` shows the article locally and on Vercel preview deploys, with a
  "Draft — awaiting review" banner, and hides it on production. Remove the
  line (or set `false`) once every technical claim has been checked.
- `status` is a promise to the reader: `production` only if it has run in a
  live system.
- Building blocks available inside MDX: `<Flow>` (interactive diagram, exports
  Mermaid), `<Tradeoffs>` (comparison table), `<Steps>`/`<Step>`,
  `<Callout tone="note|tip|warn">`, and `<Term id="rag">RAG</Term>` for glossary
  tooltips (ids from `lib/glossary.ts`). Fenced code blocks are highlighted.
- Every article gets its own share image, a raw-Markdown copy at
  `/blueprints/<slug>/raw`, an RSS entry, sitemap entry and `llms.txt` line.
- Blueprints are the one place dates appear on the site.

### House rules the copy follows

- Sectors, never client or employer names.
- No dates, no tenure, no years — except publish dates on blueprints.
- Nothing claimed that has not actually shipped.
- Voice: first person, calm and specific — detail over adjectives.

### Architecture diagrams

`components/Diagrams.tsx` — hand-drawn inline SVG, no dependencies. Each
flagship project names one via its `diagram` field.

### Portrait

`public/img/portrait.webp` — frame 001 of the original sequence, chosen because
it has the most level gaze and the most relaxed expression; the later frames are
all chin-up and read as posed. Treatment is deliberately plain: crop clear of the
watermark → desaturate to ~20% colour → top-down falloff to sink the rim-light
halo above the head → light vignette → fine grain. The aim is an ordinary
photograph, not an art-directed hero shot.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```
