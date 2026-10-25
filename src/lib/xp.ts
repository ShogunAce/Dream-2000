import type { Priority } from '../types'

export const GOAL = 2000
export const YES_MULTIPLIER = 5

export const NO_XP: Record<Priority, number> = { Entry: 10, Medium: 25, High: 50 }

export const xpForNo = (priority: Priority) => NO_XP[priority]
export const xpForYes = (priority: Priority) => NO_XP[priority] * YES_MULTIPLIER

/** XP needed to go from level n to level n + 1. Each level costs more than the last. */
export const xpToNextLevel = (level: number) => 100 + 50 * (level - 1)

export interface LevelInfo {
  level: number
  xpIntoLevel: number
  xpNeeded: number
}

/** The level is always worked out from total XP, never stored. */
export function levelFromXp(totalXp: number): LevelInfo {
  let level = 1
  let remaining = Math.max(0, totalXp)
  while (remaining >= xpToNextLevel(level)) {
    remaining -= xpToNextLevel(level)
    level += 1
  }
  return { level, xpIntoLevel: remaining, xpNeeded: xpToNextLevel(level) }
}
