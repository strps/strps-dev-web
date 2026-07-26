# Internationalization (i18n) — Handoff

> **For:** whoever picks this up next (another chat, another model, future me).
> **Full spec:** [internationalization.md](internationalization.md) — read that first, this doc is just
> "where things stand and what to do next." All section numbers below (`§x`) and phase numbers refer to it.
> **Branch:** `dev`. **As of:** 2026-07-25, **Phases 0–1 are done** (Phase 1 = all schema fields marked
> `localized`). Phase 2 (DB schema + migration + locale-aware seed) is **next**. Phases 3–6 not started.
> **Goal:** English (`en`) + Spanish (`es`) across the Payload CMS schema and the public Next.js site.

---

## Status at a glance

| Phase | Scope | Status |
|---|---|---|
| **0** | Decisions & config | ✅ **Done** |
| **1** | Mark localized fields in schema | ✅ **Done** (this session) |
| 2 | DB schema + migration + locale-aware seed | ⬜ Not started — **next** |
| 3 | Frontend routing & locale plumbing | ⬜ Not started |
| 4 | Language switcher & UI chrome | ⬜ Not started |
| 5 | Static UI strings + SEO | ⬜ Not started |
| 6 | Content entry, QA & launch | ⬜ Not started |

---

## What's done — Phase 0 (Foundations & alignment)

### Decisions confirmed (§2)
All five decisions were **already resolved** in the plan doc when this session started; Phase 0 just
confirmed them, no re-litigation:

- **§2.1 URL strategy** — prefix **all** locales (`/en/...`, `/es/...`); root `/` redirects to the
  negotiated locale.
- **§2.2 Fallback** — `localization.fallback: true`; untranslated `es` renders `en` content. (CMS-side
  translation *enforcement* is a deferred follow-up, not in scope.)
- **§2.3 Static UI strings** — lightweight local typed dictionaries at
  `apps/frontend/src/i18n/dictionaries/{en,es}.ts` via a `getDictionary(locale)` server helper; no i18n
  library.
- **§2.4 Seed content** — seed **both** locales so a fresh reseed lands a bilingual baseline.
- **§2.5 Existing data** — **no preservation**; schema change is a clean rebuild + reseed (removes the
  data-backfill risk entirely).

### Locale list & labels confirmed
`en` (**English**, default locale) + `es` (**Español**). No right-to-left locale in scope, so **no `rtl`
config is needed** on either.

### Config enriched — the one code change this phase
[`apps/payload/src/payload.config.ts`](../apps/payload/src/payload.config.ts) — the `localization` block
went from the bare shorthand to the labelled object form with explicit fallback:

```ts
// before
localization: {
  defaultLocale: 'en',
  locales: ['en', 'es'],
},

// after
localization: {
  defaultLocale: 'en',
  fallback: true,
  locales: [
    { label: 'English', code: 'en' },
    { label: 'Español', code: 'es' },
  ],
},
```

Notes on this change:
- **`fallback: true` is Payload's default** — it's stated explicitly here so the intent (§2.2) is
  visible in the config rather than implicit. No behavior change from omitting it, but it documents the
  decision at the call site.
- The labelled `locales` array is what puts human-readable names (**English** / **Español**) in the
  admin locale switcher instead of the raw codes.
- **Nothing is marked `localized: true` yet** — this is still inert. The switcher shows in admin, the
  API accepts a `locale` argument, but every field remains a single shared value across locales until
  Phase 1. So this change is safe and non-breaking on its own.

### Tracking checklist
This document **is** the tracking checklist mirroring the plan (per the Phase 0 task). If a GitHub issue
is wanted, open one from the status table above; otherwise this file is the living source of truth
alongside the phase checkboxes in [internationalization.md](internationalization.md).

### Verification
Per the doc's working convention (§ intro) and the `defer-checks-to-end` memory, **no build / type-check
/ lint / dev-server run was performed** — the config edit is a self-contained shape change that doesn't
touch types (no field-level `localized` yet) and the author verifies manually. Whoever starts Phase 1
will naturally exercise `payload generate:types` as that phase's own exit criterion.

---

## What's done — Phase 1 (Mark localized fields in the schema)

Ref: <https://payloadcms.com/docs/configuration/localization#field-localization>

