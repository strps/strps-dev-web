import { Block, TextFieldSingleValidation } from 'payload'
import { SectionConfig } from '@/fields/section'
import { linkGroup } from '@/fields/linkGroup'
import { eyebrowField } from '@/fields/eyebrow'

export const PageHero: Block = {
    slug: 'pageHero',
    interfaceName: 'PageHeroBlock',
    labels: {
        singular: 'Page Hero',
        plural: 'Page Heroes',
    },
    fields: [
        eyebrowField,
        {
            name: 'variant',
            type: 'select',
            defaultValue: 'portrait',
            options: [
                { label: 'Portrait (centered name)', value: 'portrait' },
                { label: 'Statement (mockup)', value: 'statement' },
            ],
        },
        {
            name: 'name',
            type: 'text',
            label: 'Name',
            localized: true,
            admin: {
                description: 'Used as the h1 in the "portrait" variant.',
                condition: (_, { variant } = {}) => (variant ?? 'portrait') === 'portrait',
            },
            validate: ((value, options) => {
                const siblingData = options?.siblingData as { variant?: string } | undefined
                if ((siblingData?.variant ?? 'portrait') === 'portrait' && !value) {
                    return 'Name is required for the portrait variant.'
                }
                return true
            }) as TextFieldSingleValidation,
        },
        {
            name: 'headline',
            type: 'text',
            label: 'Headline',
            localized: true,
            admin: {
                description: 'Used as the h1 in the "statement" variant, e.g. "I build fast websites and web apps for businesses."',
                condition: (_, { variant } = {}) => variant === 'statement',
            },
            validate: ((value, options) => {
                const siblingData = options?.siblingData as { variant?: string } | undefined
                if (siblingData?.variant === 'statement' && !value) {
                    return 'Headline is required for the statement variant.'
                }
                return true
            }) as TextFieldSingleValidation,
        },
        {
            name: 'showPlotLine',
            type: 'checkbox',
            defaultValue: true,
            label: 'Show plot line',
            admin: {
                description: 'Renders the animated plotter-line SVG under the headline.',
                condition: (_, { variant } = {}) => variant === 'statement',
            },
        },
        {
            name: 'label',
            type: 'text',
            label: 'Label / Subtitle',
            localized: true,
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            localized: true,
        },
        {
            name: 'location',
            type: 'group',
            label: 'Location',
            fields: [
                {
                    name: 'city',
                    type: 'text',
                    localized: true,
                },
                {
                    name: 'region',
                    type: 'text',
                    localized: true,
                },
            ],
        },
        {
            name: 'status',
            type: 'group',
            label: 'Availability Status',
            fields: [
                {
                    name: 'isAvailable',
                    type: 'checkbox',
                    defaultValue: false,
                },
                {
                    name: 'label',
                    type: 'text',
                    label: 'Status Label',
                    localized: true,
                },
                {
                    name: 'availableFrom',
                    type: 'text',
                    label: 'Available From',
                    localized: true,
                    admin: {
                        description: 'Optional period, e.g. "Q3 2026". Rendered as "{label} — {availableFrom}" when present.',
                    },
                },
            ],
        },
        {
            name: 'email',
            type: 'email',
            label: 'Contact Email',
        },
        linkGroup({
            appearances: ['default', 'outline', 'solid', 'outlineGhost', 'send', 'github', 'linkedin'],
        }),
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Background Image',
        },
        SectionConfig,
    ],
}
