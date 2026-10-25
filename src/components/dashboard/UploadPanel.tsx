import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { parseMissionCsv } from '../../lib/csv'
import { loadMissions } from '../../lib/store'

export default function UploadPanel({ hasMissions }: { hasMissions: boolean }) {
  const input = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')

  async function onFile(file: File | undefined) {
    if (!file) return
    const result = parseMissionCsv(await file.text())
    if (!result.ok) {
      setError(result.error)
    } else {
      if (hasMissions && !window.confirm('Replace your current missions? XP and history are kept.')) return
      setError('')
      loadMissions(result.missions)
    }
    if (input.current) input.current.value = ''
  }

  return (
    <div>
      <input
        ref={input}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        data-testid="mission-file"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
      <button
        onClick={() => input.current?.click()}
        className="liquid-glass rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition-colors"
      >
        <Upload size={16} /> Upload mission set
      </button>
      {error && <p role="alert" className="mt-3 text-sm text-amber-300">{error}</p>}
    </div>
  )
}
