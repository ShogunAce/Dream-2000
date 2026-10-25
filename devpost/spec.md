---
doc: spec
status: approved
---

# Dream 2000 — Technical Spec

## How This Works, In Plain Language
Dream 2000 is a website that runs entirely in your browser. There is no server, no database, and no account. It has two pages: the **landing page**, which explains the challenge, and the **dashboard**, your cockpit.

- You upload your spreadsheet (as a CSV file). The site reads it and turns each brand into a **mission**.
- Everything you do is written into one saved record on your own device, the **scoreboard**: which missions are uncontacted, waiting, or finished, your XP, your level, and your 2,000 counter. Think of `localStorage` as a sticky note the browser keeps for this one site. Come back tomorrow and the note is still there.
- The screen is always drawn from the scoreboard. When you press No or Yes, the code updates the scoreboard first, the screen redraws, and then an animation plays as decoration. The animations never change the numbers, so a glitchy animation can't give you wrong XP.
- The big cinematic videos (landing page and the ship-entry intro) are generated once with ElevenLabs and saved as video files in the project. The small game animations (mission sliding to Waiting, XP count-up, level bar, trophy and badge pop) are drawn by code.

Why this shape: it's the smallest setup that proves your kernel (no's pay XP, yes's earn trophies), works with no account, and can be recorded locally or hosted as plain static files.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.

