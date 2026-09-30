# Legal Compliance Tracker

Working log for the site's legal documents and the controls behind them. The evidence
behind every fact here is in [legal-docs-source-of-truth.md](legal-docs-source-of-truth.md)
(the 2026-09-11 audit); this file records **what was decided, what was built, and what is
still open**.

## Risk acceptance

**2026-09-30 — the owner accepted the risk of publishing without a lawyer's review.**
The site is a personal portfolio with one contact form, no analytics, no accounts, and no
sales. The goal is to cover the obligations that actually carry penalties (disclosure,
consent at collection, retention, data-subject rights) with accurate, plain documents, and
to skip everything that only applies to larger or commercial operations.

Re-open this decision if any **re-review trigger** (bottom of this file) fires.

---

## 1. Document inventory

| Document | Needed? | Why | Slug | Seed | Version |
|---|---|---|---|---|---|
| Privacy Policy | **Required** | CR Ley 8968 (informed consent), GDPR Art. 13 (EU visitors are targeted), CalOPPA (any site collecting PII from Californians must post one) | `privacy-policy` | [privacy-policy.ts](../../../apps/payload/src/app/seed/docs/privacy-policy.ts) | 2.0 |
| Cookie Policy | **Required** (disclosure) | ePrivacy-style rules require telling visitors what is stored, even when no consent is needed | `cookie-policy` | [cookie-policy.ts](../../../apps/payload/src/app/seed/docs/cookie-policy.ts) | 2.0 |
| Form privacy notice | **Required** | Information must be given *at the point of collection*, not just somewhere on the site | — | [PayloadForm.tsx](../../../apps/frontend/src/components/form/PayloadForm.tsx) + `form.privacyNotice*` dictionary keys | — |
| Terms of Service | Recommended | Not mandatory, but it is what limits liability, reserves IP, and keeps client work under separate contracts | `terms-of-service` | [terms-of-service.ts](../../../apps/payload/src/app/seed/docs/terms-of-service.ts) | 2.0 |
| Legal Notice (imprint / aviso legal) | Recommended | Not required for a CR-based operator; cheap, and it names the identifiable controller Ley 8968/GDPR expect | `legal-notice` | [legal-notice.ts](../../../apps/payload/src/app/seed/docs/legal-notice.ts) | 1.0 |

All five are EN + ES, effective **2026-10-01**. The Privacy Policy and Terms are in the
footer; the Cookie Policy and Legal Notice are linked from the other documents and `/docs`.

### Deliberately not created

| Document / control | Why it is not needed here |
|---|---|
| Cookie consent banner | Only strictly necessary storage (`NEXT_LOCALE` cookie, `theme` localStorage). reCAPTCHA is off by default and disclosed when on. **Becomes required the day analytics or any non-essential cookie is added.** |
| Refund / returns policy, consumer contract terms | Nothing is sold on the site (CR Ley 7472 e-commerce duties do not apply). |
| Accessibility statement | EU requirement covers public bodies and (EAA) e-commerce; microenterprises are exempt. |
| DMCA / copyright agent | No user-generated content is published. |
| GDPR Art. 27 EU representative | Art. 27(2)(a) exemption: occasional, small-scale processing, no special categories. |
| PRODHAB database registration (Ley 8968 art. 21) | Applies to databases used for distribution, dissemination, or commercialization. A contact inbox used only to reply is internal use. |
| Records of processing (GDPR Art. 30) | Under-250-employee exemption; this tracker plus §5 of the audit serve the purpose anyway. |
| Data processing agreements | Vercel, Resend, and Google incorporate their DPAs into their standard terms; nothing to sign. |

---

## 2. Controls implemented

### Form-submission retention — 12 months, automatic

- Constant: `FORM_SUBMISSION_RETENTION_MONTHS` in
  [purgeFormSubmissions.ts](../../../apps/payload/src/jobs/purgeFormSubmissions.ts). The
  privacy policy seed imports the same constant, so the code and the published promise
  cannot drift silently. If you change it, bump the privacy policy `version` and reseed.
- Task `purgeFormSubmissions` deletes `form-submissions` rows whose `createdAt` is past
  the cutoff. Retries twice on failure.
- Schedule: Vercel Cron (`0 0 * * *`, [vercel.json](../../../apps/payload/vercel.json)) calls
  `GET /api/cron/daily` ([dailyCronEndpoint.ts](../../../apps/payload/src/jobs/dailyCronEndpoint.ts)),
  which queues the purge (unless one is already pending) and runs the job queue.
  Payload 3.33 has no serverless-friendly task schedule, so the endpoint does the queueing.
  The same run still processes scheduled publishes, as the old `/api/payload-jobs/run` target did.
- Auth: logged-in user, or `Authorization: Bearer $CRON_SECRET` (Vercel sends this
  automatically when `CRON_SECRET` is set). An unset secret now rejects instead of matching
  `Bearer undefined`.
