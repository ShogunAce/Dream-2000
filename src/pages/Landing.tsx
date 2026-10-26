import Hero from '../components/landing/Hero'
import WhySection from '../components/landing/WhySection'
import HowItWorks from '../components/landing/HowItWorks'
import AudienceSection from '../components/landing/AudienceSection'
import FinalCtaSection from '../components/landing/FinalCtaSection'

export default function Landing() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Hero />
      <WhySection />
      <HowItWorks />
      <AudienceSection />
      <FinalCtaSection />
      <footer className="bg-black pb-10 text-center">
        <p className="text-white/40 text-xs">Dream 2000 · Built for the Build With AI: Basics hackathon.</p>
      </footer>
    </div>
  )
}
