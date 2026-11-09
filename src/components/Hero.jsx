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

  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const textScrollY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const bgTextScrollY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  // High-end mouse interactive 3D physics tilt
  const springConfig = { damping: 25, stiffness: 120 }
  const tiltX = useSpring(0, springConfig)
  const tiltY = useSpring(0, springConfig)
  const auraShiftX = useSpring(0, springConfig)
  const auraShiftY = useSpring(0, springConfig)

  useEffect(() => {
    if (!motionEnabled) return

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 2 // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2 // -1 to 1
      tiltX.set(y * -5) // smooth rotateX
      tiltY.set(x * 6)  // smooth rotateY
      auraShiftX.set(x * -24)
      auraShiftY.set(y * -14)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [motionEnabled, tiltX, tiltY, auraShiftX, auraShiftY])

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

      {/* ── Background Deep Radial Ambient Vignette (Smooth, no grid squares) ── */}
      <div className="hero-smooth-ambient" />

      {/* ══════════════════════════════════════════════════════════
          LAYER 1: GIANT "PORTFOLIO" BACKGROUND TEXT
          Positioned strictly behind the portrait (z-index: 2)
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-bg-word-wrap"
        style={motionEnabled ? { y: bgTextScrollY } : {}}
        aria-hidden="true"
      >
        <span className="hero-bg-word">PORTFOLIO</span>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 2: COSMIC NEON AURA & CENTER PORTRAIT
          Vibrant Electric Blue & Cosmic Purple Halo with Godrays.
          Positioned at z-index: 5 (in front of background & particles).
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-portrait-stage"
        style={motionEnabled ? {
          y: portraitScrollY,
          opacity: heroOpacity
        } : {}}
      >
        {/* Cosmic Neon Aura: Electric Blue + Purple + Godrays Volumetric Bloom */}
        <div className="hero-cosmic-aura-wrap">
          {/* Broad cosmic gradient bloom */}
          <motion.div
            className="hero-cosmic-glow-outer"
            style={motionEnabled ? { x: auraShiftX, y: auraShiftY } : {}}
          />

          {/* Electric blue right rim-light orb */}
          <motion.div
            className="hero-cosmic-glow-blue"
            style={motionEnabled ? { x: auraShiftX, y: auraShiftY } : {}}
          />

          {/* Vivid purple/violet left rim-light orb */}
          <motion.div
            className="hero-cosmic-glow-purple"
            style={motionEnabled ? { x: auraShiftX, y: auraShiftY } : {}}
          />

          {/* Godrays: Volumetric light beam fan radiating behind shoulders */}
          <div className="hero-cosmic-godrays" />
        </div>

        {/* 3D Interactive Spring Tilted Portrait Frame */}
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
          LAYER 3: CONTENT OVERLAY (DESKTOP & MOBILE RESPONSIVE)
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

            {/* 3 Authentic High-Impact Stats with Dividers */}
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
          HERO STYLES (COSMIC NEON AURA & HIGH-END UI/UX)
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

        /* Silky smooth ambient radial vignette (no grid squares) */
        .hero-smooth-ambient {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 75% 65% at 50% 50%, rgba(227, 43, 60, 0.07) 0%, transparent 70%),
            radial-gradient(circle at 50% 60%, rgba(106, 13, 173, 0.05) 0%, transparent 60%);
        }

        /* ══════════════════════════════════════════
           GIANT "PORTFOLIO" BACKGROUND TEXT
           Placed strictly behind the portrait (z-index: 2)
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
          color: rgba(215, 30, 48, 0.38);
          text-shadow: 0 0 60px rgba(227, 43, 60, 0.2);
          user-select: none;
          white-space: nowrap;
          display: block;
        }

        /* ══════════════════════════════════════════
           CENTER PORTRAIT STAGE
           Positioned at z-index: 5 (in front of particles)
        ══════════════════════════════════════════ */
        .hero-portrait-stage {
          position: absolute;
          z-index: 5;
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

        /* ──── COSMIC NEON AURA (BLUE & PURPLE) ──── */
        .hero-cosmic-aura-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 0;
        }

        /* Outer blended aura (purple + crimson transition) */
        .hero-cosmic-glow-outer {
          position: absolute;
          bottom: 12%;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(106, 13, 173, 0.5) 0%,
            rgba(66, 12, 162, 0.35) 35%,
            rgba(227, 43, 60, 0.15) 60%,
            transparent 75%
          );
          filter: blur(70px);
          animation: cosmicPulse 7s ease-in-out infinite alternate;
        }

        /* Electric Blue Right Rim Light Orb */
        .hero-cosmic-glow-blue {
          position: absolute;
          bottom: 16%;
          left: calc(50% + 50px);
          width: 380px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(26, 53, 255, 0.55) 0%,
            rgba(12, 18, 157, 0.3) 45%,
            transparent 70%
          );
          filter: blur(55px);
        }

        /* Vivid Cosmic Purple Left Rim Light Orb */
        .hero-cosmic-glow-purple {
          position: absolute;
          bottom: 18%;
          right: calc(50% + 50px);
          width: 380px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(138, 43, 226, 0.6) 0%,
            rgba(107, 0, 148, 0.35) 45%,
            transparent 70%
          );
          filter: blur(55px);
        }

        /* Volumetric Godrays effect radiating behind head & shoulders */
        .hero-cosmic-godrays {
          position: absolute;
          bottom: 25%;
          width: 500px;
          height: 400px;
          background:
            conic-gradient(from 180deg at 50% 100%,
              transparent 0deg,
              rgba(138, 43, 226, 0.15) 35deg,
              transparent 70deg,
              rgba(30, 100, 255, 0.18) 110deg,
              transparent 145deg,
              rgba(227, 43, 60, 0.12) 180deg
            );
          filter: blur(35px);
          opacity: 0.85;
          mask-image: radial-gradient(ellipse at 50% 100%, black 30%, transparent 75%);
        }

        @keyframes cosmicPulse {
          0% { transform: scale(0.96); opacity: 0.85; }
          100% { transform: scale(1.04); opacity: 1; }
        }

        .hero-portrait-frame {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 100%;
        }

        /* Portrait with Cosmic Neon Dual Rim Lighting Drop-Shadows */
        .hero-portrait-img {
          position: relative;
          z-index: 1;
          height: 100%;
          width: auto;
          max-height: 85vh;
          object-fit: contain;
          object-position: bottom center;
          filter:
            drop-shadow(0 20px 50px rgba(0, 0, 0, 0.95))
            drop-shadow(-18px 0 45px rgba(138, 43, 226, 0.45))
            drop-shadow(18px 0 45px rgba(26, 53, 255, 0.5))
            drop-shadow(0 0 65px rgba(227, 43, 60, 0.2));
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
          padding-top: 100px;
          padding-bottom: 60px;
        }

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
          max-width: 420px;
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
          max-width: 340px;
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
           RESPONSIVE DESIGN (DESKTOP -> TABLET -> MOBILE)
        ══════════════════════════════════════════ */

        /* Laptop (<= 1200px) */
        @media (max-width: 1200px) {
          .hero-portrait-stage {
            height: 82%;
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
            gap: 2rem;
            padding-top: 1rem;
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
            z-index: 5;
          }

          .hero-bg-word {
            font-size: clamp(5rem, 18vw, 12rem);
            color: rgba(215, 30, 48, 0.3);
          }
        }

        /* Mobile Phone (<= 640px):
           FULL REDESIGN FOR MOBILE:
           - Portrait is centered, tall, sharp and NEVER obscured by cards!
           - Text & CTA sit at top with deep shadows.
           - Stats sit cleanly below the hero fold or at the base so his face is completely clear.
        */
        @media (max-width: 640px) {
          .hero-root {
            min-height: auto;
            padding-top: 90px;
            padding-bottom: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .hero-overlay {
            min-height: auto;
            padding-top: 10px;
            padding-bottom: 0;
          }

          .hero-wide-container {
            padding: 0 1.25rem;
            gap: 1.5rem;
            flex-direction: column;
          }

          .hero-left-col {
            max-width: 100%;
            z-index: 10;
          }

          .hero-role-tags {
            margin-bottom: 1rem;
          }

          .hero-cursive {
            font-size: 2.2rem;
          }

          .hero-title {
            font-size: clamp(3.2rem, 15vw, 4.4rem);
            margin-bottom: 0.5rem;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.95);
          }

          .hero-subtitle {
            font-size: 1.1rem;
            margin-bottom: 1rem;
          }

          .hero-description {
            font-size: 0.9rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
          }

          .hero-cta-wrap {
            margin-bottom: 1.5rem;
          }

          /* The Portrait Stage on Mobile:
             Centered, high-end presence, sitting proud in the center! */
          .hero-portrait-stage {
            position: relative;
            height: 60vh;
            min-height: 420px;
            max-height: 520px;
            width: 100%;
            margin-top: 0.5rem;
            margin-bottom: 1rem;
            z-index: 5;
          }

          .hero-portrait-img {
            max-height: 58vh;
            opacity: 1 !important;
            filter:
              drop-shadow(0 15px 35px rgba(0, 0, 0, 0.95))
              drop-shadow(-12px 0 35px rgba(138, 43, 226, 0.6))
              drop-shadow(12px 0 35px rgba(26, 53, 255, 0.65));
          }

          .hero-cosmic-glow-outer {
            width: 320px;
            height: 320px;
            filter: blur(45px);
          }

          .hero-cosmic-glow-blue,
          .hero-cosmic-glow-purple {
            width: 220px;
            height: 300px;
            filter: blur(35px);
          }

          /* Right column & Stats on Mobile:
             Positioned cleanly BELOW the portrait so they NEVER cover his face! */
          .hero-right-col {
            width: 100%;
            max-width: 100%;
            align-items: center;
            gap: 1.25rem;
            z-index: 10;
          }

          .hero-quote-pill {
            padding: 0.6rem 1.25rem;
          }

          .hero-stats-group {
            width: 100%;
            max-width: 100%;
            flex-direction: row;
            justify-content: space-around;
            background: rgba(15, 15, 15, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 1rem 0.5rem;
          }

          .hero-stat-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.25rem;
            padding: 0 0.5rem;
            border-bottom: none;
            border-top: none;
          }

          .hero-stat-num {
            font-size: 2.2rem;
            min-width: auto;
            text-align: center;
          }

          .hero-stat-meta {
            align-items: center;
            text-align: center;
            font-size: 0.6rem;
          }

          .hero-bg-word {
            font-size: clamp(4.5rem, 22vw, 7.5rem);
          }
        }
      `}</style>
    </section>
  )
}
