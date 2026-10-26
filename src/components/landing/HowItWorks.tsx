import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const Tag = ({ children }: { children: ReactNode }) => (
  <span className="text-[10px] font-medium tracking-widest uppercase text-white/40 rounded-full ring-1 ring-white/15 px-2 py-0.5">
    {children}
  </span>
)

function LogPreview() {
  const fields = [
    ['What you asked', 'Sponsor my next build?'],
    ['Who said no', 'A company'],
    ['How it felt', 'Stung, then fine'],
  ]
  return (
    <div className="p-5" aria-hidden>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-white/60">Log a no</p>
        <Tag>Preview</Tag>
      </div>
      <div className="space-y-2">
        {fields.map(([label, placeholder]) => (
          <label key={label} className="block">
            <span className="text-[10px] uppercase tracking-widest text-white/40">{label}</span>
            <input
              readOnly
              tabIndex={-1}
              placeholder={placeholder}
              className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 text-xs text-white placeholder:text-white/30 pointer-events-none"
            />
          </label>
        ))}
      </div>
      <button tabIndex={-1} className="mt-3 w-full rounded-full bg-white text-black text-xs font-medium py-2 pointer-events-none">
        Log it
      </button>
    </div>
  )
}

function InsightPreview() {
  return (
    <div className="p-5" aria-hidden>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-white/60">Pattern spotted</p>
        <Tag>Example</Tag>
      </div>
      <div className="rounded-xl bg-white/5 p-4 space-y-3">
        <p className="text-xs text-white/80 leading-relaxed">
          Your no's share one thing: the ask was broad. Name one specific outcome and who it helps.
        </p>
        <div className="border-t border-white/10 pt-3">
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Rewritten ask</p>
          <p className="text-xs text-white/80 leading-relaxed">
            "Could you sponsor my next 48-hour build with a $200 credit, in return for a launch video?"
          </p>
        </div>
      </div>
    </div>
  )
}

function ProgressPreview() {
  return (
    <div className="p-5" aria-hidden>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-white/60">Your progress</p>
        <Tag>Preview</Tag>
      </div>
      <svg viewBox="0 0 240 120" className="w-full h-auto" role="img" aria-label="Empty graph: 0 no's logged yet">
        {[20, 50, 80].map((y) => (
          <line key={y} x1="28" x2="232" y1={y} y2={y} stroke="white" strokeOpacity="0.08" />
        ))}
        <line x1="28" y1="10" x2="28" y2="104" stroke="white" strokeOpacity="0.3" />
        <line x1="28" y1="104" x2="232" y2="104" stroke="white" strokeOpacity="0.3" />
        <text x="4" y="14" fontSize="8" fill="white" fillOpacity="0.4">No's</text>
        <text x="200" y="116" fontSize="8" fill="white" fillOpacity="0.4">Days</text>
        <text x="130" y="62" fontSize="9" textAnchor="middle" fill="white" fillOpacity="0.55">0 no's logged yet</text>
      </svg>
    </div>
  )
}

const steps = [
  {
    tag: 'Step 1',
    title: 'Log the no in 10 seconds',
    text: 'What you asked, who said no, and how it felt. Nothing else.',
    preview: <LogPreview />,
  },
  {
    tag: 'Step 2',
    title: 'Get the pattern, not just the sting',
    text: 'AI reads your recent no\'s and tells you what they have in common: the timing, the wording, the audience.',
    preview: <InsightPreview />,
  },
  {
    tag: 'Step 3',
    title: 'Send a better ask next time',
    text: 'Each debrief ends with a rewritten ask you can use right away. The counter climbs, your yes-rate becomes visible.',
    preview: <ProgressPreview />,
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()

  return (
    <section id="how-it-works" ref={ref} className="bg-black py-16 md:py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-10"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight">
            How it <em className="font-display italic">works</em>
          </h2>
          <p className="hidden md:block text-white/40 text-sm">Three steps, one loop</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={reduced ? false : { opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="liquid-glass rounded-3xl flex flex-col"
            >
              <div className="m-3 rounded-2xl bg-black/50">{s.preview}</div>
              <div className="px-6 pb-7 pt-3">
                <p className="uppercase tracking-widest text-white/40 text-xs mb-3">{s.tag}</p>
                <h3 className="text-white text-xl tracking-tight mb-2">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
