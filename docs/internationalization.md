# Internationalization (i18n) — Action Plan

Status: **Phase 0 complete — Phase 1 next** · Owner: TBD · Last updated: 2026-07-25

This document is the implementation plan for adding **English (`en`) + Spanish (`es`)** internationalization across the CMS schema (`apps/payload`) and the public site (`apps/frontend`). It is written to be executed in phases, each independently shippable and verifiable.

> **Working convention:** Defer **all** builds, type-checks (`generate:types`, `tsc`), lint runs, and dev-server checks to the **end** of the work — do not run them mid-implementation. The author verifies progress manually. Only *recommend* a checkpoint (and pause) when one is genuinely warranted — e.g. after the schema migration, before reseeding, or before the final handoff — rather than running it automatically. The per-phase "Exit" criteria describe the intended end state, not a signal to run a check at that moment.

---

## 1. Current state

### What already exists
- **Payload localization is configured but inert.** [`apps/payload/src/payload.config.ts`](../apps/payload/src/payload.config.ts) declares:
  ```ts
  localization: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  }
  ```
  This enables the locale switcher in the admin UI and the `locale` argument on the API, but **no field anywhere is marked `localized: true`**, so every field is currently a single shared value regardless of locale.
- **Database:** Postgres via `postgresAdapter` (dev) / `vercelPostgresAdapter` (prod). Migrations are checked in under [`apps/payload/src/migrations/`](../apps/payload/src/migrations/) and applied explicitly (not `push` in prod).
- **Types** are generated to [`packages/types/payload-types.ts`](../packages/types/payload-types.ts) and consumed by both apps via `@strps-website/types`.

### What is missing
- **Payload:** no field-level `localized: true` on any collection, global, or page-block.
- **Frontend:** no locale awareness at all — no `[locale]` route segment, no middleware, no `locale` argument passed to any GraphQL query, no language switcher, `<html lang="en">` is hardcoded in [`layout.tsx`](../apps/frontend/src/app/(website)/layout.tsx), and static UI strings are hardcoded in components.

### Architecture recap (what i18n touches)
| Area | Location | Impact |
|---|---|---|
| Collections | `apps/payload/src/collections/*` (Pages, Posts, Projects, ProjectTags, BlogTags, Media, Users) | Mark content fields `localized` |
| Globals | `apps/payload/src/globals/*` (Header, Footer, Copyright, BlogPage, ProjectsPage) | Mark content fields `localized` |
| Page blocks | `apps/payload/src/page-blocks/*` (13 blocks) + `apps/payload/src/blocks/Form` | Mark content fields `localized` |
| Data fetching | `apps/frontend/src/lib/queries/*`, `apps/frontend/src/data/data.ts`, sitemaps | Add `locale` argument |
| Routing | `apps/frontend/src/app/(website)/*` | Add `[locale]` segment + middleware |
| UI chrome | `HeaderNav.tsx`, `Footer.tsx`, form components | Language switcher + static string catalog |

---

## 2. Key decisions (resolve before Phase 2)

These shape everything downstream. **All resolved — see the ✅ note under each.**

### 2.1 URL strategy — ✅ **Decided: prefix all locales** (`/en/...`, `/es/...`)
| Option | Pros | Cons |
|---|---|---|
| **Prefix every locale** (`/en/about`, `/es/about`) | Simple, unambiguous, best for SEO/hreflang, easy static generation | Default locale loses "clean" URLs |
| Hide default locale (`/about` = en, `/es/about`) | Cleaner English URLs | Middleware complexity, ambiguous root, trickier `generateStaticParams` |

**Decision:** prefix all locales. It keeps `generateStaticParams`, sitemaps, and hreflang trivial and avoids middleware edge cases. Root `/` redirects to the negotiated locale.

### 2.2 Fallback behavior — ✅ **Decided: fall back to `en`** (with future CMS enforcement)
Set `localization.fallback: true` (default) so a page not yet translated to `es` renders English content rather than empty fields. Missing translations degrade gracefully instead of showing blanks.

> **Future consideration:** we may later **enforce translation in the CMS** — e.g. require `es` values before publish (field `required` per-locale, a publish-time validation hook, or an admin completeness indicator). Keep fallback as the runtime safety net; enforcement is an authoring-side gate layered on top. Not in the initial scope — tracked as a follow-up.

### 2.3 Static UI strings (non-CMS) — ✅ **Decided: lightweight local dictionary**
Strings baked into components (nav fallbacks, "Read more", form validation, footer legal text, 404 copy) are not in the CMS. Build **local typed dictionaries** at `apps/frontend/src/i18n/dictionaries/{en,es}.ts`, loaded per-request via a `getDictionary(locale)` server helper — zero deps, fully typed, RSC-friendly, right-sized for the small string count. (A library like `next-intl` can be adopted later if pluralization/interpolation volume grows; not needed now.)

