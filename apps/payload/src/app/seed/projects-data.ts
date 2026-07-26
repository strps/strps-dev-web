import type { RequiredDataFromCollectionSlug } from 'payload'

type ProjectSeed = Omit<RequiredDataFromCollectionSlug<'projects'>, 'createdAt' | 'updatedAt' | 'id'>

export const projectsData: ProjectSeed[] = [
    {
        title: 'STRPS — this site',
        slug: 'strps-website-template',
        _status: 'published',
        publishedAt: new Date().toISOString(),
        links: {
            github: 'https://github.com/strps/strps-website-template',
            liveSite: 'https://www.strps.dev',
        },
        techStack: [
            { name: 'Next.js' },
            { name: 'TypeScript' },
            { name: 'PayloadCMS' },
            { name: 'Tailwind CSS' },
            { name: 'PostgreSQL' },
            { name: 'GraphQL' },
            { name: 'Vercel' },
            { name: 'Turborepo' },
        ],
        caseStudy: {
            tag: 'Template / product',
            year: '2024–2026',
            problem: 'Freelance portfolios usually look like a resume with a CSS file.',
            contribution:
                "Built a Next.js + Payload CMS template flexible enough to run a portfolio and a services business from the same codebase — the one you're looking at.",
            context:
                'Most freelance portfolios are a resume with a stylesheet — static, hard to update, and impossible to extend into an actual business tool. I wanted a template I could run my own portfolio on today and turn into a client-facing product later.',
            decisions:
                'Built content as Payload CMS collections from day one (projects, blog posts, and now lab items) rather than hardcoding pages — the same schema that powers my portfolio can power a client\'s site with zero rearchitecting. Framer Motion is used only for a handful of deliberate moments, not blanket page transitions.',
            outcome:
                'The site you\'re looking at right now, and the base template for the web design service I offer clients.',
        },
        content: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'heading',
                        children: [{ type: 'text', text: 'Overview', version: 1 }],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        tag: 'h2',
                        version: 1,
                    },
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'A modern, full-stack website template built with Next.js 16 and PayloadCMS 3. Designed as a monorepo with Turborepo, it provides a fully customizable portfolio and content management solution with a headless CMS backend and a decoupled frontend.',
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                    },
                    {
                        type: 'heading',
                        children: [{ type: 'text', text: 'Features', version: 1 }],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        tag: 'h2',
                        version: 1,
                    },
                    {
                        type: 'list',
                        children: [
                            {
                                type: 'listitem',
                                children: [{ type: 'text', text: 'Headless CMS with PayloadCMS 3 and Lexical rich text editor', version: 1 }],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                value: 1,
                                version: 1,
                            },
                            {
                                type: 'listitem',
                                children: [{ type: 'text', text: 'Configurable page sections with drag-and-drop block layout', version: 1 }],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                value: 2,
                                version: 1,
                            },
                            {
                                type: 'listitem',
                                children: [{ type: 'text', text: 'Apollo GraphQL client for efficient data fetching', version: 1 }],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                value: 3,
                                version: 1,
                            },
                            {
                                type: 'listitem',
                                children: [{ type: 'text', text: 'Dark mode support with automatic theme detection', version: 1 }],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                value: 4,
                                version: 1,
                            },
                            {
                                type: 'listitem',
                                children: [{ type: 'text', text: 'SEO-optimized with meta fields and sitemap generation', version: 1 }],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                value: 5,
                                version: 1,
                            },
                            {
                                type: 'listitem',
                                children: [{ type: 'text', text: 'Live preview in the admin panel for real-time content editing', version: 1 }],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                value: 6,
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        listType: 'bullet',
                        start: 1,
                        tag: 'ul',
                        version: 1,
                    },
                    {
                        type: 'heading',
                        children: [{ type: 'text', text: 'Architecture', version: 1 }],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        tag: 'h2',
                        version: 1,
                    },
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'The project follows a monorepo structure managed by pnpm workspaces and Turborepo. The Payload app serves as the CMS backend and admin interface, while the frontend app is a standalone Next.js application that fetches data via GraphQL. Shared types are generated from the Payload schema and consumed by both apps through a shared package.',
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
            },
        },
        appearance: {
            headerOverrides: {
                theme: 'dark',
                background: false,
                overlay: true,
            },
        },
        meta: {
            title: 'STRPS Website Template — Full-Stack Portfolio & CMS',
            description:
                'A modern website template built with Next.js, PayloadCMS, and Tailwind CSS. Features a headless CMS, GraphQL API, dark mode, and SEO optimization.',
        },
    },
    {
        title: 'TrackBit',
        slug: 'trackbit',
        _status: 'published',
        publishedAt: new Date().toISOString(),
        links: {
            github: 'https://github.com/strps/trackbit',
            liveSite: 'https://trackbit.app',
        },
        techStack: [
            { name: 'React' },
            { name: 'TypeScript' },
            { name: 'Node.js' },
            { name: 'Express' },
            { name: 'PostgreSQL' },
            { name: 'Tailwind CSS' },
            { name: 'Drizzle ORM' },
            { name: 'Zustand' },
        ],
        caseStudy: {
            tag: 'Product',
            year: '2025',
            problem:
                'Habit trackers either oversimplify (a checkbox) or overwhelm (spreadsheets nobody keeps up with).',
            contribution:
                'Built a full-stack habit tracker with streak logic, weekly analytics, and a dashboard people actually open twice a day.',
            context:
                'Habit trackers either oversimplify to a checkbox or overwhelm with spreadsheets nobody keeps up with. I wanted something in between — enough structure to see patterns, not enough friction to abandon after a week.',
            decisions:
                'Streaks are computed server-side and cached, not recalculated on every render — the analytics dashboard stayed fast even with a year of daily entries. Chose Postgres over a document store specifically so streak queries could be plain SQL instead of application-layer logic.',
            outcome:
                "A working product with streak tracking, weekly analytics, and a dashboard that's actually opened daily rather than abandoned after onboarding.",
        },
        content: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'heading',
                        children: [{ type: 'text', text: 'Overview', version: 1 }],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        tag: 'h2',
                        version: 1,
                    },
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'TrackBit is a habit tracking application that helps users build and maintain positive daily routines. With an intuitive interface and insightful analytics, it makes it easy to stay accountable and visualize progress over time.',
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                    },
                    {
                        type: 'heading',
                        children: [{ type: 'text', text: 'Features', version: 1 }],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        tag: 'h2',
                        version: 1,
                    },
                    {
                        type: 'list',
                        children: [
                            {
                                type: 'listitem',
                                children: [{ type: 'text', text: 'Create and manage daily, weekly, and custom habits', version: 1 }],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                value: 1,
                                version: 1,
                            },
                            {
                                type: 'listitem',
                                children: [{ type: 'text', text: 'Visual streak tracking with calendar heatmaps', version: 1 }],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                value: 2,
                                version: 1,
                            },
                            {
                                type: 'listitem',
                                children: [{ type: 'text', text: 'Progress analytics with charts and completion percentages', version: 1 }],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                value: 3,
                                version: 1,
                            },
                            {
                                type: 'listitem',
                                children: [{ type: 'text', text: 'Customizable reminders and notifications', version: 1 }],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                value: 4,
                                version: 1,
                            },
                            {
                                type: 'listitem',
                                children: [{ type: 'text', text: 'Responsive design that works on desktop and mobile', version: 1 }],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                value: 5,
                                version: 1,
                            },
                            {
                                type: 'listitem',
                                children: [{ type: 'text', text: 'User authentication with secure session management', version: 1 }],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                value: 6,
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        listType: 'bullet',
                        start: 1,
                        tag: 'ul',
                        version: 1,
                    },
                    {
                        type: 'heading',
                        children: [{ type: 'text', text: 'How It Works', version: 1 }],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        tag: 'h2',
                        version: 1,
                    },
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'Users create habits with customizable schedules and goals. Each day, they check off completed habits from their dashboard. TrackBit records completions and calculates streaks, providing visual feedback through heatmaps and charts. The backend uses Drizzle ORM with PostgreSQL for efficient data storage and retrieval, while Zustand manages client-side state for a snappy user experience.',
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
            },
        },
        appearance: {
            headerOverrides: {
                theme: 'dark',
                background: false,
                overlay: true,
            },
        },
        meta: {
            title: 'TrackBit — Habit Tracker',
            description:
                'A habit tracking app built with React, Node.js, and PostgreSQL. Features streak tracking, analytics dashboards, and customizable reminders to help build better routines.',
        },
    },
]

