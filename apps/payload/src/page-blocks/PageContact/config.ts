import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'
import { linkGroup } from '@/fields/linkGroup'

export const PageContact: Block = {
    slug: 'pageContact',
    interfaceName: 'PageContactBlock',
    labels: {
        singular: 'Page Contact',
        plural: 'Page Contacts',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'Ready to build something great?',
            label: 'Title',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
        },
        {
            name: 'email',
            type: 'email',
            label: 'Contact Email',
        },
        linkGroup({
            appearances: ['default', 'outline'],
        }),
        SectionConfig,
    ],
}
