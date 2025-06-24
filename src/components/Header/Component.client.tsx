'use client'
import Link from 'next/link'
import React, { useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import type { Header as HeaderType } from '@/payload-types'

import { AnimatePresence, motion } from 'motion/react'

import { CMSLink } from '@/components/Link'
import Hamburger from 'hamburger-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utilities/ui'

const defaultVariant = 'classic'
const defaultContainer = true
const defaultBackground = false

const headerVariants = cva('top-0 left-0 right-0 z-50', {
  variants: {
    variant: {
      classic: 'flex flex-row justify-between items-center bg-background',
      modern: 'flex flex-row justify-between items-center bg-transparent mx-auto p-5',
    },
    background: {
      true: 'bg-card border-b border-border',
      false: 'bg-transparent',
    },
    container: {
      true: '',
      false: '',
    },
    theme: {
      auto: '',
      light: 'light',
      dark: 'dark',
      inverted: 'inverted',
    },
  },
  compoundVariants: [
    {
      variant: 'modern',
      background: true,
      className: 'bg-transparent',
    },
    {
      variant: 'modern',
      container: true,
      className: 'container',
    },
  ],

  defaultVariants: {
    variant: defaultVariant,
    background: defaultBackground,
    container: defaultContainer,
    theme: 'auto',
  },
})

const logoVariants = cva('', {
  variants: {
    variant: {
      classic: 'fill-primary w-44',
      modern: 'fill-white w-44',
      plain: 'fill-primary w-44',
    },
  },
  defaultVariants: {
    variant: defaultVariant,
  },
})

const linksVariants = cva('', {
  variants: {
    variant: {
      classic: 'flex flex-row gap-6',
      modern: '',
      plain: '',
    },
  },
  defaultVariants: {
    variant: defaultVariant,
  },
})

const containerVariants = cva('mx-auto flex flex-row justify-between items-center z-50', {
  variants: {
    variant: {
      classic: 'px-10 py-5 md:px-20 md:py-10',
      modern: 'px-20 py-8',
      plain: 'px-20 py-8',
    },
    container: {
      true: 'container',
      false: 'w-full',
    },
    background: {
      true: 'bg-card border-b border-border',
      false: 'bg-transparent',
    },
  },
  compoundVariants: [
    {
      variant: 'modern',
      className: 'bg-background border m-5 mx-auto ',
    },
  ],
  defaultVariants: {
    background: defaultBackground,
    container: defaultContainer,
    variant: defaultVariant,
  },
})

type HeaderClientProps = {
  data: Header
  container?: boolean
} & VariantProps<typeof headerVariants>

/**
 * @description The header component for the client side
 *
 * @param data - The header data
 * @param variant - The variant of the header
 * @param container - Whether to use a container or not
 */
export const HeaderClient: React.FC<HeaderClientProps> = ({
  data,
  variant, //TODO: all properties needs come form data given by payload
  container,
}) => {
  /* Storing the value in a useState to avoid hydration errors */

  return (
    <header
      className={cn(
        data.overlay ? 'absolute' : 'relative',
        headerVariants({ variant, background: data.background, container, theme: data.theme }),
      )}
    >
      <div className={cn(containerVariants({ variant, container }), 'z-50')}>
        <Link href="/" aria-label="Go to homepage" className="z-50">
          <Logo className={cn(logoVariants({ variant }), 'h-auto z-50')} />
          {/* h-auto in order to override the height of the svg */}
        </Link>
        <HeaderNav data={data} variant={variant} />
      </div>
    </header>
  )
}

interface HeaderNavProps {
  data: HeaderType
  variant?: VariantProps<typeof linksVariants>['variant']
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, variant = 'classic' }) => {
  const navItems = data?.navItems || []

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <nav className={cn(linksVariants({ variant }))}>
      <ul className="hidden md:flex gap-6">
        {navItems.map(({ link }, i) => {
          return (
            <li key={i}>
              <CMSLink {...link} appearance="link" />
            </li>
          )
        })}
      </ul>
      <div className="md:hidden z-50">
        <Hamburger
          rounded
          toggled={open}
          toggle={setOpen}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          color="var(--foreground)"
        />
      </div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute top-full left-0 w-full z-40 bg-background border rounded-md shadow-md py-4 flex flex-col overflow-hidden"
            >
              <ul className="flex flex-col gap-4 px-4">
                {navItems.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} appearance="link" />
                    </li>
                  )
                })}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
              onClick={handleClick}
              aria-hidden="true"
            ></motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
