# Home Page Makeover

> **Status:** Proposal / work plan · **Owner:** César · **Created:** 2026-07-22
>
> **Goal:** rebuild `strps.dev` (home) so it matches the look, feel, and content of the
> mockup at `apps/frontend/src/app/exp/(mockup)/home/page.tsx`, replacing the current
> placeholder-ish seed content with the mockup copy, and adding the sections the mockup
> introduces that the CMS does not model yet.
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
| 6 | **About** | Eyebrow + "How I got here", 2-column narrative, key phrases bolded | `pageAbout` *(extend)* |
| 7 | **Skills** | Eyebrow + "Core stack", 4 mono-labelled lists with hairline dividers | `pageSkills` *(list variant)* |
| 8 | **Contact** | Split: copy + "prefer email?" on the left, form (name, email, message, budget select) on the right, success state | `pageContact` *(extend)* |
| — | **Footer** | `© 2024–2026 CESAR JEREZ` · `San José, CR · GMT-6` · GitHub / LinkedIn, all mono | `Footer` + `copyright` global *(extend)* |
| — | **Header** | Services / Projects / Lab / Blog + Contact as an outlined CTA | `header` global *(reseed + CTA appearance)* |

**Removed from home:** `pageExperience`. The mockup deliberately drops the job timeline — Amazon /
Teleperformance customer-service roles undercut the "hire me to build your product" pitch.
Keep the block registered and move the content to a future `/about` page (see §8, open question 1).

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
- Reuse `status` for the badge; drop the ping animation in `statement`, use a static accent dot.
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

> ⚠️ **Content note:** the mockup's projects (TrackBit, "STRPS — this site") are *invented copy*.
> The real seeded projects live in [projects-data.ts](apps/payload/src/app/seed/projects-data.ts).
> Do **not** seed TrackBit as if it shipped. Either write real `problem`/`contribution` copy for the
> existing projects, or hold TrackBit until it's real. See §8, open question 2.

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

### 3.6 `pageAbout` — extend

Current: `title`, `summary` (single textarea), `image`, rendered as one centered paragraph next to an
avatar, inside a `min-h-[50em]` section.

Mockup: two columns, two paragraphs, **bolded key phrases**, no photo, normal section height.

Plan: add `body: richText` (lexical, bold + paragraphs only) and `layout: select` → `single` | `twoColumn`.
Keep `summary` as the fallback so existing content doesn't break; prefer `body` when present.
Drop the `min-h-[50em]` — it's why the current page feels empty.

### 3.7 `pageSkills` — list variant

Schema is right (`skillGroups[]{name,icon,keywords[]}`). Only the rendering changes: the mockup drops
`SkillsCard` (icon + badge pills) for four plain lists with mono group labels and hairline row dividers.
Add `variant: select` → `cards` | `list`. The `icon` field goes unused in `list` — leave it.

Also rename the seeded copy: "Technical Arsenal" → **"Core stack"**, and trim the keyword lists —
the mockup shows 4 items per group, the seed has up to 13.

### 3.8 `pageContact` — extend

Current: title, description, email, links → centered CTA block, **no form**.
Mockup: 2-column — left is copy + "Prefer email?" + mailto; right is a real form
(Name, Email, "What do you need?", Budget select) with an inline success state.

We already have a working form path: the Payload **forms plugin** + `formBlock` +
[form.tsx](apps/frontend/src/components/page-sections/form.tsx), with reCAPTCHA, seeded for
`/services` by [forms-data.ts](apps/payload/src/app/seed/forms-data.ts).

Plan (preferred): add `form: relationship → forms` and `note: text` ("I reply within one business day")
to `pageContact`, and render the form in the right column when set. Reuse the services form or seed a
short home variant. Avoids a second form implementation and keeps submissions in one place.

Alternative: put `pageContact` and `formBlock` next to each other in the layout — no schema change, but
we lose the side-by-side composition the mockup depends on.

### 3.9 Header, footer, globals

- **Header nav** ([globals-data.ts](apps/payload/src/app/seed/globals-data.ts)) is
  Services / Projects / Experience / Contact. Change to **Services / Projects / Lab / Blog**, with
  **Contact** rendered as an outlined CTA. The `header` global's `navItems` uses `link({appearances:false})` —
  enable appearances (or add a `cta: checkbox` per item) so the last item can render as a button.