1. **First visit.** You open `/`. The site checks the saved note for "have you been here before?" It's your first time, so it shows the landing page and saves that you've visited.
2. **Open Dashboard.** The button routes to `/dashboard`.
3. **Entry animation.** The ship-entry video plays, with a skip button. It plays once per browser session (assumption, see Decisions and Open Issues).
4. **Empty cockpit.** The scoreboard has no missions, so the cockpit shows "Upload mission set."
5. **Upload.** You pick a CSV. The site reads each row by column name and creates a mission. Missions are saved to the scoreboard in the spreadsheet's `#` order.
6. **Mission log.** The cockpit shows today's batch: the next 5 uncontacted missions. A daily quote and the HUD (level bar, XP, 2,000 counter) are drawn from the scoreboard.
7. **Open a mission.** Click a row, and a pop-up shows the company, the ask, contact details, channel, and the drafted message with a copy button.
8. **Copy and send.** The copy button writes the message to your clipboard. You send it elsewhere and check the mission off in the pop-up or in the list. The scoreboard marks it `waiting`, and the card slides to the Waiting tab.
9. **Reply.** In the Waiting tab you press **No** or **Yes**. The scoreboard records the outcome, adds XP by priority, and adds one to the 2,000 counter (no's only). The screen redraws, then the XP count-up plays. A Yes also records a badge and plays the trophy animation.
10. **History.** The finished mission appears in the Results tab, newest first.
11. **Day finished.** When all missions in today's batch are finished, the cockpit shows the campaign overview, with a "Load next batch" button that starts the next 5.
12. **Return visit.** Next time, `/` sees you've visited and goes straight to `/dashboard`. The "Landing page" link in the dashboard goes to `/welcome`, which always shows the landing page.

## Stack
Chosen by the learner (carried from `references/prompt-reference.txt`):
- **React 18 + TypeScript + Vite:** the app and its dev server. Docs: https://vite.dev/guide/ and https://react.dev
- **Tailwind CSS:** styling. Docs: https://tailwindcss.com/docs
- **framer-motion:** the in-code animations. Docs: https://motion.dev/docs/react
- **lucide-react:** icons. Docs: https://lucide.dev/guide/packages/lucide-react
- **react-router-dom:** moving between `/`, `/welcome`, and `/dashboard`. Docs: https://reactrouter.com

Added by this spec (derived from the learner's choices, to confirm in the build):
- **papaparse:** reads the CSV, including quoted commas and multi-line messages that a hand-written reader would break on. Docs: https://www.papaparse.com/docs

Versions: not verified in this planning session (no lookup was done). `5-build` should install current versions and check that `framer-motion` and `react-router-dom` are compatible with the React version chosen.

## Where It Runs and How Someone Tries It
- **Runs:** in a browser, from a local dev server.
- **Needs:** Node.js (current LTS) and npm. No API keys are needed to run the app. ElevenLabs is only used while building, to generate the video files.
- **Start:** `npm install`, then `npm run dev`, then open the address it prints (usually `http://localhost:5173`).
- **Demo recording:** open `/`, show the landing page, click Open Dashboard, watch the ship entry, upload `sample-data/demo-missions.csv`, copy a message, check it off, press No (XP), press Yes (XP, trophy, badge), and show the level bar and history.
- **Submission needs** both a short demo video and a public GitHub repo. Deployment is optional.
- **Optional deployment (learner's plan):** push to GitHub, then host on Netlify (build command `npm run build`, publish directory `dist`, plus a `public/_redirects` file containing `/* /index.html 200` so `/dashboard` still loads on refresh). Docs: https://docs.netlify.com/build/configure-builds/get-started/. Hosting via Google AI Studio is a possible alternative that has **not been verified**. Check it early if it's the chosen route.

## Look and Feel
PRD ref: `prd.md > Look and Feel`.
- **Landing page:** exactly as written in `references/prompt-reference.txt`: black background, Instrument Serif (regular and italic) for display text, system sans for everything else, `.liquid-glass` elements.
- **Dashboard:** "Mass Effect Andromeda meets Evangelion," hopecore cyberpunk. A near-black deep-space background with a slow looping cosmos video behind glass panels. Colors come from the reference images: warm gold (orbital ring), violet and cyan (galaxy), and orange-pink neon (trail). Gold marks progress and rewards, cyan marks interactive things, and violet is atmosphere. Glass panels with thin glowing edges and slightly angular HUD framing. Small uppercase tracking-wide labels for HUD text and large serif numerals for the big numbers (XP, counter).
- **Fonts (proposal, to verify they load):** Instrument Serif for headings and big numbers; **Chakra Petch** (Google Fonts) for HUD labels. Chakra Petch is a clean, slightly angular sci-fi typeface.
- **Tone of copy:** warm, encouraging, a little mission-control. For example "Mission accepted," "Transmission sent," "Signal received: No. +25 XP."
- **Mood references:** the four images in `references/` are mood only. They are never embedded or traced. All generated visuals are original.
- **The build uses the design skills and motion skills** the learner named, to avoid generic styling. If a design skill's defaults clash with this direction, this section wins.

## Components

### Routing and First-Visit Logic
Decides which page shows. `/` shows the landing page on a first visit and redirects to `/dashboard` afterward. `/welcome` always shows the landing page.
PRD ref: `prd.md > Navigation`.

### Landing Page
Hero, about, featured video, philosophy, how it works, and final call to action, per `references/prompt-reference.txt`. Reads the 2,000 counter from `dream2000_count`.
PRD ref: `prd.md > Screens and Layout` (Landing page).

### Scoreboard Store
The single source of truth: missions, XP, level, counter, badges, and settings. Exposes actions: `loadMissions`, `markSent`, `logNo`, `logYes`, `loadNextBatch`. Saves to `localStorage` after every action. Every action runs exactly once per click (guards against double-clicks). The level is always calculated from total XP, never stored separately, so it can't drift.
PRD ref: `prd.md > XP, levels, and the 2,000 counter`.

### Mission Set Upload
A file picker for a CSV. Reads rows by column name, creates missions, and replaces the current mission set after a confirmation (XP, history, and badges are kept). Shows a plain message if the file can't be read or has no COMPANY column.
PRD ref: `prd.md > Mission set upload`.

### Cockpit Layout (agent proposal, to review)
The learner delegated the layout. The proposal:
- **Top HUD bar:** pilot callsign (editable), level and XP bar, and the big `{count} / 2,000` counter.
- **Center console:** the Mission Log, the biggest thing on screen, with the 5 missions of the day as glowing rows.
- **Left rail:** tabs for Missions, Waiting, Results, and Campaign.
- **Right column:** the daily quote, a **trophy case** (badges earned from yes's), and the pilot's **personal mission statement**, editable text for "why I'm chasing 2,000." The callsign, mission statement, and trophy case are the personal "MySpace" touches.
- **Link to landing page** in the corner.
PRD ref: `prd.md > Screens and Layout` (Dashboard).

### Entry Animation
Plays `/videos/intro.mp4` when the dashboard opens, with a skip button. Falls back to the cockpit directly if the file is missing.
PRD ref: `prd.md > The Core Journey` (step 2).

### Mission Log and Mission Pop-up
The list of today's batch, and the pop-up with details, copy button, and the "sent" check-off. Copy uses the browser clipboard; a "Copied" confirmation shows. Checking off from either place calls `markSent`.
PRD ref: `prd.md > Mission log`, `prd.md > Mission pop-up`.

### Waiting Tab
Lists `waiting` missions with **Yes** and **No** buttons.
PRD ref: `prd.md > Waiting tab`.

### Reward Effects
In-code animations: mission slide to Waiting, XP count-up, level-up flash, trophy and badge pop. They receive the result of a scoreboard action and only display it.
PRD ref: `prd.md > Logging a No`, `prd.md > Logging a Yes`.

### Results and Campaign Overview
Results lists finished missions, newest first, with outcome, XP, and badge. Campaign overview shows totals (sent, waiting, no's, yes's, XP) and the "Load next batch" button.
PRD ref: `prd.md > History`, `prd.md > Campaign overview`.

### Daily Quote
Picks a quote from a local list, keyed to the date so it stays the same all day.
PRD ref: `prd.md > Daily quote`.

## Data Model
All data is saved in the browser under the key `dream2000_state` (JSON). The counter is also written to `dream2000_count` so the landing page can read it. Both are wrapped in try/catch with safe defaults.

```
state = {
  missions: [ { id, order, company, priority, ask, message, contactName,
                contactTitle, channel, email, linkedin, xHandle, notes,
                status: "uncontacted" | "waiting" | "no" | "yes",
                xpEarned, badgeId?, sentAt?, resolvedAt? } ],
  batchIds: [ ...ids of today's missions ],
  batchDate: "YYYY-MM-DD",
  totalXp: number,
  noCount: number,          // drives the 2,000 counter
  badges: [ { id, company, ask, earnedAt } ],
  profile: { callsign, missionStatement }
}
```

Where it lives, how it updates, what happens on return:
- **Missions, XP, counter, badges, profile:** saved in `dream2000_state`, updated only by scoreboard actions, and all kept when you leave and come back.
- **Level:** calculated from `totalXp`, never saved.
- **Intro-played flag:** `sessionStorage`, so it resets when the browser closes.
- **First-visit flag:** `localStorage` key `dream2000_visited`.

**CSV column mapping** (by header name, case-insensitive): COMPANY → company; PRIORITY → priority (Entry, Medium, High); THE ASK → ask; MESSAGE DRAFTED → message; CONTACT NAME, CONTACT TITLE, BEST CHANNEL, PARTNERSHIP EMAIL, LINKEDIN URL, X HANDLE, NOTES → detail fields; `#` → order. All uploaded rows start as `uncontacted` (the spreadsheet's STATUS and OUTCOME columns are ignored for the PoC). A missing or unknown priority counts as Entry.

**XP and levels (agent proposal from the learner's delegation, to review):**
- XP per **No**: Entry 10, Medium 25, High 50.
- XP per **Yes**: 5 times the No value (Entry 50, Medium 125, High 250), plus a trophy and a badge.
- XP to go from level N to N+1: `100 + 50 × (N − 1)`. So level 2 needs 100 XP, level 3 needs 150 more, and so on, getting steadily harder.
- Rough balance check: 2,000 no's at an average of about 20 XP is around 40,000 XP, which lands near level 39. That keeps early levels quick and later levels a grind. The 10-brand demo (about 250 XP) reaches level 3, so a level-up shows on camera.

## File Structure
```
Buildwithbasics/
├── devpost/                      # planning documents
├── references/                   # mood images + landing-page prompt (not shipped in the app)
├── sample-data/
│   └── demo-missions.csv         # 10-brand demo file (public-safe)
├── public/
│   ├── videos/                   # ElevenLabs-generated loops: hero, featured, philosophy,
│   │                             #   card-log, card-learn, intro, cockpit-bg
│   └── _redirects                # Netlify: send all paths to index.html
├── src/
│   ├── main.tsx                  # app entry, router
│   ├── index.css                 # fonts, .liquid-glass, Tailwind layers
│   ├── pages/
│   │   ├── Landing.tsx           # landing page (assembles its sections)
│   │   ├── Dashboard.tsx         # cockpit layout
│   │   └── Entry.tsx             # "/" first-visit redirect logic
│   ├── components/
│   │   ├── landing/              # Hero, About, FeaturedVideo, Philosophy, HowItWorks, FinalCta
│   │   └── dashboard/            # HudBar, MissionLog, MissionPopup, WaitingTab, ResultsTab,
│   │                             #   CampaignOverview, TrophyCase, QuotePanel, UploadPanel,
│   │                             #   EntryAnimation, RewardEffects
│   ├── lib/
│   │   ├── store.ts              # scoreboard actions + save/load
│   │   ├── xp.ts                 # XP weights and level math
│   │   ├── csv.ts                # papaparse + column mapping
│   │   └── quotes.ts             # local quote list
│   └── types.ts                  # Mission, State types
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md                     # how to run it, for the repo
```

## External Services and Dependencies
- **ElevenLabs (build-time only):** generates the video loops through the learner's connected ElevenLabs tools in Claude Code. Each generation spends credits and starts one run. Don't repeat a generation call to retry. Generate the 7 videos once, check them, and save them into `public/videos/`. No runtime calls, no key in the app.
- **Google Fonts:** Instrument Serif and Chakra Petch, loaded by CSS import. Needs a network connection; the page falls back to system serif and sans if offline.
- **Netlify (optional):** static hosting. Free tier is expected to be sufficient (unverified).
- **papaparse:** runs in the browser, no key or cost.

## Important Failure Modes
- **A video file is missing or slow** → the section shows a dark gradient and the layout stays intact. Videos pause under `prefers-reduced-motion`.
- **CSV can't be read, or has no COMPANY column** → a plain message appears ("This file doesn't look like a mission set") and the existing missions stay untouched.
- **Saved data is blocked or corrupted** (private window, cleared data) → the app starts from an empty scoreboard with defaults instead of crashing, and shows the "Upload mission set" prompt.
- **Clipboard copy is blocked** → the message text is selected so it can be copied by hand, with a short note.

## What Was Simplified and Why
- **Browser-saved scoreboard** instead of accounts and a database: nothing to host or configure, and it matches "no account." The fuller version would need sign-in and a server.
- **CSV upload only** instead of Excel or Google Sheets sync: one dependable format. Syncing back to the sheet is deferred.
- **All uploaded rows start uncontacted** instead of importing the sheet's STATUS and OUTCOME: keeps the demo predictable.
- **Trophy and XP animations in code** instead of generated video: instant, free, and tied to real numbers (learner agreement).
- **Fixed local quote list** instead of a quotes service.
- **Daily batch of 5** with a "Load next batch" button instead of real calendar scheduling.

## Decisions and Open Issues
**Learner choices:**
- Stack: React, TypeScript, Vite, Tailwind, framer-motion, lucide-react, react-router-dom.
- Hosting: GitHub plus Netlify, with Google AI Studio as an alternative; deployment optional.
- ElevenLabs for the cinematic videos; code-drawn trophy and XP animations (accepted recommendation).
- PRIORITY (not TIER) holds Entry, Medium, and High.
- CSV upload in the app, with a 10-brand demo file.

**Delegated by the learner, agent proposals to review:** the cockpit layout and personal touches (callsign, mission statement, trophy case); the XP numbers, level curve, and yes multiplier; Chakra Petch as the HUD font.

**Derived implementation details (not learner decisions):** papaparse; the `dream2000_state` shape; level calculated from XP; batch of 5 with "Load next batch"; ignoring STATUS and OUTCOME on upload; routes `/` and `/welcome`.

**The learner's one uncertainty:** how animations connect to XP, and the worry that it would break. Clarified in conversation: the scoreboard is the truth, the screen redraws from it, and animations only display results. To check in the build: after a No and a Yes, reload the page and confirm XP, level, counter, and badge survived; click Yes or No rapidly and confirm each mission counts exactly once.

**Still open:**
- **Intro animation frequency:** assumed once per browser session with a skip button. Change if wanted.
- **Yes badge content:** assumed company name plus THE ASK.
- **Final project name:** "Dream 2000" for now.
- **Landing-page source and reuse rights** (from `prd.md > Open Questions`): confirm before shipping. The prompt calls for original assets, so visuals aren't affected.
- **Quote accuracy:** quotes and attributions in `quotes.ts` should be checked for accuracy before the demo.
- **Versions and the Google AI Studio route:** not verified here; check early in the build.
