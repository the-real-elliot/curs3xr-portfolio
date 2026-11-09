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

  const menuContainerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(9, 9, 9, 0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(227, 43, 60, 0.2)' : '1px solid transparent',
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
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            boxShadow: '0 0 15px rgba(227, 43, 60, 0.6)'
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
                      backgroundColor: 'var(--accent)',
                      boxShadow: '0 0 10px var(--accent)'
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

          {/* Mobile Menu Hamburger with Rotation Transition */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="mobile-hamburger"
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              padding: '0.6rem'
            }}
          >
            {mobileMenuOpen ? <X size={24} className="text-accent" /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* High-End Mobile Drawer Menu with Staggered Entrance */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              backgroundColor: 'rgba(9, 9, 9, 0.96)',
              backdropFilter: 'blur(30px)',
              borderBottom: '1px solid rgba(227, 43, 60, 0.3)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
              overflow: 'hidden'
            }}
          >
            <div className="container" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  variants={menuItemVariants}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.85rem',
                    letterSpacing: '0.06em',
                    color: activeSection === link.href.replace('#', '') ? 'var(--accent)' : 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.2rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
                  }}
                >
                  <span>{link.name}</span>
                  {activeSection === link.href.replace('#', '') && (
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
                  )}
                </motion.a>
              ))}

              <motion.div
                variants={menuItemVariants}
                style={{ paddingTop: '1rem' }}
              >
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.9rem', justifyContent: 'center', fontSize: '0.9rem' }}
                >
                  <span>INITIATE CONTACT</span>
                  <ArrowUpRight size={16} />
                </a>
              </motion.div>
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
