import { useState } from 'react'

function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="page-card">
      <h1>Contact Us</h1>
      {sent ? (
        <p>✅ Thanks for your message!</p>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">

          <textarea placeholder="Your Name" rows={4} required/>
          <textarea placeholder="Your Email" rows={4} required />
          <textarea placeholder="Message" rows={4} required />
          <br></br>
          <button type="submit" className="cta-btn">Send</button>
        </form>
      )}
    </div>
  )
}

export default Contact
