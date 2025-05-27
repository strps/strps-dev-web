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
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {collection?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <ArchiveCard className="h-full" doc={result} relationTo="projects" />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
