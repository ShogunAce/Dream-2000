import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** A cockpit panel: outer tray plus inner glass core, with a heavy fade-up entrance. */
export default function Bezel({
  children,
  eyebrow,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  eyebrow?: string
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.section
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.32, 0.72, 0, 1] }}
      className={`bezel-shell ${className}`}
    >
      <div className="bezel-core p-5 md:p-7 h-full">
        {eyebrow && <span className="eyebrow mb-5">{eyebrow}</span>}
        {children}
      </div>
    </motion.section>
  )
}
