import type { Metadata } from 'next';
import Section from "@/components/page-sections/section";
import SVGCircles from "@/app/(website)/[locale]/lab/(items)/svg-circles/SVGCircles";
import { SvgCirclesHero } from "./SvgCirclesHero";
import type { Locale } from '@/i18n/config';
import { buildAlternates } from '@/lib/seo';
import { getLabContent } from "../../content";
import { ItemSections, RichText } from "@/components/gallery/item-content";
import { Eyebrow } from "@/components/primitives/Eyebrow";

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

            <ItemSections sections={sections} locale={locale} />

            {/* Variants — live SVG tiles; text comes from localized content. */}
            {variants && (
                <Section container={false} containerClassName="mx-auto w-full max-w-wrap gap-8 px-6">
                    <div className="max-w-[55ch] space-y-2">
                        <h2 className="text-2xl font-medium tracking-[-0.01em]">{variants.heading}</h2>
                        <p className="text-[15px] leading-[1.65] text-muted-foreground">
                            <RichText segments={variants.intro} locale={locale} />
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 min-[721px]:grid-cols-3">
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
        <div className="relative aspect-square overflow-hidden rounded-sharp border border-border bg-background">
            {children}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/90 to-transparent p-3">
                <Eyebrow>{label}</Eyebrow>
            </div>
        </div>
    );
}
