import { Block } from 'payload/types'

export const StrpsBlog: Block = {
  slug: 'strps-blog',
  labels: {
    singular: 'Blog Posts',
    plural: 'Blog Posts Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
        { label: 'Featured Post with Grid', value: 'featured-grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
      defaultValue: 'grid',
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Columns',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
      defaultValue: '3',
      admin: {
        condition: (_, siblingData) =>
          ['grid', 'featured-grid'].includes(siblingData?.layout || 'grid'),
      },
    },
    {
      name: 'postsToShow',
      type: 'number',
      label: 'Number of Posts to Show',
      min: 1,
      max: 12,
      defaultValue: 6,
    },
    {
      name: 'categories',
      type: 'relationship',
      label: 'Filter by Categories',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      label: 'Filter by Tags',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'showFeaturedImage',
      type: 'checkbox',
      label: 'Show Featured Image',
      defaultValue: true,
    },
    {
      name: 'showDate',
      type: 'checkbox',
      label: 'Show Publish Date',
      defaultValue: true,
    },
    {
      name: 'showAuthor',
      type: 'checkbox',
      label: 'Show Author',
      defaultValue: true,
    },
    {
      name: 'showExcerpt',
      type: 'checkbox',
      label: 'Show Excerpt',
      defaultValue: true,
    },
    {
      name: 'showReadMore',
      type: 'checkbox',
      label: 'Show Read More Link',
      defaultValue: true,
    },
    {
      name: 'readMoreText',
      type: 'text',
      label: 'Read More Text',
      defaultValue: 'Read More',
      admin: {
        condition: (_, siblingData) => siblingData?.showReadMore !== false,
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'enable',
          type: 'checkbox',
          label: 'Show CTA Button',
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'View All Posts',
          admin: {
            condition: (_, siblingData) => siblingData?.enable === true,
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Button Link',
          defaultValue: '/blog',
          admin: {
            condition: (_, siblingData) => siblingData?.enable === true,
          },
        },
      ],
    },
  ],
}

export default StrpsBlog
