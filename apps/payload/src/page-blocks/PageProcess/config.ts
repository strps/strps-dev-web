import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'

export const PageProcess: Block = {
    slug: 'pageProcess',
    interfaceName: 'PageProcessBlock',
    labels: {
        singular: 'Page Process',
        plural: 'Page Process',
    },
    fields: [
        {
            name: 'variant',
            type: 'select',
            defaultValue: 'full',
            options: [
                { label: 'Full (heading + card grid)', value: 'full' },
                { label: 'Strip (mockup, no heading)', value: 'strip' },
            ],
        },
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'How I Work',
            label: 'Title',
            localized: true,
            admin: {
                condition: (_, { variant } = {}) => (variant ?? 'full') === 'full',
            },
        },
        {
            name: 'intro',
            type: 'textarea',
            label: 'Section Intro',
            localized: true,
            admin: {
                condition: (_, { variant } = {}) => (variant ?? 'full') === 'full',
            },
        },
        {
            name: 'steps',
            type: 'array',
            label: 'Steps',
            minRows: 1,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    label: 'Step Title',
                    localized: true,
                },
                {
                    name: 'description',
                    type: 'textarea',
                    required: true,
                    label: 'Step Description',
                    localized: true,
                },
            ],
        },
        SectionConfig,
    ],
}
