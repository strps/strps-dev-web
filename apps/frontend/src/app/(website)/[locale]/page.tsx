import { cache } from 'react'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Page } from '@strps-website/types'
import { getClient } from '@/lib/apollo-client'
import { GET_PAGE_BY_SLUG } from '@/lib/queries/page-blocks'
import { generateMeta } from '@/lib/generateMeta'
import { RenderBlocks } from '@/components/RenderBlocks'
import { LivePreviewListener } from '@/components/live-preview-listener'
import type { Locale } from '@/i18n/config'

type Args = {
  params: Promise<{ locale: Locale }>
}

const getHomePage = cache(async (locale: Locale) => {
  const { isEnabled: draft } = await draftMode()
  const client = getClient()

  const { data } = await client.query<{ Pages: { docs: Page[] } }>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug: 'home', draft, locale },
    fetchPolicy: draft ? 'no-cache' : 'cache-first',
  })

  return data?.Pages?.docs?.[0] || null
})

export default async function HomePage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale } = await paramsPromise
  const page = await getHomePage(locale)

  if (!page) {
    notFound()
  }

  return (
    <main>
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={page.layout as any[]} locale={locale} />
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale } = await paramsPromise
  const page = await getHomePage(locale)
  return generateMeta({ doc: page })
}