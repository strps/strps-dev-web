// variants.ts
import { cva, type VariantProps } from 'class-variance-authority'

// Base stat variants
export const statVariants = cva('rounded-lg p-6', {
  variants: {
    variant: {
      card: 'bg-card shadow-md border border-border',
      elevated: 'bg-card shadow-lg',
      bordered: 'border border-border',
      ghost: 'bg-transparent',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-green-600',
      danger: 'text-destructive',
      warning: 'text-yellow-600',
      info: 'text-blue-600',
      light: 'text-muted-foreground',
      dark: 'text-foreground',
    },
    size: {
      sm: 'text-2xl md:text-3xl',
      md: 'text-3xl md:text-4xl',
      lg: 'text-4xl md:text-5xl',
      xl: 'text-5xl md:text-6xl',
    },
  },
  defaultVariants: {
    variant: 'card',
    color: 'primary',
    size: 'xl',
  },
})

// CTA button variants
export const ctaVariants = cva(
  'inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-ring',
        outline: 'border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

// Container variants
export const containerVariants = cva('mx-auto px-4 sm:px-6 lg:px-8', {
  variants: {
    maxWidth: {
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-5xl',
      xl: 'max-w-7xl',
      full: 'max-w-full',
      none: '',
    },
  },
  defaultVariants: {
    maxWidth: 'xl',
  },
})

// Text alignment variants
export const textAlignVariants = cva('', {
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    align: 'center',
  },
})

// Padding variants
export const paddingVariants = cva('', {
  variants: {
    padding: {
      none: '',
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-24',
    },
    paddingTop: {
      none: '',
      sm: 'pt-8',
      md: 'pt-12',
      lg: 'pt-16',
      xl: 'pt-24',
    },
    paddingBottom: {
      none: '',
      sm: 'pb-8',
      md: 'pb-12',
      lg: 'pb-16',
      xl: 'pb-24',
    },
  },
  defaultVariants: {
    padding: 'xl',
  },
})

// Grid columns variants
export const gridColumnsVariants = cva('grid gap-6', {
  variants: {
    columns: {
      '2': 'grid-cols-2',
      '3': 'sm:grid-cols-2 lg:grid-cols-3',
      '4': 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4',
    },
  },
  defaultVariants: {
    columns: '4',
  },
})

export type StatVariants = VariantProps<typeof statVariants>
export type CtaVariants = VariantProps<typeof ctaVariants>
export type ContainerVariants = VariantProps<typeof containerVariants>
export type TextAlignVariants = VariantProps<typeof textAlignVariants>
export type PaddingVariants = VariantProps<typeof paddingVariants>
export type GridColumnsVariants = VariantProps<typeof gridColumnsVariants>
