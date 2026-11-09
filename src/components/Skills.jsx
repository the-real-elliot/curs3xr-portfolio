import React from 'react'
import { Terminal, Shield, Wrench, Check } from 'lucide-react'
import { siteConfig } from '../config/site'

export default function Skills({ motionEnabled }) {
  const securitySkills = [
    "Red Teaming",
    "Penetration Testing",
    "Exploit Research",
    "OSINT",
    "Reconnaissance",
    "Web Application Security",
    "Vulnerability Research",
    "Post-Exploitation",
    "Security Assessment"
  ]

  const devSkills = [
    "React",
    "JavaScript",
    "Frontend Development",
    "UI/UX Design",
    "Responsive Design",
    "Website Engineering"
  ]

  const tools = siteConfig.skills.tools

  return (
    <section id="skills" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <div className="section-label">04 / TECHNICAL ARSENAL</div>
          <h2 className="section-title">VERIFIED SKILLS & TOOLING.</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            No arbitrary percentage bars or fabricated metrics. An honest, verified breakdown of practical technical competencies across offensive security and modern web development.
          </p>
        </div>

        {/* Skills Two-Column Grid */}
        <div className="skills-grid">
          {/* Cybersecurity Skills */}
          <div className="skills-block">
            <div className="skills-block-header">
              <Shield size={18} color="var(--accent)" />
              <h3 className="skills-block-title">CYBERSECURITY DISCIPLINES</h3>
            </div>
            <div className="skills-tags">
              {securitySkills.map((skill) => (
                <div key={skill} className="skill-chip">
                  <Check size={13} color="var(--accent)" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Development Skills */}
          <div className="skills-block">
            <div className="skills-block-header">
              <Terminal size={18} color="var(--accent)" />
              <h3 className="skills-block-title">DIGITAL DEVELOPMENT</h3>
            </div>
            <div className="skills-tags">
              {devSkills.map((skill) => (
                <div key={skill} className="skill-chip">
                  <Check size={13} color="var(--accent)" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tooling & Software Ecosystem */}
        <div style={{ marginTop: '3.5rem', background: 'rgba(20, 20, 20, 0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '2.5rem', borderRadius: '18px', boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Wrench size={16} color="var(--accent)" />
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '0.12em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
              PRIMARY TOOLS & OPERATIONAL UTILITIES
            </h4>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {tools.map((tool) => (
              <span
                key={tool}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  padding: '0.55rem 1.1rem',
                  background: 'rgba(25, 25, 25, 0.8)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                }}
              >
                <span style={{ color: 'var(--accent)', fontSize: '0.7rem' }}>›</span>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }

        .skills-block {
          background: rgba(20, 20, 20, 0.7);
          backdrop-filter: blur(14px);
          border: 1px solid var(--border-color);
          padding: 2.5rem;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .skills-block-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .skills-block-title {
          font-family: var(--font-display);
          font-size: 1.45rem;
          letter-spacing: 0.05em;
          color: var(--text-primary);
        }

        .skills-tags {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1rem;
        }

        .skill-chip {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(18, 18, 18, 0.85);
          border: 1px solid var(--border-color);
          padding: 0.85rem 1.1rem;
          font-size: 0.88rem;
          color: var(--text-primary);
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: all 0.25s var(--ease-cinematic);
        }

        .skill-chip:hover {
          border-color: rgba(227, 43, 60, 0.6);
          background: rgba(26, 26, 26, 0.95);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(227, 43, 60, 0.2);
        }

        @media (max-width: 800px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