### 2.4 Seed content — ✅ **Decided: seed both locales**
The seed data files and seed route will be updated to write both `en` **and** `es` translated content (per §3.1), so a fresh reseed lands a fully bilingual baseline rather than English-only with runtime fallback.

### 2.5 Existing data — **decided: no preservation, reseed**
We do **not** care about preserving current DB content. The schema change is applied by dropping/recreating the localized tables and **re-running the seed** with locale-aware data (§Phase 2 + Phase 6). This removes the data-migration risk entirely; the only work is updating the seed data files to include Spanish.

---

## 3. Phased plan

Each phase ends in a shippable, verifiable state. Phases 1–2 are backend; 3–5 are frontend; 6 is content + polish.

---

### Phase 0 — Foundations & alignment (0.5 day) ✅ **DONE**
- [x] Confirm the four decisions in §2. — all five (§2.1–2.5) were already resolved in this doc; no changes needed.
- [x] Confirm final locale list and labels (e.g. `English`, `Español`) — Payload supports per-locale `label` and `rtl` config. — `en` (English, default) + `es` (Español). No RTL locale, so no `rtl` config needed.
- [x] Optionally enrich the config with labels — **applied** in [`payload.config.ts`](../apps/payload/src/payload.config.ts):
  ```ts
  localization: {
    defaultLocale: 'en',
    fallback: true,
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Español', code: 'es' },
    ],
  }
  ```
- [x] Create a tracking issue/checklist mirroring this doc. — see [`i18n-handoff.md`](i18n-handoff.md) (living handoff/checklist; a GitHub issue can be opened from it if desired).

**Exit:** decisions signed off; config shape agreed. ✅

---

### Phase 1 — Mark localized fields in the schema (1–1.5 days)

Ref: <https://payloadcms.com/docs/configuration/localization#field-localization>

Add `localized: true` to **user-facing content fields only**. Do **not** localize structural/config fields.

**Localize (content):** `text`, `textarea`, `richText`, and content-bearing `array`/`group` fields that hold copy — headlines, eyebrows, descriptions, labels, body, summaries, FAQ Q&A, service/process/experience text, nav link `label`, footer/copyright text, SEO `meta.title` / `meta.description`.

**Do NOT localize (structural/shared):**
- `slug` (keep one slug across locales — simpler routing; revisit only if localized slugs are a hard requirement)
- Selects/enums (`variant`, `theme`, `appearance`, `layout`, `populateBy`), booleans, numbers, dates
- Relationships, `section` config (`section_id`, `background`, etc.), URLs, emails, media relationships
- Media **files** themselves (but `alt` text on Media **should** be localized)

**Work items (field audit per surface):**
- [ ] Collections: `Pages` (title + block content), `Posts`, `Projects` (+ `caseStudy` text, `techStack` is structural), `ProjectTags`, `BlogTags`, `Media.alt`
- [ ] Globals: `Header` nav labels, `Footer`, `Copyright`, `BlogPage`, `ProjectsPage`
- [ ] Page-blocks (13): `PageHero`, `PageServicesHero`, `PageAbout`, `PageSkills`, `PageProjects`, `PageExperience`, `PageContact`, `PageBlog`, `PageServices`, `PageProcess`, `PageFaq`, `PageServicesTeaser`, `PageLabTeaser`
- [ ] Shared field factories: [`fields/eyebrow`](../apps/payload/src/fields), `linkGroup` (the `label`), SEO fields — localize once in the factory and it propagates everywhere.
- [ ] Form-builder plugin fields (labels, messages) — verify plugin localization support; the `@payloadcms/plugin-form-builder` field labels may need `localized` overrides.

> **Tip:** Prefer editing the shared field factories (`eyebrow`, `linkGroup`, `SectionConfig`, SEO) so a single change localizes many blocks consistently.

**Exit:** `bunx payload generate:types` runs clean; localized fields show per-locale inputs in the admin UI (dev).

---

### Phase 2 — Database schema + migration (0.5 day)

Localizing fields changes the Postgres schema (Payload creates `_locales` sidecar tables). **Per §2.5 we do not preserve existing data** — this is a clean schema rebuild + reseed, so there is no data-backfill step to get right.

- [ ] In dev, let Payload build the new schema (drop/recreate is fine — no data to keep).
- [ ] Generate a committed migration so the change is reproducible in prod (still never rely on dev `push` in prod):
  ```bash
  cd apps/payload
  bunx payload migrate:create add_localized_fields
  ```
  The migration only needs to bring the schema to the localized shape; it does **not** need to preserve/backfill rows.