Strategy applied (from §Phase 1): `localized: true` added to **user-facing content fields only** — text,
textarea, richText, and content-bearing array/group copy. Structural/config fields left shared (slug,
selects/enums, booleans, numbers, dates, relationships, `section`/`headerOverrides` config, URLs, emails,
media relationships).

**Shared field factories (highest leverage — one edit propagates everywhere):**
- [`fields/eyebrow.ts`](../apps/payload/src/fields/eyebrow.ts) — `localized: true` on the shared eyebrow;
  covers every heading block that uses it.
- [`fields/link.ts`](../apps/payload/src/fields/link.ts) — **only the `label` text** is localized;
  `reference`/`url`/`appearance` stay shared (same destination, translated label). This propagates through
  `linkGroup()` and every `link()` call — so `Header`/`Footer` nav labels and all block CTAs localize for
  free. ✅ Adding `localized` to the leaf `label` does **not** touch the group-optionality/`required`
  typing the home-makeover handoff warned about — that concern was about `required`, untouched here.
- SEO `MetaTitleField` / `MetaDescriptionField` — localized via `overrides: { localized: true }` in
  `Pages`, `Posts`, `Projects`.

**Collections:** `Pages.title`; `Posts.title` + `content`; `Projects.title` + `content` + `caseStudy`
prose (`tag`, `problem`, `contribution`, `context`, `decisions`, `outcome`); `BlogTags.tag`;
`ProjectTags.title`; `Media.alt`. Left shared: `Projects.techStack` (tech names), `caseStudy.year`
(locale-neutral date), `Projects.links.github/liveSite` (URLs).

**Globals:** `Copyright.location`. `Header`/`Footer` nav labels localize automatically via the `link`
factory. `Copyright.name` (proper noun) and `link` (URL) left shared. `BlogPage`/`ProjectsPage` have
**no** localizable content — only `headerOverrides` config + relationships — so nothing to do there.

**Page-blocks (all 13):** every headline / eyebrow / title / subtitle / description / summary / body /
intro / note / label and content-bearing array copy (skill group names, service items & features, process
steps, FAQ Q&A, experience positions/summaries/highlights, teaser rows, hero status + location text).
Left shared per-block: `variant`/`populateBy`/`layout` selects, limits, `showPlotLine`, emails,
`githubUrl`/`blogUrl`/`proofUrl`, upload relationships, `PageSkills` keywords + Lucide `icon` (tech
names), `PageExperience` company + start/end dates.

**Form-builder plugin (`@payloadcms/plugin-form-builder` v3.33.0):** ✅ **verified — no work needed.** The
plugin already ships its user-facing fields as `localized: true` out of the box (field `label` &
`defaultValue`, form `title`, `submitButtonLabel`, `confirmationMessage`, email `subject`/`message`). With
localization enabled on the config, form labels localize automatically; no `formOverrides` required.

**Exit (Phase 1):** ✅ met and verified.
- `pnpm generate:types` ran clean (project uses **pnpm**, not bun). `packages/types/payload-types.ts` is
  **unchanged** — a localized text field has the same TS shape (`string`), so localization doesn't alter
  the generated interfaces.
- **Dev schema pushed to the localized shape.** The dev `postgresAdapter` uses drizzle auto-push, which
  fired the interactive `DATA LOSS WARNING … Accept? (y/N)` prompt (localizing moves ~150 columns into
  `_locales` sidecar tables). Accepting in place then hit `error: column "id" is in a primary key`
  (`42P16`, `dropconstraint_internal`) partway and could **not** self-recover (this is the large
  data-moving case, not the transient warm-boot flavor in `payload-dev-schema-push-error`). Per §2.5 (no
  data preservation) the fix was a **clean rebuild**: `DROP SCHEMA public CASCADE` → re-push against the
  empty DB, which is `CREATE`-only (no prompt, no `dropconstraint`). Result: **76 `_locales` tables**, all
  localized columns present (verified: pages/posts/projects title+content+caseStudy, `media.alt`,
  `copyright.location`, every page-block content field).
- ⚠️ **The dev DB is now empty** — the clean rebuild dropped all content **and the admin user**. On the
  next `pnpm dev` boot, Payload will show create-first-user. Content is repopulated by Phase 2's
  locale-aware reseed. To push this same change to **prod**, generate the committed migration in Phase 2
  (`pnpm payload migrate:create add_localized_fields`) against a **scratch DB** per the makeover lessons —
  do not rely on dev push for prod.

