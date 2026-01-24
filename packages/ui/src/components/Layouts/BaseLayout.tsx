import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Header } from '@/components/Header/Component'
import { Footer } from '@/components/Footer/Component'

interface BaseLayoutProps {
  children: ReactNode
  title?: string
  description?: string
  className?: string
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  title = 'STRPS',
  description = 'STRPS - Modern Web Development',
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  )
}
