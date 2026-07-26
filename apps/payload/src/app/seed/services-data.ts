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

export const servicesPageDataES = {
    title: 'Servicios',
    meta: {
        title: 'Servicios de desarrollo web | César Jerez — Desarrollador full stack freelance',
        description:
            'Desarrollador web freelance en Costa Rica que construye sitios rápidos, aplicaciones web a medida e integraciones de API para empresas de todo el mundo. Next.js, React, Node.js. Llamada de descubrimiento gratuita.',
    },
    layout: [
        // pageServicesHero
        {
            eyebrow: 'Desarrollo web freelance',
            title: 'Sitios y aplicaciones web que trabajan tan duro como vos.',
            description:
                'Soy César, desarrollador full stack en San José, Costa Rica. Ayudo a empresas y fundadores a convertir ideas en productos digitales rápidos y confiables, desde una landing page que convierte hasta una herramienta a medida que le ahorra horas a tu equipo cada semana.',
            status: {
                label: 'Actualmente disponible para nuevos proyectos',
            },
            highlights: [
                { text: 'Trabajás directamente con el desarrollador' },
                { text: 'Propuestas a precio fijo, sin facturas sorpresa' },
                { text: 'Remoto, a nivel mundial — EN / ES' },
            ],
            links: [
                { link: { label: 'Contame sobre tu proyecto' } },
                { link: { label: 'Ver mi trabajo' } },
            ],
        },
        // pageServices
        {
            title: 'Servicios',
            intro:
                'Sin agencias, sin intermediarios, sin teléfono descompuesto. Trabajás directamente con la persona que escribe el código, desde la primera llamada hasta el lanzamiento y más allá.',
            services: [
                {
                    name: 'Sitios web de negocio y landing pages',
                    forWho:
                        'Pequeños negocios, profesionales y startups que necesitan una presencia web que de verdad atraiga clientes, no solo una tarjeta de presentación digital.',
                    features: [
                        { feature: 'Un sitio web rápido y moderno construido con Next.js, la misma tecnología que usan Nike, Notion y OpenAI' },
                        { feature: 'Un sistema de gestión de contenido (CMS) para que actualices textos, imágenes y páginas vos mismo, sin necesitar un desarrollador para cada cambio' },
                        { feature: 'Diseño responsive mobile-first que se ve impecable en cualquier pantalla' },
                        { feature: 'Fundamentos de SEO bien hechos: metadatos, rendimiento, datos estructurados, sitemap' },
                        { feature: 'Analítica configurada para que sepás qué está funcionando' },
                        { feature: 'Despliegue, configuración del dominio y una entrega sin fricciones' },
                    ],
                    timeline: '2–4 semanas',
                    pricing: 'Desde $800',
                    goodFitPoints: [
                        { point: 'Nuestro sitio actual es lento / anticuado / vergonzoso' },
                        { point: 'Estamos lanzando y necesitamos vernos creíbles' },
                        { point: 'Quiero editar mi propio sitio sin llamar a un desarrollador' },
                    ],
                },
                {
                    name: 'Aplicaciones web y herramientas internas',
                    forWho:
                        'Negocios ahogados en hojas de cálculo, procesos manuales o software genérico que casi encaja. Fundadores que necesitan un MVP bien hecho desde la primera vez.',
                    features: [
                        { feature: 'Una aplicación web a medida diseñada en torno a tu flujo real de trabajo: dashboards, sistemas de reservas, paneles de administración, portales de clientes, rastreadores' },
                        { feature: 'Arquitectura sólida: frontend en React/Next.js, backend en Node.js, base de datos PostgreSQL' },
                        { feature: 'Cuentas de usuario, roles y permisos donde los necesités' },
                        { feature: 'Código limpio y documentado que es completamente tuyo, sin ataduras' },
                        { feature: 'Pruebas y pipeline de despliegue para que las actualizaciones no rompan nada' },
                    ],
                    timeline: '4–10 semanas según el alcance',
                    pricing: 'Desde $4,500, según alcance',
                    goodFitPoints: [
                        { point: 'Manejamos toda nuestra operación en hojas de cálculo' },
                        { point: 'Necesitamos software que haga exactamente esto, y nada en el mercado lo hace' },
                        { point: 'Tengo una idea y necesito un producto funcional para mostrar a usuarios o inversionistas' },
                    ],
                    proofLabel: 'Mirá TrackBit — una aplicación completa de seguimiento de hábitos →',
                },
                {
                    name: 'APIs, integraciones y automatización',
                    forWho: 'Equipos cuyos sistemas no se comunican entre sí, o que pierden horas en tareas que un script podría hacer en segundos.',
                    features: [
                        { feature: 'APIs REST o GraphQL a medida construidas con Node.js, Express o FastAPI' },
                        { feature: 'Integraciones entre las herramientas que ya usás: procesadores de pago, CRMs, plataformas de correo, hojas de cálculo' },
                        { feature: 'Automatización de flujos repetitivos: sincronización de datos, generación de reportes, notificaciones' },
                        { feature: 'Diseño y optimización de bases de datos (PostgreSQL, MySQL, Redis)' },
                        { feature: 'Documentación que tu próximo desarrollador te agradecerá' },
                    ],
                    timeline: '1–4 semanas por integración o API',
                    pricing: 'Desde $600/proyecto o $45/hora',
                    goodFitPoints: [
                        { point: 'Alguien copia datos del sistema A al sistema B todos los días' },
                        { point: 'Necesitamos que nuestro sitio se comunique con nuestro inventario / CRM / sistema de pagos' },
                    ],
                },
                {
                    name: 'Soporte y mantenimiento continuo',
                    forWho: 'Cualquiera que quiera que su sitio o aplicación se mantenga rápido, seguro y al día sin tener que pensar en ello.',
                    features: [
                        { feature: 'Actualizaciones mensuales, parches de seguridad y actualización de dependencias' },
                        { feature: 'Monitoreo de disponibilidad y rendimiento' },
                        { feature: 'Una cantidad definida de horas para cambios y mejoras pequeñas' },
                        { feature: 'Respuesta prioritaria cuando algo se rompe' },
                    ],
                    pricing: 'Desde $150/mes · Cancelás cuando querás',
                },
            ],
        },
        // pageProcess
        {
            title: 'Cómo trabajo',
            intro: 'Un proceso claro, sin sorpresas. Así se ve trabajar juntos:',
            steps: [
                {
                    title: 'Descubrimiento (gratis)',
                    description:
                        'Hablamos: videollamada o correo, vos elegís. Me contás qué necesitás y cómo se ve el éxito. Hago muchas preguntas. Si no soy la persona indicada, te lo digo y te oriento hacia algo mejor.',
                },
                {
                    title: 'Propuesta',
                    description:
                        'Recibís una propuesta por escrito: alcance, plazos, precio y qué incluye. Precio fijo para alcance fijo, sin facturas sorpresa.',
                },
                {
                    title: 'Construcción',
                    description:
                        'Trabajo en ciclos cortos y te muestro avances con regularidad, normalmente cada semana. Ves lo real temprano y seguido, así las correcciones ocurren cuando son baratas, no al final.',
                },
                {
                    title: 'Lanzamiento y entrega',
                    description:
                        'Despliego el proyecto, te explico todo y te entrego el código, las credenciales y la documentación. Es tuyo. Si querés que siga cerca, para eso está el plan de soporte.',
                },
            ],
        },
        // pageFaq
        {
            title: 'Preguntas frecuentes',
            questions: [
                {
                    question: '¿Trabajás con clientes fuera de Costa Rica?',
                    answer:
                        'Sí, trabajo de forma remota con clientes en cualquier lugar. Estoy en la zona horaria central (GMT-6), que coincide bien con el horario laboral de Norteamérica. Hablo español e inglés con fluidez.',
                },
                {
                    question: '¿Cuánto cuesta un sitio web?',
                    answer:
                        'Depende del alcance, por eso las llamadas de descubrimiento son gratuitas. Como referencia: una landing page suele empezar en $800, un sitio de negocio completo en $2,000 y las aplicaciones a medida desde $4,500. Siempre vas a saber el precio antes de empezar.',
                },
                {
                    question: '¿Podés emitir factura electrónica?',
                    answer: 'Sí, puedo emitir factura electrónica para clientes corporativos en Costa Rica.',
                },
                {
                    question: '¿El código es mío?',
                    answer:
                        'Por completo. Todo lo que construyo para vos —código, diseños, contenido, cuentas— es tuyo en la entrega. Sin ataduras, sin situaciones de rehén.',
                },
                {
                    question: '¿Y si necesito cambios después del lanzamiento?',
                    answer:
                        'Los ajustes pequeños durante las primeras dos semanas tras el lanzamiento van incluidos. Después de eso, podés contratarme por hora o tomar un plan de soporte mensual.',
                },
                {
                    question: '¿Podés trabajar con mi sitio o base de código existente?',
                    answer:
                        'Normalmente sí. Enviame lo que tenés y te diré con honestidad si tiene más sentido mejorarlo o reconstruirlo.',
                },
                {
                    question: '¿Cuántas revisiones incluye?',
                    answer:
                        'Como ves los avances cada semana, corregimos sobre la marcha en lugar de guardar todo el feedback para el final. Cada propuesta detalla exactamente qué incluye, así nunca hay ambigüedad.',
                },
            ],
        },
        // formBlock
        {
            introTitle: '¿Tenés un proyecto en mente?',
            introText:
                'Contame qué estás tratando de construir: con un par de oraciones basta para empezar. Respondo en un día hábil.',
        },
    ],
}
