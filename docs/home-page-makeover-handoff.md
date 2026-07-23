# Home Page Makeover — Handoff

> **For:** whoever picks this up next (another chat, another model, future me).
> **Full spec:** [home-page-makeover.md](home-page-makeover.md) — read that first, this doc is just
> "where things stand and what to do next." All section numbers below (`§x`) refer to it.
> **Branch:** `makeover`. **As of:** 2026-07-23, Phases 0–3 of the §7 implementation plan are done.
> Phase 0–2 is committed (`c74f6ed` and earlier); Phase 3 is uncommitted (see suggested commit message
> at the bottom).

---

## What's done

### Phase 0 — Prerequisites (§7 item 1)
Every stale `/gallery/...` link was replaced with `/lab/...`. The route was renamed in `b18ccde` but
the links inside it weren't updated, so they all 404'd. Fixed:
- [lab/data.ts](../apps/frontend/src/app/(website)/lab/data.ts) — 4 `href` fields.
- The four `*Hero.tsx` "Back to gallery" links (svg-circles, gray-scott, reaction-sphere, image-to-svg).
- One extra the doc didn't call out: [reaction-sphere/page.tsx](../apps/frontend/src/app/(website)/lab/(items)/reaction-sphere/page.tsx) linked to `/gallery/gray-scott` inline in body copy.

Deliberately **not** touched: the "Gallery" branding itself (page title "Gallery & Tinkering", metadata
titles, `GalleryBar`/`GalleryCard` component names). Only the broken hrefs were in scope — renaming the
gallery/lab terminology throughout is a separate, larger call nobody's made.

### Phase 1 — Design tokens (§7 items 2–5)
All in [globals.css](../apps/frontend/src/app/(website)/globals.css) and [layout.tsx](../apps/frontend/src/app/(website)/layout.tsx):

1. **Fonts** — Archivo + IBM Plex Mono via `next/font/google`, exposed as `--font-archivo` /
   `--font-ibm-plex-mono` CSS variables on `<body>`, wired into `@theme inline` as `--font-sans` /
   `--font-mono`. (Previously `--font-sans` pointed at `--font-geist-sans`, which nothing ever set —
   dead reference to a template default. Confirmed fixed by fetching the compiled CSS and checking
   `.font-sans { font-family: var(--font-archivo) }`.)
