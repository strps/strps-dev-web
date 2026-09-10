# Project Content Structure (for AI generation)

Reference for generating content to fill a `projects` collection entry (`apps/payload/src/collections/Projects/index.ts`). Use this to produce structured output an editor can paste into the CMS, or to draft a JSON payload for the Payload API/import.

## Fields

### title (required)
Plain text, localized. The project name as it appears everywhere (cards, page heading, nav).

### heroImage
Upload reference (media collection). Not AI-generatable — flag as "needs image" if none supplied.

### links
- `github` — text, URL to the repo (optional)
- `liveSite` — text, URL to the deployed/live project (optional)

### techStack (array, min 1 row)
List of `{ name: string }` rows. One row per technology, e.g. `Next.js`, `Payload CMS`, `PostgreSQL`, `Tailwind CSS`. Short names only — no versions or descriptions.

### caseStudy (group)
Structured copy used across the home card and the `/projects` accordion. Keep each field to its stated purpose — don't blend them.

| Field | Type | Localized | Used for | Guidance |
|---|---|---|---|---|
| `tag` | text | yes | Home card eyebrow / list category | 1-3 words, e.g. "Product", "Template / product" |
| `year` | text | no | Home card / list year | e.g. `"2025"` or `"2024–2026"` |
| `problem` | textarea | yes | Home card "Problem —" line | 1-2 sentences: what problem/need prompted the project |
| `contribution` | textarea | yes | Home card "What I did —" line | 1-2 sentences: the author's specific role/work, first person or active voice |
| `context` | textarea | yes | `/projects` accordion "Context" | Short paragraph: background, constraints, who it's for |
| `decisions` | textarea | yes | `/projects` accordion "Key decisions" | Short paragraph: notable technical/design decisions and why |
| `outcome` | textarea | yes | `/projects` accordion "Outcome" | Short paragraph: result, impact, what shipped or was learned |

Each `caseStudy` field is a single flowing paragraph (textarea), not markdown — don't add headings, bullet lists, or line breaks inside them unless the frontend is confirmed to render them.

### content (required, richText — Lexical)
The full project write-up body. Supports headings (h1-h4), horizontal rules, and these blocks:

- **Banner** — `{ style: 'info' | 'warning' | 'error' | 'success', content: richText }` — callout box
- **Code** — `{ language: 'typescript' | 'javascript' | 'css', code: string }` — code snippet
- **MediaBlock** — `{ media: upload reference }` — embedded image

When drafting content for this field, structure it as: intro paragraph → h2/h3 sections (e.g. "Overview", "Architecture", "Challenges", "Results") → optional Banner/Code/MediaBlock blocks inline. Since this is Lexical JSON under the hood, generate it as plain markdown-like prose with clear section headings for a human to paste in — don't hand-author raw Lexical JSON unless specifically asked.

### meta (SEO tab)
- `meta.title` — localized, can be AI-generated from `title`
- `meta.description` — localized, can be AI-generated from `caseStudy.problem` / `caseStudy.outcome`
- `meta.image` — upload reference (not AI-generatable)

### appearance / publishedAt / slug
Not content — admin/editorial fields (header theme overrides, publish date, URL slug). Slug auto-generates from `title` unless locked.

## Suggested input → output mapping for AI generation

Given a rough project description, produce:
1. `title`
2. `techStack` (list)
3. `caseStudy.tag`, `caseStudy.year`
4. `caseStudy.problem`, `caseStudy.contribution` (home card copy)
5. `caseStudy.context`, `caseStudy.decisions`, `caseStudy.outcome` (accordion copy)
6. `content` body (long-form write-up with section headings)
7. `meta.title`, `meta.description`

Leave `heroImage`, `meta.image`, `links.github`, `links.liveSite` for the editor to fill in unless URLs are explicitly provided.
