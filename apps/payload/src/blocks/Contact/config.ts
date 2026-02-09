import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'

export const StrpsContact: Block = {
  slug: 'strpsContact',
  labels: {
    singular: 'Strps Contact Block',
    plural: 'Strps Contact Blocks',
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
    {
      name: 'coordinates',
      type: 'point',
      label: 'Coordinates',
    },
    SectionConfig,
  ],
}
