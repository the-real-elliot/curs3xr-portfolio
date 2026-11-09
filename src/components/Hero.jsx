import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, MapPin, Sparkles } from 'lucide-react'
import { siteConfig } from '../config/site'

export default function Hero({ motionEnabled }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1, x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-section"
    >
      {/* ═══════════════════════════════════════════════════════
          LAYER 0 — Background radial glow
      ═══════════════════════════════════════════════════════ */}
      <div className="hero-bg-glow" />

      {/* ═══════════════════════════════════════════════════════
          LAYER 1 — Giant "PORTFOLIO" background text
          Sits behind the portrait, dark crimson, massive
      ═══════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-bg-text-container"
        style={motionEnabled ? { y: bgTextY } : {}}
      >
        <div className="hero-bg-text" aria-hidden="true">
          PORTFOLIO
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 2 — Center Portrait (landscape, overlapping text)
          Red cinematic glow from behind, transparent PNG
      ═══════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-portrait-container"
        style={motionEnabled ? { y: portraitY, opacity } : {}}
      >
        {/* Red cinematic backlight */}
        <div className="portrait-backlight" />
        <div className="portrait-backlight-2" />

        <motion.img
          src="/assets/portrait.png"
          alt={`${siteConfig.identity.displayName} — ${siteConfig.identity.profession}`}
          className="hero-portrait"
          initial={motionEnabled ? { opacity: 0, scale: 1.05, y: 30 } : false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          loading="eager"
          width="768"
          height="1024"
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 3 — Content overlay (left text + right stats)
      ═══════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-content-overlay"
        style={motionEnabled ? { y: textY } : {}}
      >
        <div className="container hero-content-grid">
          {/* ─── LEFT COLUMN ─── */}
          <motion.div
            className="hero-left"
            variants={motionEnabled ? containerVariants : {}}
            initial="hidden"
            animate="visible"
          >
            {/* Profession / Role Tags */}
            <motion.div variants={motionEnabled ? fadeUp : {}} className="hero-role-tags">
              <span className="hero-role-primary">OFFENSIVE SECURITY & WEB DEV</span>
              <span className="hero-role-secondary">INDEPENDENT RESEARCHER</span>
            </motion.div>

            {/* Availability Badge (top-right floated on desktop) */}
            <motion.div variants={motionEnabled ? fadeUp : {}} className="hero-availability-desktop">
              <span className="pulse-dot" />
              <span>AVAILABLE FOR NEW PROJECTS</span>
            </motion.div>

            {/* Handwritten "Hello, I'm" accent */}
            <motion.div variants={motionEnabled ? fadeUp : {}} className="hero-hello">
              <span className="font-hand">Hello, I'm</span>
            </motion.div>

            {/* Giant Name */}
            <motion.h1 variants={motionEnabled ? fadeUp : {}} className="hero-name">
              {siteConfig.identity.displayName}<span className="hero-name-dot">.</span>
            </motion.h1>

            {/* Profession Subline */}
            <motion.div variants={motionEnabled ? fadeUp : {}} className="hero-profession">
              <span>SECURITY RESEARCHER &</span>
              <br />
              <span>WEB ENGINEER</span>
            </motion.div>

            {/* Intro Paragraph */}
            <motion.p variants={motionEnabled ? fadeUp : {}} className="hero-intro">
              Breaking systems. Building experiences.
              <br />
              I turn curiosity into offensive research and
              <br className="hide-mobile" />
              ideas into fast, secure websites people trust,
              <br className="hide-mobile" />
              from first recon to final deployment.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={motionEnabled ? fadeUp : {}}>
              <a href="#work" className="hero-cta-btn">
                <span>See my work</span>
                <ArrowDown size={16} />
              </a>
            </motion.div>

            {/* Location */}
            <motion.div variants={motionEnabled ? fadeUp : {}} className="hero-location">
              <MapPin size={13} />
              <span>{siteConfig.identity.location.toUpperCase()}</span>
            </motion.div>
          </motion.div>

          {/* ─── RIGHT COLUMN ─── */}
          <motion.div
            className="hero-right"
            variants={motionEnabled ? containerVariants : {}}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline Badge */}
            <motion.div variants={motionEnabled ? fadeRight : {}} className="hero-tagline-badge">
              <Sparkles size={14} className="text-accent" />
              <div>
                <div className="hero-tagline-text">Every line of code.</div>
                <div className="hero-tagline-text hero-tagline-bold">A purpose.</div>
              </div>
            </motion.div>

            {/* Stats are removed per spec - no fabricated metrics */}
            {/* If you have real verified stats, uncomment below and fill in */}
            {/*
            <motion.div variants={motionEnabled ? fadeRight : {}} className="hero-stat">
              <span className="hero-stat-number">3<span className="hero-stat-dot">.</span></span>
              <div className="hero-stat-label">
                <span>YEARS BUILDING</span>
                <span>FOR THE WEB</span>
              </div>
            </motion.div>
            */}
          </motion.div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 4 — Bottom gradient fade
      ═══════════════════════════════════════════════════════ */}
      <div className="hero-bottom-fade" />

      <style>{`
        /* ============================================
           HERO SECTION — TOUQUIR-STYLE LAYOUT
           Portrait centered, giant bg text, cinematic
        ============================================ */
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        /* ── Background Glow ── */
        .hero-bg-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(ellipse 80% 70% at 50% 55%, rgba(227, 43, 60, 0.07) 0%, transparent 70%),
            radial-gradient(ellipse 50% 80% at 55% 50%, rgba(227, 43, 60, 0.04) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        /* ── Giant Background "PORTFOLIO" Text ── */
        .hero-bg-text-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          pointer-events: none;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .hero-bg-text {
          font-family: var(--font-display);
          font-size: clamp(8rem, 18vw, 22rem);
          font-weight: 400;
          letter-spacing: 0.03em;
          line-height: 0.85;
          text-transform: uppercase;
          color: rgba(227, 43, 60, 0.12);
          user-select: none;
          white-space: nowrap;
          text-align: center;
        }

        /* ── Portrait Container (Centered, Landscape Oriented) ── */
        .hero-portrait-container {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          width: 100%;
          max-width: 680px;
          height: 85%;
          pointer-events: none;
        }

        /* Red cinematic backlight glow */
        .portrait-backlight {
          position: absolute;
          bottom: 5%;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(227, 43, 60, 0.35) 0%, rgba(227, 43, 60, 0.08) 40%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 1;
        }

        .portrait-backlight-2 {
          position: absolute;
          bottom: 15%;
          left: 45%;
          transform: translateX(-50%);
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(227, 43, 60, 0.25) 0%, transparent 60%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 1;
        }

        .hero-portrait {
          position: relative;
          z-index: 2;
          width: auto;
          height: 92%;
          max-height: 820px;
          object-fit: contain;
          object-position: bottom center;
          filter:
            drop-shadow(0 20px 60px rgba(0, 0, 0, 0.8))
            drop-shadow(0 0 80px rgba(227, 43, 60, 0.15))
            drop-shadow(-15px 0 40px rgba(227, 43, 60, 0.12));
        }

        /* ── Content Overlay Grid ── */
        .hero-content-overlay {
          position: relative;
          z-index: 10;
          width: 100%;
          display: flex;
          align-items: center;
          min-height: 100vh;
          padding-top: 100px;
          padding-bottom: 60px;
        }

        .hero-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: center;
        }

        /* ── Left Column ── */
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          z-index: 10;
        }

        .hero-role-tags {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          margin-bottom: 2rem;
        }

        .hero-role-primary {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: var(--accent);
        }

        .hero-role-secondary {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .hero-availability-desktop {
          display: none;
          position: absolute;
          top: 0;
          right: -380px;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .hero-hello {
          margin-bottom: 0.25rem;
        }

        .hero-hello .font-hand {
          font-size: clamp(2rem, 3.5vw, 3.2rem);
          color: var(--accent);
          display: inline-block;
          transform: rotate(-3deg);
        }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(4.5rem, 9vw, 8.5rem);
          line-height: 0.88;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }

        .hero-name-dot {
          color: var(--accent);
        }

        .hero-profession {
          font-family: var(--font-display);
          font-size: clamp(1rem, 1.6vw, 1.35rem);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          line-height: 1.35;
          margin-bottom: 1.5rem;
        }

        .hero-intro {
          font-size: clamp(0.92rem, 1.15vw, 1.05rem);
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 380px;
          margin-bottom: 2rem;
        }

        .hero-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 2rem;
          font-family: var(--font-body);
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-primary);
          background: transparent;
          border: 1.5px solid var(--text-primary);
          border-radius: 0;
          cursor: pointer;
          transition: all 0.3s var(--ease-cinematic);
          text-decoration: none;
          margin-bottom: 2rem;
        }

        .hero-cta-btn:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(227, 43, 60, 0.35);
        }

        .hero-location {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        /* ── Right Column ── */
        .hero-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2.5rem;
          position: relative;
          z-index: 10;
        }

        .hero-tagline-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(17, 17, 17, 0.75);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-color);
          border-radius: 99px;
          padding: 0.75rem 1.5rem;
        }

        .hero-tagline-text {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.3;
        }

        .hero-tagline-bold {
          font-weight: 700;
          color: var(--text-primary);
        }

        .hero-stat {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }

        .hero-stat-number {
          font-family: var(--font-display);
          font-size: clamp(3rem, 5vw, 4.5rem);
          color: var(--accent);
          line-height: 1;
        }

        .hero-stat-dot {
          color: var(--accent);
        }

        .hero-stat-label {
          display: flex;
          flex-direction: column;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          text-transform: uppercase;
          line-height: 1.4;
        }

        /* ── Bottom fade ── */
        .hero-bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 120px;
          background: linear-gradient(to top, var(--bg-primary) 0%, transparent 100%);
          z-index: 8;
          pointer-events: none;
        }

        /* ── Responsive ── */
        @media (min-width: 1200px) {
          .hero-availability-desktop {
            display: flex;
          }
        }

        @media (max-width: 960px) {
          .hero-content-grid {
            grid-template-columns: 1fr;
            text-align: left;
          }

          .hero-portrait-container {
            max-width: 450px;
            height: 70%;
            opacity: 0.45;
          }

          .hero-right {
            align-items: flex-start;
            gap: 1.5rem;
          }

          .hero-bg-text {
            font-size: clamp(5rem, 20vw, 12rem);
          }
        }

        @media (max-width: 600px) {
          .hero-portrait-container {
            max-width: 340px;
            height: 60%;
            opacity: 0.35;
          }

          .hero-name {
            font-size: clamp(3.5rem, 14vw, 5.5rem);
          }

          .hero-bg-text {
            font-size: clamp(4rem, 22vw, 8rem);
          }

          .hero-intro {
            max-width: 280px;
          }

          .portrait-backlight,
          .portrait-backlight-2 {
            width: 250px;
            height: 250px;
          }
        }

        .hide-mobile {
          display: inline;
        }

        @media (max-width: 768px) {
          .hide-mobile {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
