# Dream 2000

A personal outreach cockpit for Ace (Cole Slay), built for the Build With AI: Basics hackathon.
Load a spreadsheet of companies and messages, copy a message, send it elsewhere, then log the
answer. Every **No** earns XP toward a goal of 2,000 no's, and every **Yes** earns a trophy.

Everything runs in the browser and is saved in `localStorage`. There is no server and no account.

## Run it

```
npm install
npm run dev
```

Open the address it prints. The landing page is at `/welcome`, the cockpit at `/dashboard`.

- `npm test` runs the checks.
- `npm run build` makes a production build in `dist/`.

## Try it

Load `sample-data/demo-missions.csv` (ten fictional companies) on the dashboard, by picking the file or dropping it
anywhere on the page. CSV and `.xlsx` files work. Expected columns include `COMPANY`, `PRIORITY`, `THE ASK`, `MESSAGE`
and contact details; see `src/lib/csv.ts`.

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, framer-motion, react-router, papaparse, read-excel-file, vitest.
Videos in `public/videos/` were generated with ElevenLabs.

## Planning documents

The scope, PRD, technical spec, build checklist and an app map are in `devpost/`.
Start with `devpost/app-map.html` to see where things live.
