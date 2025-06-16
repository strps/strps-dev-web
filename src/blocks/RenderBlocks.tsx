import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { ProjectsArchiveBlock } from '@/blocks/ProjectsArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { StrpsHero } from '@/blocks/StrpsHero/Component'
import { AboutImageAdjacent, AboutStoryBlocks, StrpsAbout } from '@/blocks/StrpsAbout/Component'
import { StrpsSkills } from './StrpsSkills/Component'
import { StrpsContact } from './StrpsContact/component'
import { StrpsFormBlock } from './StrpsForm/Component'
import { StrpsAboutUs } from './StrpsAboutUs/Component'
import { StrpsStats } from './StrpsStats/Component'
import { StrpsServices } from './StrpsServices/Component'
import { StrpsClients } from './StrpsClients/Component'
import { StrpsCareers } from './StrpsCareers/Component'

const blockComponents = {
  archive: ArchiveBlock,
  projectsArchive: ProjectsArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
  strpsHero: StrpsHero,
  strpsSkills: StrpsSkills,
  strpsAbout: StrpsAbout,
  strpsAboutAdjacent: AboutImageAdjacent,
  strpsAboutStoryBlocks: AboutStoryBlocks,
  strpsContact: StrpsContact,
  strpsFormBlock: StrpsFormBlock,
  strpsAboutUs: StrpsAboutUs,
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
