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
    <footer className="w-full border-t border-border bg-card">
      <div className="container mx-auto p-8 flex justify-between flex-wrap">
        <Link className="flex items-center" href="/">
          <Logo className="h-8 w-auto fill-primary" />
        </Link>

        <ModeToggle />
        <nav className="flex flex-col w-full pl-4 mt-8 mx-auto md:flex-row gap-4 ">
          {navItems.map(({ link }, i) => {
            return <CMSLink className="" key={i} {...link} />
          })}
        </nav>
      </div>
    </footer>
  )
}
