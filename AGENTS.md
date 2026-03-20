# STRPS Website Platform — Project Guidelines

## Overview

STRPS is a monorepo website platform with multiple apps and shared packages. All apps use TypeScript, React 19, and Tailwind CSS 4.

## Monorepo Structure

```
apps/
  payload/          # PayloadCMS 3.x backend + admin (Next.js 16, port 3000)
  frontend/         # Public-facing frontend (Next.js 16, Apollo GraphQL client)
  medusa-store/     # Medusa e-commerce backend
  medusa-store-storefront/  # Storefront frontend
packages/
  types/            # Shared PayloadCMS types (@strps-website/types)
docs/               # Internal documentation
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Server Components) |
| CMS | PayloadCMS 3.x with Lexical editor |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 + PostCSS |
| Database | PostgreSQL (local) / Vercel Postgres (production) |
| Media | Vercel Blob Storage |
| Email | Resend |
| Animation | Motion (framer-motion successor) |
| Icons | Lucide React |
| UI Components | shadcn/ui |
| Monorepo | pnpm workspaces + Turborepo |
| Localization | English (en) + Spanish (es) |

## Build & Dev Commands

```bash
# Root (all apps)
pnpm dev              # Start all apps in dev mode
pnpm build            # Build all apps

# Payload app
cd apps/payload
pnpm dev              # Dev server with Turbopack
pnpm build            # Production build + sitemap
pnpm payload generate:types  # Regenerate types → packages/types/payload-types.ts

# Frontend app
cd apps/frontend
pnpm dev              # Dev server
pnpm build            # Production build
```

## Code Conventions

### General
- Use `'use client'` directive only when the component needs client-side interactivity
- Prefer Server Components by default
- Use absolute imports with `@/` prefix (maps to `src/`)
- Types are shared via `@strps-website/types` package — run `pnpm payload generate:types` after schema changes

### PayloadCMS (apps/payload)
- **Legacy blocks** live in `src/blocks/<BlockName>/` with `config.ts` (schema) and `Component.tsx` (render) — being phased out
- **Page blocks** (new) live in `src/page-blocks/<BlockName>/config.ts` — schema only, rendering is in the frontend
- **Collections** live in `src/collections/` — export from `src/collections/index.ts`
- **Globals** live in `src/globals/` (footer, header, blog, copyright, projects)
- **Components** live in `src/components/` — UI primitives in `src/components/ui/`
- Block slugs use camelCase: `pageHero`, `pageAbout`, `pageSkills`
- Block interface names use PascalCase with `Block` suffix: `PageHeroBlock`
- Register new page-blocks in the collection's `blocks` array (import from `@/page-blocks`)
- Section component wraps most blocks — import `SectionConfig` from `@/fields/section`

### Frontend (apps/frontend)
- Fetches data from Payload via Apollo GraphQL client (`@apollo/client-integration-nextjs`)
- Uses `@payloadcms/live-preview-react` for live preview
- Page section components in `src/components/page-sections/` render CMS page-blocks
- `RenderBlocks` component maps block types to section components
- GraphQL queries/fragments for blocks in `src/lib/queries/page-blocks.ts`
- Shared types from `@strps-website/types`

### Styling
- Tailwind CSS 4 — use utility classes, avoid custom CSS where possible
- Use shadcn/ui components from `src/components/ui/`
- Responsive design: mobile-first approach
- Support dark mode via Tailwind's dark: variant

## Key Files

- Payload config: `apps/payload/src/payload.config.ts`
- Shared types: `packages/types/payload-types.ts`
- Block renderer: `apps/frontend/src/components/RenderBlocks.tsx`
- Block queries: `apps/frontend/src/lib/queries/page-blocks.ts`
- Page block configs: `apps/payload/src/page-blocks/index.ts`
- Turbo pipeline: `turbo.json`

## Documentation

- [Architecture](docs/architecture.md) — system design and data flow
- [Creating Blocks](docs/creating-blocks.md) — block development guide
- [Components](docs/COMPONENTS.md) — component status and specs
- [Deployment](docs/deployment.md) — environment setup and deploy process
- [Roadmap](docs/ROADMAP.md) — project phases and progress
