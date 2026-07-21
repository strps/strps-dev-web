/**
 * Action name minted by the frontend with every token.
 * Keep in sync with RECAPTCHA_ACTION in apps/frontend/src/lib/recaptcha.ts
 * (the two apps cannot share a module).
 */
export const RECAPTCHA_ACTION = 'form_submission'

/** Google's documented default for reCAPTCHA v3. */
const DEFAULT_MIN_SCORE = 0.5

export type RecaptchaResult =
  | { ok: true; score: number }
  | {
      ok: false
      reason: 'network' | 'rejected' | 'low-score' | 'action-mismatch'
      score?: number
      action?: string
      errorCodes?: string[]
    }

export const isRecaptchaConfigured = (): boolean => Boolean(process.env.RECAPTCHA_SECRET_KEY)

const getMinScore = (): number => {
  const parsed = Number(process.env.RECAPTCHA_MIN_SCORE)
  return Number.isFinite(parsed) ? parsed : DEFAULT_MIN_SCORE
}

/**
 * Verifies a reCAPTCHA v3 token. Callers must check `isRecaptchaConfigured()` first —
 * a missing secret is a deployment mistake, handled by the caller (fail open with a
 * warning), not a verification failure.
 */
export async function verifyRecaptchaToken(token: string): Promise<RecaptchaResult> {
  try {
    // POST with a form-encoded body is Google's documented call; it also keeps the
    // secret out of URLs and request logs.
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY as string,
        response: token,
      }),
    })

    const data = await response.json()

    if (!data.success) {
      return { ok: false, reason: 'rejected', errorCodes: data['error-codes'] }
    }

    // Guards against a token minted on another page being replayed against the form.
    if (data.action !== RECAPTCHA_ACTION) {
      return { ok: false, reason: 'action-mismatch', action: data.action, score: data.score }
    }

    const score = typeof data.score === 'number' ? data.score : 0
    if (score < getMinScore()) {
      return { ok: false, reason: 'low-score', score }
    }

    return { ok: true, score }
  } catch (err) {
    console.error('reCAPTCHA verification request failed', err)
    return { ok: false, reason: 'network' }
  }
}
