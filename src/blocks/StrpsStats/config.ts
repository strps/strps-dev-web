import { Block } from 'payload'

export const StrpsStats: Block = {
  slug: 'strpsStats',
  interfaceName: 'StrpsStatsBlock',
  labels: {
    singular: 'Statistics',
    plural: 'Statistics Blocks',
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
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Side by Side', value: 'side-by-side' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Number of Columns',
      defaultValue: '4',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'grid',
      },
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 1,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'prefix',
          type: 'text',
          label: 'Prefix (e.g., $, €)',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffix (e.g., %, +)',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon Name (from Lucide Icons)',
          admin: {
            description: 'Enter the name of a Lucide icon (e.g., "users", "award")',
          },
        },
        {
          name: 'color',
          type: 'select',
          label: 'Color',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Accent', value: 'accent' },
            { label: 'Success', value: 'success' },
            { label: 'Warning', value: 'warning' },
            { label: 'Error', value: 'error' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
    {
      name: 'animation',
      type: 'group',
      label: 'Animation Settings',
      fields: [
        {
          name: 'enable',
          type: 'checkbox',
          label: 'Enable Animation',
          defaultValue: true,
        },
        {
          name: 'duration',
          type: 'number',
          label: 'Duration (ms)',
          defaultValue: 2000,
          admin: {
            condition: (_, siblingData) => siblingData?.enable !== false,
          },
        },
        {
          name: 'easing',
          type: 'select',
          label: 'Easing Function',
          options: [
            { label: 'Ease Out', value: 'easeOut' },
            { label: 'Ease In', value: 'easeIn' },
            { label: 'Ease In Out', value: 'easeInOut' },
            { label: 'Linear', value: 'linear' },
          ],
          defaultValue: 'easeOut',
          admin: {
            condition: (_, siblingData) => siblingData?.enable !== false,
          },
        },
      ],
    },
    {
      name: 'style',
      type: 'group',
      label: 'Style Settings',
      fields: [
        {
          name: 'variant',
          type: 'select',
          label: 'Variant',
          options: [
            { label: 'Card', value: 'card' },
            { label: 'Minimal', value: 'minimal' },
            { label: 'Bordered', value: 'bordered' },
            { label: 'Gradient', value: 'gradient' },
          ],
          defaultValue: 'card',
        },
        {
          name: 'textAlign',
          type: 'select',
          label: 'Text Alignment',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'center',
        },
        {
          name: 'valueSize',
          type: 'select',
          label: 'Value Size',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
            { label: 'Extra Large', value: 'xl' },
          ],
          defaultValue: 'xl',
        },
      ],
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
          required: true,
          defaultValue: 'Learn more',
          admin: {
            condition: (_, siblingData) => siblingData?.enable !== false,
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link URL',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.enable !== false,
          },
        },
        {
          name: 'style',
          type: 'select',
          label: 'Button Style',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Text', value: 'text' },
          ],
          defaultValue: 'primary',
          admin: {
            condition: (_, siblingData) => siblingData?.enable !== false,
          },
        },
      ],
    },
    {
      name: 'container',
      type: 'group',
      label: 'Container Settings',
      fields: [
        {
          name: 'maxWidth',
          type: 'select',
          label: 'Max Width',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
            { label: 'Extra Large', value: 'xl' },
            { label: 'Full Width', value: 'full' },
            { label: 'None', value: 'none' },
          ],
          defaultValue: 'xl',
        },
        {
          name: 'padding',
          type: 'group',
          label: 'Padding',
          fields: [
            {
              name: 'top',
              type: 'select',
              label: 'Top Padding',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' },
                { label: 'Extra Large', value: 'xl' },
              ],
              defaultValue: 'xl',
            },
            {
              name: 'bottom',
              type: 'select',
              label: 'Bottom Padding',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' },
                { label: 'Extra Large', value: 'xl' },
              ],
              defaultValue: 'xl',
            },
          ],
        },
      ],
    },
  ],
}

export default StrpsStats
