import { Block } from 'payload/types'

export const StrpsServices: Block = {
  slug: 'strps-services',
  labels: {
    singular: 'Services',
    plural: 'Services Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Services',
      minRows: 1,
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
        {
          name: 'icon',
          type: 'text',
          label: 'Icon Name (from Lucide Icons)',
        },
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'radio',
              options: [
                { label: 'Internal', value: 'internal' },
                { label: 'External', value: 'external' },
              ],
              defaultValue: 'internal',
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              defaultValue: 'Learn more',
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'internal',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'external',
              },
            },
          ],
        },
        {
          name: 'features',
          type: 'array',
          label: 'Key Features',
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
        { label: 'Cards', value: 'cards' },
      ],
      defaultValue: 'grid',
    },
    {
      name: 'showFeatured',
      type: 'checkbox',
      label: 'Show Featured Service',
      defaultValue: false,
    },
  ],
}

export default StrpsServices
