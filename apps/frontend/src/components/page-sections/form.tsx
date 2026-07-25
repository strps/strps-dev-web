import type { FormBlock, Form as FormType } from '@strps-website/types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichText from '@/components/RichText'
import Section from '@/components/section'
import { Card } from '@/components/ui/card'
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

    const intros: Record<string, React.ReactNode> = {
        titleAndText: (
            <>
                {introTitle && (
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                        {introTitle || form.title}
                    </h2>
                )}
                {introText && <p className="text-muted-foreground text-center">{introText}</p>}
            </>
        ),
        richText: introContent ? <RichText data={introContent as DefaultTypedEditorState} enableGutter={false} /> : null,
        none: null,
    }

    return (
        <Section
            {...(section ?? {})}
            id={section?.section_id || 'form'}
            className="flex items-center justify-center py-16 md:py-24"
            container={false}
            containerClassName="mx-auto w-full max-w-wrap px-6"
        >
            <div className="w-full">
                {intros[introType ?? 'none']}
                <Card className="p-6 md:p-12">
                    <PayloadForm form={form} variant={variant} />
                </Card>
            </div>
        </Section>
    )
}

export default FormSection
