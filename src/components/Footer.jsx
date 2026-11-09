import React from 'react'
import { ArrowUp, Github, Mail, Globe, Shield } from 'lucide-react'
import { siteConfig } from '../config/site'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: '#050505', borderTop: '1px solid var(--border-color)', padding: '5rem 0 3rem 0' }}>
      <div className="container">
        {/* Main Footer Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '3rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }}>
                <div style={{ width: '6px', height: '6px', background: '#090909' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.08em', color: 'var(--text-primary)' }}>
                {siteConfig.identity.displayName}
              </span>
            </div>

            <p style={{ fontFamily: 'var(--font-accent)', fontSize: '1.45rem', color: 'var(--accent)', margin: '0 0 1rem 0' }}>
              "{siteConfig.identity.quotes.featured}"
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '420px', lineHeight: 1.6 }}>
              {siteConfig.identity.profession}. Operating at the boundaries of digital architecture, adversarial research, and web engineering.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div style={{ display: 'flex', gap: '3.5rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                SECTIONS
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                <li><a href="#home" className="footer-link">HOME</a></li>
                <li><a href="#work" className="footer-link">SELECTED WORK</a></li>
                <li><a href="#about" className="footer-link">ABOUT IDENTITY</a></li>
                <li><a href="#expertise" className="footer-link">CYBERSECURITY</a></li>
                <li><a href="#development" className="footer-link">WEB DEV</a></li>
                <li><a href="#experience" className="footer-link">MILESTONES</a></li>
                <li><a href="#terminal" className="footer-link">TERMINAL</a></li>
                <li><a href="#contact" className="footer-link">CONTACT</a></li>
              </ul>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                PROFILES
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                <li><a href={siteConfig.contact.github} target="_blank" rel="noopener noreferrer" className="footer-link">GITHUB</a></li>
                <li><a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="footer-link">INSTAGRAM</a></li>
                <li><a href={siteConfig.contact.telegram} target="_blank" rel="noopener noreferrer" className="footer-link">TELEGRAM</a></li>
                <li><a href={siteConfig.contact.threads} target="_blank" rel="noopener noreferrer" className="footer-link">THREADS</a></li>
                <li><a href={siteConfig.contact.facebook} target="_blank" rel="noopener noreferrer" className="footer-link">FACEBOOK</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ paddingTop: '2.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666' }}>
            © {currentYear} {siteConfig.identity.displayName}. ALL RIGHTS RESERVED. OPSEC VERIFIED.
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="badge"
            style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} color="var(--accent)" />
          </button>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: var(--text-muted);
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: var(--accent);
        }
      `}</style>
    </footer>
  )
}
