import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowDown, MapPin, Sparkles } from 'lucide-react'
import { siteConfig } from '../config/site'

export default function Hero({ motionEnabled }) {
  const sectionRef = useRef(null)

  // Scroll parallax transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })

  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const textScrollY = useTransform(scrollYProgress, [0, 1], [0, -35])
  const bgTextScrollY = useTransform(scrollYProgress, [0, 1], [0, 45])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Mouse interactive 3D parallax tilt (spring-damped physics)
  const springConfig = { damping: 25, stiffness: 120 }
  const tiltX = useSpring(0, springConfig)
  const tiltY = useSpring(0, springConfig)
  const glowShiftX = useSpring(0, springConfig)
  const glowShiftY = useSpring(0, springConfig)

  useEffect(() => {
    if (!motionEnabled) return

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 2 // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2 // -1 to 1
      tiltX.set(y * -5) // smooth rotateX
      tiltY.set(x * 6)  // smooth rotateY
      glowShiftX.set(x * -20)
      glowShiftY.set(y * -12)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [motionEnabled, tiltX, tiltY, glowShiftX, glowShiftY])

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  }

  const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <section ref={sectionRef} id="home" className="hero-root">

      {/* ── Background Subtle Cyber Grid & Ambient Radial Glow ── */}
      <div className="hero-radial" />
      <div className="hero-grid-pattern" />

      {/* ══════════════════════════════════════════════════════════
          LAYER 1: GIANT "PORTFOLIO" BACKGROUND TEXT
          Full-width, rich dark crimson, perfectly centered
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-bg-word-wrap"
        style={motionEnabled ? { y: bgTextScrollY } : {}}
        aria-hidden="true"
      >
        <span className="hero-bg-word">PORTFOLIO</span>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 2: CENTER PORTRAIT STAGE (LANDSCAPE MIDDLE)
          Uses 100% width + flexbox centering to avoid transform collisions.
          Mathematically dead-center on desktop, prominently visible on phone.
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-portrait-stage"
        style={motionEnabled ? {
          y: portraitScrollY,
          opacity: heroOpacity
        } : {}}
      >
        {/* Volumetric Red Rim Backlight behind portrait */}
        <div className="hero-volumetric-wrap">
          <motion.div
            className="hero-volumetric-glow"
            style={motionEnabled ? { x: glowShiftX, y: glowShiftY } : {}}
          />
          <div className="hero-volumetric-core" />
        </div>

        {/* 3D Tilted Portrait Frame */}
        <motion.div
          className="hero-portrait-frame"
          style={motionEnabled ? {
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: 'preserve-3d'
          } : {}}
        >
          <motion.img
            src="/assets/portrait.png"
            alt={`${siteConfig.identity.displayName} portrait`}
            className="hero-portrait-img"
            initial={motionEnabled ? { opacity: 0, scale: 1.05 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            loading="eager"
            width="900"
            height="1024"
          />
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 3: CONTENT OVERLAY (WIDE FULL-BLEED LANDSCAPE)
          Left: Identity & CTA | Right: Badge & 3 Authentic Stats
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-overlay"
        style={motionEnabled ? { y: textScrollY } : {}}
      >
        <div className="hero-wide-container">

          {/* ──── LEFT COLUMN: Identity & Call-to-action ──── */}
          <motion.div
            className="hero-left-col"
            variants={motionEnabled ? stagger : {}}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={motionEnabled ? fadeUp : {}} className="hero-role-tags">
              <span className="hero-tag-accent">OFFENSIVE SECURITY & WEB DEV</span>
              <span className="hero-tag-muted">INDEPENDENT RESEARCHER</span>
            </motion.div>

            <motion.span variants={motionEnabled ? fadeUp : {}} className="hero-cursive font-hand">
              Hello, I'm
            </motion.span>

            <motion.h1 variants={motionEnabled ? fadeUp : {}} className="hero-title">
              {siteConfig.identity.displayName}<span className="hero-dot">.</span>
            </motion.h1>

            <motion.div variants={motionEnabled ? fadeUp : {}} className="hero-subtitle">
              SECURITY RESEARCHER &<br />WEB ENGINEER
            </motion.div>

            <motion.p variants={motionEnabled ? fadeUp : {}} className="hero-description">
              Breaking systems. Building experiences.
              I turn curiosity into offensive research and
              ideas into fast, secure websites people trust,
              from first recon to final deployment.
            </motion.p>

            <motion.div variants={motionEnabled ? fadeUp : {}} className="hero-cta-wrap">
              <a href="#work" className="hero-cta-btn">
                <span>See my work</span>
                <ArrowDown size={16} />
              </a>
            </motion.div>

            <motion.div variants={motionEnabled ? fadeUp : {}} className="hero-location">
              <MapPin size={13} className="text-accent" />
              <span>{siteConfig.identity.location.toUpperCase()}</span>
            </motion.div>
          </motion.div>

          {/* ──── RIGHT COLUMN: Badge & 3 Big Stats ──── */}
          <motion.div
            className="hero-right-col"
            variants={motionEnabled ? stagger : {}}
            initial="hidden"
            animate="visible"
          >
            {/* Top availability pill */}
            <motion.div variants={motionEnabled ? fadeRight : {}} className="hero-avail-badge">
              <span className="pulse-dot" />
              <span>AVAILABLE FOR NEW PROJECTS</span>
            </motion.div>

            {/* Quote badge */}
            <motion.div variants={motionEnabled ? fadeRight : {}} className="hero-quote-pill">
              <Sparkles size={14} className="text-accent flex-shrink-0" />
              <div>
                <div className="hero-quote-t1">Every line of code.</div>
                <div className="hero-quote-t2">A purpose.</div>
              </div>
            </motion.div>

            {/* 3 Authentic High-Impact Stats with Dividers (matching Touquir layout) */}
            <motion.div variants={motionEnabled ? fadeRight : {}} className="hero-stats-group">
              
              {/* Stat 1 */}
              <div className="hero-stat-row">
                <div className="hero-stat-num">
                  3<span className="hero-stat-plus">+</span>
                </div>
                <div className="hero-stat-meta">
                  <span className="hero-stat-head">YEARS ACTIVE</span>
                  <span className="hero-stat-sub">OFFENSIVE RESEARCH</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="hero-stat-row">
                <div className="hero-stat-num">
                  100<span className="hero-stat-plus">%</span>
                </div>
                <div className="hero-stat-meta">
                  <span className="hero-stat-head">ETHICAL DISCLOSURE</span>
                  <span className="hero-stat-sub">SECURITY PRINCIPLES</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="hero-stat-row">
                <div className="hero-stat-num">
                  24<span className="hero-stat-plus">/7</span>
                </div>
                <div className="hero-stat-meta">
                  <span className="hero-stat-head">ENGINEERING MINDSET</span>
                  <span className="hero-stat-sub">FULL-STACK & AUDIT</span>
                </div>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* Seamless bottom fade into next section */}
      <div className="hero-bottom-fade" />

      {/* ══════════════════════════════════════════════════════════
          HERO STYLES (LANDSCAPE WIDE, PRECISION ALIGNMENT)
      ══════════════════════════════════════════════════════════ */}
      <style>{`
        .hero-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #090909;
          border-bottom: 1px solid var(--border-color);
        }

        /* Ambient radial glow */
        .hero-radial {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(227, 43, 60, 0.08) 0%, transparent 70%);
        }

        /* Subtle cyber grid pattern */
        .hero-grid-pattern {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background-size: 50px 50px;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
          mask-image: radial-gradient(circle at 50% 50%, black 40%, transparent 80%);
        }

        /* ══════════════════════════════════════════
           GIANT "PORTFOLIO" BACKGROUND TEXT
           Centered with 100% width to prevent transform collisions
        ══════════════════════════════════════════ */
        .hero-bg-word-wrap {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          width: 100%;
          margin-top: -0.5em;
          z-index: 2;
          pointer-events: none;
          text-align: center;
          overflow: hidden;
        }

        .hero-bg-word {
          font-family: var(--font-display);
          font-size: clamp(8rem, 20vw, 24rem);
          line-height: 0.82;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(215, 30, 48, 0.42);
          text-shadow: 0 0 60px rgba(227, 43, 60, 0.25);
          user-select: none;
          white-space: nowrap;
          display: block;
        }

        /* ══════════════════════════════════════════
           CENTER PORTRAIT STAGE (LANDSCAPE MIDDLE)
           100% width with flexbox centering:
           IMMUNE to Framer Motion transform overrides!
        ══════════════════════════════════════════ */
        .hero-portrait-stage {
          position: absolute;
          z-index: 4;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 88%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          pointer-events: none;
        }

        /* Volumetric glowing aura behind the portrait */
        .hero-volumetric-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 0;
        }

        .hero-volumetric-glow {
          position: absolute;
          bottom: 10%;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(227, 43, 60, 0.42) 0%, rgba(227, 43, 60, 0.12) 45%, transparent 70%);
          filter: blur(65px);
        }

        .hero-volumetric-core {
          position: absolute;
          bottom: 20%;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 60, 80, 0.25) 0%, transparent 60%);
          filter: blur(40px);
        }

        .hero-portrait-frame {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 100%;
        }

        .hero-portrait-img {
          position: relative;
          z-index: 1;
          height: 100%;
          width: auto;
          max-height: 85vh;
          object-fit: contain;
          object-position: bottom center;
          filter:
            drop-shadow(0 20px 50px rgba(0, 0, 0, 0.9))
            drop-shadow(0 0 65px rgba(227, 43, 60, 0.28))
            drop-shadow(-10px 0 35px rgba(227, 43, 60, 0.16));
        }

        /* ══════════════════════════════════════════
           CONTENT OVERLAY (WIDE FULL-BLEED LANDSCAPE)
        ══════════════════════════════════════════ */
        .hero-overlay {
          position: relative;
          z-index: 10;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 90px;
          padding-bottom: 60px;
        }

        /* Wide layout container spanning full landscape */
        .hero-wide-container {
          width: 100%;
          max-width: 1720px;
          margin: 0 auto;
          padding: 0 clamp(2rem, 5vw, 5.5rem);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 3rem;
        }

        /* ──── LEFT COLUMN ──── */
        .hero-left-col {
          display: flex;
          flex-direction: column;
          max-width: 440px;
          flex-shrink: 0;
          z-index: 11;
        }

        .hero-role-tags {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          margin-bottom: 2rem;
        }

        .hero-tag-accent {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: var(--accent);
        }

        .hero-tag-muted {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .hero-cursive {
          font-size: clamp(2rem, 3.5vw, 3.2rem);
          color: var(--accent);
          display: inline-block;
          transform: rotate(-3deg);
          transform-origin: left bottom;
          margin-bottom: 0.15rem;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(4.2rem, 8vw, 7.5rem);
          line-height: 0.88;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .hero-dot {
          color: var(--accent);
        }

        .hero-subtitle {
          font-family: var(--font-display);
          font-size: clamp(1rem, 1.4vw, 1.3rem);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          line-height: 1.35;
          margin-bottom: 1.5rem;
        }

        .hero-description {
          font-size: clamp(0.88rem, 1.05vw, 1rem);
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 380px;
        }

        .hero-cta-wrap {
          margin-bottom: 2rem;
        }

        .hero-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 2.2rem;
          font-family: var(--font-body);
          font-size: 0.92rem;
          font-weight: 600;
          color: #fff;
          background: var(--accent);
          border: 1.5px solid var(--accent);
          cursor: pointer;
          transition: all 0.3s var(--ease-cinematic);
          text-decoration: none;
        }

        .hero-cta-btn:hover {
          background: #ff3347;
          border-color: #ff3347;
          transform: translateY(-2px);
          box-shadow: 0 10px 35px rgba(227, 43, 60, 0.45);
        }

        .hero-location {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        /* ──── RIGHT COLUMN ──── */
        .hero-right-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2.2rem;
          flex-shrink: 0;
          max-width: 380px;
          z-index: 11;
        }

        .hero-avail-badge {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .hero-quote-pill {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(18, 18, 18, 0.85);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 99px;
          padding: 0.8rem 1.6rem;
        }

        .hero-quote-t1 {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.3;
        }

        .hero-quote-t2 {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* 3 Big Stats with dividers */
        .hero-stats-group {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 320px;
        }

        .hero-stat-row {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          padding: 1.1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .hero-stat-row:first-child {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .hero-stat-num {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 4.2vw, 3.8rem);
          line-height: 0.9;
          color: var(--accent);
          letter-spacing: 0.02em;
          flex-shrink: 0;
          min-width: 95px;
          text-align: right;
        }

        .hero-stat-plus {
          color: var(--accent);
          font-size: 0.8em;
        }

        .hero-stat-meta {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1.35;
        }

        .hero-stat-head {
          color: var(--text-primary);
          font-weight: 600;
        }

        .hero-stat-sub {
          color: var(--text-muted);
        }

        /* Bottom fade */
        .hero-bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 110px;
          background: linear-gradient(to top, #090909 0%, rgba(9,9,9,0.7) 40%, transparent 100%);
          z-index: 9;
          pointer-events: none;
        }

        /* ══════════════════════════════════════════
           RESPONSIVE DESIGN (DESKTOP -> TABLET -> PHONE)
        ══════════════════════════════════════════ */

        /* Laptop / Medium Desktop (<= 1200px) */
        @media (max-width: 1200px) {
          .hero-portrait-stage {
            height: 82%;
          }

          .hero-portrait-img {
            opacity: 0.85;
          }

          .hero-stats-group {
            max-width: 280px;
          }

          .hero-stat-num {
            font-size: 2.8rem;
            min-width: 80px;
          }
        }

        /* Tablet (<= 992px) */
        @media (max-width: 992px) {
          .hero-wide-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 2.5rem;
            padding-top: 2rem;
          }

          .hero-right-col {
            align-items: flex-start;
            width: 100%;
          }

          .hero-stats-group {
            max-width: 100%;
            flex-direction: row;
            justify-content: space-between;
            gap: 1.5rem;
          }

          .hero-stat-row {
            border-top: none;
            border-bottom: none;
            padding: 0;
          }

          .hero-portrait-stage {
            height: 75vh;
            z-index: 3;
          }

          .hero-portrait-img {
            opacity: 0.85;
          }

          .hero-bg-word {
            font-size: clamp(5rem, 18vw, 12rem);
            color: rgba(215, 30, 48, 0.35);
          }
        }

        /* Mobile Phone (<= 640px) */
        /* PROMINENT, VIVID, CLEARLY VISIBLE PORTRAIT ON PHONE */
        @media (max-width: 640px) {
          .hero-root {
            min-height: 100svh;
            padding-top: 80px;
          }

          .hero-overlay {
            padding-top: 40px;
            padding-bottom: 40px;
          }

          .hero-wide-container {
            padding: 0 1.5rem;
            gap: 2rem;
          }

          /* The portrait is prominent, centered, and fully visible on phone */
          .hero-portrait-stage {
            height: 72vh;
            bottom: 0;
            z-index: 3;
            opacity: 1 !important;
          }

          .hero-portrait-img {
            opacity: 0.88 !important; /* Clearly visible, NOT hidden! */
            max-height: 72vh;
            filter:
              drop-shadow(0 15px 35px rgba(0, 0, 0, 0.95))
              drop-shadow(0 0 45px rgba(227, 43, 60, 0.4));
          }

          /* Text has strong shadows to contrast over background/portrait */
          .hero-left-col {
            z-index: 10;
          }

          .hero-title {
            font-size: clamp(3.4rem, 16vw, 4.8rem);
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.95), 0 1px 4px rgba(0, 0, 0, 0.9);
          }

          .hero-subtitle {
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
          }

          .hero-description {
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
            background: rgba(9, 9, 9, 0.45);
            backdrop-filter: blur(6px);
            padding: 0.6rem 0.85rem;
            border-radius: 8px;
            border-left: 2px solid var(--accent);
          }

          .hero-bg-word {
            font-size: clamp(4.2rem, 22vw, 8rem);
            color: rgba(215, 30, 48, 0.35);
          }

          .hero-right-col {
            z-index: 10;
            width: 100%;
            align-items: flex-start;
            gap: 1.25rem;
          }

          .hero-stats-group {
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
            background: rgba(14, 14, 14, 0.65);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 0.75rem 1.25rem;
          }

          .hero-stat-row {
            padding: 0.6rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }

          .hero-stat-row:first-child {
            border-top: none;
          }

          .hero-stat-num {
            font-size: 2.6rem;
            min-width: 80px;
          }

          .hero-volumetric-glow,
          .hero-volumetric-core {
            width: 280px;
            height: 280px;
          }
        }
      `}</style>
    </section>
  )
}
