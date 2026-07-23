import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'
import { eyebrowField } from '@/fields/eyebrow'
import { link } from '@/fields/link'

export const PageServicesTeaser: Block = {
    slug: 'pageServicesTeaser',
    interfaceName: 'PageServicesTeaserBlock',
    labels: {
        singular: 'Services Teaser',
        plural: 'Services Teasers',
    },
    fields: [
        eyebrowField,
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
        },
        link({
            required: false,
            overrides: {
                admin: {
                    description: 'Action link, e.g. "Full details →" to /services.',
                },
            },
        }),
        {
            name: 'items',
            type: 'array',
            label: 'Rows',
            minRows: 1,
            admin: {
                description: 'Rows are numbered automatically from their position (01, 02, 03) — do not store the number.',
            },
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    label: 'Name',
                },
                {
                    name: 'summary',
                    type: 'text',
                    label: 'Summary',
                    admin: {
                        description: 'One line, roughly 48 characters or fewer.',
                    },
                },
                link({
                    required: false,
                    overrides: {
                        admin: {
                            description: 'Row link, e.g. "Learn more" to /services#01.',
                        },
                    },
                }),
            ],
        },
        SectionConfig,
    ],
}
