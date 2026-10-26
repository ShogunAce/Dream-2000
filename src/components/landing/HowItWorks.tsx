import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import LoopVideo from './LoopVideo'

const cards = [
  {
    video: '/videos/card-log.mp4',
    tag: 'Step 1',
    title: 'Log Every No',
    text: 'Record each rejection in seconds: what you asked, who said no, and how it felt. Every entry moves the counter closer to 2,000.',
  },
  {
    video: '/videos/card-learn.mp4',
    tag: 'Step 2',
    title: 'Turn It Into a Yes',
    text: 'Review your patterns, find which asks get closer to a yes, and use what each no taught you to make your next attempt stronger.',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="bg-black py-28 md:py-40 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-12"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight">How it works</h2>
          <p className="hidden md:block text-white/40 text-sm">Two steps, one loop</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={reduced ? false : { opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <Link to="/dashboard" className="group block liquid-glass rounded-3xl overflow-hidden">
                <div className="aspect-video overflow-hidden relative bg-black">
                  <LoopVideo
                    src={c.video}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="uppercase tracking-widest text-white/40 text-xs">{c.tag}</span>
                    <span className="liquid-glass rounded-full p-2">
                      <ArrowUpRight size={16} className="text-white" />
                    </span>
                  </div>
                  <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight">{c.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{c.text}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
