import { GOAL, levelFromXp } from '../../lib/xp'
import { setProfile } from '../../lib/store'

export default function HudBar({ callsign, totalXp, noCount }: { callsign: string; totalXp: number; noCount: number }) {
  const { level, xpIntoLevel, xpNeeded } = levelFromXp(totalXp)
  const fill = Math.min(1, xpIntoLevel / xpNeeded)

  return (
    <div className="bezel-shell">
      <header className="bezel-core px-6 py-5 md:px-8 flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-[220px] flex-1">
          <input
            aria-label="Pilot callsign"
            defaultValue={callsign}
            maxLength={24}
            onBlur={(e) => setProfile({ callsign: e.target.value.trim() || 'Pilot' })}
            className="eyebrow bg-transparent w-40 outline-none focus:text-white"
          />
          <p className="font-display text-5xl mt-3 leading-none">
            Level <span className="text-amber-200">{level}</span>
          </p>
          <div
            className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden"
            role="progressbar"
            aria-label="XP to next level"
            aria-valuenow={xpIntoLevel}
            aria-valuemax={xpNeeded}
          >
            <div
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-cyan-200 transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{ transform: `scaleX(${fill})` }}
            />
          </div>
          <p className="font-hud text-xs tracking-wider text-white/50 mt-2">
            {xpIntoLevel} / {xpNeeded} XP to level {level + 1}
          </p>
        </div>
        <div className="text-right">
          <span className="eyebrow">No's collected</span>
          <p className="font-display text-6xl md:text-7xl leading-none mt-3" data-testid="counter">
            {noCount.toLocaleString()}
            <span className="text-white/30 text-4xl md:text-5xl"> / {GOAL.toLocaleString()}</span>
          </p>
        </div>
      </header>
    </div>
  )
}
