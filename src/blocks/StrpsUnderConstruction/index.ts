import { Block } from "payload/types";

export const StrpsUnderConstruction: Block = {
    slug: 'strpsUnderConstruction',
    labels: {
        singular: 'Strps Under Construction',
        plural: 'Strps Under Constructions',
    },
    fields: [
        {
            name: 'text',
            type: 'text',
            label: 'Text',
        },
        {
            name: 'variant',
            type: 'select',
            label: 'Variant',
            options: [
                {
                    label: 'Default',
                    value: 'default',
                },
                {
                    label: 'Minimal',
                    value: 'minimal',
                },
            ],
        }
    ],
}