import type { Field } from 'payload'

type SectionBackgroundType = () => Field[]

export const sectionBackground: SectionBackgroundType = () => {
  const generatedSectionBackground: Field[] = [
    {
      name: 'sectionBackgroundType',
      type: 'select',
      defaultValue: 'none',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Image',
          value: 'image',
        },
        {
          label: 'Background Color',
          value: 'backgroundColor',
        },
      ],

      admin: {},
    },
    {
      name: 'backgroundColor',
      type: 'text',
      admin: {
        condition: (_, { sectionBackgroundType }) => sectionBackgroundType === 'backgroundColor',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { sectionBackgroundType }) => sectionBackgroundType === 'image',
      },
    },
    {
      name: 'maskImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'parallaxRatio',
      type: 'number',
      label: 'Parallax Ratio',
      defaultValue: 0,
      min: 0,
      max: 100,
    },
  ]

  return generatedSectionBackground
}
