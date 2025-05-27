import { SectionConfig } from '@/components/Section/config'
import { Block } from 'payload'

export const StrpsAboutUs: Block = {
  slug: 'strpsAboutUs',
  interfaceName: 'StrpsAboutUsBlock',
  labels: {
    singular: 'About Us',
    plural: 'About Us Blocks',
  },
  fields: [
    SectionConfig,
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'mission',
      type: 'richText',
      label: 'Mission Statement',
    },
    {
      name: 'vision',
      type: 'richText',
      label: 'Vision Statement',
    },
    {
      name: 'values',
      type: 'array',
      label: 'Core Values',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'timeline',
      type: 'array',
      label: 'Company Timeline',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
        },
        {
          name: 'event',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'leadership',
      type: 'array',
      label: 'Leadership Team',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'bio',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

export default StrpsAboutUs
