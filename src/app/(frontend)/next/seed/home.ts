import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Form, Media } from '@/payload-types'
import { theme } from '@/fields/theme'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
  aboutImage: Media
  contactForm: Form
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
  aboutImage,
  contactForm,
}) => {
  return {
    slug: 'home',
    title: 'Home',
    _status: 'published',
    layout: [
      // Hero Block
      {
        blockType: 'strpsHero',
        title: 'From Self-Taught Enthusiast to Bootcamp Graduate | Ready to Code Your Vision',
        text: 'My journey into web development, fueled by curiosity and solidified through intensive training, has equipped me with the skills to bring your ideas to life online.',
        heroImage: heroImage.id,
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Discover my skills...',
              url: '#skills',
            },
          },
          {
            link: {
              type: 'custom',
              appearance: 'outline',
              label: 'Check my work...',
              url: '#work',
            },
          },
        ],
        section: {
          theme: 'auto',
          background: 'svgCircles',
          container: true,
        },
      },

      //About Storylocks
      {
        blockType: 'strpsAboutStoryBlocks',
        title: 'A little about me.',
        section: {
          theme: 'auto',
          background: 'none',
          container: true,
        },
        storyBlocks: [
          {
            heading: 'A Natural Affinity for Code',
            content:
              "From my earliest years in primary school, programming has been more than just a subject – it's been a natural language. Consistently recognized for my aptitude in every coding course I've taken, I've always been drawn to the logic and creative potential of software development.",
            lucideIcon: 'code',
            alt: '',
          },
          {
            heading: 'Ventures in Engineering & Making',
            content:
              'This inherent drive for understanding how things work led me to explore fields like electronics engineering and mechatronics, where I gained valuable insights and hands-on experience, including building a CNC machine and programming microcontrollers.',
            lucideIcon: 'circuit-board',
            alt: '',
          },
          {
            heading: 'An Eye for Art & Innovation',
            content:
              'Beyond the technical realm, I also harbor a deep passion for artistic expression, particularly in illustration and generative art. I believe this creative inclination provides a unique perspective in crafting visually appealing and user-centric digital experiences.',
            lucideIcon: 'palette',
            alt: '',
          },
          {
            heading: 'Bridging Logic and Design in Web Development',
            content:
              'Driven by a desire to build interactive and impactful web solutions that are both functional and aesthetically pleasing, I dedicated myself to self-learning web development and further refined my skills through an immersive bootcamp.',
            lucideIcon: 'monitor',
            alt: '',
          },
          {
            heading: 'Ready to Build and Innovate',
            content:
              "I'm now eager to channel my long-standing programming talent, technical foundation, and artistic eye into creating innovative web solutions. Explore my portfolio to see my work in action.",
            lucideIcon: 'briefcase',
            alt: '',
          },
        ],
      },

      // Skills Block
      {
        blockType: 'strpsSkills',
        title: 'Skills and expertise',
        section: {
          theme: 'auto',
          background: 'none',
          container: true,
          section_id: 'skills',
        },
        skillGroup: [
          {
            text: 'Frontend:',
            skills: [
              {
                text: 'HTML',
                percentage: 90,
              },
              {
                text: 'CSS',
                percentage: 85,
              },
              {
                text: 'JavaScript',
                percentage: 80,
              },
              {
                text: 'TypeScript',
                percentage: 75,
              },
              {
                text: 'React',
                percentage: 70,
              },
              {
                text: 'Next.js',
                percentage: 65,
              },
              {
                text: 'Tailwind CSS',
                percentage: 60,
              },
              {
                text: 'Shadcn UI',
                percentage: 55,
              },
              {
                text: 'Framer Motion',
                percentage: 50,
              },
              {
                text: 'Framer Motion',
                percentage: 50,
              },
            ],
          },
          {
            text: 'Backend:',
            skills: [
              {
                text: 'Node.js',
                percentage: 90,
              },
              {
                text: 'Express.js',
                percentage: 85,
              },
              {
                text: 'Python',
                percentage: 80,
              },
              {
                text: 'Django',
                percentage: 75,
              },
              {
                text: 'Flask',
                percentage: 70,
              },
              {
                text: 'FastAPI',
                percentage: 65,
              },
              {
                text: 'GraphQL',
                percentage: 60,
              },
              {
                text: 'Apollo',
                percentage: 55,
              },
              {
                text: 'Prisma',
                percentage: 50,
              },
              {
                text: 'Prisma',
                percentage: 50,
              },
            ],
          },
          {
            text: 'Tools & Technologies:',
            skills: [
              {
                text: 'Git',
                percentage: 90,
              },
              {
                text: 'GitHub',
                percentage: 85,
              },
              {
                text: 'GitLab',
                percentage: 80,
              },
              {
                text: 'Jira',
                percentage: 75,
              },
              {
                text: 'Trello',
                percentage: 70,
              },
              {
                text: 'Figma',
                percentage: 65,
              },
              {
                text: 'Canva',
                percentage: 60,
              },
              {
                text: 'Adobe XD',
                percentage: 55,
              },
              {
                text: 'Adobe XD',
                percentage: 50,
              },
              {
                text: 'Adobe XD',
                percentage: 50,
              },
            ],
          },
          {
            text: 'Programming Languages:',
            skills: [
              {
                text: 'HTML',
                percentage: 90,
              },
              {
                text: 'CSS',
                percentage: 85,
              },
              {
                text: 'JavaScript',
                percentage: 80,
              },
              {
                text: 'TypeScript',
                percentage: 75,
              },
              {
                text: 'React',
                percentage: 70,
              },
              {
                text: 'Next.js',
                percentage: 65,
              },
              {
                text: 'Tailwind CSS',
                percentage: 60,
              },
              {
                text: 'Shadcn UI',
                percentage: 55,
              },
              {
                text: 'Framer Motion',
                percentage: 50,
              },
              {
                text: 'Framer Motion',
                percentage: 50,
              },
            ],
          },
        ],
      },

      // Contact Form Block
      {
        blockType: 'strpsFormBlock',
        enableIntro: true,
        form: contactForm,
        introType: 'titleAndText',
        introTitle: "Let's get in touch",
        section: {
          theme: 'auto',
          background: 'none',
          container: true,
        },
      },
    ],
    meta: {
      title: 'Home',
      description: 'Welcome to our website',
      image: metaImage.id,
    },
    appearance: {
      headerOverrides: {
        background: false,
        theme: 'auto',
        overlay: true,
      },
    },
  }
}
