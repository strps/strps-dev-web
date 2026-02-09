import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/BlogArchive/Component'
import { ProjectsArchiveBlock } from '@/blocks/ProjectsArchive/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { StrpsHero } from '@/blocks/StrpsHero/Component'
import { StrpsSkills } from './StrpsSkills/Component'
import { Contact } from './Contact/component'
import { StrpsFormBlock } from './StrpsForm/Component'
import { StrpsStats } from './StrpsStats/Component'
import { StrpsServices } from './StrpsServices/Component'
import { StrpsClients } from './Clients/Component'
import { StrpsCareers } from './Careers/Component'
import { AboutMeBlock } from './AboutMe/component'

const blockComponents = {
  archive: ArchiveBlock,
  projectsArchive: ProjectsArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
  strpsHero: StrpsHero,
  strpsSkills: StrpsSkills,
  aboutMe: AboutMeBlock,
  strpsContact: Contact,
  strpsFormBlock: StrpsFormBlock,
  strpsStats: StrpsStats,
  strpsServices: StrpsServices,
  strpsClients: StrpsClients,
  strpsCareers: StrpsCareers,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
