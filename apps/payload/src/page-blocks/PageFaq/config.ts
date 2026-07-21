import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'

export const PageFaq: Block = {
    slug: 'pageFaq',
    interfaceName: 'PageFaqBlock',
    labels: {
        singular: 'Page FAQ',
        plural: 'Page FAQ',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'FAQ',
            label: 'Title',
        },
        {
            name: 'intro',
            type: 'textarea',
            label: 'Section Intro',
        },
        {
            name: 'questions',
            type: 'array',
            label: 'Questions',
            minRows: 1,
            fields: [
                {
                    name: 'question',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'answer',
                    type: 'textarea',
                    required: true,
                },
            ],
        },
        SectionConfig,
    ],
}
