import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Slideshow from '@/components/Slideshow/Slideshow'
import { Media } from '@/components/Media'
import { Header } from '@/components/Header/Component'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/components/lib/utils'

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
      tags: true,
      meta: true,
      content: true,
      updatedAt: true,
      createdAt: true,
      heroImage: true,
    },
  })

  const postsPage = await payload.findGlobal({
    slug: 'blog-page',
  })

  const headerOverrides = postsPage?.headerOverrides

  return (
    <>
      <Header headerOverrides={headerOverrides} />
      <main>
        <div className="mb-16 mx-auto max-w-[96rem] dark text-foreground">
          <Slideshow
            interval={7000}
            className="h-[800px]"
            slides={posts.docs.map((post) => {
              return (
                <div key={post.id} className="relative w-full h-full overflow-hidden">
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 z-10">
                    <div className="p-4 sm:p-16">
                      <h2 className="z-10 text-4xl font-bold mb-4">{post.title}</h2>
                      <h3 className="z-10 text-xl max-w-2xl px-4 mb-16">
                        {post.meta?.description}
                      </h3>
                      <Link
                        href={`/blog/${post.slug}`}
                        className={cn(buttonVariants({ variant: 'default' }), 'ml-8')}
                      >
                        Read More...
                      </Link>
                    </div>
                  </div>
                  <Media
                    resource={post.heroImage}
                    alt={post.title}
                    fill
                    imgClassName="object-cover"
                    priority
                  />
                </div>
              )
            })}
          />
        </div>

        <div className="container mx-auto flex flex-col items-center">
          <h1 className="mb-16">Blog Posts</h1>

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

          <CollectionArchive
            className="px-6"
            collection={posts.docs}
            urlPath="blog"
            variant="list"
          />

          <div className="container">
            {posts.totalPages > 1 && posts.page && (
              <Pagination page={posts.page} totalPages={posts.totalPages} />
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Blog`,
  }
}
