import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteData } from '@/data/data';
import Section from '../section';

export default function ContactSection() {
    return (
        <Section
            id="contact"
            className="bg-muted/50 rounded-lg text-center space-y-6"
            containerClassName='py-32'
        >
            <h2 className="text-3xl md:text-4xl font-bold">Ready to build something great?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Whether you need a full-stack web application, a custom electronics integration, or just want to chat about tech.
            </p>
            <div className="flex justify-center gap-4">
                <Button size="lg" asChild>
                    <Link href={`mailto:${siteData.basics.email}`}>
                        <Mail className="mr-2 h-4 w-4" /> Send me an email
                    </Link>
                </Button>
            </div>
        </Section>
    );
}