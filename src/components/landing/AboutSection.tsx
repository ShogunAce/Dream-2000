import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()
  const hidden = reduced ? false : { opacity: 0, y: 20 }

  return (
    <section
      id="challenge"
      ref={ref}
      className="bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={hidden}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-sm tracking-widest uppercase mb-6"
        >
          The Challenge
        </motion.p>
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight"
        >
          Collecting <em className="italic text-white/60">rejections</em> to
          <br className="hidden md:block" /> <em className="italic text-white/60">build, learn, and break through.</em>
        </motion.h2>
      </div>
    </section>
  )
}
