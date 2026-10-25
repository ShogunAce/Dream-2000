import type { Mission } from '../../types'
import { logNo, logYes } from '../../lib/store'

export default function WaitingTab({ missions, onOpen }: { missions: Mission[]; onOpen: (mission: Mission) => void }) {
  if (missions.length === 0) {
    return <p className="text-white/50 text-sm">No missions are waiting for a reply.</p>
  }
  return (
    <ul className="space-y-3">
      {missions.map((m) => (
        <li key={m.id} className="liquid-glass rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-4">
          <button onClick={() => onOpen(m)} className="text-left">
            <span className="block font-hud text-lg">{m.company}</span>
            <span className="block text-white/50 text-sm">
              {m.ask} · {m.priority}
            </span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => logNo(m.id)}
              className="liquid-glass rounded-full px-5 py-2 text-sm font-medium hover:bg-white/5"
            >
              No
            </button>
            <button
              onClick={() => logYes(m.id)}
              className="rounded-full px-5 py-2 text-sm font-medium bg-amber-300 text-black hover:bg-amber-200"
            >
              Yes
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
