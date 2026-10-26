import { readFileSync } from 'node:fs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('reward announcements', () => {
  beforeEach(() => {
    vi.resetModules()
    const data = new Map<string, string>()
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => data.get(k) ?? null,
      setItem: (k: string, v: string) => void data.set(k, v),
    })
  })

  async function setup() {
    const csv = await import('./csv')
    const store = await import('./store')
    const rewards = await import('./rewards')
    const result = csv.parseMissionCsv(readFileSync('sample-data/demo-missions.csv', 'utf8'))
    if (!result.ok) throw new Error('sample file should parse')
    store.loadMissions(result.missions)
    return { store, rewards }
  }

  it('announces after the numbers are already saved, exactly once per click', async () => {
    const { store, rewards } = await setup()
    const [orbit] = store.getState().missions
    store.markSent(orbit.id)

    const seen: { xp: number; totalXpAtAnnounce: number }[] = []
    rewards.onReward((r) => seen.push({ xp: r.xp, totalXpAtAnnounce: store.getState().totalXp }))

    rewards.recordYes(orbit.id)
    rewards.recordYes(orbit.id) // rapid second click
    rewards.recordNo(orbit.id) // and a click on the other button

    expect(seen).toEqual([{ xp: 250, totalXpAtAnnounce: 250 }])
    expect(store.getState().totalXp).toBe(250)
    expect(store.getState().noCount).toBe(0)
    expect(store.getState().badges).toHaveLength(1)
  })

  it('announces nothing for a mission that was never sent', async () => {
    const { store, rewards } = await setup()
    const listener = vi.fn()
    rewards.onReward(listener)
    rewards.recordNo(store.getState().missions[0].id)
    expect(listener).not.toHaveBeenCalled()
    expect(store.getState().totalXp).toBe(0)
  })
})
