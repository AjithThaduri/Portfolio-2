# ajiththaduri.site

Personal site — AI engineering, consulting and teaching.

## Editing content

**All copy lives in `lib/content.ts`.** Components read from it; you should not
need to touch a component to change what the site says.

| What                          | Where in `lib/content.ts` |
| ----------------------------- | ------------------------- |
| Email, LinkedIn, GitHub       | `SITE`                    |
| Headline, lede, top stats     | `HERO`                    |
| Thesis quote + four principles| `THESIS`                  |
| The three deep case studies   | `FLAGSHIP`                |
| The "Also built" grid         | `MORE_WORK`               |
| Practice areas                | `PRACTICE`                |
| Teaching stats and topics     | `TEACHING`                |
| Stack groups                  | `STACK`                   |

### Adding a project

`MORE_WORK` ships with four entries marked `status: "draft"`. Fill one in and
change its status to `"live"`. Draft cards render greyed out with a
"DRAFT SLOT — FILL IN" label so they are obvious; set `SHOW_DRAFTS = false` at
the top of the file to hide them all before a deploy.

### House rules the copy follows

- Sectors, never client or employer names.
- No dates, no tenure, no years, anywhere.
- Nothing claimed that has not actually shipped.

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
