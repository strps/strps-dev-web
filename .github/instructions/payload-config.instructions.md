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

## After Changes

Run `pnpm payload generate:types` to update `packages/types/payload-types.ts`.
