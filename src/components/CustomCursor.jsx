import React, { useEffect, useRef, useState } from 'react'

/**
 * CustomCursor - Highly optimized, ultra-smooth neon circle cursor.
 * - Hardware-accelerated GPU translate3d (zero layout reflows)
 * - requestAnimationFrame with linear interpolation (lerp)
 * - Responsive neon ring with inner precision reticle
 * - Dynamic hover reactions on interactive elements (links, buttons, inputs, cards)
 * - Automatically disabled on touch/coarse devices
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const isTouchDevice = useRef(false)
  
  // Track state with refs to avoid React re-render overhead during 60/120fps mouse movement
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const isHovered = useRef(false)
  const isClicking = useRef(false)
  const isVisible = useRef(false)
  const rafId = useRef(null)
  
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Detect touch-only devices (coarse pointer)
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      isTouchDevice.current = true
      return
    }

    setMounted(true)

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY

      if (!isVisible.current) {
        isVisible.current = true
        if (dotRef.current) dotRef.current.style.opacity = '1'
        if (ringRef.current) ringRef.current.style.opacity = '1'
      }

      // Check if hovering over an interactive element
      const target = e.target
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], .project-card, .btn, .badge, .interactive, .cursor-hover')
        isHovered.current = !!interactive
      }
    }

    const onMouseDown = () => {
      isClicking.current = true
    }

    const onMouseUp = () => {
      isClicking.current = false
    }

    const onMouseLeave = () => {
      isVisible.current = false
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }

    const onMouseEnter = () => {
      isVisible.current = true
      if (dotRef.current) dotRef.current.style.opacity = '1'
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Butter-smooth render loop
    const render = () => {
      // Lerp ring towards mouse target (factor 0.2 for tight yet silky follow)
      const lerpFactor = 0.2
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor

      // Position inner dot with instantaneous response (0 latency)
      if (dotRef.current) {
        const dotScale = isHovered.current ? 1.4 : isClicking.current ? 0.6 : 1
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(${dotScale})`
      }

      // Position outer neon ring with smooth physics and scale states
      if (ringRef.current) {
        const ringScale = isClicking.current ? 0.75 : isHovered.current ? 1.6 : 1
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`

        if (isHovered.current) {
          ringRef.current.classList.add('cursor-ring--hover')
        } else {
          ringRef.current.classList.remove('cursor-ring--hover')
        }

        if (isClicking.current) {
          ringRef.current.classList.add('cursor-ring--active')
        } else {
          ringRef.current.classList.remove('cursor-ring--active')
        }
      }

      rafId.current = requestAnimationFrame(render)
    }

    rafId.current = requestAnimationFrame(render)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [])

  if (!mounted || isTouchDevice.current) return null

  return (
    <>
      {/* Outer Smooth Neon Circle */}
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
      {/* Inner Precision Neon Reticle Dot */}
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />

      <style>{`
        /* Hide default OS cursor globally on non-touch devices */
        @media (pointer: fine) {
          html, body, a, button, input, textarea, select, [role="button"], * {
            cursor: none !important;
          }
        }

        /* Inner Dot */
        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #ff3b4d;
          box-shadow:
            0 0 8px #ff3b4d,
            0 0 16px rgba(227, 43, 60, 0.9);
          pointer-events: none;
          z-index: 100000;
          opacity: 0;
          transition: opacity 0.25s ease, background-color 0.2s ease;
          will-change: transform;
        }

        /* Outer Smooth Neon Circle */
        .custom-cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid rgba(227, 43, 60, 0.75);
          background: rgba(227, 43, 60, 0.02);
          box-shadow:
            0 0 12px rgba(227, 43, 60, 0.45),
            inset 0 0 8px rgba(168, 45, 245, 0.2);
          pointer-events: none;
          z-index: 99999;
          opacity: 0;
          transition:
            opacity 0.25s ease,
            border-color 0.2s ease,
            background-color 0.2s ease,
            box-shadow 0.2s ease;
          will-change: transform;
        }

        /* Ring Hover State (Over links, buttons, cards) */
        .cursor-ring--hover {
          border-color: rgba(255, 60, 80, 0.95);
          background: rgba(227, 43, 60, 0.08);
          box-shadow:
            0 0 20px rgba(227, 43, 60, 0.7),
            0 0 35px rgba(138, 43, 226, 0.4),
            inset 0 0 12px rgba(227, 43, 60, 0.3);
        }

        /* Ring Click / Active State */
        .cursor-ring--active {
          border-color: #00f0ff;
          background: rgba(0, 240, 255, 0.12);
          box-shadow:
            0 0 18px rgba(0, 240, 255, 0.8),
            inset 0 0 10px rgba(0, 240, 255, 0.4);
        }
      `}</style>
    </>
  )
}
