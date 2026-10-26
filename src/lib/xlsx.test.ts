import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import Papa from 'papaparse'
import writeExcelFile from 'write-excel-file/node'
import { readSheet } from 'read-excel-file/node'
import { parseMissionCsv, parseMissionRows } from './csv'

describe('Excel upload', () => {
  it('loads the same missions from an .xlsx file as from the CSV', async () => {
    const csvText = readFileSync('sample-data/demo-missions.csv', 'utf8')
    const rows = Papa.parse<string[]>(csvText, { skipEmptyLines: true }).data
    // numbers in Excel arrive as numbers, empty cells as null
    const sheetData = rows.map((row, r) =>
      row.map((cell) => {
        if (cell === '') return null
        if (r > 0 && /^\d+$/.test(cell)) return Number(cell)
        return cell
      }),
    )

    const path = join(mkdtempSync(join(tmpdir(), 'dream2000-')), 'missions.xlsx')
    await writeExcelFile(sheetData).toFile(path)

    const fromExcel = parseMissionRows((await readSheet(path)) as unknown[][])
    const fromCsv = parseMissionCsv(csvText)
    expect(fromExcel.ok && fromCsv.ok).toBe(true)
    if (!fromExcel.ok || !fromCsv.ok) return
    expect(fromExcel.missions).toHaveLength(10)
    expect(fromExcel.missions.map((m) => [m.order, m.company, m.priority, m.message])).toEqual(
      fromCsv.missions.map((m) => [m.order, m.company, m.priority, m.message]),
    )
  })
})
