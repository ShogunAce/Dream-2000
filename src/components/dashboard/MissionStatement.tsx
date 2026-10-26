import { setProfile } from '../../lib/store'
import Bezel from './Bezel'

export default function MissionStatement({ value }: { value: string }) {
  return (
    <Bezel eyebrow="Why I'm chasing 2,000" delay={0.35}>
      <textarea
        aria-label="Personal mission statement"
        defaultValue={value}
        placeholder="Write your why. It stays on this device."
        rows={4}
        onBlur={(e) => setProfile({ missionStatement: e.target.value })}
        className="w-full bg-transparent resize-none outline-none font-display text-xl leading-snug placeholder:text-white/25"
      />
    </Bezel>
  )
}
