# STRPS Website Platform

A modern monorepo website platform built with Next.js 16, PayloadCMS 3, and TypeScript.

## Tech Stack

- **Frontend**: Next.js 16 (App Router, Server Components), React 19, Tailwind CSS 4
- **CMS**: PayloadCMS 3 with Lexical editor
- **Database**: PostgreSQL / Vercel Postgres
- **Media**: Vercel Blob Storage
- **Email**: Resend
- **UI**: shadcn/ui, Lucide React, Motion
- **Monorepo**: pnpm workspaces + Turborepo
- **Localization**: English + Spanish

## Project Structure

```
apps/
  payload/                  # PayloadCMS backend + admin panel
  frontend/                 # Public-facing Next.js frontend
  medusa-store/             # Medusa e-commerce backend
  medusa-store-storefront/  # E-commerce storefront
packages/
  types/                    # Shared PayloadCMS types
docs/                       # Internal documentation
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL (local) or Neon/Vercel Postgres account

### Setup

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp apps/payload/.env.example apps/payload/.env
# Edit .env with your database URL, Payload secret, etc.

# Start all apps in development
pnpm dev
```

### Key Commands

```bash
pnpm dev                    # Start all apps
pnpm build                  # Build all apps

# Payload-specific
cd apps/payload
pnpm payload generate:types # Regenerate shared types
pnpm payload migrate:create # Create a new migration
```

## Apps

### Payload (`apps/payload`)

PayloadCMS 3 backend with admin panel. Handles content modeling, media management, and API.

- **Blocks**: 18 content blocks (Hero, Services, Stats, Contact, etc.)
- **Collections**: Pages, Posts, Projects, Media, Users, Tags
- **Globals**: Header, Footer, Blog, Projects, Copyright
- **Live Preview**: Mobile, tablet, and desktop breakpoints

### Frontend (`apps/frontend`)

Public-facing website built with Next.js 16. Fetches data from Payload via Apollo GraphQL.

- Server Components by default
- Live preview support for CMS editors
- Blog, projects, and dynamic page rendering

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](docs/architecture.md) | System design, data flow, key principles |
| [Creating Blocks](docs/creating-blocks.md) | Guide to building new PayloadCMS blocks |
| [Components](docs/COMPONENTS.md) | Component status tracker and specifications |
| [Deployment](docs/deployment.md) | Environment setup and deployment process |
| [Roadmap](docs/ROADMAP.md) | Project phases and progress |

## Environment Variables

See `apps/payload/.env.example` for required variables:

- `DATABASE_URI` — PostgreSQL connection string
- `PAYLOAD_SECRET` — Secret key for Payload authentication
- `NEXT_PUBLIC_SERVER_URL` — Public URL of the Payload server
- `RESEND_API_KEY` — Resend email service key
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY` — reCAPTCHA keys

## License

Private — All rights reserved.
