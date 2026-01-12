import siteData from '../content/site.json'
import './JudgmentCalls.css'

export default function JudgmentCalls() {
  const { judgmentCalls } = siteData

  return (
    <section className="judgment-calls section">
      <div className="container">
        <h2 className="judgment-calls-title">{judgmentCalls.title}</h2>
        <ul className="judgment-calls-list">
          {judgmentCalls.items.map((item, index) => (
            <li key={index} className="judgment-call-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
