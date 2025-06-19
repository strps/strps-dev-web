import type { GlobalConfig } from 'payload'
import { revalidateBlogPage } from './hooks'

export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { user }) => user?.role?.name === 'superAdmin',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateBlogPage],
  },
}
