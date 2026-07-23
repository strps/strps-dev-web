# Home Page Makeover

> **Status:** Work plan — scope decided (§8) · **Owner:** César · **Created:** 2026-07-22
>
> **Goal:** rebuild `strps.dev` (home) so it matches the look, feel, and content of the
> mockup at `apps/frontend/src/app/exp/(mockup)/home/page.tsx`, replacing the current
> placeholder-ish seed content with the mockup copy, and adding the sections the mockup
> introduces that the CMS does not model yet. Also ships a new `/about` page (which absorbs
> the experience timeline the mockup drops) and a light theme to pair with the mockup's dark one.
>
> This is the **starting point** for further enhancement — not the final visual design.
> The deliverable is: the real home page renders the mockup's structure and tone, driven by
> Payload content, using shared primitives we can reuse on `/projects`, `/lab` and `/services`.

---

## 1. Where we are today

**Home page pipeline**

| Layer | File |
| --- | --- |
| Route | [page.tsx](apps/frontend/src/app/(website)/page.tsx) — fetches the `home` page by slug over GraphQL |
| Renderer | [RenderBlocks.tsx](apps/frontend/src/components/RenderBlocks.tsx) — maps `blockType` → section component |
| Sections | [src/components/page-sections/](apps/frontend/src/components/page-sections/) |
| Section shell | [section/index.tsx](apps/frontend/src/components/section/index.tsx) — container, theme, background image / SVG circles |
| Content source | [home-data.ts](apps/payload/src/app/seed/home-data.ts) — seeded into the `pages` collection |
| Block schemas | [src/page-blocks/](apps/payload/src/page-blocks/) |
| Design tokens | [globals.css](apps/frontend/src/app/(website)/globals.css) |

**Current home layout** (from `home-data.ts`):

`pageHero` → `pageAbout` → `pageSkills` → `pageExperience` → `pageProjects` → `pageContact`

**Current tone:** résumé/portfolio — "CESAR JEREZ / Full Stack Developer", "Technical Arsenal",
"Professional History". Centered hero, shadcn cards, badge pills, `0.625rem` radii, soft shadows.

**Mockup tone:** studio/service — "I build fast websites and web apps for businesses."
Left-aligned, hairline rules, mono eyebrows, 2px radii, no shadows, one accent color.
It sells work first and shows the résumé second.

That difference in *tone* is the real work here; the section list is secondary.

---

## 2. Target home layout

Taken directly from the mockup. Order matters — it goes offer → proof → personality → ask.

| # | Section | Mockup content | Block |
| --- | --- | --- | --- |
| 1 | **Hero** | Availability badge, statement headline, plotter-line SVG, lead paragraph, 2 CTAs (scroll to `#contact` / `#projects`) | `pageHero` *(extend)* |
| 2 | **Services teaser** | Eyebrow + "What I can build for you" + "Full details →", 3 numbered rows (`01/02/03`), each name + one-liner + "Learn more" | **new** `pageServicesTeaser` |
| 3 | **Process strip** | 4 bordered cells: `1 / 4` Discovery, Proposal, Build, Handoff | `pageProcess` *(compact variant)* |
| 4 | **Projects** | Eyebrow + "Selected work" + "All projects →", cards with tag, `/id`, **Problem —**, **What I did —**, stack chips, "View case study →" | `pageProjects` *(extend + new project fields)* |
| 5 | **Lab teaser** | Eyebrow + "Things I build for fun" + "Visit the lab →", intro line, 3 cards with thumbnail, tag, name, note | **new** `pageLabTeaser` |
| 6 | **Blog teaser** | Not in the mockup — added by decision. Eyebrow + "Writing" + "All articles →", 3 latest posts | `pageBlog` *(restyle)* |
| 7 | **About** | Eyebrow + "How I got here", 2-column narrative, key phrases bolded, "More about me →" → `/about` | `pageAbout` *(extend)* |
| 8 | **Skills** | Eyebrow + "Core stack", 4 mono-labelled lists with hairline dividers | `pageSkills` *(list variant)* |
| 9 | **Contact** | Split: copy + "prefer email?" on the left, form (name, email, message, budget select) on the right, success state | `pageContact` *(extend)* |
| — | **Footer** | `© 2024–2026 CESAR JEREZ` · `San José, CR · GMT-6` · GitHub / LinkedIn, all mono | `Footer` + `copyright` global *(extend)* |
| — | **Header** | Services / Projects / Lab / Blog + Contact as an outlined CTA | `header` global *(reseed + CTA appearance)* |

**Removed from home:** `pageExperience`. The mockup deliberately drops the job timeline — Amazon /
Teleperformance customer-service roles undercut the "hire me to build your product" pitch.
The block stays registered and the content moves to a new **`/about` page** (§3.10), linked from the
home About section.

The blog teaser sits between Lab and About on purpose: Lab and Blog are both "things I make on my own
time", and grouping them keeps the client-facing top of the page (offer → proof) uninterrupted.

---

## 3. Gap analysis — block by block

### 3.1 `pageHero` — extend

