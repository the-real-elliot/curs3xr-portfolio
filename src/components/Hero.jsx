import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Shield, Code, ChevronRight, Terminal, Globe, Lock } from 'lucide-react'
import { siteConfig } from '../config/site'

export default function Hero({ motionEnabled }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '100px',
        paddingBottom: '4rem',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-color)',
        background: 'radial-gradient(circle at 75% 40%, rgba(227, 43, 60, 0.08) 0%, transparent 60%), #090909'
      }}
    >
      {/* Background Architectural Watermark / Sigil */}
      <div
        style={{
          position: 'absolute',
          right: '-5%',
          top: '15%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          border: '1px dashed rgba(227, 43, 60, 0.1)',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0
        }}
      >
        <div style={{
          width: '450px',
          height: '450px',
          border: '1px solid rgba(255,255,255,0.03)',
          transform: 'rotate(45deg)'
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="hero-grid">
          {/* Left Column: Editorial Headline & Meta */}
          <motion.div
            variants={motionEnabled ? containerVariants : {}}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            {/* Meta Tags / Availability */}
            <motion.div variants={motionEnabled ? itemVariants : {}} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem', alignItems: 'center' }}>
              <div className="badge active">
                <span className="pulse-dot" />
                <span>{siteConfig.identity.availability}</span>
              </div>
              <div className="badge">
                <Globe size={11} />
                <span>{siteConfig.identity.location}</span>
              </div>
              <div className="badge" style={{ color: 'var(--accent)' }}>
                <Lock size={11} />
                <span>OPSEC VALIDATED</span>
              </div>
            </motion.div>

            {/* Sub-discipline header */}
            <motion.div variants={motionEnabled ? itemVariants : {}} className="section-label">
              {siteConfig.identity.roleLine2}
            </motion.div>

            {/* Triple Impact Headline */}
            <motion.h1
              variants={motionEnabled ? itemVariants : {}}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.8rem, 8.5vw, 7.8rem)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: '1.75rem'
              }}
            >
              <div>I BUILD.</div>
              <div style={{ color: 'var(--accent)' }}>I BREAK.</div>
              <div>I UNDERSTAND.</div>
            </motion.h1>

            {/* Supporting Intro */}
            <motion.p
              variants={motionEnabled ? itemVariants : {}}
              style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                color: 'var(--text-muted)',
                maxWidth: '560px',
                lineHeight: 1.65,
                marginBottom: '2.5rem'
              }}
            >
              {siteConfig.identity.intro}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={motionEnabled ? itemVariants : {}} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a href="#work" className="btn btn-primary">
                <span>VIEW MY WORK</span>
                <ChevronRight size={16} />
              </a>
              <a href="#contact" className="btn btn-outline">
                <span>CONTACT ME</span>
              </a>
              <a href="#terminal" className="badge" style={{ padding: '0.75rem 1rem', cursor: 'pointer', background: '#111', borderColor: '#333' }}>
                <Terminal size={13} style={{ color: 'var(--accent)' }} />
                <span>SPAWN TERMINAL</span>
              </a>
            </motion.div>

            {/* Disciplines Bar */}
            <motion.div
              variants={motionEnabled ? itemVariants : {}}
              style={{
                marginTop: '3.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--border-color)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1.5rem'
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', marginBottom: '0.3rem' }}>01 / OFFENSIVE</div>
                <div style={{ fontWeight: '600', fontSize: '0.92rem' }}>Exploit & Red Teaming</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', marginBottom: '0.3rem' }}>02 / OSINT</div>
                <div style={{ fontWeight: '600', fontSize: '0.92rem' }}>Recon & Threat Intel</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', marginBottom: '0.3rem' }}>03 / CRAFTSMANSHIP</div>
                <div style={{ fontWeight: '600', fontSize: '0.92rem' }}>Modern Web Systems</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Editorial Portrait with Gothic Overlap */}
          <div className="hero-portrait-wrapper">
            {/* Dark background typography that portrait overlaps */}
            <div className="hero-bg-text">
              CURS3XR
            </div>

            {/* Cinematic Red Rim & Glow */}
            <div className="portrait-glow" />

            {/* The Actual User Supplied Portrait PNG */}
            <motion.img
              src="/assets/portrait.png"
              alt="CURS3XR — Independent Security Researcher & Web Developer"
              className="hero-portrait-img"
              initial={motionEnabled ? { opacity: 0, scale: 0.96, y: 20 } : false}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              loading="eager"
            />

            {/* Floating Sigil Badge */}
            <div className="hero-sigil-badge">
              <span className="font-hand" style={{ fontSize: '1.25rem', color: 'var(--accent)' }}>
                "Curiosity is the original sin."
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <a
            href="#work"
            aria-label="Scroll down to selected work"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-muted)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em'
            }}
          >
            <span>DISCOVER</span>
            <ArrowDown size={14} className="scroll-arrow" />
          </a>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3rem;
          align-items: center;
        }

        .hero-portrait-wrapper {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 100%;
          min-height: 520px;
        }

        .hero-bg-text {
          position: absolute;
          top: 10%;
          right: -5%;
          font-family: var(--font-display);
          font-size: clamp(5rem, 12vw, 11rem);
          color: rgba(255, 255, 255, 0.035);
          letter-spacing: 0.06em;
          user-select: none;
          pointer-events: none;
          z-index: 1;
          line-height: 0.85;
          text-align: right;
        }

        .portrait-glow {
          position: absolute;
          width: 80%;
          height: 80%;
          top: 10%;
          left: 10%;
          background: radial-gradient(circle, rgba(227, 43, 60, 0.15) 0%, transparent 70%);
          filter: blur(50px);
          pointer-events: none;
          z-index: 1;
        }

        .hero-portrait-img {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 480px;
          max-height: 680px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 25px rgba(227, 43, 60, 0.2));
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-portrait-img:hover {
          transform: scale(1.02);
        }

        .hero-sigil-badge {
          position: absolute;
          bottom: 20px;
          right: 0px;
          z-index: 3;
          background: rgba(17, 17, 17, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-color);
          border-left: 3px solid var(--accent);
          padding: 0.75rem 1.25rem;
          border-radius: 2px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        }

        @keyframes floatArrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }

        .scroll-arrow {
          animation: floatArrow 2s infinite ease-in-out;
        }

        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: left;
            gap: 3.5rem;
          }
          .hero-portrait-wrapper {
            order: -1;
            min-height: 420px;
          }
          .hero-portrait-img {
            max-width: 380px;
          }
          .hero-bg-text {
            font-size: 7rem;
            top: 0;
            right: 0;
          }
        }

        @media (max-width: 480px) {
          .hero-portrait-img {
            max-width: 300px;
          }
          .hero-sigil-badge {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
