import { BAD_FILE, parseMissionCsv, parseMissionRows, type CsvResult } from './csv'

const WRONG_TYPE = 'Please use a .csv or .xlsx file. Older .xls files need to be saved as .xlsx first.'

/** Reads a dropped or picked file (CSV or Excel) into missions. Never throws. */
export async function readMissionFile(file: File): Promise<CsvResult> {
  const name = file.name.toLowerCase()
  try {
    if (name.endsWith('.csv') || file.type === 'text/csv') {
      return parseMissionCsv(await file.text())
    }
    if (name.endsWith('.xlsx')) {
      // loaded on demand so the Excel reader isn't downloaded until someone uploads one
      const { readSheet } = await import('read-excel-file/browser')
      return parseMissionRows((await readSheet(file)) as unknown[][])
    }
    return { ok: false, error: WRONG_TYPE }
  } catch {
    return { ok: false, error: BAD_FILE }
  }
}
