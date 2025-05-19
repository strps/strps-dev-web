'use client'
import Link from 'next/link'
import React, { useState } from 'react'

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

  return (
    <header className="z-20 absolute top-0 left-0 right-0">
      <div className="py-4 md:py-8 h-40 flex justify-between items-center mx-auto container">
        <Link href="/" aria-label="Go to homepage">
          <Logo className="h-16 w-auto fill-primary" />
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
