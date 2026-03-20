import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'

export const PageExperience: Block = {
    slug: 'pageExperience',
    interfaceName: 'PageExperienceBlock',
    labels: {
        singular: 'Page Experience',
        plural: 'Page Experiences',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'Professional History',
            label: 'Title',
        },
        {
            name: 'positions',
            type: 'array',
            label: 'Positions',
            fields: [
                {
                    name: 'company',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'position',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'startDate',
                    type: 'text',
                    required: true,
                    label: 'Start Date',
                },
                {
                    name: 'endDate',
                    type: 'text',
                    label: 'End Date',
                    admin: {
                        description: 'Leave empty for "Present"',
                    },
                },
                {
                    name: 'summary',
                    type: 'textarea',
                },
                {
                    name: 'highlights',
                    type: 'array',
                    label: 'Highlights',
                    fields: [
                        {
                            name: 'highlight',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
            ],
        },
        SectionConfig,
    ],
}
