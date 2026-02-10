import { RelatedPosts } from '@/components/blog/related-posts'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { draftMode } from 'next/headers'
import RichText from '@/components/RichText'
import { PostHero } from '@/components/blog/hero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/live-preview-listener'
import type { Metadata } from 'next'
import type { Post } from '../../../../../payload/src/payload-types'
import { generateStaticParams, getPostBySlug } from '../data'

export { generateStaticParams }

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = `/posts/${slug}`

  const post = await getPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  const headerOverrides = post.appearance?.headerOverrides

  return (
    <>
      <article className="pb-16">
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        <div className="flex flex-col items-center gap-8">
          <PostHero post={post} className="dark" />
          <div className="container px-4">
            <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />

            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="my-12">
                <h2>Related Posts</h2>
                <RelatedPosts
                  className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
                  docs={post.relatedPosts.filter((p): p is Post => typeof p === 'object')}
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
  const { slug = '' } = await paramsPromise
  const post = await getPostBySlug({ slug })

  return generateMeta({ doc: post })
}