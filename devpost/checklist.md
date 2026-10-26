---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. You can upload your mission CSV and see missions in the cockpit**
  Becomes usable: A running app where "Upload mission set" accepts a CSV and shows the day's 5 missions in a list. Missions survive a page reload.
  Why now: Proves the whole path end to end (scaffold, upload, reading the spreadsheet, saved scoreboard, display) and creates the data every later slice acts on.
  PRD ref: `prd.md > Mission set upload`, `prd.md > Mission log`
  Spec ref: `spec.md > Stack`, `spec.md > File Structure`, `spec.md > Data Model`, `spec.md > Mission Set Upload`, `spec.md > Scoreboard Store`
  Build: Scaffold Vite + React + TypeScript + Tailwind with the spec's file structure and the `/dashboard` route. Add papaparse CSV reading with column mapping, the scoreboard store saved to `localStorage`, the "Upload mission set" empty state, a plain error for bad files, the mission list (next 5 in order), and `sample-data/demo-missions.csv` (clearly labeled sample brands).
  Verify (mechanical): Build and dev server run with no errors; a unit-level check of the CSV mapper on the sample file returns 10 missions in order; a bad file produces the error message; reload keeps missions.
  Learner check: Open `/dashboard`, upload the sample CSV, see 5 missions, reload, and confirm they're still there.
  Commit: `Add scaffold, CSV upload, and mission list`

- [x] **2. You can open a mission, copy the message, and send it to Waiting**
  Becomes usable: Clicking a mission opens a pop-up with the details and message; copy works; checking off (in the pop-up or the list) moves it to a Waiting tab.
  Why now: This is the first half of the core loop, and it creates the waiting missions that the kernel acts on.
  PRD ref: `prd.md > Mission pop-up`, `prd.md > Waiting tab`
  Spec ref: `spec.md > Mission Log and Mission Pop-up`, `spec.md > Waiting Tab`, `spec.md > Scoreboard Store`
  Build: Mission pop-up with company, ask, contact, channel, message, and copy button with a "Copied" confirmation and a blocked-clipboard fallback; `markSent` action guarded against double clicks; Waiting tab.
  Verify (mechanical): Check-off from the pop-up and from the list each move exactly one mission to `waiting`; a second click does nothing; state survives reload.
  Learner check: Open a mission, copy the message and paste it somewhere to confirm, check it off, and see it in Waiting. Check another off straight from the list.
  Commit: `Add mission pop-up, copy, and Waiting tab`

- [x] **3. A No earns XP and a Yes earns a trophy badge (the kernel)**
  Becomes usable: Pressing No or Yes on a waiting mission updates XP, level, the 2,000 counter, and history, and a Yes records a badge.
  Why now: This is the unique kernel. It comes before the polish so the heart of the idea works as early as possible.
  PRD ref: `prd.md > Logging a No`, `prd.md > Logging a Yes`, `prd.md > XP, levels, and the 2,000 counter`, `prd.md > History`
  Spec ref: `spec.md > Scoreboard Store`, `spec.md > Data Model` (XP and levels), `spec.md > Results and Campaign Overview`
  Build: `xp.ts` weights and level math, `logNo`/`logYes` actions (one count per mission), a plain HUD showing level, XP bar, and counter, a Results tab with history, and `dream2000_count` written for the landing page.
  Verify (mechanical): Tests on the level math (Entry 10, Medium 25, High 50, Yes 5x, level N to N+1 costs 100 + 50(N-1)); logging No then Yes yields the expected totals; rapid double clicks count once; reload keeps everything.
  Learner check: Send three missions to Waiting, press No on two and Yes on one, and check that XP, level, the counter, and the history match what you expect.
  Commit: `Add XP, levels, No/Yes outcomes, and history`

