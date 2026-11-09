# CURS3XR — Universal Premium Portfolio

A production-quality personal portfolio engineered for **CURS3XR** (Independent Security Researcher & Professional Web Developer). Built in strict accordance with the **Master Development Specification** and inspired by the high-aesthetic editorial composition of the reference design.

---

## ✦ Brand & Visual Direction

- **Disciplines**: Offensive Security & Modern Web Engineering
- **Aesthetic**: Dark Gothic Editorial × Underground Cybersecurity × Premium Developer Portfolio
- **Color Palette**:
  - Primary Background: `#090909`
  - Secondary Surface: `#111111`
  - Cards & Blocks: `#141414`
  - Blood Crimson Accent: `#E32B3C`
  - Border System: `#242424`
  - Primary Text: `#F2EFEB`
  - Muted Text: `#858585`
- **Typography**:
  - Headlines: `Anton` (Display Condensed)
  - Body: `Manrope` (Clean Grotesque)
  - Editorial Accents: `Caveat` (Handwritten Quotes)
  - Shell / Console: `JetBrains Mono`

---

## ✦ Core Features & Modules

1. **Editorial Hero Section**:
   - Asymmetric layout featuring the authentic transparent portrait (`public/assets/portrait.png`).
   - Triple-impact display headlines (`I BUILD. I BREAK. I UNDERSTAND.`).
   - OpSec verified badges, real-time availability indicator (`Open to Collaborations`), and quick CTAs.
2. **Behind the CURS3XR Identity (About)**:
   - Verbatim biography and gray-hat ethos.
   - Core philosophy callout: *"Curiosity is the original sin."*
   - Editorial discipline cards covering Adversarial Mindset, Precision Recon, and Craftsmanship.
3. **Cybersecurity Expertise**:
   - Attack surface breakdown: Red Teaming, Exploit Research, Penetration Testing, OSINT, Web Security, Reconnaissance, and Forensics.
   - Transparently designated study areas (**OSEP** and **OSEE** tracks) with zero fabricated credentials or proficiency percentages.
4. **Web Engineering**:
   - Comprehensive presentation of full-stack, frontend, and UI/UX design capabilities to attract high-value commercial clients.
5. **Technical Arsenal & Skills**:
   - Discrete, honest tool and technology breakdown without fake progress bars.
6. **Selected Work / Portfolio**:
   - Category filtering (`ALL`, `WEB DEV`, `SECURITY RESEARCH`, `EXPERIMENTS`, `TOOLS`).
   - Search filter and modal dialog system.
   - Authentic disclosure state linking directly to GitHub repositories.
7. **Interactive Reduced-Shell Terminal**:
   - Minimalist console supporting safe commands: `help`, `about`, `skills`, `projects`, `socials`, `contact`, and `clear`.
8. **Interactive Cyber Swarm**:
   - Standalone canvas particle system with mouse interaction, toggleable via the top navigation `SWARM` button and fully compatible with reduced-motion mode.
9. **Contact & Dispatch**:
   - Working contact form with validation and `mailto:` action fallback.
   - Direct encrypted communication channels (Email, Instagram, Telegram, Threads, Facebook, GitHub).

---

## ✦ Local Development & Build

### Prerequisites
- Node.js 18+ (tested on Node v26)
- npm 9+

### Commands

```bash
# Navigate to project
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Produce production build
npm run build

# Preview production build locally
npm run preview
```

---

## ✦ Vercel Deployment Guide

1. Push this folder or repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial CURS3XR portfolio build"
   git branch -M main
   git remote add origin https://github.com/the-real-elliot/<repo-name>.git
   git push -u origin main
   ```
2. Open [Vercel Dashboard](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Configure Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (or `portfolio` if in a monorepo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your portfolio will be live with full SSL, global CDN, and zero configuration.

---

## ✦ Personalization & Editing Guide

All personal and brand data is decoupled from the UI components:

| Location | Purpose |
|---|---|
| `src/config/site.js` | Single source of truth for name, headlines, quotes, email, socials, availability, and tools. |
| `src/data/projects.js` | Schema to add real case studies, screenshots, and live demo links. |
| `src/data/experience.js` | Chronology of technical research milestones and independent engagements. |
| `public/assets/portrait.png` | Transparent personal portrait asset. |
