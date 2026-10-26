import Papa from 'papaparse'
import type { Mission, Priority } from '../types'

export type CsvResult =
  | { ok: true; missions: Mission[] }
  | { ok: false; error: string }

export const BAD_FILE = "This file doesn't look like a mission set."

function normalizePriority(value: string): Priority {
  const v = value.trim().toLowerCase()
  if (v === 'high') return 'High'
  if (v === 'medium') return 'Medium'
  return 'Entry'
}

/** Turns any spreadsheet cell (text, number, date, empty) into trimmed text. */
function cellText(cell: unknown): string {
  if (cell === null || cell === undefined) return ''
  if (cell instanceof Date) return cell.toISOString().slice(0, 10)
  return String(cell).trim()
}

const FLAG = /^(yes|no|y|n|true|false|done|drafted|x|✓|✔)$/i

/**
 * Finds the text to copy. "MESSAGE DRAFTED" is sometimes a yes/no flag with the real
 * message in another column (MESSAGE, DRAFT, ...), so look at every message-like column,
 * skip bare flags, and take the longest remaining text.
 */
function pickMessage(record: Record<string, string>): string {
  if (record['MESSAGE'] && !FLAG.test(record['MESSAGE'])) return record['MESSAGE']
  const candidates = Object.entries(record)
    .filter(([header]) => /MESSAGE|DRAFT|COPY|PITCH|TEMPLATE|SCRIPT/.test(header))
    .map(([, value]) => value)
    .filter((value) => value && !FLAG.test(value))
  return candidates.sort((a, b) => b.length - a.length)[0] ?? ''
}

/**
 * Builds missions from spreadsheet rows (first row = headers). Used for both CSV
 * and Excel files, so the column mapping lives in one place.
 */
export function parseMissionRows(rows: unknown[][]): CsvResult {
  if (rows.length < 2) return { ok: false, error: BAD_FILE }

  const headers = rows[0].map((h) => cellText(h).toUpperCase())
  if (!headers.includes('COMPANY')) return { ok: false, error: BAD_FILE }

  const toRecord = (row: unknown[]) => {
    const record: Record<string, string> = {}
    headers.forEach((h, i) => {
      if (h) record[h] = cellText(row[i])
    })
    return record
  }
  const get = (record: Record<string, string>, key: string) => record[key] ?? ''

  const missions: Mission[] = rows
    .slice(1)
    .map(toRecord)
    .filter((record) => get(record, 'COMPANY') !== '')
    .map((record, index) => {
      const order = Number(get(record, '#')) || index + 1
      return {
        id: `m${order}-${index}`,
        order,
        company: get(record, 'COMPANY'),
        priority: normalizePriority(get(record, 'PRIORITY')),
        ask: get(record, 'THE ASK'),
        message: pickMessage(record),
        contactName: get(record, 'CONTACT NAME'),
        contactTitle: get(record, 'CONTACT TITLE'),
        channel: get(record, 'BEST CHANNEL'),
        email: get(record, 'PARTNERSHIP EMAIL'),
        linkedin: get(record, 'LINKEDIN URL'),
        xHandle: get(record, 'X HANDLE'),
        notes: get(record, 'NOTES'),
        status: 'uncontacted' as const,
        xpEarned: 0,
      }
    })
    .sort((a, b) => a.order - b.order)

  if (missions.length === 0) return { ok: false, error: BAD_FILE }
  return { ok: true, missions }
}

export function parseMissionCsv(text: string): CsvResult {
  try {
    const parsed = Papa.parse<string[]>(text, { skipEmptyLines: true })
    return parseMissionRows(parsed.data)
  } catch {
    return { ok: false, error: BAD_FILE }
  }
}
