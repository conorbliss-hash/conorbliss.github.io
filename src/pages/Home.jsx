import Hero from '../components/Hero'
import JudgmentCalls from '../components/JudgmentCalls'
import Assertions from '../components/Assertions'
import MarqueeProject from '../components/MarqueeProject'
import ProfessionalSystems from '../components/ProfessionalSystems'
import Boundaries from '../components/Boundaries'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <JudgmentCalls />
      <ProfessionalSystems />
      <MarqueeProject />
      <Assertions />
      <Boundaries />
      <Footer />
    </main>
  )
}
