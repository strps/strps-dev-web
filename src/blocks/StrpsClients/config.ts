import { Block } from 'payload/types'

export const StrpsClients: Block = {
  slug: 'strps-clients',
  labels: {
    singular: 'Clients',
    plural: 'Clients Blocks',
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
      name: 'displayType',
      type: 'select',
      label: 'Display Type',
      options: [
        { label: 'Logo Grid', value: 'grid' },
        { label: 'Logo Carousel', value: 'carousel' },
        { label: 'Testimonials', value: 'testimonials' },
        { label: 'Logo Grid with Testimonials', value: 'combined' },
      ],
      defaultValue: 'grid',
    },
    {
      name: 'clients',
      type: 'array',
      label: 'Clients',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Website URL',
        },
        {
          name: 'testimonial',
          type: 'group',
          label: 'Testimonial',
          fields: [
            {
              name: 'content',
              type: 'textarea',
              label: 'Testimonial Text',
            },
            {
              name: 'author',
              type: 'text',
              label: 'Author Name',
            },
            {
              name: 'position',
              type: 'text',
              label: 'Author Position',
            },
            {
              name: 'company',
              type: 'text',
              label: 'Company',
            },
            {
              name: 'authorImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Author Image',
            },
          ],
        },
      ],
    },
    {
      name: 'showDivider',
      type: 'checkbox',
      label: 'Show Divider Between Items',
      defaultValue: true,
    },
    {
      name: 'maxLogosPerRow',
      type: 'select',
      label: 'Logos Per Row',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
      ],
      defaultValue: '5',
      admin: {
        condition: (_, siblingData) =>
          ['grid', 'combined'].includes(siblingData?.displayType || 'grid'),
      },
    },
    {
      name: 'logoBackground',
      type: 'select',
      label: 'Logo Background',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light', value: 'light' },
        { label: 'Gray', value: 'gray' },
        { label: 'Rounded', value: 'rounded' },
      ],
      defaultValue: 'none',
    },
    {
      name: 'testimonialLayout',
      type: 'select',
      label: 'Testimonial Layout',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Slider', value: 'slider' },
        { label: 'Stacked', value: 'stacked' },
      ],
      defaultValue: 'grid',
      admin: {
        condition: (_, siblingData) =>
          ['testimonials', 'combined'].includes(siblingData?.displayType || ''),
      },
    },
  ],
}

export default StrpsClients
