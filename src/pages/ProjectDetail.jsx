import { useParams, Link } from 'react-router-dom'
import projectsData from '../content/projects.json'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const details = projectsData.projectDetails[slug]
  const project = projectsData.professional.find(p => p.id === slug)

  if (!details || !project) {
    return (
      <div className="container" style={{ padding: '100px 24px' }}>
        <h1>Project not found</h1>
        <Link to="/" className="btn">← Back to home</Link>
      </div>
    )
  }

  return (
    <main className="project-detail">
      <div className="container">
        <Link to="/" className="back-link">← Back to home</Link>
        
        <header className="detail-header">
          <h1>{project.title}</h1>
          <p className="detail-summary">{project.problem}</p>
        </header>

        <section className="detail-section">
          <h2>Context</h2>
          <p>{details.context}</p>
        </section>

        <section className="detail-section">
          <h2>System Design</h2>
          <p>{details.systemDesign}</p>
        </section>

        <section className="detail-section">
          <h2>Key Decisions</h2>
          <ul className="decision-list">
            {details.keyDecisions.map((decision, index) => (
              <li key={index}>{decision}</li>
            ))}
          </ul>
        </section>

        <section className="detail-section">
          <h2>Governance & Risk</h2>
          <p>{details.governanceRisk}</p>
        </section>

        <section className="detail-section">
          <h2>Outcome</h2>
          <p>{details.outcome}</p>
        </section>

        <Link to="/" className="btn btn-primary" style={{ marginTop: '48px' }}>
          ← Back to home
        </Link>
      </div>
    </main>
  )
}
