import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { theme } from '@/fields/theme'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/Header/RowLabel#RowLabel',
        },
      },
    },
    theme('auto'),
    {
      name: 'background',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'overlay',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
