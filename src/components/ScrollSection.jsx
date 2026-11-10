import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

/**
 * ScrollSection - High-End Viewport Depth & Scroll Transition Wrapper
 * - Sections entering or leaving smoothly blur, scale and fade.
 * - The section in the middle of the screen remains in 100% crisp, sharp focus ("the middle one should be good").
 * - Optimized for 60fps GPU acceleration.
 */
export default function ScrollSection({ children, id, className = '', motionEnabled = true }) {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Smooth cinematic curve: entering (0 -> 0.25), centered focus (0.25 -> 0.75), exiting (0.75 -> 1.0)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.5, 0.78, 1],
    [0.35, 1, 1, 1, 0.35]
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.97, 1, 1, 1, 0.97]
  )

  const y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [30, 0, 0, 0, -30]
  )

  // Blur focus effect: 8px blur at edges, crystal clear 0px in middle
  // On mobile, blur is disabled to preserve battery and touch scrolling FPS
  const blurVal = useTransform(
    scrollYProgress,
    [0, 0.22, 0.5, 0.78, 1],
    isMobile ? [0, 0, 0, 0, 0] : [8, 0, 0, 0, 8]
  )

  const filter = useMotionTemplate`blur(${blurVal}px)`

  if (!motionEnabled) {
    return (
      <section id={id} className={`scroll-depth-section ${className}`}>
        {children}
      </section>
    )
  }

  return (
    <div ref={containerRef} className="scroll-depth-container">
      <motion.div
        id={id}
        className={`scroll-depth-section ${className}`}
        style={{
          opacity,
          scale,
          y,
          filter,
          transformOrigin: 'center center',
          willChange: 'transform, opacity, filter'
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
