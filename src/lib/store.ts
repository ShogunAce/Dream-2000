import { useSyncExternalStore } from 'react'
import type { AppState, Badge, Mission } from '../types'
import { levelFromXp, xpForNo, xpForYes } from './xp'

const KEY = 'dream2000_state'
export const BATCH_SIZE = 5

const today = () => new Date().toISOString().slice(0, 10)

const emptyState = (): AppState => ({
  missions: [],
  batchIds: [],
  batchDate: today(),
  totalXp: 0,
  noCount: 0,
  badges: [],
  profile: { callsign: 'Pilot', missionStatement: '' },
})

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return emptyState()
    return { ...emptyState(), ...JSON.parse(raw) }
  } catch {
    return emptyState()
  }
}

let state: AppState = load()
const listeners = new Set<() => void>()

function commit(next: AppState) {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
    localStorage.setItem('dream2000_count', String(state.noCount))
  } catch {
    // storage blocked: keep working in memory
  }
  listeners.forEach((l) => l())
}

export function nextBatchIds(missions: Mission[]): string[] {
  return missions
    .filter((m) => m.status === 'uncontacted')
    .slice(0, BATCH_SIZE)
    .map((m) => m.id)
}

/** Replaces the mission set. XP, counter, badges, and profile are kept. */
export function loadMissions(missions: Mission[]) {
  commit({ ...state, missions, batchIds: nextBatchIds(missions), batchDate: today() })
}

/** Moves an uncontacted mission to Waiting. Does nothing if it was already sent. */
export function markSent(id: string) {
  const mission = state.missions.find((m) => m.id === id)
  if (!mission || mission.status !== 'uncontacted') return
  commit({
    ...state,
    missions: state.missions.map((m) =>
      m.id === id ? { ...m, status: 'waiting', sentAt: new Date().toISOString() } : m,
    ),
  })
}

export interface OutcomeResult {
  outcome: 'no' | 'yes'
  xp: number
  leveledUp: boolean
  level: number
  badge?: Badge
}

/** Records the reply for a waiting mission. Does nothing (returns null) if it isn't waiting. */
function logOutcome(id: string, outcome: 'no' | 'yes'): OutcomeResult | null {
  const mission = state.missions.find((m) => m.id === id)
  if (!mission || mission.status !== 'waiting') return null

  const xp = outcome === 'yes' ? xpForYes(mission.priority) : xpForNo(mission.priority)
  const now = new Date().toISOString()
  const badge: Badge | undefined =
    outcome === 'yes'
      ? { id: `b-${mission.id}`, company: mission.company, ask: mission.ask, earnedAt: now }
      : undefined

  const before = levelFromXp(state.totalXp).level
  const totalXp = state.totalXp + xp
  const after = levelFromXp(totalXp).level

  commit({
    ...state,
    missions: state.missions.map((m) =>
      m.id === id ? { ...m, status: outcome, xpEarned: xp, resolvedAt: now, badgeId: badge?.id } : m,
    ),
    totalXp,
    noCount: outcome === 'no' ? state.noCount + 1 : state.noCount,
    badges: badge ? [...state.badges, badge] : state.badges,
  })
  return { outcome, xp, leveledUp: after > before, level: after, badge }
}

export const logNo = (id: string) => logOutcome(id, 'no')
export const logYes = (id: string) => logOutcome(id, 'yes')

export function getState(): AppState {
  return state
}

export function useStore(): AppState {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => state,
  )
}
