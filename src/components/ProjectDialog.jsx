import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Calendar, Tag, CheckCircle2 } from 'lucide-react'

export default function ProjectDialog({ project, onClose, motionEnabled }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <div className="dialog-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <motion.div
          initial={motionEnabled ? { opacity: 0, scale: 0.95, y: 20 } : false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="dialog-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button className="dialog-close" onClick={onClose} aria-label="Close project dialog">
            <X size={20} />
          </button>

          {/* Cover image if available */}
          {project.coverImage && (
            <div className="dialog-cover-wrapper">
              <img src={project.coverImage} alt={project.title} className="dialog-cover" />
              <div className="dialog-badge">{project.category}</div>
            </div>
          )}

          <div className="dialog-body">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="font-mono text-accent" style={{ fontSize: '0.8rem' }}>{project.year}</span>
              <span className="badge">{project.role}</span>
            </div>

            <h2 id="dialog-title" className="dialog-title">
              {project.title}
            </h2>

            <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem', fontWeight: 500 }}>
              {project.summary}
            </p>

            <div style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '2rem' }}>
              {project.description}
            </div>

            {/* Tools list */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                TECHNOLOGY & TOOLING STACK
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.tools.map((t) => (
                  <span key={t} className="badge" style={{ background: '#1c1c1c' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links / Actions */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.82rem' }}>
                  <span>VIEW LIVE SYSTEM</span>
                  <ExternalLink size={14} />
                </a>
              )}
              {project.sourceUrl && (
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.82rem' }}>
                  <Github size={15} />
                  <span>VIEW SOURCE REPOSITORY</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          padding: 1.5rem;
        }

        .dialog-content {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          max-width: 680px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          border-radius: 2px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.8);
        }

        .dialog-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(0,0,0,0.6);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          transition: all 0.2s;
        }

        .dialog-close:hover {
          background: var(--accent);
          color: #fff;
          border-color: var(--accent);
        }

        .dialog-cover-wrapper {
          position: relative;
          width: 100%;
          height: 280px;
          background: #0d0d0d;
        }

        .dialog-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .dialog-badge {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: rgba(9, 9, 9, 0.85);
          backdrop-filter: blur(8px);
          padding: 0.3rem 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent);
          border: 1px solid var(--border-color);
        }

        .dialog-body {
          padding: 2.5rem;
        }

        .dialog-title {
          font-family: var(--font-display);
          font-size: 2.2rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        @media (max-width: 640px) {
          .dialog-body {
            padding: 1.5rem;
          }
          .dialog-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </AnimatePresence>
  )
}
