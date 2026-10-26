import OpenDashboardButton from './OpenDashboardButton'

export default function FinalCtaSection() {
  return (
    <section className="relative py-16 md:py-24 px-6 text-center bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.22)_0%,rgba(34,211,238,0.10)_40%,transparent_70%)]">
      <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight mb-6">
        Come watch me <em className="italic cosmic-text">ask</em>.
      </h2>
      <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
        The dashboard is my live mission control: the full list, the messages, and the count. Look around. It's all real.
      </p>
      <OpenDashboardButton />
    </section>
  )
}
