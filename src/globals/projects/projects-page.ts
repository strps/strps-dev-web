import type { GlobalConfig } from 'payload'
import { revalidateProjectsPage } from './hooks'
import { headerOverrides } from '@/fields/header-overrrides'

export const ProjectsPage: GlobalConfig = {
  slug: 'projects-page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Projects',
  },
  fields: [
    headerOverrides('dark'),
    {
      name: 'feature-projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
    },
  ],
  hooks: {
    afterChange: [revalidateProjectsPage],
  },
}
