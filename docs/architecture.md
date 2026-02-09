# Project Architecture Overview

## Key Concepts

- **Blocks**: Dynamic components defined in Payload CMS, rendered in the frontend.
- **Schemas**: Define the structure and fields of a block in Payload.
- **React Components**: Render block data with Tailwind and props from CMS.
- **Types**: Ensure props are validated and safely typed.
- **Registry**: All blocks are exported through a central `blocks/index.ts`.

## Example Flow

1. CMS user adds a "Hero Block".
2. Frontend renders the `HeroBlock` component.
3. The system knows how to map schema data → typed props → visual block.

## Core Architecture

STRPS follows a modern web application architecture with a clear separation of concerns between the frontend and backend:

```
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js Frontend                          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐  │
│  │  App Router │    │  Components  │    │  Server Actions │  │
│  └─────────────┘    └─────────────┘    └─────────────────┘  │
│         │                  │                       │         │
│         ▼                  ▼                       ▼         │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                  React Query Cache                     │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PayloadCMS Backend                         │
│  ┌─────────────────┐    ┌──────────────────┐    ┌───────────┐  │
│  │  REST/GraphQL   │◄───┤  Authentication  │    │  Plugins  │  │
│  └─────────────────┘    └──────────────────┘    └───────────┘  │
│         │                                                     │
│         ▼                                                     │
│  ┌─────────────────┐    ┌──────────────────┐    ┌───────────┐  │
│  │  Collections    │    │  Uploads         │    │  Hooks    │  │
│  └─────────────────┘    └──────────────────┘    └───────────┘  │
│         │                                                     │
│         ▼                                                     │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                     Database (PostgreSQL)              │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Key Architectural Principles

1. **Component-Based Architecture**
   - Reusable, self-contained components
   - Clear separation of concerns
   - Composition over inheritance

2. **Type Safety**
   - Full TypeScript support throughout the stack
   - Shared types between frontend and backend
   - Runtime type validation with Zod

3. **Performance**
   - Server Components for optimal performance
   - Code splitting and lazy loading
   - Image optimization with Next.js Image

4. **Security**
   - Server-side validation of all inputs
   - CSRF protection
   - Rate limiting on authentication endpoints
   - Secure headers and CORS policies

## Data Flow

1. **Content Management**
   - Content editors use PayloadCMS admin panel
   - Content is stored in PostgreSQL
   - Media files are stored in Vercel Blob Storage

2. **Frontend Rendering**
   - Pages are server-rendered with Next.js
   - Dynamic data is fetched at request time
   - Client-side navigation with React Query for data fetching

3. **Authentication**
   - JWT-based authentication
   - HTTP-only cookies for secure token storage
   - Role-based access control

## Environment Configuration

Configuration is managed through environment variables with sensible defaults. See `.env.example` for required variables.

## Testing Strategy

- **Unit Tests**: Jest for individual components and utilities
- **Integration Tests**: Testing Library for component interactions
- **E2E Tests**: Playwright for full user flows
- **Visual Regression**: Chromatic for component visual testing

## Performance Considerations

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Efficient data fetching with React Query
- Static generation where possible
- Edge caching for improved response times
