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
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'How I Work',
            label: 'Title',
        },
        {
            name: 'intro',
            type: 'textarea',
            label: 'Section Intro',
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
                },
                {
                    name: 'description',
                    type: 'textarea',
                    required: true,
                    label: 'Step Description',
                },
            ],
        },
        SectionConfig,
    ],
}
