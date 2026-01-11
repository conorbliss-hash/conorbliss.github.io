import siteData from '../content/site.json'
import './Hero.css'

export default function Hero() {
  const { hero } = siteData

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-image-wrapper">
            <img src="./profile.jpg" alt="Conor Bliss" className="hero-image" />
          </div>
          <h1 className="hero-headline">{hero.headline}</h1>
          <p className="hero-subheadline">{hero.subheadline}</p>
          <div className="hero-cta">
            <a href={hero.cta.primary.link} className="btn btn-primary">
              {hero.cta.primary.text}
            </a>
            <a href={hero.cta.secondary.link} className="btn" target="_blank" rel="noopener noreferrer">
              {hero.cta.secondary.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
