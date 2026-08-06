import type { Metadata } from 'next'
import type { ComponentProps } from 'react'

import { PayloadRedirects } from '@/components/payload-redirects'
import { draftMode } from 'next/headers'
import RichText from '@/components/RichText'
import { PostHero } from '@/components/blog/hero'
import { generateMeta } from '@/lib/generateMeta'
import { LivePreviewListener } from '@/components/live-preview-listener'
import { getProjectBySlug, generateStaticParams as generateProjectStaticParams } from '../data'
import type { Locale } from '@/i18n/config'

export async function generateStaticParams() {
  return await generateProjectStaticParams()
}

type Args = {
  params: Promise<{
    slug?: string
    locale: Locale
  }>
}

export default async function ProjectPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', locale } = await paramsPromise
  const url = '/projects/' + slug
  const project = await getProjectBySlug({ slug, locale })
  const headerOverrides = project?.appearance?.headerOverrides

  if (!project) return <PayloadRedirects url={url} locale={locale} />

  return (
    <>
      <article className="pb-16">
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} locale={locale} />

        {draft && <LivePreviewListener />}

        <div className="flex flex-col items-center gap-4">
          <PostHero post={project} className="dark" locale={locale} />
          <div className="container px-4 pt-8">
            <RichText
              className="max-w-3xl mx-auto"
              data={project.content as ComponentProps<typeof RichText>['data']}
              enableGutter={false}
            />
          </div>
        </div>
      </article>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale } = await paramsPromise
  const project = await getProjectBySlug({ slug, locale })

  return generateMeta({ doc: project, locale, path: `/projects/${slug}` })
}
