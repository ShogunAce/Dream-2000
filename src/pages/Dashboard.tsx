import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../lib/store'
import type { Mission } from '../types'
import Bezel from '../components/dashboard/Bezel'
import UploadPanel from '../components/dashboard/UploadPanel'
import MissionLog from '../components/dashboard/MissionLog'
import MissionPopup from '../components/dashboard/MissionPopup'
import WaitingTab from '../components/dashboard/WaitingTab'
import ResultsTab from '../components/dashboard/ResultsTab'
import CampaignOverview from '../components/dashboard/CampaignOverview'
import HudBar from '../components/dashboard/HudBar'
import QuotePanel from '../components/dashboard/QuotePanel'
import TrophyCase from '../components/dashboard/TrophyCase'
import MissionStatement from '../components/dashboard/MissionStatement'
import RewardEffects from '../components/dashboard/RewardEffects'

type Tab = 'missions' | 'waiting' | 'results' | 'campaign'

const todayLocal = () => new Date().toLocaleDateString('en-CA') // YYYY-MM-DD

export default function Dashboard() {
  const { missions, batchIds, totalXp, noCount, badges, profile } = useStore()
  const [tab, setTab] = useState<Tab>('missions')
  const [openId, setOpenId] = useState<string | null>(null)

  const batch = batchIds
    .map((id) => missions.find((m) => m.id === id))
    .filter((m): m is Mission => Boolean(m))
  const todo = batch.filter((m) => m.status === 'uncontacted')
  const dayDone = batch.length > 0 && todo.length === 0
  const waiting = missions.filter((m) => m.status === 'waiting')
  const results = missions
    .filter((m) => m.status === 'no' || m.status === 'yes')
    .sort((a, b) => (b.resolvedAt ?? '').localeCompare(a.resolvedAt ?? ''))
  // read the open mission from the store so the pop-up reflects check-offs immediately
  const openMission = missions.find((m) => m.id === openId) ?? null

  const tabs: [Tab, string, string][] = [
    ['missions', 'Missions', 'Mission log'],
    ['waiting', `Waiting · ${waiting.length}`, 'Awaiting reply'],
    ['results', `Results · ${results.length}`, 'Replies so far'],
    ['campaign', 'Campaign', 'Campaign overview'],
  ]
  const current = tabs.find(([id]) => id === tab)!

  return (
    <div className="relative min-h-[100dvh] bg-[#050505] text-white overflow-x-hidden">
      {/* aurora: fixed glowing orbs behind everything */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-32 size-[34rem] rounded-full bg-violet-600/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 size-[30rem] rounded-full bg-cyan-400/15 blur-[140px]" />
        <div className="absolute -bottom-48 left-1/4 size-[36rem] rounded-full bg-amber-400/15 blur-[160px]" />
      </div>

      <main className="relative mx-auto max-w-7xl px-4 md:px-8 py-6 md:py-10 space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/welcome" className="eyebrow hover:text-white transition-colors duration-500">
            ← Landing page
          </Link>
          <span className="eyebrow">Dream 2000 · Cockpit</span>
        </div>

        <HudBar callsign={profile.callsign} totalXp={totalXp} noCount={noCount} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <nav
            aria-label="Dashboard tabs"
            className="lg:col-span-2 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1"
          >
            {tabs.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                aria-current={tab === id}
                className={`shrink-0 text-left font-hud text-xs uppercase tracking-[0.18em] px-5 py-3 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
                  tab === id
                    ? 'bg-white text-black'
                    : 'text-white/55 hover:text-white bg-white/[0.04] ring-1 ring-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <Bezel className="lg:col-span-6" eyebrow={current[2]} delay={0.05}>
            {missions.length === 0 ? (
              <div className="py-8 text-center">
                <p className="font-display text-4xl mb-2">No mission set yet</p>
                <p className="text-sm text-white/50 mb-6">Load your spreadsheet and today's missions will appear here.</p>
                <UploadPanel hasMissions={false} />
              </div>
            ) : (
              <>
                {tab === 'missions' &&
                  (dayDone ? (
                    <CampaignOverview missions={missions} totalXp={totalXp} dayDone />
                  ) : (
                    <MissionLog missions={todo} onOpen={(m) => setOpenId(m.id)} />
                  ))}
                {tab === 'waiting' && <WaitingTab missions={waiting} onOpen={(m) => setOpenId(m.id)} />}
                {tab === 'results' && <ResultsTab missions={results} />}
                {tab === 'campaign' && <CampaignOverview missions={missions} totalXp={totalXp} dayDone={false} />}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <UploadPanel hasMissions />
                </div>
              </>
            )}
          </Bezel>

          <div className="lg:col-span-4 space-y-6">
            <QuotePanel date={todayLocal()} />
            <TrophyCase badges={badges} />
            <MissionStatement value={profile.missionStatement} />
          </div>
        </div>
      </main>

      {openMission && <MissionPopup mission={openMission} onClose={() => setOpenId(null)} />}
      <RewardEffects />
    </div>
  )
}
