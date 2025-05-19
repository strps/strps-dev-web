import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { ModeToggle } from '@/providers/Theme/theme-selector'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container mx-auto py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo className="h-8 w-auto fill-primary" />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ModeToggle />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
