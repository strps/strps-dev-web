import { APIError, type CollectionBeforeOperationHook } from 'payload'

import { isRecaptchaConfigured, verifyRecaptchaToken } from '@/utilities/verify-recaptcha'

const DEFAULT_MIN_FILL_MS = 3000
const DEFAULT_RATE_LIMIT_MAX = 20
const DEFAULT_RATE_LIMIT_WINDOW_MIN = 10

/** Request-only keys the frontend sends next to `form` and `submissionData`. Never stored. */
const GUARD_KEYS = ['hp', 'elapsedMs', 'recaptchaToken'] as const

/**
 * Public message per status. The frontend maps the status to its own localized text, so
 * these only matter to direct API callers — and stay vague so they don't help a bot tune.
 */
const PUBLIC_MESSAGES: Record<400 | 403 | 429, string> = {
  400: 'Invalid submission',
  403: 'Verification failed',
  429: 'Too many submissions',
}

const readPositiveNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value)
  return value && Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

/** Form ids are Postgres serials; accept the number or its string form, nothing else. */
const parseFormID = (value: unknown): number | null => {
  const parsed = typeof value === 'string' && value.trim() !== '' ? Number(value) : value
  return typeof parsed === 'number' && Number.isInteger(parsed) && parsed > 0 ? parsed : null
}

/**
 * Every spam check for `form-submissions`, in one ordered pass. Cheapest first, so a bot
 * caught by the honeypot or time trap never costs a DB count or a call to Google:
 * honeypot → time trap → rate limit → reCAPTCHA.
 *
 * Rejections are deliberately generic. Detail stays in the server log: telling a bot
 * which check caught it only helps it tune.
 */
export const guardFormSubmission: CollectionBeforeOperationHook = async ({
  args,
  operation,
  req,
}) => {
  if (operation !== 'create') return args

  // An editor creating a submission from the admin panel is not a visitor.
  if (req.user) return args

  const payload = req.payload
  // `args.data` is what the operation will actually create; `req.data` is only a fallback
  // for callers that bypass it.
  const body = (args.data ?? req.data) as Record<string, unknown> | undefined
  const formID = parseFormID(body?.form)

  // A declaration, not an arrow: TypeScript only narrows after a `never` call when the
  // callee is explicitly typed.
  function reject(
    reason: string,
    status: keyof typeof PUBLIC_MESSAGES = 400,
    detail?: Record<string, unknown>,
  ): never {
    payload.logger.warn(
      { formID: formID ?? body?.form, reason, ...detail },
      'Form submission rejected',
    )
    throw new APIError(PUBLIC_MESSAGES[status], status, null, true)
  }

  // Checked first: the rate-limit count and form lookup below both need a valid id.
  if (formID === null) {
    reject('invalid-form-id')
  }

  // Honeypot: a field real visitors never see, so any value means a bot filled it.
  if (typeof body?.hp === 'string' && body.hp !== '') {
    reject('honeypot')
  }

  // Time trap: humans take seconds to fill a form; scripts post instantly.
  const minFillMs = readPositiveNumber(process.env.FORM_MIN_FILL_MS, DEFAULT_MIN_FILL_MS)
  const elapsedMs = body?.elapsedMs
  if (typeof elapsedMs !== 'number' || !Number.isFinite(elapsedMs) || elapsedMs < minFillMs) {
    reject('time-trap')
  }

  // Rate limit: a global cap per form, counted from stored submissions. Serverless-safe
  // and stores no IPs — see decision 2.1 in docs/dev/form-spam-protection/plan.md.
  const rateLimitMax = readPositiveNumber(process.env.FORM_RATE_LIMIT_MAX, DEFAULT_RATE_LIMIT_MAX)
  const windowMin = readPositiveNumber(
    process.env.FORM_RATE_LIMIT_WINDOW_MIN,
    DEFAULT_RATE_LIMIT_WINDOW_MIN,
  )
  const { totalDocs: recentSubmissions } = await payload.count({
    collection: 'form-submissions',
    where: {
      form: { equals: formID },
      createdAt: { greater_than: new Date(Date.now() - windowMin * 60_000).toISOString() },
    },
    req,
  })
  if (recentSubmissions >= rateLimitMax) {
    reject('rate-limit', 429)
  }

  const form = await payload.findByID({
    collection: 'forms',
    id: formID,
    select: {
      enableRecaptcha: true,
    },
    disableErrors: true,
    req,
  })
  if (!form) {
    reject('form-not-found')
  }

  if (form.enableRecaptcha) {
    // Fail open when the key is absent: that is a deployment mistake, and
    // breaking every form over it punishes visitors for it. The form's virtual
    // `recaptchaActive` is false in this case, so the frontend sends no token
    // and shows no notice — nothing claims protection that isn't running.
    if (!isRecaptchaConfigured()) {
      payload.logger.warn(
        `Form ${formID} has reCAPTCHA enabled but RECAPTCHA_SECRET_KEY is not set — ` +
          `accepting the submission WITHOUT verification. Set the key or untick "Enable Recaptcha".`,
      )
    } else {
      const recaptchaToken = body?.recaptchaToken
      if (typeof recaptchaToken !== 'string' || recaptchaToken === '') {
        reject('recaptcha-missing', 403)
      }

      const result = await verifyRecaptchaToken(recaptchaToken)
      if (!result.ok) {
        const { reason, ...detail } = result
        reject(`recaptcha-${reason}`, 403, detail)
      }

      payload.logger.debug({ formID, score: result.score }, 'reCAPTCHA verification passed')
    }
  }

  // The collection has no fields for these, so the adapter would drop them anyway;
  // stripping them here makes "never stored" explicit rather than incidental.
  const data = { ...args.data }
  for (const key of GUARD_KEYS) delete data[key]

  return { ...args, data }
}
