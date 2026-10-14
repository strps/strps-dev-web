import type { Endpoint } from 'payload'

import { canRunJobs } from '@/access/canRunJobs'
import { PURGE_FORM_SUBMISSIONS_TASK } from './purgeFormSubmissions'

/**
 * `GET /api/cron/daily` — the Vercel Cron target (see `vercel.json`).
 *
 * Payload 3.33 has no serverless-friendly task schedule (`jobs.autoRun` needs a
 * long-lived process), and `/api/payload-jobs/run` only runs jobs that are already
 * queued. So this endpoint queues the daily housekeeping tasks, then runs the queue —
 * which also picks up anything else waiting, e.g. scheduled publishes.
 */
export const dailyCronEndpoint: Endpoint = {
  path: '/cron/daily',
  method: 'get',
  handler: async (req) => {
    if (!canRunJobs({ req })) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { payload } = req

    // Skip queueing if a previous day's purge is still pending (e.g. mid-retry), so
    // a stuck task does not pile up one duplicate per day.
    const pending = await payload.count({
      collection: 'payload-jobs',
      where: {
        and: [
          { taskSlug: { equals: PURGE_FORM_SUBMISSIONS_TASK } },
          { completedAt: { exists: false } },
          { hasError: { not_equals: true } },
        ],
      },
    })

    if (pending.totalDocs === 0) {
      await payload.jobs.queue({ task: PURGE_FORM_SUBMISSIONS_TASK, input: {} })
    }

    const result = await payload.jobs.run({ limit: 20 })

    return Response.json(result)
  },
}
