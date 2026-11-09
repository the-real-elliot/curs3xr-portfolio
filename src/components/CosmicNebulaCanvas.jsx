import React, { useRef, useEffect } from 'react'

export default function CosmicNebulaCanvas({ motionEnabled = true, isMobile = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let time = 0

    // High-resolution canvas sizing for crisp fluid rendering
    const size = isMobile ? 480 : 780
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    // Volumetric fluid cosmic orbs drifting in slow harmonic orbits
    const orbs = [
      // 1. Deep Cosmic Purple (Left-Center Core)
      { xBase: 0.38, yBase: 0.46, radius: size * 0.38, hue: 278, sat: 92, light: 55, speedX: 0.00032, speedY: 0.00028, phase: 0 },
      // 2. Electric Royal Blue (Right-Center Core)
      { xBase: 0.62, yBase: 0.52, radius: size * 0.36, hue: 224, sat: 95, light: 56, speedX: 0.00041, speedY: 0.00035, phase: 1.8 },
      // 3. Electric Cyan / Sky Neon (Upper Right Flare)
      { xBase: 0.56, yBase: 0.36, radius: size * 0.32, hue: 198, sat: 96, light: 54, speedX: 0.00035, speedY: 0.00042, phase: 3.2 },
      // 4. Vivid Magenta / Violet (Upper Left Flare)
      { xBase: 0.42, yBase: 0.38, radius: size * 0.34, hue: 295, sat: 88, light: 52, speedX: 0.00045, speedY: 0.00031, phase: 4.5 },
      // 5. Deep Cosmic Crimson (Perimeter Ambient Blend)
      { xBase: 0.50, yBase: 0.65, radius: size * 0.40, hue: 350, sat: 86, light: 48, speedX: 0.00028, speedY: 0.00036, phase: 5.7 }
    ]

    // Floating celestial cosmic stardust motes
    const particleCount = isMobile ? 12 : 24
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * size,
      y: Math.random() * size,
      radius: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.25 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.2,
      hue: Math.random() > 0.5 ? 275 : 215
    }))

    const render = () => {
      // Advance time very slowly for a hypnotic, pre-rendered video feel
      time += motionEnabled ? 1 : 0

      ctx.clearRect(0, 0, size, size)

      // Use screen blend mode for realistic volumetric light accumulation
      ctx.globalCompositeOperation = 'screen'

      // Slow color drift in the same shade family (purple <-> royal blue <-> cyan <-> crimson)
      const colorDrift = Math.sin(time * 0.0004) * 16

      // Render each slowly moving fluid nebula orb
      orbs.forEach((orb) => {
        const xOffset = Math.sin(time * orb.speedX + orb.phase) * (size * 0.12)
        const yOffset = Math.cos(time * orb.speedY + orb.phase * 1.3) * (size * 0.10)
        const radiusPulse = 1 + Math.sin(time * 0.0006 + orb.phase) * 0.10

        const x = orb.xBase * size + xOffset
        const y = orb.yBase * size + yOffset
        const r = orb.radius * radiusPulse

        const currentHue = (orb.hue + colorDrift + 360) % 360

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r)
        gradient.addColorStop(0, `hsla(${currentHue}, ${orb.sat}%, ${orb.light}%, 0.65)`)
        gradient.addColorStop(0.35, `hsla(${currentHue}, ${orb.sat}%, ${orb.light - 5}%, 0.38)`)
        gradient.addColorStop(0.65, `hsla(${currentHue}, ${orb.sat - 10}%, ${orb.light - 10}%, 0.12)`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      })

      // Render subtle stardust embers drifting in the cosmic field
      particles.forEach((p) => {
        p.y -= p.speedY
        p.x += Math.sin(time * 0.002 + p.x) * 0.25

        if (p.y < 0) {
          p.y = size + 10
          p.x = Math.random() * size
        }

        const pGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2)
        pGradient.addColorStop(0, `hsla(${p.hue}, 90%, 75%, ${p.alpha})`)
        pGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = pGradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalCompositeOperation = 'source-over'
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [motionEnabled, isMobile])

  return (
    <canvas
      ref={canvasRef}
      className="hero-cosmic-canvas"
      style={{
        width: isMobile ? '460px' : '720px',
        height: isMobile ? '460px' : '720px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        filter: isMobile ? 'blur(45px)' : 'blur(55px)',
        opacity: 0.92,
        mixBlendMode: 'screen',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  )
}
