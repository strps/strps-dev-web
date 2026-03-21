import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'

export const PageBlog: Block = {
    slug: 'pageBlog',
    interfaceName: 'PageBlogBlock',
    labels: {
        singular: 'Page Blog',
        plural: 'Page Blogs',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'Latest Articles',
            label: 'Title',
        },
        {
            name: 'populateBy',
            type: 'select',
            defaultValue: 'collection',
            options: [
                { label: 'Collection', value: 'collection' },
                { label: 'Manual Selection', value: 'selection' },
            ],
        },
        {
            name: 'limit',
            type: 'number',
            defaultValue: 6,
            admin: {
                condition: (_, { populateBy } = {}) => populateBy === 'collection',
            },
        },
        {
            name: 'selectedPosts',
            type: 'relationship',
            relationTo: 'posts',
            hasMany: true,
            admin: {
                condition: (_, { populateBy } = {}) => populateBy === 'selection',
            },
        },
        {
            name: 'blogUrl',
            type: 'text',
            label: 'Blog Page URL',
            defaultValue: '/blog',
        },
        SectionConfig,
    ],
}
