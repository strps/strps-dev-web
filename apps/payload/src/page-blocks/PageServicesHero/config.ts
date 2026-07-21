import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'
import { linkGroup } from '@/fields/linkGroup'

export const PageServicesHero: Block = {
    slug: 'pageServicesHero',
    interfaceName: 'PageServicesHeroBlock',
    labels: {
        singular: 'Services Hero',
        plural: 'Services Heroes',
    },
    fields: [
        {
            name: 'eyebrow',
            type: 'text',
            label: 'Eyebrow',
            admin: {
                description: 'Small label above the title, e.g. "Freelance web development"',
            },
        },
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
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
                },
            ],
        },
        linkGroup({
            appearances: ['default', 'outline', 'send', 'github', 'linkedin'],
        }),
        {
            name: 'highlights',
            type: 'array',
            label: 'Highlights',
            admin: {
                description: 'Short trust points shown under the CTAs, e.g. "You work directly with the developer"',
            },
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Background Image',
        },
        SectionConfig,
    ],
}
