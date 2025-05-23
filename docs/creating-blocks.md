# Creating Content Blocks

## Overview

STRPS uses a block-based architecture for building flexible, reusable content components. Each block is a self-contained unit that includes its own schema, React component, and types.

## Block Structure

Each block should follow this directory structure:

```
blocks/
└── BlockName/               # Block name in PascalCase
    ├── BlockName.tsx        # React component
    ├── schema.ts            # Payload block schema
    ├── types.ts             # TypeScript types and interfaces
    ├── index.ts             # Exports schema and component
    └── README.md            # Block documentation (optional)
```

## Creating a New Block

### 1. Set Up the Block Directory

```bash
mkdir -p src/blocks/YourBlockName
cd src/blocks/YourBlockName
```

### 2. Create the Schema

Create `schema.ts` to define your block's data structure:

```typescript
import { Block } from 'payload/types';

export const YourBlock: Block = {
  slug: 'yourBlock',
  labels: {
    singular: 'Your Block',
    plural: 'Your Blocks',
  },
  fields: [
    // Define your fields here
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // Add more fields as needed
  ],
};
```

### 3. Create the Component

Create `YourBlock.tsx` for the React component:

```tsx
'use client';

import React from 'react';
import { YourBlockType } from './types';

export const YourBlock: React.FC<YourBlockType> = (props) => {
  const { title } = props;
  
  return (
    <div className="your-block">
      <h2>{title}</h2>
      {/* Add your component JSX */}
    </div>
  );
};
```

### 4. Define Types

Create `types.ts` for TypeScript types:

```typescript
export interface YourBlockType {
  title: string;
  // Add other props as needed
}
```

### 5. Export the Block

Create `index.ts` to export your block:

```typescript
export { YourBlock } from './YourBlock';
export { YourBlock as schema } from './schema';
```

### 6. Register the Block

Update `src/blocks/index.ts` to include your new block:

```typescript
export * from './YourBlock';
```

## Block Development Guidelines

### Required Files

- `schema.ts`: Payload block configuration
- `Component.tsx`: React component
- `types.ts`: TypeScript types
- `index.ts`: Exports

### Naming Conventions

- Use PascalCase for component and type names
- Use camelCase for file names (except for components which should be PascalCase)
- Use kebab-case for CSS classes

### Styling

- Use Tailwind CSS for styling
- Prefix block classes with the block name to avoid conflicts
- Use CSS variables for theme-specific values

## Block Completion Checklist

### Schema
- [ ] Unique `slug` defined
- [ ] Clear labels and descriptions
- [ ] Proper field types and validation
- [ ] Default values where appropriate

### Component
- [ ] Responsive design
- [ ] Accessible markup (ARIA, keyboard nav, etc.)
- [ ] Error boundaries for data loading
- [ ] Loading states
- [ ] Proper TypeScript types

### Testing
- [ ] Unit tests for component logic
- [ ] Storybook story for visual testing
- [ ] Responsive testing
- [ ] Accessibility testing