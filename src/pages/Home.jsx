import Hero from '../components/Hero'
import Assertions from '../components/Assertions'
import MarqueeProject from '../components/MarqueeProject'
import ProfessionalSystems from '../components/ProfessionalSystems'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeProject />
      <ProfessionalSystems />
      <Assertions />
      <Footer />
    </main>
  )
}
