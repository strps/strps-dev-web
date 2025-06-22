import { Block } from 'payload'
import { SectionConfig } from '@/fields/section'

export const StrpsMedia: Block = {
  slug: 'strps-media',
  labels: {
    singular: 'Media Gallery',
    plural: 'Media Gallery Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Masonry', value: 'masonry' },
        { label: 'Carousel', value: 'carousel' },
        { label: 'Slideshow', value: 'slideshow' },
      ],
      defaultValue: 'grid',
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Columns',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
      ],
      defaultValue: '3',
      admin: {
        condition: (_, siblingData) => ['grid', 'masonry'].includes(siblingData?.layout || 'grid'),
      },
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Aspect Ratio',
      options: [
        { label: 'Square (1:1)', value: '1/1' },
        { label: 'Portrait (3:4)', value: '3/4' },
        { label: 'Landscape (16:9)', value: '16/9' },
        { label: 'Widescreen (21:9)', value: '21/9' },
        { label: 'Auto (Original)', value: 'auto' },
      ],
      defaultValue: '1/1',
      admin: {
        condition: (_, siblingData) =>
          ['grid', 'carousel', 'slideshow'].includes(siblingData?.layout || 'grid'),
      },
    },
    {
      name: 'gutter',
      type: 'select',
      label: 'Gutter Size',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
      defaultValue: 'md',
    },
    {
      name: 'mediaItems',
      type: 'array',
      label: 'Media Items',
      minRows: 1,
      fields: [
        {
          name: 'type',
          type: 'radio',
          label: 'Media Type',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Vimeo', value: 'vimeo' },
          ],
          defaultValue: 'image',
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData.type === 'image',
          },
        },
        {
          name: 'video',
          type: 'upload',
          label: 'Video File',
          relationTo: 'media',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData.type === 'video',
          },
        },
        {
          name: 'youtubeId',
          type: 'text',
          label: 'YouTube Video ID',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData.type === 'youtube',
            description:
              'The ID of the YouTube video (e.g., "dQw4w9WgXcQ" from https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
          },
        },
        {
          name: 'vimeoId',
          type: 'text',
          label: 'Vimeo Video ID',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData.type === 'vimeo',
            description:
              'The ID of the Vimeo video (e.g., "123456789" from https://vimeo.com/123456789)',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'caption',
          type: 'textarea',
          label: 'Caption',
        },
        {
          name: 'link',
          type: 'group',
          label: 'Link',
          fields: [
            {
              name: 'type',
              type: 'select',
              label: 'Link Type',
              options: [
                { label: 'None', value: 'none' },
                { label: 'URL', value: 'url' },
                { label: 'Lightbox', value: 'lightbox' },
                { label: 'Download', value: 'download' },
              ],
              defaultValue: 'none',
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL',
              admin: {
                condition: (_, siblingData) => siblingData.type === 'url',
              },
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              label: 'Open in new tab',
              defaultValue: false,
              admin: {
                condition: (_, siblingData) =>
                  ['url', 'download'].includes(siblingData?.type || ''),
              },
            },
          ],
        },
      ],
    },
    {
      name: 'displayOptions',
      type: 'group',
      label: 'Display Options',
      fields: [
        {
          name: 'showTitles',
          type: 'checkbox',
          label: 'Show Titles',
          defaultValue: true,
        },
        {
          name: 'showCaptions',
          type: 'checkbox',
          label: 'Show Captions',
          defaultValue: true,
        },
        {
          name: 'showThumbnails',
          type: 'checkbox',
          label: 'Show Thumbnails',
          defaultValue: true,
        },
        {
          name: 'enableLightbox',
          type: 'checkbox',
          label: 'Enable Lightbox',
          defaultValue: true,
        },
        {
          name: 'lazyLoad',
          type: 'checkbox',
          label: 'Lazy Load Images',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'carouselOptions',
      type: 'group',
      label: 'Carousel Options',
      admin: {
        condition: (_, siblingData) =>
          ['carousel', 'slideshow'].includes(siblingData?.layout || ''),
      },
      fields: [
        {
          name: 'autoplay',
          type: 'checkbox',
          label: 'Autoplay',
          defaultValue: true,
        },
        {
          name: 'autoplaySpeed',
          type: 'number',
          label: 'Autoplay Speed (ms)',
          defaultValue: 5000,
          min: 1000,
          max: 10000,
          admin: {
            condition: (_, siblingData) => siblingData.autoplay === true,
          },
        },
        {
          name: 'arrows',
          type: 'checkbox',
          label: 'Show Navigation Arrows',
          defaultValue: true,
        },
        {
          name: 'dots',
          type: 'checkbox',
          label: 'Show Navigation Dots',
          defaultValue: true,
        },
        {
          name: 'infinite',
          type: 'checkbox',
          label: 'Infinite Loop',
          defaultValue: true,
        },
        {
          name: 'slidesToShow',
          type: 'number',
          label: 'Slides to Show',
          defaultValue: 3,
          min: 1,
          max: 10,
          admin: {
            condition: (_, siblingData) => siblingData.layout === 'carousel',
          },
        },
        {
          name: 'slidesToScroll',
          type: 'number',
          label: 'Slides to Scroll',
          defaultValue: 1,
          min: 1,
          max: 10,
          admin: {
            condition: (_, siblingData) => siblingData.layout === 'carousel',
          },
        },
      ],
    },
    {
      name: 'filtering',
      type: 'group',
      label: 'Filtering Options',
      admin: {
        condition: (_, siblingData) => ['grid', 'masonry'].includes(siblingData?.layout || ''),
      },
      fields: [
        {
          name: 'enable',
          type: 'checkbox',
          label: 'Enable Filtering',
          defaultValue: false,
        },
        {
          name: 'position',
          type: 'select',
          label: 'Filter Position',
          options: [
            { label: 'Top', value: 'top' },
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'top',
          admin: {
            condition: (_, siblingData) => siblingData.enable === true,
          },
        },
        {
          name: 'allText',
          type: 'text',
          label: '"All" Filter Text',
          defaultValue: 'All',
          admin: {
            condition: (_, siblingData) => siblingData.enable === true,
          },
        },
      ],
    },
    {
      name: 'pagination',
      type: 'group',
      label: 'Pagination',
      admin: {
        condition: (_, siblingData) => ['grid', 'masonry'].includes(siblingData?.layout || ''),
      },
      fields: [
        {
          name: 'enable',
          type: 'checkbox',
          label: 'Enable Pagination',
          defaultValue: false,
        },
        {
          name: 'itemsPerPage',
          type: 'number',
          label: 'Items Per Page',
          defaultValue: 9,
          min: 1,
          max: 100,
          admin: {
            condition: (_, siblingData) => siblingData.enable === true,
          },
        },
        {
          name: 'loadMore',
          type: 'checkbox',
          label: 'Show "Load More" Button',
          defaultValue: false,
          admin: {
            condition: (_, siblingData) => siblingData.enable === true,
          },
        },
        {
          name: 'loadMoreText',
          type: 'text',
          label: '"Load More" Button Text',
          defaultValue: 'Load More',
          admin: {
            condition: (_, siblingData) =>
              siblingData.enable === true && siblingData.loadMore === true,
          },
        },
      ],
    },
  ],
}

export default StrpsMedia
