import { useRef, type ComponentType } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { DoorOpen, Handshake, Wrench } from 'lucide-react'
import { getState } from '../../lib/store'
import type { Mission } from '../../types'

// Shown only until a real ask from the loaded sheet matches. It is one of my own asks.
const ACCESS_FALLBACK = 'Fly me to Anthropic HQ for a documented Think Tank research day and public video series.'

interface Card {
  icon: ComponentType<{ size?: number; className?: string }>
  tag: string
  title: string
  text: string
  match: RegExp
  fallback?: string
  glow: string
}

const cards: Card[] = [
  {
    icon: DoorOpen,
    tag: 'Access',
    title: "Doors I'd love opened",
    text: "A day inside the labs and headquarters shaping the future, documented as a public video series. I'd like to see how the best teams work, up close.",
    match: /fly|visit|hq|headquarters|research day|tour/i,
    fallback: ACCESS_FALLBACK,
    glow: 'from-violet-500/30',
  },
  {
    icon: Wrench,
    tag: 'Tools',
    title: 'Tools to build with',
    text: "API credits and free access so I can keep building in public and show what's possible with a solo founder and the right stack.",
    match: /credit|api|free/i,
    glow: 'from-cyan-400/30',
  },
  {
    icon: Handshake,
    tag: 'Partners',
    title: 'People who believe in the mission',
    text: 'Sponsors and partners for my #100DaysofAI builds and for the Innovators of Tomorrow community, so more builders can learn and ship.',
    match: /sponsor|partner|100 ?days|innovators|ambassador/i,
    glow: 'from-amber-300/30',
  },
]

/** A real ask from the loaded sheet that fits the card, if there is one. */
function exampleFor(card: Card, missions: Mission[]): string | undefined {
  return missions.find((m) => m.ask && card.match.test(m.ask))?.ask ?? card.fallback
}

export default function AsksSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()
  const missions = getState().missions

  return (
    <section id="asks" ref={ref} className="py-16 md:py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="text-white/40 text-sm tracking-widest uppercase mb-4">What I'm asking for</p>
          <h2 className="text-3xl md:text-5xl text-white tracking-tight">
            Three kinds of <em className="font-display italic cosmic-text">yes</em>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const { icon: Icon, tag, title, text, glow } = card
            const example = exampleFor(card, missions)
            return (
              <motion.div
                key={tag}
                initial={reduced ? false : { opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className={`liquid-glass rounded-3xl p-7 flex flex-col bg-linear-to-b ${glow} to-transparent`}
              >
                <span className="size-11 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-white/80" />
                </span>
                <p className="uppercase tracking-widest text-white/40 text-xs mb-3">{tag}</p>
                <h3 className="text-white text-xl tracking-tight mb-2">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{text}</p>
                {example && (
                  <blockquote className="mt-5 pt-4 border-t border-white/10 text-white/80 text-sm italic leading-relaxed">
                    &ldquo;{example}&rdquo;
                  </blockquote>
                )}
              </motion.div>
            )
          })}
        </div>
        {missions.length > 0 && (
          <p className="text-white/60 text-sm mt-8">
            {missions.length.toLocaleString()} names on my list so far, from AI labs to climate and space companies. Every
            one of them gets a real, personal ask.
          </p>
        )}
      </div>
    </section>
  )
}
