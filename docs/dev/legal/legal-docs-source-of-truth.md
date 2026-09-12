# Legal Documents — Source of Truth

Everything needed to draft the site's legal documents (privacy policy, terms of service,
cookie policy), gathered by auditing the codebase on **2026-09-11**.

This is an intake/audit document, not the documents themselves. Two kinds of content are
marked throughout:

- ✅ **Verified in code** — a file reference is given; treat as fact.
- ❓ **Needs a decision** — the code cannot answer it; the site owner must supply it.

> ⚠️ Nothing here is legal advice. The existing published copy (see §7) is developer-written
> boilerplate that has never been reviewed by a lawyer.

---

## 1. Who the documents are for

| Item | Value | Source |
|---|---|---|
| Trading name / data controller | César Jerez (personal name, no company entity found) | [globals-data.ts](../../../apps/payload/src/app/seed/globals-data.ts) `copyrightData.name` = `CESAR JEREZ` |
| Site | `https://www.strps.dev` | `copyrightData.link` |
| Location | San José, Costa Rica (GMT-6) | `copyrightData.location`; [copy.md](../services-page/copy.md) |
| Contact email | `csrstrps@gmail.com` | [copy.md](../services-page/copy.md) "FINAL CTA" |
| Public profiles | github.com/strps · linkedin.com/in/cesar-jerez-e | `getFooterData` navItems |
| Operating since | 2024-01-01 | `copyrightData.startDate` |
| Nature of business | Solo freelance full stack developer: business websites, web apps/internal tools, APIs & integrations, optional monthly maintenance | [copy.md](../services-page/copy.md) |
| Audience | Clients worldwide, remote; EN + ES | copy.md FAQ "Do you work with clients outside Costa Rica?" |