Current fields: `name`, `label`, `description`, `location{city,region}`, `status{isAvailable,label}`,
`email`, `links[]`, `backgroundImage`, `section`.
Current render ([hero.tsx](apps/frontend/src/components/page-sections/hero.tsx)): centered, `name` as
a 7xl `h1`, animated green availability dot, `SVGButton` CTAs.

Mockup needs: **a sentence as the `h1`**, left-aligned, an amber dot + text badge, a decorative
plotter-line SVG under the headline, and CTAs that scroll to in-page anchors.

Plan:

- Add `variant: select` → `portrait` (today's centered name layout, keep for other pages) | `statement` (mockup).
- Add `headline: text` — used as `h1` when `variant === 'statement'` (`name` stays for `portrait`).
- Add `showPlotLine: checkbox` (default `true` on `statement`) — renders the animated stroke-dash path.
- **Availability badge is derived from `status`, not hardcoded.** The mockup's
  `Available for new projects — Q3 2026` is one literal string; split it:
  - `status.isAvailable` (existing checkbox) — the **only** thing controlling visibility. When it is
    false the badge is not rendered at all, and nothing else in the hero shifts.
  - `status.label` (existing) — the phrase, e.g. `Available for new projects`.
  - `status.availableFrom: text` (**new**, optional) — the period, e.g. `Q3 2026`. Rendered as
    `{label} — {availableFrom}` when present, `{label}` alone when not.

  This way the period can be updated (or dropped) without editing prose, and going unavailable is one
  checkbox rather than a copy edit. Same treatment applies to `pageServicesHero.status` on `/services`,
  which has the identical group — do both at once.
- Drop the ping animation in `statement`, use a static accent dot.
- CTAs already work via `links[]` with `url: '#contact'` — no schema change, just left-aligned layout
  and the solid/ghost button styles from §4.
- `location` is not shown in the mockup hero (it lives in the lead paragraph + footer) — keep the field,
  hide it in `statement`.

### 3.2 `pageServicesTeaser` — new block

`pageServices` already exists but renders full `ServiceCard`s (for/features/timeline/pricing/good-fit) —
far too heavy for a home-page teaser, and it duplicates `/services`.

New block, deliberately thin:

```ts
{
  slug: 'pageServicesTeaser',
  fields: [
    eyebrow: text,              // "Services"
    title: text,                // "What I can build for you"
    link: link(),               // "Full details →" → /services
    items: array({              // 3 rows
      name: text,               // "Websites & landing pages"
      summary: text,            // one line, ≤ 48ch
      link: link(),             // "Learn more" → /services#01
    }),
    section: SectionConfig,
  ],
}
```

Rows are numbered automatically from the array index (`01`, `02`, `03`) — do not store the number.

### 3.3 `pageProcess` — compact variant

Schema is already correct (`title`, `intro`, `steps[]{title,description}`).
[process.tsx](apps/frontend/src/components/page-sections/process.tsx) renders a 4-up card grid with a
heading block; the mockup renders a borderless **strip** attached to the services teaser: 1px-gap grid,
`N / 4` mono counter, no section heading, no intro.

Plan: add `variant: select` → `full` (default, `/services`) | `strip` (home). Strip hides `title`/`intro`.

### 3.4 `pageProjects` + `projects` collection — extend

`pageProjects` (populate by collection/selection, `limit`, `githubUrl`) is fine. The **card content** is
the gap. Today's `ProjectCard` shows `meta.description` + tech stack. The mockup shows a
problem/solution pair, a category tag, and a case-study link.

The `projects` collection ([index.ts](apps/payload/src/collections/Projects/index.ts)) currently has:
`title`, `slug`, `heroImage`, `links{github,liveSite}`, `techStack[]`, `content` (richText), `meta`,
`appearance`, `publishedAt`. It has **no** structured case-study fields.

Add a `caseStudy` group to the collection — it serves the home cards *and* the
`/projects` accordion mockup ([projects/page.tsx](apps/frontend/src/app/exp/(mockup)/projects/page.tsx)),
so model it once:

| Field | Type | Used by |
| --- | --- | --- |
| `caseStudy.tag` | text | home card eyebrow (`Product`, `Template / product`), projects list |
| `caseStudy.year` | text | projects list (`2025`, `2024–2026`) |
| `caseStudy.problem` | textarea | home card "Problem —" |
| `caseStudy.contribution` | textarea | home card "What I did —" |
| `caseStudy.context` | textarea | `/projects` accordion "Context" |
| `caseStudy.decisions` | textarea | `/projects` accordion "Key decisions" |
| `caseStudy.outcome` | textarea | `/projects` accordion "Outcome" |

Then add a `variant` to `pageProjects` (`cards` today | `hairline` mockup) or replace `ProjectCard`'s
`orientation="horizontal"` usage on home with a new `ProjectSummaryCard`.

**Content:** both mockup projects are real. "STRPS — this site" is the existing
`strps-website-template` entry in [projects-data.ts](apps/payload/src/app/seed/projects-data.ts);
**TrackBit is a real project and needs a collection entry** — it does not exist in the seed yet. Add it
with `slug: 'trackbit'`, its tech stack (Next.js, PostgreSQL, Tailwind, Vercel), live + source links,
and the `caseStudy` fields filled from the mockup copy (both the short problem/contribution pair for the
home card and the longer context/decisions/outcome for `/projects`). The mockup's phrasing is a solid
starting draft; verify the specifics before publishing — server-side cached streaks, Postgres chosen so
streak queries stay plain SQL, "opened daily rather than abandoned after onboarding".

With TrackBit seeded, the home projects grid has the two cards the mockup shows, and `/projects` has two
accordion entries. Any third project is additive, not required.

### 3.5 `pageLabTeaser` — new block

Lab items are **code, not CMS** — [lab/data.ts](apps/frontend/src/app/(website)/lab/data.ts) exports
`galleryItems` with imported thumbnails. Keep it that way for now; a CMS model for lab items is a
separate project.

So the block only holds the framing, and the section component reads the local array:

```ts
{
  slug: 'pageLabTeaser',
  fields: [
    eyebrow: text,          // "Lab"
    title: text,            // "Things I build for fun"
    intro: textarea,        // "Electronics, CNC, generative sketches — ..."
    link: link(),           // "Visit the lab →" → /lab
    limit: number,          // default 3
    section: SectionConfig,
  ],
}
```

Cards reuse the existing [GalleryCard](apps/frontend/src/components/gallery/GalleryCard.tsx) restyled to
the mockup (4:3 media, mono tag + `/id`, name, note) — or a slimmer `LabTeaserCard` if the gallery card
carries too much.

> 🐞 **Prerequisite bug:** `lab/data.ts` still points every item at `/gallery/...` and the item heroes
> link back to `/gallery`, but the route was renamed to `/lab` in `b18ccde`. Every lab link is currently
> a 404. Fix before wiring the teaser, otherwise the home page ships dead links.

### 3.6 `pageBlog` — restyle (new to the home page)

The block ([config](apps/payload/src/page-blocks/PageBlog/config.ts)) and the section
([blog.tsx](apps/frontend/src/components/page-sections/blog.tsx)) both already exist and are unused on
home — `populateBy` collection/selection, `limit`, `blogUrl`, rendering `ArticleCard`s in a 3-up grid.

No schema change needed beyond consistency with its neighbours:

- Add `eyebrow: text` (`Writing`). Every section in the makeover needs one, so add it as a shared
  reusable field (alongside `SectionConfig` in [fields/](apps/payload/src/fields/)) rather than
  redeclaring it in nine block configs — it pairs with the `<SectionHeader>` primitive in §5.
- Swap the `flex items-center justify-between` + `font-bold` heading for `<SectionHeader>`, and the
  `Button variant="ghost" → View all articles` for a `<LinkArrow>` reading `All articles →`.
- Restyle `ArticleCard` to the mockup's lab/project card language: 4:3 media, mono tag + date,
  weight-500 title, muted excerpt, hairline grid — no shadow, 2px radius.
- `limit: 3` on home so it stays one row at every breakpoint.

Since the mockup has no blog section, the visual reference is the **lab teaser card** (§3.5) — same grid,
same card anatomy. Reusing it verbatim is the fastest route and keeps the page coherent.

### 3.7 `pageAbout` — extend

Current: `title`, `summary` (single textarea), `image`, rendered as one centered paragraph next to an
avatar, inside a `min-h-[50em]` section.

Mockup: two columns, two paragraphs, **bolded key phrases**, no photo, normal section height.

Plan: add `body: richText` (lexical, bold + paragraphs only) and `layout: select` → `single` | `twoColumn`.
Keep `summary` as the fallback so existing content doesn't break; prefer `body` when present.
Drop the `min-h-[50em]` — it's why the current page feels empty.
Add an optional `link` (the shared `link()` field) so the home instance can close with
`More about me →` → `/about`; the `/about` instance leaves it empty.

### 3.8 `pageSkills` — list variant

Schema is right (`skillGroups[]{name,icon,keywords[]}`). Only the rendering changes: the mockup drops
`SkillsCard` (icon + badge pills) for four plain lists with mono group labels and hairline row dividers.
Add `variant: select` → `cards` | `list`. The `icon` field goes unused in `list` — leave it.

Also rename the seeded copy: "Technical Arsenal" → **"Core stack"**, and trim the keyword lists —
the mockup shows 4 items per group, the seed has up to 13.

### 3.9 `pageContact` — extend, with the form styled to the mockup

Current: title, description, email, links → centered CTA block, **no form**.
Mockup: 2-column — left is copy + "Prefer email?" + mailto; right is a real form
(Name, Email, "What do you need?", Budget select) with an inline success state.

Keep the existing backend — the Payload **forms plugin** + `formBlock` +
[form.tsx](apps/frontend/src/components/page-sections/form.tsx), with reCAPTCHA, already seeded for
`/services` by [forms-data.ts](apps/payload/src/app/seed/forms-data.ts). Add to `pageContact`:

- `form: relationship → forms` — renders in the right column when set.
- `note: text` — the reply promise, e.g. `I reply within one business day`.
- `emailLabel: text` — `Prefer email?` above the mailto.

**The form fields get a mockup skin.** The field components in
[components/form/](apps/frontend/src/components/form/) currently render shadcn `Label` + `Input` /
`Textarea` / `Select` with default radii and ring focus. Target:

| Element | Mockup style |
| --- | --- |
| Label | mono, 12px, uppercase, `0.08em` tracking, faint — i.e. the `<Eyebrow>` primitive, `margin-bottom: 8px` |
| Input / textarea / select | `background: --surface`, `1px solid --line`, `--text` color, 15px, `12px 14px` padding, **2px radius**, full width |
| Focus | `outline: none; border-color: --accent` — a border swap, not a ring |
| Textarea | `min-height: 110px`, `resize: vertical` |
| Field spacing | `margin-bottom: 18px` |
| Submit | full-width solid button (`--text` bg, `--bg` text; amber on hover) |
| Success | replaces the form in place: bordered box, mono `Message sent` in accent + muted line, no layout jump |
| Required marker | keep the existing `*` + screen-reader text — the mockup has no equivalent, don't lose the a11y |

Do this as a **variant, not a rewrite**: the same field components serve `/services`, so add a `variant`
prop (or a `data-variant` on the form wrapper that the field styles key off) and switch both pages over
once it looks right. A second parallel form implementation is the thing to avoid.

The mockup's client-side `sent` state is a local `useState`; the real form already has submit/error/
success handling in `form.tsx` — wire the mockup's success box to that existing state, don't add a new one.

### 3.10 `/about` page — new

`pageExperience` comes off the home page, so the timeline needs a home. Create a `pages` document with
`slug: 'about'` — no new route file needed, the catch-all
[[slug]/page.tsx](apps/frontend/src/app/(website)/[slug]/page.tsx) already renders any published page
through `RenderBlocks`.

Proposed layout:

| # | Block | Content |
| --- | --- | --- |
| 1 | `pageHero` (`statement`, no plot line, no badge) | eyebrow `About`, headline `How I got here.`, short lead |
| 2 | `pageAbout` (`twoColumn`) | the full narrative — the home version can be the same two paragraphs, or home carries a shortened version and `/about` the long one |
| 3 | `pageExperience` | the existing three positions, restyled to the hairline language (see below) |
| 4 | `pageSkills` (`list`) | the *full* keyword lists, where home shows the trimmed four-per-group version |
| 5 | `pageContact` | reuse the home contact block for a consistent close |

`ExperienceSection` restyle: the current left-border timeline with a `bg-primary` dot, `font-mono`
date pill on `bg-muted`, and `text-primary` role heading needs the same treatment as everything else —
mono dates in `--faint`, weight-500 company names, muted summaries, hairline row separators, accent used
only for the timeline dot. Keep the timeline structure; it reads well.

Also: add **About** to the header nav, or link it only from the home About section's `More about me →`.
Nav has five items already (Services / Projects / Lab / Blog / Contact-CTA) and the `header` global caps
at `maxRows: 6` — it fits, but a six-item nav plus CTA is crowded at the 720px breakpoint where the
mockup hides everything but the CTA. Recommendation: **link from the About section only**, and add it to
the footer.

Seed it as `apps/payload/src/app/seed/about-data.ts`, following the `services-data.ts` pattern, and add
it to [route.ts](apps/payload/src/app/seed/route.ts) with the same "skip if exists" guard.

### 3.11 Header, footer, globals

- **Header nav** ([globals-data.ts](apps/payload/src/app/seed/globals-data.ts)) is
  Services / Projects / Experience / Contact. Change to **Services / Projects / Lab / Blog**, with
  **Contact** rendered as an outlined CTA. The `header` global's `navItems` uses `link({appearances:false})` —
  enable appearances (or add a `cta: checkbox` per item) so the last item can render as a button.
- **Footer** ([Footer.tsx](apps/frontend/src/components/Footer.tsx)) is close already. Needs: mono type,
  a middle `San José, CR · GMT-6` line, and hairline top border. Add `location: text` to the
  `copyright` global rather than hardcoding. Add **About** to `footer.navItems` alongside GitHub /
  LinkedIn (§3.10 keeps it out of the header).
- Header sticky + hairline bottom border, 64px tall, mono wordmark — check
  [HeaderNav.tsx](apps/frontend/src/components/HeaderNav.tsx) against the mockup nav.

---

## 4. Look and feel — translating the mockup

The mockup is a self-contained dark page with inline CSS custom properties. The real site is
Tailwind v4 + shadcn with light/dark themes. Translation, not copy-paste.

### 4.1 Color

Mockup palette (dark) and the token it should become:

| Mockup var | Value | Maps to |
| --- | --- | --- |
| `--bg` | `#171716` | `--background` (dark) |
| `--surface` | `#1e1e1c` | `--card` / `--muted` (dark) |
| `--line` | `#2c2c29` | `--border` (dark) |
| `--line-strong` | `#3a3a36` | new `--border-strong` |
| `--text` | `#e9e7e1` | `--foreground` (dark) |
| `--muted` | `#8f8d84` | `--muted-foreground` (dark) |
| `--faint` | `#63615a` | new `--faint-foreground` (eyebrows, chips, footer) |
| `--accent` | `#e0a33e` | `--primary` / `--ring` (amber, both themes) |

The palette is **warm neutral** (a green-yellow hue), not the current pure-gray `oklch(… 0 0)`.
Every neutral token needs a small chroma, or the amber accent will look bolted on.

**Both themes ship.** The mockup is dark-only, so the light ramp has to be authored from scratch as the
mirror of it — same warm hue, same *relative* steps (bg→surface is a small lift, line→line-strong is a
clear step, text→muted→faint are three distinct levels), inverted:

| Role | Dark (from mockup) | Light (to author) | Relationship |
| --- | --- | --- | --- |
| `--background` | `#171716` | `#faf9f6` | page base |
| `--card` / surface | `#1e1e1c` | `#f2f0ea` | one step *toward* the text side of bg |
| `--border` | `#2c2c29` | `#e2e0d8` | hairlines, section rules, grid gaps |
| `--border-strong` | `#3a3a36` | `#cdcac0` | chips, ghost buttons, input borders on hover |
| `--foreground` | `#e9e7e1` | `#1b1b19` | headings, body |
| `--muted-foreground` | `#8f8d84` | `#6b695f` | paragraphs, secondary text |
| `--faint-foreground` | `#6d6b63`* | `#8b8882`* | eyebrows, chips, footer, `/01` counters |
| `--primary` (accent) | `#e0a33e` | `#a9741d` | amber; darkened on light for AA |

\* Nudged from the mockup's literal `#63615a` / `#94918a` — both measured **under** the 3:1 floor
(2.89:1 dark, 2.99:1 light) against `--background`. These values clear ~3.3:1 in both directions while
keeping the same hue and near-identical tone.

Rules that keep the two themes honest:

- **Contrast targets:** `--muted-foreground` on `--background` must clear **4.5:1** (it carries real
  paragraph copy in About, Projects, and Services). `--faint-foreground` is only ever 11–13px
  non-essential labels, so **3:1** is the floor — but never use it for anything a reader must read.
  Verify both directions; the dark ramp's `#8f8d84` on `#171716` is ~5.2:1 and passes, the naive light
  mirror often does not.
- **Amber cannot be the same value in both themes.** `#e0a33e` on `#171716` is ~7.4:1 and fine for text,
  links, and borders; on `#faf9f6` it is ~2:1 — unusable for text. Hence the darkened `#a9741d` on light.
  As a *button background* the accent takes `--background` as its foreground in both themes (the mockup
  does exactly this on `.filter-btn.active`), which stays legible either way.
- **Hairlines must survive both.** `--border` at 1px is the primary structural device in this design;
  if it disappears on light the whole layout collapses into floating text. Check the section rules and
  the 1px grid gaps on a real screen, not just in devtools.
- Author the values in `oklch()` to match the file's existing convention, keeping hue and chroma constant
  down each ramp and varying only lightness — that is what makes the two themes feel like one system.
- Two new tokens (`--border-strong`, `--faint-foreground`) must be registered in the `@theme inline`
  block in [globals.css](apps/frontend/src/app/(website)/globals.css) to get `border-strong` /
  `text-faint` utilities, and set in **both** `:root` and `.dark`.
- `--svg-circle-color` and the `--shadow-*` triplet already differ per theme; the shadows go unused on
  the makeover path (§4.3) but leave them defined — other pages still use `shadow-lv*`.

Since the mockups only prove the dark side, expect the light theme to need a real design pass on the
hero, the hairline grids, and the amber CTAs. Budget for it rather than treating it as a token swap.

### 4.2 Typography

| Role | Mockup | Today |
| --- | --- | --- |
| Sans | **Archivo** 400/500/600 | Inter |
| Mono | **IBM Plex Mono** 400/500 | none loaded |

- Load both with `next/font/google` in [layout.tsx](apps/frontend/src/app/(website)/layout.tsx) and wire
  `--font-sans` / `--font-mono` (the `@theme` block already references them but nothing sets them).
- Headings are **weight 500**, not bold, with `letter-spacing: -0.02em`. Current sections use
  `font-bold`/`font-extrabold` — that alone accounts for a lot of the tonal mismatch.
- `h1` `clamp(34px, 5.5vw, 58px)`, `h2` 24px, `h3` 17–19px, body 15–17px, mono labels 12px.
- The `.mono` eyebrow style (12px, `0.08em` tracking, uppercase, faint) appears in **every** section →
  make it a component, not a repeated class list (see §5).
- Also delete the stray `@import url('https://fonts.googleapis.com/...')` pattern when porting —
  fonts come from `next/font`, never a runtime CSS import.

### 4.3 Geometry, borders, elevation

- **Radius: 2px.** Site-wide `--radius` is `0.625rem`. Don't reset it globally (shadcn components depend
  on it); introduce `--radius-sharp: 2px` and use it in the new primitives, or flip `--radius` and audit.
