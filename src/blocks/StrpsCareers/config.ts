import { Block } from 'payload/types'

export const StrpsCareers: Block = {
  slug: 'strps-careers',
  labels: {
    singular: 'Careers',
    plural: 'Careers Blocks',
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
        { label: 'List', value: 'list' },
      ],
      defaultValue: 'grid',
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Columns',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
      ],
      defaultValue: '2',
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'grid',
      },
    },
    {
      name: 'showFilters',
      type: 'checkbox',
      label: 'Show Filters',
      defaultValue: true,
    },
    {
      name: 'filters',
      type: 'array',
      label: 'Available Filters',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Filter Type',
          options: [
            { label: 'Department', value: 'department' },
            { label: 'Location', value: 'location' },
            { label: 'Job Type', value: 'jobType' },
            { label: 'Experience Level', value: 'experience' },
          ],
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.showFilters === true,
      },
    },
    {
      name: 'defaultFilters',
      type: 'group',
      label: 'Default Filters',
      fields: [
        {
          name: 'department',
          type: 'text',
          label: 'Default Department',
        },
        {
          name: 'location',
          type: 'text',
          label: 'Default Location',
        },
        {
          name: 'jobType',
          type: 'select',
          label: 'Default Job Type',
          options: [
            { label: 'All Types', value: '' },
            { label: 'Full-time', value: 'full-time' },
            { label: 'Part-time', value: 'part-time' },
            { label: 'Contract', value: 'contract' },
            { label: 'Internship', value: 'internship' },
            { label: 'Temporary', value: 'temporary' },
          ],
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.showFilters === true,
      },
    },
    {
      name: 'showSearch',
      type: 'checkbox',
      label: 'Show Search',
      defaultValue: true,
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      label: 'Search Placeholder',
      defaultValue: 'Search jobs...',
      admin: {
        condition: (_, siblingData) => siblingData?.showSearch === true,
      },
    },
    {
      name: 'showCategories',
      type: 'checkbox',
      label: 'Show Job Categories',
      defaultValue: true,
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Job Categories',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Category Name',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          label: 'URL Slug',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'icon',
          type: 'upload',
          label: 'Icon',
          relationTo: 'media',
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.showCategories === true,
      },
    },
    {
      name: 'showFeatured',
      type: 'checkbox',
      label: 'Show Featured Jobs Section',
      defaultValue: true,
    },
    {
      name: 'featuredTitle',
      type: 'text',
      label: 'Featured Jobs Title',
      defaultValue: 'Featured Positions',
      admin: {
        condition: (_, siblingData) => siblingData?.showFeatured === true,
      },
    },
    {
      name: 'showBenefits',
      type: 'checkbox',
      label: 'Show Benefits Section',
      defaultValue: true,
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Benefit Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'icon',
          type: 'upload',
          label: 'Icon',
          relationTo: 'media',
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.showBenefits === true,
      },
    },
    {
      name: 'showApplicationForm',
      type: 'checkbox',
      label: 'Show Application Form',
      defaultValue: true,
    },
    {
      name: 'applicationForm',
      type: 'group',
      label: 'Application Form Settings',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Form Title',
          defaultValue: 'Apply for this position',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Form Description',
        },
        {
          name: 'submitButtonText',
          type: 'text',
          label: 'Submit Button Text',
          defaultValue: 'Submit Application',
        },
        {
          name: 'successMessage',
          type: 'textarea',
          label: 'Success Message',
          defaultValue:
            'Thank you for your application! We will review your information and get back to you soon.',
        },
        {
          name: 'fields',
          type: 'array',
          label: 'Form Fields',
          fields: [
            {
              name: 'type',
              type: 'select',
              label: 'Field Type',
              options: [
                { label: 'Text', value: 'text' },
                { label: 'Email', value: 'email' },
                { label: 'Phone', value: 'tel' },
                { label: 'Textarea', value: 'textarea' },
                { label: 'Select', value: 'select' },
                { label: 'Checkbox', value: 'checkbox' },
                { label: 'File Upload', value: 'file' },
                { label: 'Hidden', value: 'hidden' },
              ],
              required: true,
            },
            {
              name: 'name',
              type: 'text',
              label: 'Field Name',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Field Label',
              required: true,
            },
            {
              name: 'placeholder',
              type: 'text',
              label: 'Placeholder Text',
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Required',
              defaultValue: false,
            },
            {
              name: 'options',
              type: 'array',
              label: 'Options (for select/radio/checkbox)',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Option Label',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'Option Value',
                  required: true,
                },
              ],
              admin: {
                condition: (_, siblingData) =>
                  ['select', 'checkbox', 'radio'].includes(siblingData?.type || ''),
              },
            },
            {
              name: 'accept',
              type: 'text',
              label: 'Accepted File Types (e.g., .pdf,.doc,.docx)',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'file',
              },
            },
            {
              name: 'maxFileSize',
              type: 'number',
              label: 'Max File Size (MB)',
              defaultValue: 5,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'file',
              },
            },
          ],
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.showApplicationForm === true,
      },
    },
    {
      name: 'showContact',
      type: 'checkbox',
      label: 'Show Contact Information',
      defaultValue: true,
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Contact Email',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Contact Phone',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Office Address',
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.showContact === true,
      },
    },
    {
      name: 'showSocial',
      type: 'checkbox',
      label: 'Show Social Media Links',
      defaultValue: true,
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platform',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'GitHub', value: 'github' },
            { label: 'Other', value: 'other' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.showSocial === true,
      },
    },
  ],
}

export default StrpsCareers
