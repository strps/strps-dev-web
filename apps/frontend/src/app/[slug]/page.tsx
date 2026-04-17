import { cache } from 'react'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Page } from '@strps-website/types'
import { getClient } from '@/lib/apollo-client'
import { GET_PAGE_BY_SLUG } from '@/lib/queries/page-blocks'
import { generateMeta } from '@/lib/generateMeta'
import { RenderBlocks } from '@/components/RenderBlocks'
import { PayloadRedirects } from '@/components/payload-redirects'
import { LivePreviewListener } from '@/components/live-preview-listener'
import { gql } from '@apollo/client'

type Args = {
    params: Promise<{
        slug?: string
    }>
}

const getPageBySlug = cache(async (slug: string) => {
    const { isEnabled: draft } = await draftMode()
    const client = getClient()

    const { data } = await client.query<{ Pages: { docs: Page[] } }>({
        query: GET_PAGE_BY_SLUG,
        variables: { slug, draft },
        fetchPolicy: draft ? 'no-cache' : 'cache-first',
    })

    return data?.Pages?.docs?.[0] || null
})

export default async function PageRoute({ params: paramsPromise }: Args) {
    const { isEnabled: draft } = await draftMode()
    const { slug = '' } = await paramsPromise
    const url = `/${slug}`

    const page = await getPageBySlug(slug)

    if (!page) {
        return <PayloadRedirects url={url} />
    }

    return (
        <main>
            {draft && <LivePreviewListener />}
            <RenderBlocks blocks={page.layout as any[]} />
        </main>
    )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
    const { slug = '' } = await paramsPromise
    const page = await getPageBySlug(slug)
    return generateMeta({ doc: page })
}

export async function generateStaticParams() {
    const client = getClient()

    const { data } = await client.query<{ Pages: { docs: { slug: string }[] } }>({
        query: gql`
      query GetAllPageSlugs {
        Pages(
          where: { _status: { equals: published } }
          limit: 1000
          pagination: false
        ) {
          docs {
            slug
          }
        }
      }
    `,
    })

    const slugs = data?.Pages?.docs || []

    return slugs
        .filter(({ slug }: { slug: string }) => slug !== 'home')
        .map(({ slug }: { slug: string }) => ({ slug }))
}
