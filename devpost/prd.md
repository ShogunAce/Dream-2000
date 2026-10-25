---
doc: prd
status: approved
---

# Dream 2000 — Product Requirements

A hopecore-cyberpunk outreach tracker where every "no" earns XP and every "yes" earns a trophy, built for one creator chasing 2,000 rejections on the way to brand partnerships.
Source: `scope.md > The Unique Kernel`, `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.
Name: "Dream 2000" (used in the learner's landing page prompt; the final name is still open, see Open Questions).

## The Core Journey
1. **First visit:** the person lands on the landing page, reads the pitch, and clicks "Open Dashboard." No account, no login.
2. **Entering the ship:** an animation plays of an astronaut returning inside their spaceship, ending in the cockpit dashboard.
3. **Empty cockpit:** with no data yet, the cockpit shows "Upload mission set."
4. **Upload:** the person uploads a spreadsheet (CSV) of brands. For the demo, a 10-brand mini spreadsheet.
5. **Mission log:** the cockpit shows today's 3–5 missions, taken in order from the spreadsheet, plus a daily quote, the level/XP bar, and the 2,000 counter.
6. **Open a mission:** clicking a mission opens a pop-up with the brand's details and the message to copy.
7. **Copy and send:** the person copies the message, sends it outside the app, and checks it off, in the pop-up or in the list.
8. **Waiting:** the checked-off mission animates from uncontacted to the Waiting tab.
9. **Reply arrives:** from the Waiting tab, the person logs a **No** (XP gain) or a **Yes** (XP gain, trophy animation, and a badge).
10. **History and progress:** results go to a history of everything past. The level bar and 2,000 counter reflect progress.
11. **All done for the day:** when all of today's missions are finished, the dashboard shows the overall outreach campaign view.
12. **Returning:** on later visits, the person goes straight to the dashboard. A link back to the landing page is always available.

## Screens and Layout
Two surfaces: the landing page and the dashboard. The landing page links to the dashboard, and the dashboard always links back.

### Landing page
Single page, fully specified in `references/prompt-reference.txt`. Summary: a hero with the "Chase 2,000 No's" headline and a `{count} / 2,000` counter, an about section, a featured video, a "No x Yes" philosophy section, a two-step "How it works," and a final call to action. Every "Open Dashboard" button goes to the dashboard. No sign-up, login, or email capture.

### Dashboard (the cockpit)
- **Intro animation:** astronaut re-entering the ship, leading into the cockpit.
- **Mission log:** list of 3–5 missions for the day.
- **Mission pop-up:** opens from a mission.
- **Waiting tab:** missions that have been sent and are awaiting a reply.
- **Results:** Yes (trophies and badges) and No (XP), plus a history list of everything past.
- **Progress:** XP/level bar and the 2,000 counter.
- **Daily quote.**
- **Upload mission set** control.
- **Campaign overview** view for when the day's missions are done.
- **Link to the landing page.**

The exact arrangement on the screen (what's center, what's at the edges) is not yet decided; see Open Questions.

## Look and Feel
- **Dashboard:** "Mass Effect Andromeda meets Evangelion," in the learner's words. Hopecore cyberpunk: like Cyberpunk 2077, but hopeful. "An astronaut floating through a colorful cosmos, but protected." It should feel right with the dashboard open at 1am while vibecoding to drum and bass. Personal and expressive, "like my own personal MySpace (without the friends concept)," and not a generic dashboard.
- **Landing page:** black background, Instrument Serif (regular and italic) for display text, system sans for everything else, liquid-glass elements. Full details are in `references/prompt-reference.txt`.
- **Mood references** (in `references/`): `IMG_4786.png` (astronaut on a night-lit Earth), `IMG_4809.png` (astronaut beside a violet-and-cyan spiral galaxy), `IMG_4810.png` (astronaut inside a golden orbital ring of light), `IMG_4820.png` (astronaut on neon trails across a colorful cosmos). These are mood references only. Assets are original, generated with ElevenLabs. The references are not embedded or recreated.
- **Quotes:** daily quote from figures like Maya Angelou, Seneca, Langston Hughes, Malcolm Gladwell, David Goggins, and Malcolm X.
- **Motion:** meaningful animations at key moments: entering the ship, a mission moving to Waiting, XP gain, the trophy and badge on a yes.

## Features and Behavior

### Mission set upload
Source: `scope.md > The POC Boundary`.
The person uploads a CSV from their outreach spreadsheet. The spreadsheet's columns: #, COMPANY, TIER, PRIORITY, CATEGORY, THE ASK, DEAL TYPE, DEAL VALUE ($), CONTACT NAME, CONTACT TITLE, LINKEDIN URL, X HANDLE, PARTNERSHIP EMAIL, BEST CHANNEL, STATUS, SEQUENCE #, MESSAGE DRAFTED, NEXT ACTION, OUTREACH DATE, FOLLOW-UP DATE, RESPONSE DATE, OUTCOME, CONTENT HOOK, NOTES. For the demo, a 10-brand mini spreadsheet is uploaded. Uploading the full spreadsheet later should work the same way.
- As the creator, I want to upload my spreadsheet so that my real brands and messages become my missions.
  - [ ] Before any upload, the cockpit says "Upload mission set."
  - [ ] After uploading the 10-brand file, the brands appear as missions.
  - [ ] A file that can't be read shows a clear message and keeps the app usable.

### Mission log
Source: `scope.md > The Core Loop`.
Shows 3–5 missions for the day: the next brands from the spreadsheet, in order. Each row can be opened and checked off.
- [ ] 3–5 missions are listed, in spreadsheet order.
- [ ] Checking one off in the list moves it to Waiting.

### Mission pop-up
Opens from a mission. Shows the company name and the relevant spreadsheet details, such as the ask, the contact, and the channel. It also shows the drafted message with a copy button, and a check-off for "sent." No brand image.
- [ ] Clicking the copy button puts the message on the clipboard and shows that it worked.
- [ ] Checking off in the pop-up moves the mission to Waiting with an animation.
- [ ] Leaving the pop-up without checking off keeps the mission in the list, where it can still be checked off.

### Waiting tab
Holds every mission that was sent and hasn't had a reply yet. From here, the person logs the reply as a Yes or a No. This is also where the demo simulates a no and a yes.
- [ ] A checked-off mission appears here, not in the mission log.
- [ ] Each waiting mission has a Yes and a No action.

### Logging a No
- [ ] The mission moves to history as a No.
- [ ] XP is added, based on the mission's priority (Entry, Medium, High). Higher priority earns more.
- [ ] The XP gain is animated, the level bar updates, and the 2,000 counter goes up by one.

### Logging a Yes
- [ ] The mission moves to history as a Yes.
- [ ] XP is added, plus a bonus.
- [ ] A trophy animation plays.
- [ ] A badge is recorded that celebrates the new business relationship and notes what was asked for.
- [ ] The 2,000 counter and level bar update.

### XP, levels, and the 2,000 counter
Details in Product Decisions. XP weights, the level curve, and the yes bonus are a proposal for the learner to review (assumption).
- [ ] The level bar shows progress toward the next level.
- [ ] Later levels need more XP than earlier ones.
- [ ] The 2,000 counter counts no's only and is shown on the landing page and the dashboard.

### History
A list of everything past, with its outcome (Yes or No), the XP earned, and any badge.
- [ ] Finished missions appear here, newest first.

### Daily quote
A quote from the figures listed in Look and Feel.
- [ ] A quote with its author is visible on the dashboard.

### Campaign overview
Shown when the day's missions are finished. Tracks the overall outreach campaign.
- [ ] After all of today's missions are done, the cockpit shows the overall campaign view instead of an empty mission log.

### Navigation
- [ ] First visit goes to the landing page; later visits go straight to the dashboard.
- [ ] A link to the landing page is always available in the dashboard.

## States and Boundaries
- **First use:** landing page first; dashboard shows "Upload mission set" until a file is uploaded.
- **Returning use:** goes straight to the dashboard with all progress kept (assumption: saved on this device, with no account).
- **Empty mission log:** "Upload mission set" before upload; campaign overview after finishing the day.
- **Bad upload:** a file that can't be read shows a clear message and leaves any existing missions untouched.
- **No account:** no login, no email, no data leaves the device (assumption).

## Product Decisions
- **Kernel:** a no is progress, a yes is rare and celebrated. Reason: the creator wants to get used to rejection and be ready for the yes's.
- **Mission picking:** the next few brands, in spreadsheet order, 3–5 per day. Reason: fastest to build and easy to demo.
- **Spreadsheet input:** in-app CSV upload, with a 10-brand mini spreadsheet for the demo. Reason: the creator wants to keep using it after the hackathon, and a mini file keeps the demo clean.
- **Public repo:** the creator is comfortable with the brand names and messages being public.
- **No brand image:** dropped to keep the PoC small.
- **Check-off in two places:** the pop-up and the list, so leaving the pop-up never blocks progress.
- **XP weights by priority:** the learner delegated the numbers and wants progression balanced with a grind at higher levels. Assumption (agent-proposed, to review): Entry, Medium, and High priority earn increasing XP per no; level cost grows each level; a yes adds a bonus.
- **A yes earns what was asked for:** beyond the trophy, a badge that celebrates the new relationship.
- **Navigation:** landing first, then straight to the dashboard on later visits, with a link back to the landing page.
- **Dashboard look:** "Mass Effect Andromeda meets Evangelion," a personal-MySpace feel, no friends concept.
- **Landing page:** a simple, single page defined in `references/prompt-reference.txt`, not scroll-driven.

## What We're Building
- Landing page per `references/prompt-reference.txt`, with working "Open Dashboard" buttons
- Dashboard cockpit with an entry animation
- CSV upload of the mission set, with a 10-brand demo file
- Mission log (3–5 in order), mission pop-up with copy and check-off
- Waiting tab with Yes and No logging
- XP, level bar, 2,000 counter, trophy animation, and yes badge
- History list and campaign overview
- Daily quote
- Cosmic hopecore-cyberpunk look
- Progress saved on the device

## Deferred From the POC
- An agent that sends outreach: manual copy-and-send proves the loop.
- Accounts and syncing across devices: progress stays on one device.
- Brand images or logos: dropped to keep the PoC small.
- Editing missions inside the app or syncing back to the spreadsheet: upload is one-way.

## Possible Later Enhancements
- Follow-up reminders using the spreadsheet's follow-up date.
- Tracking posts and hackathons toward the same goal.
- A Jarvis-style command center for all of the creator's businesses.
- A way for anyone to build and customize their own version.

## Non-Goals
- No account, login, or email capture: not needed for a one-person tool.
- No friends or social features: the MySpace feel is personalization only.
- No automatic sending: the person copies and sends manually.
- No scroll-driven landing page: too large for the time budget.

## Open Questions
- **Dashboard arrangement** (what's in the center, what's at the edges, how the "personal MySpace" feel shows up, such as customization or personal touches): can wait for `4-spec` but should be decided before building the dashboard.
- **Intro animation:** every visit, or only the first? Can wait.
- **Tier columns:** the spreadsheet has both TIER and PRIORITY. Which one holds Entry, Medium, and High? Resolve before `4-spec`.
- **Final project name:** "Dream 2000" for now. Can wait.
- **Yes badge content:** which spreadsheet fields appear on the badge (for example, the company and THE ASK)? Can wait.
- **Source of the landing page:** the learner is adapting an existing site; confirm what it was and that reuse is allowed. Resolve before shipping.
