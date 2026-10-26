import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { HeartPulse, Leaf, ShieldCheck, Zap } from 'lucide-react'

const focus = [
  { icon: Leaf, label: 'Climate' },
  { icon: Zap, label: 'Energy' },
  { icon: HeartPulse, label: 'Health' },
  { icon: ShieldCheck, label: 'Sovereignty' },
]

export default function MissionSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()

  return (
    <section id="mission" ref={ref} className="py-16 md:py-24 px-6 overflow-hidden">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="liquid-glass rounded-3xl max-w-6xl mx-auto p-8 md:p-14 bg-linear-to-br from-violet-500/20 via-transparent to-cyan-400/20"
      >
        <p className="text-white/40 text-sm tracking-widest uppercase mb-6">What the asks are for</p>
        <h2 className="text-3xl md:text-5xl text-white tracking-tight leading-[1.1] mb-6 max-w-3xl">
          The asks are the <em className="font-display italic cosmic-text">means</em>. The mission is the point.
        </h2>
        <p className="text-white/70 text-lg leading-relaxed max-w-3xl mb-10">
          I'm building toward a think tank of innovators working on problems that affect everyone: climate, energy,
          health, and sovereignty over our own data and lives. Every company I'm asking builds a piece of that future. I
          want to learn from them, build alongside them, and bring other builders with me.
        </p>
        <ul className="flex flex-wrap gap-3">
          {focus.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-2 text-sm text-white/80"
            >
              <Icon size={16} />
              {label}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}
