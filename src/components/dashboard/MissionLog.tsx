import type { Mission } from '../../types'

export default function MissionLog({ missions }: { missions: Mission[] }) {
  return (
    <ul className="space-y-3">
      {missions.map((m) => (
        <li key={m.id} className="liquid-glass rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-hud text-lg">{m.company}</p>
            <p className="text-white/50 text-sm">{m.ask}</p>
          </div>
          <span className="font-hud text-xs uppercase tracking-widest text-white/40">{m.priority}</span>
        </li>
      ))}
    </ul>
  )
}
