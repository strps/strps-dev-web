---
description: "Use when creating or modifying React components with Tailwind CSS and shadcn/ui. Covers component patterns, accessibility, and styling conventions."
applyTo: "apps/**/src/components/**"
---

# React Component Conventions

## Patterns

- Server Components by default — add `'use client'` only for interactivity (hooks, event handlers)
- Use `React.FC<Props>` with explicit prop types
- Import UI primitives from `@/components/ui/` (shadcn/ui)
- Use Lucide React for icons: `import { IconName } from 'lucide-react'`
- Use Motion for animations: `import { motion } from 'motion/react'`

## Styling

- Tailwind CSS 4 utility classes — avoid custom CSS
- Mobile-first: base styles for mobile, `md:` for tablet, `lg:` for desktop
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Dark mode via `dark:` variant

## Accessibility

- Interactive elements need ARIA labels
- Images need alt text
- Keyboard navigation for custom controls
- Use semantic HTML elements
