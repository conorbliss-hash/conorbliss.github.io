import { Link } from 'react-router-dom'
import projectsData from '../content/projects.json'
import './ProfessionalSystems.css'

export default function ProfessionalSystems() {
  const { professional, professionalFraming } = projectsData

  return (
    <section className="professional-systems section">
      <div className="container">
        {professionalFraming && (
          <p className="professional-framing">{professionalFraming}</p>
        )}
        <div className="systems-grid">
          {professional.map((system) => (
            <Link to={`/projects/${system.id}`} key={system.id} className="system-card card">
              <h3 className="system-title">{system.title}</h3>
              {system.domainTags && system.domainTags.length > 0 && (
                <div className="domain-tags">
                  {system.domainTags.map((tag, index) => (
                    <span key={index} className="domain-tag">{tag}</span>
                  ))}
                </div>
              )}
              {system.riskPrevented && (
                <div className="system-section risk-section">
                  <h4>Risk Prevented</h4>
                  <p>{system.riskPrevented}</p>
                </div>
              )}
              {system.mechanism && (
                <div className="system-section mechanism-section">
                  <h4>Mechanism</h4>
                  <p>{system.mechanism}</p>
                </div>
              )}
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
