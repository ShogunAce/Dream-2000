import { useEffect, useRef, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

/**
 * Shows `value`, counting up from the previous value when it changes. The final
 * text is always exactly `value`; the count is only decoration.
 */
export default function CountUp({ value }: { value: number }) {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(value)
  const previous = useRef(value)

  useEffect(() => {
    if (reduced || previous.current === value) {
      setShown(value)
      previous.current = value
      return
    }
    const controls = animate(previous.current, value, {
      duration: 0.9,
      ease: [0.32, 0.72, 0, 1],
      onUpdate: (v) => setShown(Math.round(v)),
      onComplete: () => setShown(value),
    })
    previous.current = value
    return () => {
      controls.stop()
      setShown(value)
    }
  }, [value, reduced])

  return <>{shown.toLocaleString()}</>
}
