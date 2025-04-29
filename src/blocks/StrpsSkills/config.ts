import { Block } from 'payload'

export const StrpsSkills: Block = {
  slug: 'strpsSkills',
  interfaceName: 'StrpsSkillsBlock',
  labels: {
    singular: 'Strps Skills',
    plural: 'Strps Skills',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },

    {
      name: 'skillGroup',
      type: 'array',
      label: 'Skill Group',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Text',
        },

        {
          name: 'skills',
          type: 'array',
          label: 'Skills',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Text',
            },
            {
              name: 'percentage',
              type: 'number',
              label: 'Percentage',
              min: 0,
              max: 100,
            },
          ],
        },
      ],
    },
  ],
}
