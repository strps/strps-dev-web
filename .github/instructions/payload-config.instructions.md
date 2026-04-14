---
description: "Use when creating or modifying PayloadCMS collection configs, block configs, global configs, or field definitions. Covers Payload v3 API patterns, field types, hooks, and access control."
applyTo: "apps/payload/src/collections/**,apps/payload/src/blocks/**/config.ts,apps/payload/src/globals/**"
---

# PayloadCMS Configuration Patterns

## Payload v3 API

- Import types from `payload` (not `payload/types`)
- Use `import type { CollectionConfig, GlobalConfig, Block, Field }` from `payload`
- Access control functions receive `({ req: { user } })` parameter

## Field Patterns

```typescript
// Rich text with Lexical (default editor)
{ name: 'content', type: 'richText' }

// Relationship
{ name: 'author', type: 'relationship', relationTo: 'users' }

// Upload (media)
{ name: 'image', type: 'upload', relationTo: 'media' }

// Localized field
{ name: 'title', type: 'text', localized: true }
```

## Predefined Fields

Always use these shared field helpers instead of defining equivalent fields from scratch.

### `link` — Single link (internal reference or custom URL)

```typescript
import { link } from '@/fields/link'

// Default (internal + custom URL, with appearance options)
link()

// Without appearance buttons
link({ appearances: false })

// Only specific appearances
link({ appearances: ['default', 'outline'] })

// Without label field
link({ disableLabel: true })

// Merge extra GroupField properties
link({ overrides: { label: 'CTA Link' } })
```

### `linkGroup` — Array of links

```typescript
import { linkGroup } from '@/fields/linkGroup'

linkGroup()
linkGroup({ appearances: false, overrides: { label: 'Navigation Links' } })
```

### `slugField` — Slug + lock checkbox pair

```typescript
import { slugField } from '@/fields/slug'

// Returns [TextField, CheckboxField] — spread into fields array
...slugField('title')

// Override the source field (default: 'title')
...slugField('name')
```

### `SectionConfig` — Reusable section wrapper settings

Provides `container`, `section_id`, `backgroundContainer`, `theme`, `background`, and `backgroundImage` fields.

```typescript
import { SectionConfig } from '@/fields/section'

fields: [SectionConfig, ...]
```

### `theme` — Theme select field

```typescript
import { theme } from '@/fields/theme'

theme()            // default: 'auto'
theme('dark')      // preset default value: 'auto' | 'light' | 'dark' | 'inverted'
```

### `lucideIcon` — Icon picker select field

Pre-populated with a curated set of Lucide icon names.

```typescript
import { lucideIcon } from '@/fields/lucideIcon'

fields: [lucideIcon]
```

## After Changes

Run `pnpm payload generate:types` to update `packages/types/payload-types.ts`.
