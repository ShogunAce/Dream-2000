import type { Mission } from '../../types'

export default function ResultsTab({ missions }: { missions: Mission[] }) {
  if (missions.length === 0) {
    return <p className="text-white/50 text-sm">No replies logged yet. Your first no is waiting.</p>
  }
  return (
    <ul className="space-y-3">
      {missions.map((m) => (
        <li key={m.id} className="liquid-glass rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
          <span>
            <span className="block font-hud text-lg">{m.company}</span>
            <span className="block text-white/50 text-sm">{m.ask}</span>
          </span>
          <span className="text-right">
            <span
              className={`block font-hud text-xs uppercase tracking-widest ${m.status === 'yes' ? 'text-amber-300' : 'text-white/50'}`}
            >
              {m.status === 'yes' ? 'Yes · badge earned' : 'No'}
            </span>
            <span className="block font-hud text-sm">+{m.xpEarned} XP</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
