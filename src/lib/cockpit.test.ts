import { readFileSync } from 'node:fs'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { QUOTES, quoteForDate } from './quotes'

describe('daily quote', () => {
  it('is the same all day and changes the next day', () => {
    expect(quoteForDate('2026-10-26')).toEqual(quoteForDate('2026-10-26'))
    expect(quoteForDate('2026-10-27')).not.toEqual(quoteForDate('2026-10-26'))
  })

  it('always returns a quote with an author', () => {
    for (let d = 1; d <= 30; d++) {
      const q = quoteForDate(`2026-11-${String(d).padStart(2, '0')}`)
      expect(QUOTES).toContainEqual(q)
      expect(q.author).not.toBe('')
    }
  })
})

describe('finishing a day and loading the next batch', () => {
  beforeEach(() => {
    vi.resetModules()
    const data = new Map<string, string>()
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => data.get(k) ?? null,
      setItem: (k: string, v: string) => void data.set(k, v),
    })
  })

  it('moves from the first 5 missions to the next 5, then runs out', async () => {
    const csv = await import('./csv')
    const store = await import('./store')
    const result = csv.parseMissionCsv(readFileSync('sample-data/demo-missions.csv', 'utf8'))
    if (!result.ok) throw new Error('sample file should parse')
    store.loadMissions(result.missions)

    const firstBatch = store.getState().batchIds
    expect(firstBatch).toHaveLength(5)
    firstBatch.forEach((id) => store.markSent(id))
    // day is done: nothing in the batch is still uncontacted
    const s = store.getState()
    expect(s.batchIds.every((id) => s.missions.find((m) => m.id === id)!.status !== 'uncontacted')).toBe(true)

    store.loadNextBatch()
    const second = store.getState().batchIds
    expect(second).toHaveLength(5)
    expect(second.some((id) => firstBatch.includes(id))).toBe(false)

    second.forEach((id) => store.markSent(id))
    store.loadNextBatch()
    expect(store.getState().batchIds).toEqual([])
  })

  it('saves the callsign and mission statement', async () => {
    const store = await import('./store')
    store.setProfile({ callsign: 'Nova', missionStatement: 'Ask boldly.' })
    vi.resetModules()
    const reloaded = await import('./store')
    expect(reloaded.getState().profile).toEqual({ callsign: 'Nova', missionStatement: 'Ask boldly.' })
  })
})
