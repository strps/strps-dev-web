import type { IconName } from 'lucide-react/dynamic'
import { SkillsCard } from './components/Cards/SkillsCard'
import { ModeToggle } from './components/ThemeSwitch'

function App() {

  return (
    <main className="flex flex-col min-h-screen">
      <UiHeader />
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="grid grid-cols-4 gap-7">
          {skills.map((skillSet, index) => (
            <SkillsCard
              key={index}
              title={skillSet.title}
              iconName={skillSet.iconName as IconName}
              skills={skillSet.skills}
            />
          ))}

        </div>
      </div>
    </main>
  )
}

const skills = [
  {
    title: 'Frontend Development',
    iconName: 'code-2',
    skills: [
      { text: 'React' },
      { text: 'TypeScript' },
      { text: 'CSS' },
      { text: 'HTML' },
    ],
  },
  {
    title: 'Backend Development',
    iconName: 'server',
    skills: [
      { text: 'Node.js' },
      { text: 'Python' },
      { text: 'PostgreSQL' },
      { text: 'MongoDB' },
    ],
  },
  {
    title: 'DevOps',
    iconName: 'cloud-cog',
    skills: [
      { text: 'Docker' },
      { text: 'Kubernetes' },
      { text: 'AWS' },
      { text: 'CI/CD' },
    ],
  },
  {
    title: 'UI/UX Design',
    iconName: 'palette',
    skills: [
      { text: 'Figma' },
      { text: 'Adobe XD' },
      { text: 'Sketch' },
      { text: 'InVision' },
    ],
  }
]

const UiHeader = () => {
  return (
    <header className="p-4 border-b flex justify-between items-center">
      <h1 className="text-2xl font-bold">UI Package</h1>
      <ModeToggle />
    </header>
  )
}


export default App
