# STRPS Website Platform

## Overview

STRPS is a modern, performance-optimized website platform built with Next.js 14+ and PayloadCMS. The platform enables rapid development of feature-rich, content-managed websites with a focus on performance, accessibility, and developer experience.

## Key Features

- **Modern Tech Stack**: Built with Next.js 14+ (App Router), TypeScript, and Tailwind CSS
- **Headless CMS**: Powered by PayloadCMS for flexible content modeling and management
- **Component Library**: Comprehensive set of reusable UI components built with shadcn/ui
- **Block-Based Architecture**: Modular content blocks for flexible page building
- **Developer Experience**: Type-safe throughout, with clear documentation and patterns

## Core Technologies

- **Frontend**: Next.js 14+, React 18+, TypeScript, Tailwind CSS
- **Backend**: PayloadCMS, Node.js
- **Database**: PostgreSQL
- **Deployment**: Vercel, Neon (PostgreSQL), Vercel Blob Storage

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`

## Project Structure

```
strps-dev-web/
├── src/
│   ├── app/             # Next.js App Router
│   ├── blocks/          # Content blocks
│   ├── collections/     # PayloadCMS collections
│   ├── components/      # Shared components
│   ├── lib/             # Utility functions
│   └── styles/          # Global styles
├── public/              # Static assets
└── payload/             # PayloadCMS configuration
```

## Documentation

- [Architecture](./architecture.md) - Project structure and key concepts
- [Creating Blocks](./creating-blocks.md) - Guide to building new content blocks
- [Deployment](./deployment.md) - Deployment instructions and configuration
