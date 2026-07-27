import type React from 'react'
import type { Page, Post } from '@strps-website/types'

import { getCachedDocument } from '@/lib/getDocument'
import { getCachedRedirects } from '@/lib/getRedirects'
import { notFound, redirect } from 'next/navigation'
import { localizedHref, type Locale } from '@/i18n/config'

interface Props {
  disableNotFound?: boolean
  url: string
  locale: Locale
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url, locale }) => {
  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(localizedHref(locale, redirectItem.to.url))
    }

    let redirectUrl: string

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = redirectItem.to?.reference?.relationTo
      const id = redirectItem.to?.reference?.value

      const document = (await getCachedDocument(collection, id)()) as Page | Post
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${document?.slug
        }`
    } else {
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${typeof redirectItem.to?.reference?.value === 'object'
        ? redirectItem.to?.reference?.value?.slug
        : ''
        }`
    }

    if (redirectUrl) redirect(localizedHref(locale, redirectUrl))
  }

  if (disableNotFound) return null

  notFound()
}