- **Hairlines everywhere.** Section heads have a bottom border; grids are built with
  `gap: 1px; background: var(--line)` and opaque cells — a technique worth wrapping in a `HairlineGrid`
  primitive rather than repeating.
- **No shadows.** The mockup has zero. `shadow-lv1…lv5` in `globals.css` (the neo-skeuomorphic
  multi-shadow utilities) are used by `AboutSection` and the cards and must come off the makeover path.
- **Width:** mockup `wrap` is `max-width: 960px; padding: 0 24px`. Tailwind's `container` is wider.
  Either add `--container-wrap: 960px` or pass a `containerClassName="max-w-[960px]"` from the sections.
  Pick one and apply it consistently — mismatched widths between sections is the most visible failure mode.
- **Vertical rhythm:** sections are `padding: 90px 0 0` with the head rule doing the separating; hero is
  `110px 0 90px`; contact `90px 0 110px`. Today `Section` hardcodes `py-16`, and hero uses `py-32 md:py-48`.
  Add a `spacing` prop or variant to `Section`.

### 4.4 Motion

Almost none, deliberately:

- The hero plotter line: `stroke-dasharray: 620; stroke-dashoffset: 620 → 0` over `1.6s`, triggered
  ~200ms after mount, **with a `prefers-reduced-motion` bail-out already written in the mockup — keep it.**