- **Footer** ([Footer.tsx](apps/frontend/src/components/Footer.tsx)) is close already. Needs: mono type,
  a middle `San José, CR · GMT-6` line, and hairline top border. Add `location: text` to the
  `copyright` global rather than hardcoding.
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

Notes:

- The palette is **warm neutral** (a green-yellow hue), not the current pure-gray `oklch(… 0 0)`.
  Every neutral token needs a small chroma, or the amber accent will look bolted on.
- The mockup is **dark only**. We support light + dark, so a light counterpart must be authored —
  suggested starting point: bg `#faf9f6`, surface `#f2f0ea`, line `#e2e0d8`, line-strong `#cdcac0`,
  text `#1b1b19`, muted `#6b695f`, faint `#94918a`, same amber accent (darkened ~8% for AA on light).
- Two new tokens (`--border-strong`, `--faint-foreground`) must be registered in the `@theme inline`
  block in [globals.css](apps/frontend/src/app/(website)/globals.css) to get `border-strong` /
  `text-faint` utilities.
- Verify contrast: amber `#e0a33e` on `#171716` is fine for text and borders; amber **as a button
  background** needs the dark `--bg` as its foreground (the mockup does exactly this on `.filter-btn.active`).

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
already published, into the live `home` page document — the seed skips existing pages, see §7 step 6).

| Destination | New value |
| --- | --- |
| `pageHero.status.label` | `Available for new projects — Q3 2026` |
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
| `pageAbout.title` | `How I got here` (eyebrow `About`) |
| `pageAbout.body` ¶1 | `Before I wrote a line of production code, I was running cable and programming light boards backstage in theater — **learning that a live system either works exactly when it needs to, or it doesn't work at all.** That mindset followed me into electronics: CNC machining, PCB design, VHDL. There's no partial credit when a circuit is wrong.` |
| `pageAbout.body` ¶2 | `Software turned out to be the same discipline with a faster feedback loop. I bring the same instinct for systems — **how the parts fit together, what breaks under load, where the real constraint is** — to every web app and client project I take on. It's why I default to simple, well-structured solutions over clever ones.` |
| `pageSkills.title` | `Core stack` (eyebrow `Skills`), groups trimmed to: Frontend `React, Next.js, TypeScript, Tailwind CSS` · Backend `Node.js, Express, PostgreSQL, REST / GraphQL` · Electronics `VHDL, PCB design, Embedded C, CNC / 3D printing` · Tooling `Git, Docker, CI/CD, Figma` |
| `pageContact.title` | `Have a project in mind?` (eyebrow `Contact`) |
| `pageContact.description` | `Tell me what you're trying to build — a couple of sentences is enough to get started. I reply within one business day.` |
| `pageContact.form` | Name · Email · `What do you need?` (textarea) · `Budget range (optional)` select: `Not sure yet / Under $1k / $1k – $5k / $5k – $15k / $15k+` |
| `copyright.location` | `San José, CR · GMT-6` |

**Copy that is placeholder and must not ship as fact:** the two mockup projects (TrackBit and its
metrics), and `Q3 2026` availability if it's stale by launch. The Electronics skill group should also be
checked against reality before it's published as a service capability.

---

## 7. Implementation plan

Ordered so that nothing is built twice. Each phase is independently reviewable.

**Phase 0 — Prerequisites**
1. [ ] Fix the stale `/gallery` → `/lab` links in `lab/data.ts` and the four `*Hero.tsx` back-links (§3.5).
2. [ ] Decide the open questions in §8 — they change the schema.

**Phase 1 — Design tokens**
3. [ ] Add Archivo + IBM Plex Mono via `next/font`, wire `--font-sans` / `--font-mono`.
4. [ ] Re-author the neutral ramp warm, add `--border-strong` / `--faint-foreground` / amber `--primary`,
       author the light counterpart, register everything in `@theme inline`.
5. [ ] Add `--radius-sharp`, the 960px wrap width, and section spacing options to `Section`.

