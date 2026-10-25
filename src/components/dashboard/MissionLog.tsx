import type { Mission } from '../../types'
import { markSent } from '../../lib/store'

export default function MissionLog({
  missions,
  onOpen,
}: {
  missions: Mission[]
  onOpen: (mission: Mission) => void
}) {
  if (missions.length === 0) {
    return <p className="text-white/50 text-sm">Nothing left in today's log.</p>
  }
  return (
    <ul className="space-y-3">
      {missions.map((m) => (
        <li key={m.id} className="liquid-glass rounded-2xl flex items-center gap-4 px-5 py-4">
          <input
            type="checkbox"
            aria-label={`Mark ${m.company} as sent`}
            className="size-5 accent-amber-300 shrink-0"
            checked={false}
            onChange={() => markSent(m.id)}
          />
          <button onClick={() => onOpen(m)} className="flex-1 text-left flex items-center justify-between gap-4">
            <span>
              <span className="block font-hud text-lg">{m.company}</span>
              <span className="block text-white/50 text-sm">{m.ask}</span>
            </span>
            <span className="font-hud text-xs uppercase tracking-widest text-white/40">{m.priority}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
