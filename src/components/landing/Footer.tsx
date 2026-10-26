// Add real profile URLs here to show icon links. Leave empty to show none.
const SOCIALS: { label: 'X' | 'LinkedIn'; url: string }[] = []

const paths = {
  X: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  LinkedIn:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452z',
}

export default function Footer() {
  return (
    <footer className="pb-10 text-center space-y-4">
      {SOCIALS.length > 0 && (
        <div className="flex justify-center gap-4">
          {SOCIALS.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-white/50 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
                <path d={paths[label]} />
              </svg>
            </a>
          ))}
        </div>
      )}
      <p className="text-white/40 text-xs">
        A personal project by Ace (Cole Slay). Built for the Build With AI: Basics hackathon.
      </p>
    </footer>
  )
}