- Hover: `color` / `border-color` transitions at `.15s`, nothing else.
- `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px }` on buttons and filters —
  the mockup is careful about this; preserve it.
- Drop the current `animate-in fade-in slide-in-from-bottom-4 duration-1000` hero entrance and the
  pinging availability dot.

---

## 5. Shared primitives to build first

These appear in all three mockups (home, projects, lab), so build them before the sections.
Suggested home: `src/components/primitives/`.

| Primitive | Replaces | Notes |
| --- | --- | --- |
| `<Eyebrow>` | `.mono` spans | mono, 12px, uppercase, `0.08em`, faint. Used ~20× across the mockups |
| `<SectionHeader eyebrow title action?>` | `.sec-head` | baseline-aligned row + bottom hairline + optional right-side `LinkArrow`. In every section |
| `<LinkArrow href>` | `.link-arrow` | muted text, hairline underline, accent on hover, `→` appended |
| `<HairlineGrid minItemWidth>` | `.proj-grid` / `.proc-grid` / `.grid` | the 1px-gap-over-line-background technique |
| `<StackChip>` | `.stack-chip` | mono 11px, `--line-strong` border, 2px radius. Home + projects |
| `<NumberedRow>` | `.svc-row` | `70px 1fr 90px` grid, collapses to one column ≤720px |
| Button variants | `.btn-solid` / `.btn-ghost` | add `solid`/`ghost` variants to [button.tsx](apps/frontend/src/components/ui/button.tsx) rather than new components |
| `<PlotLine>` | hero `.plot` svg | the animated stroke path + reduced-motion handling |

