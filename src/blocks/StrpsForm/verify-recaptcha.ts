'use server'

export async function verifyRecaptchaToken(token: string) {
  'use server'
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    throw new Error('RECAPTCHA_SECRET_KEY is not defined')
  }
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    )
    const data = await response.json()
    return data.success
  } catch (err) {
    console.error(err)
    return false
  }
}
