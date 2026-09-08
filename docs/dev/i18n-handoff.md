# Internationalization (i18n) — Handoff

> **For:** whoever picks this up next (another chat, another model, future me).
> **Full spec:** [internationalization.md](../internationalization.md) — read that first, this doc is just
> "where things stand and what to do next." All section numbers below (`§x`) and phase numbers refer to it.
> **Branch:** `dev`. **As of:** 2026-07-26, **Phases 0–5 are done** (Phase 1 = all schema fields marked
> `localized`; Phase 2 = committed migration + locale-aware bilingual seed; Phase 3 = `[locale]` routing
> scaffold **and** locale threaded through every GraphQL data fetch + locale-namespaced caches; Phase 4 =
> language switcher in the header + every internal link across the app locale-prefixed; Phase 5 = static
> UI-string dictionary + hreflang/canonical metadata + locale-prefixed sitemaps). Phase 6 (content entry,
> QA & launch) not started next.
> **Goal:** English (`en`) + Spanish (`es`) across the Payload CMS schema and the public Next.js site.

---

## Status at a glance

| Phase | Scope | Status |
|---|---|---|
| **0** | Decisions & config | ✅ **Done** |
| **1** | Mark localized fields in schema | ✅ **Done** |
| **2** | DB schema + migration + locale-aware seed | ✅ **Done** |
| **3** | Frontend routing & locale plumbing | ✅ **Done** — Part A (routing scaffold) + Part B (locale data plumbing) |
| **4** | Language switcher & UI chrome | ✅ **Done** |
| **5** | Static UI strings + SEO | ✅ **Done** |
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
alongside the phase checkboxes in [internationalization.md](../internationalization.md).

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

## What's done — Phase 2 (DB schema + migration + locale-aware seed)

### The migration
[`20260726_154000_add_localized_fields.ts`](../apps/payload/src/migrations/20260726_154000_add_localized_fields.ts)
— generated with `pnpm payload migrate:create add_localized_fields` against a **throwaway scratch DB**
(`website-db-i18n-check`), never touching the real dev/prod DB, per the makeover recipe:

1. `createdb website-db-i18n-check` → `POSTGRES_URL=<scratch> pnpm payload migrate` to apply the **4 prior**
   committed migrations (scratch DB now at the pre-localization schema).
2. `NODE_ENV=development POSTGRES_URL=<scratch> pnpm payload migrate:create add_localized_fields` — diffs the
   localized config against the scratch DB → emits the localization migration (392 `_locales`-related lines).
3. Cycle-tested on the scratch DB, then dropped it.

**Zero hand-fixes were needed** — unlike the makeover:
- **No `ADD VALUE` enum re-emissions.** Localizing fields adds no enum values, so the stale-snapshot enum
  trap the makeover hit simply doesn't arise here.
- **The `_locales` enum type already exists** (created in `first_migration` — localization was *enabled* in
  config from the start, and the SEO/form-builder/search plugins already ship ~18 `_locales` tables). The new
  migration correctly relies on the pre-existing type rather than re-creating it.

**Full cycle validated on the scratch DB:** `migrate` (up: **18 → 76 `_locales` tables**, matching Phase 1) →
`migrate:create` again = **clean** (only the known cosmetic `copyright.start_date` `new Date()` default drift,
pre-existing & unrelated — same as the makeover) → `migrate:down` (76 → 18, clean) → `migrate` (back to 76).
The throwaway `verify_clean` file was deleted and its auto-regenerated `index.ts` entries removed.

⚠️ **The migration was never applied to the real dev DB** (it's on push, already at the localized shape) — same
posture as the makeover. Whoever deploys should expect `pnpm payload migrate` to run it for real against
staging/prod. `payload migrate:status` currently shows **all migrations `Ran: No`** on dev, because Phase 1's
`DROP SCHEMA` wiped the `payload_migrations` table — dev is push-built, not migration-built. That's expected;
don't "fix" it by running `migrate` cold against dev (risks `CREATE TABLE` conflicts — see the makeover's
Phase 3 lesson).

### Locale-aware seed (§3.1) — real bilingual content
New helper [`localize.ts`](../apps/payload/src/app/seed/localize.ts) with `deepMergeLocalized`,
`seedLocalizedDoc`, `seedLocalizedGlobal`. **The core problem it solves:** localized fields inside
non-localized arrays/blocks are keyed by the row `id` Payload assigns on the `en` create — so a naive `es`
update without ids creates *new* rows and orphans the `en` values. The helper overlays the `es` patch onto the
doc Payload **returned** from the `en` write (already carries every id + all shared config), preserving ids and
shared structure, then writes it back at `locale: 'es'`. Rich-text (`{ root }`) values are replaced wholesale;
arrays zip by index; only localized leaves change.

