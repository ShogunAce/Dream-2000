import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { parseMissionCsv } from './csv'

describe('parseMissionCsv', () => {
  it('maps the sample file to 10 ordered missions', () => {
    const result = parseMissionCsv(readFileSync('sample-data/demo-missions.csv', 'utf8'))
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.missions).toHaveLength(10)
    expect(result.missions.map((m) => m.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(result.missions[0].company).toBe('Sample Orbit Labs')
    expect(result.missions[0].priority).toBe('High')
    expect(result.missions[0].message).toContain('sponsorship')
    expect(result.missions.every((m) => m.status === 'uncontacted')).toBe(true)
  })

  it('uses the real message when MESSAGE DRAFTED is only a yes/no flag', () => {
    const result = parseMissionCsv('COMPANY,MESSAGE DRAFTED,MESSAGE\nAcme,Yes,"Hi Acme, can we talk?"')
    expect(result.ok && result.missions[0].message).toBe('Hi Acme, can we talk?')
  })

  it('prefers an exact MESSAGE column over other message-like columns', () => {
    const result = parseMissionCsv('COMPANY,MESSAGE,NEXT DRAFT NOTE\nAcme,Short hi,A much longer note that is not the message')
    expect(result.ok && result.missions[0].message).toBe('Short hi')
  })

  it('treats a missing priority as Entry', () => {
    const result = parseMissionCsv('COMPANY,PRIORITY\nAcme,')
    expect(result.ok && result.missions[0].priority).toBe('Entry')
  })

  it('rejects a file with no COMPANY column', () => {
    expect(parseMissionCsv('foo,bar\n1,2').ok).toBe(false)
  })

  it('rejects an empty file', () => {
    expect(parseMissionCsv('').ok).toBe(false)
  })
})
