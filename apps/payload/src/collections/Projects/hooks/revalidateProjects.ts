import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from '@/lib/revalidate'

import type { Post } from '@strps-website/types'

export const revalidateProject: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/projects/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidate(path)

    }

    // If the project was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/projects/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidate(oldPath)

    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/projects/${doc?.slug}`

    revalidate(path)

  }

  return doc
}

function revalidate(path: string) {
  revalidatePath(path)
  revalidateTag('projects-sitemap')
  revalidatePath('/projects')
  revalidatePath('/home')
}