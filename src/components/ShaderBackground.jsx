import React, { useEffect, useRef, useState } from 'react'

/**
 * ShaderBackground - Ultra-high-performance GPU canvas shader background
 * - 0% CSS blur filters, 0% CPU pixel loop overhead
 * - Uses native GPU-accelerated Canvas2D radial gradients & vector paths
 * - Activates exclusively AFTER scrolling down past the landing page
 * - Renders dynamic chromatic energy plasma and cybernetic grid telemetry with silky 60/120fps
 */
export default function ShaderBackground({ motionEnabled = true }) {
  const canvasRef = useRef(null)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    // Fade in shader background only after user scrolls past landing page
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY < 180) {
        setOpacity(0)
      } else {
        const factor = Math.min(1, Math.max(0, (scrollY - 180) / 450))
        setOpacity(factor * 0.85)
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
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let time = 0
    let width = 0
    let height = 0

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    // Interactive mouse attractor
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 }
    const onMouseMove = (e) => {
      mouse.targetX = e.clientX / window.innerWidth
      mouse.targetY = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Track scroll velocity for kinetic scroll-mapping animation
    let lastScrollY = window.scrollY
    let scrollVelocity = 0
    const onScroll = () => {
      const currentY = window.scrollY
      scrollVelocity = (currentY - lastScrollY) * 0.12
      lastScrollY = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const render = () => {
      // If user is at top landing page, pause render to save 100% resources
      if (window.scrollY < 120) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      time += 0.008
      scrollVelocity *= 0.94 // Smooth kinetic dampening
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      ctx.clearRect(0, 0, width, height)

      const scrollY = window.scrollY
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const scrollProgress = Math.min(1, Math.max(0, scrollY / docHeight))

      // ── 1. Native GPU Soft Radial Chromatic Energy Orbs (Scroll Mapped) ──
      // Orb 1: Rich Crimson Plasma (drifting top-right to center with scroll velocity)
      const orb1X = width * (0.65 + 0.15 * Math.sin(time * 0.7 + scrollProgress * 2))
      const orb1Y = height * (0.35 + 0.15 * Math.cos(time * 0.6)) - scrollVelocity * 4
      const orb1R = Math.min(width, height) * 0.55
      const g1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, orb1R)
      g1.addColorStop(0, 'rgba(227, 43, 60, 0.18)')
      g1.addColorStop(0.5, 'rgba(180, 20, 45, 0.07)')
      g1.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, width, height)

      // Orb 2: Cosmic Violet Radiance (drifting left to bottom-center with scroll velocity)
      const orb2X = width * (0.28 + 0.12 * Math.cos(time * 0.5))
      const orb2Y = height * (0.62 + 0.15 * Math.sin(time * 0.6 + scrollProgress * 3)) + scrollVelocity * 4
      const orb2R = Math.min(width, height) * 0.6
      const g2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, orb2R)
      g2.addColorStop(0, 'rgba(138, 43, 226, 0.22)')
      g2.addColorStop(0.5, 'rgba(90, 15, 175, 0.08)')
      g2.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, width, height)

      // Orb 3: Electric Cyan/Blue Focus (reacting to interactive mouse position)
      const orb3X = width * (mouse.x * 0.6 + 0.2)
      const orb3Y = height * (mouse.y * 0.6 + 0.2)
      const orb3R = Math.min(width, height) * 0.45
      const g3 = ctx.createRadialGradient(orb3X, orb3Y, 0, orb3X, orb3Y, orb3R)
      g3.addColorStop(0, 'rgba(0, 195, 255, 0.12)')
      g3.addColorStop(0.6, 'rgba(30, 80, 240, 0.04)')
      g3.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = g3
      ctx.fillRect(0, 0, width, height)

      // ── 2. Subtle Digital Cybernetic Grid Telemetry (Scroll Mapped) ──
      const gridSize = 72
      const offsetX = (time * 12) % gridSize
      const offsetY = (scrollY * 0.25 + scrollVelocity * 8) % gridSize

      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.022)'
      ctx.lineWidth = 1

      // Vertical subtle grid lines
      for (let x = offsetX; x < width; x += gridSize) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }
      // Horizontal subtle grid lines with kinetic scroll offset
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
      }
      ctx.stroke()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
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
        transition: 'opacity 0.5s ease'
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block'
        }}
      />
    </div>
  )
}
