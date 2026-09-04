import type { Metadata } from 'next';
import { PageHeader } from '@/components/primitives/PageHeader';
import { Pager } from '@/components/primitives/Pager';
import { Reveal } from '@/components/primitives/Reveal';
import { PostIndex, type PostIndexItem } from '@/components/blog/post-index';
import { getBlogPosts } from './data';
import { mediaUrl } from '@/lib/mediaUrl';
import { localizedHref, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { buildAlternates } from '@/lib/seo';
import type { BlogTag } from '@strps-website/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dictionary = getDictionary(locale)

  return {
    title: dictionary.seo.blogTitle,
    description: dictionary.seo.blogDescription,
    alternates: buildAlternates(locale, '/blog'),
  }
}

export default async function BlogPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ page?: string }>
  params: Promise<{ locale: Locale }>
}) {

  const page = Number((await searchParams).page) || 1
  const { locale } = await params
  const dictionary = getDictionary(locale)
  const { posts, pagination } = await getBlogPosts({ page, limit: 12, locale })

  const items: PostIndexItem[] = posts.map((post) => ({
    id: String(post.id),
    title: post.title,
    description: post.meta?.description,
    imageUrl: mediaUrl(post.heroImage),
    imageAlt: typeof post.heroImage === 'object' ? post.heroImage?.alt : null,
    publishedAt: post.publishedAt,
    tags: (post.tags || [])
      .filter((tag): tag is BlogTag => typeof tag === 'object' && tag !== null)
      .map((tag) => tag.tag)
      .filter(Boolean),
    slug: post.slug,
  }))

  return (
    <main className="mx-auto flex w-full max-w-wrap flex-col gap-12 px-6 pt-20 pb-28 md:pt-28">
      <Reveal on="mount">
        <PageHeader
          eyebrow={dictionary.blog.eyebrow}
          title={
            <>
              {dictionary.blog.heroTitlePrefix}{' '}
              <span className="text-primary">{dictionary.blog.heroTitleHighlight}</span>
            </>
          }
          lead={dictionary.blog.heroSubtitle}
          meta={dictionary.blog.countLabel(pagination.totalDocs)}
        />
      </Reveal>

      <PostIndex posts={items} locale={locale} />

      <Pager
        page={page}
        totalPages={pagination.totalPages}
        basePath={localizedHref(locale, '/blog')}
        locale={locale}
      />
    </main>
  );
}
