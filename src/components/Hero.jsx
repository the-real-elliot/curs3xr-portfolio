import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion'
import { ArrowDown, MapPin, Sparkles, Terminal as TerminalIcon, Shield } from 'lucide-react'
import { siteConfig } from '../config/site'
import CosmicNebulaCanvas from './CosmicNebulaCanvas'

export default function Hero({ motionEnabled }) {
  const sectionRef = useRef(null)

  // Scroll parallax transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })

  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const textScrollY = useTransform(scrollYProgress, [0, 1], [0, -25])
  const bgTextScrollY = useTransform(scrollYProgress, [0, 1], [0, 35])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0])
  const heroBlur = useTransform(scrollYProgress, [0, 0.72], [0, 18])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.94])
  const heroFilter = useMotionTemplate`blur(${heroBlur}px)`

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
      auraShiftX.set(x * -20)
      auraShiftY.set(y * -12)
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

  // Portrait Stage component reusable for both landscape desktop and centered mobile
  const renderPortraitStage = (isMobile = false) => (
    <div className={`hero-cosmic-stage ${isMobile ? 'hero-stage-mobile' : 'hero-stage-desktop'}`}>
      
      {/* ── VIDEO-RENDERED COSMIC NEON AURA (SLOW PROCEDURAL FLUID LIGHT DRIFT) ── */}
      <div className="hero-cosmic-aura-wrap">
        
        {/* Procedural Living Cosmic Fluid Nebula Canvas (Smooth slow color drift: Purple -> Blue -> Cyan -> Crimson) */}
        <CosmicNebulaCanvas motionEnabled={motionEnabled} isMobile={isMobile} />

        {/* Broad cosmic gradient bloom (soft ambient halo) */}
        <motion.div
          className="hero-cosmic-glow-outer"
          style={motionEnabled && !isMobile ? { x: auraShiftX, y: auraShiftY } : {}}
        />

        {/* Electric Blue Right Rim Light Orb */}
        <motion.div
          className="hero-cosmic-glow-blue"
          style={motionEnabled && !isMobile ? { x: auraShiftX, y: auraShiftY } : {}}
        />

        {/* Vivid Cosmic Purple Left Rim Light Orb */}
        <motion.div
          className="hero-cosmic-glow-purple"
          style={motionEnabled && !isMobile ? { x: auraShiftX, y: auraShiftY } : {}}
        />

        {/* Godrays: Volumetric light beam fan radiating softly behind head & shoulders */}
        <div className="hero-cosmic-godrays" />
      </div>

      {/* 3D Interactive Spring Tilted Portrait Frame with Lifelike Ambient Floating */}
      <motion.div
        className="hero-portrait-frame"
        style={motionEnabled && !isMobile ? {
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
          width="820"
          height="1024"
        />
      </motion.div>
    </div>
  )

  return (
    <section ref={sectionRef} id="home" className="hero-root">

      {/* ── Background Deep Radial Ambient Vignette ── */}
      <div className="hero-smooth-ambient" />

      {/* ── High-End Cybernetic Horizon Materiality & Corner HUD Marks ── */}
      <div className="hero-cyber-material" aria-hidden="true">
        <div className="hero-horizon-glow" />
        <div className="hero-hud-mark hud-mark-tl">
          <span>// CURS3XR.SEC_SYS [v3.4]</span>
        </div>
        <div className="hero-hud-mark hud-mark-br">
          <span>[LAT: 28.6139° N // LONG: 77.2090° E]</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 1: GIANT "PORTFOLIO" BACKGROUND WORDMARK
          Smooth outline + subtle cosmic gradient tint + radial feather mask:
          Completely dissolves any rectangular letter stems!
          Zero hard boxy cutoffs, zero color clashing!
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-bg-word-wrap"
        style={motionEnabled ? {
          y: bgTextScrollY,
          opacity: heroOpacity,
          filter: heroFilter
        } : {}}
        aria-hidden="true"
      >
        <span className="hero-bg-word">PORTFOLIO</span>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 2: DESKTOP CENTER PORTRAIT STAGE
          Centered horizontally in the wide landscape scenario.
          Positioned strictly at z-index: 5 (in front of background text & particles).
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-desktop-stage-container"
        style={motionEnabled ? {
          y: portraitScrollY,
          opacity: heroOpacity,
          filter: heroFilter,
          scale: heroScale
        } : {}}
      >
        {renderPortraitStage(false)}
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 3: CONTENT OVERLAY (SMOOTH ROUNDED CORNERS & SHADOWS)
          Left: Identity & CTA | Right: Badge & 3 Authentic Stats
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-overlay"
        style={motionEnabled ? {
          y: textScrollY,
          opacity: heroOpacity,
          filter: heroFilter,
          scale: heroScale
        } : {}}
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

            {/* Mobile-Only Portrait: Rendered cleanly between Subtitle and Description */}
            <div className="hero-mobile-stage-wrapper">
              {renderPortraitStage(true)}
            </div>

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
            {/* Top availability pill with smooth rounded corners */}
            <motion.div variants={motionEnabled ? fadeRight : {}} className="hero-avail-badge">
              <span className="pulse-dot" />
              <span>AVAILABLE FOR NEW PROJECTS</span>
            </motion.div>

            {/* Quote badge with luxury frosted glass & soft shadow */}
            <motion.div variants={motionEnabled ? fadeRight : {}} className="hero-quote-pill">
              <Sparkles size={14} className="text-accent flex-shrink-0" />
              <div>
                <div className="hero-quote-t1">Every line of code.</div>
                <div className="hero-quote-t2">A purpose.</div>
              </div>
            </motion.div>

            {/* 3 Authentic High-Impact Stats with Luxury Frosted Card Material */}
            <motion.div variants={motionEnabled ? fadeRight : {}} className="hero-stats-group">
              
              {/* Tactical Cyber Corner Accents */}
              <div className="hero-stats-bracket-tl" />
              <div className="hero-stats-bracket-br" />

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

      {/* ── High-End Cyber Horizon Seam with Embedded Telemetry ── */}
      <div className="hero-bottom-cyber-seam" aria-hidden="true">
        <div className="hero-seam-laser" />
        <div className="hero-seam-telemetry">
          <span className="hero-seam-chip">[CORE_ENGINE: ACTIVE]</span>
          <span className="hero-seam-chip">[COSMIC_VOLUMETRICS: 60FPS]</span>
          <span className="hero-seam-chip">[STATUS: SECURE]</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          HERO STYLES (LUXURY GLASS MATERIALITY & VIDEO-RENDERED NEBULA)
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
          background: #09090b;
          border-bottom: 1px solid var(--border-color);
        }

        /* Silky smooth ambient radial vignette */
        .hero-smooth-ambient {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 75% 65% at 50% 50%, rgba(227, 43, 60, 0.06) 0%, transparent 70%),
            radial-gradient(circle at 50% 60%, rgba(106, 13, 173, 0.05) 0%, transparent 60%);
        }

        /* ──── HIGH-END CYBERNETIC MATERIALITY ──── */
        .hero-cyber-material {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .hero-horizon-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 180px;
          background: radial-gradient(ellipse 70% 100% at 50% 100%, rgba(138, 43, 226, 0.08) 0%, rgba(227, 43, 60, 0.05) 45%, transparent 75%);
        }

        .hero-hud-mark {
          position: absolute;
          font-family: var(--font-mono);
          font-size: 0.64rem;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.2);
          text-transform: uppercase;
        }
        .hud-mark-tl { top: 6rem; left: clamp(1.5rem, 4vw, 4rem); }
        .hud-mark-br { bottom: 1.8rem; right: clamp(1.5rem, 4vw, 4rem); }

        /* ══════════════════════════════════════════
           GIANT "PORTFOLIO" BACKGROUND WORDMARK
           Smooth outline + cosmic gradient tint + radial feather mask:
           Completely dissolves any rectangular letter stems!
        ══════════════════════════════════════════ */
        .hero-bg-word-wrap {
          position: absolute;
          top: 48%;
          left: 0;
          right: 0;
          width: 100%;
          margin-top: -0.5em;
          z-index: 2;
          pointer-events: none;
          text-align: center;
          mask-image: radial-gradient(ellipse 75% 65% at 50% 50%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.45) 60%, transparent 95%);
          -webkit-mask-image: radial-gradient(ellipse 75% 65% at 50% 50%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.45) 60%, transparent 95%);
        }

        .hero-bg-word {
          font-family: var(--font-display);
          font-size: clamp(8rem, 21vw, 24rem);
          line-height: 0.85;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.16);
          background: linear-gradient(
            90deg,
            rgba(227, 43, 60, 0.12) 0%,
            rgba(168, 45, 245, 0.18) 35%,
            rgba(37, 99, 235, 0.18) 65%,
            rgba(227, 43, 60, 0.12) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          filter:
            drop-shadow(0 0 35px rgba(168, 45, 245, 0.3))
            drop-shadow(0 0 65px rgba(227, 43, 60, 0.22))
            drop-shadow(0 0 95px rgba(37, 99, 235, 0.18));
          user-select: none;
          white-space: nowrap;
          display: block;
        }

        /* ══════════════════════════════════════════
           DESKTOP CENTER PORTRAIT STAGE
           Positioned at z-index: 5 (in front of particles & bg text)
        ══════════════════════════════════════════ */
        .hero-desktop-stage-container {
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

        .hero-stage-desktop {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .hero-mobile-stage-wrapper {
          display: none;
        }

        /* ──── COSMIC NEON AURA (VIDEO-RENDERED FLUID MOVEMENT) ──── */
        .hero-cosmic-aura-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 0;
        }

        /* Outer blended aura halo */
        .hero-cosmic-glow-outer {
          position: absolute;
          bottom: 10%;
          width: 660px;
          height: 660px;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 50%,
            rgba(120, 20, 200, 0.42) 0%,
            rgba(75, 15, 175, 0.28) 32%,
            rgba(227, 43, 60, 0.15) 58%,
            transparent 75%
          );
          filter: blur(85px);
          animation: cosmicColorShift 7s ease-in-out infinite alternate;
        }

        /* Electric Blue Right Rim Light Orb */
        .hero-cosmic-glow-blue {
          position: absolute;
          bottom: 14%;
          left: calc(50% + 30px);
          width: 420px;
          height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle at 60% 40%,
            rgba(26, 85, 255, 0.5) 0%,
            rgba(0, 195, 255, 0.22) 35%,
            transparent 70%
          );
          filter: blur(65px);
          animation: cosmicOrbFloatA 6s ease-in-out infinite alternate;
        }

        /* Vivid Cosmic Purple Left Rim Light Orb */
        .hero-cosmic-glow-purple {
          position: absolute;
          bottom: 16%;
          right: calc(50% + 30px);
          width: 420px;
          height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%,
            rgba(168, 45, 245, 0.55) 0%,
            rgba(110, 15, 180, 0.28) 40%,
            transparent 70%
          );
          filter: blur(65px);
          animation: cosmicOrbFloatB 6.5s ease-in-out infinite alternate;
        }

        /* Godrays: Volumetric light beam fan radiating softly behind head & shoulders */
        .hero-cosmic-godrays {
          position: absolute;
          bottom: 22%;
          width: 580px;
          height: 460px;
          border-radius: 50%;
          background:
            conic-gradient(from 180deg at 50% 100%,
              transparent 0deg,
              rgba(147, 51, 234, 0.16) 35deg,
              transparent 65deg,
              rgba(37, 99, 235, 0.2) 110deg,
              transparent 145deg,
              rgba(227, 43, 60, 0.14) 180deg
            );
          filter: blur(48px);
          opacity: 0.9;
          mask-image: radial-gradient(circle at 50% 100%, black 40%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at 50% 100%, black 40%, transparent 80%);
          animation: godraysSweep 9s ease-in-out infinite alternate;
        }

        @keyframes cosmicColorShift {
          0% {
            transform: scale(0.94) rotate(0deg);
            filter: blur(85px) hue-rotate(0deg);
            opacity: 0.85;
          }
          33% {
            transform: scale(1.06) rotate(6deg);
            filter: blur(75px) hue-rotate(50deg);
            opacity: 1;
          }
          66% {
            transform: scale(1.02) rotate(-4deg);
            filter: blur(80px) hue-rotate(110deg);
            opacity: 0.92;
          }
          100% {
            transform: scale(0.97) rotate(0deg);
            filter: blur(85px) hue-rotate(0deg);
            opacity: 0.85;
          }
        }

        @keyframes cosmicOrbFloatA {
          0% {
            transform: translate(0px, 0px) scale(0.95);
            filter: blur(65px) hue-rotate(0deg);
          }
          50% {
            transform: translate(25px, -20px) scale(1.12);
            filter: blur(55px) hue-rotate(60deg);
          }
          100% {
            transform: translate(-10px, 15px) scale(0.98);
            filter: blur(65px) hue-rotate(120deg);
          }
        }

        @keyframes cosmicOrbFloatB {
          0% {
            transform: translate(0px, 0px) scale(1.05);
            filter: blur(65px) hue-rotate(0deg);
          }
          50% {
            transform: translate(-25px, 20px) scale(0.92);
            filter: blur(55px) hue-rotate(-60deg);
          }
          100% {
            transform: translate(12px, -15px) scale(1.08);
            filter: blur(65px) hue-rotate(-120deg);
          }
        }

        @keyframes godraysSweep {
          0% {
            transform: rotate(0deg) scale(0.95);
            opacity: 0.75;
            filter: blur(48px) hue-rotate(0deg);
          }
          50% {
            transform: rotate(18deg) scale(1.08);
            opacity: 1;
            filter: blur(42px) hue-rotate(65deg);
          }
          100% {
            transform: rotate(-10deg) scale(0.98);
            opacity: 0.8;
            filter: blur(48px) hue-rotate(130deg);
          }
        }

        /* Portrait Frame with Continuous Lifelike Floating / Breathing Motion */
        .hero-portrait-frame {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 100%;
          animation: portraitFloating 7s ease-in-out infinite alternate;
        }

        @keyframes portraitFloating {
          0% {
            transform: translateY(0px) scale(1);
          }
          100% {
            transform: translateY(-10px) scale(1.008);
          }
        }

        /* Portrait with Cosmic Neon Dual Rim Lighting Drop-Shadows */
        .hero-portrait-img {
          position: relative;
          z-index: 1;
          height: 100%;
          width: auto;
          max-height: 86vh;
          object-fit: contain;
          object-position: bottom center;
          filter:
            drop-shadow(0 25px 55px rgba(0, 0, 0, 0.95))
            drop-shadow(-18px 0 45px rgba(168, 45, 245, 0.45))
            drop-shadow(18px 0 45px rgba(26, 85, 255, 0.5))
            drop-shadow(0 0 65px rgba(227, 43, 60, 0.22));
          transition: filter 0.5s ease;
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

        /* Luxury Frosted Description Card */
        .hero-description {
          font-size: clamp(0.88rem, 1.05vw, 1rem);
          color: #d1d5db;
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 380px;
          background: linear-gradient(135deg, rgba(22, 22, 28, 0.7) 0%, rgba(14, 14, 18, 0.6) 100%);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          padding: 1rem 1.35rem;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-left: 3px solid var(--accent);
          box-shadow:
            0 20px 45px rgba(0, 0, 0, 0.7),
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 0 25px rgba(227, 43, 60, 0.12);
        }

        .hero-cta-wrap {
          margin-bottom: 2rem;
        }

        /* CTA Button: Smooth rounded corners (12px) & soft glowing neon shadow */
        .hero-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.95rem 2.4rem;
          font-family: var(--font-body);
          font-size: 0.92rem;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, #e32b3c 0%, #c41829 100%);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(227, 43, 60, 0.42), 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        .hero-cta-btn:hover {
          background: linear-gradient(135deg, #ff3b4d 0%, #d61e30 100%);
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(227, 43, 60, 0.6), 0 0 25px rgba(227, 43, 60, 0.35);
          border-color: rgba(255, 255, 255, 0.4);
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
          color: #e5e7eb;
          text-transform: uppercase;
          background: linear-gradient(135deg, rgba(20, 20, 26, 0.75) 0%, rgba(12, 12, 16, 0.65) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 99px;
          padding: 0.5rem 1.2rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }

        .hero-quote-pill {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, rgba(26, 26, 32, 0.8) 0%, rgba(16, 16, 20, 0.7) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 99px;
          padding: 0.85rem 1.7rem;
          box-shadow:
            0 15px 35px rgba(0, 0, 0, 0.6),
            0 0 25px rgba(138, 43, 226, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
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

        /* 3 Big Stats with Luxury Frosted Card Material */
        .hero-stats-group {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 320px;
          background: linear-gradient(160deg, rgba(24, 24, 30, 0.78) 0%, rgba(14, 14, 18, 0.68) 100%);
          backdrop-filter: blur(24px) saturate(190%);
          -webkit-backdrop-filter: blur(24px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          padding: 0.85rem 1.5rem;
          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            0 0 35px rgba(138, 43, 226, 0.15);
        }

        /* Tactical Cyber Corner Brackets */
        .hero-stats-bracket-tl {
          position: absolute;
          top: 8px;
          left: 8px;
          width: 10px;
          height: 10px;
          border-top: 1.5px solid var(--accent);
          border-left: 1.5px solid var(--accent);
          border-top-left-radius: 4px;
          opacity: 0.7;
        }

        .hero-stats-bracket-br {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 10px;
          height: 10px;
          border-bottom: 1.5px solid rgba(37, 99, 235, 0.7);
          border-right: 1.5px solid rgba(37, 99, 235, 0.7);
          border-bottom-right-radius: 4px;
        }

        .hero-stat-row {
          display: flex;
          align-items: baseline;
          gap: 1.1rem;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .hero-stat-row:last-child {
          border-bottom: none;
        }

        .hero-stat-row:first-child {
          border-top: none;
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
          text-shadow: 0 0 25px rgba(227, 43, 60, 0.4);
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

        /* ──── HIGH-END CYBER HORIZON SEAM WITH EMBEDDED TELEMETRY ──── */
        .hero-bottom-cyber-seam {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 48px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          z-index: 10;
          pointer-events: none;
        }

        .hero-seam-laser {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 5%,
            rgba(227, 43, 60, 0.45) 25%,
            rgba(168, 45, 245, 0.65) 50%,
            rgba(37, 99, 235, 0.45) 75%,
            transparent 95%
          );
          box-shadow:
            0 0 15px rgba(168, 45, 245, 0.5),
            0 0 30px rgba(227, 43, 60, 0.3);
        }

        .hero-seam-telemetry {
          display: flex;
          gap: 1.5rem;
          padding: 0.4rem 0;
        }

        .hero-seam-chip {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.28);
          text-transform: uppercase;
        }

        /* ══════════════════════════════════════════
           RESPONSIVE DESIGN (DESKTOP -> TABLET -> MOBILE)
        ══════════════════════════════════════════ */

        /* Laptop (<= 1200px) */
        @media (max-width: 1200px) {
          .hero-desktop-stage-container {
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

          .hero-desktop-stage-container {
            height: 75vh;
            z-index: 5;
          }
        }

        /* Mobile Phone (<= 768px):
           - Centered layout, portrait is completely UNCOVERED and sharp!
           - Desktop absolute stage is replaced by inline mobile stage between subtitle & description.
           - Smooth rounded corners (18px) and soft shadows.
        */
        @media (max-width: 768px) {
          .hero-root {
            min-height: auto;
            padding-top: 85px;
            padding-bottom: 2.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .hero-hud-mark {
            display: none;
          }

          .hero-seam-telemetry {
            display: none;
          }

          /* Hide desktop absolute stage on mobile so it NEVER collides */
          .hero-desktop-stage-container {
            display: none !important;
          }

          .hero-overlay {
            min-height: auto;
            padding-top: 10px;
            padding-bottom: 0;
            width: 100%;
          }

          .hero-wide-container {
            padding: 0 1.25rem;
            gap: 1.5rem;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .hero-left-col {
            max-width: 100%;
            align-items: center;
            text-align: center;
            z-index: 10;
          }

          .hero-role-tags {
            margin-bottom: 0.8rem;
            align-items: center;
          }

          .hero-cursive {
            font-size: 2.2rem;
          }

          .hero-title {
            font-size: clamp(3.2rem, 15vw, 4.4rem);
            margin-bottom: 0.4rem;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.95);
          }

          .hero-subtitle {
            font-size: 1.05rem;
            margin-bottom: 0.8rem;
            text-align: center;
          }

          /* Mobile Stage: Placed in the center, 100% uncovered by cards! */
          .hero-mobile-stage-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin: 0.5rem 0 1.5rem 0;
            z-index: 5;
          }

          .hero-stage-mobile {
            position: relative;
            width: 100%;
            height: 52vh;
            min-height: 380px;
            max-height: 480px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
          }

          .hero-stage-mobile .hero-portrait-img {
            max-height: 50vh;
            filter:
              drop-shadow(0 15px 35px rgba(0, 0, 0, 0.95))
              drop-shadow(-12px 0 30px rgba(168, 45, 245, 0.55))
              drop-shadow(12px 0 30px rgba(37, 99, 235, 0.55))
              drop-shadow(0 0 45px rgba(227, 43, 60, 0.25));
          }

          .hero-stage-mobile .hero-cosmic-glow-outer {
            width: 300px;
            height: 300px;
            filter: blur(45px);
          }

          .hero-stage-mobile .hero-cosmic-glow-blue,
          .hero-stage-mobile .hero-cosmic-glow-purple {
            width: 200px;
            height: 280px;
            filter: blur(35px);
          }

          .hero-stage-mobile .hero-cosmic-godrays {
            width: 320px;
            height: 260px;
            filter: blur(25px);
          }

          .hero-bg-word {
            font-size: clamp(4.5rem, 20vw, 7.5rem);
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.14);
          }

          .hero-description {
            font-size: 0.9rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            border-radius: 14px;
            text-align: center;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
          }

          .hero-cta-wrap {
            margin-bottom: 1.5rem;
          }

          .hero-location {
            justify-content: center;
          }

          /* Right column & Stats on Mobile */
          .hero-right-col {
            width: 100%;
            max-width: 100%;
            align-items: center;
            gap: 1.25rem;
            z-index: 10;
          }

          .hero-quote-pill {
            padding: 0.65rem 1.3rem;
            border-radius: 99px;
          }

          .hero-stats-group {
            width: 100%;
            max-width: 100%;
            flex-direction: row;
            justify-content: space-around;
            background: linear-gradient(160deg, rgba(24, 24, 30, 0.8) 0%, rgba(14, 14, 18, 0.7) 100%);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1rem 0.6rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7);
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
        }
      `}</style>
    </section>
  )
}
