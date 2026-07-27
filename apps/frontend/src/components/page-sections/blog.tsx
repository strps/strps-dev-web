import Section from '../section'
import { ArticleCard } from '../cards/ArticleCard'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import { getBlogPosts } from '@/app/(website)/[locale]/blog/data'
import type { PageBlogBlock, Post, Media, BlogTag } from '@strps-website/types'
import { localizedHref, type Locale } from '@/i18n/config'

const BlogSection = async (props: PageBlogBlock & { blogPopulateBy?: string; blogLimit?: number; locale: Locale }) => {
    const { eyebrow, title, selectedPosts, blogUrl, section, locale } = props
    const populateBy = (props as any).blogPopulateBy ?? props.populateBy
    const limit = (props as any).blogLimit ?? props.limit
    let posts: Post[] = []

    if (populateBy === 'collection') {
        const { posts: fetched } = await getBlogPosts({ limit: limit ?? 3, locale })
        posts = fetched
    } else {
        posts = (selectedPosts || []).filter(
            (p): p is Post => typeof p === 'object' && p !== null,
        )
    }

    return (
        <Section
            {...(section ?? {})}
            id={section?.section_id || 'blog'}
            spacing="section"
            container={false}
            containerClassName="mx-auto w-full max-w-wrap gap-[22px] px-6"
        >
            <SectionHeader
                eyebrow={eyebrow || 'Writing'}
                title={title}
                action={blogUrl ? <LinkArrow href={localizedHref(locale, blogUrl)}>All articles →</LinkArrow> : undefined}
            />

            <div className="grid grid-cols-1 gap-4 min-[721px]:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => {
                    const heroImage =
                        typeof post.heroImage === 'object' && post.heroImage
                            ? (post.heroImage as Media)
                            : null

                    const tags = (post.tags || [])
                        .filter((t): t is BlogTag => typeof t === 'object' && t !== null)
                        .map((t) => ({ tag: t.tag }))

                    return (
                        <ArticleCard
                            key={post.id}
                            title={post.title}
                            description={post.meta?.description}
                            imageUrl={heroImage?.url}
                            imageAlt={heroImage?.alt}
                            publishedAt={post.publishedAt}
                            tags={tags}
                            slug={post.slug}
                            locale={locale}
                        />
                    )
                })}
            </div>
        </Section>
    )
}

export default BlogSection