/* -------------------------------------------------------------------------- */
/*  Spanish (es) patches — localized fields only, parallel to projectsData.    */
/*  Merged onto each created project by index (see localize.ts).               */
/* -------------------------------------------------------------------------- */

// Minimal Lexical node builders — content richText is replaced wholesale.
const h2 = (text: string) => ({
    type: 'heading',
    tag: 'h2',
    children: [{ type: 'text', text, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
})
const p = (text: string) => ({
    type: 'paragraph',
    children: [{ type: 'text', text, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
})
const ul = (items: string[]) => ({
    type: 'list',
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: items.map((text, i) => ({
        type: 'listitem',
        children: [{ type: 'text', text, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        value: i + 1,
        version: 1,
    })),
})
const doc = (...children: object[]) => ({
    root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 },
})

export const projectsDataES = [
    // STRPS — this site
    {
        title: 'STRPS — este sitio',
        meta: {
            title: 'Plantilla de sitio STRPS — Portafolio full-stack y CMS',
            description:
                'Una plantilla de sitio web moderna construida con Next.js, PayloadCMS y Tailwind CSS. Incluye un CMS headless, API GraphQL, modo oscuro y optimización para SEO.',
        },
        caseStudy: {
            tag: 'Plantilla / producto',
            problem: 'Los portafolios freelance suelen verse como un currículum con una hoja de estilos.',
            contribution:
                'Construí una plantilla con Next.js + Payload CMS lo bastante flexible para manejar un portafolio y un negocio de servicios desde la misma base de código: la que estás viendo.',
            context:
                'La mayoría de los portafolios freelance son un currículum con una hoja de estilos: estáticos, difíciles de actualizar e imposibles de convertir en una herramienta de negocio real. Quería una plantilla con la que pudiera manejar mi propio portafolio hoy y convertir en un producto para clientes después.',
            decisions:
                'Construí el contenido como colecciones de Payload CMS desde el día uno (proyectos, entradas de blog y ahora elementos del lab) en lugar de páginas hardcodeadas: el mismo esquema que impulsa mi portafolio puede impulsar el sitio de un cliente sin rearquitectura. Framer Motion se usa solo en un puñado de momentos deliberados, no en transiciones de página generalizadas.',
            outcome:
                'El sitio que estás viendo ahora mismo, y la plantilla base del servicio de diseño web que ofrezco a mis clientes.',
        },
        content: doc(
            h2('Resumen'),
            p('Una plantilla de sitio web moderna y full-stack construida con Next.js 16 y PayloadCMS 3. Diseñada como monorepo con Turborepo, ofrece un portafolio totalmente personalizable y una solución de gestión de contenido con un backend headless CMS y un frontend desacoplado.'),
            h2('Características'),
            ul([
                'CMS headless con PayloadCMS 3 y el editor de texto enriquecido Lexical',
                'Secciones de página configurables con maquetado de bloques por arrastrar y soltar',
                'Cliente Apollo GraphQL para una obtención de datos eficiente',
                'Soporte para modo oscuro con detección automática de tema',
                'Optimizado para SEO con campos meta y generación de sitemap',
                'Vista previa en vivo en el panel de administración para edición de contenido en tiempo real',
            ]),
            h2('Arquitectura'),
            p('El proyecto sigue una estructura de monorepo gestionada por pnpm workspaces y Turborepo. La app de Payload funciona como backend del CMS e interfaz de administración, mientras que la app frontend es una aplicación Next.js independiente que obtiene datos vía GraphQL. Los tipos compartidos se generan a partir del esquema de Payload y ambos apps los consumen mediante un paquete compartido.'),
        ),
    },
    // TrackBit
    {
        meta: {
            title: 'TrackBit — Rastreador de hábitos',
            description:
                'Una app de seguimiento de hábitos construida con React, Node.js y PostgreSQL. Incluye seguimiento de rachas, dashboards de analítica y recordatorios personalizables para ayudar a construir mejores rutinas.',
        },
        caseStudy: {
            tag: 'Producto',
            problem: 'Los rastreadores de hábitos o simplifican de más (una casilla) o abruman (hojas de cálculo que nadie mantiene).',
            contribution:
                'Construí un rastreador de hábitos full-stack con lógica de rachas, analítica semanal y un dashboard que la gente de verdad abre dos veces al día.',
            context:
                'Los rastreadores de hábitos o se simplifican a una casilla o abruman con hojas de cálculo que nadie mantiene. Quería algo intermedio: suficiente estructura para ver patrones, no tanta fricción como para abandonarlo tras una semana.',
            decisions:
                'Las rachas se calculan en el servidor y se cachean, no se recalculan en cada render: el dashboard de analítica se mantuvo rápido incluso con un año de entradas diarias. Elegí Postgres sobre un almacén de documentos precisamente para que las consultas de rachas fueran SQL plano en lugar de lógica en la capa de aplicación.',
            outcome:
                'Un producto funcional con seguimiento de rachas, analítica semanal y un dashboard que de verdad se abre a diario en lugar de abandonarse tras el onboarding.',
        },
        content: doc(
            h2('Resumen'),
            p('TrackBit es una aplicación de seguimiento de hábitos que ayuda a los usuarios a construir y mantener rutinas diarias positivas. Con una interfaz intuitiva y una analítica reveladora, facilita mantener el compromiso y visualizar el progreso a lo largo del tiempo.'),
            h2('Características'),
            ul([
                'Crear y gestionar hábitos diarios, semanales y personalizados',
                'Seguimiento visual de rachas con mapas de calor de calendario',
                'Analítica de progreso con gráficos y porcentajes de cumplimiento',
                'Recordatorios y notificaciones personalizables',
                'Diseño responsive que funciona en escritorio y móvil',
                'Autenticación de usuarios con gestión segura de sesiones',
            ]),
            h2('Cómo funciona'),
            p('Los usuarios crean hábitos con horarios y metas personalizables. Cada día marcan los hábitos completados desde su dashboard. TrackBit registra los cumplimientos y calcula las rachas, ofreciendo retroalimentación visual mediante mapas de calor y gráficos. El backend usa Drizzle ORM con PostgreSQL para un almacenamiento y recuperación de datos eficientes, mientras que Zustand gestiona el estado del lado del cliente para una experiencia ágil.'),
        ),
    },
]
