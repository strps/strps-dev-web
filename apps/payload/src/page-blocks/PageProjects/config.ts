import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'
import { eyebrowField } from '@/fields/eyebrow'
import { link } from '@/fields/link'

export const PageProjects: Block = {
    slug: 'pageProjects',
    interfaceName: 'PageProjectsBlock',
    labels: {
        singular: 'Page Projects',
        plural: 'Page Projects',
    },
    fields: [
        eyebrowField,
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'Featured Projects',
            label: 'Title',
        },
        {
            name: 'variant',
            type: 'select',
            defaultValue: 'cards',
            options: [
                { label: 'Cards', value: 'cards' },
                { label: 'Hairline (mockup)', value: 'hairline' },
            ],
        },
        link({
            required: false,
            overrides: {
                admin: {
                    description: 'Optional action link, e.g. "All projects →" to /projects.',
                },
            },
        }),
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
