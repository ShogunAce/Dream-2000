import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import LoopVideo from './LoopVideo'

export default function FeaturedVideoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()

  return (
    <section className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={reduced ? false : { opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="rounded-3xl overflow-hidden aspect-video relative bg-black"
        >
          <LoopVideo src="/videos/featured.mp4" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
              <p className="text-white/50 text-xs tracking-widest uppercase mb-3">The Method</p>
              <p className="text-white text-sm md:text-base leading-relaxed">
                Most people avoid rejection. Dream 2000 does the opposite: ask boldly, collect the no, and treat it as data.
                2,000 attempts will teach you more than any playbook.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="self-start md:self-auto">
              <Link to="/dashboard" className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium inline-block">
                Open Dashboard
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
