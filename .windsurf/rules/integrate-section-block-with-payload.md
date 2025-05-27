---
trigger: manual
---

When integrating a new block into PayloadCMS please follow the following:

1. Import and Register the Block
In RenderBlocks.tsx:
Import your block's component at the top:
typescript
CopyInsert
import { YourBlockComponent } from './YourBlock/Component'
Add it to the blockComponents object with the block's slug as the key:
typescript
CopyInsert
const blockComponents = {
  // ... other blocks
  'your-block-slug': YourBlockComponent,
}
2. Add to Collection Configuration
In the appropriate collection (e.g., src/collections/Pages/index.ts):
Import your block's config:
typescript
CopyInsert
import { YourBlockConfig } from '@/blocks/YourBlock/config'
Add it to the blocks array in the collection's field configuration:
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
3. TypeScript Types (if using)
In src/payload-types.ts:
Regenerate types after adding the block:
bash
CopyInsert in Terminal
pnpm payload generate:types
4. Verification
Restart your development server
Navigate to a page in the admin panel
Add a new block - your block should appear in the list
Example Prompt
"Help me integrate a new block called 'Testimonial' into my PayloadCMS project. The block has already been created with the following structure:

/src/blocks/Testimonial/Component.tsx
/src/blocks/Testimonial/config.ts
/src/blocks/Testimonial/index.ts
Please update the necessary files to make this block available in the Pages collection."

This structure ensures the block is properly registered in both the frontend rendering and the admin interface.

Feedback submitted