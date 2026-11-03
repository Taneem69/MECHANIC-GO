import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DistortionSphere from '../components/DistortionSphere'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../sections/HeroSection'
import HowItWorks from '../sections/HowItWorks'
import ServiceCatalog from '../sections/ServiceCatalog'
import CostEstimator from '../sections/CostEstimator'
import CoverageArea from '../sections/CoverageArea'
import SocialProof from '../sections/SocialProof'

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage() {
  useEffect(() => {
    // Fade out the Three.js canvas as user scrolls past the hero section.
    // DistortionSphere renders a <canvas> — this selector finds it correctly.
    const canvas = document.querySelector('canvas')
    if (canvas) {
      gsap.to(canvas, {
        opacity: 0,
        scrollTrigger: {
          trigger: '#how-it-works',
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className="relative">
      <DistortionSphere />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <HowItWorks />
        <ServiceCatalog />
        <CostEstimator />
        <CoverageArea />
        <SocialProof />
      </main>
      <Footer />
    </div>
  )
}
