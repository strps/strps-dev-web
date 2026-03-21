import { getClient } from '@/lib/apollo-client'
import { gql } from '@apollo/client'
import { unstable_cache } from 'next/cache'


export const GET_HEADER = gql`
  query GetHeader {
    Header {
      navItems {
        link {
          type
          newTab
          url
          label
          reference {
            relationTo
            value {
              ... on Page {
                slug
              }
              ... on Post {
                slug
              }
            }
          }
        }
      }
      theme
      background
      overlay
    }
  }
`

interface HeaderLink {
  link: {
    type?: 'reference' | 'custom' | null
    newTab?: boolean | null
    url?: string | null
    label: string
    reference?: {
      relationTo: string
      value: { slug: string }
    } | null
  }
}

interface HeaderData {
  Header: {
    navItems?: HeaderLink[] | null
    theme?: 'auto' | 'light' | 'dark' | 'inverted' | null
    background?: boolean | null
    overlay?: boolean | null
  }
}

function resolveHref(link: HeaderLink['link']): string {
  if (link.type === 'reference' && link.reference?.value?.slug) {
    const prefix = link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''
    return `${prefix}/${link.reference.value.slug}`
  }
  return link.url || '#'
}

async function getHeaderData() {
  const client = getClient()

  const { data } = await client.query<HeaderData>({
    query: GET_HEADER,
  })

  const header = data?.Header
  const navItems = (header?.navItems ?? []).map((item) => ({
    name: item.link.label,
    href: resolveHref(item.link),
  }))

  return {
    navItems,
    theme: header?.theme ?? 'auto',
    background: header?.background ?? true,
    overlay: header?.overlay ?? false,
  }
}

export const getCachedHeaderData = () =>
  unstable_cache(
    async () => getHeaderData(),
    ['global_header'],
    { tags: ['global_header'] },
  )

export const GET_FOOTER = gql`
  query GetFooter {
    Footer {
      navItems {
        link {
          type
          newTab
          url
          label
          reference {
            relationTo
            value {
              ... on Page {
                slug
              }
              ... on Post {
                slug
              }
            }
          }
        }
      }
    }
  }
`

export const GET_COPYRIGHT = gql`
  query GetCopyright {
    Copyright {
      name
      startDate
      link
    }
  }
`

interface FooterData {
  Footer: {
    navItems?: HeaderLink[] | null
  }
}

interface CopyrightData {
  Copyright: {
    name: string
    startDate: string
    link?: string | null
  }
}

export async function getFooterData() {
  const client = getClient()

  const [footerResult, copyrightResult] = await Promise.all([
    client.query<FooterData>({ query: GET_FOOTER }),
    client.query<CopyrightData>({ query: GET_COPYRIGHT }),
  ])

  const footer = footerResult.data?.Footer
  const copyright = copyrightResult.data?.Copyright

  const navItems = (footer?.navItems ?? []).map((item) => ({
    label: item.link.label,
    href: resolveHref(item.link),
    newTab: item.link.newTab ?? false,
  }))

  const currentYear = new Date().getFullYear()
  const startYear = copyright?.startDate
    ? new Date(copyright.startDate).getFullYear()
    : currentYear

  return {
    navItems,
    copyright: {
      name: copyright?.name ?? '',
      years: startYear < currentYear ? `${startYear}–${currentYear}` : `${currentYear}`,
      link: copyright?.link ?? null,
    },
  }
}