2. **Warm neutral ramp** — re-authored `:root` and `.dark` per §4.1's mapping table. Converted every
   mockup hex value to `oklch()` (matching the file's existing convention) with a Python OKLab/OKLCH
   conversion script rather than hand-picking approximate values — see the token values in the CSS
   directly, they're exact conversions of the doc's hex table.
3. **New tokens** — `--border-strong` and `--faint-foreground` added to both themes, registered in
   `@theme inline` as `--color-border-strong` / `--color-faint-foreground` (generates `border-border-strong`,
   `text-faint-foreground`, etc.). `--primary`/`--ring` now carry the amber accent in both themes.
4. **Contrast verification (§7 item 4)** — computed WCAG contrast ratios for every text-on-background
   pair. `--muted-foreground` clears 4.5:1 in both themes (5.2–5.4:1) as required. **`--faint-foreground`
   as literally specified in the doc's §4.1 table failed its own 3:1 floor** (2.89:1 dark, 2.99:1 light).
   I nudged both values slightly darker/lighter (same hue, ~5% lightness shift) to land at ~3.3:1 with
   margin, and updated the §4.1 table in the main doc with a footnote explaining the change. If you
   re-derive tokens from scratch later, re-check this — it's an easy thing to regress.
   I did **not** touch the amber-on-light contrast question (§4.1 already flags this as needing a real
   design pass in §6/Phase 6, not a Phase 1 blocker) — `--primary` on light background is ~3.83:1 for
   text, fine for UI elements/large text, not full AA body-copy contrast. Leave it for the light-theme
   design pass called out in §8's follow-ups.
5. **Radius / width / spacing** — added `--radius-sharp: 2px` (generates `rounded-sharp`) and
   `--container-wrap: 960px` (generates `max-w-wrap`) to `@theme inline`. Added a `spacing` prop to
   [Section](../apps/frontend/src/components/section/index.tsx) (`default` | `hero` | `section` | `contact`),
   mapping to the padding values in §4.3. **Nothing uses `rounded-sharp`, `max-w-wrap`, or the new
   `spacing` variants yet** — they're registered and ready but Tailwind v4 only emits utilities that are
   actually referenced in code, so they won't show up in compiled CSS until Phase 4 sections use them.
   `spacing` defaults to `"default"` (`py-16`, unchanged), so nothing existing regressed.

**Verification performed:** `tsc --noEmit` clean, `eslint` on touched files shows only pre-existing
unrelated warnings, dev server (already running on :3000 against local Postgres on :5432) serves the
page fine, compiled CSS confirmed to contain the new tokens and font wiring.

**Verification NOT performed:** no visual/browser check — there's nothing to look at yet. Phase 1 only
changes token *values*; nothing in the actual rendered page uses the new warm ramp differently than the
old grayscale one would, apart from `--primary`/`--ring` now being amber instead of near-black/white
(shadcn `Button` default variant, focus rings, etc. will already look different — worth an eyeball pass
before Phase 2, but I didn't do one).

### Phase 2 — Primitives (§7 items 6–8)

**Primitives** — new `apps/frontend/src/components/primitives/` directory, one file each, no barrel
(no other component dir in this repo uses one): [Eyebrow.tsx](../apps/frontend/src/components/primitives/Eyebrow.tsx),
[SectionHeader.tsx](../apps/frontend/src/components/primitives/SectionHeader.tsx),
[LinkArrow.tsx](../apps/frontend/src/components/primitives/LinkArrow.tsx),
[HairlineGrid.tsx](../apps/frontend/src/components/primitives/HairlineGrid.tsx),
[StackChip.tsx](../apps/frontend/src/components/primitives/StackChip.tsx),
[NumberedRow.tsx](../apps/frontend/src/components/primitives/NumberedRow.tsx),
[PlotLine.tsx](../apps/frontend/src/components/primitives/PlotLine.tsx). Notes:

- `LinkArrow` does **not** auto-append "→" — §6's copy table stores the arrow in the CMS content
  itself where wanted (`Full details →`) and omits it where not (`Learn more`), so the primitive just
  styles whatever text it's given.
- `NumberedRow` hard-codes the mockup's 720px breakpoint via `min-[721px]:` rather than Tailwind's
  640px `sm:` — §5 explicitly calls out that the mockup breakpoints (720px home/lab, 640px projects)
  don't match Tailwind's defaults. No other primitive needed a hard breakpoint (the grids are
  `auto-fit`, fluid without one).
- `PlotLine` is a client component (`useState`/`useEffect` for the ~200ms mount delay) with
  `motion-reduce:` Tailwind variants covering the reduced-motion bailout — no separate media query.

**Button variants** — [button.tsx](../apps/frontend/src/components/ui/button.tsx) gets `solid` and,
**not** `ghost` as §5 literally names it: `ghost` was already taken by an existing shadcn variant used
across ~9 unrelated call sites (blog, gallery, lab hero back-links) that aren't part of this makeover —
overwriting it would have restyled all of them. Named the new one `outlineGhost` instead. Geometry
(`h-auto px-6.5 py-3.25 text-[15px] rounded-sharp`, i.e. the mockup's 26px/13px padding and 2px radius)
is applied via a `compoundVariants` entry keyed on `size: "default"`, not inline in the variant string —
cva's default-size classes (`h-9 px-4 py-2`) would otherwise land later in the concatenated class string
than the variant's own classes and win the `tailwind-merge` conflict resolution in `cn()`. If you ever
pass an explicit non-default `size` alongside `solid`/`outlineGhost`, this override won't apply — that's
intentional (an explicit size choice should win) but worth knowing.

**Form field skin (§3.9)** — done as a CSS-attribute cascade, not prop drilling, per §5's suggestion:
[page-sections/form.tsx](../apps/frontend/src/components/page-sections/form.tsx) now takes an optional
`variant?: 'default' | 'mockup'` prop (not a real Payload field yet — that's Phase 3 — so it just
defaults to `'mockup'`, since `/services`'s `formBlock` is the only current consumer and Phase 2 item 8
says to switch it over now), sets `data-variant={variant}` on the `<form>`, and the actual skin lives in
[globals.css](../apps/frontend/src/app/(website)/globals.css) as `form[data-variant="mockup"]
[data-slot="..."]` rules targeting the `data-slot` attributes the shadcn `Input`/`Textarea`/`SelectTrigger`/
`Label` primitives already emit. **Zero changes** to `Text.tsx`/`Textarea.tsx`/`Select.tsx`/`Email.tsx`/
`Number.tsx` or the shared `ui/input.tsx` etc. (those are used unrestyled elsewhere in the app — Country,
State, Checkbox, GalleryBar, blog-list, the lab hero pages). The submit button switches to the new
`solid` variant + `w-full` when `variant === 'mockup'`.

These rules are written as **plain unlayered CSS** (not `@layer` or `@utility`) deliberately: Tailwind
v4 puts all utility classes in `@layer utilities`, and per the CSS cascade-layers spec, unlayered CSS
always wins over anything in a layer regardless of selector specificity — so this reliably overrides
`Input`'s `h-9`/`ring-*`/`border-input` utilities without an `!important` fight.

**A real bug found along the way, now fixed:** the Phase 1 handoff's own font wiring
(`--font-sans: var(--font-archivo)`, `--font-mono: var(--font-ibm-plex-mono)` in `@theme inline`) looks
like it defines real runtime CSS custom properties, but it doesn't — `@theme inline` *inlines* the
referenced value into each generated utility (`.font-mono { font-family: var(--font-ibm-plex-mono) }`,
confirmed by reading the compiled CSS), it does not also make `var(--font-mono)` usable as a literal
value elsewhere. `getComputedStyle(el).getPropertyValue('--font-mono')` returns empty on every element.
Only `var(--font-ibm-plex-mono)` / `var(--font-archivo)` — the variables `next/font` actually sets via
the CSS-module class on `<body>` — resolve. My original form-skin CSS used `var(--font-mono)` for the
label font and silently fell back to inherited Archivo (no error, just wrong font) until caught by
screenshotting and checking computed styles. **If you write any new hand-authored CSS that needs the
font stack, use `var(--font-ibm-plex-mono)` / `var(--font-archivo)` directly, never `var(--font-mono)` /
`var(--font-sans)` outside of Tailwind's own `font-mono`/`font-sans` utility classes.**

**Verification performed:** `tsc --noEmit` clean; `eslint` on every touched/new file shows only two
pre-existing `no-explicit-any` errors in `form.tsx` (confirmed via `git stash` — present before this
session's changes, unrelated to the diff). Visually verified via Playwright screenshots of `/services`'s
contact form in both themes: mono uppercase labels, `--card` background, `--border` hairline, sharp 2px
radius, amber border-swap on focus (no ring), full-width `solid` submit button with the correct amber
hover — all confirmed via screenshot and `getComputedStyle`, not just by reading the CSS.

Also: **both the frontend (:3000) and Payload (:3001) dev servers had died before this session started**
(not something this session's earlier commands caused — confirmed by checking process ages before
touching anything) and had to be restarted to do the visual check. Payload's restart hit the known
cold-boot Postgres error (see `payload-dev-schema-push-error` in memory) and self-recovered as
expected. **Also discovered:** this environment's Next dev server does not reliably hot-reload CSS
changes made after the server is already running (JS/RSC changes picked up fine via fast refresh; CSS
edits needed a full server restart — `rm -rf .next` + relaunch — to show up, at least twice during this
session). If you edit `globals.css` and a change doesn't show up in the browser, restart the dev server
before assuming the CSS itself is wrong.

### Phase 3 — Schema (§7 items 9–15)

**Shared `eyebrow` field** — new [fields/eyebrow.ts](../apps/payload/src/fields/eyebrow.ts), added to
every block that has a section heading: `pageHero`, `pageAbout`, `pageSkills`, `pageProjects`,
`pageContact`, `pageBlog`, and the two new teaser blocks below. **Not** added to `pageProcess` (the
mockup's process strip has no eyebrow of its own — it visually attaches to the services teaser above
it) or to `pageServicesHero` (already had its own local `eyebrow` field pre-dating this makeover;
left alone since `/services` is out of scope per §10).

**Block extensions** — all per §3's gap analysis:
- `pageHero`: `variant` (`portrait`/`statement`), `headline`, `showPlotLine`, `status.availableFrom`.
  `name` is required only in `portrait`, `headline` only in `statement` — enforced with a `validate`
  function keyed on the sibling `variant`, not a blanket `required: true`, since `admin.condition` only
  hides a field in the UI, it doesn't make Payload's validation conditional on its own.
- `pageServicesHero`: mirrored `status.availableFrom` only (§7 item 11) — not the `eyebrow` refactor,
  since it already has one and `/services` isn't in scope.
- `pageAbout`: `body` (richText — reuses the app's existing global default Lexical editor via
  `payload.config.ts`'s `editor: defaultLexical`, rather than a bespoke restricted feature set; simplest
  correct option, and every other richText field in this codebase already does the same), `layout`
  (`single`/`twoColumn`), an optional close `link`. `summary` is now optional (was required) — it's the
  fallback when `body` is empty, per §3.7.
- `pageSkills`: `variant` (`cards`/`list`).
- `pageProcess`: `variant` (`full`/`strip`) — `title`/`intro` get an `admin.condition` hiding them in
  `strip`, but stay safely `required: true` because both already carry a `defaultValue`, so the
  required-but-hidden field is never actually empty in the DB.
- `pageProjects`: `variant` (`cards`/`hairline`), an optional action `link` (there was no existing field
  serving as the "All projects →" target).
- `pageContact`: `form` (relationship → `forms`, same collection `formBlock` already uses),
  `emailLabel`, `note`. The existing `links` field is left as-is (vestigial once the form ships, but
  removing it wasn't asked for).
- `pageBlog`: `eyebrow` only — the "All articles →" action reuses the existing `blogUrl` field per §3.6,
  no new link field.

**New blocks** — [PageServicesTeaser](../apps/payload/src/page-blocks/PageServicesTeaser/config.ts) and
[PageLabTeaser](../apps/payload/src/page-blocks/PageLabTeaser/config.ts), matching §3.2/§3.5's proposed
shapes. Registered in [page-blocks/index.ts](../apps/payload/src/page-blocks/index.ts), the `layout`
blocks list in [collections/Pages/index.ts](../apps/payload/src/collections/Pages/index.ts), and
[RenderBlocks.tsx](../apps/frontend/src/components/RenderBlocks.tsx). Unlike the schema-only treatment
everything else in this phase got, these two also got **real first-pass section components**
([services-teaser.tsx](../apps/frontend/src/components/page-sections/services-teaser.tsx),
[lab-teaser.tsx](../apps/frontend/src/components/page-sections/lab-teaser.tsx)) built against the Phase 2
primitives (`SectionHeader`, `LinkArrow`, `NumberedRow`), plus GraphQL query fragments in
[page-blocks.ts](../apps/frontend/src/lib/queries/page-blocks.ts) — because unlike the seven *existing*
sections (which already have a working, if pre-makeover-styled, render path that Phase 4 will restyle),
these two blocks had *no* component at all; registering them in `RenderBlocks` without one would crash
the page the moment a page-editor added one. The existing seven sections' new Phase-3 fields (`eyebrow`,
`variant`, `headline`, etc.) were deliberately **not** wired into their section components or GraphQL
fragments — that's Phase 4's job, one section at a time, alongside the primitive-based rebuild.

**A schema design trap worth knowing about:** Payload's generated TS types mark a `group` field as
non-optional on its parent whenever any field *inside* the group has `required: true` — even though the
group itself can still be entirely absent in real data (it's just flattened Postgres columns, not a
nested row that can be "missing"). The stock `link()` field ([fields/link.ts](../apps/payload/src/fields/link.ts))
sets `label`/`reference`/`url` to `required: true` unconditionally, which is correct for the existing
array-based `linkGroup()` usages (each array entry someone explicitly adds should be complete) but wrong
for a **standalone, optional** single-link field — it made `PageAboutBlock.link` etc. non-optional in
the generated types, which in turn meant the field could never actually be left empty (exactly what
`pageAbout.link` needs to do on the `/about` page itself, per §3.7). Fixed by adding a `required?: boolean`
option to `link()` (default `true`, so every existing call site is unaffected) and passing `required:
false` for the five standalone action-link fields added this phase (`pageAbout.link`, `pageProjects.link`,
`pageServicesTeaser.link`, `pageServicesTeaser.items[].link`, `pageLabTeaser.link`). If you add another
optional single-link field later, reach for this option rather than making `label` required and fighting
the generated type.

**`caseStudy` group** — added to the `projects` collection
([collections/Projects/index.ts](../apps/payload/src/collections/Projects/index.ts)) with the seven
fields from §3.4's table (`tag`, `year`, `problem`, `contribution`, `context`, `decisions`, `outcome`),
all optional textareas/text. No content yet — TrackBit's entry and the existing projects' case-study
copy are Phase 5 (§7 item 21).

**Globals** — `copyright.location` (text) added. `header.navItems`' `link()` field switched from
`appearances: false` to `['default', 'outlineGhost']` so a nav item can render as the mockup's outlined
CTA — `outlineGhost` didn't exist as a link appearance option before this phase, so it (and `solid`) were
also added to `appearanceOptions` in `fields/link.ts` and to `CMSLink`'s `appearance` prop type in
[cms-link.tsx](../apps/frontend/src/components/cms-link.tsx), and `solid`/`outlineGhost` were added to
`pageHero`'s link-group appearances so `Work with me` / `See my work` (§6) can actually be authored.
Nothing in `HeaderNav.tsx`/`Footer.tsx` consumes these yet — that's Phase 4 item 19.

**A small refactor along the way:** `CMSLink`'s href-resolution logic (type/reference/url →
path string) was duplicated by hand in the two new section components, so it's now a shared
[lib/resolveLinkHref.ts](../apps/frontend/src/lib/resolveLinkHref.ts) util, and `CMSLink` itself was
updated to use it instead of its inline version (behavior-identical, confirmed by re-reading the diff —
no logic change, just deduplication).

**A GraphQL gotcha, worth flagging if you add more blocks with same-named fields:** `PageServicesTeaser`
and `PageLabTeaser` both have a top-level `link` field. Once both fragments are spread into the same
`layout` union selection, GraphQL's overlapping-fields validation rejects it — sibling inline fragments on
a union can't both select a same-named field that resolves to a different underlying type, even though at
runtime only one fragment ever actually applies to a given block. The fix is the same trick already used
elsewhere in this file (`heroLinks: links`, `contactLinks: links`): alias the field per-fragment
(`teaserLink: link`, `labTeaserLink: link`). The section components' prop types follow the same pattern
`hero.tsx` already established (`Omit<Block, 'link'> & { teaserLink?: Block['link'] }`) rather than typing
against the raw generated block type.

**A pre-existing gap, discovered while writing the migration, not part of this change:** `PageServicesHero`,
`PageServices`, `PageProcess`, and `PageFaq` — all added to the codebase before this session — were never
captured in a Payload migration. They exist in the dev DB only because Postgres schema auto-push (enabled
in `NODE_ENV=development`, see the `payload_dev_schema-push_error` memory note) silently created their
tables. Running `payload migrate` against a DB that only has the two prior committed migrations applied
would be missing these tables entirely. The new migration (below) fixes this as a side effect — it's
generated from a clean baseline, so it necessarily includes whatever had drifted since the last real
migration, not just this phase's changes. Worth knowing if the migration looks bigger than "just Phase 3."

**The migration** —
[20260723_171252_phase3_schema.ts](../apps/payload/src/migrations/20260723_171252_phase3_schema.ts),
generated with `payload migrate:create` rather than hand-written, because hand-writing ~500 lines of DDL
for a change this size is exactly the kind of thing that's easy to get subtly wrong. To get an accurate
diff (not one contaminated by the live dev DB's auto-push drift), it was generated against a **throwaway
Postgres database** (`createdb website-db-migration-check`, `POSTGRES_URL=... payload migrate` to apply
just the two prior migrations, then `POSTGRES_URL=... payload migrate:create`), then dropped afterward —
the real dev DB was never touched. Two hand-fixes were needed on top of the raw output:
1. The generator re-emitted `ADD VALUE 'send'/'github'/'linkedin'` on
   `enum_pages_blocks_page_hero_links_link_appearance`, which already exist from migration 2
   (`20260511_000000_add_hero_link_appearances`) — because that migration was itself hand-written and
   never produced a drizzle snapshot, so `migrate:create`'s diff is based on a stale snapshot that
   predates it. Fixed by switching those four lines to `ADD VALUE IF NOT EXISTS` (matching migration 2's
   own style) and dropping the redundant three.
2. The auto-generated `down()` for the same enum (an in-place "shrink" that requires the
   drop-recreate-cast dance since Postgres can't remove enum values directly) tried to
   `DROP TYPE ... enum_pages_blocks_page_hero_links_link_appearance` while a column's `DEFAULT` clause
   still referenced it — Postgres won't drop a type a column default depends on just because the column's
   *data type* was changed to `text` first; the default expression itself needs `ALTER COLUMN ... DROP
   DEFAULT` before the type change and `SET DEFAULT` after. Also fixed the recreated enum's value list —
   the raw output recreated it as `('default', 'outline')`, which would have dropped `send`/`github`/
   `linkedin` too (added by migration 2, not this one); down() should only undo what up() added, so it's
   now `('default', 'outline', 'send', 'github', 'linkedin')`.

**Verification performed:** `tsc --noEmit` clean in both `apps/payload` and `apps/frontend` (only the
pre-existing, unrelated `sharp` type error in `payload.config.ts` remains — confirmed via `git stash`
that it predates this session). `eslint` clean on every touched/new file. Full migration cycle tested
against the scratch DB: `migrate` (all 3 migrations apply) → `migrate:create` again (confirms zero
remaining diff, modulo `copyright.startDate`'s `defaultValue: new Date()` re-evaluating on every config
load — a pre-existing, unrelated cosmetic drift, not a real schema change) → `migrate:down` (all 3 roll
back cleanly, including the two pre-existing ones) → `migrate` again (back up cleanly). Both dev servers
restarted and confirmed serving `/` and `/services` at 200 after the GraphQL fragment-aliasing fix; no
other console errors beyond pre-existing unrelated warnings (`SkillsCard` key prop, `stop-color` DOM
attribute).

**Verification NOT performed:** the migration was never applied to the actual local dev DB (only to the
disposable scratch one) — the dev DB stays on auto-push, which already reflects Phase 3's schema, so
nothing is broken locally, but whoever deploys this should expect `payload migrate` to run for real
against a database that's never seen dev-push (staging/production) for the first time here. No visual
check beyond confirming the two new sections render without crashing — they use real primitives and
render actual query data, but with genuinely no CMS content yet (`home` page's live document still has
none of the new blocks), so there's nothing populated to look at. That starts in Phase 5.

---

## What's next

Follow §7 in order — it's sequenced so nothing gets built twice:

- **Phase 4 — Sections** (§7 items 16–19): rebuild hero, services teaser, process strip, projects, lab
  teaser, blog teaser, about, skills, contact against the primitives — one PR per section keeps review
  sane. For the two brand-new sections (services teaser, lab teaser) this means *refining* the Phase 3
  first-pass components, not building from scratch. For the other seven, it means wiring this phase's new
  schema fields (`eyebrow`, `variant`, `headline`, `status.availableFrom`, etc.) into both the section
  component *and* the GraphQL fragments in
  [page-blocks.ts](../apps/frontend/src/lib/queries/page-blocks.ts) — neither was touched for the
  existing seven blocks in Phase 3, only for the two new ones (see the Phase 3 notes above for why).
  Also restyle `ArticleCard`/`GalleryCard` (§3.6) and `ExperienceSection` (§3.10), and the header/footer.
- **Phase 5 — Content**: seed data (§6), including the real TrackBit project entry and the new `/about`
  page (§3.10). This is also where the live `home` page document actually gets the new blocks/fields —
  Phase 3 only made them possible to author, it didn't populate anything.
- **Phase 6 — Verify**: the full checklist in §7 items 25–33 (both themes, breakpoints, keyboard nav,
  form e2e, reduced-motion, live preview, Lighthouse). Also worth doing once real content exists: apply
  the Phase 3 migration to the actual dev DB (`payload migrate`) rather than leaving it on auto-push
  forever — see the "Verification NOT performed" note above.

Decisions are already settled (§8) — don't re-litigate scope; the open items are the "Follow-ups" list
at the bottom of §8 (about-page copy length, blog teaser framing, TrackBit copy verification, the
`Q3 2026` availability window which is closing *now*, and the light-theme design pass).

---

## Suggested commit messages

Phase 0–2 is already committed (`e3d0e9f`, `c74f6ed`). Phase 3 is uncommitted:

```
feat(home-makeover): add Phase 3 schema — teaser blocks, block extensions, migration

Phase 3 of docs/home-page-makeover.md (§7 items 9-15): shared eyebrow
field; pageHero/pageAbout/pageSkills/pageProcess/pageProjects/
pageContact/pageBlog extensions per §3; new pageServicesTeaser and
pageLabTeaser blocks with first-pass primitive-based section
components and GraphQL fragments; caseStudy group on the projects
collection; copyright.location; outlineGhost CTA appearance on
header.navItems. Adds a required:false option to the shared link()
field so standalone action links can actually be left empty — Payload
was otherwise marking the whole group non-optional in generated types
because one nested field was unconditionally required. Regenerates
@strps-website/types and adds a real Payload migration (generated via
migrate:create against a disposable database, not hand-written, and
not applied to the live dev DB — see the Phase 3 section of the
handoff doc for the two hand-fixes it needed and the pre-existing
migration gap it also happens to close).
```

(Note: `docs/home-page-makeover.md` also carries pre-existing edits from before this session — the
doc was already modified on disk when this session started, per the plan's own decisions in §8. Those
aren't mine to take credit for in either commit message above; I only added checkbox updates and the
notes described in each phase's section of this handoff.)