- Manual run: queue a `purgeFormSubmissions` job from the admin's Jobs collection, or call
  `/api/cron/daily` while logged in.

### Seed keeps legal copy current

The seed ([route.ts](../../../apps/payload/src/app/seed/route.ts)) creates missing legal docs
and **rewrites existing ones whose stored `version` differs** from the seed. So revising
copy is: edit the seed file → bump `version` (and `EFFECTIVE_DATE` in
[shared.ts](../../../apps/payload/src/app/seed/docs/shared.ts) if it changes) → run the seed.
Payload keeps the previous text in the doc's version history.

---

## 3. Decisions taken

Defaults chosen so the documents could ship. Each can be changed by editing
[shared.ts](../../../apps/payload/src/app/seed/docs/shared.ts) or the document file and
bumping its version.

| Question (audit §9) | Decision |
|---|---|
| Legal identity | Sole trader under personal name, César Jerez, San José, Costa Rica. No postal address published. |
| Contact address for privacy | `csrstrps@gmail.com` (the address already public on the services page). Single constant: `CONTACT_EMAIL`. |
| GDPR stance | Not claimed affirmatively, but the policy grants the GDPR rights anyway (access, rectification, erasure, objection, withdrawal, portability) and discloses lawful bases and transfers. |
| Governing law / venue | Costa Rica; courts of San José; visitors' mandatory home-country protections preserved. |
| Controlling language | Spanish prevails on conflict (the governing law is Costa Rican). |
| Retention | 12 months, automatic; longer only when the enquiry becomes a project (tax/accounting records). |
| Rights response time | Five business days (Ley 8968), which also satisfies GDPR's one month. |
| Consent mechanism | Notice with a policy link under every form, no checkbox. Consent is given by sending. |
| reCAPTCHA | Keep as-is (off by default, per-form, disclosed with the notice Google requires). |
| Processors | Named in prose (Vercel, Resend, Google reCAPTCHA) with country, not a table. |
| Code licensing in Terms | Site content and code: all rights reserved. Short snippets inside articles: free to reuse. Open-source repos: their own licence. |
| Theme storage error | Fixed: the cookie policy now says `theme` is localStorage, not a cookie. |

---

## 4. Open items

### Before deploying

- [ ] **Generate a migration** for the new job task. Adding `purgeFormSubmissions` adds a value
      to the `enum_payload_jobs_task_slug` / `enum_payload_jobs_log_task_slug` Postgres enums;
      without it, prod's `payload migrate` leaves the enum unchanged and the cron fails to queue.
      `cd apps/payload && pnpm payload migrate:create add_purge_form_submissions_task`
- [ ] **Regenerate types** (`pnpm generate:types`) so `TaskConfig<'purgeFormSubmissions'>` and
      `payload.jobs.queue({ task: ... })` type-check.
- [ ] Confirm `CRON_SECRET` is set in the Vercel project for the payload app.
- [ ] Run the seed against production (or edit the docs by hand) so v2.0 replaces the v1.0 copy.
- [ ] After the first cron fire, check the Jobs collection for a completed `purgeFormSubmissions`.

### Owner follow-ups (non-blocking)

- [ ] Resolve the licence contradiction: `apps/payload/package.json` + `apps/payload/LICENSE.md`
      say MIT; the root README says all rights reserved. The Terms assume all rights reserved.
- [ ] When registered with Hacienda, add the cédula / tax ID to the Legal Notice and bump it to 1.1.
- [ ] Consider a dedicated address (e.g. `privacy@strps.dev`) and change `CONTACT_EMAIL`.
- [ ] If a form is ever configured to send notification emails via Resend, nothing changes
      (already disclosed). But those emails sit in the inbox outside the 12-month purge, so
      delete them on the same schedule by hand.
- [ ] Review once a year, even with no triggers. Next review: **2027-10-01**.

---

## 5. Re-review triggers

Any of these makes the current documents inaccurate and needs a policy update **before** the
change ships:

- Adding analytics, session replay, ads, or any non-essential cookie. This also requires a consent banner.
- Adding e-commerce or payments (Medusa or otherwise). This also requires refund terms and consumer-law review.
- Adding accounts, a newsletter, comments, or any new form collecting different data.
- Adding a new processor (email, storage, AI, monitoring such as Sentry).
- Changing `FORM_SUBMISSION_RETENTION_MONTHS`.
- Moving the business into a registered company (the controller changes).

---

## 6. Change log

| Date | Change |
|---|---|
| 2026-09-11 | Source-of-truth audit written. |
| 2026-09-30 | Risk accepted. Rewrote Privacy/Terms/Cookie Policy (v2.0) and added a Legal Notice (v1.0), one seed file each under `seed/docs/`. Seed now updates docs on version change. Added a 12-month form-submission purge job on the daily cron, and a privacy notice under every form. |
