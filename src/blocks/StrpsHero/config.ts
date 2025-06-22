import { SectionConfig } from '@/fields/section'
import { linkGroup } from '@/fields/linkGroup'
import { Block } from 'payload'

export const StrpsHero: Block = {
  slug: 'strpsHero',
  // interface name is used to create the type for the block, is exported from payload-types, you generate payload-types by running `pnpm run payload generate:types`
  interfaceName: 'StrpsHeroBlock',
  labels: {
    singular: 'Strps Hero',
    plural: 'Strps Heros',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'text',
      type: 'text',
      label: 'Text',
    },
    linkGroup({
      appearances: ['default', 'outline'],
    }),
    SectionConfig,
  ],
}
