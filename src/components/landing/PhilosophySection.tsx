import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import LoopVideo from './LoopVideo'

export default function PhilosophySection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()
  const from = (x: number) => (reduced ? false : { opacity: 0, x })

  return (
    <section ref={ref} className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24"
        >
          No <em className="italic text-white/40">x</em> Yes
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={from(-40)}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden aspect-[4/3] bg-black"
          >
            <LoopVideo src="/videos/philosophy.mp4" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={from(40)}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center gap-8"
          >
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Why 2,000</p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Rejection stings less every time you meet it. By the hundredth no, fear loses its grip. By the thousandth,
                you are asking for things you never would have dared to before.
              </p>
            </div>
            <div className="w-full h-px bg-white/10" />
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">The Odds Are On Your Side</p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Every no is also a step toward a yes. The more you ask, the more doors open, and every answer, good or bad,
                shows you how to ask better next time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
