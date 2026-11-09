import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Shield, Cpu, Lock, CheckCircle2 } from 'lucide-react'
import { siteConfig } from '../config/site'

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0)
  const [logIndex, setLogIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const logs = [
    'INITIALIZING QUANTUM ENTROPY POOL...',
    'CALIBRATING 3D VOLUMETRIC GODRAYS...',
    'COMPILING COSMIC NEON SHADER BUFFERS...',
    'VERIFYING CRYPTOGRAPHIC SIGNATURES...',
    'SYSTEM READY // ACCESS GRANTED.'
  ]

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden'

    let current = 0
    const interval = setInterval(() => {
      // Cinematic variable acceleration:
      // Snappy start (0-55%), smooth calibration at 70-85%, then rapid completion to 100%
      let increment
      if (current < 45) {
        increment = Math.floor(Math.random() * 6) + 4
      } else if (current < 75) {
        increment = Math.floor(Math.random() * 4) + 2
      } else if (current < 90) {
        increment = Math.floor(Math.random() * 3) + 1
      } else {
        increment = Math.floor(Math.random() * 5) + 3
      }

      current = Math.min(100, current + increment)
      setProgress(current)

      // Sync telemetry log milestones
      if (current < 25) setLogIndex(0)
      else if (current < 50) setLogIndex(1)
      else if (current < 75) setLogIndex(2)
      else if (current < 95) setLogIndex(3)
      else setLogIndex(4)

      if (current >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsFinished(true)
          setTimeout(() => {
            document.body.style.overflow = ''
            if (onLoadingComplete) onLoadingComplete()
          }, 850) // wait for exit curtain transition
        }, 250)
      }
    }, 38)

    return () => {
      clearInterval(interval)
      document.body.style.overflow = ''
    }
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.85,
              ease: [0.85, 0, 0.15, 1]
            }
          }}
        >
          {/* Ambient Cosmic Vignette */}
          <div className="preloader-ambient" />

          {/* Tactical HUD Corner Crosshairs */}
          <div className="preloader-hud-corner hud-top-left">
            <span>┌ [SYS_INIT // SECURE_ENV]</span>
          </div>
          <div className="preloader-hud-corner hud-top-right">
            <span>[RUNTIME_v3.4.0] ┐</span>
          </div>
          <div className="preloader-hud-corner hud-bottom-left">
            <span>└ [VFX_VOLUMETRIC_ON]</span>
          </div>
          <div className="preloader-hud-corner hud-bottom-right">
            <span>[0x7FFE9A4B // LATENCY: 0.12ms] ┘</span>
          </div>

          {/* Top Status Bar */}
          <div className="preloader-top-bar">
            <div className="preloader-status-pill">
              <span className="preloader-pulse-dot" />
              <span>{progress === 100 ? 'AUTHENTICATED' : 'ESTABLISHING SECURE PROTOCOL'}</span>
            </div>
            <div className="preloader-node-id">
              NODE: <span>CURS3XR-SEC-01</span>
            </div>
          </div>

          {/* Center Brand & Loading Stage */}
          <div className="preloader-center-content">
            
            {/* Animated Diamond Brand Emblem with Pulsing Halo */}
            <div className="preloader-emblem-wrap">
              <div className="preloader-halo-spin" />
              <div className="preloader-diamond">
                <div className="preloader-diamond-core" />
              </div>
            </div>

            {/* Brand Title with Cosmic Glow */}
            <h1 className="preloader-title">
              {siteConfig.identity.displayName}
              <span className="preloader-title-dot">.</span>
            </h1>

            <div className="preloader-subtitle">
              OFFENSIVE SECURITY & WEB ENGINEER
            </div>

            {/* Progress Percentage Display */}
            <div className="preloader-counter-row">
              <span className="preloader-counter-num">
                {String(progress).padStart(2, '0')}
              </span>
              <span className="preloader-counter-pct">%</span>
            </div>

            {/* Hairline High-Precision Dual Progress Track */}
            <div className="preloader-track-container">
              <div className="preloader-track-bg">
                <motion.div
                  className="preloader-track-fill"
                  style={{ width: `${progress}%` }}
                >
                  <div className="preloader-track-glow-tip" />
                </motion.div>
              </div>
            </div>

            {/* Telemetry Monospace Stream */}
            <div className="preloader-log-box">
              <div className="preloader-log-row">
                <Terminal size={13} className="preloader-log-icon flex-shrink-0" />
                <span className="preloader-log-text">
                  {logs[logIndex]}
                </span>
                <span className="preloader-cursor">_</span>
              </div>
            </div>

          </div>

          {/* Bottom Security Classification Bar */}
          <div className="preloader-bottom-bar">
            <div className="preloader-clearance">
              <Shield size={12} className="text-accent" />
              <span>CLEARANCE: LEVEL 5 // HIGH FIDELITY</span>
            </div>
            <div className="preloader-copy">
              © {new Date().getFullYear()} {siteConfig.identity.displayName}. ALL RIGHTS RESERVED.
            </div>
          </div>

          {/* Embedded Styles with Smooth Rounded Corners & Neon Glows */}
          <style>{`
            .preloader-overlay {
              position: fixed;
              inset: 0;
              width: 100vw;
              height: 100vh;
              z-index: 999999;
              background: #080808;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              padding: clamp(1.2rem, 3vw, 2.5rem);
              user-select: none;
              overflow: hidden;
            }

            /* Cosmic ambient glows */
            .preloader-ambient {
              position: absolute;
              inset: 0;
              pointer-events: none;
              background:
                radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.12) 0%, transparent 60%),
                radial-gradient(circle at 50% 55%, rgba(227, 43, 60, 0.1) 0%, transparent 55%),
                radial-gradient(ellipse 70% 60% at 50% 100%, rgba(26, 53, 255, 0.08) 0%, transparent 70%);
              filter: blur(40px);
            }

            /* Tactical HUD Corner Crosshairs */
            .preloader-hud-corner {
              position: absolute;
              font-family: var(--font-mono);
              font-size: 0.65rem;
              letter-spacing: 0.12em;
              color: rgba(255, 255, 255, 0.22);
              pointer-events: none;
              text-transform: uppercase;
            }
            .hud-top-left { top: 1.5rem; left: 1.8rem; }
            .hud-top-right { top: 1.5rem; right: 1.8rem; }
            .hud-bottom-left { bottom: 1.5rem; left: 1.8rem; }
            .hud-bottom-right { bottom: 1.5rem; right: 1.8rem; }

            /* Top Bar */
            .preloader-top-bar {
              width: 100%;
              max-width: 1400px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              z-index: 2;
            }

            .preloader-status-pill {
              display: inline-flex;
              align-items: center;
              gap: 0.55rem;
              font-family: var(--font-mono);
              font-size: 0.68rem;
              letter-spacing: 0.14em;
              color: var(--text-muted);
              background: rgba(18, 18, 18, 0.65);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 99px;
              padding: 0.4rem 1rem;
              backdrop-filter: blur(10px);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
            }

            .preloader-pulse-dot {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: var(--accent);
              box-shadow: 0 0 10px var(--accent);
              animation: preloaderBlink 1.4s ease-in-out infinite;
            }

            @keyframes preloaderBlink {
              0%, 100% { opacity: 0.3; transform: scale(0.85); }
              50% { opacity: 1; transform: scale(1.15); }
            }

            .preloader-node-id {
              font-family: var(--font-mono);
              font-size: 0.7rem;
              letter-spacing: 0.12em;
              color: rgba(255, 255, 255, 0.35);
            }
            .preloader-node-id span {
              color: var(--accent);
              font-weight: 600;
            }

            /* Center Stage */
            .preloader-center-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              z-index: 2;
              width: 100%;
              max-width: 540px;
              margin: auto 0;
            }

            /* Emblem Wrap */
            .preloader-emblem-wrap {
              position: relative;
              width: 68px;
              height: 68px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 1.5rem;
            }

            .preloader-halo-spin {
              position: absolute;
              inset: -6px;
              border-radius: 50%;
              border: 1px dashed rgba(227, 43, 60, 0.4);
              animation: haloRotate 12s linear infinite;
            }

            @keyframes haloRotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            .preloader-diamond {
              width: 38px;
              height: 38px;
              background: var(--accent);
              clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0 25px rgba(227, 43, 60, 0.7);
              animation: diamondPulse 2.4s ease-in-out infinite alternate;
            }

            @keyframes diamondPulse {
              0% { transform: scale(0.95); box-shadow: 0 0 20px rgba(227, 43, 60, 0.5); }
              100% { transform: scale(1.05); box-shadow: 0 0 35px rgba(227, 43, 60, 0.85); }
            }

            .preloader-diamond-core {
              width: 12px;
              height: 12px;
              background: #080808;
            }

            /* Title */
            .preloader-title {
              font-family: var(--font-display);
              font-size: clamp(2.8rem, 7vw, 4.2rem);
              line-height: 0.9;
              letter-spacing: 0.08em;
              color: var(--text-primary);
              margin-bottom: 0.6rem;
              text-transform: uppercase;
              text-shadow: 0 0 30px rgba(227, 43, 60, 0.3);
            }

            .preloader-title-dot {
              color: var(--accent);
            }

            .preloader-subtitle {
              font-family: var(--font-mono);
              font-size: clamp(0.68rem, 1.4vw, 0.78rem);
              letter-spacing: 0.22em;
              color: var(--text-muted);
              margin-bottom: 2.2rem;
              text-transform: uppercase;
            }

            /* Counter */
            .preloader-counter-row {
              display: flex;
              align-items: baseline;
              gap: 0.25rem;
              margin-bottom: 1rem;
            }

            .preloader-counter-num {
              font-family: var(--font-display);
              font-size: clamp(3rem, 6vw, 4.4rem);
              line-height: 1;
              color: var(--text-primary);
              letter-spacing: 0.04em;
              text-shadow: 0 0 25px rgba(255, 255, 255, 0.25);
            }

            .preloader-counter-pct {
              font-family: var(--font-mono);
              font-size: 1.25rem;
              color: var(--accent);
              font-weight: 700;
            }

            /* Track Container */
            .preloader-track-container {
              width: 100%;
              max-width: 440px;
              padding: 0 1rem;
              margin-bottom: 1.5rem;
            }

            .preloader-track-bg {
              width: 100%;
              height: 3px;
              background: rgba(255, 255, 255, 0.08);
              border-radius: 99px;
              position: relative;
              overflow: visible;
            }

            .preloader-track-fill {
              height: 100%;
              background: linear-gradient(90deg, #e32b3c 0%, #a82df5 50%, #2563eb 100%);
              border-radius: 99px;
              position: relative;
              box-shadow: 0 0 15px rgba(227, 43, 60, 0.6);
              transition: width 0.08s ease-out;
            }

            .preloader-track-glow-tip {
              position: absolute;
              right: -3px;
              top: -3px;
              width: 9px;
              height: 9px;
              border-radius: 50%;
              background: #ffffff;
              box-shadow:
                0 0 10px #ffffff,
                0 0 20px rgba(168, 45, 245, 0.9),
                0 0 30px rgba(227, 43, 60, 0.9);
            }

            /* Telemetry Box */
            .preloader-log-box {
              background: rgba(18, 18, 18, 0.65);
              border: 1px solid rgba(255, 255, 255, 0.06);
              border-radius: 12px;
              padding: 0.65rem 1.2rem;
              backdrop-filter: blur(12px);
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
              min-width: 320px;
              max-width: 100%;
            }

            .preloader-log-row {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.55rem;
              font-family: var(--font-mono);
              font-size: 0.72rem;
              letter-spacing: 0.08em;
              color: var(--text-muted);
            }

            .preloader-log-icon {
              color: var(--accent);
            }

            .preloader-log-text {
              color: #d1d5db;
            }

            .preloader-cursor {
              color: var(--accent);
              font-weight: 700;
              animation: preloaderCursorBlink 0.8s steps(2, start) infinite;
            }

            @keyframes preloaderCursorBlink {
              to { visibility: hidden; }
            }

            /* Bottom Bar */
            .preloader-bottom-bar {
              width: 100%;
              max-width: 1400px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-family: var(--font-mono);
              font-size: 0.65rem;
              letter-spacing: 0.12em;
              color: rgba(255, 255, 255, 0.25);
              z-index: 2;
            }

            .preloader-clearance {
              display: flex;
              align-items: center;
              gap: 0.45rem;
              text-transform: uppercase;
            }

            /* Responsive */
            @media (max-width: 768px) {
              .preloader-hud-corner {
                display: none;
              }

              .preloader-top-bar {
                justify-content: center;
              }

              .preloader-node-id {
                display: none;
              }

              .preloader-bottom-bar {
                flex-direction: column;
                gap: 0.5rem;
                text-align: center;
              }

              .preloader-log-box {
                min-width: auto;
                width: 90vw;
              }

              .preloader-log-text {
                font-size: 0.64rem;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
