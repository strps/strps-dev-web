import Section from "@/components/section";
import { ImageToSvgHero } from "./ImageToSvgHero";

export const metadata = {
    title: "Image to SVG | Gallery | Cesar Jerez",
    description:
        "Convert any image into vector line art in the browser. The first strategy renders classical geometric halftoning with hatching and cross-hatching.",
};

export default function ImageToSvgPage() {
    return (
        <main className="min-h-screen">
            <ImageToSvgHero />

            <Section className="py-16" containerClassName="container mx-auto px-4 max-w-3xl space-y-10">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">From pixels to strokes</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Raster images store tone as brightness per pixel. To redraw that tone
                        with nothing but lines, we borrow a trick that engravers and pen-and-ink
                        illustrators have used for centuries:{" "}
                        <strong className="text-foreground">hatching</strong>. Lay down parallel
                        strokes where the picture is dark, leave the paper bare where it&apos;s
                        light, and the eye reassembles a continuous gradient from discrete marks.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Everything runs in your browser. The uploaded image is drawn to a canvas,
                        downscaled to a working resolution, and reduced to a single luminance
                        value per pixel. No data ever leaves the page.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Threshold layers &amp; cross-hatching</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Tone is split into a handful of{" "}
                        <strong className="text-foreground">layers</strong>, each with its own
                        darkness threshold. A layer draws a full field of parallel lines across
                        the image, but a stroke survives only where the underlying tone is darker
                        than that layer&apos;s threshold — so each set of lines is clipped to the
                        regions dark enough to deserve it.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        The darkest pixels fall below every threshold, so they collect strokes
                        from every layer. Because successive layers alternate between the base
                        angle and a rotated{" "}
                        <strong className="text-foreground">cross angle</strong> (and shift their
                        phase within the spacing), dark regions build up into dense
                        cross-hatching while light regions keep at most a single sparse set of
                        lines. Spacing, weight, level count, angles, and contrast are all live
                        controls.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Built to grow</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Hatching is just the first converter. Each strategy is a pure function
                        from a prepared tone buffer to an SVG document, registered behind a small
                        interface, so the picker in the controls is ready for stippling,
                        flow-field strokes, dithering, and whatever comes next — without touching
                        the rest of the tool.
                    </p>
                </section>
            </Section>
        </main>
    );
}