- [ ] After applying, run the (locale-aware) seed to repopulate content — see **Phase 6 / §3.1**.

> ⚠️ Known env note: a cold-boot `column "id" is in a primary key` Postgres warning is pre-existing and self-recovers (see memory `payload-dev-schema-push-error`); don't confuse it with a migration failure.

**Exit:** localized schema applied; DB reseeded with `en` (and `es`) content; `es` returns fallback (`en`) where a Spanish value wasn't seeded.

#### 3.1 — Locale-aware seeding (the "update the seed data" work)

The seed route ([`apps/payload/src/app/seed/route.ts`](../apps/payload/src/app/seed/route.ts)) drives typed data files. Once fields are `localized: true`, a plain `payload.create` / `updateGlobal` writes **only the default locale (`en`)**. Spanish content requires a **second write to the same doc with `locale: 'es'`**.

- [ ] **Restructure the seed data files** to carry both locales. Recommended shape: each data module exports `en` data plus an `es` patch containing only the localized fields:
  ```ts
  // e.g. home-data.ts
  export const getHomePageData = (formId, locale: 'en' | 'es') => ({ /* ... */ })
  // or: getHomePageDataEN(formId) + getHomePageDataES(formId)
  ```
  Affected files: [`home-data.ts`](../apps/payload/src/app/seed/home-data.ts), [`about-data.ts`](../apps/payload/src/app/seed/about-data.ts), [`services-data.ts`](../apps/payload/src/app/seed/services-data.ts), [`projects-data.ts`](../apps/payload/src/app/seed/projects-data.ts), [`globals-data.ts`](../apps/payload/src/app/seed/globals-data.ts), [`about-narrative.ts`](../apps/payload/src/app/seed/about-narrative.ts). Forms ([`forms-data.ts`](../apps/payload/src/app/seed/forms-data.ts)) only if form labels are localized.
- [ ] **Update the seed route** to write both locales. Pattern:
  ```ts
  const page = await payload.create({ collection: 'pages', data: enData, locale: 'en' })
  await payload.update({ collection: 'pages', id: page.id, data: esData, locale: 'es' })
  ```
  For globals: `updateGlobal({ slug, data: enData, locale: 'en' })` then again with `locale: 'es'`.
- [ ] **Non-localized fields** (slug, selects, relationships, section config) only need to be provided on the `en` create; the `es` update should send **only** the localized fields to avoid clobbering shared structure.
- [ ] Note the route currently **skips seeding if a page/project already exists** — after a schema rebuild the tables are empty so it runs fresh; if reseeding onto a non-empty DB, clear those docs first or the `es` pass is skipped too.
- [ ] Provide the Spanish copy (can start as English placeholders and refine in-admin later, since fallback covers gaps).

---

### Phase 3 — Frontend routing & locale plumbing (2 days)

Introduce the `[locale]` segment and make locale flow through every data fetch.

- [ ] **Route restructure:** move the site under a locale segment, e.g. `app/(website)/[locale]/...`, or convert the `(website)` group root to `[locale]`. Update `page.tsx`, `[slug]/page.tsx`, `blog`, `projects`, `lab` routes accordingly.
- [ ] **Middleware** (`apps/frontend/src/middleware.ts`): detect locale from path → cookie → `Accept-Language`; redirect `/` and unprefixed paths to the negotiated locale. Guard the matcher against `_next`, static assets, API, and admin.
- [ ] **Locale validation:** a shared `locales`/`defaultLocale` constant + `isValidLocale()` guard; `notFound()` on unknown locale.
- [ ] **Pass `locale` to GraphQL.** Payload's GraphQL accepts a `locale` argument on queries. Update:
  - [ ] [`lib/queries/page-blocks.ts`](../apps/frontend/src/lib/queries/page-blocks.ts) — `GET_PAGE_BY_SLUG`, `GET_HOME_PAGE` gain `locale` variables/args.
  - [ ] [`data/data.ts`](../apps/frontend/src/data/data.ts) — `GET_HEADER`, `GET_FOOTER`, copyright.
  - [ ] Blog/projects/post detail queries.
  - [ ] **Cache keys must include locale.** `unstable_cache([...], ['global_header'], ...)` currently caches one header for all locales — change keys to `['global_header', locale]` and tags to `global_header_${locale}`. Same for footer/sitemaps. **This is a correctness bug source if missed.**
- [ ] **`generateStaticParams`** now returns the cartesian product of `{ locale } × { slug }`. Update the pages, blog, and projects param generators.
- [ ] **Dynamic `<html lang>`** in the root layout from the route locale (currently hardcoded `"en"`).
- [ ] **Live preview** ([`live-preview-listener`](../apps/frontend/src/components/live-preview-listener.tsx)) — pass the active locale so admin preview matches the chosen locale.

