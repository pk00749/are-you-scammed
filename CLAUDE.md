# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**骗了吗 (Are You Scammed?)** — A Chinese internet scam pattern database. Users paste suspected scam text to match against known scam patterns and receive red flag analysis.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Search | Supabase full-text search |
| Deployment | Vercel |
| Icons | Lucide React |

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm test             # Run tests
npm test -- --watch  # Run tests in watch mode (single file: npm test -- path/to/file.test.ts)
```

## Development Requirements

1. **Unit tests required** — Every feature must have corresponding unit tests before moving to the next phase.
2. **Phase-based commits** — After completing and testing each phase, commit the changes before starting the next phase.
3. **Independent phases** — Each phase must be able to run independently without relying on subsequent phases.

## Architecture

### Directory Structure

```
src/app/
├── page.tsx                    # Homepage (search, categories, hot scams)
├── search/page.tsx             # Search results
├── scam/[slug]/page.tsx        # Scam detail page
├── category/[slug]/page.tsx    # Category browsing
├── contribute/page.tsx         # User contribution form
├── api/
│   └── scams/route.ts         # API route
├── layout.tsx
└── globals.css

src/components/                 # UI components
src/lib/                       # Utilities (supabase, search, share)
src/data/                      # Seed data
src/types/                     # TypeScript types
```

### Key Pages

- **Homepage** — Search bar, category grid, hot scams list, tag cloud
- **Search** — Full-text search matching scam scripts/keywords
- **Scam Detail** — Red flag comparison table, case list, share buttons
- **Category** — Browse scams by category (10 major types)
- **Contribute** — User submission form with admin review

### Data Model

- **Scam**: title, slug, category, tags, severity, amountRange, scripts, redFlags, cases, actions, sourceUrl, viewCount, hotScore
- **10 Categories**: Customer impersonation, "pig butchering" romance scams, fake shopping, job scams, fake police/gov, prepaid cards, loans, elderly health, marriage彩礼, life services
