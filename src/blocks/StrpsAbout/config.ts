import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { SectionConfig } from '@/components/Section/config'
import { lucideIcon } from '@/fields/lucideIcon'

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
    SectionConfig,
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
    SectionConfig,
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
  interfaceName: 'StrpsAboutStoryBlocks',
  labels: {
    singular: 'Strps About Story Blocks',
    plural: 'Strps Abouts Story Blocks',
  },
  fields: [
    SectionConfig,
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
        lucideIcon,
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
