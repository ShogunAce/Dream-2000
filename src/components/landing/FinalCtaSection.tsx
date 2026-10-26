import OpenDashboardButton from './OpenDashboardButton'

export default function FinalCtaSection() {
  return (
    <section className="relative py-16 md:py-24 px-6 text-center bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.22)_0%,rgba(34,211,238,0.10)_40%,transparent_70%)]">
      <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight mb-8">
        Your first no is <em className="italic cosmic-text">waiting</em>.
      </h2>
      <OpenDashboardButton />
      <p className="text-white/40 text-xs mt-4">No account. No email. Just start.</p>
    </section>
  )
}
