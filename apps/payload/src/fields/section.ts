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
      name: 'section_id',
      type: 'text',
    },
    {
      name: 'backgroundContainer',
      type: 'checkbox',
    },
    theme('auto'),
    /**
     * Decorative backgrounds are no longer picked per section here. The site
     * runs a single point cloud (`ParticleStage`) behind the whole page, and
     * which shape it takes behind each block is decided in code, by block type
     * — see `frontend/src/components/backgrounds/particle-stage/section-shapes.ts`.
     * Only a per-section background *image* is still an editorial choice.
     *
     * The old 'svgCircles' option is gone with it; `SVGCircles` now lives only
     * in the lab/experiment pages. Existing rows holding that value render as
     * no background, so they need no data fix.
     */
    {
      name: 'background',
      type: 'select',
      enumName: 'section_background',
      required: true,
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
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
