import { readFileSync } from 'node:fs'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { levelFromXp, xpForNo, xpForYes, xpToNextLevel } from './xp'

describe('xp math', () => {
  it('weights No by priority and Yes at 5x', () => {
    expect(xpForNo('Entry')).toBe(10)
    expect(xpForNo('Medium')).toBe(25)
    expect(xpForNo('High')).toBe(50)
    expect(xpForYes('Entry')).toBe(50)
    expect(xpForYes('Medium')).toBe(125)
    expect(xpForYes('High')).toBe(250)
  })

  it('gets harder each level', () => {
    expect(xpToNextLevel(1)).toBe(100)
    expect(xpToNextLevel(2)).toBe(150)
    expect(xpToNextLevel(3)).toBe(200)
  })

  it('works out the level from total XP', () => {
    expect(levelFromXp(0)).toEqual({ level: 1, xpIntoLevel: 0, xpNeeded: 100 })
    expect(levelFromXp(99).level).toBe(1)
    expect(levelFromXp(100)).toEqual({ level: 2, xpIntoLevel: 0, xpNeeded: 150 })
    expect(levelFromXp(250)).toEqual({ level: 3, xpIntoLevel: 0, xpNeeded: 200 })
  })
})

describe('logging outcomes', () => {
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
    const result = csv.parseMissionCsv(readFileSync('sample-data/demo-missions.csv', 'utf8'))
    if (!result.ok) throw new Error('sample file should parse')
    store.loadMissions(result.missions)
    return store
  }

  it('No adds XP by priority and counts once; Yes adds XP and a badge without counting', async () => {
    const store = await setup()
    const [orbit, nova, pixel] = store.getState().missions // High, Medium, Entry
    ;[orbit, nova, pixel].forEach((m) => store.markSent(m.id))

    const no = store.logNo(orbit.id)
    expect(no?.xp).toBe(50)
    store.logNo(orbit.id) // double click: ignored
    expect(store.logNo(orbit.id)).toBeNull()

    const yes = store.logYes(nova.id)
    expect(yes?.xp).toBe(125)
    expect(yes?.badge?.company).toBe('Sample Nova Cloud')

    const s = store.getState()
    expect(s.totalXp).toBe(175)
    expect(s.noCount).toBe(1)
    expect(s.badges).toHaveLength(1)
    expect(s.missions.find((m) => m.id === orbit.id)?.status).toBe('no')
    expect(s.missions.find((m) => m.id === nova.id)?.status).toBe('yes')
    expect(s.missions.find((m) => m.id === pixel.id)?.status).toBe('waiting')
    expect(localStorage.getItem('dream2000_count')).toBe('1')
  })

  it('cannot log an outcome for a mission that was never sent', async () => {
    const store = await setup()
    expect(store.logNo(store.getState().missions[0].id)).toBeNull()
    expect(store.getState().totalXp).toBe(0)
  })

  it('reports a level-up and survives a reload', async () => {
    const store = await setup()
    const high = store.getState().missions[0]
    store.markSent(high.id)
    const result = store.logYes(high.id) // 250 XP: level 1 to 3
    expect(result?.leveledUp).toBe(true)
    expect(result?.level).toBe(3)

    vi.resetModules()
    const reloaded = await import('./store')
    expect(reloaded.getState().totalXp).toBe(250)
    expect(reloaded.getState().badges).toHaveLength(1)
  })
})
