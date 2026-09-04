import type { Metadata } from 'next'
import type { ComponentProps } from 'react'

import { PayloadRedirects } from '@/components/payload-redirects'
import { draftMode } from 'next/headers'
import RichText from '@/components/RichText'
import { ProjectHero } from '@/components/projects/project-hero'
import { CaseStudy } from '@/components/projects/case-study'
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

  if (!project) return <PayloadRedirects url={url} locale={locale} />

  return (
    <article className="mx-auto flex w-full max-w-wrap flex-col gap-14 px-6 pt-20 pb-28 md:pt-28">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} locale={locale} />

      {draft && <LivePreviewListener />}

      <ProjectHero project={project} locale={locale} />

      <CaseStudy caseStudy={project.caseStudy} locale={locale} />

      <RichText
        className="max-w-3xl"
        data={project.content as ComponentProps<typeof RichText>['data']}
        enableGutter={false}
      />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale } = await paramsPromise
  const project = await getProjectBySlug({ slug, locale })

  return generateMeta({ doc: project, locale, path: `/projects/${slug}` })
}
