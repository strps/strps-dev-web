import type { GlobalConfig } from 'payload'

export const Copyright: GlobalConfig = {
  slug: 'copyright',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'copyrightText',
      type: 'text',
      required: true,
      defaultValue: 'All Rights Reserved.',
    },
  ],
}

export default Copyright