- [x] **4. The landing page and first-visit flow work**
  Becomes usable: `/` shows the landing page on the first visit, every "Open Dashboard" button goes to the dashboard, later visits skip straight to the dashboard, and `/welcome` always shows the landing page.
  Why now: It's a framing layer around a finished product, and it's independent of the kernel.
  PRD ref: `prd.md > Screens and Layout` (Landing page), `prd.md > Navigation`
  Spec ref: `spec.md > Landing Page`, `spec.md > Routing and First-Visit Logic`; `references/prompt-reference.txt`
  Build: All landing sections per the prompt, with gradient fallbacks for videos not yet generated, liquid-glass CSS, the live counter, and the first-visit redirect.
  Verify (mechanical): Fresh storage shows the landing page with `0 / 2,000`; the visit flag then redirects `/` to `/dashboard`; `/welcome` always shows the landing page; build passes; no horizontal scroll at 380px.
  Learner check: Open the app in a fresh private window and see the landing page, click through to the dashboard, then go back to `/` and confirm it skips the landing page.
  Commit: `Add landing page and first-visit routing`

- [x] **5. The cockpit looks and feels like yours**
  Becomes usable: The dashboard has the full cockpit layout (top HUD, left tabs, center console, right column with the quote, trophy case, callsign and mission statement), the deep-space look, a daily quote, and the campaign overview with "Load next batch."
  Why now: The structure and numbers are proven, so now the look can be applied to what exists.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > Look and Feel`, `prd.md > Daily quote`, `prd.md > Campaign overview`
  Spec ref: `spec.md > Cockpit Layout`, `spec.md > Look and Feel`, `spec.md > Daily Quote`, `spec.md > Results and Campaign Overview`
  Build: Apply the design and motion skills to the cockpit with the Chakra Petch and Instrument Serif pairing, glass panels, the palette from the references, quote list, editable callsign and mission statement, campaign overview, and the link back to the landing page.
  Verify (mechanical): Build passes with no console errors; at 380px width there is no horizontal scroll; all tabs render; finishing the day's 5 missions shows the overview and "Load next batch" brings the next 5.
  Learner check: Open the cockpit and tell me whether it feels like Andromeda crossed with Evangelion, hopecore, and personal. Edit your callsign and statement and reload.
  Commit: `Add cockpit layout, look, quote, and campaign overview`

- [x] **6. The rewards feel good: animations for sending, XP, level-ups, and trophies**
  Becomes usable: A mission slides to Waiting, XP counts up on a No, the level bar flashes on a level-up, and a Yes plays a trophy and badge animation with a trophy case.
  Why now: These are the "oh, that's cool" beats of the demo. They sit on top of working numbers, so they can't break them.
  PRD ref: `prd.md > Logging a No`, `prd.md > Logging a Yes`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Reward Effects`, `spec.md > Look and Feel`, `spec.md > Cockpit Layout` (trophy case)
  Build: framer-motion effects driven only by the results of store actions, a trophy case panel, reduced-motion support.
  Verify (mechanical): Numbers are identical with animations on and off; clicking rapidly does not double count; build passes.
  Learner check: Log a No and a Yes and watch the animations. Tell me whether the trophy moment feels celebratory enough.
  Commit: `Add reward animations and trophy case`

- [x] **7. The cinematic videos and ship-entry animation are in**
  Becomes usable: The landing page videos and the astronaut ship-entry intro (with a skip button) play, and the cockpit has a looping background.
  Why now: Generated media is the slowest and costliest step, and the app works without it thanks to the fallbacks, so it goes last.
  PRD ref: `prd.md > The Core Journey` (step 2), `prd.md > Look and Feel`
  Spec ref: `spec.md > Entry Animation`, `spec.md > External Services and Dependencies` (ElevenLabs)
  Build: Generate the 7 original videos in ElevenLabs (hero, featured, philosophy, card-log, card-learn, intro, cockpit-bg) from the prompt's generation directions, one generation each, and save them to `public/videos/`. Wire the intro with a skip button and the cockpit background.
  Verify (mechanical): All 7 files exist and load with no 404s; the intro plays once per session and the skip button works; the app still renders with a video removed.
  Learner check: Watch the landing page and the ship entry, and tell me whether each video matches the mood of your references.
  Commit: `Add generated videos and ship-entry animation`

