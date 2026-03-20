import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'

export const PageSkills: Block = {
    slug: 'pageSkills',
    interfaceName: 'PageSkillsBlock',
    labels: {
        singular: 'Page Skills',
        plural: 'Page Skills',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'Technical Arsenal',
            label: 'Title',
        },
        {
            name: 'subtitle',
            type: 'text',
            label: 'Subtitle',
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
