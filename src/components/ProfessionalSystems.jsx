import { Link } from 'react-router-dom'
import projectsData from '../content/projects.json'
import './ProfessionalSystems.css'

export default function ProfessionalSystems() {
  const { professional } = projectsData

  return (
    <section className="professional-systems section">
      <div className="container">
        <div className="section-number">03</div>
        <h2 className="section-title">Selected Professional Systems</h2>
        <div className="systems-grid">
          {professional.map((system) => (
            <Link to={`/projects/${system.id}`} key={system.id} className="system-card card">
              <h3 className="system-title">{system.title}</h3>
              <div className="system-section">
                <h4>Problem</h4>
                <p>{system.problem}</p>
              </div>
              <div className="system-section">
                <h4>Approach</h4>
                <p>{system.approach}</p>
              </div>
              <div className="system-section">
                <h4>Outcome</h4>
                <p>{system.outcome}</p>
              </div>
              <div className="system-link">View System Design</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
