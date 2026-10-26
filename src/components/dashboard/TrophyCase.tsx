import { Trophy } from 'lucide-react'
import type { Badge } from '../../types'
import Bezel from './Bezel'

export default function TrophyCase({ badges }: { badges: Badge[] }) {
  return (
    <Bezel eyebrow="Trophy case" delay={0.25}>
      {badges.length === 0 ? (
        <p className="text-sm text-white/50 leading-relaxed">
          Yes's are rare. Your first badge will live here.
        </p>
      ) : (
        <ul className="space-y-3">
          {badges.map((b) => (
            <li key={b.id} className="cockpit-row px-4 py-3 flex items-center gap-3">
              <span className="size-9 shrink-0 rounded-full bg-amber-300/15 text-amber-200 flex items-center justify-center">
                <Trophy size={18} strokeWidth={1.5} />
              </span>
              <span className="min-w-0">
                <span className="block font-hud text-sm truncate">{b.company}</span>
                <span className="block text-xs text-white/50 truncate">{b.ask}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </Bezel>
  )
}