Wire the mockup breakpoints too: the mockups break at **720px** (home, lab) and **640px** (projects),
where multi-column grids collapse and nav links hide behind the CTA.

---

## 6. Content migration — mockup copy → CMS fields

Everything below goes into [home-data.ts](apps/payload/src/app/seed/home-data.ts) (and, for the ones
already published, into the live `home` page document — the seed skips existing pages, see §7 step 20).

| Destination | New value |
| --- | --- |
| `pageHero.status` | `isAvailable: true` · `label: Available for new projects` · `availableFrom: Q3 2026` (§3.1 — composed, not one string) |
| `pageHero.headline` | `I build fast websites and web apps for businesses.` |
| `pageHero.description` | `I'm César Jerez — a full stack developer in San José, Costa Rica, working at the intersection of web development, electronics, and system architecture. From landing pages to custom internal tools, I build things that work.` |
| `pageHero.links` | `Work with me` → `#contact` (solid) · `See my work` → `#projects` (ghost) |
| `pageServicesTeaser` | eyebrow `Services`, title `What I can build for you`, action `Full details →` → `/services` |
| ↳ item 01 | `Websites & landing pages` — `Fast, modern sites with a CMS you can edit yourself.` |
| ↳ item 02 | `Web apps & internal tools` — `Dashboards, portals, and custom software built around your workflow.` |
| ↳ item 03 | `APIs & automation` — `Integrations and scripts that connect the tools you already use.` |
| `pageProcess.steps` | `Discovery` — `Free call — we scope what you actually need.` · `Proposal` — `Fixed price for fixed scope, in writing.` · `Build` — `Weekly progress, no black-box silence.` · `Handoff` — `All code and credentials — it's yours.` |
| `pageProjects.title` | `Selected work` (eyebrow `Projects`, action `All projects →` → `/projects`) |
| `pageLabTeaser` | eyebrow `Lab`, title `Things I build for fun`, intro `Electronics, CNC, generative sketches — the stuff that doesn't fit a client brief.`, action `Visit the lab →` → `/lab` |
| `pageBlog` | eyebrow `Writing`, title `Notes and build logs`, `limit: 3`, action `All articles →` → `/blog` (not in the mockup — new copy, revise to taste) |
| `pageAbout.title` | `How I got here` (eyebrow `About`), action `More about me →` → `/about` |
| `pageAbout.body` ¶1 | `Before I wrote a line of production code, I was running cable and programming light boards backstage in theater — **learning that a live system either works exactly when it needs to, or it doesn't work at all.** That mindset followed me into electronics: CNC machining, PCB design, VHDL. There's no partial credit when a circuit is wrong.` |
| `pageAbout.body` ¶2 | `Software turned out to be the same discipline with a faster feedback loop. I bring the same instinct for systems — **how the parts fit together, what breaks under load, where the real constraint is** — to every web app and client project I take on. It's why I default to simple, well-structured solutions over clever ones.` |
| `pageSkills.title` | `Core stack` (eyebrow `Skills`), groups trimmed to: Frontend `React, Next.js, TypeScript, Tailwind CSS` · Backend `Node.js, Express, PostgreSQL, REST / GraphQL` · Electronics `VHDL, PCB design, Embedded C, CNC / 3D printing` · Tooling `Git, Docker, CI/CD, Figma` |
| `pageContact.title` | `Have a project in mind?` (eyebrow `Contact`) |
| `pageContact.description` | `Tell me what you're trying to build — a couple of sentences is enough to get started. I reply within one business day.` |
| `pageContact.form` | Name · Email · `What do you need?` (textarea) · `Budget range (optional)` select: `Not sure yet / Under $1k / $1k – $5k / $5k – $15k / $15k+` |
| `pageContact.emailLabel` / `note` | `Prefer email?` · `I reply within one business day` |
| `copyright.location` | `San José, CR · GMT-6` |

