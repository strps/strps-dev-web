import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from '@/lib/revalidate'

import type { Doc } from '@strps-website/types'

const revalidate = (path: string) => {
  revalidatePath(path)
  revalidateTag('docs-sitemap')
  revalidatePath('/docs')
}

export const revalidateDoc: CollectionAfterChangeHook<Doc> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/docs/${doc.slug}`

      payload.logger.info(`Revalidating doc at path: ${path}`)

      revalidate(path)
    }

    // If the doc was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/docs/${previousDoc.slug}`

      payload.logger.info(`Revalidating old doc at path: ${oldPath}`)

      revalidate(oldPath)
    }
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Doc> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidate(`/docs/${doc?.slug}`)
  }

  return doc
}
