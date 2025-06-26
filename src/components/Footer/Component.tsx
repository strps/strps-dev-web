import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { ModeToggle } from '@/providers/Theme/theme-selector'
import { Logo } from '@/components/Logo/Logo'
import { Copyright } from './Copyright'
import type { Footer } from '@/payload-types'

type FooterProps = {
  data: Footer
}

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  return <FooterComponent data={footerData} />
}

function FooterComponent({ data }: FooterProps) {
  const navItems = data?.navItems || []

  return (
    <footer className="w-full border-t border-border bg-footer shadow-footer mt-16">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-10 py-5 md:px-20 md:py-10 gap-y-4">
        <Link href="/" className="flex items-center">
          <Logo className="h-8 w-auto fill-primary" />
        </Link>

        <div className="flex items-center gap-4 ">
          {navItems.length > 0 && (
            <nav>
              <ul className="flex  items-center gap-4">
                {navItems.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink {...link} className="text-sm hover:underline" />
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <ModeToggle />
        </div>
      </div>

      <Copyright />
    </footer>
  )
}
