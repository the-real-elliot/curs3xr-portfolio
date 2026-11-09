import React, { useState } from 'react'
import { Mail, Send, CheckCircle2, AlertCircle, ArrowUpRight, ShieldCheck, MessageSquare } from 'lucide-react'
import { siteConfig } from '../config/site'

export default function Contact({ motionEnabled }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please provide your name, valid email address, and message briefing.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address format.')
      return
    }

    // Static fallback: generate direct mailto: link per spec Section 16
    const mailtoSubject = encodeURIComponent(formData.subject ? `[Inquiry] ${formData.subject}` : `[Inquiry] Contact from ${formData.name}`)
    const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    const mailtoUrl = `mailto:${siteConfig.contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`

    // Trigger user's mail client
    window.location.href = mailtoUrl
    setSubmitted(true)
  }

  return (
    <section id="contact" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <div className="section-label">08 / INITIATE CONTACT</div>
          <h2 className="section-title">{siteConfig.contact.heading}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            {siteConfig.contact.subheading}
          </p>
        </div>

        {/* Contact Layout */}
        <div className="contact-grid">
          {/* Left Column: Direct Communication Vectors */}
          <div>
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                DIRECT SECURE EMAIL
              </div>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="email-link"
              >
                {siteConfig.contact.email}
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', color: '#666', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                <ShieldCheck size={14} color="#10b981" />
                <span>Encrypted transit & prompt triage guaranteed</span>
              </div>
            </div>

            {/* Social Direct Links */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                VERIFIED SOCIAL PROFILES
              </div>
              <div className="social-links-list">
                <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="social-row">
                  <span>Instagram</span>
                  <span className="font-mono text-muted">@Curs3xr</span>
                  <ArrowUpRight size={14} />
                </a>
                <a href={siteConfig.contact.telegram} target="_blank" rel="noopener noreferrer" className="social-row">
                  <span>Telegram</span>
                  <span className="font-mono text-muted">@Curs3xr</span>
                  <ArrowUpRight size={14} />
                </a>
                <a href={siteConfig.contact.threads} target="_blank" rel="noopener noreferrer" className="social-row">
                  <span>Threads</span>
                  <span className="font-mono text-muted">@Curs3xr</span>
                  <ArrowUpRight size={14} />
                </a>
                <a href={siteConfig.contact.facebook} target="_blank" rel="noopener noreferrer" className="social-row">
                  <span>Facebook</span>
                  <span className="font-mono text-muted">Curs3xr</span>
                  <ArrowUpRight size={14} />
                </a>
                <a href={siteConfig.contact.github} target="_blank" rel="noopener noreferrer" className="social-row">
                  <span>GitHub</span>
                  <span className="font-mono text-muted">the-real-elliot</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="contact-form-card">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ width: '56px', height: '56px', background: 'rgba(227, 43, 60, 0.1)', border: '1px solid var(--accent)', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <CheckCircle2 size={26} color="var(--accent)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  DISPATCH LAUNCHED
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
                  Your system mail client was summoned with your briefing. If your client didn't launch automatically, send your transmission directly to:
                </p>
                <div className="badge font-mono" style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>
                  {siteConfig.contact.email}
                </div>
                <div style={{ marginTop: '2rem' }}>
                  <button onClick={() => setSubmitted(false)} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <MessageSquare size={16} color="var(--accent)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    TRANSMISSION DISPATCH
                  </span>
                </div>

                {error && (
                  <div style={{ padding: '0.75rem 1rem', background: 'rgba(255, 95, 86, 0.12)', border: '1px solid #ff5f56', color: '#ff5f56', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">NAME / ALIAS *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name or organization"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@domain.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">SUBJECT / SCOPE</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Security Assessment / Web Development"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">BRIEFING & REQUIREMENTS *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details about scope, timelines, or technical requirements..."
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  <span>DISPATCH TRANSMISSION</span>
                  <Send size={15} />
                </button>

                <p style={{ fontSize: '0.72rem', color: '#666', textAlign: 'center', margin: 0, fontFamily: 'var(--font-mono)' }}>
                  * Static deployment: triggers your system mail client directly to {siteConfig.contact.email}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .email-link {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3.5vw, 2.4rem);
          color: var(--text-primary);
          letter-spacing: 0.04em;
          text-decoration: underline;
          text-decoration-color: var(--accent);
          text-underline-offset: 8px;
          transition: color 0.2s ease;
        }

        .email-link:hover {
          color: var(--accent);
        }

        .social-links-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .social-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.4rem;
          background: rgba(20, 20, 20, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: all 0.25s var(--ease-cinematic);
        }

        .social-row:hover {
          border-color: rgba(227, 43, 60, 0.6);
          background: rgba(26, 26, 26, 0.9);
          transform: translateX(4px);
          box-shadow: 0 8px 25px rgba(227, 43, 60, 0.2);
        }

        .contact-form-card {
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 2.5rem;
          border-radius: 18px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .form-group input,
        .form-group textarea {
          background: rgba(13, 13, 13, 0.8);
          border: 1px solid var(--border-color);
          padding: 0.9rem 1.1rem;
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-primary);
          border-radius: 10px;
          outline: none;
          transition: all 0.2s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-glow);
          background: rgba(18, 18, 18, 0.95);
        }

        @media (max-width: 850px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .contact-form-card {
            padding: 1.75rem;
          }
        }
      `}</style>
    </section>
  )
}
