import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()
  return (
    <section className="hero">
      <h1>Empowering Ideas with AI</h1>
      <p>
        Built with <strong>React + Vite</strong> for fast, modern hackathon
        development.
      </p>
      <button className="cta-btn" onClick={() => navigate('/contact')}>
        Get Started
      </button>
    </section>
  )
}

export default Hero
