/**
 * Cosmic atmosphere: soft violet, cyan and gold glows plus a faint star field.
 * Purely decorative, sits behind content. `fixed` pins it to the screen (dashboard);
 * otherwise it spreads down the whole parent (landing page).
 */
const ORBS = [
  { pos: 'top-[4%] -left-40', size: 'size-[36rem]', color: 'bg-violet-600/25' },
  { pos: 'top-[16%] -right-48', size: 'size-[32rem]', color: 'bg-cyan-400/20' },
  { pos: 'top-[34%] -left-32', size: 'size-[30rem]', color: 'bg-amber-400/15' },
  { pos: 'top-[50%] -right-40', size: 'size-[36rem]', color: 'bg-fuchsia-500/20' },
  { pos: 'top-[68%] -left-44', size: 'size-[34rem]', color: 'bg-cyan-500/20' },
  { pos: 'top-[84%] left-1/3', size: 'size-[38rem]', color: 'bg-violet-500/25' },
]

const STARS =
  'radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,.7), transparent), radial-gradient(1px 1px at 78% 8%, rgba(255,255,255,.55), transparent), radial-gradient(1.5px 1.5px at 42% 36%, rgba(255,255,255,.5), transparent), radial-gradient(1px 1px at 88% 52%, rgba(255,255,255,.6), transparent), radial-gradient(1px 1px at 24% 70%, rgba(255,255,255,.5), transparent), radial-gradient(1.5px 1.5px at 62% 84%, rgba(255,255,255,.55), transparent), radial-gradient(1px 1px at 8% 92%, rgba(255,255,255,.5), transparent)'

export default function Aurora({ fixed = false }: { fixed?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${fixed ? 'fixed' : 'absolute'} inset-0 overflow-hidden`}
    >
      {fixed ? (
        <>
          <div className="absolute -top-40 -left-32 size-[34rem] rounded-full bg-violet-600/25 blur-[140px]" />
          <div className="absolute top-1/3 -right-40 size-[30rem] rounded-full bg-cyan-400/20 blur-[140px]" />
          <div className="absolute -bottom-48 left-1/4 size-[36rem] rounded-full bg-amber-400/15 blur-[160px]" />
          <div className="absolute bottom-0 -right-32 size-[28rem] rounded-full bg-fuchsia-500/15 blur-[140px]" />
        </>
      ) : (
        ORBS.map((o) => (
          <div key={o.pos} className={`absolute rounded-full blur-[150px] ${o.pos} ${o.size} ${o.color}`} />
        ))
      )}
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: STARS, backgroundSize: '600px 600px' }} />
    </div>
  )
}
