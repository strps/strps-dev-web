import { getServerSideSitemap } from 'next-sitemap'
import { gql } from '@apollo/client'
import { getClient } from '@/lib/apollo-client'
import { unstable_cache } from 'next/cache'
import { Post } from '@strps-website/types'

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
    const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL

    const { data } = await client.query<PostsSitemapData>({ query: POSTS_SITEMAP_QUERY })
    const results = data?.Posts

    const dateFallback = new Date().toISOString()

    const sitemap = results?.docs
      ? results.docs
        .filter((post) => Boolean(post?.slug))
        .map((post) => ({
          loc: `${SITE_URL}/blog/${post?.slug}`,
          lastmod: post.updatedAt || dateFallback,
        }))
      : []

    return sitemap
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
