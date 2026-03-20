import Image from 'next/image';
import Section from '../section';
import type { PageAboutBlock, Media } from '@strps-website/types';

const AboutSection: React.FC<PageAboutBlock> = ({ title, summary, image, section }) => {
    const img = typeof image === 'object' && image ? image as Media : null;

    return (
        <Section id={section?.section_id || 'about'}>
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {img?.url && (
                    <div className="flex-shrink-0">
                        <div className="relative h-40 w-40 md:h-52 md:w-52 overflow-hidden border-4 border-background shadow-lv1">
                            <Image
                                src={img.url}
                                alt={img.alt || title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}

                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {summary}
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default AboutSection;