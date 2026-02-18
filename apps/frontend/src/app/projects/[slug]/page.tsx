import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/payload-redirects'
import { draftMode } from 'next/headers'
import RichText from '@/components/RichText'
import { PostHero } from '@/components/blog/hero'
import { generateMeta } from '@/lib/generateMeta'
import { LivePreviewListener } from '@/components/live-preview-listener'
import { getProjectBySlug, generateStaticParams as generateProjectStaticParams } from '../data'

export async function generateStaticParams() {
  return await generateProjectStaticParams()
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ProjectPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/projects/' + slug
  const project = await getProjectBySlug({ slug })
  const headerOverrides = project?.appearance?.headerOverrides

  if (!project) return <PayloadRedirects url={url} />

  return (
    <>
      <article className="pb-16">
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        <div className="flex flex-col items-center gap-4">
          <PostHero post={project} className="dark" />
          <div className="container px-4 pt-8">
            <RichText
              className="max-w-[48rem] mx-auto"
              data={project.content}
              enableGutter={false}
            />
          </div>
        </div>
      </article>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const project = await getProjectBySlug({ slug })

  return generateMeta({ doc: project })
}
