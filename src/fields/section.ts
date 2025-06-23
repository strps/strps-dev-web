import { theme } from '@/fields/theme'
import { Field } from 'payload'

/**
 * Section Config
 *
 * @description This is the payload config for the section component
 */
export const SectionConfig: Field = {
  name: 'section',
  label: 'Section',
  interfaceName: 'SectionConfig',
  type: 'group',
  fields: [
    {
      name: 'container',
      type: 'checkbox',
    },
    {
      name: 'section_id',
      type: 'text',
    },
    {
      name: 'backgroundContainer',
      type: 'checkbox',
    },
    theme('auto'),
    {
      name: 'background',
      type: 'select',
      enumName: 'section_background',
      required: true,
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'SVG Circles', value: 'svgCircles' },
        { label: 'Image', value: 'image' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { background } = {}) => background === 'image',
      },
    },
  ],
}
