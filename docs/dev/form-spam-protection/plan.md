# Form Spam Protection — Implementation Plan

> **Status:** Work plan — not started · **Owner:** César · **Created:** 2026-09-30
>
> **Goal:** close the gaps found in the reCAPTCHA audit (2026-09-30). Every Payload form
> gets baseline bot protection that needs no third party, reCAPTCHA stays available per
> form, and its configuration fails loudly instead of silently.
>
> **Out of scope:** switching to Cloudflare Turnstile. The work below keeps the captcha
> logic in one place, so a swap later stays small (see §7).

> **Working convention:** Defer **all** builds, type-checks (`generate:types`, `tsc`), lint
> runs and dev-server checks to the **end** of the work. Only *recommend* a checkpoint where
> one is marked below.

---

## 1. Where we are today

reCAPTCHA v3 is built and opt-in per form. It is on in production, but off locally: no keys
in either local `.env`, and the seeded Services form has `enableRecaptcha: false`. Wherever it
is off, nothing else protects `POST /api/form-submissions`.

| Layer | File |
| --- | --- |
| Site key + action name | [recaptcha.ts](../../../apps/frontend/src/lib/recaptcha.ts) |
| Token minting, submit, notice | [PayloadForm.tsx](../../../apps/frontend/src/components/form/PayloadForm.tsx) |
| Form query | [page-blocks.ts](../../../apps/frontend/src/lib/queries/page-blocks.ts) — `FormDetailFields` fragment |
| `enableRecaptcha` field + `beforeOperation` hook | [plugins/index.ts](../../../apps/payload/src/plugins/index.ts) |
| Token verifier | [verify-recaptcha.ts](../../../apps/payload/src/utilities/verify-recaptcha.ts) |
| Env docs | [deployment.md](../../deployment.md), [apps/payload/README.md](../../../apps/payload/README.md), both `.env.example` files |

### Audit findings this plan closes

| # | Severity | Finding | Phase |
| --- | --- | --- | --- |
| 1 | High | No honeypot, time trap or rate limit when reCAPTCHA is off | 1 |
| 2 | High | Site key set, secret missing → notice claims protection, server accepts everything | 3 |
| 3 | Medium | Secret set, site key missing → every submission rejected; docs say forms still work | 3 |
| 4 | Medium | Failures throw a plain `Error` (500, message likely hidden); server text shown verbatim, unlocalized | 2 |
| 5 | Medium | Hook reads `req.data` instead of `args.data` | 2 |
| 6 | Low | Verify response `hostname` not checked | 2 |
| 7 | Low | Google script loads on render, not on interaction | 4 |
| 8 | Low | Floating reCAPTCHA badge not hidden | 4 |
| 9 | Low | Stale docs (README says "all forms" verified; env var in wrong app) | 5 |

---

## 2. Decisions

### 2.1 Rate limiting — **per-form global cap in Payload, no IP storage**
| Option | Pros | Cons |
| --- | --- | --- |
| **Global cap per form** (count recent `form-submissions` for that form) | Works on serverless, no new infra, stores no IPs, nothing to add to the privacy policy | A flood blocks real visitors until the window passes |
| Per-IP cap in memory | Precise | Useless on Vercel: each instance has its own memory |
| Per-IP cap in the DB | Precise, serverless-safe | Stores IPs (or hashes) → privacy policy + retention changes |
| Vercel Firewall rate-limit rule | Zero code, stops traffic before Payload | Lives outside the repo; plan-dependent |

**Decision (confirmed 2026-09-30):** global cap per form, **20 submissions per 10 minutes**
for every form, configurable by env. For a portfolio contact form that ceiling is never hit by real traffic. A Vercel
Firewall rule can be layered on later without code changes.

### 2.2 Honeypot and time-trap rejections — **generic 400, no detail**
Bots get the same generic error as any bad request. No "fake success" path: it would need
the hook to short-circuit the create, which `beforeOperation` cannot do cleanly.

### 2.3 Server ↔ frontend reCAPTCHA status — **Payload decides, frontend follows**
Payload exposes a read-only virtual field `recaptchaActive` on forms
(`enableRecaptcha && RECAPTCHA_SECRET_KEY is set`). The frontend uses it instead of its own
key check. That one source of truth fixes findings #2 and #3.

