import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const BlogTags: CollectionConfig = {
  slug: 'blogTags',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'tag',
    group: 'Blog',
  },
  fields: [
    {
      name: 'tag',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