**Exit:** `/en/...` and `/es/...` both render; `es` shows translated content where present, English fallback elsewhere; header/footer localize; no cross-locale cache bleed.

---

### Phase 4 — Language switcher & UI chrome (1 day)
- [ ] **Language switcher** component in [`HeaderNav.tsx`](../apps/frontend/src/components/HeaderNav.tsx): swaps the locale prefix on the **current** path (preserve slug + query), sets the locale cookie. Model it after the existing `ThemeSwitch`.
- [ ] Ensure all internal links are locale-aware — centralize with a `localizedHref(locale, href)` helper or a wrapped `<Link>`; audit `cms-link.tsx`, nav, footer, and card components so no link drops the prefix.
- [ ] Accessible: `hreflang` on switcher options, `aria-current`.

**Exit:** users can switch language anywhere and stay on the equivalent page; all navigation preserves locale.

---

### Phase 5 — Static UI strings + SEO (1 day)
- [ ] **Dictionaries:** `apps/frontend/src/i18n/dictionaries/{en,es}.ts` (per §2.3) with a typed `getDictionary(locale)` server helper. Migrate hardcoded strings: nav fallbacks, "Read more"/pagination, form labels/validation & success/error messages, footer legal, 404/empty states, date formatting (`Intl.DateTimeFormat(locale)`).
- [ ] **SEO metadata** per locale in `generateMetadata` (localized `meta.title`/`description` from CMS).
- [ ] **`hreflang` alternates** via `alternates.languages` in Next metadata for every page.
- [ ] **Sitemaps** ([`(sitemaps)/*`](../apps/frontend/src/app/(website)/(sitemaps))) emit one entry per locale with `xhtml:link` alternates; include the locale prefix in `loc`.
- [ ] Localize `robots`/canonical as needed.

**Exit:** localized titles/descriptions, correct hreflang + sitemaps, no hardcoded English left in chrome.

---

### Phase 6 — Content entry, QA & launch (ongoing)
- [ ] Run the locale-aware seed (§3.1) to populate `en` + `es` baseline content; refine `es` copy in the admin afterward. Fallback covers any untranslated pages until done.
- [ ] QA matrix: each route × `{en, es}` × {draft, published} × {switcher, direct URL, cookie, Accept-Language}.
- [ ] Verify no cross-locale cache bleed after revalidation ([`api/revalidate`](../apps/frontend/src/app/(website)/api/revalidate) tags must be locale-aware).
- [ ] Lighthouse/SEO check for hreflang correctness (Search Console "International Targeting").
- [ ] Update [`docs/architecture.md`](./architecture.md) and [`docs/COMPONENTS.md`](./COMPONENTS.md) with the i18n conventions.

**Exit:** both locales live, verified, documented.

---

## 4. Risks & gotchas
- **Cache-key locale bleed (high).** Every `unstable_cache`/`fetch` cache and revalidate tag must be namespaced by locale. This is the most likely silent bug.
- **Seed clobbering shared fields (medium).** The `locale: 'es'` update must send only localized fields; sending structural fields risks overwriting shared config. See §3.1.
- **Data:** no preservation required (§2.5) — existing content is dropped and reseeded, so there is **no** migration-backfill risk.
- **Slug strategy.** Shared slugs keep routing simple. Localized slugs are a larger change (per-locale `generateStaticParams`, redirects) — deferred unless required.
- **`generateStaticParams` explosion.** Product of locales × slugs; fine at current scale, watch build time as content grows.
- **Form-builder plugin.** Verify field-label localization support; may need overrides or a dictionary fallback.
- **Live preview & draft mode** must thread locale or editors preview the wrong language.
- **Redirects plugin** — ensure redirects account for the locale prefix.

## 5. Rough sequencing / estimate
| Phase | Scope | Est. |
|---|---|---|
| 0 | Decisions & config | 0.5d |
| 1 | Localize schema fields | 1–1.5d |
| 2 | DB migration (+ prod-clone test) | 0.5d |
| 3 | Routing + locale plumbing | 2d |
| 4 | Switcher + link audit | 1d |
| 5 | Static strings + SEO | 1d |
| 6 | Content + QA | ongoing |

**Engineering total (excl. translation): ~6–7 days.**

## 6. Definition of done
- `/en` and `/es` fully browsable; switcher preserves the current page.
- CMS content localized with English fallback; admin editable per locale.
- Localized SEO (titles, descriptions, hreflang, sitemaps).
- No cross-locale cache/revalidation bleed.
- Committed, prod-safe migration.
- Docs updated.