---

## 3. Phase 1 — Baseline protection (no third party)

**Payload**
- [ ] New [`apps/payload/src/hooks/guardFormSubmission.ts`](../../../apps/payload/src/hooks/guardFormSubmission.ts):
      move the whole `beforeOperation` body out of `plugins/index.ts` into this hook, so all
      checks live in one ordered function. `plugins/index.ts` just references it.
- [ ] Order of checks on `create`: honeypot → time trap → rate limit → reCAPTCHA (cheapest first;
      reCAPTCHA last so bots never cost a Google call).
- [ ] **Honeypot:** reject when top-level `hp` is a non-empty string.
- [ ] **Time trap:** reject when top-level `elapsedMs` is missing, not a number, or below
      `FORM_MIN_FILL_MS` (default `3000`).
- [ ] **Rate limit:** `payload.count({ collection: 'form-submissions', where: { form: { equals: formID }, createdAt: { greater_than: <now − window> } } })`;
      reject with status 429 when ≥ `FORM_RATE_LIMIT_MAX` (default `20`) within
      `FORM_RATE_LIMIT_WINDOW_MIN` (default `10`).
- [ ] Log each rejection at `warn` with `formID` and reason only, matching the current
      reCAPTCHA logging.
- [ ] Make sure `hp` and `elapsedMs` never land in the stored document (they are top-level,
      not in `submissionData`; confirm the plugin drops unknown keys, else strip them from
      `args.data`).

**Frontend — [PayloadForm.tsx](../../../apps/frontend/src/components/form/PayloadForm.tsx)**
- [ ] Honeypot input rendered **outside** react-hook-form (plain `<input>` with a ref), so it
      never enters `submissionData`: `name="website"`, `tabIndex={-1}`, `autoComplete="off"`,
      `aria-hidden="true"`, visually hidden with an off-screen class (not `display:none`,
      which some bots skip).
- [ ] Record the mount time in a ref; send `elapsedMs = Date.now() − mountedAt` with the body.
- [ ] Add `hp` and `elapsedMs` to the `fetch` body next to `recaptchaToken`.

**Env**
- [ ] Add `FORM_MIN_FILL_MS`, `FORM_RATE_LIMIT_MAX`, `FORM_RATE_LIMIT_WINDOW_MIN` to
      `apps/payload/.env.example` and `docs/deployment.md`, all optional with the defaults above.

**Exit:** a form with reCAPTCHA off rejects a filled honeypot, a sub-3 s submit and the 21st
submit in 10 minutes; a normal human submit still succeeds.

---

## 4. Phase 2 — Hook correctness