## Hands-on Checkpoints

- [x] Early usable behavior explored: after slice 3 (the kernel works with plain visuals)
- [x] Final kick-the-tires exploration and feedback completed

## Final Review

- [x] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: brief evidence-based recap (not a hands-on tour). The learner chose to move on to shipping. Evidence: the message-column bug, `pickMessage` in `src/lib/csv.ts`, its tests in `src/lib/csv.test.ts`.
Route and stops: reference route in `devpost/app-map.html` (UploadPanel, csv.ts, MissionPopup); not toured interactively.
Edit outcome: not applicable (learner moved on).
Reflection: offered, not answered.
Activity mode: recap.

## Revisions

- Slice order changed (landing page and cockpit look now come before reward animations) — after trying slices 1-3 the learner expected the landing page and cockpit design first. Design and motion skills are used for slices 4 and 5.
- Upload now accepts dragged-and-dropped files anywhere on the dashboard and Excel `.xlsx` files, in addition to CSV — requested by the learner. Added `read-excel-file` (the `xlsx` package on npm is stale) and `src/lib/importFile.ts`; Tailwind v4 needs no config file, so `tailwind.config.js` from the spec is not used.
- ElevenLabs videos: hero and cockpit-bg generated and added; the first intro generation was blocked by the video provider's content filter; the learner approved one retry (about $3) with a simpler cockpit-window prompt, and `public/videos/intro.mp4` is now in. Featured, philosophy, and the two how-it-works card videos were deferred by the learner to save credits and use gradient fallbacks for now. Slice 7 is complete with 3 of the 7 originally planned videos.
- Landing page rewritten from the learner's revision prompt: hero text left-aligned over a darkened scrim with the video shifted right, a large live counter, one primary button, and the Why / How it works (three product previews) / Who it's for / closing sections replace the About, Featured video, Philosophy, and video-card sections. Those three section files were removed, and `spec.md > Landing Page` and the file structure are updated by this note. The landing copy mentions AI debriefs and a 10-second log form that the PoC dashboard does not build; the previews are labelled Preview / Example.


- Mission message: the learner's spreadsheet has a yes/no flag in `MESSAGE DRAFTED`, so the card showed the flag instead of the message. `pickMessage` in `src/lib/csv.ts` now takes the longest non-flag text from any message-like column.
- Final kick-the-tires: the learner ran the full dashboard flow with their real spreadsheet. Upload, XP, level-up, and trophy all worked; the only issue was the card showing a yes/no flag instead of the message (message lives in the `Message` column). Fixed in `src/lib/csv.ts` across three commits, and the learner confirmed everything works.
- Landing page rewritten again as a first-person portfolio page by Ace (Cole Slay), from the learner's second revision prompt: nav `Ace · Dream 2000`, single `Enter my cockpit` button, sections Hero, Why (optional `/images/ace.jpg`, rendered only if the file loads), The asks (three cards; example asks and the names-on-my-list count are read from the loaded sheet, with one learner-written fallback quote on the Access card), The mission, My system (three previews, Example-labelled), final CTA, footer with an empty `SOCIALS` config. `AudienceSection` removed, `HowItWorks` became `SystemSection`; new `AsksSection`, `MissionSection`, `Footer`. Because the sheet lives in each visitor's own browser, a public visitor sees the asks examples and list count only after loading a sheet; with none loaded those parts are omitted.
- Final review: no outstanding fixes. The learner explicitly confirmed the PoC is ready to ship after the landing page rewrite.
- Landing page tweaks before shipping: the AI debrief step is labelled Coming soon, the example ask quotes were removed from the asks cards, and `public/sample-missions.csv` (the fictional sample) is linked from the empty dashboard so visitors can try it.
- Shipping: public repository created at https://github.com/ShogunAce/Dream-2000 (learner authorized creation and push). The learner profile and untracked tooling folders were not published.
