import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'
import { lucideIcon } from '@/fields/lucideIcon'

export const AboutMe: Block = {
  slug: 'aboutMe',
  labels: {
    singular: 'About Me',
    plural: 'About Me',
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


