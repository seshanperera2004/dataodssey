# Data Odyssey 2026

Data Odyssey 2026 is a Next.js landing site for the AI & Data Science Club, General Sir John Kotelawala Defence University. The app lives in the `project/` directory and presents the inter-university data science competition and exhibition with sections for the event overview, prizes, timeline, schedule, eligibility, past events, industry impact, and partners.

## Tech Stack

- Next.js 13
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion, GSAP, Three.js, and Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
cd project
npm install
```

### Development

```bash
cd project
npm run dev
```

### Production Build

```bash
cd project
npm run build
npm run start
```

### Quality Checks

```bash
cd project
npm run lint
npm run typecheck
```

## Project Structure

- `project/app/` contains the application shell, layout, and page entry point.
- `project/components/` contains the landing page sections and shared UI pieces.
- `project/public/images/` contains logos and past event assets.
- `project/lib/` and `project/hooks/` contain shared helpers and client-side hooks.

## Deployment

The project includes `project/netlify.toml`, so it is ready to be deployed on Netlify after building with the standard Next.js workflow.
