import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const nav = useNavigate();

  return (
    <section className="hero" aria-label="HealthVault hero">
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: 48, margin: 0, lineHeight: 1.05 }}>
          HealthVault
        </h1>

        <p style={{ marginTop: 14, fontSize: 16, color: 'rgba(3,23,36,0.7)' }}>
          Securely store and manage prescriptions, lab reports, vaccination records and full medical history — all tied to your unique Health ID.
        </p>

        <div style={{ marginTop: 22 }}>
          <button
            className="cta-btn"
            onClick={() => nav('/login')}
            aria-label="Get started"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}