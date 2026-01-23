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
  ],
  hooks: {
    afterChange: [revalidateCopyright],
  },
}

export default Copyright
