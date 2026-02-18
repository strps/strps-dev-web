import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from '@/lib/revalidate'

export const revalidateCopyright: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating copyright`)

    revalidateTag('global_copyright')
  }

  return doc
}
