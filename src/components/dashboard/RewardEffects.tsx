import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { onReward } from '../../lib/rewards'
import type { OutcomeResult } from '../../lib/store'

const EASE = [0.32, 0.72, 0, 1] as const
const SPARKS = Array.from({ length: 18 }, (_, i) => i)

interface Shown extends OutcomeResult {
  key: number
}

/** Floating XP toast, level-up banner, and the Yes trophy moment. Display only. */
export default function RewardEffects() {
  const reduced = useReducedMotion()
  const [toast, setToast] = useState<Shown | null>(null)
  const [levelUp, setLevelUp] = useState<Shown | null>(null)
  const [trophy, setTrophy] = useState<Shown | null>(null)

  useEffect(() => {
    let n = 0
    return onReward((result) => {
      const shown = { ...result, key: ++n }
      setToast(shown)
      if (result.leveledUp) setLevelUp(shown)
      if (result.outcome === 'yes') setTrophy(shown)
    })
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])
  useEffect(() => {
    if (!levelUp) return
    const t = setTimeout(() => setLevelUp(null), 2400)
    return () => clearTimeout(t)
  }, [levelUp])
  useEffect(() => {
    if (!trophy) return
    const t = setTimeout(() => setTrophy(null), 5200)
    return () => clearTimeout(t)
  }, [trophy])

  return (
    <>
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.key}
            role="status"
            initial={reduced ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 rounded-full bg-black/80 ring-1 ring-amber-300/40 px-6 py-3 font-hud text-sm tracking-wide"
          >
            {toast.outcome === 'yes' ? 'Signal received: YES' : 'Signal received: No'}{' '}
            <span className="text-amber-200">+{toast.xp} XP</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {levelUp && (
          <motion.div
            key={`lvl-${levelUp.key}`}
            initial={reduced ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center"
          >
            <p className="eyebrow">Level up</p>
            <p className="font-display text-7xl md:text-8xl text-amber-200 drop-shadow-[0_0_40px_rgba(252,211,77,0.6)]">
              Level {levelUp.level}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {trophy && (
          <motion.div
            key={`yes-${trophy.key}`}
            role="dialog"
            aria-label="New partnership trophy"
            onClick={() => setTrophy(null)}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 cursor-pointer"
          >
            {!reduced &&
              [0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute size-72 rounded-full ring-1 ring-amber-300/40"
                  initial={{ scale: 0.2, opacity: 0.8 }}
                  animate={{ scale: 3.2, opacity: 0 }}
                  transition={{ duration: 2.4, delay: i * 0.45, ease: EASE, repeat: 1 }}
                />
              ))}
            {!reduced &&
              SPARKS.map((i) => {
                const angle = (i / SPARKS.length) * Math.PI * 2
                return (
                  <motion.span
                    key={`s${i}`}
                    className="absolute size-2 rounded-full bg-amber-200"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x: Math.cos(angle) * 260, y: Math.sin(angle) * 260, opacity: 0, scale: 0.3 }}
                    transition={{ duration: 1.6, delay: 0.25, ease: EASE }}
                  />
                )
              })}
            <motion.div
              initial={reduced ? false : { scale: 0.4, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.1 }}
              className="relative text-center px-6"
            >
              <span className="mx-auto size-28 rounded-full bg-amber-300/15 ring-1 ring-amber-300/50 text-amber-200 flex items-center justify-center shadow-[0_0_80px_rgba(252,211,77,0.45)]">
                <Trophy size={56} strokeWidth={1.25} />
              </span>
              <p className="eyebrow mt-8">New business relationship</p>
              <p className="font-display text-6xl md:text-7xl mt-4">A yes.</p>
              {trophy.badge && (
                <p className="font-hud mt-4 text-white/70">
                  {trophy.badge.company} <span className="text-white/30">·</span> {trophy.badge.ask}
                </p>
              )}
              <p className="font-hud text-amber-200 mt-3">+{trophy.xp} XP · badge added to your trophy case</p>
              <p className="text-xs text-white/35 mt-8">Click anywhere to continue</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
