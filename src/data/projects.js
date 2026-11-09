/**
 * Projects Schema and Repository
 * Note: Authentic records only. As specified in Master Development Specification Section 08:
 * "No projects have been supplied yet. Build the complete editable data structure,
 * but do not invent completed projects, clients or achievements. If the project list is empty,
 * show a polished empty state or omit project cards gracefully. Never display fake portfolio content publicly."
 *
 * To add a project, simply uncomment or append an object following this schema:
 */

export const categories = [
  "ALL",
  "01. WEB DEVELOPMENT",
  "02. SECURITY RESEARCH",
  "03. EXPERIMENTS",
  "04. TOOLS & UTILITIES"
]

export const projects = [
  /*
  {
    id: "recon-framework",
    title: "Automated OSINT & Attack Surface Pipeline",
    category: "04. TOOLS & UTILITIES",
    year: "2025",
    summary: "Asynchronous reconnaissance engine mapping subdomain topologies and DNS asset trails.",
    description: "Designed and engineered an automated reconnaissance pipeline that ingests domain targets, parses certificate transparency logs, correlates ASN allocations, and monitors changes in exposed perimeter assets.",
    role: "Lead Security Researcher & Developer",
    tools: ["Python", "AsyncIO", "Docker", "Sublist3r", "PostgreSQL"],
    coverImage: "/assets/projects/recon-pipeline.webp",
    gallery: [],
    liveUrl: "",
    sourceUrl: "https://github.com/the-real-elliot",
    featured: true
  }
  */
]
