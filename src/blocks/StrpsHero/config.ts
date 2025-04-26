import { Block } from "payload/types";

export const StrpsHero: Block = {
    slug: 'strpsHero',
    labels: {
        singular: 'Strps Hero',
        plural: 'Strps Heros',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Title',
        },
        {
            name: 'text',
            type: 'text',
            label: 'Text',
        },
    ],
}