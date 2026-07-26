import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'

export const PageServices: Block = {
    slug: 'pageServices',
    interfaceName: 'PageServicesBlock',
    labels: {
        singular: 'Page Services',
        plural: 'Page Services',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'Services',
            label: 'Title',
            localized: true,
        },
        {
            name: 'intro',
            type: 'textarea',
            label: 'Section Intro',
            localized: true,
        },
        {
            name: 'services',
            type: 'array',
            label: 'Service Items',
            minRows: 1,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    label: 'Service Name',
                    localized: true,
                },
                {
                    name: 'forWho',
                    type: 'textarea',
                    label: 'For',
                    localized: true,
                },
                {
                    name: 'features',
                    type: 'array',
                    label: 'What You Get',
                    fields: [
                        {
                            name: 'feature',
                            type: 'text',
                            required: true,
                            localized: true,
                        },
                    ],
                },
                {
                    name: 'timeline',
                    type: 'text',
                    label: 'Typical Timeline',
                    localized: true,
                },
                {
                    name: 'pricing',
                    type: 'text',
                    label: 'Pricing',
                    localized: true,
                    admin: {
                        description: 'Free text, e.g. "From $800" or "$45/hr" — placeholder values, edit precisely later.',
                    },
                },
                {
                    name: 'goodFitPoints',
                    type: 'array',
                    label: 'Good Fit If...',
                    fields: [
                        {
                            name: 'point',
                            type: 'text',
                            required: true,
                            localized: true,
                        },
                    ],
                },
                {
                    name: 'proofLabel',
                    type: 'text',
                    label: 'Proof Link Label',
                    localized: true,
                    admin: {
                        description: 'Optional, e.g. "See TrackBit"',
                    },
                },
                {
                    name: 'proofUrl',
                    type: 'text',
                    label: 'Proof Link URL',
                    admin: {
                        description: 'Optional, e.g. /projects/trackbit',
                        condition: (_, { proofLabel } = {}) => !!proofLabel,
                    },
                },
            ],
        },
        SectionConfig,
    ],
}
