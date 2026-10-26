export interface Quote {
  text: string
  author: string
}

// Attributions are widely cited but should be double-checked before the demo.
export const QUOTES: Quote[] = [
  { text: 'You may encounter many defeats, but you must not be defeated.', author: 'Maya Angelou' },
  {
    text: 'It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.',
    author: 'Seneca',
  },
  { text: 'Hold fast to dreams, for if dreams die, life is a broken-winged bird that cannot fly.', author: 'Langston Hughes' },
  { text: "Practice isn't the thing you do once you're good. It's the thing you do that makes you good.", author: 'Malcolm Gladwell' },
  { text: "Don't stop when you're tired. Stop when you're done.", author: 'David Goggins' },
  { text: 'The future belongs to those who prepare for it today.', author: 'Malcolm X' },
]

/** One quote per calendar day: the same all day, a new one tomorrow. */
export function quoteForDate(date: string): Quote {
  const days = Math.floor(new Date(date + 'T00:00:00Z').getTime() / 86_400_000)
  return QUOTES[((days % QUOTES.length) + QUOTES.length) % QUOTES.length]
}
