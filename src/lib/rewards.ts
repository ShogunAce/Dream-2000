import { logNo, logYes, type OutcomeResult } from './store'

/**
 * Animations listen here. The store has already updated the numbers by the time
 * anything is announced, so an animation can never change XP, level, or the counter.
 */
type Listener = (result: OutcomeResult) => void
const listeners = new Set<Listener>()

export function onReward(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function announce(result: OutcomeResult | null) {
  if (result) listeners.forEach((l) => l(result))
  return result
}

export const recordNo = (id: string) => announce(logNo(id))
export const recordYes = (id: string) => announce(logYes(id))