Each seed data file now exports its `en` data **plus** an `es` patch (localized fields only, same nested shape /
array order): `homePageDataES`, `aboutPageDataES`, `servicesPageDataES`, `projectsDataES` (parallel by index),
`headerDataES`/`footerDataES`/`copyrightDataES`, `aboutNarrativeBodyES`, and `servicesFormDataES` (only the
plugin's localized fields — labels, submit button, confirmation message; **not** select option labels, which
aren't localized upstream, so translating them would clobber the shared value). Spanish is **real translation**,
not placeholders (per the chosen approach), refine in-admin as desired.

The seed route ([`route.ts`](../apps/payload/src/app/seed/route.ts)) now routes every create/updateGlobal
through those helpers. Its existing "skip if slug already exists" guards are unchanged — a fresh (empty) DB
seeds both locales; reseeding onto a non-empty DB skips the `es` pass too, so **clear the docs first**.

### Verification
- `tsc --noEmit` in `apps/payload` is **clean** except the pre-existing, unrelated `sharp` error in
  `payload.config.ts` (confirmed pre-existing by the makeover handoff). `generate:types` output is unchanged
  (localized text keeps the same `string` TS shape).
- The migration cycle was exercised end-to-end on the scratch DB (above).
- **NOT run** (per the working convention / `defer-checks-to-end` memory): the seed was **not executed** against
  a live DB, and no dev server was booted. To exercise it locally: `pnpm dev` in `apps/payload`, create the
  first admin user (Phase 1 wiped the dev DB), then `POST /seed`. Confirm `es` docs materialize (admin locale
  switcher → Español) and the site would fall back to `en` only for shared fields (tech names, dates).

### For prod deploy (Phase 6 / whoever ships)
`pnpm payload migrate` runs `20260726_154000_add_localized_fields` against a DB that has the 4 prior migrations
applied. If a target DB was ever push-built (like dev), reconcile `migrate:status` first — don't run `migrate`
cold onto push-built tables.

---

## What's in progress — Phase 3 (Frontend routing & locale plumbing)

Phase 3 was split into two parts. **Part A (routing scaffold) is done this session; Part B (locale data
plumbing) is next.**

### Part A — routing scaffold ✅ (done)

**Locale config — new single source of truth.**
[`i18n/config.ts`](../apps/frontend/src/i18n/config.ts) exports `locales` (`['en','es'] as const`),
`defaultLocale` (`'en'`), the `Locale` type, and the `isValidLocale()` type guard. Kept intentionally
minimal — the `localizedHref()` / `localeLabels` helpers a first draft added were **removed** to keep this
commit scoped to routing; re-add them in Part B / Phase 4 when a consumer exists.

**Route restructure — `[locale]` segment.**
Every page route moved under [`app/(website)/[locale]/`](../apps/frontend/src/app/(website)/[locale]) via
`git mv` (tracked as renames, history preserved): `page.tsx` (home), `[slug]/`, `blog/`, `projects/`, `lab/`
(including all `lab/(items)` subtrees). Left **at the `(website)` group root** because they're route
handlers (no html layout needed) and get their own per-locale treatment later: `(sitemaps)/` (Phase 5) and
`api/revalidate/`. `globals.css` + `favicon.ico` stayed at the group root; `exp/` is untouched (separate
root layout, intentionally un-localized).

- The **root layout moved** to [`[locale]/layout.tsx`](../apps/frontend/src/app/(website)/[locale]/layout.tsx)
  so it receives `params.locale`. It now: `notFound()`s on an invalid locale, sets `<html lang={locale}>`
  (was hardcoded `"en"`), exports `generateStaticParams()` → `[{locale:'en'},{locale:'es'}]`, and fixed its
  CSS import to `'../globals.css'`.
- **`generateStaticParams` note:** the layout supplies the locale set; child dynamic routes (`[slug]`,
  `blog/[slug]`, `projects/[slug]`) still return only `{slug}` and Next takes the **cartesian** with the
  parent locale param — so `/en/foo` + `/es/foo` are both generated with no change to the child generators.

**Middleware — new** [`middleware.ts`](../apps/frontend/src/middleware.ts).
If the first path segment is already a valid locale → `next()`. Otherwise negotiate
**cookie (`NEXT_LOCALE`) → `Accept-Language` → `defaultLocale`**, redirect to the prefixed path
(`/about` → `/en/about`, `/` → `/en`) and persist the cookie (1-year, `sameSite: lax`). Matcher:
`['/((?!api|admin|exp|_next/static|_next/image|.*\\..*).*)']` — the trailing `.*\..*` excludes favicon,
`*-sitemap.xml`, and static assets in one clause.

**⚠️ Intermediate state at the end of Part A (resolved by Part B, below):** `/en/...` and `/es/...` both
resolved, but content was still English on both since the CMS `locale` argument wasn't threaded into GraphQL
yet. Nav hrefs weren't locale-prefixed either. `<html lang>` was already correct per route.

### Part B — locale data plumbing ✅ (done this session)

**GraphQL queries now take `$locale: LocaleInputType`** (confirmed enum values `en`/`es`; globals accept
`Header(locale: …)` directly, finds accept `locale` alongside `where`/`draft`):
- [`lib/queries/page-blocks.ts`](../apps/frontend/src/lib/queries/page-blocks.ts) — `GET_PAGE_BY_SLUG` and
  `GET_HOME_PAGE` gain `$locale`; threaded through [`[locale]/page.tsx`](../apps/frontend/src/app/(website)/[locale]/page.tsx)
  and [`[locale]/[slug]/page.tsx`](../apps/frontend/src/app/(website)/[locale]/[slug]/page.tsx) (both the
  page component and `generateMetadata`).
- [`data/data.ts`](../apps/frontend/src/data/data.ts) — `GET_HEADER`, `GET_FOOTER`, `GET_COPYRIGHT` all take
  `$locale`. `resolveHref()` now prefixes reference-based hrefs and relative custom URLs
  (`url.startsWith('/')`) with `/${locale}`; external URLs pass through unprefixed. `getCachedHeaderData(locale)`
  and `getFooterData(locale)` take locale explicitly; `Footer.tsx` takes a `locale` prop from the layout.
- [`blog/data.ts`](../apps/frontend/src/app/(website)/[locale]/blog/data.ts) /
  [`projects/data.ts`](../apps/frontend/src/app/(website)/[locale]/projects/data.ts) — `GET_POSTS`/`GET_PROJECTS`
  (listing) and `GET_POST_BY_SLUG`/`GET_PROJECT_BY_SLUG` (detail) all gain `$locale`; `getBlogPosts`/`getProjects`
  now *require* a `locale` param (no silent English default) so a caller can't forget it.
- [`RenderBlocks.tsx`](../apps/frontend/src/components/RenderBlocks.tsx) — takes a `locale` prop and passes it to
  every block component, so `BlogSection`/`ProjectsSection`'s `populateBy: 'collection'` fetch path (which calls
  `getBlogPosts`/`getProjects` directly, independent of the page-level query) is locale-correct too.

