import React from 'react'
import { motion } from 'framer-motion'
import { ShieldAlert, Compass, Eye, Terminal, Flame, Cpu } from 'lucide-react'
import { siteConfig } from '../config/site'

export default function About({ motionEnabled }) {
  return (
    <section id="about" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        {/* Section Heading */}
        <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
          <div className="section-label">01 / BIOGRAPHY & POSITIONING</div>
          <h2 className="section-title">BEHIND THE CURS3XR IDENTITY.</h2>
          <div style={{ height: '2px', width: '80px', background: 'var(--accent)', marginTop: '1rem' }} />
        </div>

        {/* Content Layout */}
        <div className="about-grid">
          {/* Left: Deep Editorial Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-primary)', lineHeight: 1.8, fontWeight: 500 }}>
              I am <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Curs3xr</span> — an independent security enthusiast, offensive security researcher and professional web developer. I operate at the intersection of technology, adversarial thinking and digital craftsmanship.
            </p>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>
              My interests revolve around red teaming, penetration testing, exploit research, reconnaissance, OSINT, vulnerability analysis and understanding how systems fail.
            </p>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>
              I am drawn to the darker side of cybersecurity—not simply to understand how systems are built, but to understand how they can be challenged, broken, exposed and ultimately secured.
            </p>

            {/* Featured Quote Callout Card */}
            <div
              style={{
                margin: '1.5rem 0',
                padding: '1.8rem 2rem',
                backgroundColor: 'var(--bg-secondary)',
                borderLeft: '3px solid var(--accent)',
                borderRight: '1px solid var(--border-color)',
                borderTop: '1px solid var(--border-color)',
                borderBottom: '1px solid var(--border-color)',
                position: 'relative'
              }}
            >
              <div style={{ fontFamily: 'var(--font-accent)', fontSize: '1.85rem', color: 'var(--text-primary)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                "{siteConfig.identity.quotes.featured}"
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>
                — CORE PHILOSOPHY / CURS3XR
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>
              My approach is influenced by the gray-hat philosophy: curiosity, independent exploration and questioning assumptions. Professional security assessments and exploitation engagements must have appropriate authorization.
            </p>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>
              Beyond cybersecurity, I build digital experiences. I develop modern websites, responsive interfaces and interactive digital products with attention to performance, precision and visual identity.
            </p>

            <p style={{ color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.75 }}>
              I don't believe in looking like everyone else. My work is built around experimentation, persistence and an obsession with the details most people overlook.
            </p>

            {/* Secondary Quote Footer */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border-color)' }}>
              <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                "{siteConfig.identity.quotes.secondary}"
              </div>
            </div>
          </div>

          {/* Right: Pillars & Discipline Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="pillar-card">
              <div className="pillar-icon">
                <ShieldAlert size={20} color="var(--accent)" />
              </div>
              <div>
                <h3 className="pillar-title">Adversarial Mindset</h3>
                <p className="pillar-desc">
                  Questioning perimeter security, simulating threat actor workflows, and dissecting system architecture beyond happy paths.
                </p>
              </div>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <Eye size={20} color="var(--accent)" />
              </div>
              <div>
                <h3 className="pillar-title">Precision Reconnaissance</h3>
                <p className="pillar-desc">
                  Passive OSINT correlation, digital footprint analysis, attack surface cartography, and unearthing neglected infrastructure.
                </p>
              </div>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <Cpu size={20} color="var(--accent)" />
              </div>
              <div>
                <h3 className="pillar-title">Technical Research</h3>
                <p className="pillar-desc">
                  Vulnerability research, proof-of-concept development, and systematic study of binary exploitation and evasions.
                </p>
              </div>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <Terminal size={20} color="var(--accent)" />
              </div>
              <div>
                <h3 className="pillar-title">Digital Craftsmanship</h3>
                <p className="pillar-desc">
                  Engineering lightning-fast, high-aesthetic web applications with custom typography, clean architecture, and bulletproof security.
                </p>
              </div>
            </div>

            {/* Security Directive Card */}
            <div
              style={{
                marginTop: '1rem',
                padding: '1.5rem',
                background: 'rgba(15, 15, 15, 0.75)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(227, 43, 60, 0.25)',
                borderRadius: '14px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.45)'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Flame size={14} /> AUTHORIZATION ETHOS
              </div>
              <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.6 }}>
                All exploitation engagements and vulnerability disclosures adhere strictly to authorized scopes, legal standards, and responsible security research principles.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4rem;
        }

        .pillar-card {
          display: flex;
          gap: 1.25rem;
          padding: 1.6rem;
          background: rgba(20, 20, 20, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .pillar-card:hover {
          border-color: rgba(227, 43, 60, 0.6);
          background: rgba(26, 26, 26, 0.85);
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.55), 0 0 20px rgba(227, 43, 60, 0.2);
        }

        .pillar-icon {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          background: rgba(227, 43, 60, 0.08);
          border: 1px solid rgba(227, 43, 60, 0.25);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pillar-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
          color: var(--text-primary);
        }

        .pillar-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.55;
        }

        @media (max-width: 960px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
      `}</style>
    </section>
  )
}
