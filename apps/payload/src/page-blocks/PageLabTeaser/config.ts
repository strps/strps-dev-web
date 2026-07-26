import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'
import { eyebrowField } from '@/fields/eyebrow'
import { link } from '@/fields/link'

export const PageLabTeaser: Block = {
    slug: 'pageLabTeaser',
    interfaceName: 'PageLabTeaserBlock',
    labels: {
        singular: 'Lab Teaser',
        plural: 'Lab Teasers',
    },
    fields: [
        eyebrowField,
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
            localized: true,
        },
        {
            name: 'intro',
            type: 'textarea',
            label: 'Intro',
            localized: true,
        },
        link({
            required: false,
            overrides: {
                admin: {
                    description: 'Action link, e.g. "Visit the lab →" to /lab.',
                },
            },
        }),
        {
            name: 'limit',
            type: 'number',
            defaultValue: 3,
            label: 'Limit',
            admin: {
                description: 'Number of lab items to show. Lab items are code, not CMS content — see src/app/(website)/lab/data.ts.',
            },
        },
        SectionConfig,
    ],
}
