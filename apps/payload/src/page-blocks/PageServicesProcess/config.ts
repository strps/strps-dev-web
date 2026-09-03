import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'
import { eyebrowField } from '@/fields/eyebrow'
import { link } from '@/fields/link'

/**
 * The services teaser and the process strip fused into one block.
 *
 * On the home page these two always ran back to back — numbered service rows,
 * then the four-step strip — as two sibling sections with their own padding,
 * their own `section_id`, and their own claim on the particle stage. Editing
 * them meant keeping two blocks in sync; rendering them meant a seam between
 * two `<section>`s that were visually one unit. This block is that unit: one
 * header, the rows, and the strip underneath, sharing a single SectionConfig.
 *
 * `pageServicesTeaser` and `pageProcess` are deliberately kept — they still
 * serve pages that need only one of the two (the services page uses the full
 * process variant on its own).
 */
export const PageServicesProcess: Block = {
    slug: 'pageServicesProcess',
    interfaceName: 'PageServicesProcessBlock',
    labels: {
        singular: 'Services + Process',
        plural: 'Services + Process',
    },
    fields: [
        eyebrowField,
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
            localized: true,
        },
        link({
            required: false,
            overrides: {
                admin: {
                    description: 'Action link, e.g. "Full details →" to /services.',
                },
            },
        }),
        {
            // `rows`, not `items` as on `pageServicesTeaser`: Payload derives
            // Postgres identifiers from the slug plus the field path, and this
            // block's longer slug pushes
            // `enum__pages_v_blocks_page_services_process_items_link_appearance`
            // one character past Postgres' 63-character cap. `rows` fits, and
            // matches what the field has always been labeled.
            name: 'rows',
            type: 'array',
            label: 'Service Rows',
            minRows: 1,
            admin: {
                description: 'Rows are numbered automatically from their position (01, 02, 03) — do not store the number.',
            },
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    label: 'Name',
                    localized: true,
                },
                {
                    name: 'summary',
                    type: 'text',
                    label: 'Summary',
                    localized: true,
                    admin: {
                        description: 'One line, roughly 48 characters or fewer.',
                    },
                },
                link({
                    required: false,
                    overrides: {
                        admin: {
                            description: 'Row link, e.g. "Learn more" to /services#01.',
                        },
                    },
                }),
            ],
        },
        {
            name: 'process',
            type: 'group',
            label: 'Process Strip',
            admin: {
                description: 'The hairline step strip rendered under the service rows. Leave the steps empty to drop the strip entirely.',
            },
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    label: 'Strip Label',
                    localized: true,
                    admin: {
                        description: 'Optional mono label above the strip, e.g. "How I work". Omitted when empty.',
                    },
                },
                {
                    name: 'steps',
                    type: 'array',
                    label: 'Steps',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            required: true,
                            label: 'Step Title',
                            localized: true,
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                            required: true,
                            label: 'Step Description',
                            localized: true,
                        },
                    ],
                },
            ],
        },
        SectionConfig,
    ],
}
