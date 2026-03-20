import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'

export const PageAbout: Block = {
    slug: 'pageAbout',
    interfaceName: 'PageAboutBlock',
    labels: {
        singular: 'Page About',
        plural: 'Page Abouts',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'About Me',
            label: 'Title',
        },
        {
            name: 'summary',
            type: 'textarea',
            required: true,
            label: 'Summary',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Profile Image',
        },
        SectionConfig,
    ],
}
