import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidateDoc } from './hooks/revalidateDoc'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'

/**
 * Legal documents (privacy policy, terms of service, cookie policy…).
 *
 * The collection slug is `docs` so it matches the public URL segment
 * (`/[locale]/docs/[slug]`) — that keeps the frontend's `/${relationTo}/${slug}`
 * link-resolution convention working without a special-case mapping.
 */
export const Docs: CollectionConfig<'docs'> = {
  slug: 'docs',
  labels: {
    singular: 'Legal Document',
    plural: 'Legal Documents',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    docType: true,
    effectiveDate: true,
  },
  admin: {
    group: 'Legal',
    defaultColumns: ['title', 'docType', 'effectiveDate', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'docs',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'docs',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'docType',
      type: 'select',
      defaultValue: 'other',
      options: [
        { label: 'Privacy Policy', value: 'privacy' },
        { label: 'Terms of Service', value: 'terms' },
        { label: 'Cookie Policy', value: 'cookies' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Machine value — not translated. Used for grouping and icons.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    // No h1 — the page title owns it. No BlocksFeature: legal copy is prose.
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
              overrides: { localized: true },
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({ overrides: { localized: true } }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'effectiveDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        position: 'sidebar',
        description: 'Date this version takes effect — shown on the page.',
      },
    },
    {
      name: 'version',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Optional version label, e.g. "1.2".',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateDoc],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
