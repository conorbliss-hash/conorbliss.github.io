import './Writing.css'

const posts = [
  {
    title: "How I code with agents, without being 'technical'",
    subtitle: "A 5 step process for consistent results",
    url: "https://medium.com/@conor.bliss.henaghan",
    gradient: "linear-gradient(135deg, #1a3a5c 0%, #0d1b2a 100%)"
  },
  {
    title: "An Operating System for Data Authority",
    subtitle: "Designing an AI-Enabled Data Ingestion Pipeline",
    url: "https://medium.com/@conor.bliss.henaghan",
    gradient: "linear-gradient(135deg, #0d3b66 0%, #1a1a2e 100%)"
  },
  {
    title: "Making Data Authoritative: The Step Most AI Programs Skip",
    subtitle: "As companies push AI from experiments into real workflows",
    url: "https://medium.com/@conor.bliss.henaghan",
    gradient: "linear-gradient(135deg, #16213e 0%, #0f0f23 100%)"
  },
  {
    title: "It's not another dashboard. It's a coach in your inbox.",
    subtitle: "From Data Overload to Clarity. One Email. One Decision for the Week.",
    url: "https://medium.com/@conor.bliss.henaghan",
    gradient: "linear-gradient(135deg, #1f4068 0%, #162447 100%)"
  }
]

export default function Writing() {
  return (
    <section className="writing section">
      <div className="container">
        <h2 className="writing-title">Writing</h2>
        <div className="writing-track">
          {posts.map((post, index) => (
            <a 
              key={index} 
              href={post.url} 
              className="writing-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div 
                className="writing-card-image" 
                style={{ background: post.gradient }}
              />
              <div className="writing-card-content">
                <h3 className="writing-card-title">{post.title}</h3>
                <p className="writing-card-subtitle">{post.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
