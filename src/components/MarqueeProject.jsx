import projectsData from '../content/projects.json'
import './MarqueeProject.css'

export default function MarqueeProject() {
  const { marquee } = projectsData

  return (
    <section className="marquee-project section" id="projects">
      <div className="container">
        <div className="section-number">02</div>
        <h2 className="section-title">Open Source Spotlight</h2>
        <div className="marquee-card">
          <div className="marquee-header">
            <h3 className="marquee-title">{marquee.title}</h3>
            <p className="marquee-tagline">{marquee.tagline}</p>
          </div>
          <p className="marquee-description">{marquee.description}</p>
          <div className="marquee-tags">
            {marquee.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          <div className="marquee-architecture">
            <h4>Architecture Overview</h4>
            <p>{marquee.architecture}</p>
          </div>
          <a href={marquee.github} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            View on GitHub →
          </a>
        </div>
      </div>
    </section>
  )
}
