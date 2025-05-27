---
trigger: manual
---

PayloadCMS Block Creation and Integration Guide

1. Create Block Files
File Structure
CopyInsert
/src/blocks/YourBlockName/
  ├── Component.tsx    # React component
  ├── config.ts        # Payload block configuration
  └── types.ts         # TypeScript types (optional)
2. Create Block Files

config.ts
typescript
CopyInsert
import { Block } from 'payload/types'
import { SectionConfig } from '@/components/Section/config'

export const YourBlockConfig: Block = {
  slug: '<yourBlockSlug>',  // Must be unique
  interfaceName: '<YourBlockSlug>Block', //According to your slug
  labels: {
    singular: 'Your Block',
    plural: 'Your Blocks',
  },
  fields: [
    // Define your fields here

    //Heres is the Section field, that allows to add the Section compomnent
    SectionConfig,

    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    // Add more fields as needed
  ],
  // Optional: Add custom admin description
  admin: {
    description: 'A custom block for displaying...',
  },
}

Component.tsx
typescript
CopyInsert
import React from 'react'
import { <YourBlockSlug>Block } from '@/payload-types'

export type Props = {
  title?: string
  description?: string
  // Add other props that match your config
}

export const YourBlockComponent: React.FC<BlockProps<'your-block-slug'>> = (props) => {
  const { title, description, section } = props

  return (
    <Section ...section>
      <div className="your-block">
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
        {/* Add more JSX as needed, use shadcn components if needed */}
      </div>
    </Section>
  )
}

Import your component:

import { YourBlockComponent } from './YourBlock/Component'
Add to blockComponents:
typescript
CopyInsert
const blockComponents = {
  // ... other blocks
  'your-block-slug': YourBlockComponent,
}
In your collection (e.g., src/collections/Pages/index.ts):
Import your block config:
typescript
CopyInsert
import { YourBlockConfig } from '@/blocks/YourBlock/config'
Add to blocks array:
typescript
CopyInsert
{
  name: 'layout',
  type: 'blocks',
  blocks: [
    // ... other blocks
    YourBlockConfig,
  ]
}

4. Regenerate Types

bash
CopyInsert in Terminal
pnpm payload generate:types

5. Example Prompt
"Help me create a new 'Testimonial' block with the following fields:

Name (text, required)
Role (text)
Company (text)
Quote (rich text)
Rating (number 1-5)
Avatar (image, optional)
The block should be styled as a card with the avatar on the left and the quote on the right, with the name and role below. Please generate all necessary files and integrate it into my PayloadCMS project."

Best Practices
Keep component logic separate from presentation
Use TypeScript for type safety
Add proper error boundaries
Include loading states
Make it responsive
Add PropTypes or TypeScript interfaces
Document props and usage
Include ARIA labels for accessibility
Common Field Types
Text: { type: 'text' }
Rich Text: { type: 'richText' }
Number: { type: 'number' }
Select: { type: 'select', options: [...] }
Relationship: { type: 'relationship', relationTo: 'collection-name' }
Upload: { type: 'upload', relationTo: 'media' }
Array: { type: 'array', fields: [...] }