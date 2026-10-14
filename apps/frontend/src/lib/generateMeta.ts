import type { Metadata } from 'next'

import type { Doc, Media, Page, Post, Config } from '@strps-website/types'
import type { Locale } from '@/i18n/config'
import { locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

import { mergeOpenGraph } from './mergeOpenGraph'
import { buildAlternates } from './seo'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL

  if (!serverUrl) {
    console.warn('NEXT_PUBLIC_PAYLOAD_URL is not defined')
    return undefined
  }

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Doc> | null
  /** Current locale, plus its locale-less path (`/`, `/about`, `/blog/my-post`, …) for hreflang/canonical. */
  locale: Locale
  path: string
}): Promise<Metadata> => {
  const { doc, locale, path } = args
  const dictionary = getDictionary(locale)

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ? doc?.meta?.title : dictionary.seo.defaultTitle

  return {
    description: doc?.meta?.description,
    alternates: buildAlternates(locale, path),
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
          {
            url: ogImage,
          },
        ]
        : undefined,
      title,
      url: `/${locale}${path === '/' ? '' : path}`,
      locale,
      alternateLocale: locales.filter((l) => l !== locale),
    }),
    title,
  }
}
