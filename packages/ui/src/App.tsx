import { SkillsCard } from './components/Cards/SkillsCard'

function App() {

  return (

    <div>
      < SkillsCard
        title="Frontend Development"
        iconName="code"
        skills={[
          { text: 'React' },
          { text: 'TypeScript' },
          { text: 'CSS' },
          { text: 'HTML' },
        ]}
      />


    </div>

  )
}

export default App
