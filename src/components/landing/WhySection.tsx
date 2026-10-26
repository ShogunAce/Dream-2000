import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const PHOTO = '/images/ace.jpg'

/** True only once the photo has actually loaded, so a missing file leaves no empty frame. */
function usePhoto(): boolean {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const img = new Image()
    img.onload = () => setOk(true)
    img.src = PHOTO
  }, [])
  return ok
}

export default function WhySection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()
  const hasPhoto = usePhoto()
  const from = reduced ? false : { opacity: 0, y: 30 }

  return (
    <section id="why" ref={ref} className="py-16 md:py-24 px-6 overflow-hidden">
      <div
        className={`mx-auto grid grid-cols-1 gap-10 md:gap-16 items-center ${
          hasPhoto ? 'max-w-6xl md:grid-cols-2' : 'max-w-3xl'
        }`}
      >
        {hasPhoto && (
          <motion.img
            src={PHOTO}
            alt="Ace"
            initial={from}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full aspect-[4/5] object-cover rounded-3xl"
          />
        )}
        <motion.div initial={from} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
          <p className="text-white/40 text-sm tracking-widest uppercase mb-6">Why I'm doing this</p>
          <h2 className="text-4xl md:text-6xl text-white leading-[1.1] tracking-tight mb-8">
            A no is just <em className="font-display italic cosmic-text">information</em> I haven't collected yet.
          </h2>
          <div className="text-white/75 text-lg leading-relaxed space-y-5">
            <p>
              I run Cole Slay Solutions, building AI and automation for small businesses, and I lead Innovators of
              Tomorrow, a community of builders who want to solve real problems. I vibe-code every day, and I've
              learned that building fast was never my bottleneck.
            </p>
            <p>
              Asking is. It's easy to build for months and never knock on the door that could change everything. So I
              decided to make asking the practice: 2,000 bold asks, every answer documented, and every no counted as
              progress instead of failure.
            </p>
            <p>Every no is a rep. The more I hear, the less it stings, and the better my next ask gets.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
