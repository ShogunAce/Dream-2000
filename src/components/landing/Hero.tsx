import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe } from 'lucide-react'
import LoopVideo from './LoopVideo'
import OpenDashboardButton from './OpenDashboardButton'
import CountUp from '../dashboard/CountUp'
import { GOAL } from '../../lib/xp'

function readCount(): number {
  try {
    return Number(localStorage.getItem('dream2000_count')) || 0
  } catch {
    return 0
  }
}

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Hero() {
  const [count, setCount] = useState(readCount)

  // pick up a count logged in another tab, or when coming back to this page
  useEffect(() => {
    const refresh = () => setCount(readCount())
    window.addEventListener('storage', refresh)
    window.addEventListener('focus', refresh)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener('focus', refresh)
    }
  }, [])

  const pct = Math.min(100, (count / GOAL) * 100)

  return (
    <section className="min-h-screen overflow-hidden relative flex flex-col">
      {/* on desktop the video sits to the right so the astronaut stays clear of the text */}
      <LoopVideo
        src="/videos/hero.mp4"
        fade
        className="absolute inset-0 w-full h-full object-cover object-bottom md:translate-x-[22%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent md:bg-linear-to-r md:from-black/80 md:via-black/40 md:to-transparent"
      />

      <nav className="relative z-20 px-6 py-6">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Globe size={24} className="text-white" />
            <span className="text-white font-semibold text-lg ml-2">Dream 2000</span>
            <div className="hidden md:flex items-center gap-8 ml-8">
              <button onClick={() => scrollTo('why')} className="text-white/80 hover:text-white text-sm font-medium">
                Why
              </button>
              <button onClick={() => scrollTo('how-it-works')} className="text-white/80 hover:text-white text-sm font-medium">
                How it works
              </button>
            </div>
          </div>
          <Link to="/dashboard" className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium">
            Open Dashboard
          </Link>
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pt-16 pb-14 md:pb-20 md:pl-[8vw] max-w-7xl w-full mx-auto text-center md:text-left items-center md:items-start">
        <p className="text-white/50 text-xs tracking-widest uppercase mb-4">Dream 2000 · The 2,000-No Challenge</p>
        <h1 className="font-display text-6xl md:text-8xl text-white tracking-tight leading-[0.95] mb-8">
          Every no is a <em className="italic">rep</em>.
        </h1>

        <div className="mb-6 w-full max-w-md" data-testid="hero-counter">
          <p className="text-5xl md:text-7xl font-semibold tabular-nums text-white leading-none">
            <CountUp value={count} />
            <span className="text-white/40"> / {GOAL.toLocaleString()}</span>
          </p>
          <div className="h-px bg-white/15 mt-4">
            <div className="h-px bg-white" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-white/50 text-xs mt-2">No's logged</p>
        </div>

        <p className="text-white/80 text-base md:text-lg max-w-md mb-8">
          Everything I'm building runs on one skill: asking. Dream 2000 logs every rejection, debriefs it with AI, and
          turns the pattern into your next, better ask.
        </p>
        <OpenDashboardButton />
        <p className="text-white/50 text-xs mt-3">No account. Your data stays on this device.</p>
      </div>
    </section>
  )
}
