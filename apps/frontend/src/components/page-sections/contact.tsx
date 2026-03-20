import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Section from '../section';
import { CMSLink } from '@/components/cms-link';
import type { PageContactBlock } from '@strps-website/types';

type ContactProps = Omit<PageContactBlock, 'links'> & {
    contactLinks?: PageContactBlock['links'];
};

const ContactSection: React.FC<ContactProps> = ({ title, description, email, contactLinks, section }) => {
    return (
        <Section
            id={section?.section_id || 'contact'}
            className="bg-muted/50 rounded-lg text-center space-y-6"
            containerClassName='py-32'
        >
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            {description && (
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                    {description}
                </p>
            )}
            <div className="flex justify-center gap-4">
                {email && (
                    <Button size="lg" asChild>
                        <Link href={`mailto:${email}`}>
                            <Mail className="mr-2 h-4 w-4" /> Send me an email
                        </Link>
                    </Button>
                )}
                {contactLinks?.map(({ link }, i) => (
                    <CMSLink key={i} {...link} appearance={link.appearance ?? undefined} size="lg" />
                ))}
            </div>
        </Section>
    );
};

export default ContactSection;