import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const FADE_MS = 500

/** Animates an element's opacity from its current value to `to` over FADE_MS. */
function fadeTo(el: HTMLVideoElement, to: number) {
  const from = parseFloat(el.style.opacity || '0')
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / FADE_MS)
    el.style.opacity = String(from + (to - from) * t)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/**
 * A muted looping video. If the file is missing it shows a dark gradient so the
 * layout never breaks. With `fade`, the loop crossfades through black (hero).
 */
export default function LoopVideo({
  src,
  className = '',
  fade = false,
  hideOnFail = false,
}: {
  src: string
  className?: string
  fade?: boolean
  /** Render nothing (instead of a gradient) if the file is missing. */
  hideOnFail?: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced) {
      el.pause()
      el.style.opacity = '1'
      return
    }
    if (!fade) return

    el.style.opacity = '0'
    let fadingOut = false
    const onCanPlay = () => {
      el.play().catch(() => {})
      fadeTo(el, 1)
    }
    const onTime = () => {
      if (!fadingOut && el.duration && el.duration - el.currentTime <= 0.55) {
        fadingOut = true
        fadeTo(el, 0)
      }
    }
    const onEnded = () => {
      el.style.opacity = '0'
      setTimeout(() => {
        el.currentTime = 0
        el.play().catch(() => {})
        fadingOut = false
        fadeTo(el, 1)
      }, 100)
    }
    el.addEventListener('canplay', onCanPlay)
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('ended', onEnded)
    return () => {
      el.removeEventListener('canplay', onCanPlay)
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('ended', onEnded)
    }
  }, [fade, reduced])

  if (failed) {
    if (hideOnFail) return null
    return (
      <div
        aria-hidden
        className={`${className} bg-[radial-gradient(ellipse_at_50%_100%,rgba(251,191,36,0.18)_0%,rgba(99,60,160,0.12)_40%,#000_75%)]`}
      />
    )
  }

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      muted
      loop={!fade}
      playsInline
      autoPlay={!fade && !reduced}
      preload="auto"
      aria-hidden
      onError={() => setFailed(true)}
    />
  )
}
