import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type PostArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

export const post5: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  const now = new Date()

  return {
    slug: 'diy-pen-plotter-build',
    _status: 'published',
    authors: [author],
    title: 'Building a DIY Pen Plotter Using Local Materials and 3D Printing',
    publishedAt: now.toISOString(),
    excerpt:
      'My journey of designing and building a DIY pen plotter using locally sourced materials and 3D printing, focusing on accessibility and modularity.',
    meta: {
      title: 'Building a DIY Pen Plotter Using Local Materials and 3D Printing',
      description:
        'Follow my journey of designing and building a DIY pen plotter using locally sourced materials and 3D printing, with a focus on accessibility and modularity.',
      image: typeof heroImage === 'string' ? heroImage : heroImage.id,
    },
    heroImage: typeof heroImage === 'string' ? heroImage : heroImage.id,
    content: {
      root: {
        type: 'root',
        direction: 'ltr',
        format: 'left',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: 'Introduction' }],
            tag: 'h2',
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: "I'm fascinated by technology and art — two worlds that often overlap in surprising and beautiful ways. As an illustrator and occasional tattoo artist, I'm always exploring new ways to blend creativity with tools. One machine that completely captures this intersection is the pen plotter — a device that draws intricate designs with mechanical precision. There's something deeply satisfying about watching it work, transforming code into clean, elegant lines.",
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'So, I decided to build one myself.',
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: "This blog post is the beginning of that journey. I'm designing and building a DIY pen plotter using mostly locally available and affordable materials, with a strong focus on accessibility and modularity. The project is still in progress, but I want to document the path, share lessons learned, and hopefully inspire others to start building their own.",
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: 'Background & Motivation' }],
            tag: 'h2',
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'My passion for generative art and the satisfying visuals of drawing machines pushed me to finally start this project. I began by ordering a few key components — stepper motors, drivers, and a CNC shield — since I already had an Arduino and a power supply at home. With some electronics knowledge under my belt, I knew I could build this relatively cheaply.',
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'At first, I experimented with steel tubing and welded parts to create a strong frame. It was functional but not ideal for quick iterations or sharing the design with others. Once I gained access to a 3D printer, everything changed. Switching to PLA-printed parts allowed me to design, test, and tweak much faster — making the plotter more replicable, modular, and easier to improve over time.',
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: "This project is not just about building a machine; it's about exploring how art and engineering can come together — and how that process can be accessible, creative, and fun.",
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: 'Design Goals & Constraints' }],
            tag: 'h2',
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'Before starting the actual build, I set a few clear goals to guide my design:',
              },
            ],
          },
          {
            type: 'list',
            listType: 'bullet',
            version: 1,
            children: [
              {
                type: 'listItem',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Affordability: Keep the overall cost low by using parts I already had and sourcing materials locally whenever possible.',
                  },
                ],
              },
              {
                type: 'listItem',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Reproducibility: Make a design that can be easily reprinted and assembled by others, using a 3D printer and common hardware.',
                  },
                ],
              },
              {
                type: 'listItem',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Modularity: Structure the plotter so components can be swapped out or upgraded without redesigning everything.',
                  },
                ],
              },
              {
                type: 'listItem',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Rapid Iteration: Use 3D printing to quickly test and refine parts, reducing the friction of prototyping.',
                  },
                ],
              },
              {
                type: 'listItem',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Simplicity: Minimize complexity where possible — both in hardware and software — to make the project more approachable.',
                  },
                ],
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'These goals helped keep the project grounded and focused, especially when new ideas or features tempted me to overcomplicate things.',
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: 'Materials & Tools' }],
            tag: 'h2',
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: "Here's a breakdown of the materials and tools I'm using for the project so far:",
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: 'Electronics' }],
            tag: 'h3',
          },
          {
            type: 'list',
            listType: 'bullet',
            version: 1,
            children: [
              {
                type: 'listItem',
                version: 1,
                children: [{ type: 'text', version: 1, text: 'Arduino Uno (already on hand)' }],
              },
              {
                type: 'listItem',
                version: 1,
                children: [
                  { type: 'text', version: 1, text: 'Stepper motors (NEMA 17) — ordered online' },
                ],
              },
              {
                type: 'listItem',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Stepper drivers (A4988) — ordered along with motors',
                  },
                ],
              },
              {
                type: 'listItem',
                version: 1,
                children: [
                  { type: 'text', version: 1, text: 'CNC Shield — for easy plug-and-play wiring' },
                ],
              },
              {
                type: 'listItem',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Power supply — reused from a previous project',
                  },
                ],
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: 'Structure & Motion Components' }],
            tag: 'h3',
          },
          {
            type: 'list',
            listType: 'bullet',
            version: 1,
            children: [
              {
                type: 'listItem',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Steel tubing (originally used in early prototype)',
                  },
                ],
              },
              {
                type: 'listItem',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Smooth rods & linear bearings — easy to source locally',
                  },
                ],
              },
              {
                type: 'listItem',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Lead screws / GT2 belts — for motion control',
                  },
                ],
              },
              {
                type: 'listItem',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: '3D-printed PLA parts — custom-designed for the frame, motor mounts, and pen holder',
                  },
                ],
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: 'Tools' }],
            tag: 'h3',
          },
          {
            type: 'list',
            listType: 'bullet',
            version: 1,
            children: [
              {
                type: 'listItem',
                version: 1,
                children: [{ type: 'text', version: 1, text: '3D printer (FDM, PLA filament)' }],
              },
              {
                type: 'listItem',
                version: 1,
                children: [{ type: 'text', version: 1, text: 'Basic soldering equipment' }],
              },
              {
                type: 'listItem',
                version: 1,
                children: [{ type: 'text', version: 1, text: 'Multimeter' }],
              },
              {
                type: 'listItem',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Drill, cutting tools, screws, and general hand tools',
                  },
                ],
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'Most of the materials can be found in local hardware stores or online, and the custom parts can be printed with any decent 3D printer. This setup strikes a balance between DIY flexibility and the reliability needed for precision drawing.',
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: 'Design & Build Process' }],
            tag: 'h2',
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'The build process started very organically. I began by cutting metal sheets and welding parts together by hand. Using basic tools like a grinder, a stick welder, a drill press, and a hacksaw, I sketched out measurements on the spot and built without any formal plan. It was very much a "learn by doing" approach — solving problems as they came up with whatever materials and tools I had available.',
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: "While this method gave me a quick head start and a rough prototype, it quickly became clear that it was not ideal for refinement or reproducibility. That's when I decided to shift gears and bring the project into the digital world.",
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: "I began modeling the components in Fusion 360, which allowed for more precise design, easy modifications, and proper alignment of parts. I'm currently about 65% through the CAD modeling phase, and I haven't started printing any components yet — but the foundation is there.",
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: "Once printing begins, I'll be able to iterate much faster, achieve better precision, and move toward a modular, shareable design. This change in workflow has already transformed the project, and I'm excited to keep building and refining from here.",
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: 'Challenges & Lessons Learned (So Far)' }],
            tag: 'h2',
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'Even at this early stage, this project has offered plenty of learning opportunities. Here are some of the key takeaways:',
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: '1. Iteration is Everything' }],
            tag: 'h3',
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'Initially, working with metal parts was exciting — but modifying anything took a lot of time and effort. Switching to a CAD + 3D printing workflow changed everything. I learned how powerful it is to be able to tweak dimensions or redesign a part and have a prototype ready in hours, not days.',
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: '2. Work With What You Have' }],
            tag: 'h3',
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'Starting with what I already owned — like the Arduino and power supply — was key to keeping the project affordable. It also shaped my approach: rather than designing around ideal components, I adapted the build to fit the tools and materials I had on hand.',
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: '3. Planning Emerges Naturally' }],
            tag: 'h3',
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'While I began the project without a strict plan, hands-on building led me to understand the design requirements better. Eventually, this practical experience fed into a more structured and thoughtful CAD design process.',
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: '4. Tool Constraints Guide Creativity' }],
            tag: 'h3',
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'Limited tools and resources might seem like a disadvantage, but they actually helped me stay focused and creative. I had to find simple, clever solutions — like using hand tools effectively or designing 3D-printed parts to make assembly easier.',
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: "5. Don't Wait for Perfect" }],
            tag: 'h3',
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: "I've learned not to hold back progress in search of perfection. Getting started — even roughly — taught me more than any amount of planning could. It's easier to improve a rough prototype than to fix a design that only exists in your head.",
              },
            ],
          },
          {
            type: 'heading',
            version: 1,
            children: [{ type: 'text', version: 1, text: 'Next Steps' }],
            tag: 'h2',
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: "As of now, I'm still deep in the CAD modeling phase in Fusion 360 — about 65% done. Once the design is complete, the real hands-on fun begins:",
              },
            ],
          },
          {
            type: 'ul',
            version: 1,
            children: [
              {
                type: 'li',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Complete CAD Design',
                  },
                ],
              },
              {
                type: 'ul',
                version: 1,
                children: [
                  {
                    type: 'li',
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        text: 'Finalize motor mounts, pen holder, and axis guides',
                      },
                    ],
                  },
                  {
                    type: 'li',
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        text: 'Simulate fit and movement where possible',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'li',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Start Printing Components',
                  },
                ],
              },
              {
                type: 'ul',
                version: 1,
                children: [
                  {
                    type: 'li',
                    version: 1,
                    children: [
                      { type: 'text', version: 1, text: 'Begin prototyping parts using PLA' },
                    ],
                  },
                  {
                    type: 'li',
                    version: 1,
                    children: [
                      { type: 'text', version: 1, text: 'Test for tolerance, fit, and stability' },
                    ],
                  },
                ],
              },
              {
                type: 'li',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Assemble the First Working Version',
                  },
                ],
              },
              {
                type: 'ul',
                version: 1,
                children: [
                  {
                    type: 'li',
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        text: 'Combine printed parts with motors and motion components',
                      },
                    ],
                  },
                  {
                    type: 'li',
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        text: 'Route wiring and connect to the Arduino + CNC Shield',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'li',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Write Basic Control Software',
                  },
                ],
              },
              {
                type: 'ul',
                version: 1,
                children: [
                  {
                    type: 'li',
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        text: 'Start with GRBL or simple G-code interpreter',
                      },
                    ],
                  },
                  {
                    type: 'li',
                    version: 1,
                    children: [{ type: 'text', version: 1, text: 'Run first drawing tests' }],
                  },
                ],
              },
              {
                type: 'li',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Document Progress',
                  },
                ],
              },
              {
                type: 'ul',
                version: 1,
                children: [
                  {
                    type: 'li',
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        text: 'Take notes, record videos, and prepare for the next blog post',
                      },
                    ],
                  },
                  {
                    type: 'li',
                    version: 1,
                    children: [{ type: 'text', version: 1, text: 'Plan Iterations' }],
                  },
                  {
                    type: 'li',
                    version: 1,
                    children: [{ type: 'text', version: 1, text: 'Identify early improvements' }],
                  },
                  {
                    type: 'li',
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        text: 'Test new versions of structural components if needed',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: "This project is ongoing, and I'm looking forward to sharing more as I go — including STL files and build instructions once the design is finalized.",
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'Stay tuned!',
              },
            ],
          },
        ],
      },
    },
  }
}
