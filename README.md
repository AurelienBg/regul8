# Regul8

**Navigate crypto regulation. Anywhere.**

Regul8 is a bilingual (FR/EN) SaaS web app that helps any startup (Web2, Web3, crypto, blockchain) understand which regulations, licences, and compliance obligations apply to them globally.

## Features

- **Guided Wizard** — 4-step questionnaire covering 13 activity types x 8 jurisdictions
- **AI-Powered Search** — Ask any compliance question, get streaming answers from Claude
- **Jurisdiction Comparator** — Side-by-side comparison of regulatory frameworks
- **Regulatory Glossary** — 60+ terms with categories and cross-references
- **XRPL Hub** — Deep coverage of XRPL-specific features and 10 custody implementations
- **Bilingual** — Full FR/EN support via next-intl

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- next-intl (i18n)
- Anthropic Claude API (claude-sonnet-4-6)
- Vercel deployment

## Setup

```bash
git clone <repo-url>
cd regul8
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

## Deploy

Push to GitHub and connect to Vercel. Environment variable required:
- `ANTHROPIC_API_KEY`

## Architecture

- `src/data/regulations.ts` — Full decision tree (13 activities x 8 jurisdictions)
- `src/data/glossary.ts` — 60+ regulatory terms
- `src/data/xrpl.ts` — XRPL knowledge base
- `src/data/custody-xrpl.ts` — 10 XRPL custody implementations
- `src/lib/claude.ts` — Anthropic API client
- `src/lib/regulations-lookup.ts` — Decision tree lookup
- `src/app/api/analyze/` — Wizard -> Claude enriched report
- `src/app/api/search/` — Streaming AI search
- `src/messages/` — FR/EN translations

## Adding a New Jurisdiction

1. Add the code to `Jurisdiction` type in `src/types/index.ts`
2. Add entry in `JURISDICTIONS` constant
3. Add regulation data for each activity in `src/data/regulations.ts`
4. Add XRP legal status note in `src/data/xrpl.ts`

## Adding a New Activity

1. Add the key to `ActivityKey` type in `src/types/index.ts`
2. Add entry in `ACTIVITIES` constant
3. Add regulation data for each jurisdiction in `src/data/regulations.ts`
4. Add subtypes in `src/components/wizard/StepSubtype.tsx`
5. Add translation keys in `src/messages/en.json` and `fr.json`
