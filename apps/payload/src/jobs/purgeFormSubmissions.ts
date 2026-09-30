import type { TaskConfig } from 'payload'

/**
 * How long contact-form submissions are kept before automatic deletion.
 *
 * The privacy policy seed quotes this constant, so changing it here changes the
 * published promise too — reseed (bump the privacy policy `version`) when you do.
 * See `docs/dev/legal/compliance-tracker.md`.
 */
export const FORM_SUBMISSION_RETENTION_MONTHS = 12

export const PURGE_FORM_SUBMISSIONS_TASK = 'purgeFormSubmissions'

/**
 * Deletes every `form-submissions` row older than the retention period.
 *
 * Queued once a day by the `/api/cron/daily` endpoint (see `vercel.json`), which then
 * runs the queue in the same request. Also queueable by hand from the admin's Jobs
 * collection if a purge is needed sooner.
 */
export const purgeFormSubmissions: TaskConfig<'purgeFormSubmissions'> = {
  slug: PURGE_FORM_SUBMISSIONS_TASK,
  label: 'Purge expired form submissions',
  retries: 2,
  outputSchema: [
    { name: 'deleted', type: 'number', required: true },
    { name: 'cutoff', type: 'text', required: true },
  ],
  handler: async ({ req }) => {
    const cutoff = new Date()
    cutoff.setMonth(cutoff.getMonth() - FORM_SUBMISSION_RETENTION_MONTHS)

    const result = await req.payload.delete({
      collection: 'form-submissions',
      where: { createdAt: { less_than: cutoff.toISOString() } },
      depth: 0,
      req,
    })

    if (result.errors.length > 0) {
      // Fail the task so the retry kicks in; partial deletes are fine to repeat.
      throw new Error(
        `Failed to delete ${result.errors.length} form submission(s): ` +
          result.errors.map((e) => `${e.id}: ${e.message}`).join('; '),
      )
    }

    req.payload.logger.info(
      `— Purged ${result.docs.length} form submission(s) older than ${cutoff.toISOString()}.`,
    )

    return { output: { deleted: result.docs.length, cutoff: cutoff.toISOString() } }
  },
}