### Sequencing reminder for Phase 2 (right after)
Localizing fields creates Postgres `_locales` sidecar tables — a schema change. Per §2.5 there's **no
data to preserve**: let dev push build the new schema, then generate a **committed migration**
(`bunx payload migrate:create add_localized_fields`) for prod, then run the locale-aware seed (§3.1).

⚠️ **Read the migration lessons in the home-makeover handoff before doing Phase 2** — that project hit
several real Payload migration traps on this exact codebase:
- The dev DB was historically built by **auto-push, not migrations**, until the makeover's Phase 3
  introduced the first real migration files. `payload migrate:status` is now the source of truth — if a
  "column does not exist" error shows up, check it first.
- `migrate:create` diffs against a possibly-stale drizzle snapshot and can re-emit already-applied enum
  `ADD VALUE` lines; generate against a **throwaway scratch DB**, not the live dev DB, and expect to
  hand-fix enum up/down blocks. See that doc's Phase 3 section for the exact recipe.
- The seed route **skips docs that already exist**, so a plain re-`/seed` won't update the live `home`
  page — the `es` pass would be skipped on a non-empty DB. Clear the docs (or rebuild the schema) first,
  per §3.1's last bullet.

### Locale-aware seeding (§3.1) — the "update the seed data" work in Phase 2
Once fields are `localized`, a plain `payload.create`/`updateGlobal` writes **only `en`**. Spanish needs
a **second write to the same doc with `locale: 'es'`** sending **only the localized fields** (sending
structural fields on the `es` pass risks clobbering shared config — see §Risks). The seed data files
(`home-data.ts`, `about-data.ts`, `services-data.ts`, `projects-data.ts`, `globals-data.ts`,
`about-narrative.ts`) need restructuring to carry both locales. Spanish copy can start as English
placeholders (fallback covers gaps) and be refined in-admin later.

---

## Don't re-litigate

The five decisions in §2 are **settled** (all ✅ in the plan). The known risks are catalogued in §4 of
the plan — the top one to keep front-of-mind through Phases 3–6 is **cache-key locale bleed**: every
`unstable_cache` key and revalidate tag must be namespaced by locale, or one locale's content leaks into
the other. It's the most likely silent bug in the whole effort.

---

## Files touched — Phase 1 (this session)
**Shared factories**
- [`fields/eyebrow.ts`](../apps/payload/src/fields/eyebrow.ts) — `localized: true`.
- [`fields/link.ts`](../apps/payload/src/fields/link.ts) — `localized: true` on the `label` leaf only.

**Collections** — [`Pages`](../apps/payload/src/collections/Pages/index.ts),
[`Posts`](../apps/payload/src/collections/Posts/index.ts),
[`Projects`](../apps/payload/src/collections/Projects/index.ts) (title/content/caseStudy + SEO meta
overrides), [`Blog-Tags.ts`](../apps/payload/src/collections/Blog-Tags.ts),
[`Project-Tags.ts`](../apps/payload/src/collections/Project-Tags.ts),
[`Media.ts`](../apps/payload/src/collections/Media.ts) (`alt`).

**Globals** — [`copyright/index.ts`](../apps/payload/src/globals/copyright/index.ts) (`location`).

**Page-blocks (13)** — every `config.ts` under [`page-blocks/`](../apps/payload/src/page-blocks): PageHero,
PageServicesHero, PageAbout, PageSkills, PageProjects, PageExperience, PageContact, PageBlog, PageServices,
PageProcess, PageFaq, PageServicesTeaser, PageLabTeaser.

**Docs** — [`docs/internationalization.md`](internationalization.md) (Phase 1 checkboxes + status),
[`docs/i18n-handoff.md`](i18n-handoff.md) (this file).

> Not touched: `Header`/`Footer` configs (localize via the `link` factory), `blog-page.ts` /
> `projects-page.ts` (no localizable content), the form-builder plugin (already localized upstream).

### Suggested commit message
```
feat(i18n): Phase 1 — mark user-facing content fields as localized

Add `localized: true` across the schema (§Phase 1): shared eyebrow + link
`label` factories, SEO meta title/description overrides, collection titles &
rich text, Projects caseStudy prose, tag collections, Media.alt, Copyright
location, and all 13 page-block content fields. Structural config (slugs,
selects, relationships, URLs, dates, tech names) stays shared. Header/Footer
nav labels and the form-builder plugin localize automatically. No migration
or seed changes yet — that's Phase 2.
```
