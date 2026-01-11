import Hero from '../components/Hero'
import About from '../components/About'
import ProofSignals from '../components/ProofSignals'
import MarqueeProject from '../components/MarqueeProject'
import ProfessionalSystems from '../components/ProfessionalSystems'
import DesignPrinciples from '../components/DesignPrinciples'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ProofSignals />
      <MarqueeProject />
      <ProfessionalSystems />
      <DesignPrinciples />
      <Footer />
    </main>
  )
}
