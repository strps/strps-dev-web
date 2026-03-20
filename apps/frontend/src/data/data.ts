import { getClient } from '@/lib/apollo-client'
import { gql } from '@apollo/client'


export const GET_NAV_ITEMS = gql`
  query GetNavItems {
    Header {
      navItems {
        link {
          type
          newTab
          url
          label
        }
      }
    }
  }
`

export async function getNavItems() {
  const client = getClient()

  const { data } = await client.query({
    query: GET_NAV_ITEMS,
  }) as { data: { navItems: { name: string, href: string }[] } }

  return data.navItems
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

