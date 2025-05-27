import React, { useState, useEffect } from 'react'
import { Block } from 'payload/types'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

type Author = {
  id: string
  name: string
  image?: any
}

type Category = {
  id: string
  title: string
  slug: string
}

type Tag = {
  id: string
  name: string
  slug: string
}

type Post = {
  id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  featuredImage?: any
  author: Author
  categories?: Category[]
  tags?: Tag[]
}

type Props = {
  block: Block & {
    heading?: string
    description?: string
    layout?: 'grid' | 'list' | 'featured-grid' | 'carousel'
    columns?: string
    postsToShow?: number
    categories?: string[]
    tags?: string[]
    showFeaturedImage?: boolean
    showDate?: boolean
    showAuthor?: boolean
    showExcerpt?: boolean
    showReadMore?: boolean
    readMoreText?: string
    cta?: {
      enable?: boolean
      text?: string
      link?: string
    }
  }
}

const fetchPosts = async (options: {
  limit?: number
  categories?: string[]
  tags?: string[]
}): Promise<Post[]> => {
  // In a real implementation, this would be an API call to fetch posts
  // For now, we'll return mock data
  console.log('Fetching posts with options:', options)

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock data
  const mockPosts: Post[] = Array.from({ length: options.limit || 6 }, (_, i) => ({
    id: `post-${i + 1}`,
    title: `Blog Post ${i + 1}`,
    slug: `blog-post-${i + 1}`,
    excerpt: 'This is a sample blog post excerpt that provides a brief summary of the content.',
    publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    author: {
      id: 'author-1',
      name: 'John Doe',
      image: {
        url: '/images/placeholder-avatar.jpg',
        alt: 'Author avatar',
      },
    },
    categories: [
      { id: 'cat-1', title: 'Technology', slug: 'technology' },
      { id: 'cat-2', title: 'Web Development', slug: 'web-development' },
    ].slice(0, Math.floor(Math.random() * 2) + 1),
    tags: [
      { id: 'tag-1', name: 'React', slug: 'react' },
      { id: 'tag-2', name: 'Next.js', slug: 'nextjs' },
      { id: 'tag-3', name: 'JavaScript', slug: 'javascript' },
    ].slice(0, Math.floor(Math.random() * 3) + 1),
  }))

  return mockPosts
}

