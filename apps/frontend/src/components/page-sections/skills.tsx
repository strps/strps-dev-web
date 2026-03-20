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

const getIcon = (name: string) => {
    if (name.includes("Front-End") || name.includes("Frontend")) return <Terminal className="h-5 w-5" />;
    if (name.includes("Back-End") || name.includes("Backend")) return <Server className="h-5 w-5" />;
    if (name.includes("Languages")) return <Cpu className="h-5 w-5" />;
    return <Wrench className="h-5 w-5" />;
};

const SkillsSection: React.FC<PageSkillsBlock> = ({ title, subtitle, skillGroups, section }) => {
    return (
        <Section id={section?.section_id || 'skills'} className="space-y-8 py-10">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {skillGroups?.map((skillGroup) => (
                    <Card key={skillGroup.id || skillGroup.name}>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2">
                                {getIcon(skillGroup.name)}
                                {skillGroup.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {skillGroup.keywords?.map((item) => (
                                <Badge key={item.id || item.keyword} variant="secondary">{item.keyword}</Badge>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Section>
    );
};

export default SkillsSection;