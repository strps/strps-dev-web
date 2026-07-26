import type { RequiredDataFromCollectionSlug } from 'payload'
import { aboutNarrativeBody, aboutNarrativeBodyES } from './about-narrative'

type AboutPageSeed = Omit<RequiredDataFromCollectionSlug<'pages'>, 'createdAt' | 'updatedAt' | 'id'>

export const getAboutPageData = (formId: number): AboutPageSeed => ({
  title: 'About',
  slug: 'about',
  _status: 'published',
  appearance: {
    headerOverrides: {
      theme: 'dark',
      background: false,
      overlay: true,
    },
  },
  meta: {
    title: 'About — César Jerez',
    description:
      'From theater tech and electronics to full stack development — the background, skills, and experience behind the work.',
  },
  layout: [
    {
      blockType: 'pageHero',
      eyebrow: 'About',
      variant: 'statement',
      headline: 'How I got here.',
      showPlotLine: false,
      description:
        'From theater tech to full-stack development — the longer version of the path that got me building web apps for a living.',
      status: {
        isAvailable: false,
      },
      section: {
        section_id: 'hero',
        backgroundContainer: false,
        theme: 'dark',
        background: 'none',
      },
    },
    {
      blockType: 'pageAbout',
      eyebrow: 'Story',
      title: 'The long version',
      layout: 'twoColumn',
      body: aboutNarrativeBody,
      section: {
        section_id: 'about',
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
          summary: 'Managed technical staging and customer-facing duties in a professional theater.',
          highlights: [
            { highlight: 'Installed and operated sound, lighting, and video systems.' },
            { highlight: 'Worked as usher and stage technician to ensure smooth show execution.' },
          ],
        },
      ],
      section: {
        section_id: 'experience',
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
            { keyword: 'JavaScript' },
            { keyword: 'HTML5' },
            { keyword: 'CSS3' },
            { keyword: 'Redux' },
            { keyword: 'Zustand' },
            { keyword: 'Framer Motion' },
            { keyword: 'Responsive Design' },
            { keyword: 'TanStack Query' },
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
            { keyword: 'Python' },
            { keyword: 'Flask' },
            { keyword: 'FastAPI' },
            { keyword: 'Zod' },
            { keyword: 'Drizzle ORM' },
            { keyword: 'MySQL' },
            { keyword: 'Redis' },
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
            { keyword: 'GitHub' },
            { keyword: 'Docker' },
            { keyword: 'CI/CD' },
            { keyword: 'Figma' },
            { keyword: 'Chrome DevTools' },
            { keyword: 'Linux' },
            { keyword: 'Command Line' },
            { keyword: 'Jest' },
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

export const aboutPageDataES = {
  title: 'Sobre mí',
  meta: {
    title: 'Sobre mí — César Jerez',
    description:
      'De la técnica teatral y la electrónica al desarrollo full stack: la trayectoria, las habilidades y la experiencia detrás del trabajo.',
  },
  layout: [
    // pageHero
    {
      eyebrow: 'Sobre mí',
      headline: 'Cómo llegué hasta aquí.',
      description:
        'De la técnica teatral al desarrollo full stack: la versión larga del camino que me llevó a construir aplicaciones web para vivir.',
    },
    // pageAbout
    {
      eyebrow: 'Historia',
      title: 'La versión larga',
      body: aboutNarrativeBodyES,
    },
    // pageExperience
    {
      title: 'Historia profesional',
      positions: [
        {
          position: 'Representante de servicio al cliente',
          summary:
            'Brindé soporte logístico y de entregas a conductores y clientes, gestionando incidencias con paquetes, registros de entrada y reembolsos.',
          highlights: [
            { highlight: 'Asistí a conductores con desafíos de navegación y registros de entrada en bodega.' },
            { highlight: 'Atendí problemas de escaneo y coordiné reemplazos o reembolsos.' },
            { highlight: 'Resolví tickets de soporte relacionados con entregas de forma eficiente.' },
          ],
        },
        {
          position: 'Representante de servicio al cliente',
          summary:
            'Atendí a clientes de una cuenta minorista vinculada a Target con consultas sobre pedidos y devoluciones.',
          highlights: [
            { highlight: 'Resolví dudas sobre pagos, envíos, devoluciones y reembolsos.' },
            { highlight: 'Mantuve un alto índice de satisfacción con un servicio empático y eficiente.' },
          ],
        },
        {
          position: 'Técnico de teatro',
          summary: 'Gestioné el montaje técnico y la atención al público en un teatro profesional.',
          highlights: [
            { highlight: 'Instalé y operé sistemas de sonido, iluminación y video.' },
            { highlight: 'Trabajé como acomodador y técnico de escenario para asegurar funciones sin contratiempos.' },
          ],
        },
      ],
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
