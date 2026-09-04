import type { FormBlock, Form as FormType } from '@strps-website/types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichText from '@/components/RichText'
import Section from '@/components/page-sections/section'
import { Card } from '@/components/ui/card'
import { Reveal } from '@/components/primitives/Reveal'
import { PayloadForm } from '@/components/form/PayloadForm'

type FormSectionProps = FormBlock & {
    form: FormType
    /**
     * Field skin (§3.9). Not a Payload field yet — schema work is Phase 3 — so this
     * defaults to the mockup skin now that `/services`, the only current `formBlock`
     * consumer, is switching over (§7 Phase 2 item 8).
     */
    variant?: 'default' | 'mockup'
}

const FormSection: React.FC<FormSectionProps> = (props) => {
    const {
        form,
        introContent,
        introTitle,
        introText,
        introType = 'none',
        section,
        variant = 'mockup',
    } = props

    // The glass reads as glass over the ParticleStage behind the page, so the
    // block keeps the makeover's left-aligned hairline rhythm rather than the
    // centred headings the legacy version used.
    const intros: Record<string, React.ReactNode> = {
        titleAndText: (
            <>
                {(introTitle || form.title) && (
                    <div className="border-b border-border pb-2">
                        <h2 className="text-4xl font-medium tracking-[-0.01em]">
                            {introTitle || form.title}
                        </h2>
                    </div>
                )}
                {introText && (
                    <p className="mt-4 max-w-[55ch] text-[15px] leading-[1.65] text-muted-foreground">
                        {introText}
                    </p>
                )}
            </>
        ),
        richText: introContent ? (
            <RichText data={introContent as DefaultTypedEditorState} enableGutter={false} />
        ) : null,
        none: null,
    }

    const intro = intros[introType ?? 'none']

    return (
        <Section
            {...(section ?? {})}
            id={section?.section_id || 'form'}
            container={false}
            containerClassName="mx-auto w-full max-w-wrap gap-10 px-6"
        >
            {intro && <Reveal>{intro}</Reveal>}
            <Reveal delay={intro ? 0.12 : 0}>
                <Card variant="crystal" className="rounded-sharp gap-0 p-7 md:p-11">
                    <PayloadForm
                        form={form}
                        variant={variant}
                        surface="crystal"
                        successClassName="border border-crystal-edge p-10 text-center"
                    />
                </Card>
            </Reveal>
        </Section>
    )
}

export default FormSection
