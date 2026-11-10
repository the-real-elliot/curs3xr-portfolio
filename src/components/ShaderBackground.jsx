import React, { useEffect, useRef, useState } from 'react'

/**
 * ShaderBackground - Ultra-high-end procedural shader UI/UX background
 * - Activates exclusively AFTER scrolling down past the landing page ("not in landing page it should start after scrolling the down side..")
 * - Renders dynamic chromatic energy plasma, undulating cybernetic grid contours, and cosmic color shifts.
 * - Sub-sampled hardware acceleration (0.5x internal resolution) for 60fps locked performance.
 */
export default function ShaderBackground({ motionEnabled = true }) {
  const canvasRef = useRef(null)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    // Fade in shader background only after user scrolls past landing page
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Landing page is ~100vh (~700-900px). Transition starts at 200px and peaks at 750px
      if (scrollY < 180) {
        setOpacity(0)
      } else {
        const factor = Math.min(1, Math.max(0, (scrollY - 180) / 500))
        setOpacity(factor * 0.88)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!motionEnabled) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let animationFrameId
    let time = 0
    let scrollY = window.scrollY

    // Subsample canvas for silky smooth shader graphics at near-zero CPU/GPU overhead
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let internalWidth = 0
    let internalHeight = 0

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      // 0.5x internal resolution scaled up by CSS gives dreamy, soft raymarched quality with high performance
      const scale = w < 768 ? 0.35 : 0.5
      internalWidth = Math.floor(w * scale)
      internalHeight = Math.floor(h * scale)
      canvas.width = internalWidth
      canvas.height = internalHeight
    }

    resize()
    window.addEventListener('resize', resize)

    // Track mouse for interactive ambient bloom
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 }
    const onMouseMove = (e) => {
      mouse.targetX = e.clientX / window.innerWidth
      mouse.targetY = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const onScrollUpdate = () => {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', onScrollUpdate, { passive: true })

    // Offscreen imageData buffer
    let imgData = ctx.createImageData(internalWidth, internalHeight)

    const render = () => {
      // If user is at top landing page and opacity is 0, sleep to save 100% processing
      if (window.scrollY < 150) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      time += 0.012
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      // Check if size changed
      if (imgData.width !== internalWidth || imgData.height !== internalHeight) {
        imgData = ctx.createImageData(internalWidth, internalHeight)
      }

      const data = imgData.data
      const w = internalWidth
      const h = internalHeight

      // Page scroll progression (0.0 at top of downside to 1.0 at footer)
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const scrollProgress = Math.min(1, Math.max(0, scrollY / docHeight))

      // Dynamic color harmonics shifting by section
      // Top: Crimson + Violet | Mid: Cosmic Blue + Violet | Bottom: Neon Cyan + Crimson
      const rWeight = 0.5 + 0.4 * Math.sin(time * 0.5 + scrollProgress * 3.14)
      const gWeight = 0.15 + 0.15 * Math.sin(time * 0.4 + scrollProgress * 2.0)
      const bWeight = 0.5 + 0.4 * Math.cos(time * 0.5 + scrollProgress * 3.14)

      let ptr = 0
      const invW = 1 / w
      const invH = 1 / h

      // Compute procedural shader fields
      for (let y = 0; y < h; y++) {
        const ny = y * invH
        for (let x = 0; x < w; x++) {
          const nx = x * invW

          // Multi-frequency wave synthesis
          const wave1 = Math.sin(nx * 4.5 + time * 0.8 + scrollProgress * 3.0)
          const wave2 = Math.cos(ny * 3.8 - time * 0.6 + nx * 2.0)
          const wave3 = Math.sin((nx + ny) * 3.2 + time * 0.5)

          // Distance to interactive mouse bloom
          const mdx = nx - mouse.x
          const mdy = ny - mouse.y
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy)
          const mouseGlow = Math.max(0, 1 - mouseDist * 2.5) * 0.35

          // Cybernetic grid line modulation
          const gridX = Math.abs(Math.sin(nx * 32.0))
          const gridY = Math.abs(Math.sin(ny * 24.0 + time * 0.15))
          const grid = (gridX < 0.06 || gridY < 0.08) ? 0.08 : 0.0

          // Synthesize field intensity
          const field = (wave1 * 0.35 + wave2 * 0.35 + wave3 * 0.3) * 0.5 + 0.5
          const intensity = Math.pow(field, 2.2) + mouseGlow + grid

          // Final color mapping (Velvet Obsidian base: rgb(7, 7, 9))
          // Deep crimson: rgb(227, 43, 60), Cosmic purple: rgb(138, 43, 226), Cyan: rgb(0, 195, 255)
          const r = Math.min(255, Math.floor(7 + intensity * (160 * rWeight + 50)))
          const g = Math.min(255, Math.floor(7 + intensity * (60 * gWeight + 20)))
          const b = Math.min(255, Math.floor(9 + intensity * (180 * bWeight + 40)))

          data[ptr] = r
          data[ptr + 1] = g
          data[ptr + 2] = b
          data[ptr + 3] = 255
          ptr += 4
        }
      }

      ctx.putImageData(imgData, 0, 0)
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScrollUpdate)
    }
  }, [motionEnabled])

  return (
    <div
      className="shader-bg-root"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: opacity,
        transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
          filter: 'blur(32px) contrast(1.15)',
          transform: 'scale(1.08)'
        }}
      />
      {/* High-end cyber telemetry seam overlay across downside background */}
      <div className="shader-bg-vignette" />

      <style>{`
        .shader-bg-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 50%, transparent 40%, rgba(9, 9, 11, 0.75) 100%),
            linear-gradient(180deg, rgba(9, 9, 11, 0.8) 0%, transparent 15%, transparent 85%, rgba(9, 9, 11, 0.8) 100%);
        }
      `}</style>
    </div>
  )
}
