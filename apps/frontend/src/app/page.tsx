import { Separator } from "@/components/ui/separator";
import HeroSection from "@/components/page-sections/hero";
import SkillsSection from "@/components/page-sections/skills";
import ProjectsSection from "@/components/page-sections/projects";
import ExperienceSection from "@/components/page-sections/experience";
import ContactSection from "@/components/page-sections/contact";
import AboutSection from "@/components/page-sections/about";

export default function Home() {
  return (
    <main className="mx-auto">
      <HeroSection />
      <AboutSection />
      <Separator />
      <SkillsSection />
      <Separator className="my-10" />
      <ProjectsSection />
      <Separator className="my-10" />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}