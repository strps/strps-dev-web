import type { PayloadRequest } from 'payload'

/**
 * Who may trigger job runs: any logged-in user, or Vercel Cron presenting
 * `CRON_SECRET` as a bearer token. Shared by `jobs.access.run` and `/api/cron/daily`.
 */
export const canRunJobs = ({ req }: { req: PayloadRequest }): boolean => {
  if (req.user) return true

  const authHeader = req.headers.get('authorization')
  return Boolean(process.env.CRON_SECRET) && authHeader === `Bearer ${process.env.CRON_SECRET}`
}
