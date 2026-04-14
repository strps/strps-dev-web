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

### Colors & Theming

- **Do not** use the `dark:` variant directly in components
- Colors come from CSS custom properties defined in `apps/frontend/src/app/globals.css`, following shadcn/ui conventions (e.g. `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`, etc.)
- These variables automatically switch between light and dark values — components are theme-aware without any `dark:` class
- **Adding a new color:** define the CSS variable in both `:root` (light) and `.dark` (dark) blocks in `globals.css`, then expose it under `@theme inline` as `--color-<name>: var(--<name>)` so Tailwind utilities like `bg-<name>` and `text-<name>` become available
- Custom shadow utilities (`shadow-lv1` through `shadow-lv5`) are defined in `globals.css` and use theme-aware shadow variables — prefer these over arbitrary `shadow-*` values

## Accessibility

- Interactive elements need ARIA labels
- Images need alt text
- Keyboard navigation for custom controls
- Use semantic HTML elements
