import { Terminal, Server, Cpu, Wrench } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Section from '../section';
import type { PageSkillsBlock } from '@strps-website/types';
import { SkillsCard } from '../cards/SkillsCard';


const SkillsSection: React.FC<PageSkillsBlock> = ({ title, subtitle, skillGroups, section }) => {
    return (
        <Section {...(section ?? {})} id={section?.section_id || 'skills'} className="space-y-8 py-10">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {skillGroups?.map((skillGroup) => (
                    <SkillsCard
                        key={skillGroup.id}
                        title={skillGroup.name}
                        iconName={skillGroup.icon}
                        // iconName={getIcon(skillGroup.title) as any}
                        skills={skillGroup.keywords?.map((skill) => ({ text: skill.keyword })) || []}
                    />

                ))}
            </div>
        </Section>
    );
};

export default SkillsSection;