import Hero from '../components/landing/Hero'
import AboutSection from '../components/landing/AboutSection'
import FeaturedVideoSection from '../components/landing/FeaturedVideoSection'
import PhilosophySection from '../components/landing/PhilosophySection'
import HowItWorks from '../components/landing/HowItWorks'
import FinalCtaSection from '../components/landing/FinalCtaSection'

export default function Landing() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Hero />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <HowItWorks />
      <FinalCtaSection />
    </div>
  )
}
