import React, { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, Maximize2, Minimize2, CornerDownLeft, Shield } from 'lucide-react'
import { siteConfig } from '../config/site'

export default function Terminal({ motionEnabled }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'CURS3XR SEC-SHELL [v2.4.0-release]' },
    { type: 'system', text: 'Type "help" to list available inspection commands.' },
    { type: 'system', text: '---------------------------------------------------' }
  ])
  const [inputVal, setInputVal] = useState('')
  const terminalEndRef = useRef(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (e) => {
    e.preventDefault()
    const cmd = inputVal.trim().toLowerCase()
    if (!cmd) return

    const newHistory = [...history, { type: 'user', text: `curs3xr@surface:~$ ${inputVal}` }]

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  help      - Display this command index
  about     - Identity, positioning & gray-hat ethos
  skills    - Output verified offensive & development capabilities
  projects  - Query portfolio database and GitHub status
  socials   - Output verified communication endpoints
  contact   - Direct inquiries email and guidelines
  clear     - Wipe shell screen buffer`
        })
        break

      case 'about':
        newHistory.push({
          type: 'output',
          text: `NAME: ${siteConfig.identity.displayName}
PROFESSION: ${siteConfig.identity.profession}
LOCATION: ${siteConfig.identity.location}
STATUS: ${siteConfig.identity.availability}

"${siteConfig.identity.about}"

QUOTES:
› "${siteConfig.identity.quotes.featured}"
› "${siteConfig.identity.quotes.secondary}"`
        })
        break

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `CYBERSECURITY DISCIPLINES:
  [+] Red Teaming & Adversary Simulation
  [+] Exploit Research & Vulnerability Analysis
  [+] Web Application Security & Authorization
  [+] OSINT & Attack Surface Reconnaissance
  [+] Advanced Study Areas: OSEP / OSEE Syllabus Tracks

DEVELOPMENT ARSENAL:
  [+] React, Modern JavaScript (ESNext), Node.js
  [+] High-Performance Vanilla CSS & Fluid Typography
  [+] Secure API Integrations & Real-Time Dashboards`
        })
        break

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `PORTFOLIO RECORDS:
  Active public case studies are linked to open GitHub repositories:
  › ${siteConfig.contact.github}
  Proprietary client security audits remain confidential under NDA.`
        })
        break

      case 'socials':
        newHistory.push({
          type: 'output',
          text: `COMMUNICATION CHANNELS:
  [+] Instagram: ${siteConfig.contact.instagram}
  [+] Telegram:  ${siteConfig.contact.telegram}
  [+] Threads:   ${siteConfig.contact.threads}
  [+] Facebook:  ${siteConfig.contact.facebook}
  [+] GitHub:    ${siteConfig.contact.github}`
        })
        break

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `DIRECT DISPATCH:
  Email: ${siteConfig.contact.email}
  Heading: ${siteConfig.contact.heading}
  Guideline: Open for authorized assessments, web development, and technical discussions.`
        })
        break

      case 'clear':
        setHistory([])
        setInputVal('')
        return

      default:
        newHistory.push({
          type: 'error',
          text: `zsh: command not found: ${cmd}. Type "help" for permitted directives.`
        })
        break
    }

    setHistory(newHistory)
    setInputVal('')
  }

  return (
    <section id="terminal" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
          <div className="section-label">07 / INTERACTIVE CONSOLE</div>
          <h2 className="section-title">REDUCED-SHELL INTERFACE.</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            A lightweight, simulated terminal environment providing direct access to configuration records, technical competencies, and communication vectors.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div className="terminal-window">
          {/* Title Bar */}
          <div className="terminal-topbar">
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#888', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Shield size={12} color="var(--accent)" />
              <span>curs3xr@surface: ~/inspect (sec-sh)</span>
            </div>

            <div style={{ width: '40px' }} />
          </div>

          {/* Terminal Screen Body */}
          <div className="terminal-body" onClick={() => document.getElementById('terminal-input')?.focus()}>
            {history.map((line, idx) => (
              <div key={idx} className={`term-line term-${line.type}`}>
                <pre style={{ margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {line.text}
                </pre>
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleCommand} style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', marginRight: '0.5rem', userSelect: 'none' }}>
                curs3xr@surface:~$
              </span>
              <input
                id="terminal-input"
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                autoComplete="off"
                spellCheck="false"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)'
                }}
                aria-label="Terminal command prompt"
              />
            </form>
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Helper Footer */}
          <div className="terminal-footer">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['help', 'about', 'skills', 'projects', 'socials', 'contact', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setInputVal(cmd)
                  }}
                  className="badge"
                  style={{ cursor: 'pointer', fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                >
                  {cmd}
                </button>
              ))}
            </div>
            <span style={{ fontSize: '0.72rem', color: '#555', fontFamily: 'var(--font-mono)' }}>
              Press Enter ↵ to execute
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .terminal-window {
          background: #080808;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 45px rgba(227, 43, 60, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          max-width: 900px;
          margin: 0 auto;
        }

        .terminal-topbar {
          background: #111;
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
        }

        .terminal-body {
          padding: 1.5rem;
          min-height: 280px;
          max-height: 420px;
          overflow-y: auto;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          line-height: 1.6;
        }

        .term-line {
          margin-bottom: 0.4rem;
        }

        .term-system {
          color: #777;
        }

        .term-user {
          color: var(--accent);
          font-weight: 600;
        }

        .term-output {
          color: #e0e0e0;
        }

        .term-error {
          color: #ff5f56;
        }

        .terminal-footer {
          background: #0e0e0e;
          padding: 0.75rem 1.25rem;
          border-top: 1px solid #1a1a1a;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
      `}</style>
    </section>
  )
}
