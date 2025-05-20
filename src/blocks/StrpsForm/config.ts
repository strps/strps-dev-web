import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { sectionBackground } from '@/fields/sectionBackground'

export const StrpsFormBlock: Block = {
  slug: 'strpsFormBlock',
  interfaceName: 'StrpsFormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'introType',
      type: 'select',
      defaultValue: 'richText',
      options: [
        {
          label: 'Rich Text',
          value: 'richText',
        },
        {
          label: 'Title and Text',
          value: 'titleAndText',
        },
        {
          label: 'None',
          value: 'none',
        },
      ],
      label: 'Intro Type',
    },
    ...sectionBackground(),
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { introType }) => introType === 'richText',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'introTitle',
      type: 'text',
      admin: {
        condition: (_, { introType }) => introType === 'titleAndText',
      },
      label: 'Intro Title',
    },
    {
      name: 'introText',
      type: 'text',
      admin: {
        condition: (_, { introType }) => introType === 'titleAndText',
      },
      label: 'Intro Text',
    },
  ],
  graphQL: {
    singularName: 'StrpsFormBlock',
  },
  labels: {
    plural: 'Strps Form Blocks',
    singular: 'Strps Form Block',
  },
}
