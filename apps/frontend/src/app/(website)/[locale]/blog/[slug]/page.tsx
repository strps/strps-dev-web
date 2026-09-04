import { RelatedPosts } from '@/components/blog/related-posts'
import { PayloadRedirects } from '@/components/payload-redirects'
import { draftMode } from 'next/headers'
import RichText from '@/components/RichText'
import { ArticleHero } from '@/components/blog/article-hero'
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
    <article className="mx-auto flex w-full max-w-wrap flex-col gap-14 px-6 pt-20 pb-28 md:pt-28">
      {draft && <LivePreviewListener />}

      <ArticleHero post={post} locale={locale} />

      <RichText
        className="max-w-3xl"
        data={post.content as DefaultTypedEditorState}
        enableGutter={false}
      />

      <RelatedPosts
        docs={post.relatedPosts?.filter((p): p is Post => typeof p === 'object') ?? []}
        locale={locale}
      />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale } = await paramsPromise
  const post = await getPostBySlug({ slug, locale })

  return generateMeta({ doc: post, locale, path: `/blog/${slug}` })
}
