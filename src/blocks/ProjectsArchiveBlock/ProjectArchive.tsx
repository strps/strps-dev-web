import { cn } from '@/utilities/ui'
import React from 'react'
import type { Project } from '@/payload-types'
import { ImageCard } from '@/components/Cards/ImageCard/ImageCard'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export type Props = {
  collection: Project[]
}

export const ProjectArchive: React.FC<Props> = (props) => {
  const { collection } = props

  return (
    <div className="grid gap-16 sm:gap-8 grid-cols-[repeat(auto-fit,minmax(calc(250px-1rem)))] sm:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
      {collection?.map((project, index) => (
        <ImageCard
          key={index}
          className="rounded-4xl"
          image={project.heroImage}
          title={project.title}
          description={project.meta?.description}
          action={
            <Link
              href={`/projects/${project.slug}`}
              className={buttonVariants({ variant: 'default' })}
            >
              Read More...
            </Link>
          }
        />
      ))}
    </div>
  )
}
