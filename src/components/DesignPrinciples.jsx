import siteData from '../content/site.json'
import './DesignPrinciples.css'

export default function DesignPrinciples() {
  const { designPrinciples } = siteData

  return (
    <section className="design-principles section">
      <div className="container">
        <div className="section-number">04</div>
        <h2 className="section-title">Design Principles</h2>
        <ul className="principles-list">
          {designPrinciples.map((principle, index) => (
            <li key={index} className="principle-item">
              {principle}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
