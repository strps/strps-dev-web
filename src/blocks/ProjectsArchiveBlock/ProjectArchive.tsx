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
    <div className={cn('container')}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        }}
        className="gap-16 sm:gap-8"
      >
        {collection?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="" key={index}>
                <ArchiveCard
                  className="rounded-none sm:rounded-4xl"
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
    </div>
  )
}
