import type { Mission } from '../../types'

export default function WaitingTab({ missions, onOpen }: { missions: Mission[]; onOpen: (mission: Mission) => void }) {
  if (missions.length === 0) {
    return <p className="text-white/50 text-sm">No missions are waiting for a reply.</p>
  }
  return (
    <ul className="space-y-3">
      {missions.map((m) => (
        <li key={m.id} className="liquid-glass rounded-2xl px-5 py-4">
          <button onClick={() => onOpen(m)} className="w-full text-left">
            <span className="block font-hud text-lg">{m.company}</span>
            <span className="block text-white/50 text-sm">{m.ask}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
