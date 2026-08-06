import type { RequiredDataFromCollectionSlug } from 'payload'

type ProjectSeed = Omit<RequiredDataFromCollectionSlug<'projects'>, 'createdAt' | 'updatedAt' | 'id'>

/* -------------------------------------------------------------------------- */
/*  Minimal Lexical node builders — used for both en `content` and es patches. */
/*  Rich-text values are replaced wholesale on the es write (see localize.ts). */
/* -------------------------------------------------------------------------- */
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
type LexicalNode = { [k: string]: unknown; type: string; version: number }
const doc = (...children: LexicalNode[]) => ({
    root: {
        type: 'root',
        children,
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
    },
})

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
    {
        title: 'INEX — Architecture Studio',
        slug: 'inex-website',
        _status: 'published',
        publishedAt: new Date().toISOString(),
        links: {
            liveSite: 'https://www.inex.mx',
        },
        techStack: [
            { name: 'Next.js' },
            { name: 'TypeScript' },
            { name: 'PayloadCMS' },
            { name: 'Tailwind CSS' },
            { name: 'PostgreSQL' },
            { name: 'Vercel' },
        ],
        caseStudy: {
            tag: 'Client site / Architecture',
            year: '2025',
            problem:
                "An architecture studio's work is its portfolio, but their old site buried projects behind slow galleries and a template no one on the team could update.",
            contribution:
                'Designed and built a fast, image-forward marketing site with a CMS the studio manages itself.',
            context:
                'INEX is an architecture firm whose reputation rests entirely on its built work. Their previous site was a rigid template — heavy image galleries, slow to load, and impossible to update without a developer — so the portfolio was always months out of date.',
            decisions:
                'Made every project a Payload CMS entry with structured fields for imagery, location, and program, so the team publishes new work without touching code. Optimized image delivery aggressively — responsive sources and lazy loading — because for an architecture studio the photography is the product.',
            outcome:
                'A gallery-first site the studio updates on its own, with project pages that load fast and let the architecture speak.',
        },
        content: doc(
            h2('Overview'),
            p('INEX is an architecture studio whose reputation is built on its finished work. The site is a fast, image-forward showcase of that work, backed by a CMS the team manages without a developer.'),
            h2('Highlights'),
            ul([
                'Gallery-first project pages built around large, responsive photography',
                'Structured project entries — imagery, location, program, and year — editable in Payload',
                'Aggressive image optimization with responsive sources and lazy loading',
                'Bilingual content model (English and Spanish)',
                'SEO-optimized project and studio pages',
            ]),
            h2('Approach'),
            p('Every project is a Payload CMS entry, so the studio publishes new work through the admin panel rather than editing code. Because the photography is effectively the product, image delivery was tuned first: responsive sources, lazy loading, and a layout that lets full-bleed imagery carry each page.'),
        ),
        appearance: {
            headerOverrides: {
                theme: 'dark',
                background: false,
                overlay: true,
            },
        },
        meta: {
            title: 'INEX — Architecture Studio',
            description:
                'A fast, image-forward website for an architecture studio, built with Next.js and PayloadCMS so the team publishes new work without a developer.',
        },
    },
    {
        title: 'SOLEC — MEP Engineering & Maintenance',
        slug: 'solec-website',
        _status: 'published',
        publishedAt: new Date().toISOString(),
        links: {
            liveSite: 'https://www.solec.mx',
        },
        techStack: [
            { name: 'Next.js' },
            { name: 'TypeScript' },
            { name: 'PayloadCMS' },
            { name: 'Tailwind CSS' },
            { name: 'PostgreSQL' },
            { name: 'Vercel' },
        ],
        caseStudy: {
            tag: 'Client site / Engineering',
            year: '2025',
            problem:
                "A commercial MEP firm wins work on credibility, but their web presence didn't show the depth of what they do or make it easy to start a conversation.",
            contribution:
                'Built a clear, credibility-first marketing site with a quote-request flow, on the same foundation that powers ServiceGrid.',
            context:
                'SOLEC provides mechanical, electrical, and plumbing engineering plus ongoing maintenance — a broad offering aimed at commercial clients who need proof before they call. Their previous presence undersold that range.',
            decisions:
                'Structured the site around services and project references rather than marketing copy, since commercial clients buy on evidence. Kept content in Payload so the team keeps their track record current, and wired the quote-request flow straight to their inbox.',
            outcome:
                "A site that presents SOLEC's full range with the proof to back it, and the anchor client for the ServiceGrid platform built alongside it.",
        },
        content: doc(
            h2('Overview'),
            p('SOLEC provides mechanical, electrical, and plumbing (MEP) engineering along with ongoing maintenance services. The site presents their services and project track record and gives prospective clients a clear path to request a quote.'),
            h2('Highlights'),
            ul([
                'Service pages covering MEP engineering, installation, and maintenance',
                'Project references that establish credibility with commercial clients',
                "Quote-request flow wired to the team's inbox",
                'CMS-managed content the SOLEC team updates directly',
                'Fast, mobile-first layout for on-site and on-the-go browsing',
            ]),
            h2('Approach'),
            p('Built on the same Next.js + Payload foundation as the rest of the portfolio, the SOLEC site prioritizes clarity for a commercial audience: what they do, proof they can do it, and a direct way to start a conversation. It also served as the anchor client for ServiceGrid, the service-management platform built alongside it.'),
        ),
        appearance: {
            headerOverrides: {
                theme: 'dark',
                background: false,
                overlay: true,
            },
        },
        meta: {
            title: 'SOLEC — MEP Engineering & Maintenance',
            description:
                'A marketing site for a mechanical, electrical, and plumbing engineering firm, built with Next.js and PayloadCMS with a quote-request flow and CMS-managed content.',
        },
    },
    {
        title: 'ServiceGrid',
        slug: 'servicegrid',
        _status: 'published',
        publishedAt: new Date().toISOString(),
        links: {
            liveSite: 'https://servicegrid.app',
        },
        techStack: [
            { name: 'Next.js' },
            { name: 'TypeScript' },
            { name: 'Node.js' },
            { name: 'PostgreSQL' },
            { name: 'Drizzle ORM' },
            { name: 'Tailwind CSS' },
        ],
        caseStudy: {
            tag: 'Product / Platform',
            year: '2025–2026',
            problem:
                'Service businesses run on scattered WhatsApp threads, spreadsheets, and phone calls between customers, office staff, and field technicians — and nobody shares a single source of truth.',
            contribution:
                'Built a white-label service-management platform that unifies customer requests, staff dispatch, and field-worker job tracking — first deployed for SOLEC.',
            context:
                'SOLEC coordinated service work across customers, office staff, and technicians in the field using whatever channel was closest to hand. Status lived in messages and memory, so the same question got asked three times and jobs slipped.',
            decisions:
                "Modeled every request as a job on a shared lifecycle so all three audiences read and write the same record. Built the field-worker view phone-first, since that's where the work happens. Kept theming in configuration, not code, so the platform ships white-label to the next client without a fork.",
            outcome:
                'A single system replacing the WhatsApp-and-spreadsheet workflow for SOLEC, architected from day one to be re-skinned for other service businesses.',
        },
        content: doc(
            h2('Overview'),
            p('ServiceGrid is a white-label service-management platform that connects three audiences around a single job: customers who request service, office staff who schedule and dispatch it, and field workers who carry it out. It was built first as the operational backbone for SOLEC, then generalized so it can be re-skinned for any service business.'),
            h2('Highlights'),
            ul([
                'Customer portal for requesting service and tracking job status',
                'Staff dashboard for scheduling, dispatch, and job assignment',
                'Field-worker view optimized for phones — job details, checklists, and status updates',
                'White-label theming so the same platform ships under different brands',
                'Role-based access separating customer, staff, and field-worker permissions',
            ]),
            h2('Architecture'),
            p('The data model treats every service request as a job that moves through a shared lifecycle, so customers, staff, and field workers all read from and write to the same source of truth instead of scattered WhatsApp threads and spreadsheets. Roles and permissions gate what each audience sees, and theming lives in configuration rather than code so a new client can be onboarded without a fork. SOLEC is the proving ground; the architecture is deliberately tenant-agnostic.'),
        ),
        appearance: {
            headerOverrides: {
                theme: 'dark',
                background: false,
                overlay: true,
            },
        },
        meta: {
            title: 'ServiceGrid — White-Label Service Management Platform',
            description:
                'A white-label platform connecting customers, office staff, and field workers around a single job. Built first for SOLEC, then generalized for any service business.',
        },
    },
    {
        title: 'Bufete Solano',
        slug: 'bufete-solano',
        _status: 'published',
        publishedAt: new Date().toISOString(),
        links: {
            liveSite: 'https://www.bufetesolano.com',
        },
        techStack: [
            { name: 'Next.js' },
            { name: 'TypeScript' },
            { name: 'PayloadCMS' },
            { name: 'PostgreSQL' },
            { name: 'Tailwind CSS' },
            { name: 'Claude API' },
        ],
        caseStudy: {
            tag: 'Client platform / Legal + AI',
            year: '2026',
            problem:
                "Small law firms lose prospective clients in the gap between a first question and a human reply, and once someone becomes a client, matter status lives in the lawyer's head.",
            contribution:
                "Built the firm's website plus an AI chatbot for first contact and a shared board where clients track their matters and staff manage the caseload.",
            context:
                'Bufete Solano needed more than a brochure site. Prospective clients arrive with questions at all hours, and existing clients kept calling to ask "where is my case?" — both landing on staff as interruptions.',
            decisions:
                'Put an AI chatbot at the front door to answer common questions and triage inquiries into structured leads, so staff receive intent rather than raw messages. Built a single board read by both clients and staff so case status is a shared record instead of a phone call. Used the Claude API for its Spanish-language reliability.',
            outcome:
                'A site that converts, a chatbot that handles first contact around the clock, and a board that turns "where\'s my case?" calls into a status anyone can check.',
        },
        content: doc(
            h2('Overview'),
            p('Bufete Solano is a law firm. The project pairs a public website with an AI chatbot that answers prospective-client questions and routes inquiries, plus a shared board where clients track their matters and staff manage the caseload behind them.'),
            h2('Highlights'),
            ul([
                "Marketing website presenting the firm's practice areas and team",
                'AI chatbot, powered by the Claude API, that handles first-contact questions and triage',
                'Client-facing board for tracking case status and messages',
                'Staff-facing board for managing inquiries, clients, and follow-up',
                'Bilingual content and conversation (English and Spanish)',
            ]),
            h2('Approach'),
            p('The chatbot is the CX front door: it answers common questions, captures intent, and hands structured inquiries to staff instead of dropping them into an inbox. Behind it, customers and staff share a board over the same records — clients see the status of their matters, staff see the queue and act on it. The chatbot runs on the Claude API, chosen for reliable Spanish-language conversation and instruction-following.'),
        ),
        appearance: {
            headerOverrides: {
                theme: 'dark',
                background: false,
                overlay: true,
            },
        },
        meta: {
            title: 'Bufete Solano — Law Firm Site, AI Chatbot & Client Board',
            description:
                'A law-firm website paired with a Claude-powered chatbot for first contact and a shared board where clients track their matters and staff manage the caseload.',
        },
    },
]