const StrpsBlog: React.FC<Props> = ({
  block: {
    heading,
    description,
    layout = 'grid',
    columns = '3',
    postsToShow = 6,
    categories = [],
    tags = [],
    showFeaturedImage = true,
    showDate = true,
    showAuthor = true,
    showExcerpt = true,
    showReadMore = true,
    readMoreText = 'Read More',
    cta = {},
  },
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Fetch posts
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blogPosts', { limit: postsToShow, categories, tags }],
    queryFn: () =>
      fetchPosts({
        limit: postsToShow,
        categories,
        tags,
      }),
  })

  // Handle carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === Math.ceil(posts.length / 3) - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Math.ceil(posts.length / 3) - 1 : prev - 1))
  }

  // Auto-advance carousel
  useEffect(() => {
    if (layout !== 'carousel') return

    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [layout, posts.length])

  // Get grid columns class
  const getGridCols = () => {
    const colsMap: Record<string, string> = {
      '1': 'md:grid-cols-1',
      '2': 'sm:grid-cols-2',
      '3': 'sm:grid-cols-2 lg:grid-cols-3',
      '4': 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    }
    return colsMap[columns] || 'sm:grid-cols-2 lg:grid-cols-3'
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Render post card
  const renderPostCard = (post: Post, index: number, isFeatured: boolean = false) => (
    <div
      key={post.id}
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${
        isFeatured ? 'md:col-span-2' : ''
      }`}
    >
      {showFeaturedImage && (
        <div className="relative h-48 md:h-56 lg:h-64">
          <Image
            src={post.featuredImage?.url || '/images/placeholder-blog.jpg'}
            alt={post.title}
            fill
            className="object-cover"
            sizes={
              isFeatured
                ? '(max-width: 768px) 100vw, 50vw'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories?.map((category) => (
            <span
              key={category.id}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {category.title}
            </span>
          ))}
        </div>

        <h3 className={`font-bold ${isFeatured ? 'text-2xl' : 'text-xl'} mb-2`}>
          <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600">
            {post.title}
          </Link>
        </h3>

        {(showDate || showAuthor) && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            {showDate && (
              <time dateTime={post.publishedAt} className="mr-3">
                {formatDate(post.publishedAt)}
              </time>
            )}
            {showAuthor && (
              <div className="flex items-center">
                <span className="mx-1">•</span>
                <div className="flex items-center">
                  <span className="ml-1">By {post.author.name}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {showExcerpt && post.excerpt && <p className="text-gray-600 mb-4">{post.excerpt}</p>}

        {showReadMore && (
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {readMoreText}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )

  // Render loading state
  if (isLoading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
          </div>
          <div className={`grid gap-8 ${getGridCols()}`}>
            {[...Array(Number(columns))].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="animate-pulse h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="animate-pulse h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="animate-pulse h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="animate-pulse h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="animate-pulse h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                  <div className="animate-pulse h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Failed to load blog posts. Please try again later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render empty state
  if (posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-lg p-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No blog posts found</h3>
            <p className="mt-1 text-sm text-gray-500">Check back later for new content.</p>
          </div>
        </div>
      </div>
    )
  }

  // Render featured grid layout
  if (layout === 'featured-grid' && posts.length > 0) {
    const [featuredPost, ...otherPosts] = posts

    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {(heading || description) && (
            <div className="text-center mb-12">
              {heading && (
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{heading}</h2>
              )}
              {description && (
                <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">{description}</p>
              )}
            </div>
          )}

          <div className="mb-12">{renderPostCard(featuredPost, 0, true)}</div>

          <div className={`grid gap-8 ${getGridCols()}`}>
            {otherPosts.map((post, index) => (
              <div key={post.id}>{renderPostCard(post, index + 1)}</div>
            ))}
          </div>

          {cta?.enable && (
            <div className="mt-12 text-center">
              <Link
                href={cta.link || '/blog'}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {cta.text || 'View All Posts'}
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Render carousel layout
  if (layout === 'carousel') {
    const slides = []
    const itemsPerSlide = 3

    for (let i = 0; i < posts.length; i += itemsPerSlide) {
      slides.push(posts.slice(i, i + itemsPerSlide))
    }

    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {(heading || description) && (
            <div className="text-center mb-12">
              {heading && (
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{heading}</h2>
              )}
              {description && (
                <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">{description}</p>
              )}
            </div>
          )}

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                      {slide.map((post, postIndex) => (
                        <div key={post.id}>{renderPostCard(post, postIndex)}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {slides.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 p-2 rounded-full bg-white shadow-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Previous slide"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 p-2 rounded-full bg-white shadow-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Next slide"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div className="flex justify-center mt-8 space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full ${
                        currentSlide === index ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {cta?.enable && (
            <div className="mt-12 text-center">
              <Link
                href={cta.link || '/blog'}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {cta.text || 'View All Posts'}
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Default grid/list layout
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(heading || description) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{heading}</h2>
            )}
            {description && (
              <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">{description}</p>
            )}
          </div>
        )}

        <div className={`${layout === 'list' ? 'space-y-8' : `grid gap-8 ${getGridCols()}`}`}>
          {posts.map((post, index) => (
            <div key={post.id}>{renderPostCard(post, index)}</div>
          ))}
        </div>

        {cta?.enable && (
          <div className="mt-12 text-center">
            <Link
              href={cta.link || '/blog'}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {cta.text || 'View All Posts'}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default StrpsBlog
