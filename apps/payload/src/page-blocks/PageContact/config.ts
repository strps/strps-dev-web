import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'
import { linkGroup } from '@/fields/linkGroup'
import { eyebrowField } from '@/fields/eyebrow'

export const PageContact: Block = {
    slug: 'pageContact',
    interfaceName: 'PageContactBlock',
    labels: {
        singular: 'Page Contact',
        plural: 'Page Contacts',
    },
    fields: [
        eyebrowField,
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'Ready to build something great?',
            label: 'Title',
            localized: true,
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            localized: true,
        },
        {
            name: 'email',
            type: 'email',
            label: 'Contact Email',
        },
        {
            name: 'emailLabel',
            type: 'text',
            label: 'Email Label',
            localized: true,
            admin: {
                description: 'The line above the mailto, e.g. "Prefer email?"',
            },
        },
        {
            name: 'note',
            type: 'text',
            label: 'Note',
            localized: true,
            admin: {
                description: 'The reply promise shown near the form, e.g. "I reply within one business day".',
            },
        },
        {
            name: 'form',
            type: 'relationship',
            relationTo: 'forms',
            label: 'Form',
            admin: {
                description: 'Renders in the right column when set.',
            },
        },
        linkGroup({
            appearances: ['default', 'outline'],
        }),
        SectionConfig,
    ],
}
