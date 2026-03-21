import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Section from '../section'
import { ArticleCard } from '../cards/ArticleCard'
import type { PageBlogBlock, Post, Media, BlogTag } from '@strps-website/types'

const BlogSection: React.FC<PageBlogBlock> = ({ title, selectedPosts, blogUrl, section }) => {
    const posts = (selectedPosts || []).filter(
        (p): p is Post => typeof p === 'object' && p !== null,
    )

    return (
        <Section id={section?.section_id || 'blog'} className="space-y-8 py-10">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                {blogUrl && (
                    <Button variant="ghost" asChild className="hidden sm:flex">
                        <Link href={blogUrl}>
                            View all articles <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => {
                    const heroImage =
                        typeof post.heroImage === 'object' && post.heroImage
                            ? (post.heroImage as Media)
                            : null

                    const tags = (post.tags || [])
                        .filter((t): t is BlogTag => typeof t === 'object' && t !== null)
                        .map((t) => ({ tag: t.tag }))

                    const authors = (post.populatedAuthors || [])
                        .filter((a): a is { name?: string | null } => typeof a === 'object' && a !== null)
                        .map((a) => ({ name: a.name }))

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
                            authors={authors}
                        />
                    )
                })}
            </div>

            {blogUrl && (
                <div className="sm:hidden flex justify-center">
                    <Button variant="outline" asChild>
                        <Link href={blogUrl}>
                            View all articles <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            )}
        </Section>
    )
}

export default BlogSection
