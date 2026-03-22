import { gql } from '@apollo/client'
import { getClient } from '@/lib/apollo-client'
import { Page, Post, Project } from '@strps-website/types'
import { unstable_cache } from 'next/cache'

type Collection = "posts" | "pages" | "projects"

const defaultQuery = (collectionKey: string) => gql`
  query GetDocBySlug($slug: String!) {
    ${collectionKey}(where: { slug: { equals: $slug } }, limit: 1) {
      docs {
        slug
      }
    }
  }
`

/**
 * Generic cached document fetcher using GraphQL
 * T = the type of the document (Post, Project, Page, etc.)
 */
export const getCachedDocument = <T extends Post | Page | Project = Page>(
  collection: Collection,
  slug: string,
  query?: any,
  depth = 0
) => {
  const collectionKey = collection.charAt(0).toUpperCase() + collection.slice(1)
  const cacheKey = [collection, slug, String(depth)]

  return unstable_cache(
    async (): Promise<T | null> => {
      const client = getClient()

      const { data } = await client.query({
        query: query ?? defaultQuery(collectionKey),
        variables: { slug },
      })

      const docs = (data as Record<string, any>)?.[collectionKey]?.docs

      return (docs?.[0] as T) || null
    },
    cacheKey,
    {
      tags: [`${collection}_${slug}`],
    }
  )
}