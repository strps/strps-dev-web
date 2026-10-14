'use client'

import { useTheme } from 'next-themes'
import SVGButton, {
    SVG_BUTTON_ICONS,
    SVG_BUTTON_VARIANTS,
} from '@/components/SVGButton'
import { Button } from '@/components/ui/button'

export default function SVGButtonsPage() {
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <main className="mx-auto flex max-w-5xl flex-col gap-12 p-10">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-medium">SVGButton</h1>
                <Button
                    variant="outlineGhost"
                    size="sm"
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                >
                    {resolvedTheme === 'dark' ? 'Light' : 'Dark'} mode
                </Button>
            </header>

            <Section
                title="Variants"
                note="Brand presets plus the color variants mirrored from ui/button.tsx. Hover to sweep."
            >
                {SVG_BUTTON_VARIANTS.map((variant) => (
                    <Sample key={variant} label={variant}>
                        <SVGButton variant={variant}>{variant}</SVGButton>
                    </Sample>
                ))}
            </Section>

            <Section title="Same variant, side by side with ui/button">
                {(['default', 'destructive', 'secondary', 'outline', 'ghost', 'solid', 'outlineGhost'] as const).map(
                    (variant) => (
                        <Sample key={variant} label={variant}>
                            <div className="flex items-center gap-3">
                                <SVGButton variant={variant}>{variant}</SVGButton>
                                <Button variant={variant}>{variant}</Button>
                            </div>
                        </Sample>
                    )
                )}
            </Section>

            <Section title="Icons" note="Any icon can pair with any variant.">
                {SVG_BUTTON_ICONS.map((icon) => (
                    <Sample key={icon} label={icon}>
                        <SVGButton variant="solid" icon={icon}>
                            {icon}
                        </SVGButton>
                    </Sample>
                ))}
            </Section>

            <Section title="Custom colors" note="color / baseColor / iconColor override the preset.">
                <Sample label="custom hex">
                    <SVGButton icon="arrowRight" baseColor="#1B1B1F" color="#7C3AED" iconColor="#C4B5FD">
                        Purple
                    </SVGButton>
                </Sample>
                <Sample label="raw path string">
                    <SVGButton
                        color="#0EA5E9"
                        iconColor="#0369A1"
                        icon="M12 2 L22 22 L12 17 L2 22 Z"
                        iconTransform="translate(10, 2) scale(2)"
                    >
                        Custom path
                    </SVGButton>
                </Sample>
                <Sample label="as link">
                    <SVGButton variant="github" href="https://github.com">
                        GitHub
                    </SVGButton>
                </Sample>
            </Section>
        </main>
    )
}

function Section({
    title,
    note,
    children,
}: {
    title: string
    note?: string
    children: React.ReactNode
}) {
    return (
        <section className="flex flex-col gap-4">
            <div>
                <h2 className="text-lg font-medium">{title}</h2>
                {note && <p className="text-sm text-muted-foreground">{note}</p>}
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">{children}</div>
        </section>
    )
}

function Sample({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-start gap-2 rounded-lg border border-border p-4">
            <span className="font-mono text-xs text-muted-foreground">{label}</span>
            {children}
        </div>
    )
}
