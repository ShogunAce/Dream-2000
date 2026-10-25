import Papa from 'papaparse'
import type { Mission, Priority } from '../types'

export type CsvResult =
  | { ok: true; missions: Mission[] }
  | { ok: false; error: string }

const BAD_FILE = "This file doesn't look like a mission set."

function normalizePriority(value: string): Priority {
  const v = value.trim().toLowerCase()
  if (v === 'high') return 'High'
  if (v === 'medium') return 'Medium'
  return 'Entry'
}

export function parseMissionCsv(text: string): CsvResult {
  let parsed: Papa.ParseResult<Record<string, string>>
  try {
    parsed = Papa.parse<Record<string, string>>(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toUpperCase(),
    })
  } catch {
    return { ok: false, error: BAD_FILE }
  }

  const fields = parsed.meta.fields ?? []
  if (!fields.includes('COMPANY')) return { ok: false, error: BAD_FILE }

  const get = (row: Record<string, string>, key: string) => (row[key] ?? '').trim()

  const missions: Mission[] = parsed.data
    .filter((row) => get(row, 'COMPANY') !== '')
    .map((row, index) => {
      const order = Number(get(row, '#')) || index + 1
      return {
        id: `m${order}-${index}`,
        order,
        company: get(row, 'COMPANY'),
        priority: normalizePriority(get(row, 'PRIORITY')),
        ask: get(row, 'THE ASK'),
        message: get(row, 'MESSAGE DRAFTED'),
        contactName: get(row, 'CONTACT NAME'),
        contactTitle: get(row, 'CONTACT TITLE'),
        channel: get(row, 'BEST CHANNEL'),
        email: get(row, 'PARTNERSHIP EMAIL'),
        linkedin: get(row, 'LINKEDIN URL'),
        xHandle: get(row, 'X HANDLE'),
        notes: get(row, 'NOTES'),
        status: 'uncontacted' as const,
        xpEarned: 0,
      }
    })
    .sort((a, b) => a.order - b.order)

  if (missions.length === 0) return { ok: false, error: BAD_FILE }
  return { ok: true, missions }
}
