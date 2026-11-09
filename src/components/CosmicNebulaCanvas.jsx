import React, { useRef, useEffect } from 'react'

export default function CosmicNebulaCanvas({ motionEnabled = true, isMobile = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let time = 0

    // Canvas sizing
    const size = isMobile ? 500 : 820
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    // 6 Fluid Cosmic Plasma Orbs with distinct harmonic frequencies and base hues
    const orbs = [
      // 1. Primary Cosmic Violet / Purple Core
      { xBase: 0.40, yBase: 0.45, radius: size * 0.42, baseHue: 275, speedX: 0.016, speedY: 0.014, ampX: size * 0.14, ampY: size * 0.12, phase: 0 },
      // 2. Electric Royal Blue Core
      { xBase: 0.60, yBase: 0.50, radius: size * 0.40, baseHue: 220, speedX: 0.019, speedY: 0.017, ampX: size * 0.15, ampY: size * 0.13, phase: 1.6 },
      // 3. Electric Cyan Neon Flare
      { xBase: 0.54, yBase: 0.34, radius: size * 0.35, baseHue: 195, speedX: 0.022, speedY: 0.020, ampX: size * 0.16, ampY: size * 0.11, phase: 3.2 },
      // 4. Vivid Magenta / Cosmic Pink Flare
      { xBase: 0.36, yBase: 0.38, radius: size * 0.36, baseHue: 310, speedX: 0.018, speedY: 0.023, ampX: size * 0.13, ampY: size * 0.14, phase: 4.4 },
      // 5. Deep Cosmic Crimson Ambient Edge
      { xBase: 0.50, yBase: 0.66, radius: size * 0.44, baseHue: 350, speedX: 0.014, speedY: 0.016, ampX: size * 0.12, ampY: size * 0.10, phase: 5.8 },
      // 6. Volumetric Center Pulse Orb
      { xBase: 0.50, yBase: 0.45, radius: size * 0.30, baseHue: 250, speedX: 0.025, speedY: 0.021, ampX: size * 0.08, ampY: size * 0.09, phase: 2.5 }
    ]

    // Celestial Stardust Embers swirling in the cosmic vortex
    const particleCount = isMobile ? 18 : 36
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * size,
      y: Math.random() * size,
      radius: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.6 + 0.25,
      speedX: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.6 + 0.25,
      hueOffset: Math.random() * 80
    }))

    const render = () => {
      // Advance time for continuous smooth loop
      time += motionEnabled ? 1 : 0

      ctx.clearRect(0, 0, size, size)

      // Screen blend mode for vibrant volumetric light addition
      ctx.globalCompositeOperation = 'screen'

      // ── CONTINUOUS COLOR MOTION LOOP ──
      // Dynamic chromatic oscillation: smoothly sweeps through the cosmic spectrum
      // Electric Blue (210°) -> Sapphire (240°) -> Violet (275°) -> Magenta (315°) -> Crimson (350°) -> Back
      const globalHueShift = Math.sin(time * 0.012) * 45 + (Math.sin(time * 0.005) * 20)

      // Render each moving, swirling, breathing cosmic orb
      orbs.forEach((orb) => {
        // Harmonic Lissajous fluid position
        const x = orb.xBase * size + Math.sin(time * orb.speedX + orb.phase) * orb.ampX
        const y = orb.yBase * size + Math.cos(time * orb.speedY + orb.phase * 1.2) * orb.ampY
        
        // Dynamic breathing radius
        const r = orb.radius * (1 + Math.sin(time * 0.02 + orb.phase) * 0.18)

        // Dynamic shifting hue
        const currentHue = (orb.baseHue + globalHueShift + 360) % 360

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r)
        gradient.addColorStop(0, `hsla(${currentHue}, 96%, 62%, 0.72)`)
        gradient.addColorStop(0.35, `hsla(${currentHue}, 92%, 52%, 0.45)`)
        gradient.addColorStop(0.65, `hsla(${currentHue}, 88%, 42%, 0.16)`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      })

      // Render swirling cosmic stardust motes
      particles.forEach((p) => {
        p.y -= p.speedY
        p.x += Math.sin(time * 0.03 + p.x) * 0.45

        if (p.y < 0) {
          p.y = size + 10
          p.x = Math.random() * size
        }

        const particleHue = (240 + globalHueShift + p.hueOffset + 360) % 360

        const pGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5)
        pGradient.addColorStop(0, `hsla(${particleHue}, 95%, 78%, ${p.alpha})`)
        pGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = pGradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2)
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
        width: isMobile ? '480px' : '780px',
        height: isMobile ? '480px' : '780px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        filter: isMobile ? 'blur(40px)' : 'blur(50px)',
        opacity: 0.95,
        mixBlendMode: 'screen',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  )
}
