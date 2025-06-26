import { link } from '@/fields/link'
import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'

export const StrpsServices: Block = {
  slug: 'strpsServices',
  interfaceName: 'StrpsServicesBlock',
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
        link({
          appearances: ['default', 'outline'],
          hashEnumName: true,
        }),
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
