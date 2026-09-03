import type { Metadata } from 'next';
import Section from "@/components/page-sections";
import SVGCircles from "@/app/(website)/[locale]/lab/(items)/svg-circles/SVGCircles";
import { SvgCirclesHero } from "./SvgCirclesHero";
import type { Locale } from '@/i18n/config';
import { buildAlternates } from '@/lib/seo';
import { getLabContent } from "../../content";
import { LabSections, RichText } from "@/components/lab/lab-content";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params;
    const { meta } = getLabContent(locale, 'svg-circles');
    return {
        title: meta.title,
        description: meta.description,
        alternates: buildAlternates(locale, '/lab/svg-circles'),
    };
}

export default async function SvgCirclesPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params;
    const { sections, variants } = getLabContent(locale, 'svg-circles');
    return (
        <main className="min-h-screen">
            <SvgCirclesHero />

            <LabSections sections={sections} locale={locale} />

            {/* Variants — live SVG tiles; text comes from localized content. */}
            {variants && (
                <Section className="py-16 bg-muted/30" containerClassName="container mx-auto px-4 space-y-8">
                    <div className="space-y-2 max-w-2xl">
                        <h2 className="text-2xl font-bold">{variants.heading}</h2>
                        <p className="text-muted-foreground">
                            <RichText segments={variants.intro} locale={locale} />
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <VariantTile label={variants.tileLabels[0]}>
                            <SVGCircles
                                className="absolute inset-0 h-full w-full stroke-svg"
                                width={800}
                                height={600}
                                numCircles={12}
                                maxRadius={500}
                                focalLength={400}
                                worldDepth={8000}
                                strokeWidth={3}
                                strokeDasharray="20 10"
                                motionPattern="spring"
                            />
                        </VariantTile>

                        <VariantTile label={variants.tileLabels[1]}>
                            <SVGCircles
                                className="absolute inset-0 h-full w-full stroke-svg"
                                width={800}
                                height={600}
                                numCircles={12}
                                maxRadius={500}
                                focalLength={1500}
                                worldDepth={8000}
                                strokeWidth={5}
                                strokeDasharray="40 20"
                                motionPattern="ease"
                            />
                        </VariantTile>

                        <VariantTile label={variants.tileLabels[2]}>
                            <SVGCircles
                                className="absolute inset-0 h-full w-full stroke-svg"
                                width={800}
                                height={600}
                                numCircles={12}
                                maxRadius={500}
                                focalLength={6000}
                                worldDepth={8000}
                                strokeWidth={6}
                                strokeDasharray="6 14"
                                motionPattern="direct"
                            />
                        </VariantTile>
                    </div>
                </Section>
            )}
        </main>
    );
}

function VariantTile({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-background">
            {children}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-background/90 to-transparent">
                <span className="text-sm font-medium">{label}</span>
            </div>
        </div>
    );
}
