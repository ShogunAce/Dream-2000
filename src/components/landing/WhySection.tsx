import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function WhySection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()
  const from = reduced ? false : { opacity: 0, y: 30 }

  return (
    <section id="why" ref={ref} className="py-16 md:py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <motion.div initial={from} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <p className="text-white/40 text-sm tracking-widest uppercase mb-6">Why this exists</p>
          <h2 className="text-4xl md:text-6xl text-white leading-[1.1] tracking-tight">
            You can't improve at asking if you never count the <em className="font-display italic cosmic-text">no's</em>.
          </h2>
        </motion.div>
        <motion.div
          initial={from}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white/70 text-lg leading-relaxed space-y-5 md:pt-14"
        >
          <p>
            Founders, freelancers, job seekers and creators all run on the same thing: getting people to say yes. The ask
            is where most of us stall, so most of us ask too rarely and learn nothing from the answers.
          </p>
          <p>
            Dream 2000 makes the no's the goal. Reach 2,000 and you will have asked more, learned faster and heard more
            yeses than someone who was afraid of the first one.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
