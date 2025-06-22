import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type PostArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

export const post4: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage, // Keeping this for consistency with other posts, though not used
  author,
}) => {
  const now = new Date()

  return {
    slug: 'from-microworlds-to-strps',
    _status: 'published',
    authors: [author],
    title: 'From Microworlds to STRPS: My Journey into Web Development and Open Source',
    publishedAt: now.toISOString(),
    excerpt:
      'My journey from early programming with Microworlds to creating STRPS, an open-source PayloadCMS template for portfolios and business websites.',
    meta: {
      title: 'From Microworlds to STRPS: My Journey into Web Development and Open Source',
      description:
        'My journey from early programming with Microworlds to creating STRPS, an open-source PayloadCMS template for portfolios and business websites.',
      image: typeof heroImage === 'string' ? heroImage : heroImage.id,
    },
    heroImage: typeof heroImage === 'string' ? heroImage : heroImage.id,
    content: {
      root: {
        type: 'root',
        direction: 'ltr',
        format: 'left',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'The first time I hid a turtle on screen with a simple command in Microworlds, I was captivated. Growing up with a computer always nearby, I developed an early and lasting curiosity about how technology works. In primary school, I was introduced to Micromundos (Microworlds), a visual programming environment designed to teach children computational thinking through graphical interactions. I spent countless hours dissecting example projects, learning how to make interactive scenes where clicking parts of an image could trigger transitions to new "worlds." That feeling of empowerment through creation has stayed with me ever since.',
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'From Curiosity to Career: A Technical Evolution',
              },
            ],
            tag: 'h2',
          },
          {
            type: 'paragraph',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'My passion for technology naturally expanded into self-taught programming and later formal studies in electronics and mechatronics. These disciplines instilled a solid foundation in systems thinking—skills that now serve me well in web development, where logic meets creativity to solve real-world problems.',
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'To round out my experience and deepen my understanding of modern web practices, I also completed a Full Stack Web Development Bootcamp, which sharpened my skills in both frontend and backend technologies and prepared me for real-world, full-cycle web projects.',
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'STRPS: A PayloadCMS Template for Portfolios and Business Websites',
              },
            ],
            tag: 'h2',
          },
          {
            type: 'paragraph',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'My latest project, STRPS, is a custom theme designed for PayloadCMS. It began as a personal endeavor to build a professional portfolio site while job hunting. Over time, I realized it could serve a broader purpose. STRPS is evolving into a fully-featured, reusable theme for corporate websites, portfolios, and local business sites.',
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'One key insight came from recognizing commonalities across web components—or blocks. That realization led me to define a consistent block file structure and develop a completion checklist as a guideline for building new blocks. This framework not only streamlines development but also makes the project easier to contribute to and scale.',
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'The Value of Open Source Collaboration',
              },
            ],
            tag: 'h2',
          },
          {
            type: 'paragraph',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'As STRPS matured, I realized the power of open-source collaboration. While I may not have extensive industry experience, open-sourcing the project has given me the opportunity to learn, grow, and connect with other developers. It invites valuable feedback and helps shape the project into something truly useful.',
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'text',
                version: 1,
                text: "To make the project approachable, I've created clear documentation, defined coding standards, and outlined an onboarding guide. These steps aim to help contributors of all levels get involved quickly and confidently—whether they're building new blocks, refining the UI/UX, or enhancing the documentation.",
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'text',
                version: 1,
                text: "This blog post marks the official launch of STRPS as a public and collaborative open-source project. If you're a web developer, designer, or tech enthusiast interested in contributing to an open-source CMS initiative, I'd love for you to join the effort.",
              },
            ],
          },
        ],
      },
    },
  }
}
