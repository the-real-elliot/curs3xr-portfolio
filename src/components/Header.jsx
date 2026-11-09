import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '../config/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = ['home', 'work', 'about', 'expertise', 'experience', 'terminal', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'WORK', href: '#work' },
    { name: 'ABOUT', href: '#about' },
    { name: 'EXPERTISE', href: '#expertise' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'TERMINAL', href: '#terminal' },
    { name: 'CONTACT', href: '#contact' },
  ]

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(9, 9, 9, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        {/* Brand Wordmark */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }} aria-label="CURS3XR Home">
          <div style={{
            width: '28px',
            height: '28px',
            backgroundColor: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
          }}>
            <div style={{ width: '8px', height: '8px', background: '#090909' }} />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.65rem',
            letterSpacing: '0.08em',
            color: 'var(--text-primary)'
          }}>
            {siteConfig.identity.displayName}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <a
                key={link.name}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                  padding: '4px 0'
                }}
                className="nav-link"
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--accent)'
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Controls & CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Contact Direct CTA */}
          <a
            href="#contact"
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.4rem',
              fontSize: '0.8rem',
              display: 'none'
            }}
            id="desktop-contact-cta"
          >
            <span>DISCUSS ENGAGEMENT</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="mobile-hamburger"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              padding: '0.5rem'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-color)',
              overflow: 'hidden'
            }}
          >
            <div className="container" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    letterSpacing: '0.05em',
                    color: activeSection === link.href.replace('#', '') ? 'var(--accent)' : 'var(--text-primary)'
                  }}
                >
                  {link.name}
                </a>
              ))}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.8rem', justifyContent: 'center' }}
                >
                  <span>INITIATE CONTACT</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav { display: flex !important; }
          #desktop-contact-cta { display: inline-flex !important; }
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </header>
  )
}
