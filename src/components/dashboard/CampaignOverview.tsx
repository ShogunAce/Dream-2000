import type { Mission } from '../../types'
import { loadNextBatch } from '../../lib/store'

export default function CampaignOverview({
  missions,
  totalXp,
  dayDone,
}: {
  missions: Mission[]
  totalXp: number
  dayDone: boolean
}) {
  const count = (s: Mission['status']) => missions.filter((m) => m.status === s).length
  const remaining = count('uncontacted')
  const stats: [string, number][] = [
    ['Sent', missions.length - remaining],
    ['Waiting', count('waiting')],
    ["No's", count('no')],
    ["Yes's", count('yes')],
    ['Total XP', totalXp],
    ['Still to send', remaining],
  ]

  return (
    <div>
      {dayDone && (
        <p className="font-display text-3xl md:text-4xl mb-6 leading-tight">
          Today's missions are done. <em className="text-amber-200">That's a good day.</em>
        </p>
      )}
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map(([label, value]) => (
          <div key={label} className="cockpit-row px-4 py-4">
            <dt className="font-hud text-[10px] uppercase tracking-[0.2em] text-white/45">{label}</dt>
            <dd className="font-display text-4xl mt-1">{value.toLocaleString()}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6">
        {remaining > 0 ? (
          <button
            onClick={loadNextBatch}
            className="group rounded-full bg-white text-black pl-6 pr-2 py-2 text-sm font-medium inline-flex items-center gap-3 active:scale-[0.98] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            Load next batch
            <span className="size-8 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
              →
            </span>
          </button>
        ) : (
          <p className="text-sm text-white/50">Every mission in this set has been sent. Upload a new set to keep going.</p>
        )}
      </div>
    </div>
  )
}