**Cache-key locale bleed (the #1 risk called out in §4) — fixed at the one place it existed.**
`getCachedHeaderData` was the only `unstable_cache` wrapper on locale-sensitive data; its key is now
`['global_header', locale]` and tags `['global_header_' + locale, 'global_header']` (shared tag kept so a
plain `revalidateTag('global_header')` from a Payload hook still busts all locales at once). Footer/copyright
were already uncached per-request, so passing `locale` as a query variable was sufficient there — nothing to
namespace.

**`generateStaticParams`:** confirmed no change needed — slugs are shared across locales (Phase 1 decision),
so the parent `[locale]` layout's `{en, es}` set × the existing (locale-independent) slug generators already
covers both locales.

**Live preview:** no code change to
[`live-preview-listener.tsx`](../apps/frontend/src/components/live-preview-listener.tsx) — `RefreshRouteOnSave`
only calls `router.refresh()`, which re-runs the page's server data fetch; since that fetch is now locale-aware,
a draft-mode refresh on `/es/...` correctly re-fetches Spanish. **Found but explicitly NOT fixed (pre-existing,
out of scope):** the CMS-side `livePreview.url` builder
([`apps/payload/src/utilities/generatePreviewPath.ts`](../apps/payload/src/utilities/generatePreviewPath.ts))
doesn't thread locale, doesn't have a `projects` entry in its `collectionPrefixMap` (only `posts`/`pages`), and
there is **no `/next/preview` route in the frontend app at all** to receive it — the admin "Preview" button was
already non-functional before this session touched anything. That's a separate, real gap; flagging it for
whoever owns it rather than silently absorbing it into this phase's scope.

**Bonus fix — stale imports from Part A's `git mv` (build-breaking, unrelated to locale plumbing but found
while wiring it):** moving routes under `[locale]/` renamed the files but missed several **absolute imports
elsewhere** still pointing at the old pre-`[locale]` paths, which would not resolve:
`components/page-sections/blog.tsx` (`getBlogPosts` from `@/app/(website)/blog/data`),
`components/page-sections/projects.tsx` (`getProjects` from `@/app/(website)/projects/data`),
`components/page-sections/lab-teaser.tsx`, `components/gallery/{GalleryCard,Gallery,GalleryBar}.tsx` (all
`@/app/(website)/lab/types`), and `app/exp/(tracked)/{gray-scott,reaction-sphere}/page.tsx` (canvases under
`@/app/(website)/lab/(items)/...`). All repointed at `@/app/(website)/[locale]/...`. (`globals.css` imports
were already fine — that file intentionally stayed at the `(website)` group root, not moved.)