**Phase 2 — Primitives**
6. [ ] Build the eight primitives in §5 with the mockup's focus states and breakpoints.
7. [ ] Add `solid` / `ghost` button variants.

**Phase 3 — Schema**
8. [ ] Extend `pageHero`, `pageAbout`, `pageSkills`, `pageProcess`, `pageProjects`, `pageContact` (§3).
9. [ ] Add `pageServicesTeaser` and `pageLabTeaser`; register in
       [page-blocks/index.ts](apps/payload/src/page-blocks/index.ts) and
       [RenderBlocks.tsx](apps/frontend/src/components/RenderBlocks.tsx).
10. [ ] Add the `caseStudy` group to the `projects` collection.
11. [ ] Add `location` to the `copyright` global; enable a CTA appearance on `header.navItems`.
12. [ ] Regenerate types (`@strps-website/types`) and **write a Payload migration** — this repo has
        real migrations in [src/migrations/](apps/payload/src/migrations/), don't rely on dev push.

**Phase 4 — Sections**
13. [ ] Rebuild hero, services teaser, process strip, projects, lab teaser, about, skills, contact
        against the primitives. One PR per section keeps review sane.
14. [ ] Restyle header + footer.

**Phase 5 — Content**
15. [ ] Update `home-data.ts` with §6, and update the **live** `home` document — the seed route skips
        pages that already exist ([route.ts](apps/payload/src/app/seed/route.ts)), so a re-seed alone
        will not change production content.
16. [ ] Write real `caseStudy` copy for the existing projects; seed the home contact form.
17. [ ] Reseed the header/footer globals (`updateGlobal` runs unconditionally, so these do refresh).

**Phase 6 — Verify**
18. [ ] Light + dark pass on every section; check the amber accent in both.
19. [ ] 720px / 640px breakpoints; no horizontal scroll.
20. [ ] Keyboard tab through hero CTAs, teaser links, form; `:focus-visible` visible everywhere.
21. [ ] `prefers-reduced-motion` — plot line renders complete, no animation.
22. [ ] Live preview + draft mode still work (`LivePreviewListener` and the revalidate hooks).
23. [ ] Lighthouse on `/` — the two new font families must not regress LCP.

---

## 8. Open questions

1. **Where does the experience timeline go?** Removing `pageExperience` from home is right for the
   service pitch, but it's real content. Proposal: a `/about` page with the About narrative + timeline,
   linked from the home About section. Needs a decision before Phase 5.
2. **TrackBit** — real, planned, or illustrative? If it isn't shipping soon, the home projects section
   runs with the existing collection projects only, and the mockup's 2-card grid becomes 1 card. Might
   need a third real project or a different layout.
3. **Blog in the nav?** The mockup nav has it and `/blog` exists, but there's no blog teaser section on
   the home page. Nav link only, or add a `pageBlog` teaser (the block and section already exist)?
4. **Contact form vs. mailto** — confirm the Payload-forms approach (§3.8) over a bespoke form.
5. **Availability badge** — hardcoded `Q3 2026` string, or derive from the `status` checkbox and let it
   disappear when unavailable?
6. **Light theme** — is one actually wanted, or should the site commit to dark-only like the mockup?
   Committing would cut roughly a third of the styling work in Phases 1–4.

---

## 9. Acceptance criteria

- `/` renders the eight sections in §2, all content coming from Payload (no hardcoded copy in the
  section components except the lab items, which are code by design).
- Archivo + IBM Plex Mono are live; no heading uses `font-bold`/`font-extrabold`; no `shadow-lv*` on the
  home page.
- Section widths, eyebrow style, hairline rules, and 2px radii are consistent across all eight sections.
- Every mockup link target resolves: `/services`, `/projects`, `/lab`, `/blog`, `#contact`, `#projects`.
- Keyboard-navigable with visible focus rings; passes reduced-motion; no light/dark contrast failures.
- Editing any of the eight blocks in the Payload admin changes the page — verified through live preview.

## 10. Out of scope

`/services` (already built from its own mockup), the `/projects` accordion page and `/lab` page
(their mockups exist and share the primitives from §5 — follow-up work), moving lab items into the CMS,
blog design, and any new copywriting beyond the mockup text in §6.

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
