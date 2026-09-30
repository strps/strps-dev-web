import { FORM_SUBMISSION_RETENTION_MONTHS as MONTHS } from '@/jobs/purgeFormSubmissions'

import { doc, h2, link, p, pl, ul } from '../lexical'
import { CONTACT_EMAIL, docHref, EFFECTIVE_DATE, OWNER, SITE, type LegalDocSeed } from './shared'

/**
 * Privacy Policy — required: Costa Rica Ley 8968 (informed consent), GDPR Art. 13
 * (information at collection), CalOPPA (a conspicuously linked policy). Linked from
 * the footer and from the notice under every form.
 */
export const privacyPolicy: LegalDocSeed = {
    en: {
        title: 'Privacy Policy',
        slug: 'privacy-policy',
        docType: 'privacy',
        version: '2.0',
        effectiveDate: EFFECTIVE_DATE,
        _status: 'published',
        content: doc(
            p(
                `This policy explains what personal information ${SITE} collects, why, how long it is kept, and what you can do about it. It covers every page served under ${SITE}.`,
            ),
            h2('Who is responsible'),
            p(
                `${OWNER}, an independent software developer based in San José, Costa Rica, runs this site and is responsible for the personal information it collects. For anything about your data, write to ${CONTACT_EMAIL}.`,
            ),
            h2('What is collected'),
            p('You can read this site without an account and without identifying yourself. Information reaches me in three ways:'),
            ul([
                'What you send through a contact form — typically your name, email address, your message, and optional project details such as a budget range. You decide what goes in the message; please do not include sensitive information such as health data, identity numbers, passwords, or payment details.',
                'Technical data — the hosting provider automatically records request information such as IP address, browser and device type, the page requested, and the time of the request.',
                'Preferences stored on your own device — your language and light/dark theme. These stay in your browser and are explained in the Cookie Policy.',
            ]),
            p(
                'This site does not use analytics, advertising, or cross-site tracking tools. It has no user accounts, newsletter, or comments, and it does not sell anything.',
            ),
            h2('Why it is used'),
            ul([
                'To reply to your enquiry and, if you ask for one, prepare a proposal. The basis is your own request and the consent you give by sending the form.',
                'To keep the site secure and available, and to investigate errors and abuse. The basis is my legitimate interest in running a working, safe site.',
                'To meet legal obligations, for example if a lawful authority requires it.',
            ]),
            p(
                'Your information is never sold, rented, or shared for advertising, and it is not used for automated decision-making or profiling.',
            ),
            h2('Service providers'),
            p('A few providers process data on my behalf, only as needed to run the site:'),
            ul([
                'Vercel (United States) — hosting, content delivery, database, and file storage. Stores contact form submissions and processes request logs.',
                'Resend (United States) — email delivery, used when a form is set up to send a notification email.',
                'Google reCAPTCHA (United States) — only on forms where it is switched on. It checks that a submission comes from a person, using your IP address and browser signals, under Google’s own privacy policy and terms. When it is active, a notice appears under the form.',
            ]),
            h2('International transfers'),
            p(
                'These providers operate servers outside Costa Rica, mainly in the United States, so your information is transferred there when you use the site. They are established providers that commit to protecting the data they handle, including through standard contractual clauses where the law requires them.',
            ),
            h2('How long it is kept'),
            ul([
                `Contact form submissions are deleted automatically ${MONTHS} months after they are received. You can ask for earlier deletion at any time.`,
                'If your enquiry turns into a project, the correspondence needed for it becomes part of that project’s records and is kept for as long as the work and applicable tax and accounting obligations require.',
                'Server logs are kept according to the hosting provider’s own retention schedule, which is short and not controlled by me.',
            ]),
            h2('Security'),
            p(
                'The site is served only over HTTPS, stored submissions can only be read through a password-protected administration panel, and the providers above maintain their own security programmes. No system is perfectly secure, but reasonable measures are in place to protect your information.',
            ),
            h2('Your rights'),
            p(
                `You can ask to access the information I hold about you, have it corrected, have it deleted, object to its use, or withdraw your consent. Where the law gives you a right to receive your data in a portable format, you can ask for that too. Write to ${CONTACT_EMAIL}; I will answer within five business days. I may ask you to confirm your identity before acting on a request.`,
            ),
            p(
                'If you are not satisfied with the answer, you can complain to Costa Rica’s data protection authority, the Agencia de Protección de Datos de los Habitantes (PRODHAB), or to the data protection authority where you live.',
            ),
            h2('Children'),
            p(
                'This site is aimed at businesses and professionals. It is not directed at children, and people under 18 should not send personal information through it.',
            ),
            h2('Notice for California and other US residents'),
            p(
                'I do not sell or share personal information as those terms are defined in US state privacy laws. Because the site does not track visitors across other sites, browser “Do Not Track” signals do not change how it behaves.',
            ),
            h2('Changes to this policy'),
            p(
                'When this policy changes, the version and effective date at the top are updated and the new text is published here. Material changes will not apply to information collected before they take effect without your consent where the law requires it.',
            ),
            pl(
                'Related: ',
                link('Cookie Policy', docHref('en', 'cookie-policy')),
                ' · ',
                link('Terms of Service', docHref('en', 'terms-of-service')),
                ' · ',
                link('Legal Notice', docHref('en', 'legal-notice')),
            ),
        ),
        meta: {
            title: `Privacy Policy | ${OWNER}`,
            description:
                'What personal information this site collects, why, how long it is kept, and how to exercise your rights.',
        },
    },
    es: {
        title: 'Política de Privacidad',
        content: doc(
            p(
                `Esta política explica qué información personal recopila ${SITE}, por qué, cuánto tiempo se conserva y qué puedes hacer al respecto. Aplica a todas las páginas servidas bajo ${SITE}.`,
            ),
            h2('Responsable'),
            p(
                `${OWNER}, desarrollador de software independiente con sede en San José, Costa Rica, administra este sitio y es el responsable de la información personal que recopila. Para cualquier asunto sobre tus datos, escribe a ${CONTACT_EMAIL}.`,
            ),
            h2('Qué se recopila'),
            p('Puedes leer este sitio sin una cuenta y sin identificarte. La información llega hasta mí de tres maneras:'),
            ul([
                'Lo que envías mediante un formulario de contacto — normalmente tu nombre, correo electrónico, tu mensaje y detalles opcionales del proyecto, como un rango de presupuesto. Tú decides qué incluye el mensaje; por favor no incluyas información sensible como datos de salud, números de identificación, contraseñas o datos de pago.',
                'Datos técnicos — el proveedor de hosting registra automáticamente información de cada petición, como la dirección IP, el tipo de navegador y dispositivo, la página solicitada y la hora.',
                'Preferencias guardadas en tu propio dispositivo — tu idioma y tu tema claro u oscuro. Permanecen en tu navegador y se explican en la Política de Cookies.',
            ]),
            p(
                'Este sitio no usa herramientas de analítica, publicidad ni seguimiento entre sitios. No tiene cuentas de usuario, boletín ni comentarios, y no vende nada.',
            ),
            h2('Para qué se usa'),
            ul([
                'Para responder a tu consulta y, si lo pides, preparar una propuesta. La base es tu propia solicitud y el consentimiento que das al enviar el formulario.',
                'Para mantener el sitio seguro y disponible, e investigar errores y abusos. La base es mi interés legítimo en operar un sitio seguro y funcional.',
                'Para cumplir obligaciones legales, por ejemplo si una autoridad competente lo requiere.',
            ]),
            p(
                'Tu información nunca se vende, alquila ni comparte con fines publicitarios, y no se usa para decisiones automatizadas ni para elaborar perfiles.',
            ),
            h2('Proveedores de servicios'),
            p('Algunos proveedores procesan datos en mi nombre, solo en la medida necesaria para operar el sitio:'),
            ul([
                'Vercel (Estados Unidos) — hosting, distribución de contenido, base de datos y almacenamiento de archivos. Guarda los envíos del formulario de contacto y procesa los registros de peticiones.',
                'Resend (Estados Unidos) — envío de correos, usado cuando un formulario está configurado para enviar un correo de aviso.',
                'Google reCAPTCHA (Estados Unidos) — solo en los formularios donde está activado. Comprueba que un envío proviene de una persona usando tu dirección IP y señales del navegador, bajo la política de privacidad y los términos de Google. Cuando está activo, aparece un aviso debajo del formulario.',
            ]),
            h2('Transferencias internacionales'),
            p(
                'Estos proveedores operan servidores fuera de Costa Rica, principalmente en Estados Unidos, por lo que tu información se transfiere allí cuando usas el sitio. Son proveedores consolidados que se comprometen a proteger los datos que manejan, incluso mediante cláusulas contractuales tipo cuando la ley lo exige.',
            ),
            h2('Cuánto tiempo se conserva'),
            ul([
                `Los envíos del formulario de contacto se eliminan automáticamente ${MONTHS} meses después de recibidos. Puedes pedir que se eliminen antes en cualquier momento.`,
                'Si tu consulta se convierte en un proyecto, la correspondencia necesaria pasa a formar parte de los registros de ese proyecto y se conserva mientras lo requieran el trabajo y las obligaciones tributarias y contables aplicables.',
                'Los registros del servidor se conservan según el calendario de retención del proveedor de hosting, que es breve y no está bajo mi control.',
            ]),
            h2('Seguridad'),
            p(
                'El sitio se sirve únicamente por HTTPS, los envíos guardados solo pueden leerse desde un panel de administración protegido con contraseña, y los proveedores mencionados mantienen sus propios programas de seguridad. Ningún sistema es perfectamente seguro, pero se aplican medidas razonables para proteger tu información.',
            ),
            h2('Tus derechos'),
            p(
                `Puedes solicitar acceso a la información que tengo sobre ti, su rectificación, su eliminación, oponerte a su uso o retirar tu consentimiento. Cuando la ley te reconozca el derecho a recibir tus datos en un formato portable, también puedes solicitarlo. Escribe a ${CONTACT_EMAIL}; responderé en un plazo de cinco días hábiles. Puedo pedirte que confirmes tu identidad antes de atender una solicitud.`,
            ),
            p(
                'Si no estás satisfecho con la respuesta, puedes presentar una queja ante la Agencia de Protección de Datos de los Habitantes (PRODHAB) de Costa Rica, o ante la autoridad de protección de datos de tu país de residencia.',
            ),
            h2('Menores de edad'),
            p(
                'Este sitio está dirigido a empresas y profesionales. No está dirigido a menores de edad, y las personas menores de 18 años no deben enviar información personal a través de él.',
            ),
            h2('Aviso para residentes de California y otros estados de EE. UU.'),
            p(
                'No vendo ni comparto información personal en el sentido que le dan las leyes estatales de privacidad de Estados Unidos. Como el sitio no rastrea a los visitantes en otros sitios, las señales «Do Not Track» del navegador no cambian su comportamiento.',
            ),
            h2('Cambios a esta política'),
            p(
                'Cuando esta política cambia, se actualizan la versión y la fecha de vigencia indicadas arriba y se publica aquí el nuevo texto. Los cambios sustanciales no se aplicarán a información recopilada antes de su entrada en vigor sin tu consentimiento cuando la ley así lo exija.',
            ),
            pl(
                'Relacionado: ',
                link('Política de Cookies', docHref('es', 'cookie-policy')),
                ' · ',
                link('Términos de Servicio', docHref('es', 'terms-of-service')),
                ' · ',
                link('Aviso Legal', docHref('es', 'legal-notice')),
            ),
        ),
        meta: {
            title: `Política de Privacidad | ${OWNER}`,
            description:
                'Qué información personal recopila este sitio, para qué, cuánto tiempo se conserva y cómo ejercer tus derechos.',
        },
    },
}
