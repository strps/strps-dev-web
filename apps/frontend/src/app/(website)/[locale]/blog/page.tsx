import type { Metadata } from 'next';
import Section from '@/components/page-sections/section';
import { BlogList } from '@/components/blog/blog-list';
import { getBlogPosts } from './data';
import { Pagination } from '@/components/pagination';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { buildAlternates } from '@/lib/seo';

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


  const url = new URL(process.env.NEXT_PUBLIC_PAYLOAD_URL!)
  url.port = ''
  return (
    <main className="min-h-screen">
      {/* Blog Header */}
      <Section
        className="py-20 md:py-32 bg-muted/30"
        container={false}
        containerClassName="mx-auto w-full max-w-wrap px-6"
      >
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {dictionary.blog.heroTitlePrefix} <span className="text-primary">{dictionary.blog.heroTitleHighlight}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {dictionary.blog.heroSubtitle}
          </p>
        </div>
      </Section>

      {/* Blog List & Filters */}
      <div className="mx-auto w-full max-w-wrap px-6 py-16">
        <BlogList posts={posts} locale={locale} />
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
        />
      </div>
    </main>
  );
}