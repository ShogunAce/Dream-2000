import { useEffect, useRef, useState } from 'react'
import { Check, Copy, X } from 'lucide-react'
import type { Mission } from '../../types'
import { markSent } from '../../lib/store'

export default function MissionPopup({ mission, onClose }: { mission: Mission; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const sent = mission.status !== 'uncontacted'

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  async function copy() {
    try {
      await navigator.clipboard.writeText(mission.message)
      setCopied(true)
      setCopyFailed(false)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard blocked: select the text so it can be copied by hand
      messageRef.current?.select()
      setCopyFailed(true)
    }
  }

  const details: [string, string][] = [
    ['The ask', mission.ask],
    ['Contact', [mission.contactName, mission.contactTitle].filter(Boolean).join(', ')],
    ['Best channel', mission.channel],
    ['Email', mission.email],
    ['X', mission.xHandle],
    ['LinkedIn', mission.linkedin],
    ['Notes', mission.notes],
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-label={`Mission: ${mission.company}`}
        className="liquid-glass rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 md:p-8 bg-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="font-hud text-xs uppercase tracking-widest text-white/40 mb-1">{mission.priority} priority</p>
            <h2 className="font-display text-4xl">{mission.company}</h2>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-white/50 hover:text-white">
            <X size={22} />
          </button>
        </div>

        <dl className="space-y-3 mb-6">
          {details
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label}>
                <dt className="font-hud text-xs uppercase tracking-widest text-white/40">{label}</dt>
                <dd className="text-sm text-white/80 break-words">{value}</dd>
              </div>
            ))}
        </dl>

        <label className="font-hud text-xs uppercase tracking-widest text-white/40" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          ref={messageRef}
          readOnly
          value={mission.message}
          rows={6}
          className="w-full mt-2 mb-3 rounded-2xl bg-white/5 p-4 text-sm leading-relaxed text-white/90 resize-none"
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={copy}
            className="liquid-glass rounded-full px-5 py-2 text-sm font-medium flex items-center gap-2 hover:bg-white/5"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied' : 'Copy message'}
          </button>
          {copyFailed && <span className="text-xs text-amber-300">Copy was blocked. The text is selected, press Ctrl+C.</span>}
        </div>

        <label className="mt-6 flex items-center gap-3 text-sm cursor-pointer">
          <input
            type="checkbox"
            className="size-5 accent-amber-300"
            checked={sent}
            disabled={sent}
            onChange={() => markSent(mission.id)}
          />
          {sent ? 'Sent. Waiting for a reply.' : "I've sent it"}
        </label>
      </div>
    </div>
  )
}
