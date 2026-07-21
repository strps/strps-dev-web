/**
 * reCAPTCHA v3 is optional. It is only active when a form has `enableRecaptcha`
 * ticked in Payload AND the keys are actually present — see `isRecaptchaConfigured`.
 *
 * Must stay a full static expression: Next.js only inlines NEXT_PUBLIC_* vars when
 * referenced as `process.env.NEXT_PUBLIC_X`, not via destructuring or dynamic lookup.
 */
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

export const isRecaptchaConfigured = RECAPTCHA_SITE_KEY.length > 0

/**
 * Action name sent with every token and verified server-side.
 * Keep in sync with RECAPTCHA_ACTION in apps/payload/src/utilities/verify-recaptcha.ts
 * (the two apps cannot share a module).
 */
export const RECAPTCHA_ACTION = 'form_submission'
