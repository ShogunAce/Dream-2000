import { useEffect, useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { readMissionFile } from '../../lib/importFile'
import { loadMissions } from '../../lib/store'

export default function UploadPanel({ hasMissions }: { hasMissions: boolean }) {
  const input = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)

  async function onFile(file: File | undefined) {
    if (!file) return
    const result = await readMissionFile(file)
    if (!result.ok) {
      setError(result.error)
    } else {
      if (hasMissions && !window.confirm('Replace your current missions? XP and history are kept.')) return
      setError('')
      loadMissions(result.missions)
    }
    if (input.current) input.current.value = ''
  }

  // Dropping a file anywhere on the page loads it.
  const latest = useRef(onFile)
  latest.current = onFile
  useEffect(() => {
    let depth = 0
    const hasFiles = (e: DragEvent) => Array.from(e.dataTransfer?.types ?? []).includes('Files')
    const enter = (e: DragEvent) => {
      if (!hasFiles(e)) return
      depth += 1
      setDragging(true)
    }
    const leave = (e: DragEvent) => {
      if (!hasFiles(e)) return
      depth = Math.max(0, depth - 1)
      if (depth === 0) setDragging(false)
    }
    const over = (e: DragEvent) => hasFiles(e) && e.preventDefault()
    const drop = (e: DragEvent) => {
      if (!hasFiles(e)) return
      e.preventDefault()
      depth = 0
      setDragging(false)
      latest.current(e.dataTransfer?.files?.[0])
    }
    window.addEventListener('dragenter', enter)
    window.addEventListener('dragleave', leave)
    window.addEventListener('dragover', over)
    window.addEventListener('drop', drop)
    return () => {
      window.removeEventListener('dragenter', enter)
      window.removeEventListener('dragleave', leave)
      window.removeEventListener('dragover', over)
      window.removeEventListener('drop', drop)
    }
  }, [])

  return (
    <div>
      <input
        ref={input}
        type="file"
        accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        className="hidden"
        data-testid="mission-file"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
      <button
        onClick={() => input.current?.click()}
        className="liquid-glass rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 mx-auto hover:bg-white/5 transition-colors"
      >
        <Upload size={16} /> Upload mission set
      </button>
      <p className="mt-3 text-xs text-white/40 text-center">Or drop a .csv or .xlsx file anywhere on this page.</p>
      {error && <p role="alert" className="mt-3 text-sm text-amber-300 text-center">{error}</p>}
      {dragging && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 border-2 border-dashed border-amber-300/70 pointer-events-none">
          <p className="font-display text-5xl text-amber-200">Drop to load your missions</p>
        </div>
      )}
    </div>
  )
}
