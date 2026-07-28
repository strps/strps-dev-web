
import type { RequiredDataFromCollectionSlug } from 'payload'
import { aboutNarrativeBody, aboutNarrativeBodyES } from './about-narrative'

type HomePageSeed = Omit<RequiredDataFromCollectionSlug<'pages'>, 'createdAt' | 'updatedAt' | 'id'>

export const getHomePageData = (formId: number): HomePageSeed => ({
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
      variant: 'statement',
      headline: 'I build fast websites and web apps for businesses.',
      showPlotLine: true,
      description:
        "I'm César Jerez — a full stack developer in San José, Costa Rica, working at the intersection of web development, electronics, and system architecture. From landing pages to custom internal tools, I build things that work.",
      location: {
        city: 'San José',
        region: 'Costa Rica',
      },
      status: {
        isAvailable: true,
        label: 'Available for new projects',
        availableFrom: 'Q4 2026',
      },
      email: 'csrstrps@gmail.com',
      links: [
        {
          link: {
            type: 'custom',
            url: '#contact',
            label: 'Work with me',
            newTab: false,
            appearance: 'solid',
          },
        },
        {
          link: {
            type: 'custom',
            url: '#projects',
            label: 'See my work',
            newTab: false,
            appearance: 'outlineGhost',
          },
        },
      ],
      section: {
        section_id: 'hero',
        backgroundContainer: false,
        theme: 'dark',
        background: 'none',
      },
    },
    {
      blockType: 'pageServicesTeaser',
      eyebrow: 'Services',
      title: 'What I can build for you',
      link: {
        type: 'custom',
        url: '/services',
        label: 'Full details →',
        newTab: false,
      },
      items: [
        {
          name: 'Websites & landing pages',
          summary: 'Fast, modern sites with a CMS you can edit yourself.',
          link: {
            type: 'custom',
            url: '/services',
            label: 'Learn more',
            newTab: false,
          },
        },
        {
          name: 'Web apps & internal tools',
          summary: 'Dashboards, portals, and custom software built around your workflow.',
          link: {
            type: 'custom',
            url: '/services',
            label: 'Learn more',
            newTab: false,
          },
        },
        {
          name: 'APIs & automation',
          summary: 'Integrations and scripts that connect the tools you already use.',
          link: {
            type: 'custom',
            url: '/services',
            label: 'Learn more',
            newTab: false,
          },
        },
      ],
      section: {
        section_id: 'services',
        backgroundContainer: false,
        theme: 'auto',
        background: 'none',
      },
    },
    {
      blockType: 'pageProcess',
      variant: 'strip',
      title: 'How I Work',
      steps: [
        {
          title: 'Discovery',
          description: 'Free call — we scope what you actually need.',
        },
        {
          title: 'Proposal',
          description: 'Fixed price for fixed scope, in writing.',
        },
        {
          title: 'Build',
          description: 'Weekly progress, no black-box silence.',
        },
        {
          title: 'Handoff',
          description: "All code and credentials — it's yours.",
        },
      ],
      section: {
        section_id: 'process',
        backgroundContainer: false,
        theme: 'auto',
        background: 'none',
      },
    },
    {
      blockType: 'pageProjectsTeaser',
      eyebrow: 'Projects',
      title: 'Selected work',
      variant: 'hairline',
      link: {
        type: 'custom',
        url: '/projects',
        label: 'All projects →',
        newTab: false,
      },
      populateBy: 'collection',
      limit: 6,
      githubUrl: 'https://github.com/strps',
      section: {
        section_id: 'projects',
        backgroundContainer: false,
        theme: 'auto',
        background: 'none',
      },
    },
    {
      blockType: 'pageLabTeaser',
      eyebrow: 'Lab',
      title: 'Things I build for fun',
      intro: "Electronics, CNC, generative sketches — the stuff that doesn't fit a client brief.",
      link: {
        type: 'custom',
        url: '/lab',
        label: 'Visit the lab →',
        newTab: false,
      },
      limit: 3,
      section: {
        section_id: 'lab',
        backgroundContainer: false,
        theme: 'auto',
        background: 'none',
      },
    },
    {
      blockType: 'pageBlog',
      eyebrow: 'Writing',
      title: 'Notes and build logs',
      populateBy: 'collection',
      limit: 3,
      blogUrl: '/blog',
      section: {
        section_id: 'blog',
        backgroundContainer: false,
        theme: 'auto',
        background: 'none',
      },
    },
    {
      blockType: 'pageAbout',
      eyebrow: 'About',
      title: 'How I got here',
      layout: 'twoColumn',
      body: aboutNarrativeBody,
      link: {
        type: 'custom',
        url: '/about',
        label: 'More about me →',
        newTab: false,
      },
      section: {
        section_id: 'about',
        backgroundContainer: false,
        theme: 'auto',
        background: 'none',
      },
    },
    {
      blockType: 'pageSkills',
      eyebrow: 'Skills',
      title: 'Core stack',
      variant: 'list',
      skillGroups: [
        {
          name: 'Frontend',
          icon: 'Monitor',
          keywords: [
            { keyword: 'React' },
            { keyword: 'Next.js' },
            { keyword: 'TypeScript' },
            { keyword: 'Tailwind CSS' },
          ],
        },
        {
          name: 'Backend',
          icon: 'Server',
          keywords: [
            { keyword: 'Node.js' },
            { keyword: 'Express' },
            { keyword: 'PostgreSQL' },
            { keyword: 'REST / GraphQL' },
          ],
        },
        {
          name: 'Electronics',
          icon: 'Cpu',
          keywords: [
            { keyword: 'VHDL' },
            { keyword: 'PCB design' },
            { keyword: 'Embedded C' },
            { keyword: 'CNC / 3D printing' },
          ],
        },
        {
          name: 'Tooling',
          icon: 'Wrench',
          keywords: [
            { keyword: 'Git' },
            { keyword: 'Docker' },
            { keyword: 'CI/CD' },
            { keyword: 'Figma' },
          ],
        },
      ],
      section: {
        section_id: 'skills',
        backgroundContainer: false,
        theme: 'auto',
        background: 'none',
      },
    },
    {
      blockType: 'pageContact',
      eyebrow: 'Contact',
      title: 'Have a project in mind?',
      description:
        "Tell me what you're trying to build — a couple of sentences is enough to get started. I reply within one business day.",
      email: 'csrstrps@gmail.com',
      emailLabel: 'Prefer email?',
      note: 'I reply within one business day',
      form: formId,
      section: {
        section_id: 'contact',
        backgroundContainer: false,
        theme: 'auto',
        background: 'none',
      },
    },
  ],
})

