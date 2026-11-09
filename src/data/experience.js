/**
 * Timeline / Milestones Schema
 * Section 13: "Preserve the original PDF's expandable timeline. Use it for independent projects,
 * technical learning milestones, verified professional engagements, real development experience
 * and genuine security research milestones. Do not fabricate companies, job titles, dates or clients."
 */

export const milestones = [
  {
    period: "2024 — PRESENT",
    title: "Offensive Security Research & Binary Exploitation",
    discipline: "Security Research",
    location: "Independent Research",
    summary: "Deep-dive focus into OSEP & OSEE syllabus topics, memory corruption fundamentals, and advanced EDR evasions.",
    details: [
      "In-depth analysis of user-mode hooking, API unhooking, and direct syscall invocations.",
      "Auditing web application authorization boundaries, GraphQL endpoints, and SSRF attack vectors.",
      "Developing private exploit proof-of-concepts and automated reconnaissance tooling in isolated lab environments."
    ]
  },
  {
    period: "2023 — 2024",
    title: "Bespoke Web Engineering & Modern Architectures",
    discipline: "Digital Engineering",
    location: "Client & Independent Projects",
    summary: "Engineering responsive web interfaces, custom React client experiences, and secure API backends.",
    details: [
      "Architected lightweight front-ends with high Core Web Vitals, accessible semantic markup, and bespoke styling.",
      "Integrated secure authentication protocols, CORS policies, and rate-limited backend services.",
      "Focused on high-touch micro-interactions, dark gothic aesthetics, and performance optimization."
    ]
  },
  {
    period: "2022 — 2023",
    title: "OSINT Frameworks & Network Reconnaissance",
    discipline: "Adversarial Methodology",
    location: "Security Lab",
    summary: "Exploration of open-source intelligence methods, passive information gathering, and digital footprint mapping.",
    details: [
      "Built custom automated scrapers for domain infrastructure and certificate transparency monitoring.",
      "Practiced network perimeter audits, port scanning analysis, and threat modeling exercises."
    ]
  }
]