❓ **Decisions needed:**
- Is there a registered legal entity (S.A., S.R.L., sole proprietor registered with Hacienda),
  or does the sole trader's own name carry the contract? The FAQ line *"Can you issue an invoice /
  factura electrónica? Yes. [Confirm once you're registered]"* implies registration was still pending.
- Physical/postal address to publish, if any. GDPR and CR's Ley 8968 both expect an identifiable
  controller with a contact address; a PO box or "contact by email" may be acceptable but is a choice.
- A dedicated privacy contact address (e.g. `privacy@strps.dev`) vs. the personal Gmail. Publishing a
  Gmail address on a site that will be scraped is a spam decision as much as a legal one.

---

## 2. Jurisdiction & which laws bind the documents

The code establishes the facts; the legal conclusions below are the areas a reviewer must confirm.

- **Costa Rica — Ley 8968** (Protección de la Persona frente al tratamiento de sus datos personales)
  and its reglamento. Operator is CR-based, so this applies by default. Note Ley 8968's
  *registration of databases with PRODHAB* obligation — worth checking whether a contact-form inbox
  of this size triggers it.
- **EU/UK GDPR** — the site is public worldwide, is served from a global CDN, and explicitly
  markets to clients "anywhere" ([copy.md](../services-page/copy.md)). If EU visitors are targeted
  rather than merely reachable, GDPR Art. 3(2) is in play, which pulls in lawful basis, data
  subject rights, and possibly an Art. 27 representative.
- **CCPA/CPRA** — likely below thresholds for a solo freelancer, but the site targets North American
  business hours (copy.md FAQ), so worth a one-line "we do not sell personal information" statement.

❓ **Decisions needed:** governing law and venue clause for the Terms (Costa Rica is the natural
choice); whether to claim GDPR applicability affirmatively or stay silent; whether an EU
representative is required.

---

## 3. Personal data actually collected — verified inventory

### 3.1 Contact form submissions ✅

Implemented with `@payloadcms/plugin-form-builder`
([plugins/index.ts](../../../apps/payload/src/plugins/index.ts)). Submissions are stored as rows in
the project's own **PostgreSQL** database (`form-submissions` collection), not just emailed.

Seeded form fields ([forms-data.ts](../../../apps/payload/src/app/seed/forms-data.ts)):

| Field | Type | Required | Personal data? |
|---|---|---|---|
| `name` | text | yes | Yes — identifying |
| `email` | email | yes | Yes — identifying |
| `message` | textarea ("What do you need?") | yes | Free text — may contain anything the visitor types |
| `budget` | select (`<$1k` … `$15k+` / not sure) | no | Commercially sensitive, not identifying |

Notes for the policy:
- The `message` field is free text. Policies should say the visitor controls what goes in it and
  should not submit sensitive categories (health, ID numbers, credentials) through it.
- Forms are editor-configurable in the CMS. **New fields can be added without a code change**, so
  the privacy policy should describe the form by category ("what you choose to submit") rather than
  enumerating four fields that may drift.
- Submissions persist indefinitely unless manually deleted — there is **no automatic retention or
  purge job**. `jobs.tasks` in [payload.config.ts](../../../apps/payload/src/payload.config.ts) is
  an empty array.

❓ **Decisions needed:** retention period for submissions (the current published copy says "as long
as they remain useful", which is vague); who else, if anyone, can read them; whether to add a
consent checkbox linking the privacy policy to the form.

### 3.2 CMS user accounts ✅

[Users collection](../../../apps/payload/src/collections/Users) — `auth: true`, fields `name` +
Payload's built-in `email` and hashed password. Access is `authenticated` for every operation, so
these are **staff/admin accounts only**; the public cannot register. Payload's auth sets a JWT
session cookie on the admin domain.

Relevant only to an internal/admin note; no public-facing account system exists.

### 3.3 Server logs ✅ (by inference from hosting)

Vercel hosting ([README.md](../../../README.md), `@payloadcms/db-vercel-postgres`,
`@payloadcms/storage-vercel-blob`) records standard request metadata — IP address, user agent,
requested path, timestamps. This is the usual "legitimate interest / security and availability"
paragraph. Retention follows Vercel's own schedule, not one this project controls.

### 3.4 What is **not** collected ✅

Worth stating affirmatively, because it is unusually clean and it is all verifiable:

- **No analytics of any kind.** No Google Analytics, GTM, Plausible, PostHog, Vercel Analytics or
  Speed Insights in either app's dependencies or source.
- **No advertising or cross-site tracking pixels.** None found.
- **No public user accounts, no newsletter, no comments.** No signup, subscribe, or comment code path.
- **No e-commerce / payments.** The README lists `apps/medusa-store` and
  `apps/medusa-store-storefront`, but **those directories do not exist** — `apps/` contains only
  `frontend`, `payload`, and `plotter`. The form-builder's `payment` field type is explicitly
  disabled (`fields: { payment: false }`). No processor is integrated and no payment data touches the site.
- **No search indexing of visitors.** `@payloadcms/plugin-search` is installed but commented out.

⚠️ The README is stale on the Medusa point. If e-commerce is ever reinstated, the privacy policy,
terms, and a refund policy all need to be revisited — that is the single biggest future trigger for
a rewrite.

---

## 4. Cookies and client-side storage — verified

| Name | Type | Set by | Purpose | Lifetime |
|---|---|---|---|---|
| `NEXT_LOCALE` | first-party cookie | [proxy.ts](../../../apps/frontend/src/proxy.ts) | Remembers EN/ES so the visitor is not re-negotiated on every request | 1 year (`maxAge: 60*60*24*365`), `path=/`, `sameSite=lax` |
| `theme` | **localStorage**, *not* a cookie | `next-themes` via [theme-provider.tsx](../../../apps/frontend/src/providers/theme-provider.tsx) | Light/dark preference | Until cleared by the visitor |
| `_GRECAPTCHA` and related | third-party cookie | Google reCAPTCHA v3 | Bot scoring | Google's schedule |
| Payload session JWT | first-party cookie | Payload auth, admin app only | Staff login | Payload default |

Both first-party mechanisms are **strictly functional** — no consent banner is legally required for
them under the ePrivacy "strictly necessary" carve-out, and none is implemented.

❗ **Correction needed in the existing copy:** the published cookie policy lists the theme preference
as a *cookie*. `next-themes` with `attribute="class"` stores it in **localStorage**. The document
should either say "cookies and similar local storage" or name the mechanism accurately.

❓ **Decision needed:** reCAPTCHA is the one third-party, non-essential-adjacent thing that sets
storage. Some EU readings require consent before loading it. Options: (a) leave as is and disclose,
(b) load reCAPTCHA only after the visitor focuses the form, (c) drop reCAPTCHA for a honeypot.
Currently reCAPTCHA is **off by default** per-form (`enableRecaptcha` defaults to `false`) and the
whole feature is disabled when keys are absent — so the honest disclosure is conditional.

---

## 5. Third-party processors / sub-processors — verified

| Processor | Role | What it sees | Evidence |
|---|---|---|---|
| **Vercel** (hosting, CDN, Postgres, Blob storage) | Hosting + data storage | All request metadata; all stored content including form submissions and uploaded media | [payload.config.ts](../../../apps/payload/src/payload.config.ts), README |
| **Neon / Vercel Postgres** | Database | Form submissions, CMS content, staff accounts | `POSTGRES_URL`, `vercelPostgresAdapter` |
| **Resend** | Transactional email delivery | Contents of emails sent from the site | `resendAdapter` in payload.config.ts |
| **Google reCAPTCHA v3** | Bot mitigation on forms (optional, per-form) | Visitor IP, browser signals, interaction data — sent to `google.com/recaptcha/api/siteverify` | [verify-recaptcha.ts](../../../apps/payload/src/utilities/verify-recaptcha.ts), [recaptcha.ts](../../../apps/frontend/src/lib/recaptcha.ts) |

**Explicitly not a processor:** Google Fonts. The fonts are loaded via `next/font/google`
([layout.tsx](../../../apps/frontend/src/app/(website)/[locale]/layout.tsx#L2)), which self-hosts
them at build time — **no runtime request from the visitor's browser to Google**. This matters:
runtime Google Fonts embedding has produced adverse GDPR rulings. The `@import` of
`fonts.googleapis.com` that does exist is confined to `src/app/exp/` mockup pages, which are
excluded from routing by the proxy matcher and are not part of the public site.

**Unsplash** placeholder images (`images.unsplash.com`) are allowed only in
`NODE_ENV === 'development'` ([next.config.ts](../../../apps/frontend/next.config.ts)) — not a
production third party, but a content-licensing note for §6.

❓ **Decisions needed:** whether to publish the processor table (transparent, but needs maintenance),
and whether to mention that these processors involve **international transfers** out of Costa
Rica/the EEA — an explicit GDPR disclosure requirement if GDPR is claimed.

---

## 6. Terms of service — the substantive questions

The site is a **portfolio/marketing site**, not a product, so the Terms govern *reading the site*,
not a service relationship. Client work is presumably governed by a separate written proposal
("You get a written proposal: scope, timeline, price" — [copy.md](../services-page/copy.md)).

✅ **Facts the Terms can rely on:**
- Content published: blog posts, project case studies, a "Lab" of experiments, an About narrative.
- No paid transactions occur on the site; no accounts; no user-generated content beyond form messages.
- The repo's root [package.json](../../../package.json) is `private`, and README states
  *"Private — All rights reserved."* But `apps/payload/package.json` declares `"license": "MIT"`.
  These contradict each other.

❓ **Decisions needed:**
1. **The license contradiction above must be resolved before the IP clause is written.** Which is
   true for the platform code, and separately, which is true for code *samples published in blog posts*?
2. Whether the Terms should disclaim that blog/project content is not professional advice
   (the current draft does — reasonable).
3. Limitation-of-liability posture and cap. A solo operator generally wants the maximum
   the jurisdiction allows.
4. Whether to add a section pointing client-work terms to the separate proposal/contract, so a
   client cannot argue the website Terms govern a €15k engagement.
5. Attribution/licensing for third-party assets used on the site (fonts — Archivo and IBM Plex Mono
   are open-licensed; the plotter project references
   `gitlab.com/oskay/svg-fonts`; Unsplash placeholders in dev).
6. Availability/uptime disclaimer — the site makes an availability claim ("Currently available for
   new projects") that is marketing, not a contractual commitment; worth an explicit line.

---

## 7. What already exists in the CMS

A `docs` collection is already built and seeded — the documents have a home and a route; only the
**copy** is missing.

- **Collection:** [Docs](../../../apps/payload/src/collections/Docs/index.ts) — slug `docs`,
  admin group "Legal". Fields: `title` (localized), `docType` (`privacy` | `terms` | `cookies` |
  `other`), `content` (localized richText, h2–h4 + horizontal rules, prose only — no blocks),
  `effectiveDate`, `version`, `slug`, SEO meta. Drafts + autosave + scheduled publish, 50 versions
  per doc. Public read is `authenticatedOrPublished`.
- **Routes:** `/[locale]/docs` index and `/[locale]/docs/[slug]`
  ([docs/](../../../apps/frontend/src/app/(website)/[locale]/docs/)), in the sitemap as
  `docs-sitemap.xml` ([next-sitemap.config.cjs](../../../apps/frontend/next-sitemap.config.cjs)).
- **Footer links:** Privacy Policy and Terms of Service are linked from the footer as *references*
  (not hardcoded URLs). Cookie Policy is deliberately not in the footer — the nav caps at 6 rows —
  and is reachable from `/docs` and from within the privacy policy.
- **Seeded slugs:** `privacy-policy`, `terms-of-service`, and a cookie policy, EN + ES, effective
  `2026-01-01`, version `1.0` ([docs-data.ts](../../../apps/payload/src/app/seed/docs-data.ts)).
- **reCAPTCHA notice:** when reCAPTCHA is active, the form renders "This site is protected by
  reCAPTCHA and the Google Privacy Policy and Terms of Service apply", linking
  `policies.google.com` ([en.ts](../../../apps/frontend/src/i18n/dictionaries/en.ts#L46-L50)).
  Google's terms *require* this notice, so it must not be removed while reCAPTCHA runs.

**Status of the seeded copy:** the seed file's own header says it is *"generic boilerplate … NOT
legal advice and has not been reviewed by a lawyer. Replace it with reviewed text before the site
handles real user data in production."* It is factually accurate about the stack, so it is a usable
skeleton — but it is a draft, and it contains at least one factual error (§4, theme storage).

---

## 8. Constraints the drafted documents must respect

1. **Bilingual, both authoritative-looking.** Every document needs EN and ES. `title`, `content`,
   and SEO meta are localized; `docType`, `effectiveDate`, `version`, and `slug` are **not** — so
   both languages share one slug and one effective date. Add a clause naming which language
   controls in case of conflict (usually Spanish, given CR jurisdiction — ❓ decision).
2. **Prose only.** The richText editor allows h2/h3/h4, inline formatting, links, lists, and
   horizontal rules. No custom blocks, no tables, no h1 (the page title owns it). Draft accordingly.
3. **Versioning is built in.** Use `version` and `effectiveDate` on every revision rather than
   silently editing — the collection keeps 50 versions and supports scheduled publish.
4. **Cross-references.** The privacy policy should link the cookie policy (it is not in the footer).
   Use internal references where the CMS allows, not hardcoded URLs.
5. **Describe capabilities, not current config, where config is editor-controlled.** reCAPTCHA is a
   per-form checkbox and form fields are editor-editable; a policy enumerating today's exact setup
   will go stale the first time someone ticks a box.

---

## 9. Open questions — consolidated checklist

Nothing below can be answered from the codebase.

**Identity & jurisdiction**
- [ ] Registered legal entity, or sole trader under personal name?
- [ ] Publishable postal address?
- [ ] Dedicated privacy/legal email, or the personal Gmail?
- [ ] Governing law and venue for the Terms.
- [ ] Claim GDPR applicability? If yes: lawful basis per purpose, and Art. 27 representative?
- [ ] Does the contact-form database trigger PRODHAB registration under Ley 8968?

**Data handling**
- [ ] Retention period for contact form submissions, and who enforces it (no purge job exists).
- [ ] Anyone besides the owner with access to submissions?
- [ ] Add a consent checkbox / privacy link to the contact form?
- [ ] Publish the processor table, or describe processors in prose?
- [ ] Disclose international transfers explicitly?

**Cookies**
- [ ] Keep reCAPTCHA as-is, defer its load until form interaction, or replace it with a honeypot?
- [ ] Fix the theme-storage error in the existing cookie policy (localStorage, not a cookie).

**Terms**
- [ ] Resolve the `MIT` vs. "All rights reserved" license contradiction — platform code *and*
      published code samples.
- [ ] Liability cap and posture.
- [ ] Explicit carve-out stating client engagements are governed by the separate proposal/contract.
- [ ] Third-party asset attributions to include.

**Process**
- [ ] Who reviews? (lawyer, or accept the risk for a portfolio site with one contact form)
- [ ] Which language controls on conflict?
- [ ] Effective date for v1.0 — the seed says 2026-01-01, which is already in the past.
