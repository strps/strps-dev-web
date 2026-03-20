
import type { RequiredDataFromCollectionSlug } from 'payload'

export const homePageData: Omit<RequiredDataFromCollectionSlug<'pages'>, 'createdAt' | 'updatedAt' | 'id'> = {
  title: 'Home',
  slug: 'home',
  _status: 'published',
  appearance: {
    headerOverrides: {
      theme: 'dark',
      background: false,
      overlay: true,
    },
  },
  layout: [
    {
      blockType: 'pageHero',
      name: 'CESAR JEREZ',
      label: 'Full Stack Developer',
      description:
        'Crafting interactive experiences and building efficient, scalable systems for the modern web.',
      location: {
        city: 'San José',
        region: 'Costa Rica',
      },
      status: {
        isAvailable: true,
        label: 'Available for new opportunities',
      },
      email: 'csrstrps@gmail.com',
      links: [
        {
          link: {
            type: 'custom',
            url: 'https://github.com/strps',
            label: 'GitHub',
            newTab: true,
            appearance: 'default',
          },
        },
        {
          link: {
            type: 'custom',
            url: 'https://www.linkedin.com/in/cesar-jerez-e/',
            label: 'LinkedIn',
            newTab: true,
            appearance: 'outline',
          },
        },
      ],
      section: {
        container: false,
        section_id: 'hero',
        backgroundContainer: false,
        theme: 'dark',
        background: 'none',
      },
    },
    {
      blockType: 'pageAbout',
      title: 'About Me',
      summary:
        'Multidisciplinary developer with a strong foundation in front-end and back-end technologies, passionate about crafting interactive experiences and building efficient, scalable systems. Background in electronics, CNC programming, and technical theater. Focused on delivering robust digital solutions.',
      section: {
        container: true,
        section_id: 'about',
        backgroundContainer: false,
        theme: 'auto',
        background: 'none',
      },
    },
    {
      blockType: 'pageSkills',
      title: 'Technical Arsenal',
      subtitle: 'Technologies & tools I work with',
      skillGroups: [
        {
          name: 'Front-End Development',
          icon: 'Monitor',
          keywords: [
            { keyword: 'HTML5' },
            { keyword: 'CSS3' },
            { keyword: 'JavaScript' },
            { keyword: 'TypeScript' },
            { keyword: 'React' },
            { keyword: 'Tailwind CSS' },
            { keyword: 'Bootstrap' },
            { keyword: 'Redux' },
            { keyword: 'Zustand' },
            { keyword: 'Framer Motion' },
            { keyword: 'Responsive Design' },
            { keyword: 'UI/UX' },
            { keyword: 'TanStack Query' },
          ],
        },
        {
          name: 'Back-End Development',
          icon: 'Server',
          keywords: [
            { keyword: 'Node.js' },
            { keyword: 'Express.js' },
            { keyword: 'Flask' },
            { keyword: 'FastAPI' },
            { keyword: 'Zod' },
            { keyword: 'Drizzle ORM' },
            { keyword: 'SQL Server' },
            { keyword: 'PostgreSQL' },
            { keyword: 'MySQL' },
            { keyword: 'Redis' },
          ],
        },
        {
          name: 'Programming Languages',
          icon: 'Terminal',
          keywords: [
            { keyword: 'JavaScript' },
            { keyword: 'TypeScript' },
            { keyword: 'Python' },
            { keyword: 'Java' },
            { keyword: 'C#' },
            { keyword: 'VHDL' },
          ],
        },
        {
          name: 'Tools & Technologies',
          icon: 'Wrench',
          keywords: [
            { keyword: 'Git' },
            { keyword: 'GitHub' },
            { keyword: 'Chrome DevTools' },
            { keyword: 'Figma' },
            { keyword: 'Linux' },
            { keyword: 'Windows' },
            { keyword: 'MacOS' },
            { keyword: 'Command Line' },
            { keyword: 'Jest' },
          ],
        },
      ],
      section: {
        container: true,
        section_id: 'skills',
        backgroundContainer: false,
        theme: 'auto',
        background: 'none',
      },
    },
    {
      blockType: 'pageExperience',
      title: 'Professional History',
      positions: [
        {
          company: 'Amazon',
          position: 'Customer Service Representative',
          startDate: '2023-09',
          endDate: 'Present',
          summary:
            'Provided logistical and delivery support for drivers and customers, managing package issues, check-ins, and refunds.',
          highlights: [
            { highlight: 'Assisted drivers with navigational challenges and warehouse check-ins.' },
            { highlight: 'Handled scanning issues and coordinated replacements or refunds.' },
            { highlight: 'Resolved delivery-related customer support tickets efficiently.' },
          ],
        },
        {
          company: 'Teleperformance',
          position: 'Customer Service Representative',
          startDate: '2021-05',
          endDate: '2021-12',
          summary:
            'Supported customers of a retail account related to Target with inquiries on orders and returns.',
          highlights: [
            { highlight: 'Resolved customer questions about payments, shipments, returns, and refunds.' },
            { highlight: 'Maintained a high satisfaction rate through empathetic and efficient service.' },
          ],
        },
        {
          company: 'Teatro Espressivo',
          position: 'Theater Technician',
          startDate: '2013-12',
          endDate: '2014-12',
          summary:
            'Managed technical staging and customer-facing duties in a professional theater.',
          highlights: [
            { highlight: 'Installed and operated sound, lighting, and video systems.' },
            { highlight: 'Worked as usher and stage technician to ensure smooth show execution.' },
          ],
        },
      ],
      section: {
        container: true,
        section_id: 'experience',
        backgroundContainer: false,
        theme: 'auto',
        background: 'none',
      },
    },
    {
      blockType: 'pageProjects',
      title: 'Featured Projects',
      populateBy: 'collection',
      limit: 6,
      githubUrl: 'https://github.com/strps',
      section: {
        container: true,
        section_id: 'projects',
        backgroundContainer: false,
        theme: 'auto',
        background: 'none',
      },
    },
    {
      blockType: 'pageContact',
      title: 'Ready to build something great?',
      description:
        'I\'m always open to new opportunities, collaborations, and interesting projects. Feel free to reach out!',
      email: 'csrstrps@gmail.com',
      links: [
        {
          link: {
            type: 'custom',
            url: 'mailto:csrstrps@gmail.com',
            label: 'Get in Touch',
            newTab: false,
            appearance: 'default',
          },
        },
        {
          link: {
            type: 'custom',
            url: 'https://www.linkedin.com/in/cesar-jerez-e/',
            label: 'LinkedIn',
            newTab: true,
            appearance: 'outline',
          },
        },
      ],
      section: {
        container: true,
        section_id: 'contact',
        backgroundContainer: false,
        theme: 'auto',
        background: 'none',
      },
    },
  ],
}

