import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHeader } from '@/components/primitives/PageHeader'
import { Reveal } from '@/components/primitives/Reveal'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { formatDateTime } from '@/lib/formatDateTime'
import { buildAlternates } from '@/lib/seo'
import { localizedHref, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { getDocs } from './data'

type Args = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const dictionary = getDictionary(locale)

  return {
    title: dictionary.seo.docsTitle,
    description: dictionary.seo.docsDescription,
    alternates: buildAlternates(locale, '/docs'),
  }
}

export default async function DocsPage({ params }: Args) {
  const { locale } = await params
  const dictionary = getDictionary(locale)
  const docs = await getDocs({ locale })

  return (
    <main className="flex w-full flex-col gap-12 pb-28">
      <Reveal on="mount">
        <PageHeader
          eyebrow={dictionary.docs.eyebrow}
          title={
            <>
              {dictionary.docs.heroTitlePrefix}{' '}
              <span className="text-muted-foreground">{dictionary.docs.heroTitleHighlight}</span>
            </>
          }
          lead={dictionary.docs.heroSubtitle}
          meta={dictionary.docs.countLabel(docs.length)}
        />
      </Reveal>

      <div className="mx-auto w-full max-w-wrap px-6">
        {docs.length === 0 ? (
          <p className="text-sm text-muted-foreground">{dictionary.docs.none}</p>
        ) : (
          <ul className="border-t border-border">
            {docs.map((doc) => (
              <li key={doc.id} className="border-b border-border">
                <Link
                  href={localizedHref(locale, `/docs/${doc.slug}`)}
                  className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-5 transition-colors duration-150 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                >
                  <span className="text-lg font-medium tracking-[-0.01em]">{doc.title}</span>
                  {doc.effectiveDate && (
                    <Eyebrow>
                      {dictionary.docs.effectiveDate} · {formatDateTime(doc.effectiveDate, locale)}
                    </Eyebrow>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
