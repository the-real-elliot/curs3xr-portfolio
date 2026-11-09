import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Cybersecurity from './components/Cybersecurity'
import WebDev from './components/WebDev'
import Skills from './components/Skills'
import ProjectGrid from './components/ProjectGrid'
import ProjectDialog from './components/ProjectDialog'
import Experience from './components/Experience'
import Terminal from './components/Terminal'
import SwarmCanvas from './components/SwarmCanvas'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [motionEnabled, setMotionEnabled] = useState(() => {
    const saved = localStorage.getItem('curs3xr_motion_pref')
    if (saved !== null) return saved === 'true'
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  const [swarmActive, setSwarmActive] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    localStorage.setItem('curs3xr_motion_pref', String(motionEnabled))
    if (!motionEnabled) {
      document.documentElement.setAttribute('data-motion', 'off')
    } else {
      document.documentElement.removeAttribute('data-motion')
    }
  }, [motionEnabled])

  return (
    <div className="portfolio-app">
      {/* Subtle Analog Grain Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Interactive Cyber Swarm Particles (Toggleable via top header) */}
      <SwarmCanvas active={swarmActive} motionEnabled={motionEnabled} />

      {/* Persistent Navigation */}
      <Header
        motionEnabled={motionEnabled}
        setMotionEnabled={setMotionEnabled}
        swarmActive={swarmActive}
        setSwarmActive={setSwarmActive}
      />

      {/* Main Content Flow */}
      <main id="main-content">
        <Hero motionEnabled={motionEnabled} />
        <About motionEnabled={motionEnabled} />
        <Cybersecurity motionEnabled={motionEnabled} />
        <WebDev motionEnabled={motionEnabled} />
        <Skills motionEnabled={motionEnabled} />
        <ProjectGrid onSelectProject={setSelectedProject} motionEnabled={motionEnabled} />
        <Experience motionEnabled={motionEnabled} />
        <Terminal motionEnabled={motionEnabled} />
        <Contact motionEnabled={motionEnabled} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Modal Dialog */}
      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        motionEnabled={motionEnabled}
      />
    </div>
  )
}
