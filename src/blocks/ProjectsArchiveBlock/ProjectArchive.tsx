import { cn } from '@/utilities/ui'
import React from 'react'
import { ArchiveCard } from '@/components/Cards/ArchiveCard'
import type { Project } from '@/payload-types'

export type Props = {
  collection: Project[]
}

export const ProjectArchive: React.FC<Props> = (props) => {
  const { collection } = props

  return (
    <div className="grid gap-16 sm:gap-8 grid-cols-[repeat(auto-fit,minmax(calc(250px-1rem)))] sm:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
      {collection?.map((result, index) => {
        if (typeof result === 'object' && result !== null) {
          return (
            <div className="" key={index}>
              <ArchiveCard
                className="rounded-4xl"
                doc={result}
                relationTo="projects"
                variant="grid"
              />
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