### Verification (Phase 3, both parts)
Per the working convention / `defer-checks-to-end` memory, **no build/lint/dev-server run was performed.**
Recommended checkpoint before Phase 4: `pnpm dev` in `apps/frontend`, confirm `/` → `/en`, and that
`/en`/`/es` (home, a CMS page, `/blog`, `/blog/:slug`, `/projects`, `/projects/:slug`, `/lab`) all render —
`es` should show translated header/footer/page copy once the Phase 2 seed has run against a live DB (still
outstanding per Phase 2's verification notes); until then `fallback: true` means `es` renders `en` content,
which is expected, not a bug.

### Files touched — Phase 3 Part A
- **New:** [`i18n/config.ts`](../apps/frontend/src/i18n/config.ts), [`middleware.ts`](../apps/frontend/src/middleware.ts).
- **Moved (git renames):** all of `app/(website)/{page.tsx,layout.tsx,[slug],blog,projects,lab}` → under
  `app/(website)/[locale]/`.
- **Modified:** [`[locale]/layout.tsx`](../apps/frontend/src/app/(website)/[locale]/layout.tsx) (locale param,
  validation, `<html lang>`, `generateStaticParams`, `'../globals.css'` import).
- **Reverted (kept unchanged):** `data/data.ts`, `lib/queries/page-blocks.ts`, `components/Footer.tsx` — the
  Part B draft was rolled back so this scope is Part A only.
- **Docs:** [`internationalization.md`](../internationalization.md) (Phase 3 split into Part A/B), this file.

### Files touched — Phase 3 Part B (this session)
**Locale threaded into GraphQL + caches**
- [`lib/queries/page-blocks.ts`](../apps/frontend/src/lib/queries/page-blocks.ts) — `$locale` on `GET_PAGE_BY_SLUG`/`GET_HOME_PAGE`.
- [`data/data.ts`](../apps/frontend/src/data/data.ts) — `$locale` on `GET_HEADER`/`GET_FOOTER`/`GET_COPYRIGHT`;
  `resolveHref()` locale-prefixes internal hrefs; `getCachedHeaderData`/`getFooterData` take `locale`; header
  cache key/tags namespaced by locale.
- [`app/(website)/[locale]/blog/data.ts`](../apps/frontend/src/app/(website)/[locale]/blog/data.ts) — `$locale` on `GET_POSTS`/`GET_POST_BY_SLUG`.
- [`app/(website)/[locale]/projects/data.ts`](../apps/frontend/src/app/(website)/[locale]/projects/data.ts) — `$locale` on `GET_PROJECTS`/`GET_PROJECT_BY_SLUG`.
- [`components/RenderBlocks.tsx`](../apps/frontend/src/components/RenderBlocks.tsx) — new `locale` prop, passed to every block.
- [`components/Footer.tsx`](../apps/frontend/src/components/Footer.tsx) — new `locale` prop.

**Pages threading `params.locale` through to the data layer**
- `[locale]/page.tsx`, `[locale]/layout.tsx`, `[locale]/[slug]/page.tsx`, `[locale]/blog/page.tsx`,
  `[locale]/blog/[slug]/page.tsx`, `[locale]/projects/page.tsx`, `[locale]/projects/[slug]/page.tsx`.

**Bonus fix — stale Part A import paths**
- `components/page-sections/blog.tsx`, `components/page-sections/projects.tsx` (also gained a `locale` prop),
  `components/page-sections/lab-teaser.tsx`, `components/gallery/{GalleryCard,Gallery,GalleryBar}.tsx`,
  `app/exp/(tracked)/{gray-scott,reaction-sphere}/page.tsx`.

**Docs** — [`internationalization.md`](../internationalization.md) (Phase 3 Part B checked off), this file.

### Suggested commit message
```
feat(i18n): Phase 3 Part B — thread locale through GraphQL + fix cache bleed

Add $locale: LocaleInputType to every CMS GraphQL query (page-blocks,
header/footer/copyright, blog/projects listing + detail) and thread
params.locale from each [locale] route down to the fetch layer, including
RenderBlocks -> BlogSection/ProjectsSection's own collection-fetch path.
Namespace the one existing unstable_cache (header) by locale to close the
cache-bleed risk flagged in the plan's §4; resolveHref() now locale-prefixes
internal nav hrefs. Also repoints several absolute imports left stale by
Part A's git mv of routes under [locale]/ (blog/projects/lab data + gallery
+ exp canvases), which would otherwise have failed to resolve at build time.
No frontend link-audit yet (hardcoded internal hrefs in cards/redirects) —
that's Phase 4.
```

---

## What's done — Phase 4 (Language switcher & UI chrome)

### Language switcher
New [`LanguageSwitcher.tsx`](../apps/frontend/src/components/LanguageSwitcher.tsx) — a `'use client'` component
modeled on the existing `ThemeSwitch`: reads `usePathname()` + `useSearchParams()`, swaps the first path
segment for the target locale, preserves the query string, and sets the `NEXT_LOCALE` cookie on click (same
shape the middleware writes: `path=/`, 1-year `max-age`, `samesite=lax`) so a later visit to an unprefixed
path or `/` negotiates the just-picked locale instead of re-deriving from `Accept-Language`. Each option
renders as an `en`/`es` link with `hrefLang` and `aria-current="true"` on the active one. Wired into
[`HeaderNav.tsx`](../apps/frontend/src/components/HeaderNav.tsx) next to `ThemeSwitch` in both the desktop
and mobile rows, each instance wrapped in its own `<Suspense>` — `useSearchParams()` requires a Suspense
boundary for routes that are statically rendered, and this scopes the requirement to just the switcher
rather than forcing the whole header (and therefore every page under the root layout) into a Suspense
fallback.

### The centralizing helper (re-added, per Part A's note)
`localizedHref(locale, href)` in [`i18n/config.ts`](../apps/frontend/src/i18n/config.ts) — the helper Part A
deliberately left out ("re-add it in Part B/Phase 4 when a consumer exists"). One line: prefixes a relative
(`/...`) href with `/${locale}`; anything else (external URLs, `mailto:`, `tel:`, already-external content)
passes through untouched. `resolveLinkHref()` ([`lib/resolveLinkHref.ts`](../apps/frontend/src/lib/resolveLinkHref.ts))
and `CMSLink` ([`components/cms-link.tsx`](../apps/frontend/src/components/cms-link.tsx)) both gained an
**optional** `locale` param/prop and apply this helper — optional so the one call site that's always
external (`ServiceCard`'s `proofUrl`, a plain outbound link) didn't need touching, while every internal-link
call site now passes its route's `locale` through.

### The link audit — every internal href now carries the current locale
Traced `locale` from each route down to the actual `<Link>`/`redirect()`/`router.push()` call, rather than
resolving hrefs once at the top and hoping they survive prop-drilling unchanged:

- **CMSLink consumers** (shared `link()` field CTAs): `hero.tsx` (both `StatementHero` and `PortraitHero`,
  each with two link-rendering branches), `services-hero.tsx`, `contact.tsx`.
- **`resolveLinkHref` consumers** (section "view more" arrows): `about.tsx`, `services-teaser.tsx` (section
  action + per-item links), `projects.tsx` (section action + both the `hairline` and default variant's
  per-project case-study hrefs — these were raw `` `/projects/${slug}` `` template strings, not
  `resolveLinkHref` calls, so fixed via `localizedHref` directly), `lab-teaser.tsx` (section action + the
  static `galleryItems` hrefs it slices and passes to `LabTeaserCard`).
- **Blog chain:** `ArticleCard` now takes `locale` and builds its own `/blog/:slug` href;
  `page-sections/blog.tsx` passes it through (plus prefixes the CMS `blogUrl` "all articles" link);
  `blog/page.tsx` → `BlogList` (client component, two `/blog/:slug` links); `blog/[slug]/page.tsx` →
  `RelatedPosts`.
- **Projects listing:** `projects/page.tsx`'s own `ProjectsList` (separate from the `projects` page-section
  above — this is the standalone `/projects` route) now prefixes `caseStudyUrl`.
- **CMS redirects:** [`payload-redirects.tsx`](../apps/frontend/src/components/payload-redirects.tsx) takes
  `locale` and prefixes whichever redirect target it computes (external `to.url`, resolved-reference, or
  resolved-value branch) before calling Next's `redirect()`. Updated its three call sites: the generic
  `[slug]/page.tsx`, `blog/[slug]/page.tsx`, `projects/[slug]/page.tsx` (which renders it twice — the
  not-found branch and the "redirects for valid pages too" branch).
- **Lab gallery:** `lab/page.tsx` (the `/lab` listing route) now takes `params.locale` and maps
  `getGalleryItems()`'s hrefs through `localizedHref` before handing them to `<Gallery>`. The four lab-item
  hero components (`SvgCirclesHero`, `GrayScottHero`, `IcoReactionDiffusionHero`, `ImageToSvgHero`) each have
  a hardcoded "back to /lab" link but are client components one level below the route's `params` — read the
  locale via `useParams<{ locale: string }>()` instead of prop-threading. `reaction-sphere/page.tsx` (a
  server component) has its own hardcoded cross-link to `/lab/gray-scott`, fixed via `params.locale` directly.
- **Form confirmation redirect:** `PayloadForm.tsx`'s post-submit `confirmationType: 'redirect'` branch
  (`router.push(redirect.url)`) now reads locale via `useParams()` (same reasoning as the lab heroes — it's
  a client component with no clean prop path from the route) and prefixes the target before pushing.

### Bonus fixes found during the audit
- **`RelatedPosts` linked to a route that doesn't exist.** It built `` `/posts/${slug}` ``, but posts are
  served at `/blog/:slug` (there is no `/posts` route in the frontend app — that path is only used
  internally as the CMS collection-slug key when matching against the redirects plugin, e.g. in
  `blog/[slug]/page.tsx`'s own `url` variable). Fixed to `/blog/${slug}` alongside the locale prefix; this
  was broken before i18n touched it, not something Phase 3/4 introduced.
- **`HeaderNav`'s brand logo linked to the bare root** (`href="/"`). On a prefixed site every click on the
  logo would hit the middleware, get 302'd to `/${locale}`, and only then render — a needless redirect hop.
  Now points straight at `/${locale}`.

### Verification
Per the working convention / `defer-checks-to-end` memory, **no build/type-check/lint/dev-server run was
performed.** Recommended checkpoint before Phase 5: `pnpm dev` in `apps/frontend`, click the language
switcher from several pages (home, a CMS page, a blog post, a project, `/lab`, a lab item) and confirm the
URL swaps `/en/...` ↔ `/es/...` in place (same slug, same query string) rather than bouncing to the locale's
home page; also spot-check that internal links found during the audit (nav, footer, hero/contact CTAs,
project/blog cards, the lab back-link) all resolve under the current locale rather than dropping the prefix.

### Files touched — Phase 4 (this session)
**New**
- [`components/LanguageSwitcher.tsx`](../apps/frontend/src/components/LanguageSwitcher.tsx)

**Core helpers**
- [`i18n/config.ts`](../apps/frontend/src/i18n/config.ts) — `localizedHref()`, `localeLabels`.
- [`lib/resolveLinkHref.ts`](../apps/frontend/src/lib/resolveLinkHref.ts) — optional `locale` param.
- [`components/cms-link.tsx`](../apps/frontend/src/components/cms-link.tsx) — optional `locale` prop.

**Header/switcher**
- [`components/HeaderNav.tsx`](../apps/frontend/src/components/HeaderNav.tsx),
  [`[locale]/layout.tsx`](../apps/frontend/src/app/(website)/[locale]/layout.tsx).

**Page-sections (CMSLink/resolveLinkHref/raw-href threading)**
- `page-sections/{hero,services-hero,contact,about,services-teaser,projects,lab-teaser,blog}.tsx`.

**Blog chain**
- `components/cards/ArticleCard.tsx`, `components/blog/blog-list.tsx`, `components/blog/related-posts.tsx`,
  `[locale]/blog/page.tsx`, `[locale]/blog/[slug]/page.tsx`.

**Projects listing**
- `[locale]/projects/page.tsx`.

**Redirects**
- `components/payload-redirects.tsx`, `[locale]/[slug]/page.tsx`, `[locale]/blog/[slug]/page.tsx`,
  `[locale]/projects/[slug]/page.tsx`.

**Lab gallery**
- `[locale]/lab/page.tsx`,
  `[locale]/lab/(items)/{svg-circles/SvgCirclesHero,gray-scott/GrayScottHero,reaction-sphere/IcoReactionDiffusionHero,image-to-svg/ImageToSvgHero}.tsx`,
  `[locale]/lab/(items)/reaction-sphere/page.tsx`.

**Form**
- `components/form/PayloadForm.tsx`.

**Docs** — [`internationalization.md`](../internationalization.md) (Phase 4 checkboxes, status, §4 redirects
risk resolved), this file.

### Suggested commit message
```
feat(i18n): Phase 4 — language switcher + full internal-link locale audit

Add LanguageSwitcher (header, desktop + mobile) that swaps the locale
segment on the current path while preserving slug and query string, and
persists the NEXT_LOCALE cookie the middleware reads. Re-add the
localizedHref(locale, href) helper Part A deferred; thread an optional
locale through resolveLinkHref()/CMSLink and every consumer (hero,
services-hero, contact, about, services-teaser, projects, lab-teaser,
the blog chain, the projects listing, CMS redirects, the lab gallery
including its four client-side hero back-links, and the form-builder
post-submit redirect) so no internal href drops the locale prefix.
Bonus fixes found while auditing: RelatedPosts linked to a nonexistent
/posts/:slug route (posts live at /blog/:slug); HeaderNav's brand logo
linked to the bare root instead of /{locale}, costing a needless
middleware redirect on every click.
```

---

## What's done — Phase 5 (Static UI strings + SEO)

### Dictionaries
New [`i18n/dictionaries/en.ts`](../apps/frontend/src/i18n/dictionaries/en.ts) /
[`es.ts`](../apps/frontend/src/i18n/dictionaries/es.ts) + [`i18n/getDictionary.ts`](../apps/frontend/src/i18n/getDictionary.ts), per §2.3.
One deliberate deviation from the plan's exact wording ("server helper"): `getDictionary()` is a **plain sync function**, not async I/O —
the dictionaries are static TS object literals, there's nothing to await — and it's **not** marked server-only, so it's callable from both
RSC data fetches *and* `'use client'` leaves (`Error.tsx`'s field-required message, `PayloadForm.tsx`'s submit/recaptcha errors,
`ThemeSwitch.tsx`'s aria-label, `components/pagination.tsx`) that read `locale` via `useParams()` — the same pattern Phase 4 established
for the lab back-links and the form's post-submit redirect. `es.ts` is typed `Dictionary = typeof en` so a missing key is a compile error,
not a silent English fallback in the Spanish UI.

A full repo grep swept every `>Capitalized text<` JSX child plus `placeholder=`/`aria-label=`/`title=` attributes across `components/` and
`app/(website)/`, then each hit was triaged file-by-file (not batch-replaced) to catch things a naive sweep misses: fallback defaults like
`eyebrow || 'Projects'` (7 page-sections — the fallback only fires when a CMS editor leaves the field blank, but it's still reachable
English), a hardcoded `'en-US'` in `ArticleCard.tsx`'s date formatting that would have shown English-formatted dates on `/es/...` forever,
and `formatDateTime.ts`'s hand-rolled `MM/DD/YYYY` string-concat replaced with `Intl.DateTimeFormat(locale, {...})`. See
[internationalization.md §Phase 5](../internationalization.md#scope-note-what-static-ui-strings-did-not-include) for what was **deliberately
excluded** (the 4 lab items' bespoke narrative content) and why. ✅ **That exclusion has since been addressed** — see
[§Lab-item content localization](#whats-done--lab-item-content-localization-phase-5-follow-up) below.

### SEO: hreflang, canonical, sitemaps
New [`lib/seo.ts`](../apps/frontend/src/lib/seo.ts) `buildAlternates(locale, path)` — pure prefix logic (`/${locale}${path}` per locale +
`x-default` → the default locale), valid because §Phase 1 kept slugs shared across locales, so there's never a per-locale slug lookup to
do. Wired into: `generateMeta()` ([`lib/generateMeta.ts`](../apps/frontend/src/lib/generateMeta.ts), now takes `locale` + `path` and also
sets `openGraph.locale`/`alternateLocale`), all 4 CMS-backed `generateMetadata` functions (home, `[slug]`, `blog/[slug]`,
`projects/[slug]`), the root [`[locale]/layout.tsx`](../apps/frontend/src/app/(website)/[locale]/layout.tsx) fallback (which also now
carries the one `metadataBase` for the whole tree — previously unset anywhere), the 3 static listing pages (blog/projects/lab, converted
from static `export const metadata` to `generateMetadata` so they can be locale-aware), and the 4 lab-item detail pages (alternates only,
per the scope note above).

**Meta title/description were already locale-correct before this phase** — Phase 3B threaded `$locale` into the GraphQL queries that
fetch `meta.title`/`meta.description`, so `doc.meta.title` in `generateMeta()` was already the Spanish value on `/es/...`. This phase's
SEO work was really just adding `alternates`/`openGraph.locale` on top of data that was already right, not a data-fetching change.

New [`lib/sitemap.ts`](../apps/frontend/src/lib/sitemap.ts) `localizeSitemapEntries()` expands each CMS doc into one `<url>` per locale
with `alternateRefs` (rendered as `xhtml:link`) to every locale + `x-default` — confirmed `next-sitemap`'s `ISitemapField` supports this
natively (`alternateRefs?: Array<{ href, hreflang, hrefIsAbsolute }>`) before writing it, no library gap. Wired into all 3 dynamic sitemap
routes ([`pages-sitemap.xml`](../apps/frontend/src/app/(website)/(sitemaps)/pages-sitemap.xml/route.ts),
[`posts-sitemap.xml`](../apps/frontend/src/app/(website)/(sitemaps)/posts-sitemap.xml/route.ts),
[`projects-sitemap.xml`](../apps/frontend/src/app/(website)/(sitemaps)/projects-sitemap.xml/route.ts)) — the underlying GraphQL queries
were **not** changed (slug/updatedAt aren't localized fields, so one query still covers both locales' entries).

**Bonus fix found while rewriting `pages-sitemap.xml`:** its old `defaultSitemap` array hardcoded `${SITE_URL}/search` and
`${SITE_URL}/posts` — neither route exists in the frontend app (there's no `/search` page anywhere, and posts are served at `/blog/:slug`,
not `/posts`; the makeover/Phase-3 handoff had already flagged `/posts` as a collection-slug-only string, not a real route). Multiplying
two already-dead links across two locales would have made it worse, so they were dropped rather than carried forward.

`robots.txt` needed **no changes** — it's generated once by `next-sitemap`'s build step, lists the 3 dynamic sitemap URLs (which now
enumerate every locale internally), and has no per-locale human-readable text to translate. Confirmed this rather than assumed it.

### 404 page
New [`[locale]/not-found.tsx`](../apps/frontend/src/app/(website)/[locale]/not-found.tsx) — none existed before (confirmed via repo
search), so every 404 previously fell through to Next's built-in English default. Reads `locale` from `params` (supported on
`not-found.js` in the Next 16 this repo runs) with an `isValidLocale` fallback to `en`, since the boundary can also be hit from the root
layout's own `notFound()` call when the locale segment itself is invalid.

### Verification
Per the working convention / `defer-checks-to-end` memory, **no build/type-check/lint/dev-server run was performed.** The dictionary's
`es.ts satisfies typeof en` typing means a missing translation key would be a compile error, so `pnpm exec tsc --noEmit` in
`apps/frontend` is a meaningful checkpoint before shipping — recommended next step. Also worth a manual spot-check once a server is
running: `/es/blog` (search/filter/empty states + article dates), `/es/projects` and `/es` contact form (submit an invalid form to see the
required-field/error copy in Spanish), `/es/some-bad-slug` (404 page), and viewing page source on a couple of `/es/...` routes for
`<link rel="alternate" hreflang="es" ...>` tags plus `curl .../pages-sitemap.xml` for `xhtml:link` alternates.

### Files touched — Phase 5 (this session)
**New**
- [`i18n/dictionaries/en.ts`](../apps/frontend/src/i18n/dictionaries/en.ts), [`es.ts`](../apps/frontend/src/i18n/dictionaries/es.ts),
  [`i18n/getDictionary.ts`](../apps/frontend/src/i18n/getDictionary.ts).
- [`lib/seo.ts`](../apps/frontend/src/lib/seo.ts) (`buildAlternates`, `SITE_URL`), [`lib/sitemap.ts`](../apps/frontend/src/lib/sitemap.ts)
  (`localizeSitemapEntries`).
- [`[locale]/not-found.tsx`](../apps/frontend/src/app/(website)/[locale]/not-found.tsx).

**SEO wiring**
- [`lib/generateMeta.ts`](../apps/frontend/src/lib/generateMeta.ts), `[locale]/layout.tsx`, `[locale]/page.tsx`, `[locale]/[slug]/page.tsx`,
  `[locale]/blog/[slug]/page.tsx`, `[locale]/projects/[slug]/page.tsx`, `[locale]/blog/page.tsx`, `[locale]/projects/page.tsx`,
  `[locale]/lab/page.tsx`, `[locale]/lab/(items)/{gray-scott,image-to-svg,reaction-sphere,svg-circles}/page.tsx` (alternates only).

**Sitemaps** — all 3 routes under `(sitemaps)/`.

**UI-string localization**
- Pagination: `components/ui/pagination.tsx` (optional `label`/`aria-label` overrides, English defaults kept), `components/pagination.tsx`
  (locale via `useParams`).
- Forms: `components/form/PayloadForm.tsx`, `components/form/Error.tsx`.
- Blog: `components/blog/{hero,related-posts,blog-list}.tsx`, `lib/formatDateTime.ts`, `[locale]/blog/[slug]/page.tsx` ("Related Posts").
- Gallery/lab chrome: `components/gallery/{Gallery,GalleryBar}.tsx`.
- Cards: `components/cards/{ProjectCard,ArticleCard,ServiceCard,ProjectSummaryCard}.tsx`.
- Page-sections (eyebrow fallbacks + CTA strings): `page-sections/{services-teaser,contact,skills,about,lab-teaser,projects,blog,hero,
  services}.tsx`.
- Chrome: `components/ThemeSwitch.tsx`.

**Docs** — this file, [`internationalization.md`](../internationalization.md) (Phase 5 checkboxes, status, scope note).

### Suggested commit message
```
feat(i18n): Phase 5 — static UI-string dictionary + hreflang/canonical + locale sitemaps

Add i18n/dictionaries/{en,es}.ts + getDictionary() (§2.3) and migrate every
reachable hardcoded UI-chrome string onto it: pagination, form loading/
validation/error/reCAPTCHA-notice copy, blog & lab search/filter/empty
states, eyebrow fallbacks, CTA link labels, the 404 page (new — none
existed), and ThemeSwitch's aria-label. Fix a hardcoded 'en-US' in
ArticleCard's date formatting and replace formatDateTime's manual
MM/DD/YYYY with Intl.DateTimeFormat(locale). Deliberately leave the 4 lab
items' bespoke narrative copy untranslated (content-authoring work, not UI
chrome) but still give them correct hreflang alternates.

Add lib/seo.ts buildAlternates() and wire alternates/canonical + openGraph
locale into every CMS route's generateMeta() plus the static listing pages
(meta.title/description were already locale-correct via Phase 3B's $locale
GraphQL threading — this only adds the alternates on top). Set metadataBase
once at the root layout. Rewrite all 3 dynamic sitemaps around a new
localizeSitemapEntries() helper that expands each doc into one <url> per
locale with xhtml:link alternateRefs; drop two pre-existing dead links
(/search, /posts) found while touching pages-sitemap.xml rather than
multiplying them across locales.
```

---

## What's done — Lab-item content localization (Phase 5 follow-up)

Phase 5 deliberately left the **4 lab items' bespoke narrative content** untranslated (flagged as content-authoring work, not UI
chrome — it only gave them correct hreflang alternates). This follow-up closes that gap: cards, hero copy, interactive control
chrome, and the full below-the-hero prose now render in the active locale on `/en` **and** `/es`.

### Approach (three decisions, all confirmed with the author up front)
- **A separate lab content module, not the main dictionary** — the long-form prose would have ballooned
  `i18n/dictionaries/{en,es}.ts` and mixed chrome with content, so it lives on its own under `lab/content/`.
- **Everything, including the in-canvas control chrome** — not just the readable prose.
- **A typed rich-segment model** for the marked-up body paragraphs — inline `<code>`/`<strong>`/links are preserved as data, not
  hardcoded JSX, so a translator moves whole paragraphs without touching markup.

### The type (the "type for lab items")
[`lab/types.ts`](../apps/frontend/src/app/(website)/[locale]/lab/types.ts) — `GalleryItem` (the pre-existing structural type) is
unchanged; **new**: `LabItemContent` (meta + card + hero + optional `controls` + `sections` + svg-circles-only `variants`), the
rich-text model (`RichSegment` = `string | {code} | {strong} | {link,href,external?}` → `RichText` → `ContentBlock` → `LabSection`),
and a `LabSlug` union (`'svg-circles' | 'gray-scott' | 'reaction-sphere' | 'image-to-svg'`). Both content maps are typed
`Record<LabSlug, LabItemContent>`, so a missing item **or field** is a compile error, not a silent English fallback — same guardrail
as `es.ts satisfies typeof en` for the main dictionary.

### The content + helper
- [`lab/content/en.ts`](../apps/frontend/src/app/(website)/[locale]/lab/content/en.ts) — the existing English copy extracted verbatim.
- [`lab/content/es.ts`](../apps/frontend/src/app/(website)/[locale]/lab/content/es.ts) — **real Spanish translation**; formulas/code
  segments and proper nouns (Gray-Scott, WebGL, Three.js, SVG) left intact.
- [`lab/content/index.ts`](../apps/frontend/src/app/(website)/[locale]/lab/content/index.ts) — `getLabContent(locale, slug)`, a plain
  sync lookup (same pattern/rationale as `getDictionary` — callable from the `'use client'` heroes that read `locale` via `useParams()`).

### The renderer
[`components/lab/lab-content.tsx`](../apps/frontend/src/components/lab/lab-content.tsx) — `<RichText>` (renders inline segments;
internal links run through `localizedHref`, `external` links get `target=_blank rel=noopener`) and `<LabSections>` (reproduces the
exact prose layout the item pages used to hardcode). `<RichText>` is exported because svg-circles' "Variants" intro renders it
directly in the page (the live SVG tiles stay in the page; only their surrounding text is localized).

### Wiring
- **4 item pages** — locale-aware `generateMetadata` (title/description now from `content.meta`, replacing the old English-only
  literals + their "see gray-scott note" comments) and the narrative replaced by `<LabSections>`. gray-scott / image-to-svg / svg-circles
  became `async` with `params` to get `locale`.
- **4 heroes** — title/lede/hint/badges from `content.hero`; slider / preset / motion micro-labels from `content.controls`; shared
  chrome (Controls, Presets, Reset field, Upload/Download, drop + error text, Back to gallery) from the dictionary.
- **Gallery surfaces** — new `getLocalizedGalleryItems(locale)` in [`lab/data.ts`](../apps/frontend/src/app/(website)/[locale]/lab/data.ts)
  overlays localized card title/description/tags onto the structural registry (which stays the source of truth for
  id/slug/image/href/year/priority). Category labels (`Art/Experiment/Project`) + shared control chrome were added to
  `dictionary.lab.categories` / `dictionary.lab.controls` in [`en.ts`](../apps/frontend/src/i18n/dictionaries/en.ts) /
  [`es.ts`](../apps/frontend/src/i18n/dictionaries/es.ts). This reaches **both** the `/lab` grid (`GalleryCard`/`GalleryBar` gained
  locale-aware category labels) **and** the home-page `lab-teaser` section.

### Scope carve-out (flagged, not silently dropped)
The **image-to-svg strategy registry** (`(items)/image-to-svg/strategies/*.ts` — strategy names like "Hatching", control labels like
"Spacing"/"Levels", select options) is **not** localized. Those labels live inside the framework-free strategy modules ("pure function
from tone buffer to SVG"), and threading a locale through them is a distinct refactor of that subsystem. Documented in a header comment
in `content/en.ts`. Everything else on that page (Controls, Strategy heading, Upload/Download, drop + error text, hero) **is** localized.

### Follow-up for whoever adds a new lab item
[`CREATING_GALLERY_ITEMS.md`](../apps/frontend/src/app/(website)/[locale]/lab/CREATING_GALLERY_ITEMS.md) predates this and still shows
the old hardcoded-copy pattern — a new item now also needs a `LabSlug` entry + an `en`/`es` `LabItemContent` block (that doc wasn't
updated in this pass).

### Verification
Per the working convention / `defer-checks-to-end` memory, **no build/type-check/lint/dev-server run was performed.** The
`Record<LabSlug, LabItemContent>` typing on `es.ts` makes `pnpm exec tsc --noEmit` (in `apps/frontend`) the meaningful checkpoint —
any en/es structural drift surfaces there. Then a manual spot-check on `/es/lab` (cards + category chips + filter search) and each
`/es/lab/:item` (hero, control panel labels, narrative prose, the Karl Sims / cross-links).

### Files touched — Lab-item content localization (this session)
**New**
- [`lab/content/{en,es,index}.ts`](../apps/frontend/src/app/(website)/[locale]/lab/content/),
  [`components/lab/lab-content.tsx`](../apps/frontend/src/components/lab/lab-content.tsx).

**Types / data / dictionary**
- [`lab/types.ts`](../apps/frontend/src/app/(website)/[locale]/lab/types.ts) (content types + `LabSlug`),
  [`lab/data.ts`](../apps/frontend/src/app/(website)/[locale]/lab/data.ts) (`getLocalizedGalleryItems`),
  `i18n/dictionaries/{en,es}.ts` (`lab.categories`, `lab.controls`).

**Pages / heroes**
- `lab/page.tsx`, `lab/(items)/{svg-circles,gray-scott,reaction-sphere,image-to-svg}/page.tsx` + their hero components.

**Gallery**
- `components/gallery/{Gallery,GalleryCard,GalleryBar}.tsx`, `components/page-sections/lab-teaser.tsx`.

### Suggested commit message
```
feat(i18n): localize the lab gallery items (content + type model)

Add a typed, locale-keyed content module for the four lab items so their
cards, heroes, interactive control chrome, and narrative prose all render in
the active locale — the piece Phase 5 deferred as content-authoring work.

- types: LabItemContent + a rich-segment model (RichSegment/RichText/
  ContentBlock/LabSection) that preserves inline code/strong/links, plus a
  LabSlug union so a missing translation is a compile error.
- content/{en,es}.ts: English extracted verbatim; full Spanish translation
  (formulas/code and proper nouns left intact). getLabContent(locale, slug)
  mirrors the getDictionary pattern.
- components/lab/lab-content.tsx: RichText + LabSections renderers reproducing
  the prose markup; internal links run through localizedHref.
- rewire all 4 item pages (locale-aware metadata + LabSections) and all 4
  heroes (title/lede/hint/badges + control labels).
- gallery: getLocalizedGalleryItems(locale) overlays card copy from content;
  category labels + shared control chrome move into dictionary.lab.
  categories/.controls, reaching the /lab grid and the home-page lab-teaser.

Scope carve-out: the image-to-svg strategy registry (strategies/*.ts labels)
is intentionally not localized — a separate refactor of that framework-free
subsystem — noted in content/en.ts.
```

---

## Don't re-litigate

The five decisions in §2 are **settled** (all ✅ in the plan). The known risks are catalogued in §4 of
the plan — the top one to keep front-of-mind through Phases 3–6 is **cache-key locale bleed**: every
`unstable_cache` key and revalidate tag must be namespaced by locale, or one locale's content leaks into
the other. It's the most likely silent bug in the whole effort.

---

## Files touched — Phase 1
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

**Docs** — [`docs/internationalization.md`](../internationalization.md) (Phase 1 checkboxes + status),
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

---

## Files touched — Phase 2 (this session)
**Migration**
- [`migrations/20260726_154000_add_localized_fields.ts`](../apps/payload/src/migrations/20260726_154000_add_localized_fields.ts)
  (+ `.json` snapshot) — the localization schema migration.
- [`migrations/index.ts`](../apps/payload/src/migrations/index.ts) — registers the new migration.

**Seed infrastructure**
- [`seed/localize.ts`](../apps/payload/src/app/seed/localize.ts) — **new.** `deepMergeLocalized` +
  `seedLocalizedDoc` / `seedLocalizedGlobal` (two-pass en→es write with id-preserving overlay).
- [`seed/route.ts`](../apps/payload/src/app/seed/route.ts) — routes every create/updateGlobal through the
  localize helpers.

**Seed data (added `es` patches)**
- [`seed/home-data.ts`](../apps/payload/src/app/seed/home-data.ts) — `homePageDataES`.
- [`seed/about-data.ts`](../apps/payload/src/app/seed/about-data.ts) — `aboutPageDataES`.
- [`seed/services-data.ts`](../apps/payload/src/app/seed/services-data.ts) — `servicesPageDataES`.
- [`seed/projects-data.ts`](../apps/payload/src/app/seed/projects-data.ts) — `projectsDataES` (+ Lexical builders).
- [`seed/globals-data.ts`](../apps/payload/src/app/seed/globals-data.ts) — `headerDataES` / `footerDataES` / `copyrightDataES`.
- [`seed/about-narrative.ts`](../apps/payload/src/app/seed/about-narrative.ts) — `aboutNarrativeBodyES`.
- [`seed/forms-data.ts`](../apps/payload/src/app/seed/forms-data.ts) — `servicesFormDataES`.

**Docs** — [`docs/internationalization.md`](../internationalization.md) (Phase 2 + §3.1 checkboxes, status),
[`docs/i18n-handoff.md`](i18n-handoff.md) (this file).

### Suggested commit message
```
feat(i18n): Phase 2 — localization migration + bilingual locale-aware seed

Add the committed `add_localized_fields` migration (generated against a
throwaway scratch DB; up 18→76 _locales tables, cycle-tested, zero hand-fixes)
and rework the seed for two-locale content. New seed/localize.ts overlays an
`es` patch onto the en-created doc — preserving array/block row ids so the
locale:'es' write doesn't orphan en values — then writes it back. Every seed
data file gains a real Spanish `es` patch (home, about, services, projects,
globals, contact form). No frontend changes yet — that's Phase 3.
```
