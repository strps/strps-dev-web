import { gql } from '@apollo/client'
import { getClient } from '@/lib/apollo-client'
import type { Post } from '@strps-website/types' // your generated types
import { draftMode } from 'next/headers'
import { cache } from 'react'
import type { Locale } from '@/i18n/config'

export const GET_POSTS = gql`
  query GetPosts(
    $page: Int = 1
    $limit: Int = 12
    $where: Post_where   # ← This was the main issue
    $locale: LocaleInputType
  ) {
    Posts(
      page: $page
      limit: $limit
      where: $where
      sort: "-publishedAt"
      locale: $locale
    ) {
      docs {
        id
        title
        slug
        publishedAt
        heroImage {
          url
          alt
        }
        meta {
          description
        }
        authors {
          name
        }
        tags {
          id
          tag      
        }
      }
      totalDocs
      totalPages
      page
      hasNextPage
      hasPrevPage
    }
  }
`
type PostsResponse = {
  Posts: {
    docs: Post[]
    totalDocs: number
    totalPages: number
    page: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

type GetPostsParams = {
  page?: number
  limit?: number
  locale: Locale
}

export async function getBlogPosts({ page = 1, limit = 12, locale }: GetPostsParams) {
  const client = getClient()

  const { data } = await client.query<PostsResponse>({
    query: GET_POSTS,
    variables: {
      page,
      limit,
      locale,
      where: {
        _status: { equals: 'published' },
        // publishedAt: { less_than_equal: new Date().toISOString() } // optional extra safety
      },
    },
    // fetchPolicy: 'no-cache' // if you want fresh data every time
  })

  return {
    posts: data!.Posts.docs as Post[],           // array of posts
    pagination: {
      totalDocs: data!.Posts.totalDocs,
      totalPages: data!.Posts.totalPages,
      currentPage: data!.Posts.page,
      hasNextPage: data!.Posts.hasNextPage,
      hasPrevPage: data!.Posts.hasPrevPage,
    },
  }
}


export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!, $draft: Boolean, $locale: LocaleInputType) {
    Posts(
      where: { slug: { equals: $slug } }
      limit: 1
      draft: $draft          # ← This is the proper way
      locale: $locale
    ) {
      docs {
        id
        title
        slug
        content
        publishedAt
        heroImage { url alt width height }
        meta { title description image { url } }
        authors { name }
        tags { tag }
        relatedPosts {
          id
          title
          slug
          publishedAt
          meta { description }
          heroImage { url alt }
        }
        appearance { headerOverrides { background } }
      }
    }
  }
`
type GetPostBySlugArgs = {
  slug: string
  locale: Locale
}

export const getPostBySlug = cache(async ({ slug, locale }: GetPostBySlugArgs) => {
  let draft = false
  try {
    const { isEnabled } = await draftMode()
    draft = isEnabled
  } catch {
    // draftMode() is unavailable during static generation
  }
  const client = getClient()

  const { data } = await client.query<PostsResponse>({
    query: GET_POST_BY_SLUG,
    variables: {
      slug,
      draft,                    // ← Enables draft preview when in draft mode
      locale,
    },
    fetchPolicy: draft ? 'no-cache' : 'cache-first',
  })

  return data!.Posts.docs[0] as Post | null
})

export async function generateStaticParams() {
  const client = getClient()

  const { data } = await client.query<PostsResponse>({
    query: gql`
      query GetAllPostSlugs {
        Posts(
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

  return data!.Posts.docs.map((doc) => ({
    slug: doc.slug!,
  }))
}