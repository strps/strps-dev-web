import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'
import { eyebrowField } from '@/fields/eyebrow'

export const PageSkills: Block = {
    slug: 'pageSkills',
    interfaceName: 'PageSkillsBlock',
    labels: {
        singular: 'Page Skills',
        plural: 'Page Skills',
    },
    fields: [
        eyebrowField,
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'Technical Arsenal',
            label: 'Title',
            localized: true,
        },
        {
            name: 'variant',
            type: 'select',
            defaultValue: 'cards',
            options: [
                { label: 'Cards', value: 'cards' },
                { label: 'List (mockup)', value: 'list' },
            ],
        },
        {
            name: 'subtitle',
            type: 'text',
            label: 'Subtitle',
            localized: true,
        },
        {
            name: 'skillGroups',
            type: 'array',
            label: 'Skill Groups',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    label: 'Group Name',
                    localized: true,
                },
                {
                    name: 'icon',
                    type: 'text',
                    label: 'Icon Name (Lucide)',
                    admin: {
                        description: 'Lucide icon name, e.g. Terminal, Server, Cpu, Wrench',
                    },
                },
                {
                    name: 'keywords',
                    type: 'array',
                    label: 'Skills',
                    fields: [
                        {
                            name: 'keyword',
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
