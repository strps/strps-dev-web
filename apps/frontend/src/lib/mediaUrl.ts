import type { Media } from '@strps-website/types'

/**
 * Absolute URL for an uploaded media doc, or `undefined` when the relation is
 * unpopulated (a bare id), missing, or has no file yet.
 *
 * Payload stores `url` root-relative (`/api/media/file/x.png`), so it needs the
 * Payload origin prefixed before `next/image` can fetch it. Already-absolute
 * URLs (an S3/CDN adapter) are passed through untouched.
 */
export function mediaUrl(resource: Media | number | null | undefined): string | undefined {
  if (!resource || typeof resource !== 'object' || !resource.url) return undefined
  const { url } = resource
  if (/^https?:\/\//.test(url)) return url
  return `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${url.startsWith('/') ? '' : '/'}${url}`
}
