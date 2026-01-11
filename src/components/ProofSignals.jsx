import siteData from '../content/site.json'
import './ProofSignals.css'

export default function ProofSignals() {
  const { proofSignals } = siteData

  return (
    <section className="proof-signals section">
      <div className="container">
        <div className="section-number">01</div>
        <h2 className="section-title">Trust Signals</h2>
        <ul className="signals-list">
          {proofSignals.map((signal, index) => (
            <li key={index} className="signal-item">
              {signal}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
