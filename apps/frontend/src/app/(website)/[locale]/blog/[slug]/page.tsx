import { RelatedPosts } from '@/components/blog/related-posts'
import { PayloadRedirects } from '@/components/payload-redirects'
import { draftMode } from 'next/headers'
import RichText from '@/components/RichText'
import { PostHero } from '@/components/blog/hero'
import { generateMeta } from '@/lib/generateMeta'
import { LivePreviewListener } from '@/components/live-preview-listener'
import type { Metadata } from 'next'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Post } from '@strps-website/types'
import { generateStaticParams, getPostBySlug } from '../data'
import type { Locale } from '@/i18n/config'

export { generateStaticParams }

type Args = {
  params: Promise<{
    slug?: string
    locale: Locale
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  let draft = false
  try {
    const { isEnabled } = await draftMode()
    draft = isEnabled
  } catch {
    // draftMode() is unavailable during static generation
  }
  const { slug = '', locale } = await paramsPromise
  const url = `/posts/${slug}`

  const post = await getPostBySlug({ slug, locale })

  if (!post) return <PayloadRedirects url={url} locale={locale} />

  return (
    <>
      <article className="pb-16">
        {/* <PayloadRedirects disableNotFound url={url} /> */}

        {draft && <LivePreviewListener />}

        <div className="flex flex-col items-center gap-8">
          <PostHero post={post} className="dark" />
          <div className="container px-4">
            <RichText className="max-w-3xl mx-auto" data={post.content as DefaultTypedEditorState} enableGutter={false} />
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="my-12">
                <h2>Related Posts</h2>
                <RelatedPosts
                  className="mt-12 max-w-208 lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
                  docs={post.relatedPosts.filter((p): p is Post => typeof p === 'object')}
                  locale={locale}
                />
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale } = await paramsPromise
  const post = await getPostBySlug({ slug, locale })

  return generateMeta({ doc: post })
}