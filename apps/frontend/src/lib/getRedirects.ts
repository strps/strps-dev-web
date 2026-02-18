import { gql } from '@apollo/client'
import { getClient } from '@/lib/apollo-client'
import { unstable_cache } from 'next/cache'
import type { Redirect } from '@strps-website/types'   // ← from your shared types package

/**
 * Fetches ALL redirects (used internally by the cached version)
 */
async function getRedirects(): Promise<Redirect[]> {
  const client = getClient()

  const { data } = await client.query({
    query: GET_REDIRECTS,
  }) as { data: { Redirects: { docs: Redirect[] } } }

  return data.Redirects.docs || []
}

/**
 * Returns a unstable_cache function with tag 'redirects'
 *
 * → One cache entry for the entire list (very efficient)
 * → Revalidate with revalidateTag('redirects') from Payload hooks
 */
export const getCachedRedirects = () =>
  unstable_cache(
    async () => getRedirects(),
    ['redirects'],                    // cache key
    {
      tags: ['redirects'],            // revalidation tag (same as original!)
    }
  )


export const GET_REDIRECTS = gql`
  query GetRedirects {
    Redirects(
      limit: 1000   # safe upper bound (redirects are almost always < 100)
    ) {
      docs {
        from
        to{
          type
          url
          reference {
            relationTo
            value {
              ...on Page {
                slug
              }
              ... on Post {
                slug
              }
            }         
          }
        }
      }
    }
  }
`