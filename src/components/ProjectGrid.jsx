import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ExternalLink, Github, FolderLock, Terminal, ArrowUpRight, Filter, Info } from 'lucide-react'
import { categories, projects } from '../data/projects'
import { siteConfig } from '../config/site'

export default function ProjectGrid({ onSelectProject, motionEnabled }) {
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = activeCategory === "ALL" || p.category === activeCategory
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <section id="work" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <div className="section-label">05 / SELECTED PORTFOLIO</div>
            <h2 className="section-title">ENGINEERED WORK & RESEARCH.</h2>
          </div>

          <a
            href={siteConfig.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.65rem 1.25rem' }}
          >
            <Github size={15} />
            <span>EXPLORE GITHUB ARCHIVES</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Filter & Search Bar */}
        <div className="filter-bar">
          {/* Categories */}
          <div className="categories-wrapper">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="search-box">
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search research, tools or stacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search projects"
            />
          </div>
        </div>

        {/* Projects Display / Empty State */}
        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project, pIdx) => (
              <motion.div
                key={project.id}
                layout
                initial={motionEnabled ? { opacity: 0, y: 35 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (pIdx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="project-card"
                onClick={() => onSelectProject(project)}
              >
                <div className="project-cover-container">
                  <img
                    src={project.coverImage || "/assets/placeholder-cover.webp"}
                    alt={project.title}
                    className="project-cover"
                    loading="lazy"
                  />
                  <div className="project-badge">{project.category}</div>
                </div>

                <div className="project-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="font-mono text-accent" style={{ fontSize: '0.75rem' }}>{project.year}</span>
                    <span className="font-mono text-muted" style={{ fontSize: '0.72rem' }}>{project.role}</span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>

                  <div className="project-tools">
                    {project.tools.map((t) => (
                      <span key={t} className="tool-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Honest Empty State per Master Spec Page 7 */
          <div className="empty-state-box">
            <div className="empty-state-icon">
              <FolderLock size={32} color="var(--accent)" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              AUTHENTIC DISCLOSURES ONLY
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '640px', lineHeight: 1.7, margin: '0 auto 2rem auto', fontSize: '0.95rem' }}>
              In accordance with verified security disclosure ethics and non-attribution guidelines, proprietary engagements and active red team engagements remain classified.
              All public proof-of-concepts, utilities, and development repositories are published directly via GitHub.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={siteConfig.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '0.85rem' }}
              >
                <Github size={16} />
                <span>INSPECT REPOSITORIES ({siteConfig.contact.github.replace('https://github.com/', '@')})</span>
                <ArrowUpRight size={14} />
              </a>
              <a
                href="#contact"
                className="btn btn-outline"
                style={{ fontSize: '0.85rem' }}
              >
                <span>REQUEST RESEARCH BRIEFING</span>
              </a>
            </div>

            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border-color)', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: '#666', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
              <Info size={14} />
              <span>To add public case studies, configure authentic entries in src/data/projects.js</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 3rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .categories-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .category-btn {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          padding: 0.55rem 1.15rem;
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          border-radius: 99px;
          cursor: pointer;
          transition: all 0.25s var(--ease-cinematic);
        }

        .category-btn:hover {
          border-color: var(--accent);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        .category-btn.active {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(227, 43, 60, 0.4);
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-color);
          padding: 0.55rem 1.25rem;
          border-radius: 99px;
          min-width: 260px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .search-box input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.85rem;
          width: 100%;
        }

        .search-box input::placeholder {
          color: #555;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(14px);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .project-card:hover {
          border-color: rgba(227, 43, 60, 0.6);
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(227, 43, 60, 0.2);
        }

        .project-cover-container {
          position: relative;
          width: 100%;
          height: 220px;
          background: #0d0d0d;
          overflow: hidden;
        }

        .project-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card:hover .project-cover {
          transform: scale(1.05);
        }

        .project-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          background: rgba(9, 9, 9, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 0.25rem 0.6rem;
          color: var(--accent);
        }

        .project-content {
          padding: 1.75rem;
        }

        .project-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          letter-spacing: 0.04em;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .project-summary {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .project-tools {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .tool-tag {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          background: rgba(25, 25, 25, 0.85);
          border: 1px solid var(--border-color);
          color: #aaa;
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
        }

        .empty-state-box {
          text-align: center;
          padding: 5rem 2rem;
          background: rgba(20, 20, 20, 0.7);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .empty-state-icon {
          width: 70px;
          height: 70px;
          background: rgba(227, 43, 60, 0.08);
          border: 1px solid rgba(227, 43, 60, 0.25);
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 0 20px rgba(227, 43, 60, 0.15);
        }

        @media (max-width: 768px) {
          .filter-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .search-box {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
