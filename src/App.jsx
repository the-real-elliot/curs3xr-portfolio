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
  // High-end VFX & animations permanently active
  const motionEnabled = true
  const swarmActive = true
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    // Ensure reduced-motion overrides are cleared for maximum high-end fidelity
    document.documentElement.removeAttribute('data-motion')
  }, [])

  return (
    <div className="portfolio-app">
      {/* Subtle Analog Grain Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Interactive Cyber Swarm Particles (Always active) */}
      <SwarmCanvas active={swarmActive} motionEnabled={motionEnabled} />

      {/* Persistent Clean Navigation */}
      <Header />

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
