import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Calendar, Shield, Code, Terminal, Sparkles } from 'lucide-react'
import { milestones } from '../data/experience'

export default function Experience({ motionEnabled }) {
  const [expandedIndex, setExpandedIndex] = useState(0)

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index)
  }

  return (
    <section id="experience" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <div className="section-label">06 / CHRONOLOGY & MILESTONES</div>
          <h2 className="section-title">TECHNICAL TRAJECTORY.</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            An honest, verified record of independent research progression, engineering focus, and security experimentation milestones.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="timeline-container">
          {milestones.map((item, index) => {
            const isExpanded = expandedIndex === index
            return (
              <div
                key={index}
                className={`timeline-item ${isExpanded ? 'active' : ''}`}
                onClick={() => toggleExpand(index)}
              >
                <div className="timeline-header">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <span className="font-mono text-accent" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                        {item.period}
                      </span>
                      <span className="badge" style={{ fontSize: '0.68rem' }}>{item.discipline}</span>
                      <span className="badge" style={{ fontSize: '0.68rem', color: '#888' }}>{item.location}</span>
                    </div>
                    <h3 className="timeline-title">{item.title}</h3>
                  </div>

                  <div className="timeline-toggle-btn">
                    <ChevronDown
                      size={20}
                      style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        color: isExpanded ? 'var(--accent)' : 'var(--text-muted)'
                      }}
                    />
                  </div>
                </div>

                <p className="timeline-summary">{item.summary}</p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={motionEnabled ? { opacity: 0, height: 0 } : false}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="timeline-details">
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                          FOCUS AREAS & ENGAGEMENTS
                        </div>
                        <ul className="timeline-detail-list">
                          {item.details.map((detail, dIdx) => (
                            <li key={dIdx}>
                              <span className="bullet">›</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .timeline-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 960px;
        }

        .timeline-item {
          background: rgba(20, 20, 20, 0.7);
          backdrop-filter: blur(14px);
          border: 1px solid var(--border-color);
          padding: 2rem 2.5rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
        }

        .timeline-item:hover {
          border-color: rgba(227, 43, 60, 0.5);
          background: rgba(26, 26, 26, 0.85);
          transform: translateY(-2px);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(227, 43, 60, 0.15);
        }

        .timeline-item.active {
          border-color: var(--accent);
          background: rgba(26, 26, 26, 0.95);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(227, 43, 60, 0.2);
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .timeline-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          letter-spacing: 0.04em;
          color: var(--text-primary);
          margin-top: 0.25rem;
        }

        .timeline-summary {
          color: var(--text-muted);
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .timeline-toggle-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #111;
          border: 1px solid var(--border-color);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .timeline-details {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px dashed var(--border-color);
        }

        .timeline-detail-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .timeline-detail-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: #bbb;
          font-size: 0.88rem;
          line-height: 1.6;
        }

        .bullet {
          color: var(--accent);
          font-weight: bold;
          font-family: var(--font-mono);
        }

        @media (max-width: 640px) {
          .timeline-item {
            padding: 1.5rem;
          }
          .timeline-title {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </section>
  )
}
