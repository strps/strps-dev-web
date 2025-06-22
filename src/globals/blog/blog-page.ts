import type { GlobalConfig } from 'payload'
import { revalidateBlogPage } from './hooks'
import { headerOverrides } from '@/fields/header-overrrides'

export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Blog',
  },
  fields: [
    headerOverrides('dark'),
    {
      name: 'feature-posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
    },
  ],

  hooks: {
    afterChange: [revalidateBlogPage],
  },
}
