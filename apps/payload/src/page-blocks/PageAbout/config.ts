import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'
import { eyebrowField } from '@/fields/eyebrow'
import { link } from '@/fields/link'

export const PageAbout: Block = {
    slug: 'pageAbout',
    interfaceName: 'PageAboutBlock',
    labels: {
        singular: 'Page About',
        plural: 'Page Abouts',
    },
    fields: [
        eyebrowField,
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'About Me',
            label: 'Title',
            localized: true,
        },
        {
            name: 'layout',
            type: 'select',
            defaultValue: 'single',
            options: [
                { label: 'Single column', value: 'single' },
                { label: 'Two column', value: 'twoColumn' },
            ],
        },
        {
            name: 'summary',
            type: 'textarea',
            label: 'Summary',
            localized: true,
            admin: {
                description: 'Fallback copy, used when Body is empty.',
            },
        },
        {
            name: 'body',
            type: 'richText',
            label: 'Body',
            localized: true,
            admin: {
                description: 'Preferred over Summary when present — bold key phrases, one paragraph per block.',
            },
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Profile Image',
        },
        link({
            required: false,
            overrides: {
                admin: {
                    description: 'Optional close link, e.g. "More about me →" to /about. Leave empty on the /about page itself.',
                },
            },
        }),
        SectionConfig,
    ],
}
