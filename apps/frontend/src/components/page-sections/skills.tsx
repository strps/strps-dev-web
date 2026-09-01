import Section from '../section';
import type { PageSkillsBlock } from '@strps-website/types';
import { SkillsCard } from '../cards/SkillsCard';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Reveal, RevealGroup } from '@/components/primitives/Reveal';
import { IconName } from 'lucide-react/dynamic';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';


type SkillsProps = Omit<PageSkillsBlock, 'variant'> & {
    skillsVariant?: PageSkillsBlock['variant'];
    locale: Locale;
};

const SkillsSection: React.FC<SkillsProps> = ({ eyebrow, title, skillsVariant: variant, subtitle, skillGroups, section, locale }) => {
    const dictionary = getDictionary(locale)

    if (variant === 'list') {
        return (
            <Section
                {...(section ?? {})}
                id={section?.section_id || 'skills'}
                spacing="section"
                container={false}
                containerClassName="mx-auto w-full max-w-wrap px-6"
            >
                <Reveal>
                    <SectionHeader eyebrow={eyebrow || dictionary.eyebrowFallback.skills} title={title} />
                </Reveal>

                <RevealGroup
                    className="mt-9 grid gap-8.5"
                    style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
                >
                    {skillGroups?.map((group) => (
                        <div key={group.id}>
                            <Eyebrow>{group.name}</Eyebrow>
                            <ul className="mt-4 list-none">
                                {group.keywords?.map((skill) => (
                                    <li
                                        key={skill.keyword}
                                        className="border-b border-border py-1.5 text-[15px] last:border-b-0"
                                    >
                                        {skill.keyword}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                    )}
                </RevealGroup>
            </Section>
        );
    }

    return (
        <Section
            id={section?.section_id || 'skills'}
            className="space-y-8 py-10 px-10"
            {...(section ?? {})}
        >
            <Reveal className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </Reveal>

            <RevealGroup itemClassName="h-full" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {skillGroups?.map((skillGroup) => (
                    <SkillsCard
                        key={skillGroup.id}
                        title={skillGroup.name}
                        iconName={skillGroup.icon as IconName}
                        skills={skillGroup.keywords?.map((skill) => ({ text: skill.keyword })) || []}
                    />
                ))}
            </RevealGroup>
        </Section>
    );
};

export default SkillsSection;