export const siteData = {
  hero: {
    status: {
      isAvailable: true,
      label: "Available for new opportunities"
    },
    description: "Crafting interactive experiences and building efficient, scalable systems for the modern web.",
    // Updated with a tech-focused Unsplash image
    backgroundImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
  },
  basics: {
    name: "CESAR JEREZ",
    label: "Full Stack Developer",
    email: "csrstrps@gmail.com",
    phone: "+506-60492403",
    url: "https://www.strps.dev",
    location: {
      city: "San José",
      countryCode: "CR",
      region: "Costa Rica"
    },
    summary: "Multidisciplinary developer with a strong foundation in front-end and back-end technologies, passionate about crafting interactive experiences and building efficient, scalable systems. Background in electronics, CNC programming, and technical theater. Focused on delivering robust digital solutions.",
    profiles: [
      {
        network: "GitHub",
        username: "strps",
        url: "https://github.com/strps"
      },
      {
        network: "LinkedIn",
        username: "César Jerez",
        url: "https://www.linkedin.com/in/cesar-jerez-e/"
      }
    ]
  },
  work: [
    {
      company: "Amazon",
      position: "Customer Service Representative",
      startDate: "2023-09",
      endDate: "Present",
      summary: "Provided logistical and delivery support for drivers and customers, managing package issues, check-ins, and refunds.",
      highlights: [
        "Assisted drivers with navigational challenges and warehouse check-ins.",
        "Handled scanning issues and coordinated replacements or refunds.",
        "Resolved delivery-related customer support tickets efficiently."
      ]
    },
    {
      company: "Teleperformance",
      position: "Customer Service Representative",
      startDate: "2021-05",
      endDate: "2021-12",
      summary: "Supported customers of a retail account related to Target with inquiries on orders and returns.",
      highlights: [
        "Resolved customer questions about payments, shipments, returns, and refunds.",
        "Maintained a high satisfaction rate through empathetic and efficient service."
      ]
    },
    {
      company: "Teatro Espressivo",
      position: "Theater Technician",
      startDate: "2013-12",
      endDate: "2014-12",
      summary: "Managed technical staging and customer-facing duties in a professional theater.",
      highlights: [
        "Installed and operated sound, lighting, and video systems.",
        "Worked as usher and stage technician to ensure smooth show execution."
      ]
    }
  ],
  education: [
    {
      institution: "4Geeks Academy",
      area: "Full Stack Web Development",
      studyType: "Bootcamp",
      endDate: "2024",
      summary: "Completed full-stack developer training covering React, APIs, and databases."
    },
    {
      institution: "Universidad Latina de Costa Rica",
      area: "Electronics Engineering",
      studyType: "Bachelor(Incomplete)",
      startDate: "2015",
      endDate: "2016",
      summary: "Completed two years of coursework in electronic engineering before transitioning to software development."
    }
  ],
  projects: [
    {
      title: "ERPNext Custom Implementation",
      description: "Initial development of a self-hosted ERPNext system for handling invoicing, inventory, and CRM.",
      repoUrl: "https://github.com/strps/strps-erpnext",
      technologies: [
        { name: "ERPNext" },
        { name: "Python" },
        { name: "Frappe" },
      ]
    },
    {
      title: "STRPS Payload CMS Template",
      description: "Custom Payload CMS template with CAPTCHA-protected forms and dynamic page blocks powered by Next.js and Drizzle ORM.",
      liveUrl: "https://www.strps.dev/projects/strps-website-template",
      technologies: [
        { name: "Payload CMS" },
        { name: "Next.js" },
        { name: "Drizzle ORM" },
        { name: "React" },
      ]
    },
    {
      title: "Custom Pen Plotter",
      description: "Designed and built a DIY pen plotter using 3D printed parts, stepper motors, and Arduino. Focused on generative art and mechanical precision.",
      liveUrl: "https://www.strps.dev/projects/trackbit-gamified-habit-tracking",
      technologies: [
        { name: "Arduino" },
        { name: "3D Printing" },
        { name: "Generative Art" },
      ]
    }
  ],
  skills: [
    {
      name: "Front-End Development",
      keywords: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Bootstrap",
        "Redux",
        "Zustand",
        "Framer Motion",
        "Responsive Design",
        "UI/UX",
        "TanStack Query"
      ]
    },
    {
      name: "Back-End Development",
      keywords: [
        "Node.js",
        "Express.js",
        "Flask",
        "FastAPI",
        "Zod",
        "Drizzle ORM",
        "SQL Server",
        "PostgreSQL",
        "MySQL",
        "Redis"
      ]
    },
    {
      name: "Programming Languages",
      keywords: [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "C#",
        "VHDL"
      ]
    },
    {
      name: "Tools & Technologies",
      keywords: [
        "Git",
        "GitHub",
        "Chrome DevTools",
        "Figma",
        "Linux",
        "Windows",
        "MacOS",
        "Command Line",
        "Jest"
      ]
    }
  ]
};

