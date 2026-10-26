import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const FLAG = 'dream2000_intro_played'

function shouldSkip(): boolean {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
    return sessionStorage.getItem(FLAG) === '1'
  } catch {
    return false
  }
}

/**
 * The astronaut re-entering the ship. Plays once per browser session, can be
 * skipped, and disappears on its own if the video file is missing.
 */
export default function EntryAnimation() {
  const [open, setOpen] = useState(() => !shouldSkip())

  function finish() {
    try {
      sessionStorage.setItem(FLAG, '1')
    } catch {
      // storage blocked: the intro may play again, which is harmless
    }
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        >
          <video
            src="/videos/intro.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={finish}
            onError={finish}
            aria-label="An astronaut returns inside the ship"
          />
          <button
            onClick={finish}
            className="absolute bottom-8 right-6 eyebrow bg-black/50 hover:text-white transition-colors duration-500"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