/* -------------------------------------------------------------------------- */
/*  Spanish (es) patch — localized fields only, layout blocks in en order.    */
/* -------------------------------------------------------------------------- */

export const homePageDataES = {
  title: 'Inicio',
  layout: [
    // pageHero
    {
      headline: 'Construyo sitios web y aplicaciones rápidas para empresas.',
      description:
        'Soy César Jerez, desarrollador full stack en San José, Costa Rica, trabajando en la intersección entre el desarrollo web, la electrónica y la arquitectura de sistemas. Desde landing pages hasta herramientas internas a medida, construyo cosas que funcionan.',
      location: {
        city: 'San José',
        region: 'Costa Rica',
      },
      status: {
        label: 'Disponible para nuevos proyectos',
        availableFrom: 'Q4 2026',
      },
      links: [
        { link: { label: 'Trabajemos juntos' } },
        { link: { label: 'Ver mi trabajo' } },
      ],
    },
    // pageServicesTeaser
    {
      eyebrow: 'Servicios',
      title: 'Lo que puedo construir para vos',
      link: { label: 'Todos los detalles →' },
      items: [
        {
          name: 'Sitios web y landing pages',
          summary: 'Sitios rápidos y modernos con un CMS que podés editar vos mismo.',
          link: { label: 'Saber más' },
        },
        {
          name: 'Aplicaciones web y herramientas internas',
          summary: 'Dashboards, portales y software a medida diseñado en torno a tu flujo de trabajo.',
          link: { label: 'Saber más' },
        },
        {
          name: 'APIs y automatización',
          summary: 'Integraciones y scripts que conectan las herramientas que ya usás.',
          link: { label: 'Saber más' },
        },
      ],
    },
    // pageProcess
    {
      title: 'Cómo trabajo',
      steps: [
        { title: 'Descubrimiento', description: 'Llamada gratuita: definimos lo que realmente necesitás.' },
        { title: 'Propuesta', description: 'Precio fijo para alcance fijo, por escrito.' },
        { title: 'Construcción', description: 'Avances semanales, sin silencios de caja negra.' },
        { title: 'Entrega', description: 'Todo el código y las credenciales: es tuyo.' },
      ],
    },
    // pageProjectsTeaser
    {
      eyebrow: 'Proyectos',
      title: 'Trabajo seleccionado',
      link: { label: 'Todos los proyectos →' },
    },
    // pageLabTeaser
    {
      eyebrow: 'Lab',
      title: 'Cosas que construyo por gusto',
      intro: 'Electrónica, CNC, bocetos generativos: lo que no cabe en un encargo de cliente.',
      link: { label: 'Visitar el lab →' },
    },
    // pageBlog
    {
      eyebrow: 'Escritos',
      title: 'Notas y bitácoras de construcción',
    },
    // pageAbout
    {
      eyebrow: 'Sobre mí',
      title: 'Cómo llegué hasta aquí',
      body: aboutNarrativeBodyES,
      link: { label: 'Más sobre mí →' },
    },
    // pageSkills
    {
      eyebrow: 'Habilidades',
      title: 'Stack principal',
      skillGroups: [
        { name: 'Frontend' },
        { name: 'Backend' },
        { name: 'Electrónica' },
        { name: 'Herramientas' },
      ],
    },
    // pageContact
    {
      eyebrow: 'Contacto',
      title: '¿Tenés un proyecto en mente?',
      description:
        'Contame qué estás tratando de construir: con un par de oraciones basta para empezar. Respondo en un día hábil.',
      emailLabel: '¿Preferís el correo?',
      note: 'Respondo en un día hábil',
    },
  ],
}
