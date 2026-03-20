import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'
import { linkGroup } from '@/fields/linkGroup'

export const PageHero: Block = {
    slug: 'pageHero',
    interfaceName: 'PageHeroBlock',
    labels: {
        singular: 'Page Hero',
        plural: 'Page Heroes',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Name',
        },
        {
            name: 'label',
            type: 'text',
            label: 'Label / Subtitle',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
        },
        {
            name: 'location',
            type: 'group',
            label: 'Location',
            fields: [
                {
                    name: 'city',
                    type: 'text',
                },
                {
                    name: 'region',
                    type: 'text',
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
                },
            ],
        },
        {
            name: 'email',
            type: 'email',
            label: 'Contact Email',
        },
        linkGroup({
            appearances: ['default', 'outline'],
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