/* -------------------------------------------------------------------------- */
/*  Spanish (es) patches — localized fields only, parallel to projectsData.    */
/*  Merged onto each created project by index (see localize.ts).               */
/*  Lexical builders (h2/p/ul/doc) are defined above projectsData.             */
/* -------------------------------------------------------------------------- */

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
    // INEX — Architecture Studio
    {
        title: 'INEX — Estudio de Arquitectura',
        meta: {
            title: 'INEX — Estudio de Arquitectura',
            description:
                'Un sitio web rápido y centrado en la imagen para un estudio de arquitectura, construido con Next.js y PayloadCMS para que el equipo publique nuevos proyectos sin un desarrollador.',
        },
        caseStudy: {
            tag: 'Sitio de cliente / Arquitectura',
            problem:
                'El trabajo de un estudio de arquitectura es su portafolio, pero su sitio anterior escondía los proyectos tras galerías lentas y una plantilla que nadie del equipo podía actualizar.',
            contribution:
                'Diseñé y construí un sitio rápido y centrado en la imagen con un CMS que el estudio gestiona por sí mismo.',
            context:
                'INEX es un despacho de arquitectura cuya reputación descansa por completo en su obra construida. Su sitio anterior era una plantilla rígida —galerías de imágenes pesadas, lentas de cargar e imposibles de actualizar sin un desarrollador—, así que el portafolio siempre estaba meses desactualizado.',
            decisions:
                'Convertí cada proyecto en una entrada de Payload CMS con campos estructurados para imágenes, ubicación y programa, de modo que el equipo publica obra nueva sin tocar código. Optimicé la entrega de imágenes de forma agresiva —fuentes responsivas y carga diferida— porque para un estudio de arquitectura la fotografía es el producto.',
            outcome:
                'Un sitio centrado en la galería que el estudio actualiza por su cuenta, con páginas de proyecto que cargan rápido y dejan hablar a la arquitectura.',
        },
        content: doc(
            h2('Resumen'),
            p('INEX es un estudio de arquitectura cuya reputación se construye sobre su obra terminada. El sitio es una vitrina rápida y centrada en la imagen de ese trabajo, respaldada por un CMS que el equipo gestiona sin un desarrollador.'),
            h2('Aspectos destacados'),
            ul([
                'Páginas de proyecto centradas en la galería, construidas en torno a fotografía amplia y responsiva',
                'Entradas de proyecto estructuradas —imágenes, ubicación, programa y año— editables en Payload',
                'Optimización agresiva de imágenes con fuentes responsivas y carga diferida',
                'Modelo de contenido bilingüe (inglés y español)',
                'Páginas de proyecto y de estudio optimizadas para SEO',
            ]),
            h2('Enfoque'),
            p('Cada proyecto es una entrada de Payload CMS, así que el estudio publica obra nueva desde el panel de administración en lugar de editar código. Como la fotografía es en la práctica el producto, la entrega de imágenes se afinó primero: fuentes responsivas, carga diferida y un diseño que deja que la imagen a sangre completa lleve cada página.'),
        ),
    },
    // SOLEC — MEP Engineering & Maintenance
    {
        title: 'SOLEC — Ingeniería MEP y Mantenimiento',
        meta: {
            title: 'SOLEC — Ingeniería MEP y Mantenimiento',
            description:
                'Un sitio de marketing para una firma de ingeniería mecánica, eléctrica y de plomería, construido con Next.js y PayloadCMS, con un flujo de solicitud de cotización y contenido gestionado por CMS.',
        },
        caseStudy: {
            tag: 'Sitio de cliente / Ingeniería',
            problem:
                'Una firma comercial de MEP gana trabajo por su credibilidad, pero su presencia web no mostraba la profundidad de lo que hacen ni facilitaba iniciar una conversación.',
            contribution:
                'Construí un sitio de marketing claro y centrado en la credibilidad, con un flujo de solicitud de cotización, sobre la misma base que impulsa ServiceGrid.',
            context:
                'SOLEC ofrece ingeniería mecánica, eléctrica y de plomería más mantenimiento continuo —una oferta amplia dirigida a clientes comerciales que necesitan pruebas antes de llamar—. Su presencia anterior subvaloraba ese alcance.',
            decisions:
                'Estructuré el sitio en torno a servicios y referencias de proyectos en lugar de texto de marketing, porque los clientes comerciales compran con evidencia. Mantuve el contenido en Payload para que el equipo conserve su trayectoria al día, y conecté el flujo de solicitud de cotización directamente a su bandeja de entrada.',
            outcome:
                'Un sitio que presenta todo el alcance de SOLEC con la evidencia que lo respalda, y el cliente ancla de la plataforma ServiceGrid construida en paralelo.',
        },
        content: doc(
            h2('Resumen'),
            p('SOLEC ofrece ingeniería mecánica, eléctrica y de plomería (MEP) junto con servicios de mantenimiento continuo. El sitio presenta sus servicios y su trayectoria de proyectos y ofrece a los clientes potenciales un camino claro para solicitar una cotización.'),
            h2('Aspectos destacados'),
            ul([
                'Páginas de servicio que cubren ingeniería MEP, instalación y mantenimiento',
                'Referencias de proyectos que dan credibilidad ante clientes comerciales',
                'Flujo de solicitud de cotización conectado a la bandeja del equipo',
                'Contenido gestionado por CMS que el equipo de SOLEC actualiza directamente',
                'Diseño rápido y mobile-first para consultar en obra y sobre la marcha',
            ]),
            h2('Enfoque'),
            p('Construido sobre la misma base Next.js + Payload que el resto del portafolio, el sitio de SOLEC prioriza la claridad para un público comercial: qué hacen, la prueba de que pueden hacerlo y una vía directa para iniciar una conversación. También fue el cliente ancla de ServiceGrid, la plataforma de gestión de servicios construida en paralelo.'),
        ),
    },
    // ServiceGrid
    {
        meta: {
            title: 'ServiceGrid — Plataforma de gestión de servicios de marca blanca',
            description:
                'Una plataforma de marca blanca que conecta a clientes, personal de oficina y trabajadores de campo en torno a un mismo trabajo. Construida primero para SOLEC y luego generalizada para cualquier negocio de servicios.',
        },
        caseStudy: {
            tag: 'Producto / Plataforma',
            problem:
                'Los negocios de servicios funcionan a base de hilos dispersos de WhatsApp, hojas de cálculo y llamadas entre clientes, personal de oficina y técnicos de campo, y nadie comparte una única fuente de verdad.',
            contribution:
                'Construí una plataforma de gestión de servicios de marca blanca que unifica las solicitudes de clientes, la asignación del personal y el seguimiento de trabajos de los técnicos de campo, desplegada primero para SOLEC.',
            context:
                'SOLEC coordinaba el trabajo de servicio entre clientes, personal de oficina y técnicos en campo usando el canal que tuviera más a mano. El estado vivía en mensajes y en la memoria, así que la misma pregunta se repetía tres veces y los trabajos se traspapelaban.',
            decisions:
                'Modelé cada solicitud como un trabajo con un ciclo de vida compartido para que los tres públicos lean y escriban el mismo registro. Construí la vista del trabajador de campo pensando primero en el móvil, porque ahí es donde ocurre el trabajo. Mantuve el tematizado en configuración, no en código, para que la plataforma se despliegue en marca blanca al siguiente cliente sin bifurcar el proyecto.',
            outcome:
                'Un solo sistema que reemplaza el flujo de WhatsApp y hojas de cálculo de SOLEC, diseñado desde el primer día para re-tematizarse para otros negocios de servicios.',
        },
        content: doc(
            h2('Resumen'),
            p('ServiceGrid es una plataforma de gestión de servicios de marca blanca que conecta a tres públicos en torno a un mismo trabajo: los clientes que solicitan el servicio, el personal de oficina que lo programa y asigna, y los trabajadores de campo que lo ejecutan. Se construyó primero como la columna operativa de SOLEC y luego se generalizó para poder re-tematizarse para cualquier negocio de servicios.'),
            h2('Aspectos destacados'),
            ul([
                'Portal de clientes para solicitar servicio y seguir el estado del trabajo',
                'Panel de personal para programación, asignación y despacho de trabajos',
                'Vista de trabajador de campo optimizada para móvil: detalles del trabajo, listas de verificación y actualizaciones de estado',
                'Tematizado de marca blanca para que la misma plataforma se publique bajo distintas marcas',
                'Acceso basado en roles que separa los permisos de cliente, personal y trabajador de campo',
            ]),
            h2('Arquitectura'),
            p('El modelo de datos trata cada solicitud de servicio como un trabajo que avanza por un ciclo de vida compartido, de modo que clientes, personal y trabajadores de campo leen y escriben sobre la misma fuente de verdad en lugar de hilos dispersos de WhatsApp y hojas de cálculo. Los roles y permisos delimitan lo que ve cada público, y el tematizado vive en configuración y no en código, así que un nuevo cliente se incorpora sin bifurcar el proyecto. SOLEC es el campo de pruebas; la arquitectura es deliberadamente agnóstica al inquilino.'),
        ),
    },
    // Bufete Solano
    {
        meta: {
            title: 'Bufete Solano — Sitio, chatbot con IA y tablero de clientes',
            description:
                'Un sitio para un despacho de abogados con un chatbot impulsado por Claude para el primer contacto y un tablero compartido donde los clientes siguen sus asuntos y el personal gestiona la carga de casos.',
        },
        caseStudy: {
            tag: 'Plataforma de cliente / Legal + IA',
            problem:
                'Los despachos pequeños pierden clientes potenciales en el hueco entre una primera pregunta y una respuesta humana, y una vez que alguien es cliente, el estado de su asunto vive en la cabeza del abogado.',
            contribution:
                'Construí el sitio del despacho más un chatbot con IA para el primer contacto y un tablero compartido donde los clientes siguen sus asuntos y el personal gestiona la carga de casos.',
            context:
                'Bufete Solano necesitaba algo más que un sitio folleto. Los clientes potenciales llegan con preguntas a toda hora, y los clientes existentes seguían llamando para preguntar «¿dónde está mi caso?» —ambas cosas cayendo sobre el personal como interrupciones.',
            decisions:
                'Puse un chatbot con IA en la puerta de entrada para responder preguntas comunes y clasificar las consultas en prospectos estructurados, de modo que el personal recibe intención en lugar de mensajes en bruto. Construí un único tablero que leen tanto clientes como personal para que el estado del caso sea un registro compartido y no una llamada telefónica. Usé la API de Claude por su fiabilidad en español.',
            outcome:
                'Un sitio que convierte, un chatbot que atiende el primer contacto las 24 horas y un tablero que convierte las llamadas de «¿dónde está mi caso?» en un estado que cualquiera puede consultar.',
        },
        content: doc(
            h2('Resumen'),
            p('Bufete Solano es un despacho de abogados. El proyecto combina un sitio web público con un chatbot de IA que responde a las preguntas de los clientes potenciales y encamina las consultas, más un tablero compartido donde los clientes siguen sus asuntos y el personal gestiona la carga de casos detrás.'),
            h2('Aspectos destacados'),
            ul([
                'Sitio de marketing que presenta las áreas de práctica y el equipo del despacho',
                'Chatbot de IA, impulsado por la API de Claude, que atiende las preguntas de primer contacto y la clasificación',
                'Tablero para el cliente para seguir el estado del caso y los mensajes',
                'Tablero para el personal para gestionar consultas, clientes y seguimientos',
                'Contenido y conversación bilingües (inglés y español)',
            ]),
            h2('Enfoque'),
            p('El chatbot es la puerta de entrada de la experiencia del cliente: responde preguntas comunes, captura la intención y entrega consultas estructuradas al personal en lugar de dejarlas caer en una bandeja de entrada. Detrás, clientes y personal comparten un tablero sobre los mismos registros: los clientes ven el estado de sus asuntos y el personal ve la cola y actúa sobre ella. El chatbot funciona con la API de Claude, elegida por su conversación fiable en español y su seguimiento de instrucciones.'),
        ),
    },
]
