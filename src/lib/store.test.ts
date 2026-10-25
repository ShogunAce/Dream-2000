import { readFileSync } from 'node:fs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

function stubStorage() {
  const data = new Map<string, string>()
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
  })
}

describe('store persistence', () => {
  beforeEach(() => {
    vi.resetModules()
    stubStorage()
  })

  it('keeps missions and the day batch after a reload', async () => {
    const csv = await import('./csv')
    const first = await import('./store')
    const result = csv.parseMissionCsv(readFileSync('sample-data/demo-missions.csv', 'utf8'))
    if (!result.ok) throw new Error('sample file should parse')
    first.loadMissions(result.missions)

    vi.resetModules()
    const reloaded = await import('./store')
    const { useStore, nextBatchIds } = reloaded
    expect(typeof useStore).toBe('function')
    const saved = JSON.parse(localStorage.getItem('dream2000_state')!)
    expect(saved.missions).toHaveLength(10)
    expect(saved.batchIds).toHaveLength(5)
    expect(nextBatchIds(saved.missions)).toEqual(saved.batchIds)
  })

  it('starts empty when saved data is corrupted', async () => {
    localStorage.setItem('dream2000_state', '{not json')
    const { nextBatchIds } = await import('./store')
    expect(nextBatchIds([])).toEqual([])
  })
})
