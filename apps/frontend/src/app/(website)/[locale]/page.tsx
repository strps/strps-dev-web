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

const getHomePage = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const client = getClient()

  const { data } = await client.query<{ Pages: { docs: Page[] } }>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug: 'home', draft },
    fetchPolicy: draft ? 'no-cache' : 'cache-first',
  })

  return data?.Pages?.docs?.[0] || null
})

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const page = await getHomePage()

  if (!page) {
    notFound()
  }

  return (
    <main>
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={page.layout as any[]} />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage()
  return generateMeta({ doc: page })
}