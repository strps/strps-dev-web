import { getServerSideSitemap } from 'next-sitemap'
import { gql } from '@apollo/client'
import { getClient } from '@/lib/apollo-client'
import { unstable_cache } from 'next/cache'
import { Post } from '@strps-website/types'
import { localizeSitemapEntries } from '@/lib/sitemap'

interface PostsSitemapData {
  Posts: {
    docs: Array<Pick<Post, 'slug' | 'updatedAt'>>
  }
}

const POSTS_SITEMAP_QUERY = gql`
  query PostsSitemap {
    Posts(
      where: { _status: { equals: published } }
      limit: 1000
      pagination: false
    ) {
      docs {
        slug
        updatedAt
      }
    }
  }
`

const getPostsSitemap = unstable_cache(
  async () => {
    const client = getClient()

    const { data } = await client.query<PostsSitemapData>({ query: POSTS_SITEMAP_QUERY })
    const results = data?.Posts

    const dateFallback = new Date().toISOString()

    const entries = results?.docs
      ? results.docs
        .filter((post) => Boolean(post?.slug))
        .map((post) => ({
          path: `/blog/${post?.slug}`,
          lastmod: post.updatedAt || dateFallback,
        }))
      : []

    return localizeSitemapEntries(entries)
  },
  ['blog-sitemap'],
  {
    tags: ['blog-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPostsSitemap()

  return getServerSideSitemap(sitemap)
}
