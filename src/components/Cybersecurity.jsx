import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Target, Search, Terminal, AlertTriangle, Bug, Cpu, FileSearch, CheckCircle2, ChevronRight, Lock } from 'lucide-react'

export default function Cybersecurity({ motionEnabled }) {
  const [selectedCategory, setSelectedCategory] = useState(0)

  const disciplines = [
    {
      title: "RED TEAMING",
      icon: Target,
      tag: "ADVERSARY SIMULATION",
      items: [
        "Adversary simulation & threat-actor emulation",
        "Attack-path analysis & credential pivoting",
        "Comprehensive security assessments",
        "Defense validation & control verification",
        "Adversarial methodology & engagement scoping"
      ]
    },
    {
      title: "EXPLOIT RESEARCH",
      icon: Bug,
      tag: "VULNERABILITY RESEARCH",
      items: [
        "Vulnerability analysis & root-cause triaging",
        "Exploit fundamentals & execution flows",
        "Proof-of-concept (PoC) development",
        "Technical security research in isolated labs",
        "Exploitation methodology & payload craft"
      ]
    },
    {
      title: "PENETRATION TESTING",
      icon: Shield,
      tag: "SECURITY TESTING",
      items: [
        "Web application security audits",
        "Infrastructure & network perimeter security",
        "Vulnerability identification & risk rating",
        "Executive & technical security reporting",
        "Authentication & authorization boundary testing"
      ]
    },
    {
      title: "OSINT & INTELLIGENCE",
      icon: Search,
      tag: "RECONNAISSANCE",
      items: [
        "Open-source intelligence gathering",
        "Digital footprint analysis & infrastructure linkage",
        "Reconnaissance across public-facing assets",
        "Information correlation & threat profiling",
        "Public-source research & asset enumeration"
      ]
    },
    {
      title: "WEB SECURITY",
      icon: Lock,
      tag: "APPSEC DEFENSE",
      items: [
        "Web application vulnerability deep-dives",
        "Session management & token invalidation flaws",
        "Authentication bypass & brute-force testing",
        "Authorization & IDOR testing",
        "Modern application security testing (SAST/DAST logic)"
      ]
    },
    {
      title: "RECONNAISSANCE",
      icon: Terminal,
      tag: "ATTACK-SURFACE",
      items: [
        "Perimeter asset discovery & DNS mapping",
        "Attack-surface cartography & ASN analysis",
        "Information gathering via automated crawlers",
        "Methodical reconnaissance pipelines"
      ]
    },
    {
      title: "DIGITAL FORENSICS",
      icon: FileSearch,
      tag: "INCIDENT ANALYSIS",
      items: [
        "Investigation fundamentals & timeline reconstruction",
        "Evidence analysis & forensic disk triage",
        "Incident research & threat attribution"
      ]
    }
  ]

  const studyAreas = [
    {
      title: "OSEP STUDY AREA",
      subtitle: "Offensive Security Experienced Penetration Tester Curriculum",
      description: "Dedicated independent technical study focusing on bypassing contemporary endpoint protections, in-memory payload staging, process injection, and active directory enumeration techniques.",
      topics: ["Client-side code execution", "Process injection & API hooking", "Antivirus evasion principles", "Lateral movement"]
    },
    {
      title: "OSEE STUDY AREA",
      subtitle: "Offensive Security Exploitation Expert Curriculum",
      description: "Advanced study track exploring user-mode binary exploitation, heap manipulation, ROP chain crafting, and modern kernel/memory mitigation strategies.",
      topics: ["Structured Exception Handler (SEH) exploitation", "Bypassing DEP & ASLR", "Precision heap spraying", "Custom shellcode engineering"]
    }
  ]

  return (
    <section id="expertise" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <div className="section-label">02 / OFFENSIVE SECURITY</div>
          <h2 className="section-title">UNDERSTANDING THE ATTACK SURFACE.</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Rigorous offensive methodologies focused on identifying how security boundaries break before adversarial actors can exploit them.
          </p>
        </div>

        {/* Interactive Discipline Grid */}
        <div className="security-grid">
          {disciplines.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="discipline-box">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div className="discipline-badge">{item.tag}</div>
                  <Icon size={20} color="var(--accent)" />
                </div>
                <h3 className="discipline-title">{item.title}</h3>
                <ul className="discipline-list">
                  {item.items.map((line, i) => (
                    <li key={i}>
                      <span className="dot" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* OSEP & OSEE Study Tracks (Explicitly presented as Study Areas per Section 10) */}
        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Cpu size={18} color="var(--accent)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '0.12em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
              ADVANCED RESEARCH & STUDY AREAS (NON-CERTIFICATION CURRICULA)
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {studyAreas.map((study) => (
              <div
                key={study.title}
                style={{
                  background: 'rgba(20, 20, 20, 0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--border-color)',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45)',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', border: '1px solid rgba(227, 43, 60, 0.3)', borderRadius: '6px', padding: '0.2rem 0.6rem', background: 'rgba(227, 43, 60, 0.08)' }}>
                  ACTIVE LAB STUDY
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', letterSpacing: '0.04em', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  {study.title}
                </h4>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent)', marginBottom: '1rem' }}>
                  {study.subtitle}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {study.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {study.topics.map((t, idx) => (
                    <span key={idx} className="badge" style={{ fontSize: '0.7rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .security-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 1.5rem;
        }

        .discipline-box {
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(14px);
          border: 1px solid var(--border-color);
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
        }

        .discipline-box:hover {
          border-color: rgba(227, 43, 60, 0.6);
          background: rgba(26, 26, 26, 0.85);
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(227, 43, 60, 0.2);
        }

        .discipline-badge {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--accent);
          letter-spacing: 0.1em;
          background: rgba(227, 43, 60, 0.08);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          border: 1px solid rgba(227, 43, 60, 0.25);
        }

        .discipline-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          letter-spacing: 0.04em;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }

        .discipline-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .discipline-list li {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          color: var(--text-muted);
          font-size: 0.88rem;
          line-height: 1.5;
        }

        .discipline-list .dot {
          width: 5px;
          height: 5px;
          background-color: var(--accent);
          flex-shrink: 0;
          border-radius: 50%;
        }

        @media (max-width: 640px) {
          .security-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
