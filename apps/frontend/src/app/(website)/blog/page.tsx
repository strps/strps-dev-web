import Section from '@/components/section';
import { BlogList } from '@/components/blog/blog-list';
import { getBlogPosts } from './data';
import { Pagination } from '@/components/pagination';

export const metadata = {
  title: 'Blog | Cesar Jerez',
  description: 'Thoughts on software development, electronics, and technology.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {

  const page = Number((await searchParams).page) || 1
  const { posts, pagination } = await getBlogPosts({ page, limit: 12 })


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
            Writing & <span className="text-primary">Thoughts</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Exploring the intersection of web development, electronics, and system architecture.
          </p>
        </div>
      </Section>

      {/* Blog List & Filters */}
      <div className="mx-auto w-full max-w-wrap px-6 py-16">
        <BlogList posts={posts} />
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
        />
      </div>
    </main>
  );
}