import type { GlobalConfig } from 'payload'

import { revalidateCopyright } from './hooks'

export const Copyright: GlobalConfig = {
  slug: 'copyright',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: '',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      defaultValue: new Date(),
    },
    {
      name: 'link',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Footer location line, e.g. "San José, CR · GMT-6".',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateCopyright],
  },
}

export default Copyright
