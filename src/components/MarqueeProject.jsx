import projectsData from '../content/projects.json'
import './MarqueeProject.css'

export default function MarqueeProject() {
  const { marquee } = projectsData

  return (
    <section className="marquee-project section" id="projects">
      <div className="container">
        <div className="section-number">02</div>
        <h2 className="section-title">Featured Work</h2>
        <div className="marquee-card">
          <div className="marquee-header">
            <div className="marquee-label">{marquee.label}</div>
            <h3 className="marquee-title">{marquee.title}</h3>
            <p className="marquee-tagline">{marquee.tagline}</p>
          </div>
          <p className="marquee-description">{marquee.problem}</p>
          <p className="marquee-approach">{marquee.approach}</p>
          <div className="marquee-tags">
            {marquee.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          <a href={marquee.github} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
      </div>
    </section>
  )
}
