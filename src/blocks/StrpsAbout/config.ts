import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
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
      name: 'content',
      type: 'richText',
      label: 'Content',
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

export const StrpsAboutAdjacent: Block = {
  slug: 'strpsAboutAdjacent',
  labels: {
    singular: 'Strps About Adjacent',
    plural: 'Strps Abouts Adjacent',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

export const StrpsAboutStoryBlocks: Block = {
  slug: 'strpsAboutStoryBlocks',
  labels: {
    singular: 'Strps About Story Blocks',
    plural: 'Strps Abouts Story Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'storyBlocks',
      type: 'array',
      label: 'Story Blocks',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Content',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            {
              label: 'Code',
              value: 'code',
            },
            {
              label: 'Palette',
              value: 'palette',
            },
            {
              label: 'Monitor',
              value: 'monitor',
            },
            {
              label: 'Circuit Board',
              value: 'circuitBoard',
            },
            {
              label: 'Briefcase',
              value: 'briefcase',
            },
            {
              label: 'None',
              value: 'none',
            },
          ],
          defaultValue: 'none',
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          admin: {
            condition: (data, siblingData) => siblingData?.icon !== 'none',
          },
        },
      ],
    },
  ],
}
