import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Section from '.';
import { CMSLink } from '@/components/cms-link';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Reveal } from '@/components/primitives/Reveal';
import { PayloadForm } from '@/components/form/PayloadForm';
import type { PageContactBlock, Form as FormType } from '@strps-website/types';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

type ContactProps = Omit<PageContactBlock, 'links' | 'form'> & {
    contactLinks?: PageContactBlock['links'];
    contactForm?: FormType | null;
    locale: Locale;
};

const ContactSection: React.FC<ContactProps> = ({
    eyebrow,
    title,
    description,
    email,
    emailLabel,
    note,
    contactForm: form,
    contactLinks,
    section,
    locale,
}) => {
    const dictionary = getDictionary(locale)

    return (
        <Section
            {...(section ?? {})}
            id={section?.section_id || 'contact'}
            container={false}
            containerClassName="mx-auto w-full max-w-wrap px-6"
        >
            <div className="grid grid-cols-1 gap-11 min-[721px]:grid-cols-[1fr_1.2fr] min-[721px]:gap-15">
                <Reveal>
                    <Eyebrow as="div">{eyebrow || dictionary.eyebrowFallback.contact}</Eyebrow>
                    <h2 className="mt-3.5 text-2xl font-medium">{title}</h2>
                    {description && (
                        <p className="mt-4 max-w-[40ch] text-[15px] leading-[1.65] text-muted-foreground">
                            {description}
                        </p>
                    )}

                    {email && (
                        <div className="mt-7.5">
                            <Eyebrow as="span" className="mb-2.5 block normal-case tracking-normal">
                                {emailLabel || dictionary.common.preferEmail}
                            </Eyebrow>
                            <a
                                href={`mailto:${email}`}
                                className="border-b border-border-strong text-[15px] text-foreground no-underline transition-colors duration-150 hover:border-primary hover:text-primary"
                            >
                                {email}
                            </a>
                        </div>
                    )}
                </Reveal>

                {form ? (
                    <Reveal delay={0.12}>
                        <PayloadForm
                            form={form}
                            variant="mockup"
                            successClassName="border border-border-strong p-10 text-center"
                        />
                        {note && <p className="mt-3 text-xs text-muted-foreground">{note}</p>}
                    </Reveal>
                ) : (
                    <Reveal delay={0.12} className="flex flex-wrap items-start gap-4">
                        {email && (
                            <Button variant="solid" asChild>
                                <Link href={`mailto:${email}`}>
                                    <Mail className="mr-2 h-4 w-4" /> {dictionary.common.sendMeAnEmail}
                                </Link>
                            </Button>
                        )}
                        {contactLinks?.map(({ link }, i) => (
                            <CMSLink key={i} {...link} appearance={link.appearance ?? undefined} locale={locale} />
                        ))}
                    </Reveal>
                )}
            </div>
        </Section>
    );
};

export default ContactSection;
