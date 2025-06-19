import type { GlobalConfig } from 'payload'
import { revalidateProjectsPage } from './hooks'

export const ProjectsPage: GlobalConfig = {
  slug: 'projects-page',
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
    afterChange: [revalidateProjectsPage],
  },
}
