import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Layout, Zap, Database, Server, Smartphone, Monitor, Layers, ArrowUpRight } from 'lucide-react'

export default function WebDev({ motionEnabled }) {
  const capabilities = [
    {
      title: "Custom Website Development",
      desc: "Tailored web applications built from scratch with clean semantics, bespoke branding, and zero bloat.",
      icon: Monitor
    },
    {
      title: "React & Modern JavaScript",
      desc: "Component-driven architectures utilizing modern React, strict state management, and optimized hydration.",
      icon: Code2
    },
    {
      title: "UI/UX & Editorial Design",
      desc: "Bespoke dark aesthetic interfaces, typography-led hierarchies, and micro-interactions designed to engage.",
      icon: Layout
    },
    {
      title: "Responsive Web Engineering",
      desc: "Pixel-perfect fluidity across all screen sizes (320px mobile to 4K displays) with zero horizontal overflow.",
      icon: Smartphone
    },
    {
      title: "Performance Optimization",
      desc: "Near-instant TTFB, 95+ Core Web Vitals, tree-shaken bundles, and optimized asset pipelines.",
      icon: Zap
    },
    {
      title: "API & Backend Integration",
      desc: "RESTful & GraphQL integrations, secure token management, WebSocket streams, and backend services.",
      icon: Server
    },
    {
      title: "Interactive Dashboards",
      desc: "Real-time administrative portals, telemetry panels, monitoring tools, and analytics visualization.",
      icon: Layers
    },
    {
      title: "Digital Product Development",
      desc: "End-to-end product realization from architectural blueprint and wireframing to production deployment.",
      icon: Database
    }
  ]

  return (
    <section id="development" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div className="section-label">03 / DIGITAL CRAFTSMANSHIP</div>
          <h2 className="section-title">ENGINEERING THE DIGITAL SURFACE.</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Web development is treated with equal rigor to security. I build bespoke, responsive, and robust digital platforms designed to command attention and deliver exceptional performance for modern brands.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="webdev-grid">
          {capabilities.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="webdev-card">
                <div className="webdev-card-header">
                  <div className="webdev-card-icon">
                    <Icon size={20} color="var(--accent)" />
                  </div>
                  <span className="font-mono text-accent" style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="webdev-card-title">{item.title}</h3>
                <p className="webdev-card-desc">{item.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Client Engagement Pitch */}
        <div
          style={{
            marginTop: '3.5rem',
            padding: '2.5rem',
            background: 'rgba(20, 20, 20, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem'
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              COMMERCIAL INQUIRIES & COLLABORATIONS
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
              NEED A BESPOKE DIGITAL EXPERIENCE BUILT?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '600px', marginTop: '0.3rem' }}>
              I partner with businesses and individuals seeking high-impact web design, robust frontend engineering, and security-conscious implementations.
            </p>
          </div>
          <a href="#contact" className="btn btn-primary" style={{ padding: '0.9rem 1.8rem' }}>
            <span>START A PROJECT</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <style>{`
        .webdev-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .webdev-card {
          background: rgba(20, 20, 20, 0.7);
          backdrop-filter: blur(14px);
          border: 1px solid var(--border-color);
          padding: 2.2rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .webdev-card:hover {
          border-color: rgba(227, 43, 60, 0.6);
          background: rgba(26, 26, 26, 0.85);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(227, 43, 60, 0.2);
        }

        .webdev-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .webdev-card-icon {
          width: 44px;
          height: 44px;
          background: rgba(227, 43, 60, 0.08);
          border: 1px solid rgba(227, 43, 60, 0.25);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .webdev-card-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 0.6rem;
        }

        .webdev-card-desc {
          color: var(--text-muted);
          font-size: 0.88rem;
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .webdev-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
