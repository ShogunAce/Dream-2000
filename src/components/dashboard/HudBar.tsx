import { GOAL, levelFromXp } from '../../lib/xp'

export default function HudBar({ callsign, totalXp, noCount }: { callsign: string; totalXp: number; noCount: number }) {
  const { level, xpIntoLevel, xpNeeded } = levelFromXp(totalXp)
  const pct = Math.min(100, (xpIntoLevel / xpNeeded) * 100)

  return (
    <header className="liquid-glass rounded-3xl px-6 py-5 mb-8 flex flex-wrap items-center justify-between gap-6">
      <div className="min-w-[200px] flex-1">
        <p className="font-hud text-xs uppercase tracking-widest text-white/40">{callsign}</p>
        <p className="font-hud text-2xl">Level {level}</p>
        <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden" role="progressbar" aria-label="XP to next level" aria-valuenow={xpIntoLevel} aria-valuemax={xpNeeded}>
          <div className="h-full bg-amber-300" style={{ width: `${pct}%` }} />
        </div>
        <p className="font-hud text-xs text-white/50 mt-1">
          {xpIntoLevel} / {xpNeeded} XP
        </p>
      </div>
      <div className="text-right">
        <p className="font-hud text-xs uppercase tracking-widest text-white/40">No's collected</p>
        <p className="font-display text-5xl" data-testid="counter">
          {noCount.toLocaleString()} <span className="text-white/40">/ {GOAL.toLocaleString()}</span>
        </p>
      </div>
    </header>
  )
}
