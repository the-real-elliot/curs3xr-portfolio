import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * ScrollSection - High-End Optimized Viewport Scroll Transition Wrapper
 * - Zero blur filters to guarantee 100% butter-smooth 60/120fps scrolling with zero lag.
 * - Smooth hardware-accelerated opacity and subtle scale depth curves.
 * - The section in the middle of the screen remains at full 100% focus and opacity.
 */
export default function ScrollSection({ children, id, className = '', motionEnabled = true }) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Silky smooth opacity curve:
  // [0 -> 0.18]: gentle entrance (0.5 -> 1.0)
  // [0.18 -> 0.82]: in central screen focus (1.0)
  // [0.82 -> 1.0]: gentle exit (1.0 -> 0.5)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.5, 0.82, 1],
    [0.55, 1, 1, 1, 0.55]
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.985, 1, 1, 1, 0.985]
  )

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [16, 0, 0, 0, -16]
  )

  if (!motionEnabled) {
    return (
      <div id={id} className={`scroll-depth-wrap ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="scroll-depth-container">
      <motion.div
        id={id}
        className={`scroll-depth-wrap ${className}`}
        style={{
          opacity,
          scale,
          y,
          transformOrigin: 'center center',
          willChange: 'transform, opacity'
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
