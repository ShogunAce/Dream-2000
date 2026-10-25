import { useState } from 'react'
import { useStore } from '../lib/store'
import type { Mission } from '../types'
import UploadPanel from '../components/dashboard/UploadPanel'
import MissionLog from '../components/dashboard/MissionLog'
import MissionPopup from '../components/dashboard/MissionPopup'
import WaitingTab from '../components/dashboard/WaitingTab'

type Tab = 'missions' | 'waiting'

export default function Dashboard() {
  const { missions, batchIds } = useStore()
  const [tab, setTab] = useState<Tab>('missions')
  const [openId, setOpenId] = useState<string | null>(null)

  const batch = batchIds
    .map((id) => missions.find((m) => m.id === id))
    .filter((m): m is Mission => Boolean(m) && m!.status === 'uncontacted')
  const waiting = missions.filter((m) => m.status === 'waiting')
  // read the open mission from the store so the pop-up reflects check-offs immediately
  const openMission = missions.find((m) => m.id === openId) ?? null

  const tabs: [Tab, string][] = [
    ['missions', 'Missions'],
    ['waiting', `Waiting (${waiting.length})`],
  ]

  return (
    <main className="min-h-screen bg-black px-6 py-10 max-w-3xl mx-auto">
      <h1 className="font-display text-5xl mb-8">Mission log</h1>
      {missions.length === 0 ? (
        <div className="liquid-glass rounded-3xl p-10 text-center">
          <p className="font-hud text-xl mb-6">No mission set yet</p>
          <UploadPanel hasMissions={false} />
        </div>
      ) : (
        <>
          <nav className="flex gap-2 mb-6" aria-label="Dashboard tabs">
            {tabs.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`font-hud text-sm uppercase tracking-widest px-4 py-2 rounded-full ${
                  tab === id ? 'liquid-glass text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
          {tab === 'missions' ? (
            <MissionLog missions={batch} onOpen={(m) => setOpenId(m.id)} />
          ) : (
            <WaitingTab missions={waiting} onOpen={(m) => setOpenId(m.id)} />
          )}
          <div className="mt-8">
            <UploadPanel hasMissions />
          </div>
        </>
      )}
      {openMission && <MissionPopup mission={openMission} onClose={() => setOpenId(null)} />}
    </main>
  )
}
