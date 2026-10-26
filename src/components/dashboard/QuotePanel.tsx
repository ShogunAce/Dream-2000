import { quoteForDate } from '../../lib/quotes'
import Bezel from './Bezel'

export default function QuotePanel({ date }: { date: string }) {
  const quote = quoteForDate(date)
  return (
    <Bezel eyebrow="Transmission of the day" delay={0.15}>
      <blockquote>
        <p className="font-display text-2xl md:text-3xl leading-snug">&ldquo;{quote.text}&rdquo;</p>
        <footer className="font-hud text-xs uppercase tracking-[0.2em] text-amber-200/80 mt-4">{quote.author}</footer>
      </blockquote>
    </Bezel>
  )
}
