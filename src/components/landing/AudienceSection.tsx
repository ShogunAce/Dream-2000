import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Briefcase, FileText, Megaphone, Rocket } from 'lucide-react'

const audiences = [
  { icon: Rocket, text: 'Founders sending cold outreach' },
  { icon: Briefcase, text: 'Freelancers pitching clients' },
  { icon: FileText, text: 'Job seekers applying' },
  { icon: Megaphone, text: 'Creators pitching brands and sponsors' },
]

export default function AudienceSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()

  return (
    <section ref={ref} className="bg-black py-16 md:py-24 px-6 overflow-hidden">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="liquid-glass rounded-3xl max-w-6xl mx-auto p-8 md:p-12"
      >
        <p className="text-white/40 text-sm tracking-widest uppercase mb-8">Built for people who have to ask</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
          {audiences.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-4 text-white text-lg md:text-xl">
              <span className="size-11 shrink-0 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
                <Icon size={20} className="text-white/80" />
              </span>
              {text}
            </li>
          ))}
        </ul>
        <p className="text-white/50 text-sm mt-10">Built by a founder who needed it first.</p>
      </motion.div>
    </section>
  )
}
