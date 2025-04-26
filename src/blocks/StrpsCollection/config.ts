import { Block } from "payload/types";

export const StrpsCollection: Block = {
    slug: 'strpsCollection',
    labels: {
        singular: 'Strps Collection Block',
        plural: 'Strps Collection Blocks',
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