import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Slideshow from '@/components/Slideshow/Slideshow'
import { Media } from '@/components/Media'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      content: true,
      updatedAt: true,
      createdAt: true,
      heroImage: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <div className="mb-16 container mx-auto">
        <Slideshow
          interval={7000}
          className="h-[800px]"
          slides={posts.docs.map((post) => {
            return (
              <div key={post.id} className="relative w-full h-full overflow-hidden">
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 z-10">
                  <h2 className="text-white z-10 text-4xl font-bold mb-4">{post.title}</h2>
                  <h3 className="text-white z-10 text-xl max-w-2xl text-center px-4">
                    {post.meta?.description}
                  </h3>
                </div>
                <Media
                  resource={post.heroImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )
          })}
        />
      </div>

      <div className="container mx-auto">
        <div className="mb-16">
          <div className="prose dark:prose-invert max-w-none">
            <h1>Blog</h1>
          </div>
        </div>

        {posts.totalPages > 1 && posts.page && (
          <div className="container mb-8">
            <PageRange
              collection="posts"
              currentPage={posts.page}
              limit={12}
              totalDocs={posts.totalDocs}
            />
          </div>
        )}

        <CollectionArchive collection={posts.docs} collectionName="posts" variant="grid" />

        <div className="container">
          {posts.totalPages > 1 && posts.page && (
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Blog`,
  }
}
