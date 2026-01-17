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
            {hero.operationalTrust && (
              <p className="hero-operational-trust">{hero.operationalTrust}</p>
            )}
          </div>
          <div className="hero-image-wrapper">
            <img src="./profile.jpg" alt="Conor Bliss" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  )
}
