import { useSyncExternalStore } from 'react'
import type { AppState, Mission } from '../types'

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

export function useStore(): AppState {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => state,
  )
}
