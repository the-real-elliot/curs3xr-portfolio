import React, { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * ScrollTelemetryRail - High-End Cybernetic HUD Scroll Tracker
 * - Pinned to right edge on desktop
 * - Maps scroll progress continuously to a neon laser tracker rail
 * - Section ticks with active pulse indicator and live scroll depth percentage
 * - Click-to-jump navigation to each section
 */
export default function ScrollTelemetryRail({ motionEnabled = true }) {
  const [activeSection, setActiveSection] = useState('home')
  const [scrollPercent, setScrollPercent] = useState(0)

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  })

  // Height of the laser line (0% to 100%)
  const laserHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  const sections = [
    { id: 'home', label: '00', name: 'HOME' },
    { id: 'about', label: '01', name: 'ABOUT' },
    { id: 'expertise', label: '02', name: 'SECURITY' },
    { id: 'development', label: '03', name: 'DEV' },
    { id: 'skills', label: '04', name: 'SKILLS' },
    { id: 'work', label: '05', name: 'WORK' },
    { id: 'experience', label: '06', name: 'TRAJECTORY' },
    { id: 'terminal', label: '07', name: 'TERMINAL' },
    { id: 'contact', label: '08', name: 'CONTACT' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percent
      const scrollTop = window.scrollY
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const pct = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)))
      setScrollPercent(pct)

      // Active section detection
      const scrollPos = scrollTop + window.innerHeight * 0.4
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <aside className="telemetry-rail-root" aria-hidden="true">
      {/* Top HUD Header */}
      <div className="telemetry-rail-header">
        <span className="telemetry-dot" />
        <span className="telemetry-title">TRK.SYS</span>
      </div>

      {/* Center Laser Track Rail */}
      <div className="telemetry-track-container">
        {/* Background Rail Line */}
        <div className="telemetry-track-bg" />

        {/* Dynamic Scroll-Mapped Neon Laser Beam */}
        <motion.div
          className="telemetry-track-laser"
          style={{ height: laserHeight }}
        />

        {/* Section Ticks */}
        <div className="telemetry-ticks-wrap">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`telemetry-tick-btn ${isActive ? 'is-active' : ''}`}
                title={`Jump to ${sec.name}`}
              >
                <div className="telemetry-tick-node">
                  {isActive && <div className="telemetry-tick-glow" />}
                </div>
                <span className="telemetry-tick-label font-mono">{sec.label}</span>
                <span className="telemetry-tick-tooltip font-mono">{sec.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom Live Metric */}
      <div className="telemetry-rail-footer font-mono">
        <span className="telemetry-pct-num">{scrollPercent}</span>
        <span className="telemetry-pct-unit">%</span>
      </div>

      <style>{`
        .telemetry-rail-root {
          position: fixed;
          right: 1.75rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 85;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.85rem;
          pointer-events: auto;
          user-select: none;
        }

        @media (max-width: 1080px) {
          .telemetry-rail-root {
            display: none !important;
          }
        }

        .telemetry-rail-header {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          opacity: 0.7;
        }

        .telemetry-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 6px var(--accent);
          animation: telemetryPulse 2s ease-in-out infinite;
        }

        @keyframes telemetryPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .telemetry-title {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.45);
        }

        .telemetry-track-container {
          position: relative;
          height: 230px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 6px 0;
        }

        .telemetry-track-bg {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 99px;
        }

        .telemetry-track-laser {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          background: linear-gradient(180deg, #e32b3c 0%, #a82df5 50%, #00f0ff 100%);
          box-shadow:
            0 0 8px rgba(227, 43, 60, 0.8),
            0 0 16px rgba(168, 45, 245, 0.5);
          border-radius: 99px;
          z-index: 1;
        }

        .telemetry-ticks-wrap {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        .telemetry-tick-btn {
          position: relative;
          display: flex;
          align-items: center;
          background: none;
          border: none;
          padding: 2px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .telemetry-tick-btn:hover {
          transform: scale(1.2);
        }

        .telemetry-tick-node {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #111;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          transition: all 0.25s ease;
        }

        .telemetry-tick-btn:hover .telemetry-tick-node {
          border-color: #ff3b4d;
          background: #ff3b4d;
        }

        .telemetry-tick-btn.is-active .telemetry-tick-node {
          border-color: var(--accent);
          background: #fff;
          box-shadow:
            0 0 10px rgba(227, 43, 60, 0.9),
            0 0 18px rgba(227, 43, 60, 0.5);
        }

        .telemetry-tick-glow {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid var(--accent);
          animation: tickRipple 1.6s ease-out infinite;
        }

        @keyframes tickRipple {
          0% { transform: scale(0.8); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .telemetry-tick-label {
          position: absolute;
          right: 18px;
          font-size: 0.55rem;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.28);
          opacity: 0;
          transform: translateX(4px);
          transition: all 0.2s ease;
          pointer-events: none;
        }

        .telemetry-tick-btn.is-active .telemetry-tick-label {
          opacity: 1;
          transform: translateX(0);
          color: var(--accent);
          font-weight: 700;
        }

        .telemetry-tick-tooltip {
          position: absolute;
          left: -8px;
          transform: translateX(-100%);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          background: rgba(18, 18, 22, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: var(--text-primary);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }

        .telemetry-tick-btn:hover .telemetry-tick-tooltip {
          opacity: 1;
          transform: translateX(-100%) scale(1);
        }

        .telemetry-rail-footer {
          display: flex;
          align-items: baseline;
          font-size: 0.64rem;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(20, 20, 24, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.15rem 0.45rem;
          border-radius: 6px;
        }

        .telemetry-pct-num {
          font-weight: 700;
          color: var(--accent);
        }

        .telemetry-pct-unit {
          font-size: 0.5rem;
          color: var(--text-muted);
          margin-left: 1px;
        }
      `}</style>
    </aside>
  )
}
