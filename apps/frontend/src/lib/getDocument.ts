import { getClient } from '@/lib/apollo-client'
import { Page, Post, Project } from '@strps-website/types'
import { unstable_cache } from 'next/cache'

type Collection = "posts" | "pages" | "projects"

/**
 * Generic cached document fetcher using GraphQL
 * T = the type of the document (Post, Project, Page, etc.)
 */
export const getCachedDocument = <T extends Post | Page | Project = Page>(
  collection: Collection,
  slug: string,
  query: any,                    // your GraphQL query
  depth = 0                      // you can ignore or use for documentation
) => {
  const cacheKey = [collection, slug, depth]

  return unstable_cache(
    async (): Promise<T | null> => {
      const client = getClient()

      const { data } = await client.query({
        query,
        variables: { slug },
      })

      // Payload GraphQL usually returns data under the capitalized collection name
      const collectionKey = collection.charAt(0).toUpperCase() + collection.slice(1)
      const docs = data[collectionKey]?.docs

      return (docs?.[0] as T) || null
    },
    cacheKey,
    {
      tags: [`${collection}_${slug}`],
    }
  )
}