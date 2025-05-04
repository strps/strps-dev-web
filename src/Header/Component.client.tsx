'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import type { Header as HeaderType } from '@/payload-types'

import { AnimatePresence, motion } from 'motion/react'

import { CMSLink } from '@/components/Link'
import Hamburger from 'hamburger-react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-4 md:py-8 flex justify-between items-center">
        <Link href="/" aria-label="Go to homepage">
          <Logo loading="eager" priority="high" className="h-8 w-auto invert dark:invert-0" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <nav className="flex gap-3 md:gap-6 items-center">
      <ul className="hidden md:flex gap-6">
        {navItems.map(({ link }, i) => {
          return (
            <li key={i}>
              <CMSLink {...link} appearance="link" />
            </li>
          )
        })}
      </ul>
      <div className="relative md:hidden z-50">
        <Hamburger
          rounded
          toggled={open}
          toggle={setOpen}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        />
      </div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute top-full left-0 w-full z-50 bg-background border rounded-md shadow-md py-4 flex flex-col overflow-hidden"
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
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={handleClick}
              aria-hidden="true"
            ></motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
