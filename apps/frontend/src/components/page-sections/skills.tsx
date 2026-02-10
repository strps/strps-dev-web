import { Terminal, Server, Cpu, Wrench } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { siteData } from '@/data/data';
import Section from '../section';

export default function SkillsSection() {
    const getIcon = (name: string) => {
        if (name.includes("Front-End")) return <Terminal className="h-5 w-5" />;
        if (name.includes("Back-End")) return <Server className="h-5 w-5" />;
        if (name.includes("Languages")) return <Cpu className="h-5 w-5" />;
        return <Wrench className="h-5 w-5" />;
    };

    return (
        <Section id="skills" className="space-y-8 py-10">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Technical Arsenal</h2>
                <p className="text-muted-foreground">My stack for building robust digital solutions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {siteData.skills.map((skillGroup) => (
                    <Card key={skillGroup.name}>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2">
                                {getIcon(skillGroup.name)}
                                {skillGroup.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {skillGroup.keywords.map((skill) => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Section>
    );
}