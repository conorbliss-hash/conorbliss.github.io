import siteData from '../content/site.json'
import './Hero.css'

export default function Hero() {
  const { hero } = siteData

  return (
    <section className="hero">
      <div className="system-halo"></div>
      <div className="container">
        <div className="hero-layout">
          <div className="hero-content">
            <h1 className="hero-headline">{hero.headline}</h1>
            <p className="hero-subheadline">{hero.subheadline}</p>
            {hero.narrativeSpine && (
              <p className="hero-narrative-spine">{hero.narrativeSpine}</p>
            )}
            <div className="hero-cta">
              <a href={hero.cta.primary.link} className="btn btn-primary">
                {hero.cta.primary.text}
              </a>
              <a href={hero.cta.secondary.link} className="btn" target="_blank" rel="noopener noreferrer">
                {hero.cta.secondary.text}
              </a>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <img src="./profile.jpg" alt="Conor Bliss" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  )
}