- [ ] Read `form`, `recaptchaToken`, `hp`, `elapsedMs` from `args.data`, falling back to
      `req.data` (finding #5).
- [ ] Guard a missing or invalid `form` id with a 400 instead of letting `findByID` throw.
- [ ] Replace every `throw new Error(...)` with Payload's `APIError`, marked public:
    - captcha missing/failed → `403`
    - honeypot / time trap / bad input → `400`
    - rate limit → `429`
- [ ] Hostname check in [verify-recaptcha.ts](../../../apps/payload/src/utilities/verify-recaptcha.ts):
      new failure reason `'hostname-mismatch'` when `data.hostname` ≠ hostname of
      `FRONTEND_URL` (finding #6). Skip the check when `FRONTEND_URL` is unset, with a warning.
- [ ] Frontend: stop showing `res.errors[0].message`. Map by status to the dictionary instead
      (finding #4):

      | Status | Message key |
      | --- | --- |
      | 403 | `form.recaptchaFailed` |
      | 429 | `form.tooManyRequests` (new, EN + ES) |
      | other ≥ 400 | `form.internalServerError` |

- [ ] Add `tooManyRequests` to [en.ts](../../../apps/frontend/src/i18n/dictionaries/en.ts)
      and [es.ts](../../../apps/frontend/src/i18n/dictionaries/es.ts).

---

## 5. Phase 3 — Honest reCAPTCHA configuration

- [ ] Add a virtual field on forms in `formOverrides.fields`, next to `enableRecaptcha`:
      `name: 'recaptchaActive'`, `type: 'checkbox'`, `virtual: true`,
      `admin: { hidden: true }`, `hooks.afterRead: [({ siblingData }) => Boolean(siblingData.enableRecaptcha) && isRecaptchaConfigured()]`.
      Virtual → no column, no migration.
- [ ] Add `recaptchaActive` to the `FormDetailFields` fragment in
      [page-blocks.ts](../../../apps/frontend/src/lib/queries/page-blocks.ts).
- [ ] In `PayloadForm.tsx`, replace
      `Boolean(enableRecaptcha) && isRecaptchaConfigured` with the server's `recaptchaActive`:
    - `recaptchaActive` and site key set → current behaviour (token + notice).
    - `recaptchaActive` but site key **missing** → the server will reject every submit, so
      render the form disabled with `form.recaptchaFailed`, and `console.error` naming the
      missing `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`. Broken is shown, not hidden (finding #3).
    - `recaptchaActive` false → no provider, no notice, no token, even if the site key is
      set (finding #2).
- [ ] Remove the now-wrong comment in the hook ("The frontend hides the reCAPTCHA notice in
      this case") or rewrite it to describe the new flag.

> **Checkpoint (recommended):** regenerate types (`generate:types`) after this phase — the
> `Form` type gains `recaptchaActive`. Watch for the known dev schema-push error on cold boot;
> a virtual field should not need a column, but confirm nothing was silently skipped.

**Exit:** each row of the key matrix behaves as intended:

| Site key | Secret | Box ticked | Result |
| --- | --- | --- | --- |
| Set | Set | Yes | Token sent, verified, notice shown |
| Set | Missing | Yes | No notice, no token; baseline protection only; server logs a warning |
| Missing | Set | Yes | Form disabled with an error; console error names the key |
| Any | Any | No | Baseline protection only, no notice |

---

## 6. Phase 4 — reCAPTCHA polish

- [ ] Lazy-load the Google script (finding #7): mount `GoogleReCaptchaProvider` only after the
      first `focusin` inside the form. Submit waits for `executeRecaptcha` to be ready; the
      existing "no `executeRecaptcha` → error" path still covers a blocked script.
- [ ] Hide the floating badge (finding #8) in the website `globals.css`:
      `.grecaptcha-badge { visibility: hidden; }`. The text notice under the form already
      meets Google's disclosure requirement.

---

## 7. Phase 5 — Docs

- [ ] [deployment.md](../../deployment.md): fix the "if either is missing, forms still work"
      text using the matrix in §5; add the Phase 1 env vars.
- [ ] Both `.env.example` files: same fix to the reCAPTCHA comments.
- [ ] [apps/payload/README.md](../../../apps/payload/README.md): drop "all forms", move
      `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` to the frontend section, describe the baseline checks.
- [ ] [COMPONENTS.md](../../COMPONENTS.md): tick "Form submission handling" and "Error states".
- [ ] [compliance-tracker.md](../legal/compliance-tracker.md): note the honeypot/time trap and
      that no IPs are stored for rate limiting. No privacy-policy change needed.

**Turnstile later:** if spam gets through with reCAPTCHA on, the swap touches only
`verify-recaptcha.ts` (new verify URL + response shape), the provider in `PayloadForm.tsx`,
the env var names and the processor line in the privacy policy. Nothing in Phases 1–3 changes.

---

## 8. Final verification (end of work)

- [ ] `generate:types`, `tsc` and lint in both apps.
- [ ] Manual, reCAPTCHA off: normal submit OK; honeypot filled → 400; submit under 3 s → 400;
      burst past the cap → 429 with the localized message in EN and ES.
- [ ] Manual, reCAPTCHA on with test keys: normal submit OK, score logged at `debug`; script
      only loads after focusing the form; no floating badge.
- [ ] Manual, each misconfigured row of the §5 matrix behaves as listed.
- [ ] Stored submissions contain no `hp`, `elapsedMs` or `recaptchaToken`.

## 9. Resolved questions

- **Production reCAPTCHA:** it is on and working in production. Not a concern for this work;
  production env and form settings get reviewed at deploy time.
- **Rate-limit cap:** 20 per 10 minutes is fine for every form. It stays a single env-configured
  default, no per-form admin field.
