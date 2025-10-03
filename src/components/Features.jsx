// src/components/Features.jsx
function FeatureCard({ title, body, emoji }) {
  return (
    <div className="feature-card">
      <div className="feature-emoji">{emoji}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  )
}

export default function Features() {
  return (
    <section className="features">
      <div className="features-inner">
        <FeatureCard
          emoji="⚡"
          title="Fast Prototype"
          body="Set up quickly with Vite + React so you can focus on features and UX."
        />
        <FeatureCard
          emoji="🧭"
          title="Modular UI"
          body="Component-based layout keeps the code clean and easy to extend."
        />
        <FeatureCard
          emoji="🚀"
          title="Deploy Ready"
          body="Ready to deploy on Vercel — shipping a demo is fast and simple."
        />
      </div>
    </section>
  )
}