**New content this makeover requires that the mockup does not supply:**

- **TrackBit's project entry** (§3.4) — `caseStudy.problem` / `contribution` for the home card, and
  `context` / `decisions` / `outcome` for `/projects`. Mockup copy is a good first draft; confirm the
  technical claims before publishing.
- **The `/about` page** (§3.10) — a hero lead, and the long-form version of the narrative if home keeps
  the short one.
- **The blog teaser framing** — title and eyebrow are invented above; no mockup reference exists.

**Check before publishing:** `Q3 2026` availability (it's now July 2026 — that window is closing);
the Electronics skill group, which reads as a service capability once it sits under "Core stack" on a
page selling services.

---

## 7. Implementation plan

Ordered so that nothing is built twice. Each phase is independently reviewable.

**Phase 0 — Prerequisites**
1. [x] Fix the stale `/gallery` → `/lab` links in `lab/data.ts` and the four `*Hero.tsx` back-links (§3.5).

**Phase 1 — Design tokens**
2. [x] Add Archivo + IBM Plex Mono via `next/font`, wire `--font-sans` / `--font-mono`.
3. [x] Re-author the neutral ramp warm, add `--border-strong` / `--faint-foreground` / amber `--primary`
       in `:root` **and** `.dark`, register in `@theme inline`.
4. [x] Author the light ramp per §4.1 and verify the contrast targets before building anything on top.
5. [x] Add `--radius-sharp`, the 960px wrap width, and section spacing options to `Section`.

**Phase 2 — Primitives**
6. [x] Build the eight primitives in §5 with the mockup's focus states and breakpoints.
7. [x] Add `solid` / `ghost` button variants.
8. [x] Skin the form fields in [components/form/](apps/frontend/src/components/form/) per §3.9, behind a
       variant, and switch `/services` over once it's right.

**Phase 3 — Schema**
9. [x] Add the shared `eyebrow` field alongside `SectionConfig` in [fields/](apps/payload/src/fields/).
10. [x] Extend `pageHero` (variant, headline, plot line, `status.availableFrom`), `pageAbout` (body,
        layout, link), `pageSkills` (variant), `pageProcess` (variant), `pageProjects` (variant),
        `pageContact` (form, note, emailLabel), `pageBlog` (eyebrow) — §3.
11. [x] Mirror the `status.availableFrom` change onto `pageServicesHero` so `/services` stays consistent.
12. [x] Add `pageServicesTeaser` and `pageLabTeaser`; register in
        [page-blocks/index.ts](apps/payload/src/page-blocks/index.ts) and
        [RenderBlocks.tsx](apps/frontend/src/components/RenderBlocks.tsx).
13. [x] Add the `caseStudy` group to the `projects` collection.
14. [x] Add `location` to the `copyright` global; enable a CTA appearance on `header.navItems`.
15. [x] Regenerate types (`@strps-website/types`) and **write a Payload migration** — this repo has
        real migrations in [src/migrations/](apps/payload/src/migrations/), don't rely on dev push.

**Phase 4 — Sections**
16. [ ] Rebuild hero, services teaser, process strip, projects, lab teaser, blog teaser, about, skills,
        contact against the primitives. One PR per section keeps review sane.
17. [ ] Restyle `ArticleCard` and `GalleryCard` to the shared card anatomy (§3.6).
18. [ ] Restyle `ExperienceSection` to the hairline language for `/about` (§3.10).
19. [ ] Restyle header + footer.

**Phase 5 — Content**
20. [ ] Update `home-data.ts` with §6, and update the **live** `home` document — the seed route skips
        pages that already exist ([route.ts](apps/payload/src/app/seed/route.ts)), so a re-seed alone
        will not change production content.
21. [ ] Add TrackBit to [projects-data.ts](apps/payload/src/app/seed/projects-data.ts) with full
        `caseStudy` fields, and write `caseStudy` copy for the existing projects.
22. [ ] Create `about-data.ts` (§3.10), wire it into the seed route, and publish the `/about` page.
23. [ ] Seed the home contact form (or point `pageContact.form` at the existing services form).
24. [ ] Reseed the header/footer globals (`updateGlobal` runs unconditionally, so these do refresh) —
        nav becomes Services / Projects / Lab / Blog / Contact-CTA, footer gains About + location.

**Phase 6 — Verify**
25. [ ] Light + dark pass on every section; check the amber accent, hairlines, and muted body copy in
        both; run the §4.1 contrast checks against the shipped values.
26. [ ] 720px / 640px breakpoints; no horizontal scroll.
27. [ ] Keyboard tab through hero CTAs, teaser links, form; `:focus-visible` visible everywhere.
28. [ ] Form end-to-end: validation, reCAPTCHA, success state, submission lands in Payload.
29. [ ] `prefers-reduced-motion` — plot line renders complete, no animation.
30. [ ] Availability badge: toggle `status.isAvailable` off and confirm the hero holds its shape.
31. [ ] Live preview + draft mode still work (`LivePreviewListener` and the revalidate hooks).
32. [ ] `/about` renders through the catch-all route with correct metadata and sitemap entry.
33. [ ] Lighthouse on `/` — the two new font families must not regress LCP.

---

## 8. Decisions

Resolved 2026-07-22. These are settled — the sections above already reflect them.

| # | Question | Decision | Where it lands |
| --- | --- | --- | --- |
| 1 | Where does the experience timeline go? | **Create an `/about` page.** Narrative + timeline + full skills, off the home page, linked from the home About section and the footer. | §3.10, §2 |
| 2 | Is TrackBit real? | **Yes.** Seed it as a real project with full `caseStudy` copy — the home grid keeps both cards and `/projects` gets two entries. | §3.4, Phase 5 |
| 3 | Blog on the home page? | **Add the teaser.** `pageBlog` between Lab and About, 3 latest posts, reusing the lab card anatomy. | §3.6, §2 |
| 4 | Contact form approach? | **Payload forms backend, mockup styling.** Skin the existing field components behind a variant — no second form implementation. | §3.9 |
| 5 | Availability badge? | **Derive from `status`.** `isAvailable` controls visibility; `label` + new `availableFrom` compose the text. Mirror onto `pageServicesHero`. | §3.1 |
| 6 | Light theme? | **Ship both.** Author a full light ramp mirroring the mockup's dark one, with contrast rules and a real design pass — not a token swap. | §4.1 |

### Follow-ups these decisions created

- **About page copy** — the narrative currently exists once, in the mockup. Decide whether home carries
  a shortened version and `/about` the long one, or both show the same two paragraphs. Affects §6.
- **Blog teaser framing** — eyebrow and title are invented (`Writing` / `Notes and build logs`); no
  mockup reference. Also: is there enough published blog content for a 3-up row to look right?
- **TrackBit case-study copy** — the mockup phrasing is a draft written to look plausible. Verify the
  technical claims (server-side cached streaks, the Postgres rationale) before publishing them.
- **Availability window** — `Q3 2026` is the current quarter as of this writing. Set the real value at
  publish time.
- **Light-theme design pass** — the mockups only prove the dark side. Hero, hairline grids, and amber
  CTAs need a real review on light before launch, not just a contrast check.

---

## 9. Acceptance criteria

- `/` renders the nine sections in §2, all content coming from Payload (no hardcoded copy in the
  section components except the lab items, which are code by design).
- `/about` is published and renders through the catch-all route: narrative, timeline, full skills.
- Archivo + IBM Plex Mono are live; no heading uses `font-bold`/`font-extrabold`; no `shadow-lv*` on the
  home or about pages.
- Section widths, eyebrow style, hairline rules, and 2px radii are consistent across every section.
- **Both themes are complete**: no contrast failure on body copy, no hairline that vanishes, no amber
  used where it can't hold the required ratio.
- Every link target resolves: `/services`, `/projects`, `/lab`, `/blog`, `/about`, `#contact`, `#projects`.
- The contact form submits end to end and its success state renders in the mockup styling.
- Toggling `status.isAvailable` off removes the badge cleanly, with no other copy edit needed.
- Keyboard-navigable with visible focus rings; passes reduced-motion.
- Editing any block in the Payload admin changes the page — verified through live preview.

## 10. Out of scope

`/services` (already built from its own mockup), the `/projects` accordion page and `/lab` page
(their mockups exist and share the primitives from §5 — follow-up work), moving lab items into the CMS,
blog post/listing page design beyond restyling `ArticleCard`, and any new copywriting beyond §6 and the
follow-ups listed in §8.

---

## Reference

- Mockups: [home](apps/frontend/src/app/exp/(mockup)/home/page.tsx) ·
  [projects](apps/frontend/src/app/exp/(mockup)/projects/page.tsx) ·
  [lab](apps/frontend/src/app/exp/(mockup)/lab/page.tsx)
- Precedent — the `/services` page was built with this same mockup → copy doc → seed data flow:
  [services-mockup.jsx](docs/services-mockup.jsx), [services-page-copy.md](docs/services-page-copy.md),
  [services-data.ts](apps/payload/src/app/seed/services-data.ts)
- [creating-blocks.md](docs/creating-blocks.md) — how to add a Payload block
- [COMPONENTS.md](docs/COMPONENTS.md) · [architecture.md](docs/architecture.md)
