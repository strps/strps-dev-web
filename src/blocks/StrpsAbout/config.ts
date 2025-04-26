import { link } from '@/fields/link'
import { Block } from 'payload'

export const StrpsAbout: Block = {
  slug: 'strpsAbout',
  labels: {
    singular: 'Strps About',
    plural: 'Strps Abouts',
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

    link({}),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
