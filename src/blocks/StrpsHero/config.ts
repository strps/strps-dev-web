import { link } from '@/fields/link'
import { Block } from 'payload'

export const StrpsHero: Block = {
  slug: 'strpsHero',
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
    link({ appearances: ['default', 'outline'] }),
  ],
}
