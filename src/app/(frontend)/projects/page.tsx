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

  const projects = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      meta: true,
      content: true,
      updatedAt: true,
      createdAt: true,
    },
  })

  return (
    <>
      <div className="mb-16">
        <Slideshow
          interval={7000}
          slides={projects.docs.map((project) => {
            return (
              <div key={project.id} className="w-full h-[600px] absolute">
                <div className="absolute flex flex-col justify-center items-center w-full h-full bg-black/50 z-10">
                  <h2 className="text-white z-10">{project.title}</h2>
                  <h3 className="text-white z-10">{project.meta?.description}</h3>
                </div>
                <Media resource={project.meta?.image} alt={project.title} fill className="z-0" />
              </div>
            )
          })}
        />
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold">Projects</h1>
        </div>
      </div>

      <div className="mb-8">
        <PageRange
          collection="projects"
          currentPage={projects.page}
          limit={12}
          totalDocs={projects.totalDocs}
        />
      </div>

      <CollectionArchive collection={projects.docs} collectionName="projects" />

      <div className="container">
        {projects.totalPages > 1 && projects.page && (
          <Pagination page={projects.page} totalPages={projects.totalPages} />
        )}
      </div>
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Projects`,
  }
}
