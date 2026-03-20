import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'

export const PageProjects: Block = {
    slug: 'pageProjects',
    interfaceName: 'PageProjectsBlock',
    labels: {
        singular: 'Page Projects',
        plural: 'Page Projects',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'Featured Projects',
            label: 'Title',
        },
        {
            name: 'populateBy',
            type: 'select',
            defaultValue: 'collection',
            options: [
                { label: 'Collection', value: 'collection' },
                { label: 'Manual Selection', value: 'selection' },
            ],
        },
        {
            name: 'limit',
            type: 'number',
            defaultValue: 6,
            admin: {
                condition: (_, { populateBy } = {}) => populateBy === 'collection',
            },
        },
        {
            name: 'selectedProjects',
            type: 'relationship',
            relationTo: 'projects',
            hasMany: true,
            admin: {
                condition: (_, { populateBy } = {}) => populateBy === 'selection',
            },
        },
        {
            name: 'githubUrl',
            type: 'text',
            label: 'GitHub Profile URL',
        },
        SectionConfig,
    ],
}
