import OpenDashboardButton from './OpenDashboardButton'

export default function FinalCtaSection() {
  return (
    <section className="bg-black py-28 md:py-40 px-6 text-center">
      <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight mb-10">
        Your first no is <em className="italic">waiting</em>
      </h2>
      <OpenDashboardButton />
      <p className="text-white/40 text-xs mt-4">No account. No email. Just start.</p>
    </section>
  )
}
