import type { RequiredDataFromCollectionSlug } from 'payload'

type ServicesPageSeed = Omit<RequiredDataFromCollectionSlug<'pages'>, 'createdAt' | 'updatedAt' | 'id'>

export const getServicesPageData = (formId: number): ServicesPageSeed => ({
    title: 'Services',
    slug: 'services',
    _status: 'published',
    appearance: {
        headerOverrides: {
            theme: 'dark',
            background: false,
            overlay: true,
        },
    },
    meta: {
        title: 'Web Development Services | César Jerez — Freelance Full Stack Developer',
        description:
            'Freelance web developer in Costa Rica building fast websites, custom web apps, and API integrations for businesses worldwide. Next.js, React, Node.js. Free discovery call.',
    },
    layout: [
        {
            blockType: 'pageServicesHero',
            eyebrow: 'Freelance web development',
            title: 'Websites and web apps that work as hard as you do.',
            description:
                "I'm César — a full stack developer in San José, Costa Rica. I help businesses and founders turn ideas into fast, reliable digital products, from a landing page that converts to a custom tool that saves your team hours every week.",
            status: {
                isAvailable: true,
                label: 'Currently available for new projects',
            },
            highlights: [
                { text: 'You work directly with the developer' },
                { text: 'Fixed-price proposals, no surprise invoices' },
                { text: 'Remote, worldwide — EN / ES' },
            ],
            links: [
                {
                    link: {
                        type: 'custom',
                        url: '#contact',
                        label: 'Tell me about your project',
                        newTab: false,
                        appearance: 'send',
                    },
                },
                {
                    link: {
                        type: 'custom',
                        url: '/projects',
                        label: 'See my work',
                        newTab: false,
                        appearance: 'outline',
                    },
                },
            ],
            section: {
                container: true,
                section_id: 'hero',
                backgroundContainer: false,
                theme: 'dark',
                background: 'none',
            },
        },
        {
            blockType: 'pageServices',
            title: 'Services',
            intro:
                'No agencies, no handoffs, no telephone game. You work directly with the person writing the code — from the first call to launch and beyond.',
            services: [
                {
                    name: 'Business websites & landing pages',
                    forWho:
                        'Small businesses, professionals, and startups that need a web presence that actually brings in customers — not just a digital business card.',
                    features: [
                        { feature: 'A fast, modern website built with Next.js — the same technology used by Nike, Notion, and OpenAI' },
                        { feature: 'A content management system (CMS) so you can update text, images, and pages yourself — no developer needed for every change' },
                        { feature: 'Mobile-first responsive design that looks sharp on every screen' },
                        { feature: 'SEO fundamentals done right: metadata, performance, structured data, sitemap' },
                        { feature: 'Analytics set up so you know what\'s working' },
                        { feature: 'Deployment, domain setup, and a smooth handoff' },
                    ],
                    timeline: '2–4 weeks',
                    pricing: 'From $800',
                    goodFitPoints: [
                        { point: 'Our current site is slow / outdated / embarrassing' },
                        { point: 'We\'re launching and need to look credible' },
                        { point: 'I want to edit my own site without calling a developer' },
                    ],
                },
                {
                    name: 'Web applications & internal tools',
                    forWho:
                        'Businesses drowning in spreadsheets, manual processes, or off-the-shelf software that almost fits. Founders who need an MVP built right the first time.',
                    features: [
                        { feature: 'A custom web application designed around your actual workflow — dashboards, booking systems, admin panels, client portals, trackers' },
                        { feature: 'Solid architecture: React/Next.js front end, Node.js back end, PostgreSQL database' },
                        { feature: 'User accounts, roles, and permissions where you need them' },
                        { feature: 'Clean, documented code you own completely — no lock-in' },
                        { feature: 'Testing and deployment pipeline so updates don\'t break things' },
                    ],
                    timeline: '4–10 weeks depending on scope',
                    pricing: 'From $4,500, scope-based',
                    goodFitPoints: [
                        { point: 'We run our whole operation on spreadsheets' },
                        { point: 'We need software that does exactly this, and nothing on the market does' },
                        { point: 'I have an idea and need a working product to show users or investors' },
                    ],
                    proofLabel: 'See TrackBit — a full habit-tracking application →',
                    proofUrl: '/projects/trackbit',
                },
                {
                    name: 'APIs, integrations & automation',
                    forWho: 'Teams whose systems don\'t talk to each other, or who waste hours on tasks a script could do in seconds.',
                    features: [
                        { feature: 'Custom REST or GraphQL APIs built with Node.js, Express, or FastAPI' },
                        { feature: 'Integrations between the tools you already use — payment processors, CRMs, email platforms, spreadsheets' },
                        { feature: 'Automation of repetitive workflows: data syncing, report generation, notifications' },
                        { feature: 'Database design and optimization (PostgreSQL, MySQL, Redis)' },
                        { feature: 'Documentation your next developer will thank you for' },
                    ],
                    timeline: '1–4 weeks per integration or API',
                    pricing: 'From $600/project or $45/hr',
                    goodFitPoints: [
                        { point: 'Someone copies data from system A to system B every single day' },
                        { point: 'We need our website to talk to our inventory / CRM / payment system' },
                    ],
                },
                {
                    name: 'Ongoing support & maintenance',
                    forWho: 'Anyone who wants their site or app to stay fast, secure, and up to date without thinking about it.',
                    features: [
                        { feature: 'Monthly updates, security patches, and dependency upgrades' },
                        { feature: 'Uptime and performance monitoring' },
                        { feature: 'A set number of hours for small changes and improvements' },
                        { feature: 'Priority response when something breaks' },
                    ],
                    pricing: 'From $150/month · Cancel anytime',
                },
            ],
            section: {
                container: true,
                section_id: 'services',
                backgroundContainer: false,
                theme: 'auto',
                background: 'none',
            },
        },
        {
            blockType: 'pageProcess',
            title: 'How I Work',
            intro: 'A clear process, no surprises. Here\'s what working together looks like:',
            steps: [
                {
                    title: 'Discovery (free)',
                    description:
                        'We talk — video call or email, your choice. You tell me what you need and what success looks like. I ask a lot of questions. If I\'m not the right fit, I\'ll tell you and point you somewhere better.',
                },
                {
                    title: 'Proposal',
                    description:
                        'You get a written proposal: scope, timeline, price, and what\'s included. Fixed price for fixed scope — no surprise invoices.',
                },
                {
                    title: 'Build',
                    description:
                        'I work in short cycles and show you progress regularly — usually weekly. You see the real thing early and often, so course corrections happen when they\'re cheap, not at the end.',
                },
                {
                    title: 'Launch & handoff',
                    description:
                        'I deploy the project, walk you through everything, and hand over all the code, credentials, and documentation. It\'s yours. If you want me to stick around, that\'s what the support plan is for.',
                },
            ],
            section: {
                container: true,
                section_id: 'process',
                backgroundContainer: false,
                theme: 'auto',
                background: 'none',
            },
        },
        {
            blockType: 'pageFaq',
            title: 'FAQ',
            questions: [
                {
                    question: 'Do you work with clients outside Costa Rica?',
                    answer:
                        'Yes — I work remotely with clients anywhere. I\'m in the Central time zone (GMT-6), which overlaps well with North American business hours. Fluent in Spanish and English.',
                },
                {
                    question: 'How much does a website cost?',
                    answer:
                        'It depends on scope, which is why discovery calls are free. As a reference: a landing page typically starts at $800, a full business website at $2,000, and custom applications from $4,500. You\'ll always know the price before we start.',
                },
                {
                    question: 'Can you issue an invoice / factura electrónica?',
                    answer: 'Yes — I can issue factura electrónica for corporate clients in Costa Rica.',
                },
                {
                    question: 'Do I own the code?',
                    answer:
                        'Completely. Everything I build for you — code, designs, content, accounts — is yours at handoff. No lock-in, no hostage situations.',
                },
                {
                    question: 'What if I need changes after launch?',
                    answer:
                        'Small tweaks in the first two weeks after launch are included. After that, you can book me hourly or go with a monthly support plan.',
                },
                {
                    question: 'Can you work with my existing website / codebase?',
                    answer:
                        'Usually, yes. Send me what you have and I\'ll tell you honestly whether it makes more sense to improve it or rebuild it.',
                },
                {
                    question: 'How many revisions are included?',
                    answer:
                        'Because you see progress weekly, we course-correct as we go rather than saving all feedback for the end. Each proposal spells out exactly what\'s included, so there\'s never ambiguity.',
                },
            ],
            section: {
                container: true,
                section_id: 'faq',
                backgroundContainer: false,
                theme: 'auto',
                background: 'none',
            },
        },
        {
            blockType: 'formBlock',
            form: formId,
            introType: 'titleAndText',
            introTitle: 'Have a project in mind?',
            introText:
                'Tell me what you\'re trying to build — a couple of sentences is enough to get started. I reply within one business day.',
            section: {
                container: true,
                section_id: 'contact',
                backgroundContainer: false,
                theme: 'auto',
                background: 'none',
            },
        },
    ],
})
