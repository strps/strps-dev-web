# Internationalization (i18n) — Handoff

> **For:** whoever picks this up next (another chat, another model, future me).
> **Full spec:** [internationalization.md](internationalization.md) — read that first, this doc is just
> "where things stand and what to do next." All section numbers below (`§x`) and phase numbers refer to it.
> **Branch:** `dev`. **As of:** 2026-07-25, **Phase 0 (Foundations & alignment) is done.** Phases 1–6
> not started.
> **Goal:** English (`en`) + Spanish (`es`) across the Payload CMS schema and the public Next.js site.

---

## Status at a glance

| Phase | Scope | Status |
|---|---|---|
| **0** | Decisions & config | ✅ **Done** (this session) |
| 1 | Mark localized fields in schema | ⬜ Not started — **next** |
| 2 | DB schema + migration + locale-aware seed | ⬜ Not started |
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

## What's next — Phase 1 (Mark localized fields in the schema)

Ref: <https://payloadcms.com/docs/configuration/localization#field-localization>

The strategy (from §Phase 1): add `localized: true` to **user-facing content fields only** — text,
textarea, richText, and content-bearing array/group copy. Do **not** localize structural/config fields
(slug, selects/enums, booleans, numbers, dates, relationships, `section` config, URLs, emails, media
files themselves — but **do** localize Media `alt` text).

**Highest-leverage move:** prefer editing the **shared field factories** first so one change propagates
everywhere consistently:
- [`fields/eyebrow.ts`](../apps/payload/src/fields/eyebrow.ts) — added in the home-makeover work, now on
  most heading blocks; localizing it once covers all of them.
- `linkGroup()` / `link()` in [`fields/link.ts`](../apps/payload/src/fields/link.ts) — localize the
  **`label`** only (not `reference`/`url`/`appearance`). ⚠️ Note the home-makeover handoff's finding that
  `link()` now takes a `required?: boolean` option and that group-field optionality interacts with
  generated types — read
  [home-page-makeover-handoff.md](home-page-makeover-handoff.md) Phase 3 before touching this factory.
- SEO `meta.title` / `meta.description` fields (from the SEO plugin) — localize once.

**Then the per-surface field audit** (full list in §Phase 1 work items):
- Collections: `Pages`, `Posts`, `Projects` (incl. the new `caseStudy` group text; `techStack` is
  structural), `ProjectTags`, `BlogTags`, `Media.alt`.
- Globals: `Header` nav labels, `Footer`, `Copyright`, `BlogPage`, `ProjectsPage`.
- Page-blocks (13): `PageHero`, `PageServicesHero`, `PageAbout`, `PageSkills`, `PageProjects`,
  `PageExperience`, `PageContact`, `PageBlog`, `PageServices`, `PageProcess`, `PageFaq`,
  `PageServicesTeaser`, `PageLabTeaser`.
- Form-builder plugin (`@payloadcms/plugin-form-builder`) — **verify** its field labels support
  `localized`; may need overrides.

**Exit (Phase 1):** `bunx payload generate:types` runs clean; localized fields show per-locale inputs in
the admin UI (dev).

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

## Files touched this session
- [`apps/payload/src/payload.config.ts`](../apps/payload/src/payload.config.ts) — `localization` block
  enriched (labels + explicit `fallback`).
- [`docs/internationalization.md`](internationalization.md) — Phase 0 checkboxes ticked, status line
  updated.
- [`docs/i18n-handoff.md`](i18n-handoff.md) — this file (new).

### Suggested commit message
```
feat(i18n): Phase 0 — enrich localization config with labels + explicit fallback

Confirm §2 decisions (prefix all locales, en fallback, local dictionaries,
seed both locales, reseed over preserve) and give the Payload localization
config human-readable per-locale labels. No fields localized yet — inert,
non-breaking. Adds i18n handoff/tracking doc.
```
