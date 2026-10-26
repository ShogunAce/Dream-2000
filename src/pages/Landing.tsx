import Aurora from '../components/Aurora'
import Hero from '../components/landing/Hero'
import WhySection from '../components/landing/WhySection'
import AsksSection from '../components/landing/AsksSection'
import MissionSection from '../components/landing/MissionSection'
import SystemSection from '../components/landing/SystemSection'
import FinalCtaSection from '../components/landing/FinalCtaSection'
import Footer from '../components/landing/Footer'

export default function Landing() {
  return (
    <div className="relative bg-black text-white min-h-screen overflow-x-hidden">
      <Aurora />
      <div className="relative">
        <Hero />
        <WhySection />
        <AsksSection />
        <MissionSection />
        <SystemSection />
        <FinalCtaSection />
        <Footer />
      </div>
    </div>
  )
}
