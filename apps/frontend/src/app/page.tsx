// import { StrpsHero } from "@/components/Heros/Hero";
// import { AboutMe } from "@/components/About/AboutMe";
// import { SkillsCard } from "@/components/Cards/SkillsCard";
// import { ProjectCard } from "@/components/Cards/ProjectCard";
// import Section from "@/components/Section";
// import { HeaderNav } from "@/components/HeaderNav";

// export default function Home() {


//   const skills = [
//     { title: "TypeScript" },
//     { title: "JavaScript" },
//     { title: "Python" },
//     { title: "Java" },
//     { title: "C#" },
//     { title: "Rust" },
//     { title: "C++" },
//     { title: "Electronics" },
//   ];

//   const projects = [
//     {
//       title: "Portfolio Website",
//       description: "My personal portfolio website built with Next.js and Payload CMS.",
//       technologies: [{ name: "TypeScript" }, { name: "Next.js" }, { name: "Payload CMS" }],
//       liveUrl: "#",
//       repoUrl: "#",
//     },
//     {
//       title: "E-commerce Platform",
//       description: "A full-stack e-commerce platform with a custom backend.",
//       technologies: [{ name: "Python" }, { name: "FastAPI" }, { name: "React" }],
//       liveUrl: "#",
//       repoUrl: "#",
//     },
//   ];

//   return (
//     <main>
//       <StrpsHero
//         title="Full Stack Web Developer"
//         text="Comfortable with TypeScript, JavaScript, Python, Java, C#, and interested in Rust, C++, and electronics."
//         links={[
//           { label: "View Projects", href: "#projects" },
//           { label: "Contact Me", href: "#contact", variant: "outline" },
//         ]}
//         section={{
//           background: "svgCircles"
//         }}
//       />
//       <AboutMe
//         title="About Me"
//         imageUrl="https://via.placeholder.com/400"
//         paragraphs={[
//           "I am a passionate full-stack web developer with a diverse skillset. I enjoy building robust and scalable web applications from front to back.",
//           "My experience includes working with modern frontend frameworks like React and Next.js, as well as building backend services with Node.js, Python, and Java. I am always eager to learn new technologies and expand my knowledge.",
//         ]}
//       />
//       <Section id="skills" className="py-20">
//         <h2 className="text-3xl font-bold tracking-tight text-center mb-12">My Skills</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
//           {skills.map((skill) => (
//             <SkillsCard key={skill.title} title={skill.title} />
//           ))}
//         </div>
//       </Section>
//       <Section id="projects" className="py-20 bg-muted">
//         <h2 className="text-3xl font-bold tracking-tight text-center mb-12">My Projects</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
//           {projects.map((project) => (
//             <ProjectCard key={project.title} {...project} />
//           ))}
//         </div>
//       </Section>
//       <Section id="contact" className="py-20">
//         <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Get In Touch</h2>
//         <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
//           I&apos;m currently open to new opportunities. If you have a project in mind or just want to say hi, feel free to reach out.
//         </p>
//         <div className="text-center mt-8">
//           <a href="mailto:hello@example.com" className="text-primary text-xl font-semibold">
//             hello@example.com
//           </a>
//         </div>
//       </Section>
//     </main>
//   );
// }

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