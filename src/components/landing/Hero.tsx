import { Link } from 'react-router-dom'
import { Globe } from 'lucide-react'
import LoopVideo from './LoopVideo'
import OpenDashboardButton from './OpenDashboardButton'
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
  const count = readCount()
  const pct = Math.min(100, (count / GOAL) * 100)

  return (
    <section className="min-h-screen overflow-hidden relative flex flex-col">
      <LoopVideo
        src="/videos/hero.mp4"
        fade
        className="absolute inset-0 w-full h-full object-cover object-bottom"
      />

      <nav className="relative z-20 px-6 py-6">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Globe size={24} className="text-white" />
            <span className="text-white font-semibold text-lg ml-2">Dream 2000</span>
            <div className="hidden md:flex items-center gap-8 ml-8">
              <button onClick={() => scrollTo('challenge')} className="text-white/80 hover:text-white text-sm font-medium">
                The Challenge
              </button>
              <button onClick={() => scrollTo('how-it-works')} className="text-white/80 hover:text-white text-sm font-medium">
                How It Works
              </button>
              <Link to="/dashboard" className="text-white/80 hover:text-white text-sm font-medium">
                Dashboard
              </Link>
            </div>
          </div>
          <Link to="/dashboard" className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium">
            Open Dashboard
          </Link>
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%] md:-translate-y-[20%]">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-6">The Dream 2000 Challenge</p>
        <h1 className="font-display text-7xl md:text-8xl lg:text-9xl text-white tracking-tight md:whitespace-nowrap mb-8">
          Chase 2,000 <em className="italic">No's</em>.
        </h1>
        <div className="liquid-glass rounded-full px-6 py-2 text-white mb-6" data-testid="hero-counter">
          <span className="text-sm font-medium">
            {count.toLocaleString()} / {GOAL.toLocaleString()}
          </span>
          <div className="h-px bg-white/20 mt-1">
            <div className="h-px bg-white" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed px-4 max-w-md mb-8">
          Every rejection is a rep. Log each no, learn what it taught you, and watch the number climb to 2,000.
        </p>
        <OpenDashboardButton />
        <p className="text-white/40 text-xs mt-3">No account needed. Your progress stays on this device.</p>
        <button
          onClick={() => scrollTo('challenge')}
          className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors mt-5"
        >
          Why 2,000?
        </button>
      </div>

      <div className="relative z-10 flex justify-center pb-12">
        <p className="text-white/40 text-xs">Built for the Build With AI: Basics hackathon.</p>
      </div>
    </section>
  )
}
