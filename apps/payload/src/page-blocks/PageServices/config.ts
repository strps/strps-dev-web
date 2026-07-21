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
        },
        {
            name: 'intro',
            type: 'textarea',
            label: 'Section Intro',
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
                },
                {
                    name: 'forWho',
                    type: 'textarea',
                    label: 'For',
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
                        },
                    ],
                },
                {
                    name: 'timeline',
                    type: 'text',
                    label: 'Typical Timeline',
                },
                {
                    name: 'pricing',
                    type: 'text',
                    label: 'Pricing',
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
                        },
                    ],
                },
                {
                    name: 'proofLabel',
                    type: 'text',
                    label: 'Proof Link Label',
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
