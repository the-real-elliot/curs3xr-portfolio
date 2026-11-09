import React, { useEffect, useRef } from 'react'

export default function SwarmCanvas({ active, motionEnabled }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active || !motionEnabled) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Swarm particles configuration
    const particleCount = window.innerWidth < 768 ? 35 : 75
    const particles = []

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false
    }

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 1.2
        this.vy = (Math.random() - 0.5) * 1.2
        this.radius = Math.random() * 1.8 + 0.6
        this.alpha = Math.random() * 0.4 + 0.12
        this.baseAlpha = this.alpha
        // Cosmic blue, purple, and crimson particle palette
        const rand = Math.random()
        if (rand > 0.6) {
          this.color = '227, 43, 60'   // Crimson
        } else if (rand > 0.3) {
          this.color = '138, 43, 226'  // Cosmic purple
        } else {
          this.color = '30, 100, 255'  // Electric blue
        }
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0

        if (mouse.active) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            const force = (200 - dist) / 200
            this.vx += (dx / dist) * force * 0.06
            this.vy += (dy / dist) * force * 0.06
            this.alpha = Math.min(0.75, this.baseAlpha + force * 0.35)
          } else {
            this.alpha = this.baseAlpha
          }
        }

        this.vx *= 0.985
        this.vy *= 0.985
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08

      ctx.clearRect(0, 0, width, height)

      // Draw faint connections between proximate particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 85) {
            const alpha = (1 - dist / 85) * 0.1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(138, 43, 226, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      particles.forEach((p) => {
        p.update()
        p.draw()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [active, motionEnabled])

  if (!active || !motionEnabled) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1, /* Strictly behind the portrait (z-index: 5) and content */
        opacity: 0.75
      }}
    />
  )
}
