import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { PayloadRedirects } from '@/components/payload-redirects'
import { LivePreviewListener } from '@/components/live-preview-listener'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import { generateMeta } from '@/lib/generateMeta'
import { formatDateTime } from '@/lib/formatDateTime'
import { localizedHref, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { generateStaticParams, getDocBySlug } from '../data'

export { generateStaticParams }

type Args = {
  params: Promise<{
    slug?: string
    locale: Locale
  }>
}

export default async function DocPage({ params: paramsPromise }: Args) {
  let draft = false
  try {
    const { isEnabled } = await draftMode()
    draft = isEnabled
  } catch {
    // draftMode() is unavailable during static generation
  }
  const { slug = '', locale } = await paramsPromise
  const url = `/docs/${slug}`

  const doc = await getDocBySlug({ slug, locale })

  if (!doc) return <PayloadRedirects url={url} locale={locale} />

  const dictionary = getDictionary(locale)

  return (
    <article className="mx-auto flex w-full max-w-wrap flex-col gap-14 px-6 pt-20 pb-28 md:pt-28">
      {draft && <LivePreviewListener />}

      <header className="flex flex-col">
        <LinkArrow href={localizedHref(locale, '/docs')} className="self-start">
          ← {dictionary.docs.backToIndex}
        </LinkArrow>

        <Eyebrow className="mt-8">{dictionary.docs.eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-[-0.02em] md:text-5xl">
          {doc.title}
        </h1>

        {(doc.effectiveDate || doc.version) && (
          <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-t border-border pt-4">
            {doc.effectiveDate && (
              <div className="flex flex-col gap-1">
                <Eyebrow>{dictionary.docs.effectiveDate}</Eyebrow>
                <time dateTime={doc.effectiveDate} className="text-sm text-muted-foreground">
                  {formatDateTime(doc.effectiveDate, locale)}
                </time>
              </div>
            )}
            {doc.version && (
              <div className="flex flex-col gap-1">
                <Eyebrow>{dictionary.docs.version}</Eyebrow>
                <p className="text-sm text-muted-foreground">{doc.version}</p>
              </div>
            )}
          </div>
        )}
      </header>

      <RichText
        className="max-w-3xl"
        data={doc.content as DefaultTypedEditorState}
        enableGutter={false}
      />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale } = await paramsPromise
  const doc = await getDocBySlug({ slug, locale })

  return generateMeta({ doc, locale, path: `/docs/${slug}` })
}
